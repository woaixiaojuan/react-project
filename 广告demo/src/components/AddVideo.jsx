import React from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { addTableItem } from '../actions/tableActions';

const createForm = Form.create;
const FormItem = Form.Item;

function noop() {
  return false;
}


//function TestForm(props){
class UploadVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    // this.start = this.start.bind(this);
    // this.onSelectChange = this.onSelectChange.bind(this);
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
        console.log(this.props)
        this.props.dispatch(addTableItem(values));
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
  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  }

  checkAddress(rule, value, callback) {

    //const { getFieldValue } = this.props.form;
    if (value && value.length < 5) {
      callback('您输入的地址不正确');
    } else {
      callback();
    }
  }
  checkTime(rule, value, callback) {
    const pattern = /[01]:[0-5][0-9]:[0-5][0-9]/
    //const { getFieldValue } = this.props.form;
    if (value && pattern.test(value)) {
        callback();
    } else {
        callback('您输入的时间格式不正确,正确格式:1:25:15');
    }
  }
  checkDuration(rule, value, callback) {
    const pattern =/^[1-5][0-9]{1}$|^[1-9]$/;
    if (value && pattern.test(value)) {
        callback();
    } else {
        callback('您输入的时长不正确,应该是1~59之间');
    }
  }

  render() {
    const { getFieldDecorator, getFieldError, isFieldValidating } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };

    return (
      <div>
        <Button type="primary" onClick={this.showModal.bind(this)}>添加信息</Button>
        <Modal title="上传新视频" visible={this.state.visible}
          onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
        >

      <Form horizontal>
        <FormItem
          {...formItemLayout}
          label="视频名称"
          hasFeedback
          help={isFieldValidating('videoName') ? 'validating...' : (getFieldError('videoName') || []).join(', ')}
        >
          {getFieldDecorator('videoName', {
            rules: [
              { required: true, min: 3, message: '请输入正确的视频名称' },
              { validator: this.userExists },
            ],
          })(
            <Input placeholder="请输入视频名称" />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="开始时间"
          hasFeedback
          help={isFieldValidating('startTime') ? 'validating...' : (getFieldError('startTime') || []).join(', ')}
        >
          {getFieldDecorator('startTime', {
            rules: [
              { required: true, min: 6, message: '请输入正确的时间格式' },
              { validator: this.checkTime.bind(this) },
            ],
          })(
            <Input placeholder="请输入开始时间,如: 1:25:59" />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="时长"
          hasFeedback
        >
          {getFieldDecorator('duration', {
            rules: [
              { required: true, whitespace: true, message: '请输入商机的时长' },
              { validator: this.checkDuration.bind(this) },
            ],
          })(
            <Input placeholder="请输入商机的时长"   />
          )}
        </FormItem>

      </Form>

       </Modal>
       </div>
    );
  }
}

export default UploadVideo = Form.create({})(UploadVideo)

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
