import React from "react";
import { connect } from "react-redux";
import { getSoldiers, deleteSoldiers, createSoldiers,getSuperiorView,getSubordinateView,showSubs,resetProps} from "../../redux/action-creators";
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Button from '@material-ui/core/Button';
import * as actions from '../../redux/action-creators'
import '../../App.css'
import axios from 'axios'
import ImageUploader from 'react-images-upload';
import fetch from 'isomorphic-fetch'
import Infinitescroll from "./infinitescroll.js";
import InfiniteScroll from 'react-infinite-scroll-component';
import ReactUploadFile from 'react-upload-file';
import { textAlign } from "@material-ui/system";

class Soldiers extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
            data: [],
            updateId:'',
            up:false,
            filtered:[],
            currentpage:1,
            lastpage:1,
            errors: {},
            pictures: [],
            searchItem:'',
            count:6,
            start:0,
            files: [],
            soldiers:[],
            key:'createdAt',
            order:-1,
            superiorList:[],
            hasMore:true,
            endMessage:"",
            myReset:false
         }
        };

  myCallBack(data){
    this.setState({soldiers:data})
    console.log('hollo 44444')
  }
  componentDidMount() {
    var {start,count,searchItem} = this.state
    if(this.props.location.state){
      if(this.props.location.state.searchItem){
        this.setState({searchItem:this.props.location.state.searchItem})
        searchItem=this.props.location.state.searchItem
      }
      if(this.props.location.state.count){
        this.setState({count:this.props.location.state.count})
        count=this.props.location.state.count
      }
      if(this.props.location.state.start){
        this.setState({start:this.props.location.state.start})
        start=this.props.location.state.start
      }
      let paramObj = {'start':start,'count':count,'searchItem':searchItem}
      console.log('-------!!!!!!!!!!!!!!in componentDidMount paramObj from other page:'+Object.entries(paramObj))
      this.props.getSoldiers(searchItem,paramObj,(data)=>{
          this.setState({soldiers:data})
          var elmnt = document.getElementById("test123");
          setTimeout(()=>{elmnt.scrollIntoView(false)},100);
      });
    }else{
    let paramObj = {'start':start,'count':count,'searchItem':searchItem}
    console.log('-------!!!!!!!!!!!!!!in componentDidMount paramObj:'+Object.entries(paramObj))
    this.props.getSoldiers(searchItem,paramObj,this.myCallBack.bind(this));

    console.log('hollo world11111')
  }
 }

  compareByUp(key) {
    return function (a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
  }

  sortByUp(key) {
    const{soldiers} = this.state;
    let paramObj = {'key':key,'order':-1,'start':0,'count':(this.state.start+this.state.count)}
    this.setState({'key':key,'order':-1})
    this.props.getSoldiers(this.state.searchItem,paramObj,(data)=>{
      this.setState({soldiers:data})
      this.setState({up:true})
    })
  }

  compareByDown(key) {
    return function (a, b) {
      if (a[key] < b[key]) return 1;
      if (a[key] > b[key]) return -1;
      return 0;
    };
  }
  
  sortByDown(key) {
    const{soldiers} = this.state;
    let paramObj = {'key':key,'order':1,'start':0,'count':(this.state.start+this.state.count)}
    this.setState({'key':key,'order':1})
    this.props.getSoldiers(this.state.searchItem,paramObj,(data)=>{
      this.setState({soldiers:data})
      this.setState({up:false})
    })
  }

  rank(key){
      this.state.up?(this.sortByDown(key)):(this.sortByUp(key));
  }

  handleSearchItem = (e) => {
    let searchVal = e.target.value.toLowerCase();
    this.setState({searchItem :searchVal})
    let paramObj = {'key':this.state.key,'order':this.state.order,'start':0,'count':(this.state.start+this.state.count)}
    console.log('-----  handleSearchItem ------searchVal:'+searchVal)
    this.props.getSoldiers(searchVal,paramObj,(data)=>{
      this.setState({soldiers:data})
    });
    // this.props.setState({"globalItem":searchVal})
  }

  updateSoldier = (id,start,count) => {
//      this.props.history.push("/edit/"+id+"/"+this.state.start+"/"+this.state.count+"/"+this.state.searchItem);
        var data = {
          start:this.state.start,
          count:this.state.count,
          searchItem:this.state.searchItem,
          key:this.state.key,
          order:this.state.order
        };
        var path = {
          pathname:'/edit/'+id,
          state:data,
        }
        this.props.history.push(path)

  }

  deleteSoldier = (id) => {
     const {history} = this.props
     let paramObj = {'start':0,'count':(this.state.start+this.state.count),'key':this.state.key,order:this.state.order}
     this.props.deleteSoldiers(id,history,this.state.searchItem,paramObj,(data)=>{
        this.setState({soldiers:data})
    });
  }

  handleCreateSoldiers = () => {
    this.props.history.push(`/create/create`);
  }

  handleReset = () => {
      this.props.resetProps()
      let paramObj = {'start':0,'count':6}
      this.setState({soldiers:[]})
      this.props.getSoldiers('',paramObj,(data)=>{
        console.log('paramObj:'+Object.entries(paramObj)+' entries:'+
          Object.entries(data.data)+'  data length:'+Object.keys(data).length +" soldiers.length:"+Object.keys(this.state.soldiers).length)
        this.setState({
                      data: [],
                      updateId:'',
                      up:false,
                      filtered:[],
                      currentpage:1,
                      lastpage:1,
                      errors: {},
                      pictures: [],
                      searchItem:'',
                      count:6,
                      start:0,
                      files: [],
                      soldiers:data,
                      key:'createdAt',
                      order:-1,
                      superiorList:[],
                      hasMore:true,
                      endMessage:"",
                      myReset:true
                   })
        console.log('reset done..............')
        console.log('paramObj:'+Object.entries(paramObj)+' entries:'+
          Object.entries(data.data)+'  data length:'+Object.keys(data).length +" soldiers.length:"+Object.keys(this.state.soldiers).length)
      });
  }
  
  showSubs(id){
    const{dispatch} = this.props;
    dispatch(actions.showSubs(id,()=>{this.props.history.push("/list/"+id)}));
  }



  fetchData = () => {
    console.log('in fetch data----1111111111111111111111111111111111111111111111')
    var { count, start,searchItem} = this.state;
    start = start+count;
    this.setState({ 'start': start });
    let paramObj = {'start':start,'count':count,key:this.state.key,order:this.state.order}

    console.log('++++++++fetchData paramObj:'+Object.entries(paramObj)+'--searchItem:'+searchItem)
    setTimeout(() =>{this.props.getSoldiers(searchItem,paramObj,(data)=>{
      if(data.data.length===0){
        this.setState({hasMore:false});
        console.log('----------hasMore=false,data.data.length:'+data.data.length)
      }else{
        let tmp = this.state.soldiers
        tmp.data=tmp.data.concat(data.data)
        this.setState({soldiers:tmp})}
      }
    )},300);

}

  handleClickSuperiorView = (superName,e) => {
    e.preventDefault()
    this.props.getSuperiorView(superName);
  }

  handleClickSubordinateView = (name,e) => {
      e.preventDefault()
      this.props.resetProps();
      this.props.getSubordinateView(name);
  }


  render() {
    const options = {
      baseUrl: 'http://localhost:8080/upload',
      query: {
        warrior: 'fight'
      }
    }
    const { soldiers } = this.state;
    const {details} = this.props;
    
    if(details&&details.superData){
    }
    if(details&&details.subData){
    }

    let lengthScroll=0;
    if(soldiers.data){
      lengthScroll = soldiers.data.length
    }

    let sub =  <div style={{textAlign:"center",align:"center", alignContent:"center"}}>
            <div style={{textAlign:"center",fontSize:25,fontFamily:"NewYorkTimes"}}>US Army Personnel Registry </div>
            <div align="left" style={{float:"left"}}>
               Search <input type="text" value = {this.state.searchItem} onChange={(e) => this.handleSearchItem(e)} placeholder="Search..." /> 
            </div>
                <Button aligh="right" style={{float:"right",marginRight:"20px"}}  variant="contained" onClick={this.handleReset}>Reset</Button>
                <Button aligh="right" style={{float:"right"}}  variant="contained" onClick={this.handleCreateSoldiers}>Create</Button>
                <table id="customers1" style={{width:"99%",textAlign:"center",marginLeft:"2px",marginRight:"2px"}}>
                    <th style={{width:"100px"}}>Avata</th>
                    <th style={{width:"50px"}}><TableSortLabel direction ={this.state.up?'desc':'asc'} onClick={()=>this.rank('name')} >Name</TableSortLabel></th>
                    <th style={{width:"50px",paddingRight:"30px"}}><TableSortLabel direction ={this.state.up?'desc':'asc'} onClick={() => this.rank('sex')} >Sex</TableSortLabel></th>
                    <th style={{width:"80px"}}><TableSortLabel direction ={this.state.up?'desc':'asc'} onClick={() => this.rank('rank')}>Rank</TableSortLabel></th>
                    <th style={{width:"100px"}}><TableSortLabel direction ={this.state.up?'desc':'asc'} onClick={() => this.rank('startdate')}>Start Date</TableSortLabel></th>
                    <th style={{width:"100px"}}><TableSortLabel direction ={this.state.up?'desc':'asc'} onClick={() => this.rank('phone')} >Phone</TableSortLabel></th>
                    <th style={{width:"100px"}}><TableSortLabel direction ={this.state.up?'desc':'asc'} onClick={() => this.rank('email')} >Email</TableSortLabel></th>
                    <th style={{width:"100px"}}><TableSortLabel direction ={this.state.up?'desc':'asc'} onClick={() => this.rank('superior')} >Superior</TableSortLabel></th>
                    <th style={{width:"100px"}}><TableSortLabel direction ={this.state.up?'desc':'asc'} onClick={() => this.rank('firstname')} ># of D.S</TableSortLabel></th>
                    <th style={{width:"100px"}}>DELETE</th>
                    <th style={{width:"100px"}}>EDIT</th>
                 </table>
                 {/* <div id="scrollableDiv" style={{ height: 400, overflow: "auto" }}> */}

                 <InfiniteScroll
                      dataLength={lengthScroll}
                      next={this.fetchData}
                      hasMore={this.state.hasMore}
                      height={400}
                      // scrollThreshold={0.99}
                      // scrollableTarget="scrollableDiv"
                      loader={"Loading..."}
                    >     
                    <div id={"test123"}>
                    <table id="customers" style={{width:"99%", marginLeft:"2px"}}>
                        {soldiers.data&& soldiers.data
                                .map((record, index) => {
                                  if(!record.superName){
                                    // console.log('------SUPERNAME-UNDIFINED')
                                  }
                                  // console.log('---theUploadFileName:'+record.fileName+'---record.superName:'+record.superName)
                                  let myAvatar = <img height="42" width="42" src={'http://localhost:3000/public/'+record.fileName+'.jpg'}/>
                                  if(!record.fileName||record.fileName.length==0){
                                    myAvatar = <img height="42" width="42" src={'http://localhost:3000/public/default.jpg'}/>
                                  }
                                  
                                  return (
                                          <tr><td style={{width:"100px"}}>{myAvatar}</td>
                                          <td style={{width:"50px"}}>{record.name}</td>
                                          <td style={{width:"50px"}}>{record.sex}</td>
                                          <td style={{width:"100px"}}>{record.rank}</td>
                                          <td style={{width:"100px"}}>{record.startdate.substring(4,15)}</td>
                                          <td style={{width:"100px"}}><a style={{lineHeight: "30px",textDecoration: 'none'}} href={"tel:"+record.phone}>{record.phone}</a></td>
                                          <td style={{width:"100px"}}><a style={{lineHeight: "50px",paddingTop: "20px",textDecoration: 'none'}} href={"mailto:"+record.email}>{record.email}</a></td>
                                          <td style={{width:"100px"}}><a  style={{ textDecoration: 'none' }} href="" onClick={this.handleClickSuperiorView.bind(this,record.superName)}>{record.superName==="NONE"?"":record.superName}</a></td>
                                          <td style={{width:"100px"}}><a style={{ textDecoration: 'none' }} href="" onClick={this.handleClickSubordinateView.bind(this,record.name)}>{record.subCount===0?"":record.subCount}</a></td>
                                          <td style={{width:"100px"}}><Button variant="contained" onClick={this.deleteSoldier.bind(this,record._id)}>Delete</Button></td>
                                          <td style={{width:"100px"}}><Button variant="contained" onClick={this.updateSoldier.bind(this,record._id)}>Edit</Button></td>
                                          </tr>
                                          );
                            })}
                      </table>
                      </div>
                    </InfiniteScroll>
                  {/* </div> */}
                    {/* {this.state.endMessage} */}
              </div>
let superior =  <div style={{textAlign:"center",align:"center", alignContent:"center"}} >  <div style={{textAlign:"center",fontSize:25,fontFamily:"NewYorkTimes"}}>US Army Personnel Registry </div>
        <div align="left" style={{float:"left"}}>
           Search <input type="text" value = {this.state.searchItem} onChange={(e) => this.handleSearchItem(e)} placeholder="Search..." /> 
        </div>
            <Button aligh="right" style={{float:"right"}}  variant="contained" onClick={this.handleReset}>Reset</Button>
            <Button aligh="right" style={{float:"right"}}  variant="contained" onClick={this.handleCreateSoldiers}>Create</Button>
            <table id="customers1" style={{width:"99%",textAlign:"center",marginLeft:"2px",marginRight:"2px"}}>
                <th style={{width:"100px"}}>Avata</th>
                <th style={{width:"50px"}}><TableSortLabel direction ={this.state.up?'desc':'asc'} onClick={()=>this.rank('name')} >Name</TableSortLabel></th>
                <th style={{width:"50px",paddingRight:"30px"}}><TableSortLabel direction ={this.state.up?'desc':'asc'} onClick={() => this.rank('sex')} >Sex</TableSortLabel></th>
                <th style={{width:"100px"}}><TableSortLabel direction ={this.state.up?'desc':'asc'} onClick={() => this.rank('rank')}>Rank</TableSortLabel></th>
                <th style={{width:"100px"}}><TableSortLabel direction ={this.state.up?'desc':'asc'} onClick={() => this.rank('startdate')}>Start Date</TableSortLabel></th>
                <th style={{width:"100px"}}><TableSortLabel direction ={this.state.up?'desc':'asc'} onClick={() => this.rank('phone')} >Phone</TableSortLabel></th>
                <th style={{width:"100px"}}><TableSortLabel direction ={this.state.up?'desc':'asc'} onClick={() => this.rank('email')} >Email</TableSortLabel></th>
                <th style={{width:"100px"}}><TableSortLabel direction ={this.state.up?'desc':'asc'} onClick={() => this.rank('superior')} >Superior</TableSortLabel></th>
                <th style={{width:"100px"}}><TableSortLabel direction ={this.state.up?'desc':'asc'} onClick={() => this.rank('firstname')} ># of D.S</TableSortLabel></th>
                <th style={{width:"100px"}}>DELETE</th>
                <th style={{width:"100px"}}>EDIT</th>
             </table>  
          
            <table id="customers" style={{width:"99%", marginLeft:"2px"}}>
                  {details&&details.superData&&details.superData
                            .map((record, index) => {
                              // console.log('---theUploadFileName:'+record.fileName)
                              let myAvatar = <img height="42" width="42" src={'http://localhost:3000/public/'+record.fileName+'.jpg'}/>
                              if(!record.fileName||record.fileName.length==0){
                                myAvatar = <img height="42" width="42" src={'http://localhost:3000/public/default.jpg'}/>
                              }
                              
                              return (
                                      <tr><td style={{width:"100px"}}>{myAvatar}</td>
                                      <td style={{width:"50px"}}>{record.name}</td>
                                      <td style={{width:"50px"}}>{record.sex}</td>
                                      <td style={{width:"100px"}}>{record.rank}</td>
                                      <td style={{width:"100px"}}>{record.startdate.substring(4,15)}</td>
                                      <td style={{width:"100px"}}><a style={{lineHeight: "30px",textDecoration: 'none' }} href={"tel:"+record.phone}>{record.phone}</a></td>
                                      <td style={{width:"100px"}}><a style={{lineHeight: "50px",paddingTop: "20px",textDecoration: 'none' }} href={"mailto:"+record.email}>{record.email}</a></td>
                                      <td style={{width:"100px"}}><a style={{ textDecoration: 'none' }} href="" onClick={this.handleClickSuperiorView.bind(this,record.superName)}>{record.superName==="NONE"?"":record.superName}</a></td>
                                      <td style={{width:"100px"}}><a style={{ textDecoration: 'none' }} href="" onClick={this.handleClickSubordinateView.bind(this,record.name)}>{record.subCount===0?"":record.subCount}</a></td>
                                      <td style={{width:"100px"}}><Button variant="contained" onClick={this.deleteSoldier.bind(this,record._id)}>Delete</Button></td>
                                      <td style={{width:"100px"}}><Button variant="contained" onClick={this.updateSoldier.bind(this,record._id)}>Edit</Button></td></tr>
                                );
                        })}
                </table>
              
              </div>
    let subordinate = <div style={{textAlign:"center",align:"center", alignContent:"center"}}><div style={{textAlign:"center",fontSize:25,fontFamily:"NewYorkTimes"}}>US Army Personnel Registry </div>
            <div align="left" style={{float:"left"}}>
               Search <input type="text" value = {this.state.searchItem} onChange={(e) => this.handleSearchItem(e)} placeholder="Search..." /> 
            </div>
                <Button aligh="right" style={{float:"right"}}  variant="contained" onClick={this.handleReset}>Reset</Button>
                <Button aligh="right" style={{float:"right"}}  variant="contained" onClick={this.handleCreateSoldiers}>Create</Button>
                <table id="customers1" style={{width:"99%",textAlign:"center",marginLeft:"2px",marginRight:"2px"}}>
                    <th style={{width:"100px"}}>Avata</th>
                    <th style={{width:"50px"}}><TableSortLabel direction ={this.state.up?'desc':'asc'} onClick={()=>this.rank('name')} >Name</TableSortLabel></th>
                    <th style={{width:"50px",paddingRight:"30px"}}><TableSortLabel direction ={this.state.up?'desc':'asc'} onClick={() => this.rank('sex')} >Sex</TableSortLabel></th>
                    <th style={{width:"100px"}}><TableSortLabel direction ={this.state.up?'desc':'asc'} onClick={() => this.rank('rank')}>Rank</TableSortLabel></th>
                    <th style={{width:"100px"}}><TableSortLabel direction ={this.state.up?'desc':'asc'} onClick={() => this.rank('startdate')}>Start Date</TableSortLabel></th>
                    <th style={{width:"100px"}}><TableSortLabel direction ={this.state.up?'desc':'asc'} onClick={() => this.rank('phone')} >Phone</TableSortLabel></th>
                    <th style={{width:"100px"}}><TableSortLabel direction ={this.state.up?'desc':'asc'} onClick={() => this.rank('email')} >Email</TableSortLabel></th>
                    <th style={{width:"100px"}}><TableSortLabel direction ={this.state.up?'desc':'asc'} onClick={() => this.rank('superior')} >Superior</TableSortLabel></th>
                    <th style={{width:"100px"}}><TableSortLabel direction ={this.state.up?'desc':'asc'} onClick={() => this.rank('firstname')} ># of D.S</TableSortLabel></th>
                    <th style={{width:"100px"}}>DELETE</th>
                    <th style={{width:"100px"}}>EDIT</th>
                 </table>  
               
                <table id="customers" style={{width:"99%", marginLeft:"2px"}}>
                      {details&&details.subData&&details.subData
                                .map((record, index) => {
                                  console.log('---theUploadFileName:'+record.fileName)
                                  let myAvatar = <img height="42" width="42" src={'http://localhost:3000/public/'+record.fileName+'.jpg'}/>
                                  if(!record.fileName||record.fileName.length==0){
                                    myAvatar = <img height="42" width="42" src={'http://localhost:3000/public/default.jpg'}/>
                                  }
                                  
                                  return (
                                          <tr><td style={{width:"100px"}}>{myAvatar}</td>
                                          <td style={{width:"50px"}}>{record.name}</td>
                                          <td style={{width:"50px"}}>{record.sex}</td>
                                          <td style={{width:"100px"}}>{record.rank}</td>
                                          <td style={{width:"100px"}}>{record.startdate.substring(4,15)}</td>
                                          <td style={{width:"100px"}}><a style={{lineHeight: "30px"}} href={"tel:"+record.phone}>{record.phone}</a></td>
                                          <td style={{width:"100px"}}><a style={{lineHeight: "50px",paddingTop: "20px",textDecoration: 'none'}} href={"mailto:"+record.email}>{record.email}</a></td>
                                          <td style={{width:"100px"}}><a style={{ textDecoration: 'none',textDecoration: 'none' }} href="" onClick={this.handleClickSuperiorView.bind(this,record.superName)}>{record.superName==="NONE"?"":record.superName}</a></td>
                                          <td style={{width:"100px"}}><a style={{ textDecoration: 'none' }} href="" onClick={this.handleClickSubordinateView.bind(this,record.name)}>{record.subCount===0?"":record.subCount}</a></td>
                                          <td style={{width:"100px"}}><Button variant="contained" onClick={this.deleteSoldier.bind(this,record._id)}>Delete</Button></td>
                                          <td style={{width:"100px"}}><Button variant="contained" onClick={this.updateSoldier.bind(this,record._id)}>Edit</Button></td></tr>
                                    );
                            })}
                    </table>
                 
                  </div>

    if(details&&details.superData&&Object.keys(details.superData).length>0){

          
          return superior
         
        
    }else if(details&&details.subData&&Object.keys(details.subData).length>0){
          return subordinate
         
         
    }
    else{
          // console.log('return subs!!!')
          return sub
        }
      }
    }

const mapStateToProps = state => {
  return {
    soldiers: state.soldiers,
    delete:state.delete,
    details:state.details
  };
}

const mapDispatchToProps = dispatch => {
  return {
    
    getSoldiers: (searchItem,paramObj,callBack) => { dispatch(getSoldiers(searchItem,paramObj,callBack))},
    deleteSoldiers: (id,history,searchItem,sortObj,callBack) => { dispatch(deleteSoldiers(id,history,searchItem,sortObj,callBack))},
    createSoldiers: (name,sex,rank,startdate,phone,email,superior,noofds,handleCallToSoldiers) => {dispatch(createSoldiers(name,sex,rank,startdate,phone,email,superior,noofds,handleCallToSoldiers))},
    getSuperiorView: (superName) => {
      dispatch(getSuperiorView(superName))
    },
    getSubordinateView: (name) => {dispatch(getSubordinateView(name))},
    resetProps:() =>{dispatch(resetProps())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Soldiers);




