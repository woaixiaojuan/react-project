import axios from 'axios';
import { message } from 'antd';

message.config({
  duration: 3.5,
});

function checkOS() {
  const ua = navigator.userAgent.toLowerCase();
  return (ua.indexOf('mac') !== -1) ? 1 : 2;
}

// 点击我要参与
export function startActive() {
  return {
    type: 'START_ACTIVE',

  };
}

// 获取活动的所有信息
export function getAllData() {
  if (ENV.activeId === 0) {
    message.error('抱歉,活动ID不存在！', 30);
  }
  return function (dispatch) {
    dispatch({
      type: 'GET_ALL_DATA_PENDING',
    });
    axios.get(`${ENV.api}/active/get_active?activeId=${ENV.activeId}&appId=${ENV.appId}`)
      .then((res) => {
        if (res.data.success === true) {
          dispatch({
            type: 'GET_ALL_DATA_FULFILLED',
            payload: res.data.data,
          });
        } else {
          message.error('抱歉,获取活动失败!', 30);
          dispatch({
            type: 'GET_ALL_DATA_REJECTED',
            payload: '',
          });
        }
      })
      .catch((err) => {
        if (err.message) {
          message.error(err.message, 30);
        }
        dispatch({
          type: 'GET_ALL_DATA_REJECTED',
          payload: err,
        });
        message.error('抱歉,获取活动失败!', 30);
      });
  };
}

export function createBoxList() {
  return {
    type: 'CREATE_BOX_FULFILLED',
  };
}

// 查询抽奖结果
export function getDrawResult(index) {
  return function (dispatch) {
    const startTime = new Date();
    dispatch({
      type: 'GET_DRAW_RESULT_PENDING',
      payload: index,
    });
    axios.get(`${ENV.api}/active/get_draw_result?activeId=${ENV.activeId}&appId=${ENV.appId}`)
    .then((res) => {
      const costTime = new Date() - startTime;
      if (res.data.success === true) {
        if (res.data.data.rewardsId !== '-1') {
          if (costTime < 3000) {
            setTimeout(() => {
              dispatch({
                type: 'GET_DRAW_RESULT_OK_FULFILLED',
                payload: { payload: res.data.data, index },
              });
            }, 3000);
            setTimeout(() => {
              dispatch({
                type: 'OPEN_FORM_OK_FULFILLED',
              });
            }, 4000);
          } else {
            dispatch({
              type: 'GET_DRAW_RESULT_OK_FULFILLED',
              payload: { payload: res.data.data, index },
            });
            setTimeout(() => {
              dispatch({
                type: 'OPEN_FORM_OK_FULFILLED',
              });
            }, 1000);
          }
        } else {
          if (costTime < 3000) {
            setTimeout(() => {
              dispatch({
                type: 'GET_DRAW_RESULT_NO_FULFILLED',
                payload: { payload: res.data.data, index },
              });
            }, 3000);
            setTimeout(() => {
              dispatch({
                type: 'OPEN_FORM_NO_FULFILLED',
              });
            }, 4000);
          } else {
            dispatch({
              type: 'GET_DRAW_RESULT_FULFILLED',
              payload: { payload: res.data.data, index },
            });
            setTimeout(() => {
              dispatch({
                type: 'OPEN_FORM_NO_FULFILLED',
              });
            }, 1000);
          }
        }
      } else {
        if (costTime < 3000) {
          setTimeout(() => {
            dispatch({
              type: 'GET_DRAW_RESULT_REJECTED',
              payload: res.data,
            });
          }, 3000);
        }
      }
    })
      .catch((err) => {
        if (err.message) {
          message.error(err.message, 30);
        }
        dispatch({
          type: 'GET_DRAW_RESULT_REJECTED',
          payload: err,
        });
        message.error('网络异常!', 30);
      });
  };
}

export function getTimes() {
  return function (dispatch) {
    dispatch({
      type: 'FETCH_TIMES_DATA_PENDING',
    });
    axios.get(`${ENV.api}/active/get_draw_count?activeId=${ENV.activeId}&appId=${ENV.appId}`)
    .then((res) => {
      if (res.data.success === true) {
        dispatch({
          type: 'FETCH_TIMES_DATA_FULFILLED',
          payload: res.data.data,
        });
      } else {
        message.error('抱歉,获取抽奖次数失败!', 30);
        dispatch({
          type: 'FETCH_TIMES_DATA_REJECTED',
          payload: '',
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: 'FETCH_TIMES_DATA_REJECTED',
        payload: err,
      });
    });
  };
}

// 返回app
export function back2App() {
  return function (dispatch) {
    dispatch(createBoxList());
    dispatch({
      type: 'BACK_APP',
    });

    setTimeout(() => {
      message.success('谢谢参与！');
      const deviceOS = checkOS();
      function setupWebViewJavascriptBridge(callback) {
        if (window.WebViewJavascriptBridge) {
          return callback(WebViewJavascriptBridge);
        }
        if (window.WVJBCallbacks) {
          return window.WVJBCallbacks.push(callback);
        }
        window.WVJBCallbacks = [callback];
        const WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(() => {
          document.documentElement.removeChild(WVJBIframe);
        }, 0);
      }
      if (deviceOS === 1) {
        setupWebViewJavascriptBridge((bridge) => {
          bridge.callHandler('go2ActiveList');
        });
        console.log(' back2ActiveList(ios);');
      } else if (typeof hostAPP != 'undefined') {
        hostAPP.go2ActiveList();
        console.log(' back2ActiveList(安卓);');
      } else {
        console.log('back2ActiveList');
      }
    }, 100);
  };
}

