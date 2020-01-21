import axios from "axios";
import { callbackify } from "util";

const fetchSoldiersStart = () => {
  return {
    type: "FETCH_SOLDIERS_START"
  };
}

const fetchSoldiersSuccess = (res) => {
  return {
    type: "FETCH_SOLDIERS_SUCCESS",
    data: res.data
  };
}

const fetchSoldiersError = (err) => {
  console.log('---in action--err:'+err)
  return {
    type: "FETCH_SOLDIERS_ERROR",
    error: err
  };
}

const deleteSoldiersStart = () => {
  return {
    type: "DELETE_SOLDIERS_START"
  };
}

const deleteSoldiersSuccess = (res) => {
  return {
    type: "DELETE_SOLDIERS_SUCCESS",
    data: res.data
  };
}

const deleteSoldiersError = (err) => {
  return {
    type: "DELETE_SOLDIERS_ERROR",
    error: err
  };
}

const fetchDetailsStart = () => {
  return {
    type: "FETCH_DETAILS_START"
  };
}

const fetchDetailsSuccess = (res) => {
  return {
    type: "FETCH_DETAILS_SUCCESS",
    data: res.data,
   
  };
}

const fetchDetailsError = (err) => {
  return {
    type: "FETCH_DETAILS_ERROR",
    error: err
  };
}

const createSoldiersStart = () => {
  return {
    type: "CREATE_SOLDIERS_START"
  };
}

const createSoldiersSuccess = (res) => {
  return {
    type: "CREATE_SOLDIERS_SUCCESS",
    data: res.data
};
}

const createSoldiersError = (err) => {
  return {
    type: "CREATE_SOLDIERS_ERROR",
    error: err
  };
}

const editSoldiersStart = () => {
      return {
        type: "EDIT_SOLDIERS_START"
      };
    }
    
const editSoldiersSuccess = (res) => {
      return {
        type: "EDIT_SOLDIERS_SUCCESS",
        data: res.data
    };
    }
const editSoldiersError = (err) => {
      return {
        type: "EDIT_SOLDIERS_ERROR",
        error: err
      };
    }


const fetchSoldierList = (res) => {
      return {
        type: "FETCH_SOLDIERS_LIST_SUCCESS",
        data: res.data
      };
    }

export const setSuperiorView = (res) => {
    return (
        {
            type: "USER_FETCH_SUPERIOR_VIEW",
            data:res.data
        }
    );
}

export const setSubordinateView = (res) => {
    return (
        {
            type: "USER_FETCH_SUBORDINATE_VIEW",
            data:res.data
        }
    );
}


export const setSuperior = (res) => {
    return (
        {
            type: "USER_SUPERIOR_FETCH_SUCCESS",
            data:res.data
        }
    );
}

// export const getSoldiers = (mycall) => {
//   return (dispatch,getState) => {
//     dispatch(fetchSoldiersStart());
//     
//      axios.get("http://localhost:3000/api/soldiers")
//       .then(res => {
//         dispatch(fetchSoldiersSuccess(res));
//         if(mycall!==undefined){
//           mycall()
//         }
//       })
//       .catch(err => {
//         dispatch(fetchSoldiersError(err));
//       });
//   };
// }

export const deleteSoldiers = (id,history,searchItem,sortObj,callBack) => {
  return (dispatch,getState) => {
    dispatch(deleteSoldiersStart());
     
      axios.delete(`http://localhost:3000/api/soldier/${id}`)
      .then(res => {
        dispatch(deleteSoldiersSuccess(res));
        console.log('-----------------after delete call getSoldiers--------sortObj='+Object.entries(sortObj))
        dispatch(getSoldiers(searchItem,sortObj,callBack))
      })
      .catch(err => {
        dispatch(deleteSoldiersError(err));
      });
  };
}

export const getSoldiers = (item,paramObj,callBack) => {
      if(item=== null||!item){
          item="$"
      }
      if(paramObj){
        console.log('----paramObj:'+Object.entries(paramObj))
      }
      console.log('hollo world2222')
      return (dispatch,getState) => {
         dispatch(fetchSoldiersStart());
         console.log('hollo world5555')
         axios.get(`http://localhost:3000/api/searchContent/${item}`,{params:{...paramObj}}
          )
          .then(res => {
            console.log('hollo world33333')
            dispatch(fetchSoldiersSuccess(res));
            if(callBack){
                callBack(res.data)
            }
          })
          .catch(err => {
            console.log('------error.......')
            dispatch(fetchSoldiersError(err));
          });
      };
    }



export const createSoldiers = (name,sex,rank,startdate,phone,email,superName,noofds,file,history) => {
  return (dispatch,getState) => {
    dispatch(createSoldiersStart());
    var formData = new FormData()
    formData.append('name',name)
    formData.append('sex',sex)
    formData.append('rank',rank)
    formData.append('startdate',startdate)
    formData.append('phone',phone)
    formData.append('email',email)
    formData.append('superName',superName)
    formData.append('noofds',noofds)
    formData.append('myavata',file)
    axios.post('http://localhost:3000/api/soldier', formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
        } ).then(res => {
        dispatch(createSoldiersSuccess(res));

      }).then(()=>{
            history.push('/')}
        )
    .catch(err => {
        dispatch(createSoldiersError(err));
      });
  }
}
export const editSoldiers = (id,name,sex,rank,startdate,phone,email,superName,fileName,file) => {
    return (dispatch,getState) => {
      console.log("----eidt")
      dispatch(editSoldiersStart());
        var formData = new FormData()
        formData.append('name',name)
        formData.append('sex',sex)
        formData.append('rank',rank)
        formData.append('startdate',startdate)
        formData.append('phone',phone)
        formData.append('email',email)
        formData.append('superName',superName)
        // formData.append('noofds',noofds)
        formData.append('fileName',fileName)
        formData.append('myavata',file)
      axios.put(`http://localhost:3000/api/soldier/${id}`, formData, {
            headers: {
            'Content-Type': 'multipart/form-data'
            }
    })
        .then(res => {
          dispatch(editSoldiersSuccess(res));
        }).catch(err => {
          dispatch(editSoldiersError(err));
        });
    };
  }
  
export const getDetails = (id) => {
        return (dispatch,getState) => {
          dispatch(fetchDetailsStart());
           axios.get(`http://localhost:3000/api/soldier/${id}`)
            .then(res => {
              dispatch(fetchDetailsSuccess(res));
            })
           .then()
            .catch(err => {
              dispatch(fetchDetailsError(err));
            });
        };
      }
    

  export const showSubs = (history,id) => {
      return (dispatch,getState) => {
           axios.get(`http://localhost:3000/api/soldiersubs/${id}`)
          .then(res => {
              dispatch(fetchSoldierList(res));
             })
          .then(() =>{
                history.push("/list/"+id);
            })
            
          .catch(err => {
            dispatch(fetchSoldiersError(err));
          });
      };
}


export const getSuperiorView = (superName) => {
    return (dispatch, getState) => {
         dispatch(fetchDetailsStart());
        axios.get(`http://localhost:3000/api/superiorview/${superName}`)
            .then(res => {
                dispatch(setSuperiorView(res.data));
            })
            .catch(err => {
                 dispatch(fetchSoldiersError(err));
            });
    }
}


export const resetProps = () => {
    console.log("-----in reset props")
    return (dispatch, getState) => {
        dispatch(setSuperiorView({}));
        dispatch(setSubordinateView({}));
        dispatch(fetchSoldiersSuccess({}));


    }
}

export const getSubordinateView = (name) => {
    console.log("-----get subordinate")
    return (dispatch, getState) => {
        dispatch(fetchDetailsStart());
        axios.get(`http://localhost:3000/api/subordinateview/${name}`)
            .then(res => {
                dispatch(setSubordinateView(res.data));
            })
            .catch(err => {
                 dispatch(fetchSoldiersError(err));
            });
    }
}

export const getSuperiorData = () => {
    console.log("Start to fetch all superior data...Loading flag dispatched");
    return (dispatch, getState) => {
        dispatch(fetchDetailsStart());
        console.log("-------fetchdata")
        axios.get("http://localhost:3000/api/armyuser-all-superior")
            .then(res => {
                // console.log("---------res.data"+res.data)
                dispatch(setSuperior(res.data));
            })
            .catch(err => {
                console.log("-------error"+err)
                dispatch(fetchSoldiersError(err));
            });
    }
}
