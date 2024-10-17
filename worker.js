import HTML from './index.html';

export default {
  async fetch(request, env) {
    const originalHost = request.headers.get("host");

    // 设置CORS头部
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*', // 允许任何源
      'Access-Control-Allow-Methods': 'GET, POST', // 允许的请求方法
      'Access-Control-Allow-Headers': 'Content-Type' // 允许的请求头
    };

    // 预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders
      });
    }
    // 检查请求方法
    if (request.method === 'POST') {
      // 处理 POST 请求，用于 AI 绘画功能
      const data = await request.json();
      let model = '@cf/lykon/dreamshaper-8-lcm';

      if ('prompt' in data && 'model' in data) {
        switch(data.model) {
          case 'dreamshaper-8-lcm':
            model = '@cf/lykon/dreamshaper-8-lcm';
            break;
          case 'stable-diffusion-xl-base-1.0':
            model = '@cf/stabilityai/stable-diffusion-xl-base-1.0';
            break;
          case 'stable-diffusion-xl-lightning':
            model = '@cf/bytedance/stable-diffusion-xl-lightning';
            break;
          default:
            break;
        }

        const inputs = {
          prompt: data.prompt,
        };

        const response = await env.AI.run(model, inputs);
        return new Response(response, {
          headers: {
            ...corsHeaders, 
            'content-type': 'image/png;base64',
          },
        });
      } else {
        return new Response('Missing prompt or model', { status: 400, headers: corsHeaders });
      }
    } else {
      // 处理 GET 请求，返回html页面
      return new Response(HTML.replace(/{{host}}/g, originalHost), {
        status: 200,
        headers: {
          ...corsHeaders, // 合并CORS头部
          "content-type": "text/html"
        }
      });
    }
  }
};
