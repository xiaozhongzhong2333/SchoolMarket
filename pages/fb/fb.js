var util = require('util.js')
const app = getApp()
var a = ""
Page({
  data: {
    scimage: '',
    scfilepath: '',
    nam:'',
    array: ['日用百货', '电影票券', '电子产品', '书籍杂志',  '其他物品'],
    objectArray: [{
        id: 0,
        name: '日用百货'
      },
      {
        id: 1,
        name: '电影票券'
      },
      {
        id: 2,
        name: '电子产品'
      },
      {
        id: 3,
        name: '书籍杂志'
      },
      {
        id: 4,
        name: '其他物品'
      },
    ],
    index: 0,
  },

 
  onLoad: function(options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid,
      })
    }
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
        duration: 1500,
        mask: true,
       
      })
      // wx.navigateTo({
      //   url: '../index/index'
      // })
      // console.log("3333")
    }
  },
  formSubmit: function(e) {
    var openid = app.globalData.openid
    var that = this;
    if (e.detail.value.describe === "") {
      wx.showToast({
        title: '请输入宝贝名称',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    } else if (e.detail.value.describe > 20) {
      wx.showToast({
        title: '宝贝名称不得大于20字',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    } else if (e.detail.value.information === "") {
      wx.showToast({
        title: '请输入宝贝详情',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    } else if (e.detail.value.price === "") {
      wx.showToast({
        title: '请输入宝贝价格',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    } else if (e.detail.value.qq === "") {
      wx.showToast({
        title: '请输入QQ号',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    } else if (e.detail.value.name === "") {
      wx.showToast({
        title: '请输入卖家昵称',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    }  else if (e.detail.value.type === "") {
      wx.showToast({
        title: '请输入宝贝类别',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    } else if (a === "") {
      wx.showToast({
        title: '请上传图片',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    } 
    else if (!openid) {
      wx.showToast({
        title: '请先在"我的"页面中登陆',
        icon: "none",
        duration: 1300,
        mask: true,
      })
    } else {
      let params = {
        describe: e.detail.value.describe,
        information: e.detail.value.information,
        price: e.detail.value.price,
        qq: e.detail.value.qq,
        phone: e.detail.value.phone,
        type: e.detail.value.type,
        name: app.globalData.userInfo.nickName,
        fileID: a
      }
      wx.showModal({
        title: '提示',
        content: '确定发布宝贝',
        success(res) {
          if (res.confirm) {
            that.sureRelease(params); //发布
          }
        }
      })
    }
  },
  sureRelease(params) {
    let that = this
    const db = wx.cloud.database()
    this.setData({
      title: '',
      text1: '',
      info: '',
      price: '',
      num: '',
      num2: '',
      scimage: '',
     
      index: 0
    })
    db.collection('messages').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        describe: params.describe,
        information: params.information,
        fileID: params.fileID,
        price: params.price,
        qq: params.qq,
        phone: params.phone,
        type: params.type,
        name: params.name,
      },
      success(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
        wx.showToast({
          title: '宝贝发布成功',
          icon: "success",
          duration: 2000,
        })
        // wx.navigateTo({
        //   url: '../msg/msg_success',
        // })
      }
    })
  },

  doUpload: function() {
    let that = this;
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        wx.showLoading({
          title: '上传中',
        })
        const filePath = res.tempFilePaths[0]
        that.setData({
          scimage: filePath,
        })

        // 上传图片
        var TIME = util.formatTime(new Date());
        const cloudPath = TIME;
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)
            a = res.fileID
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: Number(e.detail.value)                   
      //  e.detail.value
    })
  },
  formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    return [year, month, day].map(formatNumber).join('') + [hour, minute, second].map(formatNumber).join('')
  }
})