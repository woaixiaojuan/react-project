import React from 'react';
import { connect } from 'react-redux';
import { Modal, Spin, message } from 'antd';
import { getDrawResult, back2App } from '../actions/openBoxAction';
message.config({
  duration: 5,
});
@connect((store) => {
  return {
    times: store.openBox.times,
  };
})
export class Rewardli extends React.Component {
  openBox() {
    const { times, index, clickAble } = this.props;
    if (times > 0) {
      if (clickAble) {
        this.props.dispatch(getDrawResult(index));
      } else {
        message.info('稍安勿躁,开奖ing!');
      }
    } else {
      this.info('对不起：', '你的次数已经用完！', this);
    }
  }
  info(title, content, that) {
    Modal.info({
      title,
      content,
      okText: '确定',
      onOk() {
        that.props.dispatch(back2App());
      },
    });
  }
  render() {
    const { mark, index, img } = this.props;
    let fetching = false;
    let liStyle = {
      position: 'absolute',
      width: '1.5rem',
      height: '1.5rem',
      transition: 'all 0.5s ease',
      WebkitTransition: 'all 0.5s ease',
    };
    if (mark === 2) {
      liStyle.display = 'block';
      liStyle.animation = 'vibrateLoop 200ms';
      liStyle.WebkitAnimation = 'vibrateLoop 200ms';
      liStyle.animationIterationCount = 'infinite';
      liStyle.WebkitAnimationIterationCount = 'infinite';
      liStyle.animationTimingFunction = 'ease';
      liStyle.WebkitAnimationTimingFunction = 'ease';
    }
    if (index === 0) {
      liStyle.left = '2.5rem';
      liStyle.bottom = '1.2rem';
    } else if (index === 1) {
      liStyle.left = '4.3rem';
      liStyle.bottom = '1.4rem';
    } else if (index === 2) {
      liStyle.left = '0.8rem';
      liStyle.bottom = '0.5rem';
    } else if (index === 3) {
      liStyle.left = '3.7rem';
      liStyle.bottom = '0.3rem';
    } else if (index === 4) {
      liStyle.right = '2.5rem';
      liStyle.bottom = '1.1rem';
    } else if (index === 5) {
      liStyle.right = '3.2rem';
      liStyle.bottom = '0.25rem';
    } else if (index === 6) {
      liStyle.right = '1rem';
      liStyle.bottom = '0.5rem';
    } else if (index === 7) {
      liStyle.left = '2.1rem';
      liStyle.bottom = '-0.2rem';
    } else if (index === 8) {
      liStyle.right = '2rem';
      liStyle.bottom = '-0.3rem';
    }
    return (
      <li style={liStyle}>
        <Spin spinning={fetching} >
            <img src={img} onClick={this.openBox.bind(this)} style={{ width: '100%', height: '100%' }} />
        </Spin>
      </li>
    );
  }
}

