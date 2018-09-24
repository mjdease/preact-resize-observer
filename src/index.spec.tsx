import { h } from 'preact';
import { shallow, RenderContext } from 'preact-render-spy';

import PreactResizeObserver, { InnerRefProp, OnResizeProp } from './index';

// defined in ./helpers/tests.js
declare const overrideObject: () => void;
declare const restoreObject: () => void;

const originalCreateElement = document.createElement.bind(document);

let elWidth = 200;
let elHeight = 100;

// Helper Fns

function noop() {}

function changeElementSize(width: number, height: number) {
  elWidth = width;
  elHeight = height;
  // triggers resize observer to check element size
  window.dispatchEvent(new Event('resize'));
}

function cleanup(ctx: RenderContext<any, any>) {
  ctx.render(null as any);
}

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

type CallbackResolver = (resolve: () => void) => void;
function waitForCb(cb: CallbackResolver) {
  return new Promise((resolve) => {
    cb(resolve);
  });
}

// Start Tests

test('child elements are rendered', () => {
  const context = shallow(<PreactResizeObserver onResize={noop}><span>test</span></PreactResizeObserver>);
  expect(context.find('div').contains(<span>test</span>)).toBeTruthy();
  cleanup(context);
});

test('custom tag is used', () => {
  const context = shallow(<PreactResizeObserver onResize={noop} tag="section" />);
  expect(context.find('section')).toHaveLength(1);
  cleanup(context);
});

test('inner ref is provided', (done) => {
  const className = 'test-class';

  const handleRef: InnerRefProp = async (ref) => {
    // let dom element initialize
    await wait(10);

    expect(ref).toBeInstanceOf(Element);
    expect(ref.classList.toString()).toBe(className);

    cleanup(context);
    done();
  };

  const context = shallow(<PreactResizeObserver onResize={noop} innerRef={handleRef} className={className} />);
});

describe('onResize callback', () => {
  beforeAll(() => {
    // Override Object to pass the polyfill's instanceof check
    overrideObject();

    // Override clientHeight/Width methods of created elements to return values the tests can control.
    // These values are used by the resize observer to determine if the size of an element has changed.
    document.createElement = (tag: string) => {
      const el = originalCreateElement(tag);
      Object.defineProperty(el, 'clientHeight', {
        get() {
          return elHeight;
        },
      });
      Object.defineProperty(el, 'clientWidth', {
        get() {
          return elWidth;
        },
      });
      return el;
    };
  });

  afterAll(() => {
    restoreObject();
    document.createElement = originalCreateElement;
  });

  beforeEach(() => {
    elWidth = 200;
    elHeight = 100;
  });

  test('is called with correct dimensions', async () => {
    const resizeHandler = (resolve: Function) => jest.fn().mockImplementation(() => {
      resolve();
    });

    let onResize: OnResizeProp = jest.fn();

    const context = shallow(<PreactResizeObserver onResize={onResize} />);

    // Wait to allow intial observer flow to complete
    await wait(50);
    expect(onResize).toBeCalledWith(200, 100);

    await waitForCb((resolve) => {
      onResize = resizeHandler(resolve);
      context.render(<PreactResizeObserver onResize={onResize} />);
      changeElementSize(300, 100);
    });
    expect(onResize).toBeCalledWith(300, 100);

    await waitForCb((resolve) => {
      onResize = resizeHandler(resolve);
      context.render(<PreactResizeObserver onResize={onResize} />);
      changeElementSize(300, 300);
    });
    expect(onResize).toBeCalledWith(300, 300);

    await waitForCb((resolve) => {
      onResize = resizeHandler(resolve);
      context.render(<PreactResizeObserver onResize={onResize} />);
      changeElementSize(50, 50);
    });
    expect(onResize).toBeCalledWith(50, 50);

    cleanup(context);
  });

  test('is not called on initial mount', async () => {
    const onResize = jest.fn();

    const context = shallow(<PreactResizeObserver onResize={onResize} initial={false} />);

    // Wait to allow intial observer flow to complete
    await wait(50);
    expect(onResize).not.toBeCalled();

    changeElementSize(400, 400);

    await wait(50);
    expect(onResize).toBeCalledWith(400, 400);

    cleanup(context);
  });

  test('is called only when width changes', async  () => {
    const onResize = jest.fn();

    const context = shallow(<PreactResizeObserver onResize={onResize} vertical={false} />);

    await wait(50);
    changeElementSize(300, elHeight);

    await wait(50);
    changeElementSize(elWidth, 200);

    await wait(50);
    // called on initial mount and when width changed
    expect(onResize).toBeCalledTimes(2);
    expect(onResize).nthCalledWith(2, 300, 100);

    cleanup(context);
  });

  test('is called only when height changes', async  () => {
    const onResize = jest.fn();

    const context = shallow(<PreactResizeObserver onResize={onResize} horizontal={false} />);

    await wait(50);
    changeElementSize(300, elHeight);

    await wait(50);
    changeElementSize(elWidth, 200);

    await wait(50);
    // called on initial mount and when height changed
    expect(onResize).toBeCalledTimes(2);
    expect(onResize).nthCalledWith(2, 300, 200);

    cleanup(context);
  });

  test('is called for size changes to a custom element', async () => {
    const resizeHandler = (resolve: Function) => jest.fn().mockImplementation(() => {
      resolve();
    });

    let onResize: OnResizeProp = jest.fn();

    const customElement = document.createElement('div');

    // Start observing custom element
    const context = shallow(<PreactResizeObserver onResize={onResize} element={customElement}/>);

    // Wait to allow intial observer flow to complete
    await wait(50);
    expect(onResize).toBeCalledWith(200, 100);

    await waitForCb((resolve) => {
      onResize = resizeHandler(resolve);
      context.render(<PreactResizeObserver onResize={onResize} element={customElement} />);
      changeElementSize(300, 100);
    });
    expect(onResize).toBeCalledWith(300, 100);

    await waitForCb((resolve) => {
      onResize = resizeHandler(resolve);
      // Return to observing default element
      context.render(<PreactResizeObserver onResize={onResize} />);
      changeElementSize(300, 300);
    });
    expect(onResize).toBeCalledWith(300, 300);

    await waitForCb((resolve) => {
      onResize = resizeHandler(resolve);
      // Return to observing custom element
      context.render(<PreactResizeObserver onResize={onResize} element={customElement}/>);
      changeElementSize(50, 50);
    });
    expect(onResize).toBeCalledWith(50, 50);

    cleanup(context);
  });
});
