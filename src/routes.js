import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './component/App';
import LoginCallback from './component/common/LoginCallback';
import SessionDesktop from './component/session/SessionDesk';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={SessionDesktop} />
    <Route path="callback" component={LoginCallback} />
  </Route>
);
