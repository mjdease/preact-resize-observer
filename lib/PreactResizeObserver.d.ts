import { Component } from 'preact';
export interface IPreactResizeObserverProps {
    onResize(width: number, height: number): void;
    width?: boolean;
    height?: boolean;
    noInitial?: boolean;
    target?: Element;
}
export default class PreactResizeObserver extends Component<IPreactResizeObserverProps, void> {
    private observer;
    private element?;
    private currentWidth?;
    private currentHeight?;
    private suppressResizeEvent;
    private suppressReRender;
    private style;
    static propTypes: {
        [name in keyof IPreactResizeObserverProps]: any;
    };
    static defaultProps: Partial<IPreactResizeObserverProps>;
    constructor(props: IPreactResizeObserverProps);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: IPreactResizeObserverProps): void;
    shouldComponentUpdate(): boolean;
    private observeElement(element);
    private onResize;
    private handleRef;
    render(): JSX.Element;
}
