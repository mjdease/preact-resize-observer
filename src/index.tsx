import { h, Component } from 'preact';
import ResizeObserver from 'resize-observer-polyfill';
import * as PropTypes from 'prop-types';

export interface IPreactResizeObserverProps extends JSX.HTMLAttributes {
  onResize(width: number, height: number): void;
  innerRef?(element: Element): void;
  horizontal?: boolean;
  vertical?: boolean;
  initial?: boolean;
  element?: Element;
  tag?: keyof JSX.IntrinsicElements;
}

export default class PreactResizeObserver extends Component<IPreactResizeObserverProps> {
  private observer: ResizeObserver;
  private element?: Element;
  private currentWidth?: number;
  private currentHeight?: number;
  private suppressResizeEvent: boolean = false;

  static propTypes: {[name in keyof IPreactResizeObserverProps]: any} = {
    onResize: PropTypes.func.isRequired,
    horizontal: PropTypes.bool,
    vertical: PropTypes.bool,
    initial: PropTypes.bool,
    element: PropTypes.instanceOf(Element),
    tag: PropTypes.string,
  };

  static defaultProps: Partial<IPreactResizeObserverProps> = {
    initial: true,
    horizontal: true,
    vertical: true,
    tag: 'div',
  };

  constructor(props: IPreactResizeObserverProps) {
    super(props);

    this.observer = new ResizeObserver(this.onResize);
  }

  componentDidMount() {
    let observedElement: Element | undefined;
    if (this.props.element) {
      observedElement = this.props.element;
    }  else if (this.element) {
      observedElement = this.element;
    }
    if (observedElement) {
      this.observeElement(observedElement);
    }
  }

  componentWillReceiveProps(nextProps: IPreactResizeObserverProps) {
    if (nextProps.element) {
      // Custom element was provided when we didn't have one before
      if (nextProps.element !== this.props.element) {
        this.observeElement(nextProps.element);
      }
    } else if (this.props.element) {
      // No custom element provided but we had one previously
      this.observeElement(this.element);
    }
  }

  private observeElement(element?: Element) {
    if (element) {
      this.suppressResizeEvent = !this.props.initial!;
      this.observer.disconnect();
      this.observer.observe(element);
    }
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
      if (this.props.horizontal && this.currentWidth !== width) {
        resized = true;
        this.currentWidth = width;
      }
      if (this.props.vertical && this.currentHeight !== height) {
        resized = true;
        this.currentHeight = height;
      }
      if (resized) {
        resizeCallback(width, height);
      }
    });
  }

  private handleRef = (el?:Element) => {
    const { innerRef } = this.props;
    this.element = el;

    if (this.element && innerRef && typeof innerRef === 'function') {
      innerRef(this.element);
    }
  }

  render() {
    const {
      // tslint:disable-next-line:trailing-comma https://github.com/palantir/tslint/issues/4172
      onResize, innerRef, horizontal, vertical, initial, element, tag, children, ...rest
    } = this.props;

    // TODO: remove non-null assertion when preact types gets defaultProps support
    // tslint:disable-next-line:variable-name
    const Tag: string = tag!;

    return (
    <Tag ref={this.handleRef} {...rest}>
      {children}
    </Tag>
    );
  }
}
