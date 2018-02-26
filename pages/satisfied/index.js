const app = getApp()
Page({
  data: {
    
  },
  playTour: function () {
    wx.navigateTo({
      url: '../playtour/index'
    })
  }
})