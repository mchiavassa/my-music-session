import React, {PropTypes} from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-md-offset-4 footer-content">
            <img src={require("../../img/iso-grey.svg")} height="80"></img>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
