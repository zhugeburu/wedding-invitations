/**
 * Created by brickspert on 2016/12/25.
 */
/*地图页面*/
import React, {Component} from 'react';
import './Map.scss';
import {browserHistory} from 'react-router';
import  Back from 'components/Back/Back';

const hertImg = require('./images/hert.png');
const closeImg = require('./images/close.png');

const carImg = require('./images/car.png');

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

      var map = new AMap.Map('map',{
        resizeEnable: true,
        zoom: 13,
        center: [120.068608,30.89182]
      });

      //设置DomLibrary，jQuery或者Zepto
      AMapUI.setDomLibrary($);

      //引入SimpleMarker，loadUI的路径参数为模块名中 'ui/' 之后的部分
      AMapUI.loadUI(['overlay/SimpleMarker', 'control/BasicControl'], function(SimpleMarker, BasicControl) {
        //启动页面
        initMarker(SimpleMarker);

        //缩放控件
        map.addControl(new BasicControl.Zoom({
          position: 'lb'
        }));
      });

      AMapUI.load(['ui/misc/PathSimplifier'], function(PathSimplifier) {
        initPath(PathSimplifier)
      });

      function initMarker(SimpleMarker) {
        new SimpleMarker({
          iconLabel: {
            innerHTML: '<i>酒店</i>',
            style: {
              color: '#fff',
              fontSize: '11px'
            }
          },

          iconTheme: 'fresh',
          iconStyle: 'pink',
          map: map,
          position: [120.073398,30.886264]
        });

        new SimpleMarker({
          iconLabel: {
            innerHTML: '<i>新郎</i>',
            style: {
              color: '#fff',
              fontSize: '11px'
            }
          },

          iconTheme: 'fresh',
          iconStyle: 'pink',
          map: map,
          position: [120.058517,30.888096]
        });

        new SimpleMarker({
          iconLabel: {
            innerHTML: '<i>新娘</i>',
            style: {
              color: '#fff',
              fontSize: '11px'
            }
          },

          iconTheme: 'fresh',
          iconStyle: 'pink',
          map: map,
          position: [120.081783,30.884519]
        });
      }

      function initPath (PathSimplifier) {
        //创建组件实例
        var emptyLineStyle = {
          lineWidth: 0,
          fillStyle: null,
          strokeStyle: null,
          borderStyle: null
        };

        var pathSimplifierIns = new PathSimplifier({
          zIndex: 100,
          autoSetFitView: false,
          map: map, //所属的地图实例
          getPath: function(pathData, pathIndex) {
            //返回轨迹数据中的节点坐标信息，[AMap.LngLat, AMap.LngLat...] 或者 [[lng|number,lat|number],...]
            return pathData.path;
          },
          getHoverTitle: function(pathData, pathIndex, pointIndex) {
            //返回鼠标悬停时显示的信息
            if (pointIndex >= 0) {
              //鼠标悬停在某个轨迹节点上
              return pathData.name
            }
            //鼠标悬停在节点之间的连线上
            return pathData.name
          },
          renderOptions: {
            //轨迹线的样式
            pathLineStyle: {
              strokeStyle: 'pink',
              lineWidth: 4,
              dirArrowStyle: true
            },
            pathLineSelectedStyle: {
              strokeStyle: 'pink',
              lineWidth: 4,
              dirArrowStyle: true
            },

            // pathLineStyle: emptyLineStyle,
            // pathLineSelectedStyle: emptyLineStyle
          }
        });

        //这里构建两条简单的轨迹，仅作示例
        pathSimplifierIns.setData([
          {
          name: '接新娘-去程',
          path: [
            [120.057965,30.887976],
            [120.059982,30.891659],
            [120.064917,30.887718],
            [120.067427,30.886337],
            [120.073672,30.886871],
            [120.076375,30.889155],
            [120.079079,30.889228],
            [120.079782,30.88996],
            [120.082255,30.890223],
            [120.082657,30.88543],
            [120.081482,30.884735]
          ]
          }, {
          name: '接新娘-返程',
          path: [
            [120.081482,30.884735],
            [120.082657,30.88543],
            [120.082255,30.890223],
            [120.079867,30.893717],
            [120.077078,30.897068],
            [120.070169,30.898246],
            [120.068924,30.898909],
            [120.067937,30.898467],
            [120.066435,30.899277],
            [120.064761,30.899204],
            [120.064375,30.899443],
            [120.063731,30.901966],
            [120.062315,30.904028],
            [120.0621,30.904138],
            [120.060448,30.903936],
            [120.059654,30.902849],
            [120.057423,30.901561],
            [120.058367,30.897731],
            [120.058925,30.896037],
            [120.059311,30.895742],
            [120.059526,30.895632],
            [120.061199,30.893827],
            [120.060942,30.891544],
            [120.059998,30.891691],
            [120.058581,30.887751],
            [120.057938,30.887935]
            ]
          },{
              name: '',
              path: [
                [120.057965,30.887976],
                [120.059982,30.891659],
                [120.064917,30.887718],
                [120.067427,30.886337],
                [120.073672,30.886871],
                [120.076375,30.889155],
                [120.079079,30.889228],
                [120.079782,30.88996],
                [120.082255,30.890223],
                [120.082657,30.88543],
                [120.081482,30.884735],
                [120.081482,30.884735],
                [120.082657,30.88543],
                [120.082255,30.890223],
                [120.079867,30.893717],
                [120.077078,30.897068],
                [120.070169,30.898246],
                [120.068924,30.898909],
                [120.067937,30.898467],
                [120.066435,30.899277],
                [120.064761,30.899204],
                [120.064375,30.899443],
                [120.063731,30.901966],
                [120.062315,30.904028],
                [120.0621,30.904138],
                [120.060448,30.903936],
                [120.059654,30.902849],
                [120.057423,30.901561],
                [120.058367,30.897731],
                [120.058925,30.896037],
                [120.059311,30.895742],
                [120.059526,30.895632],
                [120.061199,30.893827],
                [120.060942,30.891544],
                [120.059998,30.891691],
                [120.058581,30.887751],
                [120.057938,30.887935],
                [120.05871,30.887567],
                [120.062229,30.886793],
                [120.066907,30.885504],
                [120.071327,30.884215],
                [120.072357,30.88392],
                [120.072915,30.883957],
                [120.073516,30.884694],
                [120.073602,30.885357],
                [120.073419,30.885384],
                [120.073269,30.885974]
              ]
            }
        ]

        );

        pathSimplifierIns.setZIndexOfPath(0, 100)
        pathSimplifierIns.setZIndexOfPath(1, 200)
        pathSimplifierIns.setZIndexOfPath(2, -0)

        // 创建一个巡航器
        var navg0 = pathSimplifierIns.createPathNavigator(2,
          {
            loop: true,
            speed: 700,
            pathNavigatorStyle: {
              pathLineSelectedStyle: emptyLineStyle,
              pathLinePassedStyle: {
                strokeStyle: 'red',
                lineWidth: 4,
                dirArrowStyle: true
              },
              width: 16,
              height: 32,
              content: PathSimplifier.Render.Canvas.getImageContent(carImg, onload, onerror),
              strokeStyle: null,
              fillStyle: null
            }
          });
        navg0.start();
      }
    }

    _goBack() {
        browserHistory.goBack(-1);
    }

    render() {
        return (
            <div className="full-page map-page">
                <Back position={"back-left-top"} onClick={()=>this._goBack()}/>
                <div id="map" className="map"></div>

            </div>
        )
    }
}