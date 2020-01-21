const initState = {
        loading: false,
        err: null,
        data: []
      };
      
      const soldiersdeletes = (state = initState, action) => {
        switch(action.type) {
          case "DELETE_SOLDIERS_START":
            return {
              ...state,
              loading: true,
              err: null
            };
          case "DELETE_SOLDIERS_SUCCESS":
            return {
              ...state,
              loading: false,
              err: null,
              data: action.data
            };
          
          case "DELETE_SOLDIERS_ERROR":
            return {
              ...state,
              loading: false,
              err: action.error
            }
      
          default:
            return state;
        }
      }
      
      export default soldiersdeletes;
      
    
  
  