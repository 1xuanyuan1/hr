export default {
  // `baseURL`如果`url`不是绝对地址，那么将会加在其前面。
  // 当axios使用相对地址时这个设置非常方便
  // 在其实例中的方法
  baseURL: '/api',
  // baseURL: 'http://chat.hstar.org:8601/BySkVnof-/',

  // `timeout`定义请求的时间，单位是毫秒。
  // 如果请求的时间超过这个设定时间，请求将会停止。
  timeout: 1000 * 60,

  // `withCredentials`表明是否跨域请求，
  // 应该是用证书
  withCredentials: false,

  // `responsetype`表明服务器返回的数据类型，这些类型的设置应该是
  // 'arraybuffer','blob','document','json','text',stream'
  responsetype: 'json',

  // `onUploadProgress`允许处理上传过程的事件
  onUploadProgress: (progressEvent) => {
      // 本地过程事件发生时想做的事
  },

  // `onDownloadProgress`允许处理下载过程的事件
  onDownloadProgress: (progressEvent) => {
      // 下载过程中想做的事
  },
  // `validateStatus` 定义promise的resolve和reject。
  // http返回状态码，如果`validateStatus`返回true（或者设置成null/undefined），promise将会接受；其他的promise将会拒绝。
  validateStatus: (status) => {
    return status >= 200 && status < 300 // 默认
  }
}
