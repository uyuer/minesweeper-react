import React from 'react';

import { Button } from 'antd';
import { Link } from 'react-router-dom';
import NP from 'number-precision';

import styles from './style.scss';

import EchartLine from '../../component/echarts/echartLine';

import {
    // buyDate,
    // confirmDate,
    sameAmount,
    theLatestNet,
    buyShare,
    holdShare,
    holdTheAmount,
    holdCost,
    totalPrincipal,
    // profitAndLoss,
    profitAndLossAmount,
    profitAndLossRate,
} from './../config';

export default class FundChart extends React.Component {
    componentDidMount() {
    }
    render() {
        console.log('props 变化')
        let { fund, fundKey } = this.props;

        let disposalData = [];
        let temp = {};
        console.log(fund[fundKey].data)
        fund[fundKey].data.map((item, index) => {
            let tempItem = temp[item.confirmDate];
            if (tempItem) {
                item = {
                    ...tempItem,
                    ...item,
                    sameAmount: NP.plus(item.sameAmount, tempItem.sameAmount),
                    buyShare: NP.plus(item.buyShare, tempItem.buyShare),
                }
                let j = disposalData.findIndex((o) => {
                    if (o.confirmDate === item.confirmDate) {
                        return true;
                    }
                    return false;
                })
                if (j < 0)
                    return null;
                disposalData.splice(j, 1, item);
            } else {
                disposalData[disposalData.length] = item;
            }
            temp[item.confirmDate] = item;
            return null;
        })
        console.log(disposalData)

        let options1 = {
            title: {
                text: `${fund[fundKey].name} (${fund[fundKey].code})`,
            },
            legend: {
                data: [
                    theLatestNet.text,
                    holdCost.text,
                    profitAndLossRate.text,
                    profitAndLossAmount.text,
                ]
            },
            xAxis: {
                data: disposalData.map((item, index) => {
                    return item.confirmDate
                })
            },
            toolbox: false,
            color: [
                '#2196f3', '#E91E63', // 蓝色 红色
                '#71ccd1', '#ff5722', // 水绿色 橘色
            ],
            visualMap: [
                {
                    seriesIndex: 2,
                    top: 90,
                    right: 10,
                    pieces: [
                        { lt: 0, color: '#f51100' },
                        { gt: 0, color: '#71ccd1' },
                    ],
                    outOfRange: {
                        color: '#999'
                    }
                },
                {
                    seriesIndex: 3,
                    top: 10,
                    right: 10,
                    pieces: [
                        { gt: 1, color: '#ff5722' },
                        { lt: -1, color: '#388E3C' }
                    ],
                    outOfRange: {
                        color: '#999'
                    }
                }
            ],
            series: [
                // 最新净值
                {
                    name: theLatestNet.text,
                    type: 'line',
                    data: disposalData.map((item, index) => {
                        return item[theLatestNet.name];
                    }),
                },
                // 持仓成本价
                {
                    name: holdCost.text,
                    type: 'line',
                    data: disposalData.map((item, index) => {
                        return item[holdCost.name];
                    }),
                },
                // 涨幅
                {
                    name: profitAndLossRate.text,
                    type: 'bar',
                    data: disposalData.map((item, index) => {
                        return item[profitAndLossRate.name];
                    }),
                },
                // 持有收益
                {
                    name: profitAndLossAmount.text,
                    type: 'line',
                    data: disposalData.map((item, index) => {
                        return item[profitAndLossAmount.name];
                    }),
                },
            ]
        }

        let options2 = {
            title: {
                text: ``,
            },
            legend: {
                data: [
                    sameAmount.text,
                    buyShare.text,
                ]
            },
            xAxis: {
                data: disposalData.map((item, index) => {
                    return item.confirmDate
                })
            },
            toolbox: false,
            color: [
                // '#03A9F4', '#ff5722', '#3F51B5',
                // '#E91E63', '#F44336',
                // '#4CAF50', '#009688',
                // '#607d8b',
                '#009688', '#00BCD4'
            ],
            series: [
                // 定投金额和购入份额为一对
                // 定投金额 
                {
                    name: sameAmount.text,
                    type: 'line',
                    data: disposalData.map((item, index) => {
                        return item[sameAmount.name];
                    }),
                },

                // 购入份额
                {
                    name: buyShare.text,
                    type: 'line',
                    data: disposalData.map((item, index) => {
                        return item[buyShare.name];
                    }),
                },
            ]
        }

        let options3 = {
            title: {
                text: ``,
            },
            legend: {
                data: [
                    theLatestNet.text,
                    holdCost.text,
                ]
            },
            xAxis: {
                data: disposalData.map((item, index) => {
                    return item.confirmDate
                })
            },
            toolbox: false,
            color: [
                '#2196f3', '#E91E63', // 蓝色 红色
                '#71ccd1', '#ff5722', // 水绿色 橘色
            ],
            series: [
                // 最新净值
                {
                    name: theLatestNet.text,
                    type: 'line',
                    data: disposalData.map((item, index) => {
                        return item[theLatestNet.name];
                    }),
                },
                // 持仓成本价
                {
                    name: holdCost.text,
                    type: 'line',
                    data: disposalData.map((item, index) => {
                        return item[holdCost.name];
                    }),
                },
            ]
        }

        let options4 = {
            title: {
                text: ``,
            },
            legend: {
                data: [
                    holdShare.text,
                    holdTheAmount.text,
                    totalPrincipal.text,
                ]
            },
            xAxis: {
                data: disposalData.map((item, index) => {
                    return item.confirmDate
                })
            },
            toolbox: false,
            color: [
                '#03a9f4', '#ff5722', '#71ccd1',
            ],
            series: [
                // 持有份额
                {
                    name: holdShare.text,
                    type: 'line',
                    data: disposalData.map((item, index) => {
                        return item[holdShare.name];
                    }),
                },
                // 持有金额和总投入本金为一对
                // 持有金额
                {
                    name: holdTheAmount.text,
                    type: 'line',
                    data: disposalData.map((item, index) => {
                        return item[holdTheAmount.name];
                    }),
                },

                // 总投入本金
                {
                    name: totalPrincipal.text,
                    type: 'bar',
                    data: disposalData.map((item, index) => {
                        return item[totalPrincipal.name];
                    }),
                },

            ]
        }


        return (
            <div className={styles.content}>
                <div className={styles.tableContent}>
                    {/* <div id="main" style={{ height: '100%' }}></div> */}
                    {/* <EchartLine options={options} /> */}
                    <div className={styles.chartContent}>
                        <div>
                            <EchartLine options={options1} />
                        </div>
                        <div>
                            <EchartLine options={options2} />
                        </div>
                        <div>
                            <EchartLine options={options3} />
                        </div>
                        <div>
                            <EchartLine options={options4} />
                        </div>

                    </div>
                </div>
                <div className={styles.tableTitle}>
                    <div> {fund[fundKey].name} ({fund[fundKey].code})</div>
                    <div>
                        <Link to='./table'>
                            <Button>数据表格</Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

}