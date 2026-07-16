#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const https = require("https");

const HOME_DIR = process.env.HOME || process.env.USERPROFILE || "";
const SKILL_DIR = path.resolve(__dirname, "..");
const ENV_PATH = path.join(SKILL_DIR, ".env");
const API_BASE = "https://vsix.cc/v1";
const SUPPORTED_SIZES = [
  "1024x1024",
  "1024x1536",
  "1536x1024",
  "768x768",
  "768x1152",
  "1152x768",
  "1536x864",
  "864x1536",
  "1920x1080",
  "1080x1920",
  "2048x2048",
  "3840x2160",
  "2160x3840",
  "2160x2160",
  "auto",
];
const SIZE_ALIASES = {
  "1:1": "1024x1024",
  "3:4": "1024x1536",
  "4:3": "1536x1024",
  "16:9": "1536x864",
  "9:16": "864x1536",
  square: "1024x1024",
  portrait: "1024x1536",
  landscape: "1536x1024",
  wide: "1536x864",
  vertical: "864x1536",
  "2k": "1920x1080",
  "2k-landscape": "1920x1080",
  "2k-portrait": "1080x1920",
  "4k": "3840x2160",
  "4k-landscape": "3840x2160",
  "4k-portrait": "2160x3840",
  "4k-square": "2160x2160",
};
const ENDPOINT_RETRY_LIMIT = Number.parseInt(
  process.env.VSIX_IMAGE_RETRY_LIMIT || "4",
  10
);
const ENDPOINT_RETRY_BASE_DELAY_MS = Number.parseInt(
  process.env.VSIX_IMAGE_RETRY_BASE_DELAY_MS || "2500",
  10
);
const REQUEST_TIMEOUT_MS = Number.parseInt(
  process.env.VSIX_IMAGE_REQUEST_TIMEOUT_MS || "120000",
  10
);
const MIME_BY_EXT = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

function log(message) {
  process.stderr.write(`${message}\n`);
}

function fail(message) {
  log(message);
  process.exit(1);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function printHelp() {
  log("Usage:");
  log('  node generate.js --prompt "Describe the image" [--size 1024x1024] [--image-url URL_OR_FILE] [--out output.png]');
  log("");
  log("Supported sizes:");
  log(`  ${SUPPORTED_SIZES.join(", ")}`);
  log("Aliases:");
  log("  1:1, 3:4, 4:3, square, portrait, landscape");
  log("  16:9, 9:16, wide, vertical, 2k, 2k-landscape, 2k-portrait");
  log("  4k, 4k-landscape, 4k-portrait, 4k-square");
}

function parseEnvContent(content) {
  const values = {};
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const match = /^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.exec(line);
    if (!match) continue;

    let value = match[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    values[match[1]] = value;
  }
  return values;
}

function readLocalEnv() {
  if (!fs.existsSync(ENV_PATH)) return {};
  return parseEnvContent(fs.readFileSync(ENV_PATH, "utf8"));
}

function expandHome(inputPath) {
  if (!inputPath) {
    return inputPath;
  }
  if (inputPath === "~") {
    return HOME_DIR;
  }
  if (inputPath.startsWith("~/")) {
    return path.join(HOME_DIR, inputPath.slice(2));
  }
  return inputPath;
}

function loadApiKey() {
  const localEnv = readLocalEnv();
  const apiKey = process.env.VSIX_API_KEY || localEnv.VSIX_API_KEY;
  if (apiKey && apiKey !== "YOUR_VSIX_KEY") {
    return apiKey;
  }

  fail(
    `Missing VSIX API key. Ask the user to get a key from https://vsix.cc (login/register -> API 密钥 -> 创建密钥 -> 分组 image-2 -> copy the sk- key), save it to ${ENV_PATH} as VSIX_API_KEY=..., then rerun this command.`
  );
}

function normalizeSize(rawSize) {
  const input = (rawSize || "1024x1024").trim().toLowerCase();
  const normalized = SIZE_ALIASES[input] || input;

  if (!SUPPORTED_SIZES.includes(normalized)) {
    fail(
      `Unsupported size "${rawSize}". Use one of: ${SUPPORTED_SIZES.join(", ")} or aliases ${Object.keys(
        SIZE_ALIASES
      ).join(", ")}.`
    );
  }

  return normalized;
}

function parseArgs(argv) {
  const parsed = {
    prompt: "",
    size: "1024x1024",
    imageUrls: [],
    out: "",
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    switch (arg) {
      case "--prompt":
        parsed.prompt = argv[index + 1] || "";
        index += 1;
        break;
      case "--size":
        parsed.size = argv[index + 1] || "";
        index += 1;
        break;
      case "--image-url":
        parsed.imageUrls.push(argv[index + 1] || "");
        index += 1;
        break;
      case "--out":
        parsed.out = argv[index + 1] || "";
        index += 1;
        break;
      case "--help":
      case "-h":
        printHelp();
        process.exit(0);
        break;
      default:
        fail(`Unknown argument: ${arg}`);
    }
  }

  if (!parsed.prompt) {
    printHelp();
    process.exit(1);
  }

  parsed.size = normalizeSize(parsed.size);
  parsed.imageUrls = parsed.imageUrls.filter(Boolean);
  return parsed;
}

function getMimeType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  const mimeType = MIME_BY_EXT[extension];

  if (!mimeType) {
    fail(
      `Unsupported local image type "${extension || "unknown"}". Supported: ${Object.keys(
        MIME_BY_EXT
      ).join(", ")}.`
    );
  }

  return mimeType;
}

function isRemoteUrl(value) {
  return /^https?:\/\//i.test(value);
}

function isDataUri(value) {
  return /^data:/i.test(value);
}

function resolveLocalFile(value) {
  const expanded = expandHome(value);
  if (path.isAbsolute(expanded)) {
    return expanded;
  }
  return path.resolve(process.cwd(), expanded);
}

function normalizeImageInput(value) {
  if (isRemoteUrl(value) || isDataUri(value)) {
    return {
      jsonValue: value,
      multipartFile: isDataUri(value) ? dataUriToMultipartFile(value) : null,
    };
  }

  const filePath = resolveLocalFile(value);
  if (!fs.existsSync(filePath)) {
    fail(`Reference image not found: ${value}`);
  }

  const mimeType = getMimeType(filePath);
  const fileBuffer = fs.readFileSync(filePath);
  return {
    jsonValue: `data:${mimeType};base64,${fileBuffer.toString("base64")}`,
    multipartFile: {
      filename: path.basename(filePath),
      mimeType,
      buffer: fileBuffer,
    },
  };
}

function requestJson(urlString, apiKey, body) {
  const url = new URL(urlString);
  const client = url.protocol === "http:" ? require("http") : https;

  return new Promise((resolve, reject) => {
    const request = client.request(
      {
        hostname: url.hostname,
        port: url.port || (url.protocol === "http:" ? 80 : 443),
        path: `${url.pathname}${url.search}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      },
      (response) => {
        const chunks = [];
        response.on("data", (chunk) => chunks.push(chunk));
        response.on("end", () => {
          const raw = Buffer.concat(chunks).toString("utf8");

          try {
            resolve({
              status: response.statusCode || 0,
              data: JSON.parse(raw),
            });
          } catch {
            resolve({
              status: response.statusCode || 0,
              data: raw,
            });
          }
        });
      }
    );

    request.setTimeout(REQUEST_TIMEOUT_MS, () => {
      request.destroy(new Error(`Request timed out after ${REQUEST_TIMEOUT_MS}ms`));
    });
    request.on("error", reject);
    request.write(JSON.stringify(body));
    request.end();
  });
}

function dataUriToMultipartFile(dataUri) {
  const match = dataUri.match(/^data:([^;]+);base64,(.+)$/s);
  if (!match) {
    return null;
  }

  const mimeType = match[1];
  const extension = mimeType.split("/")[1] || "png";
  return {
    filename: `reference.${extension}`,
    mimeType,
    buffer: Buffer.from(match[2], "base64"),
  };
}

function requestMultipart(urlString, apiKey, fields, files) {
  const url = new URL(urlString);
  const client = url.protocol === "http:" ? require("http") : https;
  const boundary = `----vsix-image-gen-${Date.now()}-${Math.random()
    .toString(16)
    .slice(2)}`;
  const chunks = [];

  for (const [name, value] of Object.entries(fields)) {
    chunks.push(Buffer.from(`--${boundary}\r\n`));
    chunks.push(
      Buffer.from(`Content-Disposition: form-data; name="${name}"\r\n\r\n`)
    );
    chunks.push(Buffer.from(`${value}\r\n`));
  }

  for (const file of files) {
    chunks.push(Buffer.from(`--${boundary}\r\n`));
    chunks.push(
      Buffer.from(
        `Content-Disposition: form-data; name="image"; filename="${file.filename}"\r\n`
      )
    );
    chunks.push(Buffer.from(`Content-Type: ${file.mimeType}\r\n\r\n`));
    chunks.push(file.buffer);
    chunks.push(Buffer.from("\r\n"));
  }

  chunks.push(Buffer.from(`--${boundary}--\r\n`));
  const body = Buffer.concat(chunks);

  return new Promise((resolve, reject) => {
    const request = client.request(
      {
        hostname: url.hostname,
        port: url.port || (url.protocol === "http:" ? 80 : 443),
        path: `${url.pathname}${url.search}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": `multipart/form-data; boundary=${boundary}`,
          "Content-Length": body.length,
        },
      },
      (response) => {
        const responseChunks = [];
        response.on("data", (chunk) => responseChunks.push(chunk));
        response.on("end", () => {
          const raw = Buffer.concat(responseChunks).toString("utf8");

          try {
            resolve({
              status: response.statusCode || 0,
              data: JSON.parse(raw),
            });
          } catch {
            resolve({
              status: response.statusCode || 0,
              data: raw,
            });
          }
        });
      }
    );

    request.setTimeout(REQUEST_TIMEOUT_MS, () => {
      request.destroy(new Error(`Request timed out after ${REQUEST_TIMEOUT_MS}ms`));
    });
    request.on("error", reject);
    request.write(body);
    request.end();
  });
}

function downloadFile(urlString, outputPath) {
  const url = new URL(urlString);
  const client = url.protocol === "http:" ? require("http") : https;
  const filePath = path.resolve(outputPath);

  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    const file = fs.createWriteStream(filePath);
    const request = client.get(url, (response) => {
      if ((response.statusCode || 0) >= 400) {
        file.close(() => fs.rmSync(filePath, { force: true }));
        reject(new Error(`Image download returned ${response.statusCode}`));
        return;
      }

      response.pipe(file);
      file.on("finish", () => {
        file.close(() => resolve(filePath));
      });
    });

    request.setTimeout(REQUEST_TIMEOUT_MS, () => {
      request.destroy(new Error(`Image download timed out after ${REQUEST_TIMEOUT_MS}ms`));
    });
    request.on("error", (error) => {
      file.close(() => fs.rmSync(filePath, { force: true }));
      reject(error);
    });
  });
}

function pickImageOutput(responseData) {
  const item = responseData && responseData.data && responseData.data[0];
  if (!item) {
    return null;
  }

  if (item.url) {
    return item.url;
  }

  if (item.b64_json) {
    return `data:image/png;base64,${item.b64_json}`;
  }

  return null;
}

function responseErrorMessage(response) {
  if (
    response.data &&
    response.data.error &&
    response.data.error.message
  ) {
    return response.data.error.message;
  }

  if (typeof response.data === "string") {
    return response.data;
  }

  return JSON.stringify(response.data);
}

function isRetryableUpstreamError(response) {
  const message = responseErrorMessage(response).toLowerCase();
  return (
    [502, 503, 504, 524].includes(response.status) ||
    message.includes("upstream") ||
    message.includes("timeout") ||
    message.includes("a timeout occurred") ||
    message.includes("cloudflare") ||
    message.includes("tls") ||
    message.includes("ssl") ||
    message.includes("socket") ||
    message.includes("econnreset") ||
    message.includes("bad record mac")
  );
}

function saveDataUri(dataUri, outputPath) {
  const match = dataUri.match(/^data:([^;]+);base64,(.+)$/s);
  if (!match) {
    fail("The API returned a data URI, but it was not a base64 image payload.");
  }

  const filePath = path.resolve(outputPath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, Buffer.from(match[2], "base64"));
  return filePath;
}

async function persistOutput(output, outputPath) {
  if (output.startsWith("data:image/")) {
    return saveDataUri(output, outputPath);
  }

  if (isRemoteUrl(output)) {
    return downloadFile(output, outputPath);
  }

  return null;
}

function buildGenerationRequestBody(args, normalizedImages, size) {
  const requestBody = {
    model: "gpt-image-2",
    prompt: args.prompt,
    n: 1,
    size,
  };
  const imageValues = normalizedImages.map((image) => image.jsonValue);

  if (imageValues.length === 1) {
    requestBody.image = imageValues[0];
  } else if (imageValues.length > 1) {
    requestBody.image = imageValues;
  }

  return requestBody;
}

function buildTextOnlyGenerationRequestBody(args, size) {
  return {
    model: "gpt-image-2",
    prompt: args.prompt,
    n: 1,
    size,
  };
}

function buildEditRequestBody(args, normalizedImages, size) {
  return {
    model: "gpt-image-2",
    prompt: args.prompt,
    n: 1,
    size,
    images: normalizedImages.map((image) => ({ image_url: image.jsonValue })),
  };
}

function buildMultipartEditRequest(args, normalizedImages, size) {
  const files = normalizedImages
    .map((image) => image.multipartFile)
    .filter(Boolean);

  if (files.length === 0) {
    return null;
  }

  return {
    fields: {
      model: "gpt-image-2",
      prompt: args.prompt,
      n: "1",
      size,
    },
    files,
  };
}

async function submitImageRequest(apiBase, apiKey, endpoint, requestBody) {
  try {
    return await requestJson(`${apiBase}${endpoint}`, apiKey, requestBody);
  } catch (error) {
    return {
      status: 0,
      data: {
        error: {
          message: error.message,
          type: "network_error",
        },
      },
    };
  }
}

async function submitMultipartImageRequest(apiBase, apiKey, endpoint, requestParts) {
  try {
    return await requestMultipart(
      `${apiBase}${endpoint}`,
      apiKey,
      requestParts.fields,
      requestParts.files
    );
  } catch (error) {
    return {
      status: 0,
      data: {
        error: {
          message: error.message,
          type: "network_error",
        },
      },
    };
  }
}

async function submitWithRetry(apiBase, apiKey, endpoint, requestBody, label) {
  let response;

  for (let attempt = 1; attempt <= ENDPOINT_RETRY_LIMIT; attempt += 1) {
    response = await submitImageRequest(apiBase, apiKey, endpoint, requestBody);

    if (response.status === 200 || !isRetryableUpstreamError(response)) {
      return response;
    }

    if (attempt < ENDPOINT_RETRY_LIMIT) {
      const delay = ENDPOINT_RETRY_BASE_DELAY_MS * attempt;
      log(
        `${label} attempt ${attempt}/${ENDPOINT_RETRY_LIMIT} returned ${response.status || "network"} (${responseErrorMessage(response)}). Retrying in ${delay}ms...`
      );
      await sleep(delay);
    }
  }

  return response;
}

async function submitMultipartWithRetry(apiBase, apiKey, endpoint, requestParts, label) {
  let response;

  for (let attempt = 1; attempt <= ENDPOINT_RETRY_LIMIT; attempt += 1) {
    response = await submitMultipartImageRequest(apiBase, apiKey, endpoint, requestParts);

    if (response.status === 200 || !isRetryableUpstreamError(response)) {
      return response;
    }

    if (attempt < ENDPOINT_RETRY_LIMIT) {
      const delay = ENDPOINT_RETRY_BASE_DELAY_MS * attempt;
      log(
        `${label} attempt ${attempt}/${ENDPOINT_RETRY_LIMIT} returned ${response.status || "network"} (${responseErrorMessage(response)}). Retrying in ${delay}ms...`
      );
      await sleep(delay);
    }
  }

  return response;
}

async function submitWithEndpointFallback(apiBase, apiKey, args, normalizedImages, size) {
  if (normalizedImages.length === 0) {
    return {
      endpoint: "/images/generations",
      response: await submitWithRetry(
        apiBase,
        apiKey,
        "/images/generations",
        buildGenerationRequestBody(args, normalizedImages, size),
        `VSIX generations ${size}`
      ),
    };
  }

  const multipartRequest = buildMultipartEditRequest(args, normalizedImages, size);
  if (multipartRequest) {
    log("Using multipart image upload for local reference edits...");
    const multipartResponse = await submitMultipartWithRetry(
      apiBase,
      apiKey,
      "/images/edits",
      multipartRequest,
      `VSIX edits multipart ${size}`
    );

    if (multipartResponse.status === 200) {
      return { endpoint: "/images/edits", response: multipartResponse };
    }

    if (!shouldTryJsonEditFallback(multipartResponse)) {
      return { endpoint: "/images/edits", response: multipartResponse };
    }

    log(
      `VSIX edits multipart returned ${multipartResponse.status} (${responseErrorMessage(multipartResponse)}). Falling back to JSON image references...`
    );
  }

  let response = await submitWithRetry(
    apiBase,
    apiKey,
    "/images/edits",
    buildEditRequestBody(args, normalizedImages, size),
    `VSIX edits JSON ${size}`
  );

  if (response.status === 200) {
    return { endpoint: "/images/edits", response };
  }

  if (isRetryableUpstreamError(response)) {
    log(
      `VSIX edits returned ${response.status} (${responseErrorMessage(response)}). Falling back to generations image input...`
    );
    response = await submitWithRetry(
      apiBase,
      apiKey,
      "/images/generations",
      buildGenerationRequestBody(args, normalizedImages, size),
      `VSIX generations image input ${size}`
    );
    return { endpoint: "/images/generations", response };
  }

  return { endpoint: "/images/edits", response };
}

function shouldTryJsonEditFallback(response) {
  return isRetryableUpstreamError(response);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const apiKey = loadApiKey();
  const normalizedImages = args.imageUrls.map(normalizeImageInput);

  log(`Prompt: ${args.prompt}`);
  log(`Size: ${args.size}`);
  if (args.out) {
    log(`Output file: ${args.out}`);
  }
  if (normalizedImages.length > 0) {
    log(`Reference images: ${normalizedImages.length}`);
  }
  const initialEndpoint = normalizedImages.length > 0 ? "/images/edits" : "/images/generations";
  log(`Requesting image generation from VSIX (${API_BASE}${initialEndpoint})...`);
  let result = await submitWithEndpointFallback(
    API_BASE,
    apiKey,
    args,
    normalizedImages,
    args.size
  );
  let response = result.response;

  if (response.status !== 200) {
    const errorMessage = responseErrorMessage(response);
    fail(`VSIX API returned ${response.status}: ${errorMessage}`);
  }

  const output = pickImageOutput(response.data);
  if (!output) {
    fail("The API response did not include a usable image URL or b64_json payload.");
  }

  log("Image generation finished.");
  if (args.out) {
    try {
      const filePath = await persistOutput(output, args.out);
      if (filePath) {
        process.stdout.write(`${filePath}\n`);
        return;
      }
    } catch (error) {
      fail(`Image save failed: ${error.message}`);
    }
  }

  process.stdout.write(`${output}\n`);
}

main();
