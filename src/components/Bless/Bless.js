/**
 * Created by brickspert on 2016/12/28.
 */
/*祝福组件*/
import React, {Component} from 'react';
import './Bless.scss';
import {getBless, commitBless} from '../../reducers/bless/bless'
import {connect} from 'react-redux';
import {T} from 'react-toast-mobile';

import {browserHistory} from 'react-router';

@connect(
    state => ({bless: state.bless}),
    {getBless, commitBless}
)
export default class Bless extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    _closeBless() {
        this.props.close();
    }

    componentDidMount() {
        this.props.getBless();
        /*防止软键盘弹出 挤压屏幕*/
        document.getElementsByTagName('html')[0].style.height = document.body.clientHeight + 'px';
    }

    _restText() {
        this.refs.blessName.value = '';
        this.refs.blessText.value = '';
        this.refs.blessNum.value = 1;
    }

    _commitBless() {
        if (this.props.committing) {
            return;
        }
        const name = this.refs.blessName.value;
        const text = this.refs.blessText.value;
        const number = this.refs.blessNum.value;
        if (name == '') {
            T.alert('留下你的大名~~');
            return;
        }
        if (name.length > 24) {
            T.alert('你名字填短点吧，放不下了~');
            return;
        }
        if (text == '') {
            T.alert('说点什么吧~亲。');
            return;
        }
        if (text.length > 200) {
            T.alert('祝福最多200个字，太多了放不下啊~');
            return;
        }
        this.props.commitBless(name, text, number, ()=>this._restText());
    }

    render() {
        // const blessPanel = this.props.bless.blesses.map((item, index)=> {
        const blessPanel = Array.apply('', new Array(10)).map(function (item) {
            return {
                name: '陈清华',
                text: '你好吗你好么你好吗你好么',
                time: '2017-12-04 23:00'
            }
        }).map((item, index)=> {
            const itemClassName = index % 2 == 0 ? "bless-item bless-item-left" : "bless-item bless-item-right";
            return (
                <div className={itemClassName} key={index}>
                    姓名：{item.name}（{item.time}）
                    <br />
                    祝福：{item.text}
                </div>
            );
        });
        return (
            <div className="bless">
                <div className="top-box">
                    <div className="left-box">
                        <input type="text" className="bless-name" ref="blessName" placeholder="请输入姓名"/>
                        <select className="bless-num" ref="blessNum">
                            <option value="1">出席1人</option>
                            <option value="2">出席2人</option>
                            <option value="3">出席3人</option>
                            <option value="4">出席4人</option>
                            <option value="5">出席5人</option>
                            <option value="6">出席6人</option>
                            <option value="0">待定</option>
                            <option value="-1">有事</option>
                        </select>
                        <textarea className="bless-text" ref="blessText" placeholder="请输入祝福的话语">
                        </textarea>
                    </div>
                    <div className="right-box">
                        <div className="commit" onClick={()=>this._commitBless()}><p>确定</p></div>
                        <div className="close" onClick={()=>this._closeBless()}><p>关闭</p></div>
                    </div>
                </div>
                <div className="bottom-box">
                    {blessPanel}
                </div>
            </div>
        )
    }
}