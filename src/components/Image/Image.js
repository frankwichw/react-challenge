import React from 'react';
import './Image.css';

const Image = props => (
    <img src={props.url} onClick={props.imageOnClick} className='image' id={props.id} style={{width: props.width, height: props.height}}/>
);

export default Image;
