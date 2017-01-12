import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Col, Row, Form, Input, message } from 'antd';
import { btnOk, modalShow, modalHide, getCaptcha } from '../actions/rewardOkActions';
import { back2App } from '../actions/openBoxAction';

const FormItem = Form.Item;
message.config({
  duration: 3,
});

@connect((store) => {
  return {
    rewardOk: store.rewardOk,
    openBox: store.openBox,
  };
})

class RewardOk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      tims: 0,
    };
  }
  setForm() {
    this.props.form.resetFields();
    this.props.dispatch(modalShow());
  }
  handleOk() {
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      const { captcha, userName, userNumber, qqNumber } = fieldsValue;
      const { appId, serialId, activeId } = this.props.openBox.getResultData;
      const send = {};
      send.appId = appId;
      send.serialId = serialId;
      send.activeId = activeId;
      send.content = [
        { attr: 'userName', attrName: '用户名', val: userName },
        { attr: 'phoneNo', attrName: '手机号', val: userNumber },
        { attr: 'qqAccount', attrName: 'QQ帐号', val: qqNumber },
      ];
      if (captcha == this.props.rewardOk.captcha) {
        this.props.dispatch(btnOk(send));
      } else {
        message.error('验证码不正确！');
      }
    });
  }
  handleCancel() {
    this.props.dispatch(modalHide());
  }
  handleCaptcha() {
    const { time } = this.state;
    if (time > 0) {
      message.info('60s内不能重复发送验证码！');
    } else {
      const userNumber = this.props.form.getFieldsValue().userNumber;
      const { appId } = this.props.openBox.getResultData;
      this.props.dispatch(getCaptcha(userNumber, appId));
      this.setState({
        disabled: true,
        time: 60,
      });
      const timeCtr = setInterval(() => {
        const times = this.state.time - 1;
        if (times === 0) {
          this.setState({
            time: times,
            disabled: false,
          });
          clearInterval(timeCtr);
        } else {
          this.setState({
            time: times,
          });
        }
      }, 1000);
    }
  }
  checkPhone(rule, value, callback) {
    const phoneRe = /^1(3|4|5|7|8)\d{9}$/;
    if (value && phoneRe.test(value) === true) {
      this.setState({
        disabled: false,
      });
      callback();
    } else {
      this.setState({
        disabled: true,
      });
      callback('请输入正确的电话号码！');
    }
  }
  checkQQ(rule, value, callback) {
    const qqRe = /[1-9][0-9]{4,9}/;
    if (value && qqRe.test(value) === true) {
      callback();
    } else {
      callback('请输入正确的QQ号！');
    }
  }

  backApp() {
    this.props.dispatch(back2App());
  }
  render() {
    const { loading, visible, endShow, info } = this.props.rewardOk;
    const { okBox, noBox, rewardImg, rewardName } = this.props.openBox;
    const { getFieldDecorator } = this.props.form;
    const divStyle = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      display: okBox ? 'block' : 'none',
      backgroundImage: `url(${ENV.rewardImg})`,
      backgroundSize: 'cover',
      zIndex: 999,
    };
    const modalStyle = {
      position: 'absolute',
      top: '10px',
      left: '50%',
      marginLeft: '-150px',
    };
    const infoStyle = {
      position: 'absolute',
      top: '2.4rem',
      right: '0',
      width: '99%',
      textAlign: 'center',
      color: '#fff',
      fontSize: '18px',
    };
    const centerStyle = {
      textAlign: 'center',
      color: '#fff',
      fontSize: '16px',
      position: 'absolute',
      top: '1.6rem',
      right: '0',
      width: '99%',
      height: '2.6rem',
      zIndex: 1200,
    };
    const centerImgStyle = {
      width: '1.3rem',
      maxWidth: '1.3rem',
      display: 'block',
      margin: '0.3rem auto 0.2rem',
    };
    const noStyle = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      display: noBox ? 'block' : 'none',
      background: `url(${ENV.noRewardImg}) no-repeat`,
      backgroundSize: 'cover',
      zIndex: 1200,
    };
    const endStyle = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      display: endShow ? 'block' : 'none',
      backgroundImage: `url(${ENV.rewardImg})`,
      backgroundSize: 'cover',
      zIndex: 1200,
    };

    const footerStyle = <div><a href="#" onClick={this.handleCancel.bind(this)}>取消</a><a href="#" onClick={this.handleOk.bind(this)}>确定</a></div>;
    const timeText = this.state.time > 0 ? `${this.state.time}s后重新获取` : '获取验证码';
    return (
      <div>
        <div style={divStyle} id="userMsg">
          <Modal title="领奖信息" footer={footerStyle} style={modalStyle} width={300} confirmLoading={loading} maskClosable={false} closable={false} visible={visible}>
            <Form horizontal>
              <FormItem>
                {getFieldDecorator('userName', {
                  rules: [
                    { required: true, message: '请输入姓名!' },
                  ],
                })(
                  <Input placeholder="请输入姓名" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('userNumber', {
                  rules: [
                    { validator: this.checkPhone.bind(this) },
                  ],
                })(
                  <Input placeholder="请输入手机号码" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('qqNumber', {
                  rules: [
                    { validator: this.checkQQ.bind(this) },
                  ],
                })(
                  <Input placeholder="请输入QQ号码" />
                )}
              </FormItem>
              <FormItem>
                <Row type="flex" justify="space-between">
                  <Col span={12}>
                    {getFieldDecorator('captcha', {
                      rules: [{ required: true, message: '请输入验证码!' }],
                    })(
                      <Input size="large" placeholder="请输入验证码" />
                    )}
                  </Col>
                  <Col style={{ width: '130px' }}>
                    <Button style={{ width: '100%' }}disabled={this.state.disabled} size="large" onClick={this.handleCaptcha.bind(this)}>{timeText}</Button>
                  </Col>
                </Row>
              </FormItem>
            </Form>
          </Modal>
          <div style={centerStyle}>
            <img src={rewardImg} style={centerImgStyle} />
            <p style={{ overflow: 'hidden', width: '2.8rem', margin: '0 auto', height: '25px' }}>{rewardName}</p>
          </div>
          <Button type="primary" style={{ position: 'absolute', bottom: '0.22rem', left: '50%', marginLeft: '-52px' }} onClick={this.setForm.bind(this)}>填写领奖信息</Button>
        </div>
        <div style={noStyle}>
          <Button type="primary" style={{ position: 'absolute', bottom: '0.35rem', left: '50%', marginLeft: '-0.75rem', width: '1.5rem' }} onClick={this.backApp.bind(this)}>确定</Button>
        </div>
        <div style={endStyle}>
          <Button type="primary" style={{ position: 'absolute', bottom: '0.22rem', left: '50%', marginLeft: '-0.75rem', width: '1.5rem' }} onClick={this.backApp.bind(this)}>确定</Button>
          <div style={infoStyle}>{info}</div>
        </div>
      </div>
    );
  }
}

export default RewardOk = Form.create({})(RewardOk);
