export default function reducer(state = {
  fetching: false,
  fetched: false,
  filter: '',
  modalShow: false,
  keepfrom: {},
  list: null,
  activeId: '',
}, action) {
  switch (action.type) {

    // 清除keepfrom中的数据
    case 'CLEAR_FROM':
      {
        return {
          ...state,
          keepfrom: action.payload,
        };
      }
    // 保存当前点击的活动的-数据
    case 'KEEP_DATA':
      {
        const id = action.payload;
        const list = state.list;
        let getData = list.filter((item) => {
          return item.id === id;
        });
        return {
          ...state,
          keepfrom: getData,
        };
      }

    // 是否显示from弹出框
    case 'ACTIVE_MODAL_SHOW':
      {
        return {
          ...state,
          modalShow: true,
          keepfrom: action.payload,
        };
      }
    case 'SET_ACTIVE_ID':
      {
        return {
          ...state,
          activeId: action.payload,
        };
      }
    case 'ACTIVE_MODAL_HIDE':
      {
        return {
          ...state,
          modalShow: false,
        };
      }
    case 'SET_ACTIVE_FORM_VALUE':
      {
        return {
          ...state,
          keepfrom: { ...state.keepfrom, ...action.payload },
        };
      }
    case 'SET_FIRST_EDITOR_VALUE':
      {
        return {
          ...state,
          keepfrom: { ...state.keepfrom, content: action.payload },
        };
      }
    // 获取活动列表
    case 'GET_ACTIVE_LIST_PENDING':
      {
        return {
          ...state,
          fetching: true,
        };
      }
    case 'ADD_ACTIVITY_PADDING':
      {
        return {
          ...state,
          keepfrom: { ...state.keepfrom, content: action.payload },
        };
      }
    case 'GET_ACTIVE_LIST_REJECTED':

      {
        return {
          ...state,
          fetching: false,
          error: action.payload,
        };
      }
    case 'GET_ACTIVE_LIST_FULFILLED':
      {
        const data = action.payload.data.data;
        return {
          ...state,
          fetching: false,
          fetched: true,
          list: data,
        };
      }
    // 通过标题筛选活动
    case 'FILTER_KEY_WORD':
      {
        const keyWords = action.payload;
        return {
          ...state,
          filter: keyWords,
        };
      }
    // 添加投票活动
    case 'ADD_ACTIVITY_PENDING':
      {
        return {
          ...state,
          fetching: true,
        };
      }
    case 'ADD_ACTIVITY_REJECTED':

      {
        return {
          ...state,
          fetching: false,
          modalShow: false,
          error: action.payload,
        };
      }
    case 'ADD_ACTIVITY_FULFILLED':
      {
        const data = action.payload.data;
        return {
          ...state,
          fetching: false,
          modalShow: false,
          fetched: true,
          list: data,
        };
      }

    // 修改投票活动
    case 'UPDATE_ACTIVITY_PENDING':
      {
        return {
          ...state,
          fetching: true,
        };
      }
    case 'UPDATE_ACTIVITY_REJECTED':

      {
        return {
          ...state,
          fetching: false,
          error: action.payload,
          modalShow: false,
        };
      }
    case 'UPDATE_ACTIVITY_FULFILLED':
      {
        const newList = state.list.map((item) => {
          if (item.id == action.payload.id) {
            item = action.payload;
          }
          return item;
        });
        return {
          ...state,
          fetching: false,
          fetched: true,
          modalShow: false,
          list: newList,
        };
      }

      // 删除投票活动
    case 'DELETE_ACTIVITY_PADDING':
      {
        return {
          ...state,
          fetching: true,
        };
      }
    case 'DELETE_ACTIVITY_REJECTED':

      {
        return {
          ...state,
          fetching: false,
          error: action.payload,
        };
      }
    case 'DELETE_ACTIVITY_FULFILLED':
      {
        const newList = state.list.filter((item) => {
          return !(item.id == action.payload.id);
        });
        return {
          ...state,
          fetching: false,
          list: newList,
        };
      }
    case 'CHANGE_EDITOR':
      {
        return {
          ...state,
          keepfrom: { ...state.keepfrom, ...action.payload },
        };
      }
    default:
      return {
        ...state,
      };
  }
}
