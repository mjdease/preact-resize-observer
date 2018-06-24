import { Component } from 'preact';
import ResizeObserver from 'preact-resize-observer/dev';

import ActionBar from '../ActionBar';

import './Photo.scss';

export default class Photo extends Component {
  constructor() {
    super();

    this.state = {
      width: 0,
      height: 0
    };
  }

  handleResize = (width, height) => {
    this.setState({
      width,
      height
    });
  };

  render() {
    const width = Math.round(this.state.width);
    const height = Math.round(this.state.height);

    return (
      <div class="photo">
        <ResizeObserver
          tag="a"
          className="photo__container"
          onResize={this.handleResize}
          href={this.props.sourceUrl}
          target="_blank"
        >
          <img src={this.props.src} alt="" className="photo__image" />
          <div className="photo__size">
            {width} x {height}
          </div>
          <ActionBar className="photo__actions" vertical={height / width > 1} />
        </ResizeObserver>
      </div>
    );
  }
}
