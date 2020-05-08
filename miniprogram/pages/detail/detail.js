// pages/detail/detail.js
import common from '../../utils/common.js'

const db = wx.cloud.database()  //启用云端的数据库
const news = db.collection('news')   //获取数据库中的集合
//O(∩_∩)O哈哈~
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //
    },

    //添加收藏
    addFavorites:function(){
        let article = this.data.article
        wx.setStorageSync(article._id, article)
        this.setData({
            isAdd:true
        })
    },

    //取消收藏
    cancelFavorites:function(){
        let article = this.data.article
        wx.removeStorageSync(article._id)
        this.setData({
            isAdd:false
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let id = options.id

        //检查当前新闻是否已被收藏
        var newArticle = wx.getStorageSync(id)
        //新闻已存在
        if(newArticle != ''){
            this.setData({
                isAdd:true,
                article:newArticle
            })
        }
        //不存在
        else{
            //根据新闻id在云数据库中查找新闻内容
            //doc是根据唯一标识的id(数据库中的_id)去数据库查询
            news.doc(id).get({
                success:res=>{
                    //更新页面上的新闻信息和收藏状态
                    this.setData({
                        article:res.data,
                        isAdd:false
                    })
                }
            })
        }
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})