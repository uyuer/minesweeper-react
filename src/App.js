import React from 'react';
import './App.scss';
import { ConfigProvider } from 'antd';
import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';

import Header from './header';
import Content from './content';
import Footer from './footer';
import Loading from './loading';

function App() {
	return (
		<ConfigProvider locale={zhCN}>
			<div className="App">
				<Header />
				<Content />
				<Footer />
				<Loading />
			</div>
		</ConfigProvider>
	);
}

export default App;
