const app = getApp()
Page({
  data: {
    reply: 'Hello World',
    _id: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    showHide: true,
    areaIndex: 0,
    area: ['北京', '广州', '上海', '深圳']
  },
  onShow: function () {
    wx.request({
      url: 'http://localhost:3000/mina/isReply',
      data: {
        _id: app.globalData.userInfo._id
      },
      success: (res) => {
        this.setData({
          reply: res.data.data[0].reply.reply,
          _id: res.data.data[0]._id
        })
      }
    })
  },
  //事件处理函数
  satisfied: function () {
    wx.request({
      url: 'http://localhost:3000/mina/isSatisfied',
      data: {
        _id: this.data._id,
        satisfaction: true
      },
      success: res => {
        wx.navigateTo({
          url: '../satisfied/index'
        })
      }
    })
  },
  unsatisfied: function () {
    wx.request({
      url: 'http://localhost:3000/mina/isSatisfied',
      data: {
        _id: this.data._id,
        satisfaction: false
      },
      success: res => {
        wx.navigateTo({
          url: '../unsatisfied/index'
        })
      }
    })
  },
  playTour: function () {
    wx.navigateTo({
      url: '../playtour/index'
    })
  }
})