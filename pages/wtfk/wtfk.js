// miniprogram/pages/wtfk/wtfk.js
var app = getApp();

Page({
  data: {
    array: ['请选择反馈类型', '商品相关', '物流状况', '客户服务', '优惠活动', '功能异常', '产品建议', '其他'],
    index: 0,
    inputTxt: '',
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  clearMobileNumber: function () {
    this.setData({
      //更新页面input框显示
      inputTxt: ''
    })
  },
  onLoad: function (options) {
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭
  },
   formSubmit: function (e) {
     const db = wx.cloud.database()

     db.collection('fk').add({
       // data 字段表示需新增的 JSON 数据
       data: {
         fkinformation: e.detail.value.textarea1,
         fkphone: e.detail.value.input1,
       },
       success(res) {
         // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
         console.log(res)
         wx.showToast({
           title: '反馈信息提交成功',
           icon: "success",
           duration: 2000,
         })
         // wx.navigateTo({
         //   url: '../msg/msg_success',
         // })
       }
     })

   }
})
