const initState = {
        loading: false,
        err: null,
        data: []
      };
      
      const soldierscreate = (state = initState, action) => {
        switch(action.type) {
          case "CREATE_SOLDIERS_START":
            return {
              ...state,
              loading: true,
              err: null
            };
          case "CREATE_SOLDIERS_SUCCESS":
            return {
              ...state,
              loading: false,
              err: null,
              data: action.data
            };
          
          case "CREATE_SOLDIERS_ERROR":
            return {
              ...state,
              loading: false,
              err: action.error
            }
      
          default:
            return state;
        }
      }
      
      export default soldierscreate;
    
    
  
  