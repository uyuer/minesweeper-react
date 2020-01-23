import React from 'react';
import { Icon } from 'antd';
import { BrowserRouter as Router, Switch, Route, Link, useParams, Redirect } from "react-router-dom";

import Footer from '../footer';
import Home from '../home';
import Select from '../select';
import styles from './style.scss';

function Btn({ bgColor, icon, name, link }) {
    return (
        <Link to={link}>
            <button className={styles.menuItem} style={{ backgroundColor: bgColor }} >{icon} {name}</button>
        </Link>
    )
}

function MenuBtn(params) {
    let colors = [
        '#33cabc', '#e99315', '#f44336', '#673ab7', '#03a9f4'
    ]
    let buttons = [
        {
            bgColor: '#33cabc',
            icon: <Icon type="play-square" />,
            name: '开始游戏',
            link: '/select'
        },
        {
            bgColor: '#e99315',
            icon: <Icon type="history" />,
            name: '历史统计',
            link: '/history'
        },
        {
            bgColor: '#f44336',
            icon: <Icon type="setting" />,
            name: '游戏设置',
            link: '/setting'
        },
        {
            bgColor: '#673ab7',
            icon: <Icon type="info-circle" />,
            name: '关于我们',
            link: '/aboutUs'
        },
        {
            bgColor: '#03a9f4',
            icon: <Icon type="more" />,
            name: '更多游戏',
            link: '/more'
        },
    ]
    return buttons.map((item, index) => {
        return <Btn {...item} key={index} />
    })
}

class Content extends React.Component {
    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.menu}>
                    <div className={styles.header}>
                        <div className={styles.userFaceContent}>
                            <div className={styles.userFace}>
                                <img src={require('../images/userFace.jpg')} alt="头像" />
                            </div>
                        </div>
                        {/* <MenuBtn /> */}
                        <Switch>
                            <Route exact path='/' component={Home}></Route>
                            <Route path='/home' component={Home}></Route>
                            <Route path='/select' component={Select}></Route>
                            <Redirect to="/home" />
                        </Switch>
                    </div>
                    <div>
                        <Footer />
                    </div>
                </div>
                <div className={styles.board}>
                    <Switch>
                        <Route exact path='/play' component={Home}></Route>
                    </Switch>
                </div>
            </div >
        )
    }
}

export default Content;