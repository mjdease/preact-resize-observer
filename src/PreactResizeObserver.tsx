import { h, Component } from 'preact';
import ResizeObserver from 'resize-observer-polyfill';
import * as PropTypes from 'prop-types';

export interface IPreactResizeObserverProps {
  onResize(width: number, height: number): void;
  width?: boolean;
  height?: boolean;
  element?: Element;
  noInitial?: boolean;
}

export default class PreactResizeObserver extends Component<IPreactResizeObserverProps, void> {
  private observer: ResizeObserver;
  private element?: Element;
  private currentWidth?: number;
  private currentHeight?: number;
  private suppressResizeEvent: boolean = false;
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
    element: PropTypes.element,
    noInitial: PropTypes.bool,
  };

  static defaultProps: Partial<IPreactResizeObserverProps> = {
    width: false,
    height: false,
    noInitial: false,
  };

  constructor(props: IPreactResizeObserverProps) {
    super(props);

    this.observer = new ResizeObserver(this.onResize);
  }

  componentDidMount() {
    let observedElement: Element | undefined;
    if (this.props.element) {
      observedElement = this.props.element;
    }  else if (this.element && this.element.parentElement) {
      observedElement = this.element.parentElement;
    }
    if (observedElement) {
      this.observeElement(observedElement);
    }
  }

  componentWillReceiveProps(nextProps: IPreactResizeObserverProps) {
    if (nextProps.element && nextProps.element !== this.props.element) {
      this.observeElement(nextProps.element);
    }
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
