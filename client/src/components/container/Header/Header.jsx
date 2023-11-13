import React from 'react';

import { SubHeading } from '@/components';
import { images } from '@/constants';
import './Header.css';

const Header = () => (
  <div className="header" id="home">
    <span>Est. 1845</span>
    <h1 className="title">Oldest Bar In London</h1>
    <button>Book A Table</button>
  </div>
);

export default Header;
