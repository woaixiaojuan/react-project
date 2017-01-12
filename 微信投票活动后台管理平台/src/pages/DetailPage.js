import React from 'react';
import { connect } from 'react-redux';
import { Input, Button, Spin } from 'antd';
import ActiveTable from '../components/activeTable';
import FirstTableModal from '../components/FirstTableModal';
import { searchFilter, getActiveList, activeModalShow, setAciveId } from '../actions/activeActions';

@connect((store) => {
  return {
    listData: store.listData,
  };
})

export default class DetailPage extends React.Component {
  componentWillMount() {
    this.props.dispatch(getActiveList());
  }

  addBtn() {
    this.props.dispatch(setAciveId(''));
    this.props.dispatch(activeModalShow({
      title: {
        value: '',
      },
      Time: {
        value: [],
      },
      rule: {
        value: '',
      },
      modifier: {
        value: '未上架',
      },
      content: '<p></p>',
    }));
  }

  searchs(e) {
    const selectWord = e.target.value;
    this.props.dispatch(searchFilter(selectWord));
  }
  render() {
    return (
			<Spin size="large" tip="Loading..." spinning={this.props.listData.fetching}>
				<div>
					<div style={{ margin: '20px 0' }}>
						<Button type="primary" onClick={this.addBtn.bind(this)}>添加活动</Button>
						<Input placeholder="输入检索关键词" size="large" style={ { width: '25%', display: 'inline-block', float: 'right', minWidth: '300px' }} onChange={ this.searchs.bind(this) } />
					</div>
					<div><ActiveTable listData={this.props.listData} dispatch={this.props.dispatch} /></div>
				</div>
				<FirstTableModal listData={this.props.listData} dispatch={this.props.dispatch} />
			</Spin>
    );
  }
}
