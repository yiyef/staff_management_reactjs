const initState = {
    loading: false,
    err: null,
    data: {}
  };
  
  const subordinates = (state = initState, action) => {
    switch(action.type) {
      case "FETCH_DETAILS_START":
        return {
          ...state,
          loading: true,
          err: null
        };
      case "FETCH_DETAILS_SUCCESS":
        console.log('--------in reducer------:'+Object.keys(action.data))
        return {
          ...state,
          loading: false,
          err: null,
          data: action.data,
        
        };
      
      case "FETCH_DETAILS_ERROR":
        return {
          ...state,
          loading: false,
          err: action.error
        }

  case "USER_FETCH_SUPERIOR_VIEW":
    return {
        ...state,
        superData: action.data,
        isLoad: false,
        err: null
    }


case "USER_FETCH_SUBORDINATE_VIEW":
    return {
        ...state,
        subData: action.data,
        isLoad: false,
        err: null
    }
    case  "USER_SUPERIOR_FETCH_SUCCESS":
      console.log('---------------in reducer superior:'+Object.keys(action.data))
      return {
          ...state,
          data: action.data,
          isLoad: false,
          err: null
      }
    
      default:
        return state;
    }
  }
  
  export default details;
  
  
  