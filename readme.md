preact-resize-observer
---

Watch an element for changes to its size. Supports modern browsers and IE9+.

This is a Preact component wrapper for the excellent [ResizeObserver polyfill](https://github.com/que-etc/resize-observer-polyfill).

[Demo](https://mjdease.github.io/preact-resize-observer/demo/)

### Installation

`npm install preact-resize-observer`

### Example

```js
import { Component } from 'preact';
import ResizeObserver from 'preact-resize-observer';

export default class App extends Component {
  handleResize = (width, height) => {
    // Current width and height of the .fluid-content element
    console.log(`width: ${width}, height: ${height}`)
  }

  render(props) {
    return (
      <ResizeObserver class="fluid-content" onResize={this.handleResize}>
        <p>{props.content}</p>
      </ResizeObserver>
    );
  }
}
```

### Prop Types

| Property | Type | Default | Description |
|:---|:---|:---:|:---|
| `onResize` | Function | | Required. Callback invoked whenever the observed element changes size. `(width: number, height: number): void` |
| `horizontal` | boolean | `true` | Observe changes to the width |
| `vertical` | boolean | `true` | Observe changes to the height |
| `tag` | string | `'div'` | The HTML tag to render this component as |
| `element` | Element | | The element to observe the size of. If not specified the element rendered by this component will be observed |
| `initial` | boolean | `true` | Controls if `onResize` will be invoked when the element is first observed (typically on mount). Set to `false` to disable this initial call.
| `innerRef` | function | | Get reference to the rendered element. `(element: Element): void`

Changelog
---
1.0.0 (24/06/2018)
* Change component design to be used as part of regular page markup:
  * Change to observe size of self by default (previously parent was observed)
  * Add support to render children
  * Add `tag` prop to control the tag to render as
  * Add `innerRef` prop to get a reference to the actual DOM node
  * Change prop names to avoid clashing with standard HTML attributes
* Distribute ES module

0.1.1 (31/05/2018)
* Fixed package dependencies
* Fixed component types for Preact 8.2.9

0.1.0 (20/03/2018)
* Initial Release

Licence
---
`preact-resize-obsever` is available under the MIT License.