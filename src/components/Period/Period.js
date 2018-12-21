import React from 'react';
import { Link } from 'react-router-dom';
import './Period.css';
import '../../style.css';

const Period = (props) => {
  return (
    <ul id="period" className="flex-c text-c size-med">
      <li className='per-link'><Link className='per-nav' to='/week'>Weekly</Link></li>
      <li className='per-link'><Link className='per-nav' to='/hour'>Hourly</Link></li>
      <li className='per-link'><Link className='per-nav' to='/current'>Current</Link></li>
      <li className='per-link'><Link className='per-nav' to='/minute'>Minutely</Link></li>
    </ul>
  )
}

export default Period;