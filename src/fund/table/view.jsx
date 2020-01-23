import React from 'react';

import { Icon, Table, Button } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';

import styles from './style.scss';

import {
    buyDate,
    confirmDate,
    sameAmount,
    theLatestNet,
    buyShare,
    holdShare,
    holdTheAmount,
    holdCost,
    totalPrincipal,
    profitAndLoss,
    profitAndLossAmount,
} from './../config';

export default function (props) {
    const { fund, fundKey } = props;

    let columns = [
        { title: '序号', dataIndex: '', align: 'center', render: (text, record, index) => index },
        { title: buyDate.text, dataIndex: buyDate.name, align: 'center', width: '200px' },
        {
            title: confirmDate.text, dataIndex: confirmDate.name, align: 'center', render: (text, record) => {
                let { buyDate } = record;
                let format = 'YYYY-MM-DD';
                let date = moment(buyDate);
                let dateStr = date.format(format);
                if (moment(buyDate).isBefore(moment(dateStr + ' 15:00:00'))) {
                    return dateStr;
                }
                return date.add(1, 'd').format(format);
            }
        },
        { title: sameAmount.text, dataIndex: sameAmount.name, align: 'center' },
        {
            title: theLatestNet.text, dataIndex: theLatestNet.name, align: 'center', className: styles.emphasize, render: (text, record) => {
                return text
            }
        },
        { title: buyShare.text, dataIndex: buyShare.name, align: 'center' },
        { title: holdShare.text, dataIndex: holdShare.name, align: 'center' },
        { title: holdTheAmount.text, dataIndex: holdTheAmount.name, align: 'center' },
        { title: totalPrincipal.text, dataIndex: totalPrincipal.name, align: 'center' },
        { title: holdCost.text, dataIndex: holdCost.name, align: 'center', className: styles.emphasize, },
        {
            title: profitAndLoss.text, dataIndex: profitAndLoss.name, align: 'center', render: (text, record, index) => {
                switch (text) {
                    case 0: return '--';
                    case 1: return <Icon type="rise" style={{ color: '#f44336', fontSize: '18px' }} />;
                    case -1: return <Icon type="fall" style={{ color: '#4caf50', fontSize: '18px' }} />;
                    default: return '--';
                }
            }
        },
        {
            title: profitAndLossAmount.text, dataIndex: profitAndLossAmount.name, align: 'center', render: (text) => {
                switch (true) {
                    case text === 0: return '0';
                    case text > 0: return <span style={{ color: '#f44336' }}>{'+' + text}</span>;
                    case text < 0: return <span style={{ color: '#4caf50' }}>{'-' + Math.abs(text)}</span>;
                    default: return '0';
                }
            }
        },
    ]
    return (
        <div className={styles.content}>
            <div className={styles.tableContent}>
                {
                    <Table
                        className={'resetTable'}
                        title={null}
                        rowKey={'buyDate'}
                        rowClassName={(record, index) => {
                            return styles.rowStyle
                        }}
                        pagination={false}
                        columns={columns}
                        dataSource={fund[fundKey].data}
                    />
                }
            </div>
            <div className={styles.tableTitle}>
                <div> {fund[fundKey].name} ({fund[fundKey].code})</div>
                <div>
                    <Link to='./chart'>
                        <Button>数据图表</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}