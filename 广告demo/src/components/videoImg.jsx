import React from 'react';
import { Popover } from 'antd';

export default class VideoImg extends React.Component {
  render() {
    const imgSrc = this.props.imgsrc;
    const imgStyle = {
      maxWidth: '180px',
      cursor: 'pointer',
    }
    const bigImgStyle = {
      maxWidth: '500px',
    }
    const content = (
      <div>
        <img src={imgSrc} style={bigImgStyle} />
      </div>
    )
    return (
       <Popover content={content} trigger="hover" placement="rightTop">
          <img src={imgSrc} style={imgStyle} />
      </Popover>
    )
  }
}
