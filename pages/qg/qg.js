// pages/qg/qg.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
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
      wx.navigateTo({
        url: '../index/index'
      })
      // console.log("3333")
    }

  },
  formSubmit: function(e) {
    var openid = app.globalData.openid
    var that = this;
    if (e.detail.value.information === "") {
      wx.showToast({
        title: '请输入求购详情',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    }  else if (e.detail.value.qq === "") {
      wx.showToast({
        title: '请输入QQ号',
        icon: "none",
        duration: 1000,
        mask: true,
      })
    }else if (!openid) {
      wx.showToast({
        title: '请先在"我的"页面中登陆',
        icon: "none",
        duration: 1300,
        mask: true,
      })
    }else{
      let params = {
        information: e.detail.value.information,
        // price: e.detail.value.price,
        qq: e.detail.value.qq,
        name: app.globalData.userInfo.nickName,
      }
      wx.showModal({
        title: '提示',
        content: '确定发布求购信息',
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
      info: '',
      // price: '',
      num: '',
    })
    db.collection('ask').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
        information: params.information,
        // price: params.price,
        qq: params.qq,
        name:params.name,
        // phone: params.phone,
      },
      success(res) {
        //res 是一个对象， 其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
        wx.showToast({
          title: '求购信息发布成功',
          icon: "success",
          duration: 2000,
        })
      }
    })
  },

})