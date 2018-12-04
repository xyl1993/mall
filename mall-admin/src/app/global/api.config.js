const websocketUrl = process.env.NODE_ENV === 'development' ? 'ws://127.0.0.1:8002/mall/api/websocket' : 
  'ws://47.96.136.225/mall/api/websocket';
export const apiConfig = {
  base_api_host: "/mall/api/v1/",
  allowUrls: "login", //不需要添加token请求的接口
  noAppToken: "\/login|\/test", //访问指定页面时不需要token验证
  noJsonTypeUrls: "\/selDomitoryScoreList|\/test", //不需要json传参的接
  websocketUrl: websocketUrl,
} // conf/db.js