const app = getApp()
Page({
  data: {
    reply: '',
    _id: '',
    reply_id: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    showHide: true
  },
  onShow: function () {
    wx.request({
      url: 'http://localhost:3000/mina/isReply',
      data: {
        _id: app.globalData.userInfo._id
      },
      success: (res) => {
        console.log(res.data.data)
        this.setData({
          reply: res.data.data.reply.reply,
          _id: res.data.data._id,
          reply_id: res.data.data.reply._id
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
        reply_id: this.data.reply_id,
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
        reply_id: this.data.reply_id,
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