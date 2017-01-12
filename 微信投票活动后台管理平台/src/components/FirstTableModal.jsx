import React from 'react';
import { Modal, Form, Input, Radio, DatePicker } from 'antd';
import { addActivity, updateActivity, setFirstEditorValue, activeModalHide, setActiveFormValue } from '../actions/activeActions.js';
import FirstEditor from './FirstEditor';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

class FirstTableModal extends React.Component {
  cancel() {
    this.props.dispatch(activeModalHide());
  }
  save() {
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      const rangeTimeValue = fieldsValue['Time'];
      const values = {
        ...fieldsValue,
        'Time': [
          rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
          rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'),
        ],
      };
      const htmlstr = window.firstEditor.getHTML();
      if (this.props.listData.activeId) {// 点击编辑
        let mark = null;
        if (values.modifier === '下架') {
          mark = '3';
        } else if (values.modifier === '上架') {
          mark = '1';
        } else if (values.modifier === '未上架') {
          mark = '2';
        }
        this.props.dispatch(updateActivity(values.title, this.props.listData.activeId, htmlstr, values.rule, values.Time[0], values.Time[1], mark));
      } else {
        this.props.dispatch(addActivity(values.title, htmlstr, values.rule, values.Time[0], values.Time[1]));
      }
    });
  }

  changeFrom(name, value) {
    if (window.firstEditor) {
      const editorValue = window.firstEditor.getHTML();
      this.props.dispatch(setFirstEditorValue(editorValue));
    }
    let rules = '';
    if (name === 'title') {
      rules = [{ required: true, message: '请输入活动标题!' }];
    } else if (name === 'Time') {
      rules = [{ type: 'array', required: true, message: '请选择活动开始结束时间!' }];
    } else if (name === 'modifier') {
      rules = [{ required: true, message: '请输入活动状态!' }];
    } else if (name === 'rule') {
      rules = [{ required: true, message: '请输入活动规则!' }];
    }
    const { getFieldDecorator } = this.props.form;
    getFieldDecorator(name, { valuePropName: value, rules });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    let radio = null;
    if (this.props.listData.activeId) {
      radio = (<FormItem label="是否上架" className="collection-create-form_last-form-item">
        {getFieldDecorator('modifier', {
          initialValue: '下架',
        })(
          <Radio.Group>
            <Radio value="上架">上架</Radio>
            <Radio value="下架">下架</Radio>
            <Radio value="未上架">未上架</Radio>
          </Radio.Group>
        )}
      </FormItem>);
    } else {
      radio = (<FormItem label="是否上架" className="collection-create-form_last-form-item">
        {getFieldDecorator('modifier', {
          initialValue: '下架',
        })(
          <Radio.Group disabled>
            <Radio value="上架">上架</Radio>
            <Radio value="下架">下架</Radio>
            <Radio value="未上架">未上架</Radio>
          </Radio.Group>
        )}
      </FormItem>);
    }
    return (
      <Modal
        visible={this.props.listData.modalShow}
        title="活动管理"
        okText="确定"
        width={900}
        onCancel={this.cancel.bind(this)}
        onOk={this.save.bind(this)}
      >
        <Form vertical style={{ padding: '0 20px' }}>
          <FormItem label="标题" hasFeedback>
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入活动标题!' }],
            })(
              <Input onChange={this.changeFrom.bind(this, 'title')} />
            )}
          </FormItem>

          <FormItem label="开始结束时间">
          {getFieldDecorator('Time', {
            rules: [{ type: 'array', required: true, message: '请选择活动开始结束时间!' }],
          })(
              <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" onChange={this.changeFrom.bind(this, 'Time')} />
            )}
          </FormItem>
          {radio}
          <FormItem label="活动规则" hasFeedback>
            {getFieldDecorator('rule', {
              rules: [{ required: true, message: '请输入活动规则!' }],
            })(
              <Input type="textarea" autosize autosize={{ minRows: 5 }} onChange={this.changeFrom.bind(this, 'rule')} />
            )}
          </FormItem>
          <FirstEditor content={this.props.listData.keepfrom.content} />
        </Form>
      </Modal>
    );
  }
}

export default FirstTableModal = Form.create(
  {
    onFieldsChange(props, fields) {
      props.dispatch(setActiveFormValue(fields));
    },
    mapPropsToFields(props) {
      const { title, Time, rule, modifier } = props.listData.keepfrom;
      if (props.listData.keepfrom) {
        return {
          title,
          Time,
          modifier,
          rule,
        };
      }
    },
  }
)(FirstTableModal);
