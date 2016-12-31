/**
 * Created by brickspert on 2016/12/22.
 */
/*通话页面*/
import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import './Talk.scss';
const bgImg = require('../../asset/images/photos/talk-bg.jpg');
const functionImg = require('./images/function.png');
const hungUpImg = require('./images/hung-up.png');
const audioMp3 = require('../../asset/audio/talk.mp3');

export default class Talk extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timestamp: Date.parse(new Date()) / 1000
        }
    }

    componentDidMount() {
        this.interval = setInterval(()=> {
            this.setState({
                timestamp: Date.parse(new Date()) / 1000
            });
        }, 1000);
    }

    componentWillUnmount() {
        this.interval && clearTimeout(this.interval);
    }

    _countDown(timestamp) {
        var endTimestamp = 1485820800;
        if (timestamp == 0 || timestamp >= endTimestamp) {
            return '';
        }
        var time = endTimestamp - timestamp;
        var day = Math.floor(time / 86400);
        var hour = Math.floor((time - day * 86400) / 1440);
        var minute = Math.floor((time - day * 86400 - hour * 1440) / 60);
        var second = Math.floor(time - day * 86400 - hour * 1440 - minute * 60);

        return `${day}天${hour}小时${minute}分${second}秒`;
    }

    _redirectToDesktop() {
        browserHistory.push({
            pathname: '/desktop'
        });
    }

    render() {
        const countDown = this._countDown(this.state.timestamp);
        return (
            <div className="full-page talk-page">
                <img src={bgImg} className="bg-img"/>
                <div className="bg">
                    <div className="count-down-title">婚礼倒计时</div>
                    <div className="count-down-time">{countDown}</div>
                    <img className="function" src={functionImg}/>
                    <img className="hung-up" src={hungUpImg} onClick={()=>this._redirectToDesktop()}/>
                </div>
                <audio className="hidden" autoPlay>
                    <source src={audioMp3} type="audio/mpeg"/>
                </audio>
            </div>
        )
    }
}