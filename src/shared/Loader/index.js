import React from 'react';
import { PropTypes } from 'prop-types';
import './index.scss';

const Loader = React.memo(props => 
    <article className={`spiner-box ${props.className}`}>
        <div className=''>
            <div className='spinner3'>
                <div className='rect1'/>
                <div className='rect2'/>
                <div className='rect3'/>
                <div className='rect4'/>
                <div className='rect5'/>                         
            </div>
        </div>
    </article>   
);

export default Loader;

Loader.propTypes = {
    className : PropTypes.string.isRequired,
}