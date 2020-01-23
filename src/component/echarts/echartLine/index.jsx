import React from 'react';

import Chart from '../chart';

import { extend } from './../../../utils';

import data from './aqi-beijing.json';

export default function EchartLine(params) {
    console.log(params.options, 'line')
    let defaultOption = {
        title: {
            text: 'Beijing AQI'
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            data: data.map(function (item) {
                return item[0];
            })
        },
        yAxis: {
            splitLine: {
                show: false
            }
        },
        toolbox: {
            left: 'center',
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        dataZoom: [{
            startValue: '2014-06-01'
        }, {
            type: 'inside'
        }],
        // visualMap: {
        //     top: 10,
        //     right: 10,
        //     pieces: [{
        //         gt: 0,
        //         lte: 50,
        //         color: '#096'
        //     }, {
        //         gt: 50,
        //         lte: 100,
        //         color: '#ffde33'
        //     }, {
        //         gt: 100,
        //         lte: 150,
        //         color: '#ff9933'
        //     }, {
        //         gt: 150,
        //         lte: 200,
        //         color: '#cc0033'
        //     }, {
        //         gt: 200,
        //         lte: 300,
        //         color: '#660099'
        //     }, {
        //         gt: 300,
        //         color: '#7e0023'
        //     }],
        //     outOfRange: {
        //         color: '#999'
        //     }
        // },
        series: [
            {
                name: 'Beijing AQI',
                type: 'line',
                data: data.map(function (item) {
                    return item[1];
                }),
            }
        ]
    }
    let op = extend(defaultOption, params.options);
    return (
        <div style={{ height: '100%', width: '100%' }}>
            <Chart options={op} />
        </div>
    )
}