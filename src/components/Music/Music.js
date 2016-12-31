/**
 * Created by brickspert on 2016/12/21.
 */
/**右上角音乐符号**/
import React, {Component} from 'react';
import './Music.scss';

export default class Music extends Component {
    render() {
        return (
            <div className="music">
                <i className="music-icon"></i>
                <i className="circle circle-1"></i>
                <i className="circle circle-2"></i>
                <i className="circle circle-3"></i>
            </div>
        )
    }
}