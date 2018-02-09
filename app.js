//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: resLogin => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (resLogin.code) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        wx.login({
          success: resLogin => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            if (resLogin.code) {
              wx.getUserInfo({
                success: resUser => {
                  // // 可以将 res 发送给后台解码出 unionId
                  wx.request({
                    url: 'http://localhost:3000/mina/user',
                    data: {
                      encryptedData: resUser.encryptedData,
                      code: resLogin.code,
                      iv: resUser.iv
                    },
                    success: (res) => {
                      this.globalData.userInfo = res.data.data
                      console.log(this.globalData.userInfo)
                    }
                  })
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })
            } else {
              console.log('获取用户登录态失败！' + res.errMsg)
            }
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null
  },
})