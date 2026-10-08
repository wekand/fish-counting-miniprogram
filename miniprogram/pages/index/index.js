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
    console.log('点了提交，avatar =', this.data.avatar)
    wx.showLoading({ title: '提交中...' })
    wx.uploadFile({
      filePath: this.data.avatar,
      name: 'avatar',
      url: api.upload,
      success: (res) => {
        console.log('上传成功：', res)
        wx.hideLoading()
        wx.navigateTo({
          url: '/pages/result/result'
        })
      },
      fail: (err) => {
        console.log('上传失败：', err)
        wx.hideLoading()
        wx.showToast({ title: '上传失败', icon: 'none' })
      }
    })
  }
})