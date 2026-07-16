---
name: "vsix-image-gen"
description: "Use when the user asks to generate or edit images with VSIX GPT-Image, including Chinese triggers like 生图、画图、生成图片、参考这张图、把这张图改成 and English requests like generate an image, edit this photo, or transform this picture. Handles first-run API key setup, local or remote reference images, and runs the bundled Node CLI for reliable execution."
---

# VSIX Image Gen

Generate or edit images through VSIX's `gpt-image-2` endpoint. Prefer the bundled Node CLI so setup, request shape, and reference-image handling stay consistent across agent runs.

All API requests must use VSIX's own service at `https://vsix.cc/v1`. Do not route image generation requests to a custom base URL.

The CLI chooses the VSIX endpoint automatically:
- Text-to-image requests use `POST /v1/images/generations`.
- Image-to-image requests with local or data-URI reference images prefer `POST /v1/images/edits` as `multipart/form-data` uploads.
- Image-to-image requests with only remote reference URLs use JSON `images[].image_url`.
- If multipart edits hit retryable gateway/network failures, the CLI can fall back to JSON image references.
- If `edits` returns a retryable upstream error, the CLI falls back to the compatible `generations` image input path.
- If all reference-image paths fail, the CLI fails instead of silently falling back to text-only generation. This avoids losing the user's reference image when they asked for an edit.

## Workflow
1. Collect the user's prompt and decide whether this is text-to-image or image-to-image.
2. Resolve a JavaScript runtime internally. Prefer `node` from the current command environment. In Codex App, if `node` is not on `PATH`, use the bundled Node runtime when available. Do not mention Node.js to the user unless no usable runtime exists.
3. Resolve the API key from `VSIX_API_KEY` or the skill-local `.env`. If neither is available, ask the user to provide a VSIX API key, then end the current response and wait for the user's next message. Do not run the CLI in a way that blocks on terminal input.
4. Choose a size:
   - square or default: `1024x1024`
   - portrait or phone wallpaper: `1024x1536`
   - landscape: `1536x1024`
   - wide landscape: `1536x864`, `1920x1080`, or `3840x2160`
   - vertical video or phone wallpaper: `864x1536`, `1080x1920`, or `2160x3840`
   - high-resolution square: `2048x2048` or `2160x2160`
   - no preference: `auto`
5. If the user supplies one or more reference images, pass each one with `--image-url`. The CLI accepts remote URLs, `data:` URIs, and local file paths. Local files are converted to data URIs automatically.
6. If the user asks to adjust, revise, refine, continue, restyle, or otherwise modify the image generated in the previous turn, treat the request as an image edit. Use that previous output file path, URL, or data URI as `--image-url` for the next request so the CLI takes the edits path instead of a fresh text-only generation.
7. Run the CLI and return the generated image URL or data URI from stdout.

## Environment
- Preferred auth: `VSIX_API_KEY`
- Skill-local fallback file: `.env` next to `SKILL.md`
- Runtime: use an agent-available Node-compatible runtime. Codex App normally provides one internally, so this should not be presented as a user setup step.
- Expected `.env` shape:

```dotenv
VSIX_API_KEY=YOUR_VSIX_KEY
```

## First-run setup
If `VSIX_API_KEY` is unset and the skill-local `.env` does not contain a usable key, do not start an interactive terminal prompt. Ask the user to provide a VSIX API key, then stop the current response and wait for the user's next message. Do not continue image generation until the key is available.

Use this user-facing instruction:

```text
需要先配置 VSIX API Key 才能生成图片：

1. 打开 https://vsix.cc
2. 登录或注册
3. 在左侧边栏点击「API 密钥」
4. 点击右上角「创建密钥」
5. 分组选择「image-2」
6. 创建后复制 sk- 开头的密钥
7. 把密钥发给我，我会保存到本机 skill 的 .env 文件里，然后继续生成图片
```

After the user provides the key, save it in the skill directory as `.env` with local-only file permissions:

```bash
cd "$(dirname "$VSIX_IMAGE_GEN_CLI")/.."
umask 077
printf 'VSIX_API_KEY=%s\n' 'USER_PROVIDED_KEY' > .env
```

Do not pass the key as a command-line argument, and do not print it back to the user.

## Skill path
If the skill is installed under the default Codex skill directory:

```bash
export CODEX_HOME="${CODEX_HOME:-$HOME/.codex}"
export VSIX_IMAGE_GEN_CLI="$CODEX_HOME/skills/vsix-image-gen/scripts/generate.js"
```

If the user installed the skill elsewhere, adjust the CLI path accordingly.

## Runtime selection
Keep runtime handling invisible to the user whenever possible:

```bash
export VSIX_IMAGE_GEN_NODE="${VSIX_IMAGE_GEN_NODE:-$(command -v node 2>/dev/null || true)}"
if [ -z "$VSIX_IMAGE_GEN_NODE" ] && [ -x "$HOME/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node" ]; then
  export VSIX_IMAGE_GEN_NODE="$HOME/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node"
fi
```

If `VSIX_IMAGE_GEN_NODE` is still empty, tell the user:

```text
当前环境缺少可用的脚本运行环境。Codex App 通常可以直接运行；如果你使用的是其他 agent 或命令行环境，请先安装 Node.js 后再继续。
```

## CLI quick start
Square image:
```bash
"$VSIX_IMAGE_GEN_NODE" "$VSIX_IMAGE_GEN_CLI" \
  --prompt "A cinematic product photo of a transparent mechanical keyboard on brushed steel" \
  --size "1024x1024" \
  --out "./keyboard.png"
```

Portrait image with a size alias:
```bash
"$VSIX_IMAGE_GEN_NODE" "$VSIX_IMAGE_GEN_CLI" \
  --prompt "A manga-style city alley at night with warm neon signs" \
  --size "portrait"
```

4K landscape image saved to disk:
```bash
"$VSIX_IMAGE_GEN_NODE" "$VSIX_IMAGE_GEN_CLI" \
  --prompt "A realistic urban night street photo" \
  --size "4k" \
  --out "./street-4k.png"
```

Image-to-image with a local reference:
```bash
"$VSIX_IMAGE_GEN_NODE" "$VSIX_IMAGE_GEN_CLI" \
  --prompt "Turn this into a watercolor travel poster" \
  --image-url "/absolute/path/to/reference.png"
```

Image-to-image with multiple references:
```bash
"$VSIX_IMAGE_GEN_NODE" "$VSIX_IMAGE_GEN_CLI" \
  --prompt "Blend these references into a clean landing-page hero illustration" \
  --image-url "https://example.com/ref-1.jpg" \
  --image-url "/absolute/path/to/ref-2.webp"
```

## Decision rules
- Default to one image per request.
- Accept exact sizes `1024x1024`, `1024x1536`, `1536x1024`, `1536x864`, `864x1536`, `1920x1080`, `1080x1920`, `2048x2048`, `3840x2160`, `2160x3840`, `2160x2160`, and `auto`.
- Also accept helpful aliases: `1:1`, `3:4`, `4:3`, `16:9`, `9:16`, `square`, `portrait`, `landscape`, `wide`, `vertical`, `2k`, `2k-landscape`, `2k-portrait`, `4k`, `4k-landscape`, `4k-portrait`, `4k-square`.
- When the user just says “帮我画” or “generate an image”, keep the default square size unless they clearly want wallpaper or banner proportions.
- When the user asks for 2K or 4K, pass the matching size alias and use `--out` so the returned image is saved as a file instead of streaming a large data URI into the chat or terminal.
- For unstable gateway routing, the CLI retries retryable HTTP/network failures several times before fallback. Tune with `VSIX_IMAGE_RETRY_LIMIT`, `VSIX_IMAGE_RETRY_BASE_DELAY_MS`, and `VSIX_IMAGE_REQUEST_TIMEOUT_MS` if needed.
- When the request is an edit or style transfer, preserve the user's reference images and only rewrite the prompt enough to make the transformation clear.
- When the user's next message clearly refers to the previous generated image, such as "再亮一点", "换成赛博朋克风", "把背景去掉", "make it wider", or "adjust this", treat the previous generated image as an implicit reference image and pass it with `--image-url`. This should route through image edits, not a fresh generations-only request.
- Do not use the previous generated image as a reference when the user clearly starts a new unrelated image request.

## Output conventions
- The CLI writes progress and errors to stderr.
- The final image artifact is printed to stdout.
- On success, prefer `--out` for agent workflows and return the saved file path to the user.
- Without `--out`, prefer returning the resulting URL directly to the user. If the API responds with `b64_json`, the CLI prints a `data:` URI instead.
