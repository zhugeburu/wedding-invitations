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
                    <div className="text-content">
                        <p>各位坑友们：</p>
                        <p>诚挚地邀请您于2017年12月17日，星期日，11:18参加陈钦辉与项璐露的结婚典礼。</p>
                        <p>友情提醒：大红包带好，地点：湖州仁皇山花园大酒店，点击地图APP可查看</p>
                    </div>
                </div>
            </div>
        )

    }
}