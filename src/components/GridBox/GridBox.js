import React from 'react';
import './GridBox.css';

const GridBox = props => (
    <div onClick={props.onClick} id={props.id} className='grid-box'>
    {props.children}
    </div>
);

export default GridBox;
