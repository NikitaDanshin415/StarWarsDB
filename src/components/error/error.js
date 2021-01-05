import React from 'react';

import './error.css'
import ErrorImg from './error-img.png'

const Error = () =>{

    return(
        <div className='error'>
            <span>Something went wrong, we already sent the droids to fix it!</span>
            <img src={ErrorImg} alt='repair droids'/>
        </div>
    )
}

export default Error;