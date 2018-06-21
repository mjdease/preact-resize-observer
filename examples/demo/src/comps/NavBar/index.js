import { Github } from 'preact-feather';

import './NavBar.scss';

const NavBar = () => (
  <div className="navbar">
    <div className="navbar__item navbar__title">
      <h2>Preact Resize Observer</h2>
    </div>
    <a
      className="navbar__item navbar__button"
      href="https://github.com/mjdease/preact-resize-observer"
    >
      <Github className="navbar__icon" />
      Github
    </a>
  </div>
);

export default NavBar;
