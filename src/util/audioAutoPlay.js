/**
 * Created by brickspert on 2017/1/3.
 */

/*ios微信音频不能自动播放问题解决*/
export function autoPlay(eId) {
    if (wx) {
      $.ajax({
        type: 'POST',
        url: '/wechat/signature',
        data: {
          url: window.location.href.split('#')[0]
        }
      }).then(function (result) {
        if (result.code === 200) {
          var config = result.data || {}
          wx.config({
            // 配置信息, 即使不正确也能使用 wx.ready
            debug: false,
            nonceStr: config.noncestr,
            timestamp: config.timestamp,
            signature: config.signature,
            appId: config.appId,
            jsApiList: [
              'checkJsApi',
              'onMenuShareTimeline',
              'onMenuShareAppMessage'
            ]
          });
        }
      })
      wx.ready(()=> {
        document.getElementById(eId).play();
        var shareConfig = {
          title: '相约98.  “码”上中奖 ',
          desc: '我们诚挚邀请您莅临第十九届投洽会三维码科技体验馆，体验不一样的三维码时代产品，更有多重好礼等您来！',
          link: 'http://www.if-elseif-else.com',
          imgUrl: 'http://www.if-elseif-else.com/asset/images/share.jpg',
          success: function () {
            alert('success')
          },

          cancel: function () {
            alert('cancel')
          }
        }
        wx.onMenuShareAppMessage(shareConfig);
        wx.onMenuShareTimeline(shareConfig);
      });
      wx.error(function(res){
        alert(JSON.stringify(res) + 'errpr')
      });
    }
}