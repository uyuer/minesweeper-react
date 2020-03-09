import React from 'react';
import { useParams } from "react-router-dom";
import { Icon } from 'antd';
import styles from './style.scss';
import { MenuBtn } from '../component/menuBtn';
import Header from '../header';
import Footer from '../footer';

function Select() {
    console.log(useParams)
    let { id } = useParams();
    console.log(id)
    let buttons = [
        {
            bgColor: '#4caf50',
            icon: null,
            name: '简单 9x9',
            link: '/play/simple'
        },
        {
            bgColor: '#e99315',
            icon: null,
            name: '普通 16x9',
            link: '/play/normal'
        },
        {
            bgColor: '#f44336',
            icon: null,
            name: '困难 16x16',
            link: '/play/diffcult'
        },
        {
            bgColor: '#673ab7',
            icon: null,
            name: '自定义',
            link: '/custom'
        },
    ]
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.title}>选择游戏难度</div>
            </div>
            <div className={styles.content}>
                <MenuBtn buttons={buttons} />
            </div>
            <div className={styles.footer}>
                <Footer />
            </div>
        </div>
    )
}

export default Select;