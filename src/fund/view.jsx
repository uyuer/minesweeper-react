import React from 'react';

import { Switch, Route, Redirect } from "react-router";

import Menu from './menu';

import styles from './style.scss';

export default function Fund(props) {
    console.log(props);
    const { Routes, match } = props;
    return (
        <div className={styles.wrapper}>
            <div className={styles.menu}>
                <Menu {...props} />
            </div>
            <div className={styles.board}>
                <Switch>
                    {
                        Routes.map((item, i) => (
                            <Route
                                key={item.path + i}
                                path={match.path + '/' + item.path}
                                render={prop => <item.component parentProp={props} {...props} {...prop} />}
                            />
                        ))
                    }
                    <Redirect to={match.path + '/' + Routes[0].path} />
                </Switch>

            </div>
        </div>
    )
}