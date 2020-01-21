import React from "react";
import {connect} from 'react-redux'
import {editSoldiers,getDetails, getSoldiers,getSuperiorData} from "../../redux/action-creators";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function previewFile() {
    // Where you will display your image
    var preview = document.querySelector('img');
    console.log('##############preview:'+preview)
    // The button where the user chooses the local image to display
    var file = document.querySelector('input[type=file]').files[0];
    console.log('##############file:'+file)
    // FileReader instance
    var reader  = new FileReader();
    reader.onloadend = function () {
      preview.src = reader.result;
    }
    if (file) {
      // Load image as a base64 encoded URI
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
    }
  }


class SoldiersEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            sex: '',
            rank: '',
            startdate:'',
            phone:'',
            email:'',
            superName:'',
            noofds:'',
            start:0,
            count:0,
            searchItem:'',
            fileName:'',
        }
    }

        componentWillReceiveProps(nextProps) {
            
          if(nextProps.details.data.data!==undefined){
            let {name,sex,rank,startdate,phone,email,superName,fileName}=nextProps.details.data.data;
            this.setState({name:name,sex:sex,rank:rank,startdate:startdate,phone:phone,email:email,
                    superName:superName,fileName:fileName,superior:superName});

            var myMap={}
            let paramObj = {'start':0,'count':100}
            this.props.getSoldiers("",paramObj,(data)=>{
                data.data.map((obj,index)=>{
                    let superName=obj['superName']
                    let subName = obj['name']
                    if(superName===name){
                        myMap[subName]='t'
                    }
                })
                this.setState({'myMap':myMap})
                console.log('!!!!!!!--myMap:'+Object.entries(myMap))
            });
          }

 
        }
    
        componentDidMount() {
            let id = this.props.match.params.soldierId;
            // var pageData = this.props.location.state;
            // var {start,count,searchItem} = pageData;
            // this.setState({'start':start,'count':count,'searchItem':searchItem})
            this.props.getDetails(id);
            this.props.getSuperiorData();

            // this.props.getSubs(id);
            // this.props.getSoldiers();
        }
        handleChangeInputName =  event => {
            this.setState({name:event.target.value })
        }
        handleChangeInputSex =  event => {
            const sex = event.target.value
            this.setState({ sex:sex })
        }
        handleChangeInputRank = event => {
            const rank = event.target.value
            this.setState({ rank:rank})
         }
        handleChangeInputStartDate =  event => {
            const startdate = event.target.value
            this.setState({ startdate:startdate })
        }
        handleChangeInputPhone =  event => {
            const phone = event.target.value
            this.setState({ phone:phone })
        }
        
        handleChangeInputEmail =  event => {
            const email= event.target.value
            this.setState({ email:email})
        }

        handleSuperiorChange = e => {
        console.log('-+++++handleSuperiorChange e.target.value:'+e.target.value)
        let superValue=e.target.value===undefined?"NONE":e.target.value
        console.log('-+++++handleSuperiorChange superValue:'+superValue)
        this.setState({
            ...this.state,
            superior: e.target.value===undefined?"NONE":e.target.value
        });
    }
    
    mycall=()=>{
      this.props.history.push('../');
    }

    handleEditSoldier =(event) => {
         event.preventDefault()
         let { name,sex,rank,startdate,phone,email,superior,fileName,myavata } = this.state
         let superiorValue = superior===undefined?'NONE':superior
             
            if(this.refs.myavata.files[0]){
                myavata = this.refs.myavata.files[0]
                fileName='stored'
            }else{
                console.log('------------in else..........')
            }
            console.log('------------fileName..........:'+fileName+'  ----myavata:'+myavata)
        console.log("------in edit my avata:"+this.refs.myavata.files[0])
        console.log("------in edit submit:"+superiorValue)
         this.props.editSoldiers(this.props.match.params.soldierId,name,sex,
                rank,startdate,phone,email,superiorValue,fileName,myavata);
        this.props.getSoldiers({},{},this.editCallBack);
    }
    

    editCallBack=()=>{
        const {history} = this.props
        let searchItem = undefined
        let start=0
        let count=0
        if(this.props.location.state){
            searchItem = this.props.location.state.searchItem;
            start = this.props.location.state.start;
            console.log('+++++------this.props.location.state.start:'+this.props.location.state.start)
            count = this.props.location.state.count;
        }

        var data = {
            'start':0,
            'count':(start+count),
            'searchItem':searchItem
        }
        let pathValue='/'
        // if(searchItem){
        //     pathValue='/'+searchItem
        // }
        console.log('-------%%%%%--------in edit data:'+Object.entries(data))
        var path = {
            pathname: pathValue,
            state:data,
        }
        history.push(path)
        // window.location.href="http://localhost:8000/"

    }

   
    handleChange = date => {
        if (date) {
            this.setState({
                ...this.state,
                start_date: date,
                dateErrorFlag: false
            });
        } else {
            this.setState({
                ...this.state,
                start_date: date,
                dateErrorFlag: true
            })
        }
    }

    handleback = (d) =>{
        this.props.history.push('../')
    }

    handleStartDateChange = date => {
        if (date) {
            this.setState({
                ...this.state,
                startdate: date,
                dateErrorFlag: false
            });
        } else {
            this.setState({
                ...this.state,
                startdate: date,
                dateErrorFlag: true
            })
        }
    }

   render() {
            const {name,sex,rank,startdate,phone,email,superName,fileName,myMap}=this.state;
            if(myMap){
                console.log('--------in edit superName:'+superName+' !!!Object.entries(myMap):'+Object.entries(myMap))
            }
          
            let newDate = new Date(startdate);
            if(startdate){
            }
            const {details} = this.props;
            let superNameArr=[]
       
            console.log("----length:"+details.data.length)
            let i=0;
            for(i=0;i<details.data.length;i++){
                console.log((details.data[i].name))
                superNameArr.push(details.data[i].name)
                console.log(superNameArr)
            }


            return (   
                <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <form>
                        Name: <br/>
                             <input onChange={this.handleChangeInputName} value={name}/>{<div style={{ fontSize: 12, color: "red" }} >{!name&&"Name should not be blank"}</div>}
                        Sex:<br/>
                            <select style={{width: '130px'}} value={this.state.sex}onChange={this.handleChangeInputSex}><option value="M">M</option><option value="F">F</option></select>
                        <br/>
                        Rank: <br/>
                            <select style={{width: '130px'}}  value ={this.state.rank} onChange={this.handleChangeInputRank}><option >Please select</option>
                            <option value="General">General</option><option value="Colonel">Colonel</option><option value="Major">Major</option><option value="Captain">Captain</option>
                            <option value="Lieutenant">Lieutenant</option><option value="Warrant Officer">Warrant Officer</option><option value="Sergeant">Sergeant</option>
                            <option value="Corporal">Corporal</option><option value="Specialist">Specialist</option><option value="Private">Private</option>
                        </select>
                        <br/>
                        Startdate: <br/>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    value={startdate}
                                    onChange={this.handleStartDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                        />
                    </MuiPickersUtilsProvider>
                        <br/>
                        Phone: <br/>
                            <input onChange={this.handleChangeInputPhone} value={phone}/>
                        <br/>
                        Email: <br/>
                            <input onChange={this.handleChangeInputEmail} value={email}/>
                        <br/>
                        Superior: <br/>
                            <select onChange={this.handleSuperiorChange} >
                                <option key="0" value="NONE">None</option>
                                        {
                                        superNameArr.filter((ele,index)=>myMap===undefined||myMap[ele]===undefined).filter((ele,index)=>ele!==name).map((ele, index) => {
                                            if(ele===superName)
                                                return <option key={index} value={[ele]} selected>{ele}</option>
                                            else 
                                                return <option key={index} value={[ele]} >{ele}</option>
                                            
                                        })}
                                    </select>
                        <br/>
                        My Avatar:<br />
                            <input type="file" ref="myavata" placeholder="input profile image" onChange={previewFile} />
                            <br />
                            {fileName?<img src={'http://localhost:3000/public/'+fileName+'.jpg'} height="200" alt="Image preview..." />:
                            <img src="http://localhost:3000/public/default.jpg" height="200" alt="Image preview..." />
                             }
                            <br/>
                                <button disabled={name === ''|| !name} onClick={this.handleEditSoldier}>Submit</button>
                    </form>
                </div>
    
            )
        }
    
    }

const mapStateToProps = state => {
  return {
    details: state.details

  };
}
  
const mapDispatchToProps = dispatch => {
  return {
    editSoldiers: (id,name,sex,rank,startdate,phone,email,superior,fileName,file) => { 
      dispatch(editSoldiers(id,name,sex,rank,startdate,phone,email,superior,fileName,file))
    },
    getSoldiers: (searchItem,sortObj,callBack) => { dispatch(getSoldiers(searchItem,sortObj,callBack))},
    getDetails:(id) => {dispatch(getDetails(id))},
   getSuperiorData: () => dispatch(getSuperiorData()), 
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(SoldiersEdit)



