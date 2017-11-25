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
              'onMenuShareTimeline',
              'onMenuShareAppMessage'
            ]
          });
        }
      })
      wx.ready(()=> {
        document.getElementById(eId).play();
        var shareConfig = {
          title: '1111',
          desc: '2222',
          link: 'http://www.if-elseif-else.com/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'http://www.if-elseif-else.com/public/6446346c790e485afdd7c74bd75ba5c2.png',
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