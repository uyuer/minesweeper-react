import React from 'react';
import styles from './style.scss';
import Header from '../header';
import Footer from '../footer';
import gameConfig, { gridSize } from './../config/index';
import { Icon } from 'antd';
import moment from 'moment';

export default class Play extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            level: null,
            gameData: null,
            boardStyle: {},
            gridStyle: {},
            historyIndex: -1,
            historyGameData: [],
        }
        this.timer = null;
        this.board = React.createRef();
    }
    gameStatus = {
        grade: null, // 游戏难度 字符串
        config: null, // 游戏难度详细配置 对象
        gStatus: 0, // [0: '未开始', 1: '进行中', 2: '暂停', 3: '游戏胜利', 4: '游戏失败'] 字符串
        startTime: '',
        endTime: '',
        time: 0,
        flag: 0,
        findMines: 0,
        // 统计信息 对象 {游戏状态, 开始时间, 结束时间, 游戏时长, 插旗标记数, 查杀炸弹数}
    }
    componentWillMount() {

    }
    componentDidMount() {
        this.init();
        // this.board.current.addEventListener('contextmenu', (e) => {
        //     e.preventDefault()
        //     e.stopPropagation()
        //     console.log(123, e)
        // })
    }
    init = () => {
        let { grade } = this.props.match.params;
        let config = gameConfig[grade];
        if (!this.board) {
            return;
        }
        this
            .initGameStatus()
            .createGame()
            .timeStart();
    }
    initGameStatus = () => {
        let { grade } = this.props.match.params;
        let config = gameConfig[grade];
        this.changeGameStatus({
            grade,
            config,
            gStatus: 1,
            startTime: new Date().getTime(),
            time: 0,
            flag: 0
        });
        return this;
    }
    initTime = () => {
        this
            .clearTimer()
            .setState({
                time: 0
            })
        return this;
    }
    timeStart = () => {
        this.clearTimer();
        this.timer = setInterval(() => {
            let time = this.gameStatus.time + 1;
            this
                .changeGameStatus({ time })
                .setState({ time });
        }, 1000);
        return this;
    }
    clearTimer = () => {
        clearInterval(this.timer);
        return this;
    }
    // 时间转换, 将秒计数转换为分秒
    convertTime = (time) => {
        let minute = Math.floor(time / 60);
        let minuteStr = minute > 9 ? minute : '0' + minute;
        let second = time % 60;
        let secondStr = second > 9 ? second : '0' + second;
        if (minute >= 60) {
            return '59:59';
        }
        return minuteStr + ':' + secondStr;
    }

    // 构建数据
    createGame() {
        let { grade, config } = this.gameStatus;
        let { amount, rectangle } = config;
        let [x, y] = rectangle;
        if (!grade) {
            return;
        }
        let boardStyle = {
            width: x * gridSize,
            height: y * gridSize,
        }
        let gridStyle = {
            width: gridSize,
            height: gridSize,
            lineHeight: gridSize + 'px'
        }
        let piece = {
            status: 0, // 状态
            num: 0, // 显示数字
        };
        let arr = new Array(x * y - amount).fill(Object.defineProperty({ ...piece, isMines: 0 }, 'isMines', {
            writable: false,
        }));
        let minesArr = new Array(amount).fill(Object.defineProperty({ ...piece, isMines: 1 }, 'isMines', {
            writable: false,
        }));
        let data = [...arr, ...minesArr];
        for (let i = 0; i < data.length; i++) {
            let j = Math.floor(Math.random() * data.length);
            let temp = data[i];
            data[i] = data[j];
            data[j] = temp;
        }
        this.setState({
            gameData: data,
            boardStyle,
            gridStyle,
        }, this.history);
        console.log(data);
        return this;
    }
    // 生成长度为10的数组a, 压入1~10(或其他你想要的数)
    // for (i = a.length - 1; i > 0; i--) {
    //     生成一个0~i的随机数j(0 <= j < i)
    //     交换a[i]和a[j]
    // }

    // 更改游戏状态
    changeGameStatus = (value = {}) => {
        this.gameStatus = { ...this.gameStatus, ...value };
        return this;
    }
    // 更改单条数据内容
    pieceDataChange = (gameData, index, value) => {
        let [x, y] = this.gameStatus.config.rectangle;
        gameData[index] = { ...gameData[index], ...value };
        return gameData;
    }

    // changeGameData = (index, newValue) => {
    //     let { gameData } = this.state;
    //     gameData.splice(index, 1, newValue);
    //     this.setState({
    //         gameData
    //     });
    //     return this;
    // }
    // computeNewData = (gameData, index, newValue) => {
    //     gameData.splice(index, 1, newValue);
    //     return gameData;
    // }

    // 左键点击
    onClickHandle = (index, item, e) => {
        console.log(index, e)
        let { gStatus } = this.gameStatus;
        if (gStatus != 1) {
            return;
        }
        let { isMines, status } = item;
        if (status != 0) {
            return;
        }
        if (isMines) {
            this.onClickMines(index)
                .changeGameStatus({ gStatus: 4 })
                .clearTimer()
                .gameOver()
        } else {
            this.computeMinesHandle(index);
        }
        console.log(this.gameStatus);
    }
    // 右键点击
    onContextMenuHandle = (index, item, e) => {
        e.preventDefault();
        let { gameData } = this.state;
        let tempStatus = 0;
        switch (item.status) {
            case 0: tempStatus = 1; this.gameStatus.flag += 1; break;
            case 1: tempStatus = 2; this.gameStatus.flag -= 1; break;
            case 2: tempStatus = 0; break;
            default: return;
        }
        let newData = this.pieceDataChange(gameData, index, { status: tempStatus });
        this.setState({
            gameData: newData,
        }, this.history)
        console.log(this.gameStatus);
    }

    // 点击炸弹, 将点击炸弹状态更改为红色爆炸, 返回this
    onClickMines = (index) => {
        this.setState({
            gameData: this.pieceDataChange(this.state.gameData, index, { status: 4 })
        })
        return this;
    }
    // 游戏结束
    gameOver = (index) => {
        let { gameData } = this.state;
        gameData.splice(index, 1, { ...gameData[index], gStatus: 4 });
        this.setState({
            gameData
        })
    }
    // 判断是否获胜
    isWin = (newData) => {
        let gameData = newData ? newData : this.state.gameData;
        let { flag, config } = this.gameStatus;
        if (flag > config.amount) {
            return false;
        }
        let amount = gameData.reduce((total, currentValue, index, arr) => {
            let { isMines, status } = currentValue;
            if ((status === 0 || status === 1 || status === 2)) {
                total++
            }
            return total;
        }, 0);
        if (amount === config.amount) {
            return true;
        }
        return false;
    }
    // 点击后检查不是炸弹, 则开始计算
    computeMinesHandle = (i) => {
        let { gameData } = this.state;
        let [x, y] = this.gameStatus.config.rectangle;
        let initX = i % x;
        let initY = Math.floor(i / x);

        let newData = this.compute(gameData, [initX, initY], 1);
        console.log(newData, this.gameStatus);
        let res = false;

        this.setState({ gameData: newData }, () => {
            this.history();
            let res = this.isWin();
            if (res) {
                this.changeGameStatus({ gStatus: 3, endTime: new Date().getTime() })
                console.log('获胜', this.gameStatus);
            }
        })
    }

    // pieceDataChange = (gameData, coordinates, value) => {
    //     let [x, y] = this.state.level.rectangle;
    //     let index = coordinates[0] + coordinates[1] * x;
    //     gameData[index] = { ...gameData[index], ...value };
    //     return gameData;
    // }
    // 此处有bug!!!!
    compute = (gameData, [currentX, currentY], count, checkObj = {}) => {
        // TODO: 优化问题:边界时会对方块重复检查
        let [x, y] = this.gameStatus.config.rectangle;
        // 坐标点周围待检查方块,过滤坐标点超出的方块和非正常方块
        // 调整了一下检查顺序[顺序检查->对角检查]
        let toCheck = [
            [currentX - 1, currentY - 1], // 左上角
            [currentX + 1, currentY + 1], // 右下角
            [currentX + 1, currentY - 1], // 右上角
            [currentX - 1, currentY + 1], // 左下角

            [currentX, currentY],

            [currentX + 0, currentY - 1], // 上中块
            [currentX + 0, currentY + 1], // 下中块
            [currentX - 1, currentY + 0], // 左中块
            [currentX + 1, currentY + 0], // 右中块

        ].reduce((total, currentValue, index, arr) => {
            let [cX, cY] = currentValue;
            if (cX < x && cX >= 0 && cY < y && cY >= 0 && gameData[cX + cY * x].status === 0) {
                total.push(currentValue);
            }
            return total;
        }, []);
        // 待计算方块
        let toCalculate = [];
        // 判断周围是否有炸弹, 没有炸弹重新执行本函数, 有炸弹则更改当前检查点数据及状态并停止计算
        let minesArray = toCheck.reduce((total, currentValue, index, arr) => {
            let [cX, cY] = currentValue;
            let cIndex = cX + cY * x;
            let { status, isMines } = gameData[cIndex];
            if (status === 0 && !isMines) {
                toCalculate.push(currentValue)
            } else if (status === 0 && isMines) {
                total.push(currentValue)
            }
            return total
        }, []);

        if (minesArray && minesArray.length) {
            return this.pieceDataChange(gameData, currentX + currentY * x, { status: 3, num: minesArray.length });
        }

        if (!toCalculate || !toCalculate.length) {
            return gameData
        }

        return toCalculate.reduce(
            (total, currentValue, index, arr) => {
                return this.compute(total, currentValue, count);
            },
            [...toCalculate, [currentX, currentY]].reduce((total, currentValue) => {
                return this.pieceDataChange(total, currentValue[0] + currentValue[1] * x, { status: 3, num: minesArray.length });
            }, gameData)
        )
    }
    history = () => {
        let { gameData, historyGameData, historyIndex } = this.state;
        let str = gameData.reduce((total, currentValue, index, arr) => {
            let { status = 0, num = 0, isMines = 0 } = currentValue;
            let lastIndex = arr.length - 1;
            total += [status, num, isMines].join('') + (index >= lastIndex ? '' : ',');
            return total;
        }, '');
        historyGameData[historyIndex + 1] = str;
        this.setState({
            historyGameData,
            historyIndex: historyIndex + 1
        });
        return this;
    }
    parseHistoryData = () => {
        let { historyIndex, historyGameData } = this.state;
        let arr = historyGameData[historyIndex].split(',').reduce((total, currentValue, index, arr) => {
            let [status = 0, num = 0, isMines = 0] = currentValue.split('').map(strNum => strNum - 0);
            total.push({ status, num, isMines });
            return total;
        }, []);
        this.setState({ gameData: arr });
    }
    // 后退一步
    backStep = () => {
        let { historyIndex } = this.state;
        if (historyIndex <= 0) {
            return;
        }
        this.setState({
            historyIndex: historyIndex - 1
        }, this.parseHistoryData)
    }
    // 前进一步
    nextStep = () => {
        let { historyIndex, historyGameData } = this.state;
        if (historyIndex >= historyGameData.length - 1) {
            return;
        }
        this.setState({
            historyIndex: historyIndex + 1
        }, this.parseHistoryData)
    }
    // 重置游戏
    resetGame = () => {
        let { historyIndex, historyGameData } = this.state;
        console.log(this.timer)
        this.clearTimer()
        this
            .initGameStatus()
            .initTime()
            .timeStart()
            .setState({
                historyIndex: 0,
                historyGameData: historyGameData.splice(0, 1)
            }, this.parseHistoryData)
        // this.timeStart()
        console.log(this.gameStatus)
    }
    pause = () => {
        this
            .changeGameStatus({ gStatus: 2 })
            .clearTimer()
            .forceUpdate();
    }
    continue = () => {
        this
            .changeGameStatus({ gStatus: 1 })
            .timeStart()
            .forceUpdate();
    }
    // 回到主菜单
    goMenu = () => {
        this.props.history.push('/');
    }
    createMenuButton = () => {
        let gStatus = this.gameStatus.gStatus;
        switch (gStatus) {
            case 1: return <button onClick={this.pause}>暂停游戏</button>;
            case 2: return <button onClick={this.continue}>继续游戏</button>;
            default: return;
        }
    }
    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.menu}>
                    <div>
                        <Header />
                        <table className={styles.infoTable}>
                            <tbody className={styles.infoBody}>
                                <tr>
                                    <td>
                                        <span><Icon type="crown" /></span>
                                        <span>难度</span>
                                    </td>
                                    <td>
                                        <span>{(this.gameStatus.config && this.gameStatus.config.text)}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span><Icon type="flag" /></span>
                                        <span>标记</span>
                                    </td>
                                    <td>
                                        <span>{this.gameStatus.flag}/{(0 || (this.gameStatus.config && this.gameStatus.config.amount))}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span><Icon type="clock-circle" /></span>
                                        <span>时间</span>
                                    </td>
                                    <td>
                                        <span>{this.convertTime(this.gameStatus.time)}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <div>
                            <table>
                                <tbody className={styles.infoList}>
                                    <tr>
                                        <td>
                                            {this.createMenuButton()}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button onClick={this.resetGame}>重置本局</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button onClick={this.goMenu}>返回菜单</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button onClick={this.backStep}>后退一步</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <button onClick={this.nextStep}>前进一步</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <Footer />
                    </div>
                </div>
                <div className={styles.boardWrapper}>
                    <div style={{ position: 'relative' }}>
                        <div className={styles.board} style={this.state.boardStyle} ref={this.board}>
                            {/* <span style={this.state.gridStyle} className={styles.open}>1</span>
                            <span style={this.state.gridStyle} className={styles.open}></span>
                            <span style={this.state.gridStyle} className={styles.query}></span>
                            <span style={this.state.gridStyle} className={styles.flag}></span>
                            <span style={this.state.gridStyle} className={styles.bombMine}></span>
                            <span style={this.state.gridStyle} className={styles.aLiveMine}></span>
                            <span style={this.state.gridStyle} className={styles.deleteNothing}>6</span>
                            <span style={this.state.gridStyle} className={styles.deleteMine}>7</span> */}
                            {
                                this.state.gameData && this.state.gameData.map((item, index) => {
                                    let className = styles.default;
                                    // 未翻开-初始化 0
                                    // 未翻开-插旗 1
                                    // 未翻开-问号 2
                                    // 翻开-空白 3
                                    // 翻开-有文字 
                                    // 翻开-炸弹爆炸 红 4
                                    // 翻开-有炸弹 黑 5
                                    // 翻开-查杀炸弹 6
                                    // 翻开-查杀空 7
                                    let { isMines, status, num } = item;
                                    let colors = [
                                        '#607D8B',
                                        '#00BCD4',
                                        '#E91E63',
                                        '#3F51B5',
                                        '#009688',
                                        '#FF5722',
                                        '#03A9F4',
                                        '#795548',
                                    ]
                                    switch (status) {
                                        case 0: className = ''; break;
                                        case 1: className = styles.flag; break;
                                        case 2: className = styles.query; break;
                                        case 3: className = styles.open; break;
                                        case 4: className = styles.bombMine; break;
                                        case 5: className = styles.aLiveMine; break;
                                        case 6: className = styles.deleteMine; break;
                                        case 7: className = styles.deleteNothing; break;
                                        default: className = '';
                                    }
                                    return (
                                        <span
                                            className={className}
                                            style={{ ...this.state.gridStyle, borderColor: isMines ? '' : '', color: colors[num - 1] }}
                                            key={index}
                                            onClick={this.onClickHandle.bind(null, index, item)}
                                            onContextMenu={this.onContextMenuHandle.bind(null, index, item)}
                                        >{num > 0 ? num : ''}</span>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}