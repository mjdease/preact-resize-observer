import { Component, h } from 'preact';
import classNames from 'classnames';
import ResizeObserver from 'preact-resize-observer/dev';

import Checkbox from './Checkbox';

import './App.css';

interface IAppState {
  width: number;
  height: number;
  childWidth: number;
  childHeight: number;
  observedEl?: Element;
  emitInitial: boolean;
  observeWidth: boolean;
  observeHeight: boolean;
}

const childObserverStyle = {
  display: 'block',
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: '50%',
  left: '25%',
  pointerEvents: 'none',
  border: '2px dashed #888',
};

export default class App extends Component<{}, IAppState> {
  private appEl?: Element;
  private childEl?: Element;

  constructor() {
    super();

    this.state = {
      width: 0,
      height: 0,
      childWidth: 0,
      childHeight: 0,
      observedEl: null,
      emitInitial: true,
      observeWidth: true,
      observeHeight: true,
    };
  }

  componentDidMount() {
    this.setState({
      observedEl: this.childEl,
    });
  }

  handleResize = (width: number, height: number) => {
    this.setState({
      width,
      height,
    });
  }

  handleChildResize = (childWidth: number, childHeight: number) => {
    this.setState({
      childWidth,
      childHeight,
    });
  }

  observeEl = (element?: Element) => () => {
    this.setState({
      observedEl: element,
    });
  }

  toggleState = (key: 'observeWidth'|'observeHeight'|'initial') => () => {
    this.setState(prevState => ({
      [key]: !prevState[key],
    }));
  }

  handleAppRef = (el) => {
    this.appEl = el;
  }

  render() {
    const {
      observedEl,
      observeHeight,
      observeWidth,
      width,
      height,
      childHeight,
      childWidth,
      emitInitial,
    } = this.state;

    return (
      // This resize observer watches the size of itself
      <ResizeObserver
        id="app"
        innerRef={this.handleAppRef}
        onResize={this.handleResize}
        className={classNames({ observed: observedEl === this.appEl })}
      >
        <div className="stats">
          <h3>Basic Observer</h3>
          <h2>{width} x {height}</h2>
        </div>
        <div
          className={classNames('child', { observed: observedEl === this.childEl })}
          ref={(el) => { this.childEl = el; }}
        >
          {/* This resize observer watches the size of a custom element */}
          <ResizeObserver
            tag="section"
            horizontal={observeWidth}
            vertical={observeHeight}
            onResize={this.handleChildResize}
            element={observedEl}
            initial={emitInitial}
            // Normal html attrs are passed through:
            className={classNames('test-resize-observer', { observed: !observedEl })}
            style={childObserverStyle}
          />

          <div className="stats">
            <h3>Configruable Observer</h3>
            <h2>{childWidth} x {childHeight}</h2>
          </div>
          <div className="option-container">
            <span>Element to <span style={{ color: 'blue' }}>observe</span>: </span>
            <Checkbox label="Page" onChange={this.observeEl(this.appEl)} checked={observedEl === this.appEl} />
            <Checkbox label="Child" onChange={this.observeEl(this.childEl)} checked={observedEl === this.childEl} />
            <Checkbox label="Self (none)" onChange={this.observeEl(undefined)} checked={!observedEl} />
          </div>
          <div className="option-container">
            <span>Options: </span>
            <Checkbox label="horizontal" onChange={this.toggleState('observeWidth')} checked={observeWidth} />
            <Checkbox label="vertical" onChange={this.toggleState('observeHeight')} checked={observeHeight} />
            <Checkbox label="initial" onChange={this.toggleState('initial')} checked={emitInitial} />
          </div>

        </div>
      </ResizeObserver>
    );
  }
}
