import React from 'react';

import ECharts from 'echarts';

export default class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.chartEle = React.createRef();
        this.myChart = null;
    }
    componentDidMount() {
        this.myChart = ECharts.init(this.chartEle.current);
        this.setOptions(this.props.options);
    }
    componentWillReceiveProps(props, nextProps) {
        console.log(props,nextProps);
        // return ;
        this.setOptions(props.options);
    }
    setOptions(options) {
        this.myChart.setOption(options);
    }
    render() {
        return (
            <div id="chart" style={{ height: '100%', width: '100%' }} ref={this.chartEle}></div>
        )
    }
}