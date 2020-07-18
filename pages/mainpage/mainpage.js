const app = getApp()
Page({
  data: {
    ne: [],
    _id: "",
    count: 1,
    ad: [],
    navbarActiveIndex: 0,
    tabs: ["今日推荐",
      "日用百货",
      "电影票券",
      "电子产品",
      "书籍杂志",
      "其他物品"
    ],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    currentTab: 0,
    swiperCurrent: 0,
    navScrollLeft: 0,
    showNoBanners: false,
    autoplay: true,
    interval: 3500,
    duration: 1500,
  },
  onLoad: function(options) {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid,
        book: app.globalData.book,
        fileID: app.globalData.fileID
      })
    }
    const db = wx.cloud.database()
    db.collection('messages').where({
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
    db.collection('lunbotu').where({
      _openid: this.data.openid
    }).get({
      success: res => {
        this.setData({
          ad: res.data
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
  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    var type = e.currentTarget.id
    const db = wx.cloud.database()
    if (type == 0) {
      db.collection('messages').where({
        _openid: this.data.openid,
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
    } else {
      db.collection('messages').where({
        _openid: this.data.openid,
        type: type - 1,
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
    }
  },

  buy: function() {
    wx.navigateTo({
      url: '../buy/buy',
    })

  },


  rearch: function() {
    wx.navigateTo({
      url: '../rearch/rearch',
    })
  },

  onTap: function(event) {
    var id = event.currentTarget.dataset._id
    console.log(id)
    wx.navigateTo({
      url: '../welcome/welcome?id=' + id,
    })
  },

  onLoad: function(options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid,
        book: app.globalData.book,
        fileID: app.globalData.fileID
      })
    }
    const db = wx.cloud.database()
    db.collection('messages').where({
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
    db.collection('lunbotu').where({
      _openid: this.data.openid
    }).get({
      success: res => {
        this.setData({
          ad: res.data
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
    var type = this.data.activeIndex
    var count = this.data.count -2
    console.log(count)
    const db = wx.cloud.database()
    if (count == 0) {
      if (type == 0) {
        db.collection('messages').where({
          _openid: this.data.openid,
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
        db.collection('messages').where({
          _openid: this.data.openid,
          type: type - 1
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
    } else {
      if (type == 0) {
        db.collection('messages').skip(count*20).where({
          _openid: this.data.openid,
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
        db.collection('messages').skip(count * 20).where({
          _openid: this.data.openid,
          type: type - 1
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
    }
    this.setData({
      count: count + 1
    })
  },


  downpage() {
    var type = this.data.activeIndex
    console.log(type)
    var count = this.data.count
    console.log(count)
    const db = wx.cloud.database()
    if (type == 0) {
      db.collection('messages').skip(count * 20).where({
        _openid: this.data.openid,
      }).
      get({
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
      db.collection('messages').skip(count * 20).where({
        _openid: this.data.openid,
        type: type - 1
      }).
      get({
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



  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    const db = wx.cloud.database()
    db.collection('messages').where({}).get({
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
    var type = this.data.activeIndex
    const db = wx.cloud.database()
    if (type == 0) {
      db.collection('messages').where({
        _openid: this.data.openid,
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
    } else {
      db.collection('messages').where({
        _openid: this.data.openid,
        type: type - 1,
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
    }
  },


  bindDownLoad: function() {
    var that = this;
    loadMore(that);
    console.log("lower");
  },
  onReachBottom: function() {

  },
  swiperchange: function(e) {
    //console.log(e.detail.current)
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
})