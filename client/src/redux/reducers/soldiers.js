const initState = {
      loading: false,
      err: null,
      data: []
    };
    
    const soldiers = (state = initState, action) => {
      switch(action.type) {
        case "FETCH_SOLDIERS_START":
          return {
            ...state,
            loading: true,
            err: null
          };
        case "FETCH_SOLDIERS_SUCCESS":
          return {
            ...state,
            loading: false,
            err: null,
            data: action.data.data
          };
        
        case "FETCH_SOLDIERS_ERROR":
          return {
            ...state,
            loading: false,
            err: action.error
          };
        case "FETCH_SOLDIERS_LIST_SUCCESS":
            return {
              ...state,
              loading: false,
              err: action.error
            };
        default:
          return state;
      }
    }
    
    export default soldiers;
    
    
    
  
  
  