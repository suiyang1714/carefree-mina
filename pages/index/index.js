const app = getApp()
Page({
  data: {
    showHide: true,
    selectIndex: 0,
    select: ['请选择', '爱情', '友情', '亲情', '生活'],
    textarea: '',
    submitTips: ''
  },
  //事件处理函数
  placeholderHide(event) {
    console.log(event.detail)
    if (event.detail.cursor == 0) {
      this.setData({
        showHide: true,
        textarea: event.detail.value
      })
    } else {
      this.setData({
        showHide: false
      })
    }
    this.setData({
      textarea: event.detail.value
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      selectIndex: e.detail.value
    })
  },
  commitFc: function () {
    if (this.data.textarea == '') {
      this.setData({
        submitTips: '请填写信封内容'
      })
    } else if (this.data.selectIndex == 0) {
      this.setData({
        submitTips: '请选择无忧信的源头'
      })
    } else if (this.data.textarea !== '' && this.data.selectIndex !== 0) {
      wx.request({
        url: 'http://localhost:3000/mina/savelMsg',
        data: {
          emailMsg: this.data.textarea,
          emailType: this.data.select[this.data.selectIndex],
          openid: app.globalData.userInfo.openid,
          nickname: app.globalData.userInfo.nickname
        },
        success: (res) => {
          console.log(res)
          if (res.data.success){
            wx.navigateTo({
              url: '../send/index'
            })
          }
        }
      })
    }
  }
})