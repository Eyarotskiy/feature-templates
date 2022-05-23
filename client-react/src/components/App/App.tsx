import React from 'react';
import { Link, useRoutes } from 'react-router-dom';
import appStyle from 'components/App/App.module.scss';
import Home from 'components/Home/Home';
import About from 'components/About/About';
import Confirmation from 'components/Confirmation/Confirmation';
import classNames from 'classnames';
import AboutInner from 'components/About/AboutInner/AboutInner';
import NotFound from 'components/NotFound/NotFound';

function App(): JSX.Element {
  const mainRoutes = {
    path: '/',
    children: [
      // {path: '*', element: <Navigate to='/404' />},
      {path: '*', element: <NotFound />},
      {path: '/', element: <Home />},
    ],
  };

  const confirmationRoutes = {
    path: 'confirmation',
    element: <Confirmation />,
  };

  const aboutRoutes = {
    path: 'about',
    element: <About />,
    children: [
      {path: '/about/about-inner/:id', element: <AboutInner />},
    ],
  };

  const routing = useRoutes([
    mainRoutes,
    confirmationRoutes,
    aboutRoutes,
  ]);

  return (
    <div className={appStyle.App}>
      <h2 className={classNames(appStyle.title, appStyle.mt0)}>React Routing</h2>
      <nav className={appStyle.nav}>
        <Link to="/" className={appStyle['nav-link']} data-testid="nav-home">Home</Link>
        <Link to="/about" className={appStyle['nav-link']} data-testid="nav-about">
          About
        </Link>
      </nav>

      <div className={classNames(appStyle.divider, appStyle.dashed)}></div>

      {routing}
    </div>
  )
}

export default App;
