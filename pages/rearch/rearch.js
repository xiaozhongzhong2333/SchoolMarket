const app = getApp()

Page({

  data: {
    openid: '',
    ne: [],
    count: 1,
    Inputvalue: ''
  },
  onTap: function(event) {
    var id = event.currentTarget.dataset._id
    console.log(id)
    wx.navigateTo({
      url: '../welcome/welcome?id=' + id,
      /**切换界面 */
    })
  },

  Inputcontent(e) {
    this.setData({
      Inputvalue: e.detail.value
    })
  },

  ckxx(e) {
    this.setData({
      count: 1
    })
    this.setData({
      Inputvalue: e.detail.value
    })
    const db = wx.cloud.database()
    var value = this.data.Inputvalue
    console.log(value)
    if (value != undefined) {
      db.collection('messages').where({
        describe: {
          $regex: '.*' + value,
          $options: 'i'
        }
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


  uppage() {
    var count = this.data.count - 2
    console.log(count)
    console.log(this.data.Inputvalue)
    const db = wx.cloud.database()
    if (count == 0) {
      db.collection('messages').where({
        describe: {
          $regex: '.*' + this.data.Inputvalue,
          $options: 'i'
        }
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
        describe: {
          $regex: '.*' + this.data.Inputvalue,
          $options: 'i'
        }
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
    db.collection('messages').skip(count * 20).where({
      describe: {
        $regex: '.*' + this.data.Inputvalue,
        $options: 'i'
      }
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

  onLoad: function(options) {},


})