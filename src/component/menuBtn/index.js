import React from 'react';

import { Link } from "react-router-dom";

import styles from './style.scss';

export function Btn({ bgColor, icon, name, link }) {
    return (
        <Link to={link}>
            <button className={styles.menuItem} style={{ backgroundColor: bgColor }} >{icon} {name}</button>
        </Link>
    )
}

export function MenuBtn(params) {
    let { buttons = [] } = params || {};
    // let defaultColors = [
    //     '#33cabc', '#e99315', '#f44336', '#673ab7', '#03a9f4'
    // ]

    return buttons.map((item, index) => {
        return <Btn {...item} key={index} />
    })
}