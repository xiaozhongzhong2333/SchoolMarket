const app = getApp()
Page({
  data: {
    ne: [],
    count:1
  },
  onLoad: function (options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid,
      })
    }
    const db = wx.cloud.database()
    db.collection('ask').where({
      _openid: this.data.openid
    }).get({
      success: res => {
        this.setData({
          ne: res.data
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
  },
  uppage() {
    var count = this.data.count - 2
    const db = wx.cloud.database()
    if (count == 0) {
      db.collection('ask').where({
        _openid: this.data.openid
      }).get({
        success: res => {
          this.setData({
            ne: res.data
          })
          console.log('查询成功: ', res)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('查询失败：', err)
        },
      })
    } else {
      db.collection('ask').skip(count * 20).where({
        _openid: this.data.openid
      }).get({
        success: res => {
          this.setData({
            ne: res.data
          })
          console.log('查询成功: ', res)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '查询记录失败'
          })
          console.error('查询失败：', err)
        },
      })
    }
    this.setData({
      count: count + 1
    })
  },


  downpage() {
    var count = this.data.count
    const db = wx.cloud.database()
    db.collection('ask').skip(count * 20).where({
      _openid: this.data.openid
    }).get({
      success: res => {
        this.setData({
          ne: res.data
        })
        console.log('查询成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('查询失败：', err)
      },
    })
    this.setData({
      count: count + 1
    })
  },



  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    const db = wx.cloud.database()
    db.collection('ask').where({
      _openid: this.data.openid
    }).get({
      success: res => {
        this.setData({
          ne: res.data
        })
        console.log('查询成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('查询失败：', err)
      },
    })
  },

  ckxx(e) {
    this.setData({
      count: 1
    })
    const db = wx.cloud.database()
    db.collection('ask').where({
      _openid: this.data.openid
    }).get({
      success: res => {
        this.setData({
          ne: res.data
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

  },
})

