import React from 'react';
import { Link } from 'react-router';
import { Table, Modal } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import { deleteActivity, activeModalShow, setAciveId } from '../actions/activeActions.js';

export default class AactiveTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      activeUrl: '',
      sortedInfo: null,
    };
  }
  handleChange(pagination, filters, sorter) {
    this.setState({
      sortedInfo: sorter,
    });
  }
  deleteActive(record) {
    const id = record.id;
    this.props.dispatch(deleteActivity(id));
  }
  updateActive(record) {
    this.props.dispatch(setAciveId(record.id));
    let modifier = '';
    if (record.mark == 1) {
      modifier = '上架';
    } else if (record.mark == 2) {
      modifier = '未上架';
    } else if (record.mark == 3) {
      modifier = '下架';
    }
    this.props.dispatch(activeModalShow({
      title: {
        value: record.title,
      },
      Time: {
        value: [moment(record.startTime), moment(record.endTime)],
      },
      rule: {
        value: record.rule,
      },
      modifier: {
        value: modifier,
      },
      content: record.content,
    }));
  }
  lookActiveUrl(record) {
    const { id } = record;
    this.setState({
      visible: true,
      activeUrl: `http://weixin.handsight.cn/vote/weixinVote/index.html?activeId=${id}`,
    });
  }
  handleCancel() {
    this.setState({
      visible: false,
    });
  }
  render() {
    const { listData } = this.props;
    let { sortedInfo } = this.state;
    sortedInfo = sortedInfo || {};
    let arr = null;
    let roots = null;
    if (listData.list) {
      if (listData.filter) {
        arr = listData.list.filter((item) => {
          return item.title.toLowerCase().indexOf(listData.filter.toLowerCase()) !== -1;
        });
      } else {
        arr = listData.list;
      }
      roots = arr.map((item, index) => {
        let state = null;
        if (item.mark == 1) {
          state = '上架';
        } else if (item.mark == 3) {
          state = '下架';
        } else if (item.mark == 2) {
          state = '未上架';
        }
        item.key = index + 1;
        item.activeState = state;
        return item;
      });
    }
    const columns = [{
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: '20%',
    }, {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
      width: '20%',
      sorter: (a, b) => moment(a.startTime).valueOf() - moment(b.startTime).valueOf(),
      sortOrder: sortedInfo.columnKey === 'startTime' && sortedInfo.order,
    }, {
      title: '结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
      width: '20%',
    }, {
      title: '活动状态',
      dataIndex: 'activeState',
      key: 'activeState',
      width: '10%',
    }, {
      title: '功能',
      key: 'gongneng',
      width: '30%',
      render: (text, record) => {
        let activeUrl = '';
        let editLink = '';
        if (record.mark === 1) {
          activeUrl = <span><span className="ant-divider" /><a onClick={this.lookActiveUrl.bind(this, record)}>活动地址</a></span>;
        } else {
          editLink = <span><span className="ant-divider" /><Link to={`zuoPinPage/${record.id}/${record.mark}`}>作品管理</Link></span>;
        }
        return (
          <span>

            <a onClick={this.updateActive.bind(this, record)}>编辑</a>
            <span className="ant-divider" />
            <a onClick={this.deleteActive.bind(this, record)}>删除</a>
            {activeUrl}
            {editLink}
          </span>
        );
      },
    }];
    return (
      <div style={{ minHeight: '180px' }}>
        <Table columns={columns} dataSource={roots} onChange={this.handleChange.bind(this)} />
        <Modal title="活动地址" width={600} visible={this.state.visible} footer="" onCancel={this.handleCancel.bind(this)}>
          <p style={{ margin: '15px 0 25px', textAlign: 'center', fontSize: '17px' }}>{this.state.activeUrl}</p>
        </Modal>
      </div>
    );
  }
}

