import React from 'react';
import { connect } from 'react-redux';
import { Rewardli } from '../components/Rewardli';
import { Modal } from 'antd';
import RewardOk from '../components/RewardOk';

@connect((store) => {
  return {
    openBox: store.openBox,
    boxArr: store.openBox.boxArr,
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
      backgroundImage: `url(${ENV.bgImgUrl})`,
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
      backgroundImage: `url(${ENV.rewardCountImg})`,
      backgroundSize: 'cover',
      width: '2.4rem',
      lineHeight: '1rem',
      textAlign: 'center',
      height: '1rem',
      top: '1.2rem',
      left: '.5rem',
      color: '#e9413f',
      fontSize: '13px',
    };
    const boxList = boxArr.map((ele, i) => {
      return <Rewardli key={i} index={i} fetching={ele.fetching} img={ele.imgUrl} mark={ele.mark} clickAble={ele.clickAble} />;
    });

    return (
      <div id="activity" style={divCss}>
        <div style={rewardCount}>今天还有{this.props.openBox.times}次机会</div>
        <ul style={divStyle}>
          {boxList}
        </ul>
        <RewardOk />
      </div>
    );
  }
}
