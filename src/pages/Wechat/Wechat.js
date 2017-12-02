/**
 * Created by brickspert on 2016/12/25.
 */
/*微信聊天页面*/
import React, {Component} from 'react';
import './Wechat.scss';
import {browserHistory} from 'react-router';
import BgImg from '../../components/BgImg/BgImg';
import Back from '../../components/Back/Back';
import voiceImg1 from './images/message1.png';
import voiceImg2 from './images/message2.png';
import voice from './images/voice.svg';
import smile from './images/smile.svg';
import plus from './images/plus.svg';

const bgImg = require('./images/bg.png');
const boyImg = require('../../asset/images/photos/wechat-boy.jpg');
const girlImg = require('../../asset/images/photos/wechat-girl.jpg');

const boyAudioMp4 = require('../../asset/audio/wechat-boy.mp4');
const girlAudioMp4 = require('../../asset/audio/wechat-girl.mp4');

class WechatItem extends Component {

    render() {
        const {avatar, topText, middleText, bottomText} = this.props;
        return (
            <div className="wechat-item" onClick={()=>this.props.click()}>
                <img className="wechat-item-avatar" src={avatar}/>
                <div className={`wechat-item-text ${this.props.animateClass}`}>
                    <img src={topText == '新郎' ? voiceImg1: voiceImg2}/>
                </div>
            </div>
        )
    }
}

export default class Wechat extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    _goBack() {
        browserHistory.goBack(-1);
    }

    _playBoyAudio() {
        const audioElement = document.getElementById('wechat-audio');
        audioElement.src = boyAudioMp4;
        audioElement.play();
    }

    _playGirlAudio() {
        const audioElement = document.getElementById('wechat-audio');
        audioElement.src = girlAudioMp4;
        audioElement.play();
    }

    render() {
        return (
            <div className="full-page wechat-page">
                <Back onClick={()=>this._goBack()} />
                <BgImg src={bgImg} animate={false}/>
                <div className="item-box">
                  <WechatItem avatar={boyImg} topText={'新郎'} bottomText={'语音消息'} animateClass={'wechat-item-animate-1'}
                              click={()=>this._playBoyAudio()}/>
                  <WechatItem avatar={girlImg} topText={'新娘'} bottomText={'语音消息'} animateClass={'wechat-item-animate-2'}
                              click={()=>this._playGirlAudio()}/>

                  <audio className="hidden" id="wechat-audio">
                    <source src="" type="audio/mpeg"/>
                  </audio>
                  <div className="bottom-bar">
                      <img className="voice" src={voice}/>
                      <span className="input"></span>
                      <img className="smile" src={smile}></img>
                      <img className="plus" src={plus}></img>
                  </div>
                </div>
            </div>
        )
    }
}