import { Component, options } from 'preact';
import PropTypes from 'prop-types';
import ResizeObserver from 'preact-resize-observer/dev';

import './style';

export default class App extends Component {
  /* eslint-disable-next-line react/sort-comp */
  constructor() {
    super();

    this.state = {
      width: 0,
      height: 0
    };
  }

  handleResize = (width, height) => {
    this.setState({
      width,
      height
    });
  }

  render() {
    return (
      <ResizeObserver id="app" onResize={this.handleResize}>
        <div className="stats">
          <h2>{this.state.width} x {this.state.height}</h2>
        </div>
      </ResizeObserver>
    );
  }
}

// Check prop-types when nodes are updated
const oldVnodeHook = options.vnode;
options.vnode = (vnode) => {
  const tag = vnode.nodeName;
  if (typeof tag === 'function' && tag.propTypes) {
    const componentName = tag.displayName || tag.name;
    PropTypes.checkPropTypes(tag.propTypes, vnode.attributes, 'prop', componentName);
  }
  if (oldVnodeHook) {
    oldVnodeHook(vnode);
  }
};
