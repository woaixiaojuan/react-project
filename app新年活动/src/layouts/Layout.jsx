import React from 'react';
import { connect } from 'react-redux';
import './layout.less';
import { createBoxList, getTimes, getAllData } from '../actions/openBoxAction';

@connect((store) => {
  return {};
})

export default class Layout extends React.Component {
  componentWillMount() {
    this.props.dispatch(getAllData());
    this.props.dispatch(getTimes());
    this.props.dispatch(createBoxList());
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
