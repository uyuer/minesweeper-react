import React from 'react';
import styles from './style.scss';

// const HeaderBtn = () => {
//     return (
//         <div>
//             <HeaderContext.Consumer>
//                 {
//                     value => (
//                         <div >
//                             123
//                         </div>

//                     )
//                 }
//             </HeaderContext.Consumer>
//         </div>
//     )
// }
export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    render() {
        return (
            <div className={styles.header}>
                <div className={styles.userFaceContent}>
                    <div className={styles.userFace}>
                        <img src={require('../images/userFace.jpg')} alt="头像" />
                    </div>
                </div>
            </div>
        )
    }
}