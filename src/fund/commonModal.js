import React from 'react';

import NP from 'number-precision';
import moment from 'moment';

export default class CommonModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 0,
            fundKey: 0,
            fund: [
                {
                    name: '华夏恒生ETF联接(QDII)A',
                    code: '000071',
                    // buyingRate: [
                    //     { amount: [0, 1000000], rate: 0.012, discountRate: 0.0012 },
                    //     { amount: [1000000, 5000000], rate: 0.009, discountRate: 0.0009 },
                    //     { amount: [5000000, 10000000], rate: 0.006, discountRate: 0.0006 },
                    //     { amount: [10000000], rate: 0, discountRate: 0, staticRate:1000},
                    // ], // 买入规则
                    // sellingRate: [
                    //     { holdDays: [0, 7], rate: 0.015 },
                    //     { holdDays: [7], rate: 0.005 },
                    // ], // 卖出规则
                    // operatingRate: [
                    //     { name: '管理费', type: 'administrativeFee', rate: 0.006 },
                    //     { name: '托管费', type: 'trusteeFee', rate: 0.0015 },
                    //     { name: '销售服务费', type: 'salesAndServiceFees', rate: 0 },
                    // ], // 运作费率
                    buyingRate: 0.012, // 购买
                    discountRate: 0.0012,
                    data: [
                        { buyDate: '2019-08-06 09:42:02', sameAmount: 200, theLatestNet: 1.4420 },
                        { buyDate: '2019-08-06 10:21:40', sameAmount: 600, theLatestNet: 1.4420 },
                        { buyDate: '2019-08-14 08:42:27', sameAmount: 500, theLatestNet: 1.4166 },
                        { buyDate: '2019-08-20 08:16:53', sameAmount: 365.96, theLatestNet: 1.4701 },
                        { buyDate: '2019-08-26 12:34:54', sameAmount: 410.03, theLatestNet: 1.4432 },
                        { buyDate: '2019-08-26 21:32:18', sameAmount: 91, theLatestNet: 1.4461 },
                        { buyDate: '2019-08-29 12:28:36', sameAmount: 400, theLatestNet: 1.4493 },
                        { buyDate: '2019-08-29 12:31:31', sameAmount: 33.34, theLatestNet: 1.4493 },
                        { buyDate: '2019-09-02 12:14:36', sameAmount: 389.92, theLatestNet: 1.4452 },
                        { buyDate: '2019-09-02 12:23:49', sameAmount: 500, theLatestNet: 1.4452 },
                        { buyDate: '2019-09-09 09:51:31', sameAmount: 271.06, theLatestNet: 1.5020 },
                        { buyDate: '2019-09-16 09:41:34', sameAmount: 339.53, theLatestNet: 1.5257 },
                        { buyDate: '2019-09-20 08:38:53', sameAmount: 400, theLatestNet: 1.4903 },
                        { buyDate: '2019-09-23 11:18:53', sameAmount: 500.65, theLatestNet: 1.4773 },
                        { buyDate: '2019-09-24 09:32:53', sameAmount: 440.12, theLatestNet: 1.4812 },
                        { buyDate: '2019-09-26 10:59:18', sameAmount: 558.11, theLatestNet: 1.4675 },
                        { buyDate: '2019-09-27 14:52:37', sameAmount: 381.31, theLatestNet: 1.4626 },
                        { buyDate: '2019-10-09 15:02:50', sameAmount: 838.88, theLatestNet: 1.4506 },
                        { buyDate: '2019-11-07', sameAmount: 0, theLatestNet: 1.5439 },
                        { buyDate: '2019-11-13 14:52:06', sameAmount: 1000, theLatestNet: 1.4831 },
                        { buyDate: '2019-11-14 14:52:06', sameAmount: 0, theLatestNet: 1.4712 },
                        { buyDate: '2019-11-15 14:40:36', sameAmount: 300, theLatestNet: 1.4711 },
                        { buyDate: '2019-11-18', sameAmount: 0, theLatestNet: 1.4894 },
                        { buyDate: '2019-11-19', sameAmount: 0, theLatestNet: 1.5110 },
                        { buyDate: '2019-11-20', sameAmount: 0, theLatestNet: 1.5014 },
                        { buyDate: '2019-11-21 14:45:34', sameAmount: 1000, theLatestNet: 1.4819 },
                        { buyDate: '2019-11-22', sameAmount: 0, theLatestNet: 1.4912 },
                        { buyDate: '2019-11-25', sameAmount: 0, theLatestNet: 1.5133 },
                        { buyDate: '2019-11-26', sameAmount: 0, theLatestNet: 1.5084 },
                        { buyDate: '2019-11-27', sameAmount: 0, theLatestNet: 1.5101 },
                        { buyDate: '2019-11-28', sameAmount: 0, theLatestNet: 1.5049 },
                        { buyDate: '2019-11-29', sameAmount: 0, theLatestNet: 1.4767 },
                        { buyDate: '2019-12-02', sameAmount: 0, theLatestNet: 1.4817 },
                        { buyDate: '2019-12-03', sameAmount: 0, theLatestNet: 1.4774 },
                        { buyDate: '2019-12-04 14:46:43', sameAmount: 50, theLatestNet: 1.4630 },
                        { buyDate: '2019-12-05', sameAmount: 0, theLatestNet: 1.4733 },
                        { buyDate: '2019-12-06', sameAmount: 0, theLatestNet: 1.4856 },
                        { buyDate: '2019-12-09', sameAmount: 0, theLatestNet: 1.4854 },
                        { buyDate: '2019-12-10', sameAmount: 0, theLatestNet: 1.4823 },
                        { buyDate: '2019-12-11', sameAmount: 0, theLatestNet: 1.4936 },
                        { buyDate: '2019-12-12 14:51:43', sameAmount: -4909.09, theLatestNet: 1.5124 },
                        { buyDate: '2019-12-13 14:53:36', sameAmount: -2512.55, theLatestNet: 1.5481 },
                        { buyDate: '2019-12-16', sameAmount: 0, theLatestNet: 1.5360 },
                        { buyDate: '2019-12-17', sameAmount: 0, theLatestNet: 1.5553 },
                        { buyDate: '2019-12-18 14:51:22', sameAmount: -2374.35, theLatestNet: 1.5585 },
                    ],
                },
                {
                    name: '天弘中证500指数A',
                    code: '000962',
                    buyingRate: 0.01,
                    discountRate: 0.001,
                    data: [
                        { buyDate: '2019-09-05 09:09:18', sameAmount: 100, theLatestNet: 0.8863 },
                        { buyDate: '2019-09-16 09:44:36', sameAmount: 100, theLatestNet: 0.9046 },
                        { buyDate: '2019-09-26 11:00:03', sameAmount: 104.11, theLatestNet: 0.8589 },
                        { buyDate: '2019-09-27 10:08:34', sameAmount: 300, theLatestNet: 0.8645 },
                        { buyDate: '2019-10-01 08:56:41', sameAmount: 209.81, theLatestNet: 0.8541 },
                        { buyDate: '2019-10-09 10:16:48', sameAmount: 200, theLatestNet: 0.8608 },
                        { buyDate: '2019-10-22 09:48:56', sameAmount: 200.63, theLatestNet: 0.8643 },
                        { buyDate: '2019-10-24 11:04:40', sameAmount: 198.37, theLatestNet: 0.8568 },
                        { buyDate: '2019-10-31 11:44:20', sameAmount: 200, theLatestNet: 0.8502 },
                        { buyDate: '2019-11-01 10:31:51', sameAmount: 200, theLatestNet: 0.8576 },
                        { buyDate: '2019-11-06 14:27:35', sameAmount: 200, theLatestNet: 0.8594 },
                        { buyDate: '2019-11-08 14:47:17', sameAmount: 200, theLatestNet: 0.8620 },
                        { buyDate: '2019-11-11 12:37:07', sameAmount: 1000, theLatestNet: 0.8435 },
                        { buyDate: '2019-11-13 14:52:29', sameAmount: 1000, theLatestNet: 0.8433 },
                        { buyDate: '2019-11-14', sameAmount: 0, theLatestNet: 0.8494 },
                        { buyDate: '2019-11-15 14:41:39', sameAmount: 200, theLatestNet: 0.8424 },
                        { buyDate: '2019-11-18', sameAmount: 0, theLatestNet: 0.8467 },
                        { buyDate: '2019-11-19', sameAmount: 0, theLatestNet: 0.8603 },
                        { buyDate: '2019-11-20', sameAmount: 0, theLatestNet: 0.8556 },
                        { buyDate: '2019-11-21', sameAmount: 0, theLatestNet: 0.8553 },
                        { buyDate: '2019-11-22', sameAmount: 0, theLatestNet: 0.8482 },
                        { buyDate: '2019-11-25', sameAmount: 0, theLatestNet: 0.8478 },
                        { buyDate: '2019-11-26', sameAmount: 0, theLatestNet: 0.8448 },
                        { buyDate: '2019-11-27', sameAmount: 0, theLatestNet: 0.8482 },
                        { buyDate: '2019-11-28', sameAmount: 200, theLatestNet: 0.8459 },
                        { buyDate: '2019-11-29', sameAmount: 0, theLatestNet: 0.8468 },
                        { buyDate: '2019-12-02', sameAmount: 0, theLatestNet: 0.8485 },
                        { buyDate: '2019-12-03', sameAmount: 0, theLatestNet: 0.8519 },
                        { buyDate: '2019-12-04', sameAmount: 0, theLatestNet: 0.8510 },
                        { buyDate: '2019-12-05', sameAmount: 0, theLatestNet: 0.8588 },
                        { buyDate: '2019-12-06 14:55:41', sameAmount: -2339.19, theLatestNet: 0.8658 },
                        { buyDate: '2019-12-09 14:48:54', sameAmount: -781.89, theLatestNet: 0.8682 },
                        { buyDate: '2019-12-10', sameAmount: 0, theLatestNet: 0.8724 },
                        { buyDate: '2019-12-11', sameAmount: 0, theLatestNet: 0.8690 },
                        { buyDate: '2019-12-12 14:53:31', sameAmount: -780.55, theLatestNet: 0.8667 },
                        { buyDate: '2019-12-13 14:58:12', sameAmount: -394.46, theLatestNet: 0.8760 },
                        { buyDate: '2019-12-16 14:55:49', sameAmount: -133.73, theLatestNet: 0.8910 },
                        { buyDate: '2019-12-17 14:57:54', sameAmount: -90.20, theLatestNet: 0.9025 },
                        { buyDate: '2019-12-18 14:47:02', sameAmount: -180.71, theLatestNet: 0.9024 },
                    ],
                },
                {
                    name: '天弘泸深300指数C',
                    code: '005918',
                    buyingRate: 0,
                    discountRate: 0,
                    data: [
                        { buyDate: '2019-10-26 11:15:00', sameAmount: 1800, theLatestNet: 1.0668 },
                        { buyDate: '2019-10-30 12:31:58', sameAmount: 200, theLatestNet: 1.0576 },
                        { buyDate: '2019-11-01 10:30:13', sameAmount: 200, theLatestNet: 1.0735 },
                        { buyDate: '2019-11-13 14:57:01', sameAmount: 300, theLatestNet: 1.0600 },
                        { buyDate: '2019-11-15 14:41:12', sameAmount: 200, theLatestNet: 1.0541 },
                        { buyDate: '2019-11-18', sameAmount: 0, theLatestNet: 1.0623 },
                        { buyDate: '2019-11-19', sameAmount: 0, theLatestNet: 1.0723 },
                        { buyDate: '2019-11-20', sameAmount: 0, theLatestNet: 1.0623 },
                        { buyDate: '2019-11-21 14:43:27', sameAmount: 300, theLatestNet: 1.0576 },
                        { buyDate: '2019-11-22 14:54:32', sameAmount: 300, theLatestNet: 1.0472 },
                        { buyDate: '2019-11-25', sameAmount: 0, theLatestNet: 1.0543 },
                        { buyDate: '2019-11-26', sameAmount: 0, theLatestNet: 1.0578 },
                        { buyDate: '2019-11-27', sameAmount: 0, theLatestNet: 1.0536 },
                        { buyDate: '2019-11-28 14:46:23', sameAmount: 150, theLatestNet: 1.0502 },
                        { buyDate: '2019-11-29', sameAmount: 0, theLatestNet: 1.0416 },
                        { buyDate: '2019-12-02', sameAmount: 0, theLatestNet: 1.0433 },
                        { buyDate: '2019-12-03', sameAmount: 0, theLatestNet: 1.0472 },
                        { buyDate: '2019-12-04 12:41:56', sameAmount: -1765.58, theLatestNet: 1.0464 },
                        { buyDate: '2019-12-05', sameAmount: 0, theLatestNet: 1.0540 },
                        { buyDate: '2019-12-06 14:46:43', sameAmount: -1654.67, theLatestNet: 1.0599 },
                    ],
                },
                {
                    name: '天弘弘择短债债劵C',
                    code: '007824',
                    buyingRate: 0,
                    discountRate: 0,
                    data: [
                        { buyDate: '2019-10-26 11:15:00', sameAmount: 1200, theLatestNet: 1.0056 },
                        { buyDate: '2019-11-15', sameAmount: 0, theLatestNet: 1.0071 },
                        { buyDate: '2019-11-18', sameAmount: 0, theLatestNet: 1.0074 },
                        { buyDate: '2019-11-19', sameAmount: 0, theLatestNet: 1.0075 },
                        { buyDate: '2019-11-20', sameAmount: 0, theLatestNet: 1.0076 },
                        { buyDate: '2019-11-21', sameAmount: 0, theLatestNet: 1.0077 },
                        { buyDate: '2019-11-22', sameAmount: 0, theLatestNet: 1.0079 },
                        { buyDate: '2019-11-25', sameAmount: 0, theLatestNet: 1.0082 },
                        { buyDate: '2019-11-26', sameAmount: 0, theLatestNet: 1.0083 },
                        { buyDate: '2019-11-27', sameAmount: 0, theLatestNet: 1.0084 },
                        { buyDate: '2019-11-28', sameAmount: 0, theLatestNet: 1.0085 },
                        { buyDate: '2019-11-29', sameAmount: 0, theLatestNet: 1.0086 },
                        { buyDate: '2019-12-02', sameAmount: 0, theLatestNet: 1.0089 },
                        { buyDate: '2019-12-03', sameAmount: 0, theLatestNet: 1.0090 },
                        { buyDate: '2019-12-04', sameAmount: 0, theLatestNet: 1.0091 },
                    ],
                },
                {
                    name: '易方达上证50指数A',
                    code: '110003',
                    buyingRate: 0.0015,
                    discountRate: 0.0015,
                    data: [
                        { buyDate: '2019-11-22 11:23:53', sameAmount: 100, theLatestNet: 1.7809 },
                        { buyDate: '2019-11-27 14:54:18', sameAmount: 100, theLatestNet: 1.7898 },
                        { buyDate: '2019-11-28 14:05:02', sameAmount: 100, theLatestNet: 1.7839 },
                        { buyDate: '2019-11-29', sameAmount: 0, theLatestNet: 1.7542 },
                        { buyDate: '2019-12-02 14:58:00', sameAmount: 30, theLatestNet: 1.7555 },
                        { buyDate: '2019-12-03', sameAmount: 0, theLatestNet: 1.7626 },
                        { buyDate: '2019-12-04', sameAmount: 0, theLatestNet: 1.7641 },
                        { buyDate: '2019-12-05', sameAmount: 0, theLatestNet: 1.7722 },
                        { buyDate: '2019-12-06', sameAmount: 0, theLatestNet: 1.7847 },
                        { buyDate: '2019-12-09', sameAmount: 0, theLatestNet: 1.7750 },
                        { buyDate: '2019-12-10', sameAmount: 0, theLatestNet: 1.7794 },
                        { buyDate: '2019-12-11', sameAmount: 0, theLatestNet: 1.7841 },
                        { buyDate: '2019-12-12  14:59:46', sameAmount: 100, theLatestNet: 1.7774 },
                        { buyDate: '2019-12-13', sameAmount: 0, theLatestNet: 1.8144 },
                        { buyDate: '2019-12-16 14:52:11', sameAmount: 200, theLatestNet: 1.8057 },
                        { buyDate: '2019-12-17 14:58:31', sameAmount: 400, theLatestNet: 1.8216 },
                        { buyDate: '2019-12-18 14:48:25', sameAmount: 200, theLatestNet: 1.8156 },

                    ],
                    compute: () => {
                        let amount = 157.93;
                        let fund = [
                            { name: '中国平安', scale: 0.1167 },
                            { name: '贵州茅台', scale: 0.1167 },
                            { name: '伊利股份', scale: 0.0916 },
                            { name: '招商银行', scale: 0.0710 },
                            { name: '恒瑞医药', scale: 0.0621 },
                            { name: '平安银行', scale: 0.0537 },
                            { name: '五粮液', scale: 0.0513 },
                            { name: '保利地产', scale: 0.0425 },
                            { name: '中国建筑', scale: 0.0393 },
                            { name: '兴业银行', scale: 0.0373 },
                            { name: '中国太保', scale: 0.0336 },
                            { name: '长春高新', scale: 0.0310 },
                            { name: '荷兰生物', scale: 0.0306 },
                            { name: '工商银行', scale: 0.0255 },
                            { name: '大秦铁路', scale: 0.0049 }
                        ];
                        let range = [
                            {
                                '2020-01-03': [
                                    0.0012,
                                    -0.0406,
                                    -0.0079,
                                    0.0113,
                                    -0.0151,
                                    0.0191,
                                    -0.0157,
                                    -0.0240,
                                    0.0135,
                                    -0.0010,
                                    0.0219,
                                    0.0689,
                                    -0.0045,
                                    0.0050,
                                    0.0000
                                ]
                            }
                        ];
                        // amount*fund[index].scale * (1-range[date][index])
                        let rate = fund.reduce((total, currentValue, index, arr) => {
                            return {
                                total: total.total + amount * currentValue.scale * (1 - range[range.length - 1]['2020-01-03'][index]),
                                percentage: total.percentage + currentValue.scale
                            };
                        }, { total: 0, percentage: 0 });
                        console.log(rate);
                    }
                }
            ],
        }
    }
    componentWillMount() {
        let { fund } = this.state;
        let tempFund = fund.map((item, index) => {
            let { discountRate: rate, data } = item;

            let dataSource = data.reduce((total, currentValue, currentIndex, arr) => {
                // 将元转化为分计算
                let { sameAmount, theLatestNet, buyDate } = currentValue;

                let buyShare = NP.divide(NP.times(sameAmount, NP.minus(1, rate)), theLatestNet); // 购入份额  = 定投金额 / 最新净值 (保留两位小数

                let holdShare = currentIndex > 0 ? NP.plus(total[currentIndex - 1].holdShare, buyShare) : buyShare; // 持有份额 (保留两位小数

                let holdTheAmount = NP.times(holdShare, theLatestNet); // 持有金额 = 持有份额 * 最新净值 (保留两位小数

                let totalPrincipal = currentIndex > 0 ? NP.plus(total[currentIndex - 1].totalPrincipal, sameAmount) : sameAmount; // 总投入本金 = 每次定投金额累加

                let holdCost = NP.round(NP.divide(totalPrincipal, holdShare), 4); // 持仓成本价 = 总投入本金 / 持有份额 (保留四位小数

                let profitAndLoss = holdTheAmount === totalPrincipal ? 0 : holdTheAmount > totalPrincipal ? 1 : -1; // 盈亏 = 持有金额 - 总投入本金

                let profitAndLossAmount = NP.round(NP.minus(holdTheAmount, totalPrincipal), 2); // 盈亏金额 = 持有金额 -总投入本金

                let profitAndLossRate = currentIndex - 1 <= 0 ? 0 : NP.times(NP.round(NP.divide(NP.minus(theLatestNet, total[0].theLatestNet), total[0].theLatestNet), 4), 100); // 涨跌幅 = 今天净值 - 昨天净值 / 昨天净值

                let format = 'YYYY-MM-DD';

                let date = moment(buyDate);

                let dateStr = date.format(format);

                let confirmDate = moment(buyDate).isBefore(moment(dateStr + ' 15:00:00')) ? dateStr : date.add(1, 'd').format(format);

                total.push({
                    ...currentValue,
                    confirmDate,
                    buyShare: NP.round(buyShare, 2),
                    holdShare: NP.round(holdShare, 2),
                    holdTheAmount: NP.round(holdTheAmount, 2),
                    holdCost,
                    totalPrincipal,
                    profitAndLoss,
                    profitAndLossAmount,
                    profitAndLossRate,
                });
                return total;
            }, []);
            return { ...item, data: dataSource }
        })
        this.setState({
            // fundKey: 1,
            fund: tempFund
        })
    }
    // fundKeyChange = 
    render() {
        return this.props.children({
            ...this.state,
            ...this.props,
            fundKeyChange: (fundKey) => {
                this.setState({
                    fundKey
                })
            }
        })
    }
}