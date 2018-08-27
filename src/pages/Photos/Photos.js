/**
 * Created by brickspert on 2016/12/27.
 */
import React, {Component} from 'react';
import './Photos.scss';
import {browserHistory} from 'react-router';
import Back from '../../components/Back/Back';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const leftImg = require('./images/left.png');
const rightImg = require('./images/right.png');

const photos = [
    require('../../asset/images/phone-photos/1.jpg'),
    require('../../asset/images/phone-photos/2.jpg'),
    require('../../asset/images/phone-photos/3.jpg'),
    require('../../asset/images/phone-photos/4.jpg'),
    require('../../asset/images/phone-photos/5.jpg'),
    require('../../asset/images/phone-photos/6.jpg'),
    //require('../../asset/images/phone-photos/7.jpg'),
    //require('../../asset/images/phone-photos/8.jpg'),
    //require('../../asset/images/phone-photos/9.jpg'),
    //require('../../asset/images/phone-photos/10.jpg'),
    //require('../../asset/images/phone-photos/11.jpg')
]

export default class Photos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //当前显示第几张照片
            currentIndex: 0,
            //每5S自动切换图片，如果手动切换了图片，则重置时间
            waitTime: 3,
            //动画向左还是向右边
            animate: 'photos-left'
        }
    }

    componentDidMount() {
      $('#image-gallery').lightSlider({
        gallery:true,
        item:1,
        thumbItem:10,
        slideMargin: 0,
        speed:600,
        auto:true,
        loop:true,
        onSliderLoad: function() {

        }
      });
    }

    render() {
       return (
            <div className="full-page photos-page">
              <Back position={"back-left-top"}/>
                <div className='gallery-box'>
                  <ul id='image-gallery' className='gallery'>
                    {photos.map((item, index) => (
                      <li data-thumb={item}>
                        <img src={item}/>
                      </li>
                    ))}
                  </ul>
                </div>
            </div>
        )
    };
}