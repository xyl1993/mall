export const apiConfig = {
  base_api_host: "/mall/api/v1/",
  allowUrls: "login", //不需要添加token请求的接口
  noAppToken: "\/examinationLogin", //访问指定页面时不需要token验证
  noJsonTypeUrls: "\/selDomitoryScoreList", //不需要json传参的接口
} // conf/db.js