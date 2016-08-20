import React, {PropTypes} from 'react';
import Login from './Login';

const Header = () => {
  return (
    <nav className="navbar header">
      <div className="container-fluid">
        <div className="navbar-header">
            Music Sessions
        </div>
        <div className="navbar-header navbar-right">
          <Login />
        </div>
      </div>
    </nav>
  );
};

export default Header;
