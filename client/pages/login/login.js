/*
 * 酱茄小程序开源版 v1.5.0
 * Author: 酱茄
 * Help document: https://www.jiangqie.com/ky
 * github: https://github.com/longwenjunjie/jiangqie_kafei
 * gitee: https://gitee.com/longwenjunj/jiangqie_kafei
 * Copyright © 2020-2021 www.jiangqie.com All rights reserved.
 */

const Util = require('../../utils/util');
const Auth = require('../../utils/auth');
const Api = require('../../utils/api.js');
const Rest = require('../../utils/rest');

Page({

    data: {
        background: "https://imzxh.cn/wp-content/uploads/2020/08/1f13ee20d45eaea2fd23819bb5bce727.jpeg",
        title: ''
    },

    onLoad: function (options) {
        this.setData({
            title: this.data.hitokoto,//getApp().appName
        });
         // hitokoto 一言
         hitokoto.load(result => {
            console.log("https://v1.hitokoto.cn/ 获取内容:" + result.hitokoto)
            // 下面是处理逻辑示例
            this.setData({
                hitokoto: result.hitokoto
            });
          });
    },

    onShareAppMessage: function () {
        return {
            title: this.data.hitokoto,//getApp().appName,
            path: 'pages/index/index',
        }
    },

    onShareTimeline: function () {
        return {
            title: getApp().appName,
        }
    },

    handlerCancelClick: function (e) {
        Util.navigateBack();
    },

    handlerLoginClick: function (e) {
        wx.getUserProfile({
            desc: '使用微信的头像昵称初始化用户',
            success: function (wxu) {
                Auth.getWXUser().then(res => {
                    return Rest.get(Api.JIANGQIE_USER_LOGIN, {
                        code: res.code,
                        nickName: wxu.userInfo.nickName,
                        avatarUrl: wxu.userInfo.avatarUrl,
                    })
                }).then(res => {
                    let user = res.data;
                    Auth.setUser(user);

                    Util.navigateBack();
                });
            },
            fail: function (err) {
                Util.toast('需要同意才能登录');
            }
        });
    }
})