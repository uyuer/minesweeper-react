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
            bgColor: '#33cabc',
            icon: <Icon type="play-square" />,
            name: '简单(9&9)',
            link: '/play/simple'
        },
        {
            bgColor: '#e99315',
            icon: <Icon type="history" />,
            name: '简单(16&9)',
            link: '/play/normal'
        },
        {
            bgColor: '#f44336',
            icon: <Icon type="setting" />,
            name: '简单(16&16)',
            link: '/play/diffcult'
        },
        {
            bgColor: '#673ab7',
            icon: <Icon type="info-circle" />,
            name: '自定义',
            link: '/custom'
        },
    ]
    return (
        <div className={styles.wrapper}>
            <div className={styles.menu}>
                <div>
                    <Header />
                    <div>
                        <div>
                            <div>back</div>
                        </div>
                        <div>
                            <MenuBtn buttons={buttons} />
                        </div>
                    </div>
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

export default Select;