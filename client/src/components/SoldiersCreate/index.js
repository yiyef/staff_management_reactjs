import React from "react";
import {connect} from 'react-redux'
import { getSoldiers, deleteSoldiers,createSoldiers,getSuperiorData } from "../../redux/action-creators";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from "moment";
import axios from 'axios'


function previewFile() {
    // Where you will display your image
    var preview = document.querySelector('img');
    // The button where the user chooses the local image to display
    var file = document.querySelector('input[type=file]').files[0];
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


class SoldiersCreate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
                    name: '',
                    sex: '',
                    rank: '',
                    startdate:new Date,
                    phone:'',
                    email:'',
                    superior:'',
                    noofds:'',
                    data: [],
        }
    }    
        componentDidMount() {
            this.props.getSuperiorData();
            this.props.getSoldiers();
        }

         handleChangeInputName =  event => {
            this.setState({name:event.target.value })
            console.log(this.state.name)
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
        handleChange = date => {
            console.log('-----handleChange---typeof date:'+typeof date)
            console.log('-----:'+date.toISOString())
            this.setState({
                startdate:  date
            });
        };

        handleChangeInputPhone =  event => {
            const phone = event.target.value
            this.setState({ phone:phone })
        }
        
        handleChangeInputEmail =  event => {
            const email= event.target.value
            this.setState({ email:email})
        }

        handleChangeInputSuperior =  event => {
                const superior= event.target.value
                this.setState({ superior:superior})
            }
    

        handleIncludeSoldier = (e) => {
            const {history} = this.props
            e.preventDefault()
            const { name,sex,rank,startdate,phone,email,superior,noofds } = this.state
            let myavata=undefined
            if(this.refs.myavata.files[0]){
                myavata = this.refs.myavata.files[0]
            }
            console.log('----------typeof myavata:'+typeof(myavata))
            this.props.createSoldiers(name,sex,rank,startdate,phone,email,superior,noofds,myavata,history);
            
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
        handleSuperiorChange = e => {
            this.setState({
                ...this.state,
                superior: e.target.value
            });
        }
        handleback = (d) =>{ 
            this.props.history.push('./')
        }

        handleCallToSoldiers = () =>{
            this.props.history.push('/')
        }

    render() {
        const {name,sex,rank,startdate,phone,email,superior,noofds}=this.state;
        // let soldiers = this.props.state.soldiers;
        // let optionItems = soldiers.map((name) =>
        //         <option key={soldiers.name}>{soldiers.name}</option>
        //     );
        // console.log("DATANAME:"+soldiers.data.map(name))
        const {details} = this.props;
        console.log("----length:"+details)
        let superNameArr=[]
       
            console.log("----length:"+details.data.length)
            let i=0;
            for(i=0;i<details.data.length;i++){
                console.log((details.data[i].name))
                superNameArr.push(details.data[i].name)
                console.log(superNameArr)
            }
        // console.log("--------superiorDataName:"+superiorData[name])
        const {soldiers}=this.props;
        // console.log("soldiers-------"+soldiers)
        // console.log("soldiers-------"+Object.entries(soldiers))
        // console.log("soldiers-------"+Object.entries(soldiers.data))
        //   soldiers&& soldiers.data&&soldiers.data.map((record, index) => {
        //                            console.log("name:------"+record.name)
        //                             })

        return (   
            <div style={{alignItems:'center', marginLeft:"200px"}}>
             <form>
                    Name: <br/>
                        <input onChange={this.handleChangeInputName}/>{<div style={{ fontSize: 12, color: "red" }} >{!name&&"Name should not be blank"}</div>}
                    Sex:<br/>
                        <select style={{width: '130px'}}  value ={this.state.sex} onChange={this.handleChangeInputSex}><option >Please select</option><option value="M">M</option><option value="F">F</option></select>
                    <br/>
                    Rank: <br/>
                        <select style={{width: '130px'}}  value ={this.state.rank} onChange={this.handleChangeInputRank}><option >Please select</option>
                        <option value="General">General</option><option value="Colonel">Colonel</option><option value="Major">Major</option><option value="Captain">Captain</option>
                        <option value="Lieutenant">Lieutenant</option><option value="Warrant Officer">Warrant Officer</option><option value="Sergeant">Sergeant</option>
                        <option value="Corporal">Corporal</option><option value="Specialist">Specialist</option><option value="Private">Private</option>
                        </select>
                        <br/>
                    Startdate: <br/>
                    {/* <DatePicker
                        selected={this.state.startdate}
                        onChange={this.handleChange}
                    /> */}
                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
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
                         <input onChange={this.handleChangeInputPhone}/>
                    <br/>
                    Email: <br/>
                        <input onChange={this.handleChangeInputEmail}/>
                    <br/>
                    Superior: <br/>
                    <select onChange={this.handleSuperiorChange} value={superior}>
                                        <option value="none,none">None</option>
                                        {superNameArr.map((ele, index) => {
                                            return (
                                                <option key={index} value={[ele]}>{ele}</option>
                                            );
                                        })}
                                    </select>
                    <br/>
                    My Avatar:<br />
                    <input type="file" ref="myavata" placeholder="input profile image" onChange={previewFile} />
                    <br />
                    <img src="http://localhost:3000/public/default.jpg" height="200" alt="Image preview..." />
                    <br/>
                        <button disabled={name === ''|| !name} onClick={this.handleIncludeSoldier}>Submit</button>
             </form>
            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
      soldiers: state.soldiers,
      delete:state.delete,
      firstname:state.firstname,
      details: state.details,
      name:state.details.name,
    };
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      getSuperiorData: () => dispatch(getSuperiorData()),
      getSoldiers: () => { dispatch(getSoldiers())},
      deleteSoldiers: (id) => { dispatch(deleteSoldiers(id))},
      createSoldiers: (name,sex,rank,startdate,phone,email,superior,noofds,file,handleCallToSoldiers) => {dispatch(createSoldiers(name,sex,rank,startdate,phone,email,superior,noofds,file,handleCallToSoldiers))}
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(SoldiersCreate)



