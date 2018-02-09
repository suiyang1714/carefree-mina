const app = getApp()
Page({
  data: {
    
  },
  //事件处理函数
  continueEmail: function (e) {
    wx.navigateTo({
      url: '../index/index'
    })
  }
})