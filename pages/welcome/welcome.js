const app = getApp()
Page({
  data: {

    //定义一个数据，主要是放集合结果的
    ne: {},
    phone: {}
  },
  onLoad: function (option) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid,
        book: app.globalData.book,
        fileID: app.globalData.fileID
      })
    }
    console.log("welcome：" + option.id)
    this.setData({
      option: option.id
    })
    var openid = this.data.openid
    const db = wx.cloud.database({
      env: 'qkf1-af7gt'
    })
    db.collection('messages').doc(option.id).get({
      success: res => {
        console.log(res.data)
        this.setData({
          ne: res.data
        })
      }
    })

  },


  onBuy: function () {
    var openid = app.globalData.openid
    console.log("ontop openid:" + openid)
    if (!openid) {
      // wx.navigateTo({
      //   url: '../welcome/index'
      // })
      console.log("11111")
      console.log("openid0:" + openid)
      wx.showToast({
        title: '请先在"我的"页面中登录',
        icon: "none",
        duration: 1800,
        mask: true,
      })
      console.log("3333")
    } else {
      var option = this.data.option
      console.log("welcome：" + option)
      var openid = this.data.openid
      const db = wx.cloud.database({
        env: 'qkf1-af7gt'
      })
      db.collection('messages').doc(option).get({
        success: res => {
          this.setData({
            phone: res.data
          })
          console.log('查询成功: ', res)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('查询失败：', err)
        }
      })  
    }
    // var option = this.data.option
    // console.log("welcome：" + option)
    // var openid = this.data.openid
    // const db = wx.cloud.database({
    //   env: 'qkf1-16555f'
    // })
    // db.collection('messages').doc(option).get({
    //   success: res => {
    //     this.setData({
    //       phone: res.data
    //     })
    //     console.log('查询成功: ', res)
    //   },
    //   fail: err => {
    //     wx.showToast({
    //       icon: 'none',
    //       title: '查询记录失败'
    //     })
    //     console.error('查询失败：', err)
    //   }
    // })  
  },

  previewImage: function (e) {
    wx.previewImage({
      urls: this.data.ne.fileID.split(',')
    })
  },
  

})