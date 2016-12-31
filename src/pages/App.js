import React, {Component} from 'react';
import {Link} from 'react-router';
import '../asset/css/common.scss';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Music from '../components/Music/Music';

export default class App extends Component {
    render() {
        return (
            <div id="root">
                <Music />
                <ReactCSSTransitionGroup
                    transitionName="page-change"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    {React.cloneElement(this.props.children, {
                        key: this.props.location.pathname
                    })}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}
