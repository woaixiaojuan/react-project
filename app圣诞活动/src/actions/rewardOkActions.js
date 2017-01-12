import axios from 'axios';
import qs from 'qs';
import { message } from 'antd';
// Steps const Step = Steps.Step;

message.config({
  duration: 3,
});

export function btnOk(send) {
  return function (dispatch) {
    dispatch({
      type: 'CONFIRM_PENDING',
    });
    const { appId, serialId, activeId, content } = send;
    axios.post(`${ENV.api}/active/upload_luck1.2`, qs.stringify({ appId, serialId, activeId, content: JSON.stringify(content) }))
    .then((res) => {
      if (res.data.success === true) {
        dispatch({
          type: 'CONFIRM_FULFILLED',
          payload: res.data.data,
        });
        message.success('操作成功');
      } else {
        message.info(res.data.msg);
      }
    })
    .catch(() => {
      dispatch({
        type: 'CONFIRM_REJECTED',
      });
      message.error('操作失败！');
    });
  };
}
export function getCaptcha(userNumber, appId) {
  return function (dispatch) {
    dispatch({
      type: 'GET_CAPTCHA_PENDING',
    });
    axios.post(`${ENV.api}/user/access/get_verifycode`, qs.stringify({ phone: userNumber, appId }))
    .then((res) => {
      if (res.data.success === true) {
        dispatch({
          type: 'GET_CAPTCHA_FULFILLED',
          payload: res.data.data,
        });
        message.success('验证码已发送。');
      } else {
        message.info(res.data.msg);
      }
    })
    .catch(() => {
      dispatch({
        type: 'GET_CAPTCHA_REJECTED',
      });
      message.error('验证码发送失败！');
    });
  };
}
export function modalShow() {
  return {
    type: 'MODAL_SHOW',
  };
}
export function modalHide() {
  return {
    type: 'MODAL_HIDE',
  };
}

