import React from 'react';
import { Modal, Button, Form, Input, Select, Upload, Icon, message } from 'antd';
import { connect } from 'react-redux';
import { fetchAd } from '../actions/addAdActions';

const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const Dragger = Upload.Dragger;

function noop() {
  return false;
}

@connect((store) => {
  return {
    addad: store.addad.data,
  };
})

class AddBTN extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      init: true,
      selectType: null,
    };
  }

  componentWillMount() {
    this.props.dispatch(fetchAd());
  }

  showModal() {
    this.setState({
      visible: true,
    });
  }

  handleOk() {
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        console.log('Errors in form!!!');
        return;
      } else {
        console.log('Submit!!!');
        console.log(values);
        this.props.form.resetFields();
        this.setState({
          visible: false,
        });
      }
    });
  }

  handleCancel(e) {
    //console.log(e);
    this.setState({
      visible: false,
    });
    this.props.form.resetFields();
  }

  checkTitle(rule, value, callback) {
    if (value && value.length > 50) {
      callback('标题长度不超过50字！');
    } else {
      callback();
    }
  }

  handleAdTypeChange(value) {
    this.setState({
      init: false,
      selectType: value,
    });
    this.props.form.setFieldsValue({ adName: this.props.addad.adName[value][0] });
  }

  render() {
    const { adType, adName } = this.props.addad;
    let typesOptions = null;
    let namesOptions = null;

    if (this.state.init === true) {
      typesOptions = adType.map(province => <Option key={province}>{province}</Option>);
      namesOptions = adName[adType[0]].map(city => <Option key={city}>{city}</Option>);
    } else {
      typesOptions = adType.map(province => <Option key={province}>{province}</Option>);
      namesOptions = adName[this.state.selectType].map(city => <Option key={city}>{city}</Option>);
    }

    const { getFieldDecorator, getFieldError, isFieldValidating } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 },
    };
    //console.log('1',this.props.hasSelected,this.props.selectedRowKeys)

    const propss = {
      action: '/upload.do',
      listType: 'picture',
      defaultFileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
        thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
      }, {
        uid: -2,
        name: 'yyy.png',
        status: 'done',
        url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
        thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
      }],
    };


    return (
      <div>
        <Button type="primary" onClick={this.showModal.bind(this)} disabled={!this.props.hasSelected} loading={this.props.loading}>投放广告</Button>

        <Modal title="Basic Modal" visible={this.state.visible}
          onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
        >

        <Form horizontal>
        <FormItem
          {...formItemLayout}
          label="广告类型"
          help={isFieldValidating('adType') ? 'validating...' : (getFieldError('adType') || []).join(', ')}
        >
          {getFieldDecorator('adType', {
            initialValue: adType[0],
          })(
              <Select onChange={this.handleAdTypeChange.bind(this)} >
                { typesOptions }
              </Select>
            )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="广告名称"
          help={isFieldValidating('adName') ? 'validating...' : (getFieldError('adName') || []).join(', ')}
        >
        {getFieldDecorator('adName', {
          initialValue: adName[adType[0]][0],
        })(
            <Select>
              { namesOptions }
            </Select>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="广告标题"
          hasFeedback
        >
          {getFieldDecorator('Address', {
            rules: [
              { required: true, whitespace: true, message: '请输入广告标题' },
              { validator: this.checkTitle.bind(this) },
            ],
          })(
            <Input placeholder="标题长度不超过50字" />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="上传图片"
        >
          {getFieldDecorator('textarea', {
            rules: [
              { required: true, message: '请上传广告图片' },
            ],
          })(
            <div style={{ height: 140 }}>

              <Upload  { ...propss }className="upload-list-inline">
                <Button type="ghost">
                  <Icon type="upload" /> 上传图片
                </Button>
              </Upload>

            </div>
          )}
        </FormItem>





      </Form>

       </Modal>
       </div>
    );
  }
}

export default AddBTN = Form.create({})(AddBTN)
//        <Button type="primary" onClick={this.showModal.bind(this)}>增加项目</Button>
// <FormItem
//           {...formItemLayout}
//           label="Email"
//           hasFeedback
//         >
//           {getFieldDecorator('email', {
//             validate: [{
//               rules: [
//                 { required: true },
//               ],
//               trigger: 'onBlur',
//             }, {
//               rules: [
//                 { type: 'email', message: 'Please input the correct email' },
//               ],
//               trigger: ['onBlur', 'onChange'],
//             }],
//           })(
//             <Input type="email" placeholder="This control uses onBlur and onChange" />
//           )}
//  </FormItem>


//         <FormItem
//           {...formItemLayout}
//           label="Password"
//           hasFeedback
//         >
//           {getFieldDecorator('passwd', {
//             rules: [
//               { required: true, whitespace: true, message: 'Please enter your password' },
//               { validator: this.checkPass.bind(this) },
//             ],
//           })(
//             <Input type="password" autoComplete="off" onContextMenu={noop.bind(this)} onPaste={noop.bind(this)} onCopy={noop.bind(this)} onCut={noop.bind(this)} />
//           )}
//         </FormItem>

//         <FormItem
//           {...formItemLayout}
//           label="Confirm password"
//           hasFeedback
//         >
//           {getFieldDecorator('rePasswd', {
//             rules: [{
//               required: true,
//               whitespace: true,
//               message: 'Please confirm your password',
//             }, {
//               validator: this.checkPass2.bind(this),
//             }],
//           })(
//             <Input type="password" autoComplete="off" placeholder="Two passwords that you enter must be consistent"
//               onContextMenu={noop.bind(this)} onPaste={noop.bind(this)} onCopy={noop.bind(this)} onCut={noop.bind(this)}
//             />
//           )}
//         </FormItem>

//         <FormItem
//           {...formItemLayout}
//           label="remark"
//         >
//           {getFieldDecorator('textarea', {
//             rules: [
//               { required: true, message: 'Really not supposed to write something?' },
//             ],
//           })(
//             <Input type="textarea" placeholder="Please write something" id="textarea" name="textarea" />
//           )}
//         </FormItem>

//
