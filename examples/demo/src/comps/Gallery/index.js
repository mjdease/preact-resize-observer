import { Component } from 'preact';

import Divider from '../Divider';
import Photo from '../Photo';

import './Gallery.scss';

import * as images from '../../images';

export default class Gallery extends Component {
  constructor() {
    super();

    this.followMouse = true;

    this.state = {
      left: 0.5,
      top: 0.5
    };

    this.follow = this.toggleMouseFollow.bind(this, true);
    this.unfollow = this.toggleMouseFollow.bind(this, false);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.unfollow, false);
    document.addEventListener('keyup', this.follow, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.unfollow, false);
    document.removeEventListener('keyup', this.follow, false);
  }

  toggleMouseFollow(enabled) {
    this.followMouse = enabled;
  }

  handlePointerMove = event => {
    if (this.galleryEl && this.followMouse) {
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
    const gridTemplateColumns = `${left}fr 1px ${1 - left}fr`;
    const gridTemplateRows = `${top}fr 1px ${1 - top}fr`;
    const style = {
      gallery: {
        // 3x3 grid where the middle colum and row are 1px wide dividers
        gridTemplateColumns,
        gridTemplateRows,
        msGridColumns: gridTemplateColumns,
        msGridRows: gridTemplateRows
      }
    };

    return (
      <div
        class="gallery"
        onMouseMove={this.handlePointerMove}
        onTouchDown={this.handlePointerMove}
        onTouchMove={this.handlePointerMove}
        ref={el => (this.galleryEl = el)}
        style={style.gallery}
      >
        <Photo
          src={images.branch}
          sourceUrl="https://www.flickr.com/photos/tommrazek/23281006039/"
        />
        <Divider vertical />
        <Photo
          src={images.tulip}
          sourceUrl="https://www.flickr.com/photos/bonguri/8667986348/"
        />
        <Divider />
        <div />
        <Divider />
        <Photo
          src={images.snow}
          sourceUrl="https://www.flickr.com/photos/28638567@N02/8559940536/"
        />
        <Divider vertical />
        <Photo
          src={images.bird}
          sourceUrl="https://www.flickr.com/photos/79452129@N02/16266318687/"
        />
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
  // Prefer touch coordinates if present
  if (event.touches && event.touches.length) {
    point = {
      x: event.touches[0].pageX,
      y: event.touches[0].pageY
    };
  }

  return point;
}
