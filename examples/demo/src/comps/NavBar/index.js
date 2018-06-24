import Github from 'preact-feather/dist/icons/github';
import Info from 'preact-feather/dist/icons/info';

import './NavBar.scss';

const NavBar = () => (
  <div className="navbar">
    <div className="navbar__item navbar__title">
      <h2>Preact Resize Observer</h2>
    </div>
    <div className="navbar__item" title="Hold any key to disable resizing">
      <Info />
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
