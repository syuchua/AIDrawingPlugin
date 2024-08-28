# 适用于MY_QBOT项目的AI 绘画插件（对应的worker和前端开源，任何人都可以使用）

这个插件使用 Cloudflare Worker 和 Workers AI 来生成 AI 绘画。

## 安装

自动：
  对机器人使用命令
  ```
  /plugin https://github.com/syuchua/AIDrawingPlugin
  ```

手动：
  1. 克隆此仓库到你的插件目录。
  2. 安装依赖：`pip install -r requirements.txt`
3. 在 Cloudflare 中部署 `worker.js`和`index.html`。
4. 更新 `config.json` 中的 `worker_url` 为你的 Cloudflare Worker URL。

## 使用

使用 `/draw-v1(或v2，v3替换不同模型)` 命令来生成 AI 绘画。例如：
/draw-v2 一只可爱的猫咪
