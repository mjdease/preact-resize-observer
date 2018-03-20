preact-resize-observer
---

Watch an element for changes in its size. Supports modern browsers and IE9+.

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
    // Current width and height of the #app element
    console.log(`width: ${width}, height: ${height}`)
  }

  render() {
    return (
      <div id="app">
        <ResizeObserver onResize={this.handleResize} />
      </div>
    );
  }
}
```

### Prop Types

| Property | Type | Default | Description |
|:---|:---|:---:|:---|
| onResize | Function | | Required. Callback invoked whenever the observed element changes size. `(width: number, height: number): void` |
| target | Element | | The element to observe the size of. If not specified the component's parent element will be observed. |
| width | Boolean | true | Observe changes to the width |
| height | Boolean | true | Observe changes to the height |
| noInitial | Boolean | false | Suppress `onResize` being invoked when this component mounts.

Changelog
---
0.1.0 (20/03/2018)
* Initial Release

Licence
---
`preact-resize-obsever` is available under the MIT License.