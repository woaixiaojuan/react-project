export default function reducer(state = {
  fetching: false,
  fetched: false,
  openBoxdata: null,
  getResultData: null,
  error: null,
  okBox: false,
  noBox: false,
  okActive: false,
  boxArr: [],
  times: 0,
  rewardImg: null,
  rewardName: null,
  rewardsId: null,
  serialId: null,
}, action) {
  switch (action.type) {
    case 'BACK_APP' :
      {
        return {
          ...state,
          okBox: false,
          noBox: false,
          okActive: false,
        };
      }
    case 'START_ACTIVE':
      {
        return {
          ...state,
          okActive: true,
        };
      }
    case 'OPEN_FORM_OK_FULFILLED':
      {
        return {
          ...state,
          okBox: true,
        };
      }
    case 'OPEN_FORM_NO_FULFILLED':
      {
        return {
          ...state,
          noBox: true,
        };
      }
    case 'FETCH_TIMES_DATA_FULFILLED':
      {
        return {
          ...state,
          fetching: false,
          fetched: true,
          times: action.payload,
        };
      }
    case 'CREATE_BOX_FULFILLED':
      {
        const arr = [...Array(9).keys()];// [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const boxArr = arr.map(() => {
          const obj = {
            mark: 1,
            imgUrl: ENV.boxImgUrl,
            clickAble: true,
          };
          return obj;
        });
        return { ...state,
          fetched: true,
          boxArr,
        };
      }


    // 获取活动的所有数据
    case 'GET_ALL_DATA_PENDING':
      {
        return {
          ...state,
          fetching: true,
        };
      }
    case 'GET_ALL_DATA_REJECTED':
      {
        return {
          ...state,
          fetching: false,
          error: action.payload,
        };
      }
    case 'FETCH_TIMES_DATA_REJECTED':
      {
        return {
          ...state,
          fetching: false,
          error: action.payload,
        };
      }
    case 'GET_ALL_DATA_FULFILLED':
      {
        return {
          ...state,
          fetching: false,
          fetched: true,
          openBoxdata: action.payload,
        };
      }
      // 点击抽奖
    case 'GET_DRAW_RESULT_PENDING':
      {
        const index = action.payload;
        const newBoxArr = state.boxArr.map((ele, i) => {
          ele.clickAble = false;
          if (i === index) {
            ele.mark = 2;
          }
          return ele;
        });
        return {
          ...state,
          boxArr: newBoxArr,
        };
      }


    case 'GET_DRAW_RESULT_REJECTED':
      {
        const newBoxArr = state.boxArr.map((ele, i) => {
          ele.mark = 1;
          // ele.clickAble = false;
          return ele;
        });
        return { ...state,
          fetching: false,
          boxArr: newBoxArr,
          error: action.payload,
        };
      }
    case 'GET_DRAW_RESULT_OK_FULFILLED':
      {
        const { payload, index } = action.payload;
        const { rewardsId, serialId } = payload;
        let newBoxArr = [];
        if (payload && payload.rewardsId !== '-1') {
          newBoxArr = state.boxArr.map((ele, i) => {
            if (i === index) {
              ele.mark = 3;
              ele.imgUrl = ENV.fullBoxUrl;
            }
            return ele;
          });
        }

        const rewardItem = state.openBoxdata.rewards.filter((ele) => {
          return rewardsId === ele.rewardId;
        })[0];

        return {
          ...state,
          fetching: false,
          getResultData: payload,
          boxArr: newBoxArr,
          rewardImg: rewardItem.rewardImg,
          rewardName: rewardItem.rewardName,
          rewardsId,
          serialId,
        };
      }
    case 'GET_DRAW_RESULT_NO_FULFILLED':
      {
        const { payload, index } = action.payload;
        const newBoxArr = state.boxArr.map((ele, i) => {
          if (i === index) {
            ele.mark = 4;
            ele.imgUrl = ENV.fullBoxUrl;
          }
          return ele;
        });
        return {
          ...state,
          fetching: false,
          getResultData: payload,
          boxArr: newBoxArr,
        };
      }
    default:
      return {
        ...state,
      };
  }
}
