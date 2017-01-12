import React from 'react';
import { connect } from 'react-redux';
import { Button, Spin } from 'antd';
import { startActive, back2App } from '../actions/openBoxAction';
import ActivePage from './ActivePage';

@connect((store) => {
  return {
    openBox: store.openBox,
    boxArr: store.openBox.boxArr,
  };
})

export default class IndexPage extends React.Component {
  startActive() {
    if (this.props.openBox.openBoxdata.type === '999') {
      this.props.dispatch(back2App());
    } else {
      this.props.dispatch(startActive());
    }
  }

  render() {
    const { openBox } = this.props;
    const outDiv = {
      position: 'absolute',
      width: '100%',
      height: 'auto',
    };
    const inerDiv = {
      color: 'black',
      marginBottom: '10px',
      fontSize: '16px',
      lineHeight: '28px',
      padding: '0 5px',
    };
    const btn = {
      width: '2.5rem',
      fontSize: '18px',
      margin: '30px auto 0',
      display: 'block',
    };
    let buttons = '';
    if (this.props.openBox && this.props.openBox.openBoxdata && this.props.openBox.openBoxdata.type !== '999') {
      buttons = <Button type="primary" style={btn} onClick={this.startActive.bind(this)}>我要参与</Button>;
    }
    let boxData = (<Spin tip="Loading..." spinning={this.props.openBox.fetching}>
          <div style={{ width: '10rem', height: '320px' }}>
          </div>
        </Spin>);
    if (openBox.openBoxdata) {
      const { backcolor } = openBox.openBoxdata;
      const content = {
        position: 'absolute',
        width: '10rem',
        height: '100%',
        maxWidth: '100% !important',
        wordBreak: 'break-all',
        backgroundColor: backcolor,
      };
      const obj = JSON.parse(openBox.openBoxdata.content)[0];
      let remark = '';
      if (openBox.openBoxdata.remark) {
        remark = openBox.openBoxdata.remark;
      }
      const detailContent = decodeURIComponent(obj.content);
      boxData = (
        <div style={content}>
          <div style={outDiv}>
            <div style={{ textAlign: 'center', fontSize: '18px', color: '#000' }}>{remark}</div>
            <div style={inerDiv} dangerouslySetInnerHTML={{ __html: detailContent }} id="desciption"></div>
            {buttons}
          </div>
          <ActivePage />
        </div>
      );
    }
    return boxData;
  }
}

