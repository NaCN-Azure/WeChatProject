import common from '../../utils/common.js'

const db = wx.cloud.database()  //启用云端的数据库
const news = db.collection('news')   //获取数据库中的集合
const row = 5
var page = 0

Page({
    /**
     * 页面的初始数据
     */
    data: {
        newsList:[]
    },

    goToDetail:function(e){
        //获取携带data-id的数据
        //console.log(e)
        let id = e.currentTarget.dataset.id
        //携带新闻ID进行页面跳转
        wx.navigateTo({
          url: '../detail/detail?id='+id,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //限制从news中一次获取row(5)条数据
        news.limit(row).get({
            success:res=>{
                this.setData({
                    newsList:res.data
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        //翻下一页
        page++
        //获取当前页面的新闻记录
        //一页5条新闻，跳过5**page新闻加载下一页
        news.skip(row*page).limit(row).get({
            success:res=>{
                //获取原有的新闻页面
                let old_data = this.data.newsList
                //获取新的新闻页面
                let new_data = res.data
                //更新新闻列表
                this.setData({
                    //把这两个页面进行concat(拼接)
                    newsList:old_data.concat(new_data)
                })
            }
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})