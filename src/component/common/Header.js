import React, {PropTypes} from 'react';
import Login from './Login';


const Header = () => {
  return (
    <nav className="navbar header">
      <div className="container-fluid">
        <div className="navbar-header logo">
            <img src={require("../../img/iso.svg")} height="45"></img>
            &nbsp;
            <img src={require("../../img/logo.svg")} height="18"></img>
        </div>
        <div className="navbar-header navbar-right">
          <Login />
        </div>
      </div>
    </nav>
  );
};

export default Header;
