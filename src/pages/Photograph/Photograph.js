/*拍照页面*/

import React, {Component} from 'react';
import './Photograph.scss';
import {browserHistory} from 'react-router';
import {autoPlay} from 'util/audioAutoPlay'

const bgImg = require('./images/umbrella.jpg');
const borderImg = require('./images/photo-border.png');
const blackWhiteImg = require('./images/black-white.png');
const blackImg = require('./images/black.jpg');
const weddingImg = require('./images/married-graphic.png');
const loveImg = require('./images/love-start.png');
import  Back from 'components/Back/Back';

const DidiMp3 = require('./audio/dididi.mp3');
const KachaMp3 = require('./audio/kacha.mp3');
export default class Photograph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animateStep: 0
        }
    }

    componentDidMount() {
        /*0.5秒后启动第一段动画(四次大黑圈-隐藏出现隐藏出现)*/
        this.timerFirst = setTimeout(()=> {
            this.setState({
                animateStep: 1
            });
        }, 500);
        const audioElement = document.getElementById('photograph-audio');
        /*1s后播放第一段音频*/
        this.timerFirstAudio = setTimeout(()=> {
            audioElement.src = DidiMp3;
            audioElement.play();
            autoPlay('photograph-audio');
        }, 1000);
        /*8.5秒后启动第二段动画（包含咔嚓时候的动画，和咔嚓完出现的love）*/
        this.timerSecond = setTimeout(()=> {
            this.setState({
                animateStep: 2
            });
        }, 8500);
        /*9s后播放第二段音頻*/
        this.timerSecondAudio = setTimeout(()=> {
            audioElement.src = KachaMp3;
            audioElement.play();
            autoPlay('photograph-audio');
        }, 9000);
        /*11.5秒后启动第三段动画（结果页出现）*/
        this.timerThird = setTimeout(()=> {
            this.setState({
                animateStep: 3
            });
        }, 11500);
    }

    componentWillUnmount() {
        this.timerFirst && clearTimeout(this.timerFirst);
        this.timerSecond && clearTimeout(this.timerSecond);
        this.timerThird && clearTimeout(this.timerThird);

        this.timerFirstAudio && clearTimeout(this.timerFirstAudio);
        this.timerSecondAudio && clearTimeout(this.timerSecondAudio);
    }

    _getAnimagetClass() {
        switch (this.state.animateStep) {
            case 0:
                return 'animate';
            case 1:
                return 'animate animate-first';
            case 2:
                return 'animate animate-second';
            case 3:
                return 'animate animate-third';
        }
    }

    _redirectToIntegrated() {
        browserHistory.replace({
            pathname: '/integrated'
        });
    }

    render() {
        const animateClass = this._getAnimagetClass();
        return (
            <div className="full-page photograph-page">
                <Back position={"back-left-top"} onClick={()=>this._goBack()}/>
                <div className={animateClass}>
                    <img src={bgImg} className="photo"/>
                    <img src={blackWhiteImg} className="black-white"/>
                    <img src={borderImg} className="photo-border"/>
                    <div className="photograph-focus"></div>
                    <img src={blackImg} className="black-bg"/>
                    <img src={weddingImg} className="wedding"/>
                </div>
                <audio className="hidden" id="photograph-audio">
                    <source src="" type="audio/mpeg"/>
                </audio>
            </div>
        )
    }
}