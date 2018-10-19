const serIp = 'http://192.168.0.152:8002/mall/';
export const Config = {
  api_url: serIp+'api/v1/',
  file_servier: serIp+'upload/',
  allowUrls: "\/login|\/product",        //不需要添加token请求的接口
  noJsonTypeUrls: "",//不需要json传参的接口
}
