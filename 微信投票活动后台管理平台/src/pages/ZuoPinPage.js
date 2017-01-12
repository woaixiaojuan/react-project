import React from 'react';
import { connect } from 'react-redux';
import { Tabs, Button, Row, Col, Spin } from 'antd';
import { getZuoPinItem, setActiveId, setMark, setOptionId, addOrEdit, clearZuoPinItem, zuoPinModalShow, setTabKey, voteSort } from '../actions/zuoPinActions';
import ZuoPinTable from '../components/ZuoPinTable';
import ZuoPinModal from '../components/ZuoPinModal';

const TabPane = Tabs.TabPane;

@connect((store) => {
  return {
    zuoPinStore: store.zuoPinStore,
  };
})

export default class ZuoPinPage extends React.Component {
  componentWillMount() {
    const { activeId, mark } = this.props.params;
    this.props.dispatch(getZuoPinItem(activeId));
    this.props.dispatch(setMark(mark));
    this.props.dispatch(setActiveId(activeId));
  }
  componentWillUnmount() {
    this.props.dispatch(clearZuoPinItem());
  }
  onTabsChange(key) {
    this.props.dispatch(setTabKey(key));
  }
  addZuoPin() {
    this.props.dispatch(setOptionId(''));
    this.props.dispatch(addOrEdit('add'));
    this.props.dispatch(zuoPinModalShow({
      source: {
        value: '',
      },
      title: {
        value: '',
      },
      author: {
        value: '',
      },
      description: {
        value: '',
      },
      img: {
        value: '',
      },
      link: {
        value: '',
      },
      content: '<p></p>',
    }));
  }

  UpdateVoteCount() {
    const activeId = this.props.params.activeId;
    this.props.dispatch(voteSort(activeId, true));
  }

  render() {
    const { data, zuoPinLoading, tabkey, zuoPinModalInit } = this.props.zuoPinStore;
    let videoData = [];
    let articleData = [];
    let audioData = [];
    if (data) {
      data.forEach(ele => {
        if (ele.contentType === '2') {
          videoData = videoData.concat(ele);
        } else if (ele.contentType === '1') {
          articleData = articleData.concat(ele);
        } else if (ele.contentType === '3') {
          audioData = audioData.concat(ele);
        }
      });
    }

    return (
      <div>
        <Row style={{ margin: '15px 0 5px' }} type="flex" justify="end">
          <Col>
            <Button type="primary" onClick={this.addZuoPin.bind(this)}>添加作品</Button>
          </Col>
          <Col>
            <Button type="primary" onClick={this.UpdateVoteCount.bind(this)} style={{ marginLeft: '20px' }}>更新票数</Button>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Spin size="large" spinning={zuoPinLoading} tip="Loading...">
              <Tabs defaultActiveKey="1" onChange={this.onTabsChange.bind(this)}>
                <TabPane tab="影评" key="1">
                  <ZuoPinTable data={articleData} />
                </TabPane>
                <TabPane tab="视频" key="2" >
                  <ZuoPinTable data={videoData} />
                </TabPane>
                <TabPane tab="音频" key="3">
                  <ZuoPinTable data={audioData} />
                </TabPane>
              </Tabs>
            </Spin>
          </Col>
          <ZuoPinModal tabkey={tabkey} zuoPinModalInit={zuoPinModalInit} dispatch={this.props.dispatch} />
        </Row>
      </div>
    );
  }
}
