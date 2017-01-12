import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Table, Button, Icon, Modal, Row, Col, Spin, Alert } from 'antd';
import { fetchTable, delTableItem } from '../actions/tableActions';
import { fetchAdType } from '../actions/adTypeActions';

import SelectAd from '../components/selectAd';
import Search from '../components/Search';
import ShowVideo from '../components/showVideo';
import UploadVideo from '../components/uploadVideo';
import VideoImg from '../components/videoImg';

@connect((store) => {
  return {
    table: store.table,
  };
})

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [], // 这里配置默认勾选列
      sortedInfo: {
        columnKey: 'frameId',
        order: 'descend',
        filteredInfo: {},
      },
    };
  }
  componentWillMount() {
    this.props.dispatch(fetchTable());
    // this.props.dispatch(fetchAdType());
  }
  onSelectChange(selectedRowKeys) {
    //console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  getColumns() {
    return [
      {
        key: 'frameId',
        title: '广告ID',
        dataIndex: 'frameId',
        sorter: (a, b) => a.frameId - b.frameId,
        sortOrder: this.state.sortedInfo.columnKey === 'frameId' && this.state.sortedInfo.order,
      }, {
        title: '视频名称',
        dataIndex: 'videoName',
        render(text) {
          return <b style={{ color: '#2db7f5' }}>{text}</b>;
        },
      },
      {
        title: '视频图片',
        width: 180,
        dataIndex: 'videoImg',
        render(text) {
          return <VideoImg imgsrc={text} />
        },
      },
      {
        title: '开始时间',
        dataIndex: 'startTime',
      },
      {
        title: '时长',
        dataIndex: 'duration',
      }, {
        title: '投放时间',
        dataIndex: 'addDate',
      }, {
        title: '广告品牌',
        dataIndex: 'adBrand',
      },
      {
        title: '广告名称',
        dataIndex: 'adName',
      }, {
        title: '广告类型',
        dataIndex: 'adType',
        filters: ENV.typeData,
        filteredValue: this.state.filteredInfo,
        onFilter: (value, record) => record.adType.includes(value),
      },
      {
        title: '状态',
        dataIndex: 'status',
      }, {
        title: '',
        key: 'action',
        render: (text, record) => {
          const dels = {
            adBrand: '无',
            adName: '无',
            adImage: '',
            addDate: '无',
          }
          return (
            <span>
              <a onClick={this.preViewItem.bind(this, record)}>预览</a>
              <span className="ant-divider" />
              <a onClick={this.deleteItem.bind(this, { ...record, ...dels })}>删除广告</a>
            </span>
          )
        },
      }]
  }
  deleteItem(record) {
    this.props.dispatch(delTableItem(record));
  }
  preViewItem(record) {
    const columns = [
      {
        title: '名称',
        width: 100,
        dataIndex: 'title',
      }, {
        title: '内容',
        dataIndex: 'text',
      },
    ]

    const obj = {
      frameId: '视频ID',
      adBrand: '广告品牌',
      adImage: '广告图片',
      adName: '广告名称',
      adType: '广告类型',
      adContent: '广告内容',
      addDate: '添加时间',
      duration: '广告时长',
      startTime: '开始时间',
      videoName: '视频名称',
      status: '状态',
      videoSrc: '预览',
    }

    const data = [];
    for (const i in record) {
      //console.log(i,record[i]);
      if (obj.hasOwnProperty(i)) {
        let text = '';
        if (i === 'adImage') {
          text = <img src={record[i]} style={{ maxWidth: '200px' }} />;
        } else if (i === 'videoSrc') {
          // text = <video controls src= {record[i]} style={{ maxWidth:'500px'}} />;
          text = <ShowVideo imgSrc={record.adImage} videoSrc={record[i]} startTime={record.startTime} />;
        }
        //  else if (i === 'startTime') {
        //   text = transTime(record[i]);
        // }
        else {
          text = record[i];
        }
        const item = { frameId: data.length, title: obj[i], text };
        data.push(item);
      }
    }
      // let text = '';
      // if (i === 'videoImg' || i.indexOf('Id') !== -1) {
      //   continue;
      // } else if (i === 'adImage') {
      //   text = <img src={record[i]} style={{ maxWidth: '200px' }} />;
      // } else if (i === 'videoSrc') {
      //   // text = <video controls src= {record[i]} style={{ maxWidth:'500px'}} />;
      //   text = <ShowVideo imgSrc={record.adImage} videoSrc={record[i]} startTime={record.startTime} />;
      // } else {
      //   text = record[i]
      // }
      // const item = { frameId: data.length, title: obj[i], text };
      // data.push(item);


    Modal.info({
      okText: 'OK',
      title: '详情预览',
      width: 800,
      content: (
        <Table columns={columns} dataSource={data} pagination={false} bordered size="middle" />
    ),
      onOk() {},
    });
    //console.log(record);
    //this.props.dispatch(delTableItem(record));
  }

  handleChange(pagination, filters, sorter) {
    this.setState({
      sortedInfo: sorter,
    });
  }
  transTime(time) {
    if (time.indexOf(':') !== -1) {
      return time;
    } else {
      const h = parseInt(time / 3600, 10);
      const m = parseInt((time % 3600) / 60, 10) < 10 ? `0${parseInt((time % 3600) / 60, 10)}` : parseInt((time % 3600) / 60, 10);
      const s = parseInt((time % 3600) % 60, 10) < 10 ? `0${parseInt((time % 3600) % 60, 10)}` : parseInt((time % 3600) % 60, 10);
      return `${h}:${m}:${s}`
    }
  }

  render() {
    const { items, filter, fetching } = this.props.table;
    let data = [];
    if (filter) {
      data = items.filter((item) => {
        return item.adType.indexOf(filter) !== -1
      })
    } else {
      data = items;
    }

    data = data.map((item) => {
      // if (item.startTime) {
      //   item.startTime = this.transTime(item.startTime);
      // }
      return {
        ...item,
        startTime: (item.startTime ? this.transTime(item.startTime) : item.startTime),
      };
    });

    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange.bind(this),
    };

    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <div style={{ marginBottom: 16, marginTop: 16 }}>
          <Row>
            <Col span={1}>
              <SelectAd dispatch={this.props.dispatch.bind(this)} loading={this.state.loading} hasSelected={hasSelected} selectedRowKeys={this.state.selectedRowKeys} />
            </Col>
            <Col span={1} offset={1} >
              <UploadVideo dispatch={this.props.dispatch.bind(this)} />
            </Col>
            <Col span={8} offset={13}>
              <Search />
            </Col>
          </Row>
          <span style={{ marginLeft: 8 }}>{hasSelected ? `选择了 ${selectedRowKeys.length} 个对象` : ''}</span>
        </div>
        <Spin tip={'加载ing,请稍等'} spinning={fetching}>
          <Table rowSelection={rowSelection} columns={this.getColumns.bind(this)()} dataSource={data} onChange={this.handleChange.bind(this)} rowKey={'frameId'} />
        </Spin>
      </div>
    );
  }
}
