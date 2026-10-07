const api = require('../../config/settings')

Page({
  data: {
    img: '',
    num: 0
  },

  onLoad() {
    wx.request({
      url: api.fishbase,
      method: 'GET',
      success: (res) => {
        if (res.data.code === 100) {
          const imgUrl = res.data.result[0]
          const num = res.data.result[1]
          wx.downloadFile({
            url: imgUrl,
            success: (downloadRes) => {
              this.setData({
                img: downloadRes.tempFilePath,
                num: num
              })
            }
          })
        }
      }
    })
  }
})