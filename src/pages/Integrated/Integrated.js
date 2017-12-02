/**
 * Created by brickspert on 2016/12/31.
 */
import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import './Integrated.scss';
import Back from 'components/Back/Back';
import Bless from 'components/Bless/Bless';
import BgImg from '../../components/BgImg/BgImg';

const bgImg = require('./images/9icon.jpg');

const circle1Img = require('./images/circle-1.png');
const circle2Img = require('./images/circle-2.png');

class IntegratedItem extends Component {

    render() {
        return (
            <div className={"integrated-item " + this.props.position} onClick={()=>this.props.click()}>
                <img src={this.props.imgSrc}/>
                <p className="p-title">{this.props.title}</p>
                <p className="p-intro">{this.props.intro}</p>
            </div>
        );
    }
}

export default class Integrated extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blessShow: false
        }
    }
    componentDidMount() {

      var gardenCtx, gardenCanvas, $garden, garden;
      var $loveHeart = $(document);
      var offsetX = $loveHeart.width() / 2;
      var offsetY = $loveHeart.height() / 2 - 55;

      $(function () {
        // setup garden
        $garden = $("#garden");
        gardenCanvas = $garden[0];
        gardenCanvas.width = $loveHeart.width();
        gardenCanvas.height = $loveHeart.height()
        gardenCtx = gardenCanvas.getContext("2d");
        gardenCtx.globalCompositeOperation = "lighter";
        garden = new Garden(gardenCtx, gardenCanvas);
        // renderLoop
        setInterval(function () {
          garden.render();
        }, Garden.options.growSpeed);
      });

      function getHeartPoint(angle) {
        var t = angle / Math.PI;
        var x = 10.5 * (14 * Math.pow(Math.sin(t), 3));
        var y = - 20 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        return new Array(offsetX + x, offsetY + y);
      }

      function startHeartAnimation() {
        var interval = 100;
        var angle = 10;
        var heart = new Array();
        var animationTimer = setInterval(function () {
          var bloom = getHeartPoint(angle);
          var draw = true;
          for (var i = 0; i < heart.length; i++) {
            var p = heart[i];
            var distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
            if (distance < Garden.options.bloomRadius.max * 1.3) {
              draw = false;
              break;
            }
          }
          if (draw) {
            heart.push(bloom);
            garden.createRandomBloom(bloom[0], bloom[1]);
          }
          if (angle >= 30) {
            clearInterval(animationTimer);
          } else {
            angle += 0.2;
          }
        }, interval);
      }

      (function($) {
        $.fn.typewriter = function() {
          this.each(function() {
            var $ele = $(this), str = $ele.html(), progress = 0;
            $ele.html('');
            var timer = setInterval(function() {
              var current = str.substr(progress, 1);
              if (current == '<') {
                progress = str.indexOf('>', progress) + 1;
              } else {
                progress++;
              }
              $ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
              if (progress >= str.length) {
                clearInterval(timer);
              }
            }, 120);
          });
          return this;
        };
      })(jQuery);


        setTimeout(function () {
          startHeartAnimation();
        }, 16000);

        $("#code").typewriter();
        $('.integrated-page .bg-img img').css({
          'width': '3.5rem',
          'left': '2rem',
          'top': '1.5rem'
        })
    }

    _redirectToInvite() {
        browserHistory.push({
            pathname: '/invite'
        });
    }

    _redirectToSnapshot() {
        browserHistory.push({
            pathname: '/snapshot'
        });
    }

    _openBless() {
        this.setState({
            blessShow: true
        });
    }

    _closeBless() {
        this.setState({
            blessShow: false
        });
    }

    render() {
        return (
            <div className="full-page integrated-page">
                <BgImg src={bgImg} animate={false}/>
                <div className="bg">
                    <Back position={"integrated-back"}/>
                    <div className="text-content" id="code">
                        <p>各位<span className='delete-text'>坑友们</span>，朋友们：<br/> <span className='no-see'>非常</span> 诚挚地邀请您于2017年12月17日11:18，星期日，参加陈钦辉与项璐露的结婚典礼。<br/><span className='no-see'>特别</span>友情提醒：<span className='delete-text'>大红包带好</span>，地点：湖州仁皇山花园大酒店，点击地图APP可查看</p>
                    </div>
                </div>
              <canvas id="garden"></canvas>
            </div>
        )
    }
}