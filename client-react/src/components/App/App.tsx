import React from 'react';
import { Link, Navigate, useRoutes } from 'react-router-dom';
import appStyle from 'components/App/App.module.scss';
import Home from 'components/Home/Home';
import About from 'components/About/About';
import NotFound from 'components/NotFound/NotFound';
import Confirmation from 'components/Confirmation/Confirmation';
import classNames from 'classnames';
import AboutInner from 'components/About/AboutInner/AboutInner';

function App(): JSX.Element {
  const mainRoutes = {
    path: '/',
    element: <Home />,
    children: [
      {path: '*', element: <Navigate to='/404' />},
      {path: '/', element: <Home />},
    ],
  };

  const notFoundRoutes = {
    path: '404',
    element: <NotFound />,
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

  const aboutInnerRoutes = {
    path: 'about-inner',
    element: <AboutInner />,
  };

  const routing = useRoutes([
    mainRoutes,
    confirmationRoutes,
    aboutRoutes,
    aboutInnerRoutes,
    notFoundRoutes,
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
