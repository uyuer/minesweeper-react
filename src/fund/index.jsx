// import React from 'react';
// import { Icon, Table, Button } from 'antd';
// import NP from 'number-precision';
// import moment from 'moment';
// import { BrwserRouter as Router, Switch, Route, Link } from "react-router";
// import styles from './style.scss';

// import FundTable from './table';
// import FundChart from './chart';

// const Routes = [
//     {
//         name: '表格',
//         path: 'table',
//         exact: false,
//         component: FundTable,
//     },
//     {
//         name: '图表',
//         path: 'chart',
//         exact: false,
//         component: FundChart,
//     }
// ]
// export default function Fund(props) {
//     console.log(props);
//     const { }
//     return (
//         <Switch>
//             {
//                 Routes.map((item, i) => (
//                     <Route
//                         key={item.path + i}
//                         path={item.path}
//                         render={prop => <item.component />}
//                     />
//                 ))
//             }
//             {/* <Redirect></Redirect> */}
//         </Switch>
//     )
// }
import React from 'react';

// import Modal from './modal';
import Modal from './commonModal';
import View from './view';

import FundTable from './table';
import FundChart from './chart';

const Routes = [
    {
        name: '表格',
        path: 'table',
        exact: false,
        component: FundTable,
    },
    {
        name: '图表',
        path: 'chart',
        exact: false,
        component: FundChart,
    }
]

export default function Fund(props) {
    return (
        <Modal {...props} Routes={Routes}>
            {
                (prop) => <View  {...prop} />
            }
        </Modal>
    )
}