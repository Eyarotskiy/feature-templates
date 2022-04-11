import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import 'components/App/App.scss';
import Home from 'components/Home/Home';
import About from 'components/About/About';
import NotFound from 'components/NotFound/NotFound';
import Confirmation from 'components/Confirmation/Confirmation';

function App(): JSX.Element {
  return (
    <Router>
      <div className="App">
        <h2 className="title mt-0">React Routing</h2>
        <nav className="nav">
          <Link to="/" className="nav-link" data-testid="nav-home">Home</Link>
          <Link to="/about" className="nav-link" data-testid="nav-about">
            About
          </Link>
        </nav>

        <div className="divider dashed"></div>

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
