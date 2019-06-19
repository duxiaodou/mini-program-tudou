//app.js
const api = require('./utils/api.js')
App({
  getClientToken: function () { // 获取客户端访问令牌
    const params = {
      grant_type: 'client_credentials',
      client_id: 1,
      client_secret: 'zw9mRPRvTbyQk2kOkkrV63PxB7CciIvfXEk7LwxK'
    }
    api.postData('oauth/token', params).then(res => {
      console.log(res);
    })
  },
  onLaunch: function () {
    this.getClientToken(); 
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: ''
  }
})