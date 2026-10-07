Page({
  data: {
    backFront: true
  },

  switchCamera() {
    this.setData({
      backFront: !this.data.backFront
    })
  },

  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        const pages = getCurrentPages()
        const prevPage = pages[pages.length - 2]
        prevPage.setData({
          avatar: res.tempImagePath
        })
        wx.navigateBack()
      }
    })
  }
})