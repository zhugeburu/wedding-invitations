/**
 * Created by brickspert on 2016/12/28.
 */
/*祝福组件*/
import React, {Component} from 'react';
import './Bless.scss';
import {getBless, commitBless} from '../../reducers/bless/bless'
import {connect} from 'react-redux';
import {T} from 'react-toast-mobile';

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
    }

    _commitBless() {
        if (this.props.committing) {
            return;
        }
        const name = this.refs.blessName.value;
        const text = this.refs.blessText.value;
        if (name == '') {
            T.notify('写个名字吧，好让我们知道~');
            return;
        }
        if (name.length > 24) {
            T.notify('你的网名有点长呀~');
            return;
        }
        if (text == '') {
            T.notify('快祝福我们，夸夸我们吧~');
            return;
        }
        if (text.length > 200) {
            T.notify('祝福太多啦~');
            return;
        }
        this.props.commitBless(name, text, ()=>this._restText());
    }

    render() {
        const blessPanel = this.props.bless.blesses.map((item, index)=> {
            const itemClassName = index % 2 == 0 ? "bless-item bless-item-left" : "bless-item bless-item-right";
            return (
                <div className={itemClassName} key={index}>
                    <span className="name-label">{item.name}<span className="time-lable">{item.time}</span></span>
                    <br />
                    {item.content}
                </div>
            );
        });
        return (
            <div className="bless">
                <div className="top-box">
                    <div className="left-box">
                        <input type="text" className="bless-name" ref="blessName" placeholder="请输入姓名"/>
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