/**
 * Created by brickspert on 2016/12/31.
 */
import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import './Integrated.scss';
import Back from 'components/Back/Back';
import Bless from 'components/Bless/Bless';
import BgImg from '../../components/BgImg/BgImg';

const bgImg = require('./images/black_and_white.jpg');

const circle1Img = require('./images/circle-1.png');
const circle2Img = require('./images/circle-2.png');
const whiteCircleImg = require('./images/white-circle.png');

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
                    <img src={whiteCircleImg} className="white-circle"/>
                    <div className="text-content">
                        <p>各位朋友们：</p>
                        <p>诚挚地邀请您于2018年10月20日，星期六，18:00参加马威与蒋黙晗的结婚典礼。</p>
                        <p>婚宴地点：江苏省海安市年年有余大酒店</p>
                    </div>
                </div>
            </div>
        )
    }
}