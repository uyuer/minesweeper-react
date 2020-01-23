import React from 'react';

import NP from 'number-precision';

import styles from './style.scss';

export default function (props) {
    console.log(props)
    let { fund, fundKeyChange } = props;
    return (
        <div className={styles.menuContent}>
            <div>
                <div>
                    <div></div>
                </div>
                <div>
                    {
                        fund.map(({ name, data }, index) => {
                            let { profitAndLossAmount, holdTheAmount } = data && data.length ? data[data.length - 1] : {}
                            let { profitAndLossAmount: secondProfitAndLossAmount = 0 } = data && data.length > 1 ? data[data.length - 2] : {}
                            let amount = NP.minus(profitAndLossAmount, secondProfitAndLossAmount)
                            return (
                                <div className={styles.card} key={'menu-' + index} onClick={() => fundKeyChange(index)}>
                                    <p className={styles.cardTitle}>{name}</p>
                                    <div className={styles.cardContent}>
                                        <span>
                                            <span>持有金额</span>
                                            <span>{holdTheAmount}</span>
                                        </span>
                                        <span>
                                            <span>昨日收益</span>
                                            <span className={amount > 0 ? styles.one : styles.two}>{amount}</span>
                                        </span>
                                        <span>
                                            <span>持有收益</span>
                                            <span className={profitAndLossAmount > 0 ? styles.one : styles.two}>{profitAndLossAmount}</span>
                                        </span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}