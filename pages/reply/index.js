Page({
  data: {
    reply: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    showHide: true,
    areaIndex: 0,
    area: ['北京', '广州', '上海', '深圳']
  },
  //事件处理函数
  satisfied: function () {
    wx.navigateTo({
      url: '../satisfied/index'
    })
  },
})