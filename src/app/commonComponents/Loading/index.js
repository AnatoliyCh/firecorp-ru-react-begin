import React, {Fragment} from 'react';

import './styles.css';

const Loading = () => (
    <img src={require('../../../static/HeaderLogo.jpg')}
         className="loadAnimation" alt=""/>
);

export default Loading;