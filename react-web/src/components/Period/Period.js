import React from 'react';
import { Link } from 'react-router-dom';
import './Period.css';
import '../../style.css';

const Period = (props) => {
  return (
    <ul id="period" className="flex-c text-c size-med">
      <li className='per-link'><Link className='per-nav' to='/week'><button>Weekly</button></Link></li>
      <li className='per-link'><Link className='per-nav' to='/hour'><button>Hourly</button></Link></li>
      <li className='per-link'><Link className='per-nav' to='/'><button>Current</button></Link></li>
      <li className='per-link'><Link className='per-nav' to='/minute'><button>Minutely</button></Link></li>
    </ul>
  )
}

export default Period;