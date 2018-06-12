import { Component, h } from 'preact';
import ResizeObserver from 'preact-resize-observer/dev';

import Checkbox from './Checkbox';

import './App.css';

interface IAppState {
  width: number;
  height: number;
  childWidth: number;
  childHeight: number;
  observedElement?: Element;
  initial: boolean;
  observeWidth: boolean;
  observeHeight: boolean;
}

export default class App extends Component<{}, IAppState> {
  private appEl?: Element;
  private childEl?: Element;
  private toggleObserveWidth: EventListener;
  private toggleObserveHeight: EventListener;
  private toggleObserveInitial: EventListener;

  constructor() {
    super();

    this.state = {
      width: 0,
      height: 0,
      childWidth: 0,
      childHeight: 0,
      observedElement: null,
      initial: true,
      observeWidth: true,
      observeHeight: true,
    };

    this.toggleObserveWidth = this.toggleState.bind(this, 'observeWidth');
    this.toggleObserveHeight = this.toggleState.bind(this, 'observeHeight');
    this.toggleObserveInitial = this.toggleState.bind(this, 'initial');
  }

  componentDidMount() {
    this.setState({
      observedElement: this.childEl,
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

  observeApp = () => {
    this.setState({
      observedElement: this.appEl,
    });
  }

  observeChild = () => {
    this.setState({
      observedElement: this.childEl,
    });
  }

  observeNone = () => {
    this.setState({
      observedElement: undefined,
    });
  }

  toggleState(key: 'observeWidth'|'observeHeight'|'initial') {
    this.setState({
      // https://github.com/Microsoft/TypeScript/issues/13948
      [key as any]: !this.state[key],
    });
  }

  render() {
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

    return (
      // This resize oberserver watches the size of itself
      /* tslint:disable-next-line jsx-no-lambda */
      <ResizeObserver id="app" innerRef={(el) => {this.appEl = el;}} onResize={this.handleResize}>
        <div className="stats">
          <h3>Self Observer</h3>
          <h2>{this.state.width} x {this.state.height}</h2>
        </div>
        <div className="child" ref={(el) => {this.childEl = el;}} style={{ position: 'relative' }}>
          <div className="grandchild">
            {/* This resize observer watches the size of a custom element */}
            <ResizeObserver
              tag="section"
              horizontal={this.state.observeWidth}
              vertical={this.state.observeHeight}
              onResize={this.handleChildResize}
              element={this.state.observedElement}
              initial={this.state.initial}
              // Ensures normal html attrs are passed through
              className="test-resize-observer"
              style={childObserverStyle}
            />
            <div className="stats">
              <h3>Custom Element Observer</h3>
              <h2>{this.state.childWidth} x {this.state.childHeight}</h2>
            </div>
            <div className="option-container">
              <Checkbox
                label="Page"
                onChange={this.observeApp}
                checked={this.state.observedElement === this.appEl}
              />
              <Checkbox
                label="Child"
                onChange={this.observeChild}
                checked={this.state.observedElement === this.childEl}
              />
              <Checkbox
                label="Self"
                onChange={this.observeNone}
                checked={!this.state.observedElement}
              />
            </div>
            <div className="option-container">
              <Checkbox
                label="horizontal"
                onChange={this.toggleObserveWidth}
                checked={this.state.observeWidth}
              />
              <Checkbox
                label="vertical"
                onChange={this.toggleObserveHeight}
                checked={this.state.observeHeight}
              />
              <Checkbox
                label="initial"
                onChange={this.toggleObserveInitial}
                checked={this.state.initial}
              />
            </div>
          </div>
        </div>
      </ResizeObserver>
    );
  }
}
