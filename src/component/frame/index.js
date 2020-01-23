import React from 'react';
import { Icon } from 'antd';
import { BrwserRouter as Router, Switch, Route, Link, useParams } from "react-router";
import styles from './style.scss';
import { MenuBtn } from '../component/menuBtn';

export default function Frame(params) {
    let { children } = params || {}
    return (
        <div className={styles.wrapper}>
            <div className={styles.menu}>
                <div>
                    <Header />
                    {children}
                </div>
                <div>
                    <Footer />
                </div>
            </div>
            <div className={styles.board}>

            </div>
        </div>
    )
}