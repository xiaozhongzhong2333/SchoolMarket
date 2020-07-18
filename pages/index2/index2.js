const app = getApp()

Page({

  data: {
    openid: '',
    ne: [],
count:1
  },

  onLoad: function (options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid,
      })
    }
    this.setData({
      countid: options.openid
    })
    const db = wx.cloud.database()
    db.collection('ask').where({
      _openid: options.openid,
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
  ckxx(e) {
    const db = wx.cloud.database()
    console.log(this.data.countid)
    db.collection('ask').where({
      _openid: this.data.countid
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
  onTop: function (event) {
    var id = event.currentTarget.dataset._id
    console.log(id)
    const db = wx.cloud.database()
    db.collection('ask').doc(id).remove({
      success(res) {
        wx.showToast({
          title: '删除成功',
          icon: "success",
          duration: 1000,
        })
      }
    })
  },
  uppage() {
    var count = this.data.count - 2
    console.log(count)
    const db = wx.cloud.database()
    if (count == 0) {
      db.collection('ask').where({
        _openid: this.data.countid
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
        _openid: this.data.countid
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
    console.log(count)
    const db = wx.cloud.database()
    db.collection('ask').skip(count * 20).where({
      _openid: this.data.countid
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
      _openid: this.data.countid
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


})