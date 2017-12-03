/**
 * Created by brickspert on 2016/12/22.
 */
/*桌面*/
import React, {Component} from 'react';
import './Desktop.scss';
import {browserHistory} from 'react-router';
import {autoPlay} from 'util/audioAutoPlay'

import Bless from '../../components/Bless/Bless';
import BgImg from '../../components/BgImg/BgImg';

const bgImg = require('../../asset/images/photos/desktop-bg.jpg');

const phone = require('./images/phone.png');
const wechat = require('./images/wechat.png');
const didi = require('./images/didi.png');
const map = require('./images/map.png');

const video = require('./images/video.png');
const weibo = require('./images/weibo.png');
const photo = require('./images/photo.png');
const hand = require('./images/hand1.svg');

const count1Img = require('./images/count-1.png');
const count2Img = require('./images/count-2.png');
const count3Img = require('./images/count-3.png');
const closeImg = require('./images/close.png');
const backImg = require('./images/back.png');

const audioMp3 = require('./audio/duang.mp3');
const audioOgg = require('./audio/duang.ogg');
import {T} from 'react-toast-mobile';

var desRadioPlayed = false
window.firstIn = true
/*底部热点区组件*/
class BottomHotSpot extends Component {
    /*
     * count 新消息数量 可选为 1,2,3
     * animateType 动画类型 可选 1，2
     * left 热点区离左边的距离 例如 12px
     * */
    _getCountImg(count) {
        switch (count) {
            case 1:
                return count1Img;
            case 2:
                return count2Img;
            case 3:
                return count3Img;
        }
    }

    _redirectToUrl(url) {
        browserHistory.push({
            pathname: url
        });
    }

    render() {
        const countImg = this._getCountImg(this.props.count);
        const index = this.props.index
        const redPointClassName = this.props.animateType ? `red-point  red-point-animate-${this.props.animateType}` : `red-point`;
        return (
            <div className="bottom-hot-spot" id={'bottom-hot='+index} style={{left: this.props.left}}
                 onClick={()=>this._redirectToUrl(this.props.toUrl)}>
                <img className={redPointClassName} src={countImg}/>
            </div>
        )
    };
}
/*头部热点区组件*/
class TopHotSpot extends Component {
    /*
     * topText 头部文字
     * middleText 中间文字
     * bottomText 下部文字
     * */
    render() {
        const topText = this.props.topText;
        const middleText = this.props.middleText;
        const bottomText = this.props.bottomText;
        const index = this.props.index;
        return (
            <div className="top-hot-spot" id={'top-host-' + index} style={{left: this.props.left}} onClick={()=>this.props.click()}>
                {topText ?
                    <div className="top-text">{topText}</div>
                    :
                    ''
                }
                {middleText ?
                    <div className="middle-text">{middleText}</div>
                    :
                    ''
                }
                {bottomText ?
                    <div className="bottom-text">{bottomText}</div>
                    :
                    ''
                }
            </div>
        )
    };
}
export default class Desktop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoShow: false,
            blessShow: false,
            handShow: false
        }
    }

    _openVideo() {
        this.setState({
            videoShow: true
        });
      const bgm = document.getElementById('bgm');
      bgm && bgm.pause();
    }

    _closeVideo() {
        this.setState({
            videoShow: false
        });
      const bgm = document.getElementById('bgm');
      bgm && bgm.play();
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

    _redirectToUrl(url) {
        browserHistory.push({
            pathname: url
        });
    }

    componentDidMount() {
      if (!desRadioPlayed) {
        autoPlay('desktop-audio');
        desRadioPlayed = true
      }
      if (window.firstIn){
        window.firstIn = false
        var that = this
        this.setState({
          handShow: true
        });
        setTimeout(()=> {
          T.notify('App图标都可以点击哦!');
        }, 3000);
        setTimeout(()=> {
          this.setState({
            handShow: false
          });
        }, 7000);
      }
    }

    render() {
        return (
            <div className="full-page desktop-page">
                {/*背景照片*/}
                <BgImg src={bgImg} animate={false}/>
                <div className="bg">
                    {/*上部热定区*/}
                    <div className="top-box">
                        <TopHotSpot left="0rem" bottomText={'日期'}  index='1' click={()=>this._redirectToUrl('/integrated')}/>
                        <TopHotSpot left="1.8rem" bottomText={'祝福'}index='2'  click={()=>this._openBless()}/>
                        <TopHotSpot left="3.6rem" bottomText={'相册'} index='3' click={()=>this._redirectToUrl('/photos')}/>
                        <TopHotSpot left="5.37rem" bottomText={'视频'} index='4' click={()=>this._openVideo()}/>
                        <div className="top-icon data-icon">
                        <span className='day'>星期日</span>
                        <span className='num'>17</span>
                      </div>
                        <img src={weibo} className="top-icon"/>
                        <img src={photo} className="top-icon"/>
                        <img src={video} className="top-icon video-icon"/>
                    </div>

                    {this.state.handShow ? <img className="guide-hand guide-rotate" src={hand}/>
                      : ''
                    }

                    <div className="white-bottom">
                      {/*下部热点区*/}
                      <BottomHotSpot count={2} left="-0.1rem" animateType={2} index='1' toUrl={'/dialing'}/>
                      <BottomHotSpot count={2} left="1.66rem" animateType={2} index='2' toUrl={'/wechatbar'}/>
                      <BottomHotSpot count={1} left="3.46rem" animateType={1} index='4' toUrl={'/map'}/>
                      <BottomHotSpot count={1} left="5.24rem" index='3' toUrl={'/photograph'}/>
                      <img src={phone} className="bottom-icon"/>
                      <img src={wechat} className="bottom-icon"/>
                      <img src={map} className="bottom-icon"/>
                      <img src={didi} className="bottom-icon"/>
                    </div>
                </div>
                <audio className="hidden" id="desktop-audio">
                    <source src={audioOgg} type="audio/ogg"/>
                    <source src={audioMp3} type="audio/mpeg"/>
                </audio>

                {/*视频*/}
                {this.state.videoShow ?
                    <div className='video'>
                        <img src={backImg} className="back" onClick={()=>this._closeVideo()}/>
                        <img src={closeImg} className="close" onClick={()=>this._closeVideo()}/>
                        <iframe height='498' width='640' src='http://player.youku.com/embed/XMzE2OTcwMTkxNg==' frameBorder='0' allowFullScreen></iframe>
                    </div>
                    :
                    ''
                }
                {/*祝福*/}
                {this.state.blessShow ?
                    <Bless close={()=> this._closeBless()}/>
                    : ''
                }
            </div>
        );
    }
}