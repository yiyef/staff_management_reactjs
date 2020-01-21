const initState = {
            loading: false,
            err: null,
            data: []
          };
          
          const soldiersedit= (state = initState, action) => {
            switch(action.type) {
              case "EDIT_SOLDIERS_START":
                return {
                  ...state,
                  loading: true,
                  err: null
                };
              case "EDIT_SOLDIERS_SUCCESS":
                return {
                  ...state,
                  loading: false,
                  err: null,
                  data: action.data
                };
              
              case "EDIT_SOLDIERS_ERROR":
                return {
                  ...state,
                  loading: false,
                  err: action.error
                }
          
              default:
                return state;
            }
          }
          
          export default soldiersedit;
        
        
    
    