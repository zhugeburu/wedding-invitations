/**
 * Created by brickspert on 2016/12/24.
 */
/*拨号页*/
import React, {Component} from 'react';
import './Dialing.scss';
import {browserHistory} from 'react-router';
import Back from '../../components/Back/Back';
const bgImg = require('./images/bg.jpg');
const itemImg = require('./images/phone-item.jpg');
const returnImg = require('../../asset/images/return.png');

const audioMp3 = require('./audio/dong.mp3');
const audioOgg = require('./audio/dong.ogg');

export default class Dialing extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    _goBack() {
        browserHistory.goBack(-1);
    }

    render() {
        return (
            <div className="full-page dialing-page">
                <img src={bgImg} className="bg-img"/>
                <a className="dialing-item dialing-item-1" href="tel:18868875314">
                    <img src={itemImg}/>
                    <p>新郎</p>
                </a>
                <a className="dialing-item dialing-item-2" href="tel:18768137605">
                    <img src={itemImg}/>
                    <p>新娘</p>
                </a>
                <Back />
                <img className="return" src={returnImg} onClick={()=>this._goBack()}/>
                <audio className="hidden" autoPlay>
                    <source src={audioOgg} type="audio/ogg"/>
                    <source src={audioMp3} type="audio/mpeg"/>
                </audio>
            </div>
        )
    }
}