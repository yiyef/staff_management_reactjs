import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import store from "./redux/store";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Soldiers from "./components/Soldiers";
import SoldiersEdit from "./components/SoldiersEdit";
import SoldiersCreate from './components/SoldiersCreate';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Soldiers}/>
        {/* <Route path="/:searchItem" exact component={Soldiers}/> */}
        <Route path="/create/create" exact component={SoldiersCreate} />
        <Route path="/edit/:soldierId" exact component={SoldiersEdit}/>
 

      </Switch>
    </BrowserRouter>
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


