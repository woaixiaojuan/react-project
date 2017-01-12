export default function reducer(state = {
  fetching: false,
  fetched: false,
  loading: false,
  visible: false,
  endShow: false,
  captcha: null,
  info: null,
}, action) {
  switch (action.type) {
    case 'MODAL_SHOW':
      {
        return {
          ...state,
          visible: true,
          captcha: null,
        };
      }
    case 'MODAL_HIDE':
      {
        return {
          ...state,
          visible: false,
        };
      }
    case 'CONFIRM_PENDING':
      {
        return {
          ...state,
          loading: true,
        };
      }
    case 'CONFIRM_FULFILLED':
      {
        return {
          ...state,
          loading: false,
          visible: false,
          endShow: true,
          info: action.payload,
        };
      }
    case 'CONFIRM_REJECTED':
      {
        return {
          ...state,
          loading: false,
          visible: false,
        };
      }
    case 'GET_CAPTCHA_PENDING':
      {
        return {
          ...state,
        };
      }
    case 'GET_CAPTCHA_FULFILLED':
      {
        return {
          ...state,
          captcha: action.payload,
        };
      }
    case 'GET_CAPTCHA_REJECTED':
      {
        return {
          ...state,
        };
      }
    default:
      return {
        ...state,
      };
  }
}
