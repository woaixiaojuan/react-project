import React from 'react';
import moment from 'moment';
import { Modal, Button, Form, Input, Upload, Icon, message } from 'antd';
import { editTableItems } from '../actions/tableActions';


const createForm = Form.create;
const FormItem = Form.Item;
const Dragger = Upload.Dragger;

function noop() {
  return false;
}


//function TestForm(props){
class EditAd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      fileList: [],
    };
  }
  showModal() {
    this.setState({
      visible: true,
    });
  }

  handleOk() {
    this.setState({ loading: true });
    // 模拟 ajax 请求，完成后清空
    setTimeout(() => {
      this.setState({
        // selectedRowKeys: [],
        loading: false,
      });
    }, 1000)
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        //console.log('Errors in form!!!');

      } else {
        this.setState({
          visible: false,
        });
        const keys = this.props.selectedRowKeys;
        const adImage = values.adImage;
        const items = keys.map((key) => { return { ...values, adImage, frameId: key, addDate: moment().format('YYYY-MM-DD HH:mm:ss') } });
        setTimeout(() => { this.props.dispatch(editTableItems(items)); }, 1000)

        this.props.form.resetFields();
        this.setState({ fileList: [] });
      }
    });
  }

  handleCancel(e) {
    this.setState({
      visible: false,
    });
    this.props.form.resetFields();
    this.setState({ fileList: [] });
  }

  checkAdName(rule, value, callback) {
    //const { getFieldValue } = this.props.form;
    if (value && value.length < 3) {
      callback('您输入的名称不正确');
    } else {
      callback();
    }
  }

  checkAdType(rule, value, callback) {
    //const pattern = /[01]:[0-5][0-9]:[0-5][0-9]/
    //const { getFieldValue } = this.props.form;
    if (value && value.length < 10) {
      callback();
    } else {
      callback('您输入的广告类型不正确');
    }
  }
  checkAdBrand(rule, value, callback) {
    if (value && value.length > 1) {
      callback();
    } else {
      callback('您输入的广告品牌不正确');
    }
  }
  checkAdImage(rule, value, callback) {
    if (value && value.indexOf('http') !== -1) {
      callback();
    } else {
      callback('请重新上传图片！');
    }
  }

  onChange(info) {
    if (info.file.status !== 'uploading') {
      //console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 上传成功.`);
      this.form.setFieldsValue({ adImage: info.file.response.data });
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败.`);
    }
    this.setState({ fileList: info.fileList });
  }

  render() {
    const { getFieldDecorator, getFieldError, isFieldValidating } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };
    const { selectedRowKeys } = this.props;
    const props = {
      name: 'filename',
      showUploadList: true,
      listType: 'picture',
      data: {
        type: '1',
        keys: selectedRowKeys,
      },
      accept: 'image/*',
      headers: {
        'X-Requested-With': null,
      },
      action: 'http://service.handsight.com.cn/common/upload?action=uploadimage&encode=utf-8',
      onChange: this.onChange,
      defaultFileList: [],
    };
    return (

      <div>
        <Button type="primary" onClick={this.showModal.bind(this)} disabled={!this.props.hasSelected} loading={this.state.loading}>投放广告</Button>
        <Modal
          title="添加广告" visible={this.state.visible}
          onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
        >

          <Form horizontal>
            <FormItem
          {...formItemLayout}
          label="广告标题"
          hasFeedback
          help={isFieldValidating('adName') ? 'validating...' : (getFieldError('adName') || []).join(', ')}
        >
          {getFieldDecorator('adName', {
            rules: [
              { required: true, min: 3, message: '请输入正确的广告名' },
              { validator: this.checkAdName.bind(this) },
            ],
          })(
            <Input placeholder="请输入视频名称" />,
          )}
        </FormItem>

            <FormItem
          {...formItemLayout}
          label="广告类型"
          hasFeedback
          help={isFieldValidating('adType') ? 'validating...' : (getFieldError('adType') || []).join(', ')}
        >
          {getFieldDecorator('adType', {
            rules: [
              { required: true, min: 2, message: '请输入正确的广告类型' },
              { validator: this.checkAdType.bind(this) },
            ],
          })(
            <Input placeholder="请输入广告类型" />,
          )}
        </FormItem>

            <FormItem
          {...formItemLayout}
          label="广告品牌"
          hasFeedback
        >
          {getFieldDecorator('adBrand', {
            rules: [
              { required: true, whitespace: true, message: '请输入正确的广告品牌' },
              { validator: this.checkAdBrand.bind(this) },
            ],
          })(
            <Input placeholder="请输入正确的广告品牌" />,
          )}
        </FormItem>

            <FormItem
          {...formItemLayout}
          label="上传图片"
          hasFeedback
          help={isFieldValidating('adImage') ? 'validating...' : (getFieldError('adImage') || []).join(', ')}
        >
          {getFieldDecorator('adImage', {
            rules: [
              { required: true, message: '请上传广告图片' },
              { validator: this.checkAdImage.bind(this) },
            ],
          })(
            <div style={{ height: 'auto' }} >
              <Dragger {...props} form={this.props.form} setState={this.setState.bind(this)} fileList={this.state.fileList}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
              </Dragger>
            </div>,
          )}
        </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default EditAd = Form.create({})(EditAd)

  // handleSubmit(e) {
  //   e.preventDefault();
  //   this.props.form.validateFields((errors, values) => {
  //     if (errors) {
  //       console.log('Errors in form!!!');
  //       return;
  //     }
  //     console.log('submit',values)
  //     this.props.dispatch(addTableItem(values));
  //   });
  // }


 // <FormItem
 //          {...formItemLayout}
 //          label="remark"
 //        >
 //          {getFieldDecorator('textarea', {
 //            rules: [
 //              { required: true, message: '请输入备注' },
 //            ],
 //          })(
 //            <Input type="textarea" placeholder="请输入备注" id="textarea" name="textarea" />
 //          )}
 // </FormItem>

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
