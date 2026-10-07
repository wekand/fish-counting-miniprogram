const api = require('../../config/settings')
Page({
  data: {
    avatar: '/images/cameraadd.png'
  },

  bindToCamera() {
    wx.navigateTo({
      url: '/pages/camera/camera'
    })
  },

  chooseImage() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album'],
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath
        this.setData({ avatar: tempFilePath })
      }
    })
  },

  postUser() {
    wx.uploadFile({
      filePath: this.data.avatar,
      name: 'avatar',
      url: api.upload,
      success: (res) => {
        wx.navigateTo({
          url:'/pages/result/result'
        })
      }
    })
  }
})

