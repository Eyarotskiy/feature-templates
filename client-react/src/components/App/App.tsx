import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import appStyle from 'components/App/App.module.scss';
import Home from 'components/Home/Home';
import About from 'components/About/About';
import NotFound from 'components/NotFound/NotFound';
import Confirmation from 'components/Confirmation/Confirmation';
import classNames from 'classnames';

function App(): JSX.Element {
  return (
    <Router>
      <div className={appStyle.App}>
        <h2 className={classNames(appStyle.title, appStyle.mt0)}>React Routing</h2>
        <nav className={appStyle.nav}>
          <Link to="/" className={appStyle['nav-link']} data-testid="nav-home">Home</Link>
          <Link to="/about" className={appStyle['nav-link']} data-testid="nav-about">
            About
          </Link>
        </nav>

        <div className={classNames(appStyle.divider, appStyle.dashed)}></div>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/confirmation" component={Confirmation} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;
