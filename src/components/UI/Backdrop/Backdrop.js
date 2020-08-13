import React from 'react';

import classes from './Backdrop.module.css';

const backdrop = (props) => (
    props.show ? <div style={props.style} className={classes.Backdrop} onClick={props.clicked}></div> : null
);

export default backdrop;
