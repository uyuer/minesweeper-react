import React from 'react';
import { ConfigProvider } from 'antd';
// import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';

import Home from '../home';
import Select from '../select';
import Play from '../play';
import Fund from '../fund';

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

function App() {
    return (
        <ConfigProvider locale={zhCN}>
            <Router>
                <Switch>
                    <Route exact path='/' component={Home}></Route>
                    <Route path='/home' component={Home}></Route>
                    <Route path='/select' component={Select}></Route>
                    <Route path='/play/:grade' component={Play}></Route>
                    <Route path='/fund' component={Fund}></Route>
                    <Redirect to="/home" />
                </Switch>
            </Router>
        </ConfigProvider >
    );
}

export default App;
