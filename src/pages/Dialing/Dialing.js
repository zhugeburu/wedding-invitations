/**
 * Created by brickspert on 2016/12/24.
 */
/*拨号页*/
import React, {Component} from 'react';
import './Dialing.scss';
import {autoPlay} from 'util/audioAutoPlay'

import {browserHistory} from 'react-router';
import Back from '../../components/Back/Back';
import BgImg from '../../components/BgImg/BgImg';

const phoneTop = require('./images/phone-top.png');
const phoneBottom = require('./images/phone-bottom.png');

const itemImg = require('./images/phone-item.jpg');

const audioMp3 = require('./audio/dong.mp3');

export default class Dialing extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        /*音频延迟0.1秒播放*/
        this.audioTimer = setTimeout(()=> {
            autoPlay('dialing-audio');
            document.getElementById('dialing-audio').play();
        }, 500);
    }

    componentWillUnmount() {
        this.audioTimer && clearTimeout(this.audioTimer);
    }

    _goBack() {
        browserHistory.goBack(-1);
    }

    render() {
        return (
            <div className="full-page dialing-page">
              <img src={phoneTop} alt="" className='phone-top'/>
                <a className="dialing-item dialing-item-1" href="tel:17682342423">
                    <img src={itemImg}/>
                    <p>新郎</p>
                </a>
                <a className="dialing-item dialing-item-2" href="tel:17682344647">
                    <img src={itemImg}/>
                    <p>新娘</p>
                </a>
                <Back />
                <audio className="hidden" id="dialing-audio">
                    <source src={audioMp3} type="audio/mpeg"/>
                </audio>
              <img src={phoneBottom} alt=""  className='phone-bottom'/>
            </div>
        )
    }
}