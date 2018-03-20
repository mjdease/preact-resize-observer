import { h, Component } from 'preact';
import ResizeObserver from 'resize-observer-polyfill';
import * as PropTypes from 'prop-types';

export interface IPreactResizeObserverProps {
  onResize(width: number, height: number): void;
  width?: boolean;
  height?: boolean;
  noInitial?: boolean;
  target?: Element;
}

export default class PreactResizeObserver extends Component<IPreactResizeObserverProps, void> {
  private observer: ResizeObserver;
  private element?: Element;
  private currentWidth?: number;
  private currentHeight?: number;
  private suppressResizeEvent: boolean = false;
  private suppressReRender: boolean = false;
  private style = {
    position: 'absolute',
    width: 0,
    height: 0,
    display: 'none',
  };

  static propTypes: {[name in keyof IPreactResizeObserverProps]: any} = {
    onResize: PropTypes.func.isRequired,
    width: PropTypes.bool,
    height: PropTypes.bool,
    noInitial: PropTypes.bool,
    target: PropTypes.element,
  };

  static defaultProps: Partial<IPreactResizeObserverProps> = {
    noInitial: false,
    width: true,
    height: true,
  };

  constructor(props: IPreactResizeObserverProps) {
    super(props);

    this.observer = new ResizeObserver(this.onResize);
  }

  componentDidMount() {
    let observedElement: Element | undefined;
    if (this.props.target) {
      observedElement = this.props.target;
    }  else if (this.element && this.element.parentElement) {
      observedElement = this.element.parentElement;
    }
    if (observedElement) {
      this.observeElement(observedElement);
    }
    this.suppressReRender = true;
  }

  componentWillReceiveProps(nextProps: IPreactResizeObserverProps) {
    if (nextProps.target && nextProps.target !== this.props.target) {
      this.observeElement(nextProps.target);
    }
  }

  shouldComponentUpdate() {
    return !this.suppressReRender;
  }

  private observeElement(element: Element) {
    this.suppressResizeEvent = this.props.noInitial as boolean;
    this.observer.disconnect();
    this.observer.observe(element);
  }

  private onResize = (resizeEntries: ResizeObserverEntry[]) => {
    const resizeCallback = this.props.onResize;
    if (this.suppressResizeEvent) {
      this.suppressResizeEvent = false;
      return;
    }
    if (typeof resizeCallback !== 'function') {
      return;
    }
    resizeEntries.forEach((entry) => {
      const { width, height } = entry.contentRect;
      let resized = false;
      if (this.props.width && this.currentWidth !== width) {
        resized = true;
        this.currentWidth = width;
      }
      if (this.props.height && this.currentHeight !== height) {
        resized = true;
        this.currentHeight = height;
      }
      if (resized) {
        resizeCallback(width, height);
      }
    });
  }

  private handleRef = (el?:Element) => {
    this.element = el;
  }

  render() {
    return (
      <div ref={this.handleRef} style={this.style} />
    );
  }
}
