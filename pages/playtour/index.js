const app = getApp()
Page({
  data: {
    total_fee: ['5', '10', '20', '50', '100', '500']
  },
  total_fee: function (e) {
    this.playTour(e.currentTarget.id)
  },
  playTour: function (total_fee) {
    wx.login({
      success: resLogin => {
        wx.getUserInfo({
          success: res => {
            wx.request({
              url: app.globalData.serverUrl + '/mina/payment',
              data: {
                total_fee: total_fee,
                code: resLogin.code,
                encryptedData: res.encryptedData,
                iv: res.iv
              },
              success: res => {
                console.log()
                wx.requestPayment(
                  {
                    'timeStamp': res.data.data.timeStamp.toString(),
                    'nonceStr': res.data.data.nonceStr,
                    'package': res.data.data.package,
                    'signType': 'MD5',
                    'paySign': res.data.data.paySign,
                    'success': function (res) {
                      console.log(res)
                    },
                    'fail': function (res) {
                      console.log('fail:' + JSON.stringify(res))
                    }
                  })
              }
            })
          }
        })
      }
    })
  }
})