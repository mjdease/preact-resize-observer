import { Component, h } from 'preact';
import ResizeObserver from 'preact-resize-observer/dev';

import './App.css';

interface IAppState {
  width: number;
  height: number;
  childWidth: number;
  childHeight: number;
  observedElement?: Element;
  noInitial: boolean;
  observeWidth: boolean;
  observeHeight: boolean;
}

export default class App extends Component<{}, IAppState> {
  private appEl?: Element;
  private childEl?: Element;
  private toggleObserveWidth: EventListener;
  private toggleObserveHeight: EventListener;
  private toggleObserveNoInitial: EventListener;

  constructor() {
    super();

    this.state = {
      width: 0,
      height: 0,
      childWidth: 0,
      childHeight: 0,
      observedElement: null,
      noInitial: false,
      observeWidth: true,
      observeHeight: true,
    };

    this.toggleObserveWidth = this.toggleState.bind(this, 'observeWidth');
    this.toggleObserveHeight = this.toggleState.bind(this, 'observeHeight');
    this.toggleObserveNoInitial = this.toggleState.bind(this, 'noInitial');
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

  toggleState(key: 'observeWidth'|'observeHeight'|'noInitial') {
    this.setState({
      // https://github.com/Microsoft/TypeScript/issues/13948
      [key as any]: !this.state[key],
    });
  }

  render() {
    return (
      <div id="app" ref={(el) => {this.appEl = el;}}>
        <div className="stats">
          <h3>Parent Observer</h3>
          <h2>{this.state.width} x {this.state.height}</h2>
        </div>
        <ResizeObserver onResize={this.handleResize} />
        <div className="child" ref={(el) => {this.childEl = el;}}>
          <div className="grandchild">
            <div className="stats">
              <h3>Custom Element Observer</h3>
              <h2>{this.state.childWidth} x {this.state.childHeight}</h2>
            </div>
            <ResizeObserver
              height={this.state.observeHeight}
              width={this.state.observeWidth}
              onResize={this.handleChildResize}
              target={this.state.observedElement}
              noInitial={this.state.noInitial}
            />
            <div className="option-container">
              <label className="option-label">
                <input
                  type="checkbox"
                  checked={this.state.observedElement === this.appEl}
                  onChange={this.observeApp}
                />
                Page
              </label>
              <label className="option-label">
                <input
                  type="checkbox"
                  checked={this.state.observedElement === this.childEl}
                  onChange={this.observeChild}
                />
                Child
              </label>
            </div>
            <div className="option-container">
              <label className="option-label">
                <input
                  type="checkbox"
                  checked={this.state.observeWidth}
                  onChange={this.toggleObserveWidth}
                />
                width
              </label>
              <label className="option-label">
                <input
                  type="checkbox"
                  checked={this.state.observeHeight}
                  onChange={this.toggleObserveHeight}
                />
                height
              </label>
              <label className="option-label">
                <input
                  type="checkbox"
                  checked={this.state.noInitial}
                  onChange={this.toggleObserveNoInitial}
                />
                noInitial
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
