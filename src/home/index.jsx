import React from 'react';
import { Icon } from 'antd';
// import { BrwserRouter as Router, Switch, Route, Link } from "react-router";

import styles from './style.scss';
import { MenuBtn } from '../component/menuBtn';
import Header from '../header';
import Footer from '../footer';

class Home extends React.Component {
    render() {
        let buttons = [
            {
                bgColor: '#009688',
                icon: <Icon type="play-square" />,
                name: '开始游戏',
                link: '/select'
            },
            {
                bgColor: '#4CAF50',
                icon: <Icon type="history" />,
                name: '历史统计',
                link: '/history'
            },
            {
                bgColor: '#FF5722',
                icon: <Icon type="setting" />,
                name: '游戏设置',
                link: '/setting'
            },
            {
                bgColor: '#03a9f4',
                icon: <Icon type="info-circle" />,
                name: '关于我们',
                link: '/aboutUs'
            },
            {
                bgColor: '#3F51B5',
                icon: <Icon type="more" />,
                name: '更多游戏',
                link: '/more'
            },
        ]
        return (
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <Header />
                    <MenuBtn buttons={buttons} />
                </div>
                <div className={styles.footer}>
                    <Footer />
                </div>
            </div>
        )
    }
}

export default Home;