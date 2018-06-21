import { Component } from 'preact';

import Divider from '../Divider';
import Photo from '../Photo';

import './Gallery.scss';

import * as images from '../../images';

export default class Gallery extends Component {
  constructor() {
    super();

    this.state = {
      left: 50,
      top: 50
    };
  }

  handlePointerMove = event => {
    if (this.galleryEl) {
      const pointerPos = getPointerPosition(event);
      const galleryRect = this.galleryEl.getBoundingClientRect();

      this.setState({
        left: (pointerPos.x - galleryRect.left) / galleryRect.width,
        top: (pointerPos.y - galleryRect.top) / galleryRect.height
      });
    }
  };

  render() {
    const { left, top } = this.state;
    const style = {
      gallery: {
        gridTemplateColumns: `${left}fr 1px ${1 - left}fr`,
        gridTemplateRows: `${top}fr 1px ${1 - top}fr`
      }
    };

    return (
      <div
        class="gallery"
        onMouseMove={this.handlePointerMove}
        onTouchMove={this.handlePointerMove}
        ref={el => (this.galleryEl = el)}
        style={style.gallery}
      >
        <Photo src={images.branch} />
        <Divider vertical />
        <Photo src={images.pine} />
        <Divider horizontal />
        <div />
        <Divider horizontal />
        <Photo src={images.snow} />
        <Divider vertical />
        <Photo src={images.tulip} />
      </div>
    );
  }
}

function getPointerPosition(event) {
  let point = {
    x: 0,
    y: 0
  };

  if (typeof event.pageX !== 'undefined') {
    point = {
      x: event.pageX,
      y: event.pageY
    };
  }
  else if (event.touches && event.touches.length) {
    point = {
      x: event.touches[0].pageX,
      y: event.touches[0].pageY
    };
  }

  return point;
}
