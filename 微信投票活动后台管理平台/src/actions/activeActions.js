import axios from 'axios';
import { notification } from 'antd';
import qs from 'qs';

function openNotification(type, description) {
  notification[type]({
    message: '通知提醒框',
    description,
    duration: 3,
  });
}

// 获取活动列表
export function getActiveList() {
  return function (dispatch) {
    dispatch({
      type: 'GET_ACTIVE_LIST_PENDING',
    });
    axios.get(`${ENV.api}/wx/voteActive/get.do?mark=0`).then((res) => {
      if (res.data.success === true) {
        dispatch({
          type: 'GET_ACTIVE_LIST_FULFILLED',
          payload: res,
        });
      } else {
        dispatch({
          type: 'GET_ACTIVE_LIST_REJECTED',
        });
        openNotification('error', res.data.msg);
      }
    }).catch(() => {
      dispatch({
        type: 'GET_ACTIVE_LIST_REJECTED',
      });
      openNotification('error', '活动加载失败！');
    });
  };
}

export function setActiveFormValue(value) {
  return {
    type: 'SET_ACTIVE_FORM_VALUE',
    payload: value,
  };
}

export function setFirstEditorValue(value) {
  return {
    type: 'SET_FIRST_EDITOR_VALUE',
    payload: value,
  };
}
// 添加投票活动
export function addActivity(title, content, rule, startTime, endTime) {
  return function (dispatch) {
    dispatch({
      type: 'ADD_ACTIVITY_PADDING',
      payload: content,
    });
    const param = {
      title,
      content,
      rule,
      startTime,
      endTime,
    };
    const params = JSON.stringify(param);
    // axios.post(`${ENV.api}/wx/voteActive/add.do?json=${params}`);
    axios.post(`${ENV.api}/wx/voteActive/add.do`, qs.stringify({ json: params }),
    ).then((res) => {
      if (res.data.success === true) {
        dispatch({
          type: 'ADD_ACTIVITY_FULFILLED',
          payload: res.data,
        });
        openNotification('success', '添加成功！');
      } else {
        dispatch({
          type: 'ADD_ACTIVITY_REJECTED',
        });
        openNotification('error', res.data.msg);
      }
    }).catch(() => {
      dispatch({
        type: 'ADD_ACTIVITY_REJECTED',
      });
      openNotification('error', '添加失败！');
    });
  };
}

// 编辑投票活动
export function updateActivity(title, id, content, rule, startTime, endTime, mark) {
  return function (dispatch) {
    dispatch({
      type: 'UPDATE_ACTIVITY_PADDING',
    });
    const param = {
      title,
      id,
      content,
      rule,
      startTime,
      endTime,
      mark,
    };
    const params = JSON.stringify(param);
    // axios.post(`${ENV.api}/wx/voteActive/update.do?json=${params}`)
    axios.post(`${ENV.api}/wx/voteActive/update.do`, qs.stringify({ json: params }),
    )
    .then((res) => {
      if (res.data.success === true) {
        dispatch({
          type: 'ADD_ACTIVITY_FULFILLED',
          payload: res.data,
        });
        // dispatch({
        //   type: 'UPDATE_ACTIVITY_FULFILLED',
        //   payload: {
        //     id,
        //     title,
        //     content,
        //     rule,
        //     mark,
        //     createTime: '',
        //     startTime,
        //     endTime,
        //     updateTime: '',
        //   },
        // });
        openNotification('success', '修改成功！');
      } else {
        dispatch({
          type: 'UPDATE_ACTIVITY_REJECTED',
        });
        openNotification('error', res.data.msg);
      }
    }).catch(() => {
      dispatch({
        type: 'UPDATE_ACTIVITY_REJECTED',
      });
      openNotification('error', '修改失败！');
    });
  };
}
// 删除投票活动
export function deleteActivity(id) {
  return function (dispatch) {
    dispatch({
      type: 'DELETE_ACTIVITY_PADDING',
    });
    axios.get(`${ENV.api}/wx/voteActive/del.do?activeId=${id}`).then((res) => {
      if (res.data.success === true) {
        dispatch({
          type: 'DELETE_ACTIVITY_FULFILLED',
          payload: {
            id,
          },
        });
        openNotification('success', '删除成功！');
      } else {
        dispatch({
          type: 'DELETE_ACTIVITY_REJECTED',
        });
        openNotification('error', res.data.msg);
      }
    }).catch(() => {
      dispatch({
        type: 'DELETE_ACTIVITY_REJECTED',
      });
      openNotification('error', '删除失败！');
    });
  };
}

// 通过关键字搜索
export function searchFilter(filter) {
  return {
    type: 'FILTER_KEY_WORD',
    payload: filter,
  };
}

// 活动表单显示
export function activeModalShow(data) {
  return {
    type: 'ACTIVE_MODAL_SHOW',
    payload: data,
  };
}

// 活动表单隐藏
export function activeModalHide() {
  return {
    type: 'ACTIVE_MODAL_HIDE',
  };
}

// 点击编辑-将数据添加到store的keepfrom中
export function keepData(id) {
  return {
    type: 'KEEP_DATA',
    payload: id,
  };
}

// from一变就修改富文本的值
export function changeEditor(title, startTime, endTime, mark, rule, content) {
  return {
    type: 'CHANGE_EDITOR',
    payload: {
      title,
      startTime,
      endTime,
      mark,
      rule,
      content,
    },
  };
}

export function setAciveId(id) {
  return {
    type: 'SET_ACTIVE_ID',
    payload: id,
  };
}
