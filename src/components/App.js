import React from 'react';
import Header from './UI/Header';
import { Route, Switch, Redirect } from 'react-router-dom';
import CountryDetail from './CountryDetail';
import '../Css/App.css';
import Layout from './Layout';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/country" />
        </Route>
        <Route path="/country" exact>
          <Layout />
        </Route>
        <Route path="/country/:name">
          <CountryDetail />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
