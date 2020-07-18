//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // grids: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  //   grids: [ { name: "我的收藏", img: "../../images/icon_wdfb", url: "index1" }, { name: "宝贝留言", img: "../../images/icon_wdfb", url: "index1" }, { name: "帮助", img: "../../images/icon_wdfb", url: "../wtfk/wtfk" }, { name: "关于我们", img: "../../images/icon_wdfb", url: "index1" }, { name: "问题反馈", img: "../../images/icon_wdfb", url: "index1" }, { name: "设置", img: "../../images/icon_wdfb", url: "index1" },],
  // },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  }
  },

  onTop() {
    // this.onGetOpenid()
    var openid = app.globalData.openid
    console.log("ontop openid:"+openid)
    if (!openid) 
    {
      wx.navigateTo({
        url: '../index/index'
      })
      console.log("11111")
      console.log("openid0:"+openid)
      wx.showToast({
        title: '请先登录',
        icon: "none",
        duration: 1000,
        mask: true,
      })
      console.log("3333")
    } else {
      wx.navigateTo({
        url: '../index1/index1?openid='+openid,
      })
      console.log('optop openid1:' + openid)
      console.log("ontop")
    }
  },

  onTap() {
    var openid = app.globalData.openid
    if (!openid) {
      wx.navigateTo({
        url: '../index/index'
      })
      wx.showToast({
        title: '请先登录',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    } else {
      wx.navigateTo({
        url: '../index2/index2?openid=' + openid,
      })
    }
    
  },

  onLoad: function() {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid,
      })
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    this.onGetOpenid()
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        console.log("00000")
        console.log("获取成功:" + app.globalData.openid)
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },

})