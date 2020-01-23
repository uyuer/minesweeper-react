import React from 'react';

import Modal from './modal';
import View from './view';

export default function (props) {
    return (
        <Modal {...props}>
            {
                (prop) => <View {...prop} />
            }
        </Modal>
    )
}
