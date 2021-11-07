import { memo } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

import pages, { NotFound } from '@pages';
import App from '../App';

const Router = () => {
  return (
    <BrowserRouter>
      <ul className="Navigation">
        {pages.map(({ name, route }) => (
          <NavLink
            key={route}
            className={({ isActive }) =>
              isActive ? 'NavLinkActive' : 'NavLink'
            }
            to={route}
          >
            {name}
          </NavLink>
        ))}
      </ul>
      <App>
        <Routes>
          {pages.map(({ Cmp, route }) => (
            <Route key={route} path={route} element={<Cmp />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </App>
    </BrowserRouter>
  );
};

export default memo(Router);
