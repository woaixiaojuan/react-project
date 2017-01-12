import React from 'react';
import { connect } from 'react-redux';
import { Input, notification } from 'antd';
import { setCacheValue } from '../actions/zuoPinActions';

@connect((store) => {
  return {
    cacheValue: store.zuoPinStore.cacheValue,
  };
})

export default class EditableCell extends React.Component {
  openNotification(type, description) {
    notification[type]({
      message: '通知提醒框',
      description,
      duration: 3,
    });
  }
  handleChange(e) {
    const value = e.target.value;
    if (parseInt(value, 10) > 0 && !isNaN(Number(value)) || value === '') {
      this.props.dispatch(setCacheValue(value));
    } else {
      this.openNotification('error', 'ZZ,您输入的序号非法!');
    }
  }
  render() {
    const { value, editable } = this.props;
    return (
      <div>
      {
        editable ?
        <div>
          <Input
            value={this.props.cacheValue}
            onChange={this.handleChange.bind(this)}
            style= {{ textAlign: 'center' }}
          />
        </div>
        :
        <div className="editable-row-text">
          {value || ' '}
        </div>
      }
    </div>);
  }
}
