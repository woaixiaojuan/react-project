import React from 'react';
import moment from 'moment';
import { Modal, Button, Form, Radio, message, Card } from 'antd';
import { editTableItems } from '../actions/tableActions';


const RadioGroup = Radio.Group;
const createForm = Form.create;
const FormItem = Form.Item;

const adInfo = ENV.adInfo;


//function TestForm(props){
class SelectAd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      value: 1,
    };
  }
  showModal() {
    this.setState({
      visible: true,
    });
  }

  handleOk() {
    // this.setState({ loading: true });
    // // 模拟 ajax 请求，完成后清空
    // setTimeout(() => {
    //   this.setState({
    //     // selectedRowKeys: [],
    //     loading: false,
    //   });
    // }, 1000)

    this.props.form.validateFields((errors, values) => {
      if (errors) {
        //console.log('Errors in form!!!');

      } else {
        this.setState({
          visible: false,
        });

        const keys = this.props.selectedRowKeys;
        const items = { ...values.selectedAd, frameIds: keys };
        this.props.dispatch(editTableItems(items));
        this.props.form.resetFields();
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

  onChange(e) {
    this.setState({
      value: e.target.value,
    });
  }

  render() {
    const { getFieldDecorator, getFieldError, isFieldValidating } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };
    const { selectedRowKeys } = this.props;
    const selections = adInfo.map((ad) => {
      return (<Radio value={ad} key={ad.adId}>
        {this.state.value === ad ? <Card title={ad.adName} style={{ width: 300, borderColor: '#2db7f5' }}>
          <p>{ad.adType}类广告:    {ad.adBrand}</p>
          <p>广告内容:    {ad.adContent}</p>
          <img style={{ maxWidth: 250, display: 'block' }}src={ad.adImage} />
        </Card> : <Card title={ad.adName} style={{ width: 300 }}>

           <p>{ad.adType}类广告:    {ad.adBrand}</p>
           <p>广告内容:    {ad.adContent}</p>
           <img style={{ maxWidth: 250, display: 'block' }}src={ad.adImage} />
         </Card>}
      </Radio>)
    })
    return (

      <div>
        <Button type="primary" onClick={this.showModal.bind(this)} disabled={!this.props.hasSelected} loading={this.state.loading}>投放广告</Button>
        <Modal
          title="添加广告" visible={this.state.visible} width={1300}
          onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
        >

          <Form horizontal>

            <FormItem
          label="请选择要投放的广告"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          {getFieldDecorator('selectedAd', {
          initialValue: 1,
          rules: [
              { type: 'object', required: true, min: 1, message: '请选择想要投放的广告' },
           ],
        })(
           <RadioGroup onChange={this.onChange.bind(this)} >
              {selections}
            </RadioGroup>,
          )}


        </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default SelectAd = Form.create({})(SelectAd)

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

// < FormItem {...formItemLayout }
// label = "广告标题"
// hasFeedback
// help = { isFieldValidating('adName') ? 'validating...' : (getFieldError('adName') || []).join(', ') } > {
//   getFieldDecorator('adName', {
//     rules: [
//       { required: true, min: 3, message: '请输入正确的广告名' },
//       { validator: this.checkAdName.bind(this) },
//     ],
//   })(

//   )
// }

// < /FormItem>

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
