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
          title: '陈钦辉1024项璐露',
          desc: '这个一条让你又爱又疼的消息，等着你的祝福，等着你的到来',
          link: 'http://www.if-elseif-else.com',
          imgUrl: 'http://www.if-elseif-else.com/asset/images/share-icon.jpg',
          success: function () {
            // alert('success')
          },

          cancel: function () {
            // alert('cancel')
          }
        }

        wx.onMenuShareAppMessage(shareConfig);
        wx.onMenuShareTimeline($.extend(true, {}, shareConfig, {
          title: '这个一条让你又爱又疼的消息',
          desc: '',
        } ));
      });
      wx.error(function(res){
        // alert(JSON.stringify(res) + 'errpr')
      });
    }
}