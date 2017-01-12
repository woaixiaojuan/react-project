import React from 'react';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import { Rewardli } from '../components/Rewardli';
import RewardOk from '../components/RewardOk';

@connect((store) => {
  return {
    openBox: store.openBox,
    boxArr: store.openBox.boxArr,
    openBoxdata: store.openBox.openBoxdata,
  };
})
export default class IndexPage extends React.Component {
  info(title, content) {
    Modal.info({
      title,
      content,
    });
  }
  render() {
    const { boxArr } = this.props;
    const { bigimg } = this.props.openBoxdata;
    const { okActive } = this.props.openBox;
    const divStyle = {
      width: '10rem',
      height: 'auto',
    };
    const isShow = okActive ? 'block' : 'none';
    const divCss = {
      display: isShow,
      zIndex: 100,
      width: '100%',
      height: '100%',
      backgroundImage: `url(${bigimg})`,
      backgroundSize: 'cover',
      overflow: 'hidden',
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      backgroundRepeat: 'no-repeat',
    };
    const rewardCount = {
      position: 'absolute',
      lineHeight: '0.35rem',
      textAlign: 'center',
      height: '0.35rem',
      width: '2.27rem',
      top: '1.1rem',
      left: '3.85rem',
      color: '#fef6b6',
      fontSize: '15px',
    };
    const boxList = boxArr.map((ele, i) => {
      return <Rewardli key={i} index={i} fetching={ele.fetching} img={ele.imgUrl} mark={ele.mark} clickAble={ele.clickAble} />;
    });

    return (
      <div id="activity" style={divCss}>
        <div style={rewardCount}>还有 {this.props.openBox.times} 次机会</div>
        <ul style={divStyle}>
          {boxList}
        </ul>
        <RewardOk />
      </div>
    );
  }
}
