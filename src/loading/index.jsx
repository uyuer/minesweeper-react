import React from 'react';
import styles from './style.scss';

class Loading extends React.Component {
    render() {
        if (true) {
            return null;
        }
        return (
            <div className={styles.wrapper}>
                <div className={styles.loading}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        )
    }
}

export default Loading;