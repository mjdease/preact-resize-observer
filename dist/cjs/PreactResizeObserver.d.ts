import { Component, VNode } from 'preact';
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
    private observer;
    private element?;
    private currentWidth?;
    private currentHeight?;
    private suppressResizeEvent;
    static propTypes: {
        [name in keyof IPreactResizeObserverProps]: any;
    };
    static defaultProps: Partial<IPreactResizeObserverProps>;
    constructor(props: IPreactResizeObserverProps);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: IPreactResizeObserverProps): void;
    private observeElement(element?);
    private onResize;
    private handleRef;
    render(): VNode<any>;
}
