import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Row, Col, notification } from 'antd';
import { Link } from 'react-router';
import { delTheme } from '../actions/themeActions';


const confirm = Modal.confirm;

@connect((store) => {
  return {
    themeList: store.theme.themes,
  };
})

export default class ThemeDetail extends React.Component {
  static openNotification(type, description) {
    notification[type]({
      message: '通知提醒框',
      description,
      duration: 2.5,
    });
  }
  static getGoodDescription(summary) {
    const summaryObj = JSON.parse(summary);

    return (
     <Row>
        <Col xs={24} sm={18} md={20} lg={20}>
          <span style={{ color: '#eb6864' }}>价格: {summaryObj.price} </span>
        </Col>
        <Col xs={24} sm={4} md={4} lg={4}>
          <span>已售: {summaryObj.count}</span>
        </Col>
     </Row>
    );
  }
  handleDel() {
    const { id, title, themeTypeName } = this.props.data;
    const { dispatch, videoId } = this.props;
    const themeList = this.props.themeList || [];
    confirm({
      title: '确定删除该主题?',
      width: 490,
      content: `${title}(${themeTypeName}) `,
      onOk() {
        if (themeList.length > 1) {
          dispatch(delTheme(id, videoId));
        } else {
          ThemeDetail.openNotification('error', '不能删除所有主题');
        }
      },
      onCancel() {
        console.warn('没事瞎点个啥!');
      },
    });
  }

  render() {
    const { id, imgUrl, title, score, issueTime, summary, source, themeTypeId, themeTypeName, videoTypeId } = this.props.data;
    const { videoSetId } = this.props;
    const videoId = this.props.videoId;
    const zhihuImg = imgUrl || 'http://resource.handsight.cn/TVHelp01/img/upload/1480902153810_4513.png';
    let titleLink = '';
    let description = '';
    if (themeTypeId === 2) {
      titleLink = <a href={source} target="_blank" style={{ color: '#5bc0de' }}> {title} </a>;
      description = ThemeDetail.getGoodDescription(summary);
    } else {
      const url = `videopage/${videoTypeId}/${videoId}/${videoSetId}/${id}`;
      titleLink = <Link to={url} style={{ color: '#5bc0de' }} >{title}</Link>;
      description = summary;
    }


    return (
      <Row type="flex" style={{ padding: '20px 0', borderBottom: '1px solid #ecf0f1' }}>
        <Col xs={0} sm={8} md={6} lg={6}>
          <img src={zhihuImg} style={{ maxWidth: '230px', height: '140px', boxShadow: '0 0 10px #999' }} className="img-thumbnail" />
        </Col>
        <Col xs={24} sm={16} md={18} lg={18}>
        <Row type="flex" justify="start" align="middle">
           <Col xs={19} sm={19} md={19} lg={19}>
          <h3 style={{ marginTop: '5px', fontSize: '23px' }}>{titleLink}</h3> </Col>
          <Col xs={3} sm={3} md={3} lg={3} style={{ overflow: 'hidden' }}> <span style={{ color: '#5bc0de' }}>分数:{score}</span> </Col>
          <Col xs={2} sm={1} md={2} lg={2}>
              <Button onClick={this.handleDel.bind(this)} >删除</Button>
          </Col>
        </Row>

          <div style={{ height: '65px', overflow: 'hidden' }}>{description}</div>
          <span style={{ paddingRight: '30px' }}>{issueTime}</span><span style={{ color: '#5bc0de' }}>{themeTypeName}</span>
        </Col>
      </Row>
    );
  }
}
