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
  private observedProperties: {[name in 'width'|'height']: boolean };
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
    element: PropTypes.element,
    noInitial: PropTypes.bool,
  };

  static defaultProps: Partial<IPreactResizeObserverProps> = {
    noInitial: false,
  };

  constructor(props: IPreactResizeObserverProps) {
    super(props);

    this.observedProperties = this.getObservedProperties(props);

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
    this.suppressReRender = true;
  }

  componentWillReceiveProps(nextProps: IPreactResizeObserverProps) {
    if (nextProps.width !== this.props.width || nextProps.height !== this.props.height) {
      this.observedProperties = this.getObservedProperties(nextProps);
    }
    if (nextProps.element && nextProps.element !== this.props.element) {
      this.observeElement(nextProps.element);
    }
  }

  shouldComponentUpdate() {
    return !this.suppressReRender;
  }

  private getObservedProperties(props: Partial<IPreactResizeObserverProps>) {
    if (typeof props.width === 'undefined' && typeof props.height === 'undefined') {
      return this.observedProperties = {
        width: true,
        height: true,
      };
    }
    return this.observedProperties = {
      width: !!props.width,
      height: !!props.height,
    };
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
      if (this.observedProperties.width && this.currentWidth !== width) {
        resized = true;
        this.currentWidth = width;
      }
      if (this.observedProperties.height && this.currentHeight !== height) {
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
