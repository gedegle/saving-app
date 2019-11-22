import React, {Component} from 'react';
import SideBar from "../SideBar";
import {Redirect} from 'react-router-dom';
import PiggyPic from "../pictures/piggy.png";
import PiggyPicGrey from "../pictures/piggy-grey.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

class NewPlan extends Component{
    constructor(props){
        super(props);

        this.state = {
            startDate: new Date(),
            redirect: false,
            userId: "",
            redirectHome: false
        }
        this.handleSumChange = this.handleSumChange.bind(this);
        this.handleIncomeChange = this.handleIncomeChange.bind(this);
        this.addPlan = this.addPlan.bind(this);
    }
    componentWillMount() {
        if(!sessionStorage.getItem("userData"))
            this.setState({redirect: true});
    }
    componentDidMount() {
        if(sessionStorage.getItem("userData")) this.setState({userId: JSON.parse(sessionStorage.getItem("userData")).id})
    }

    addPlan() {
        axios.post('http://localhost:8000/api/plan', {
            sum: this.state.sum,
            income: this.state.income,
            user_id: this.state.userId,
            status: true
        })
            .then(res =>{
                this.setState({redirectHome: true})
            })
            .catch(error => {
                console.log(error.response)
            });
    }

    handleSumChange (evt){
        this.setState({
            sum: evt.target.value
        });
    };
    handleIncomeChange(evt){
        this.setState({
            income: evt.target.value
        });
    };
    render() {
        if(this.state.redirect){
            return (<Redirect to={'/signup'}/>)
        }
        if(this.state.redirectHome){
            return (<Redirect to={'/home'}/>)
        }

        return(
            <div id={"viewport"}>
                <SideBar activePlans={JSON.parse(sessionStorage.getItem("activePlans"))}/>
                <div id={"dashboard"}>
                    <div id="choose-plan">
                        <div className="active-plan-sec">
                            <img className="piggy" src={PiggyPic} style={{width: "90px"}}/>
                        </div>
                        <p id="choose-plan-lbl">Suveskite duomenis</p>
                        <p className="info-par">
                            Suveskite sumą, kurią norite sutaupyti,
                            bei apytikslias mėnesines pajamas (be mokesčių),
                            kad sistema atliktų skaičiavimus.</p>
                        <div className="plans">
                            <div className="parameters">
                                <div className={"frst-block"}>
                                    <p className="lbl-sec">Norima sutaupyti suma </p>
                                    <input className="price-inp-sec" type="number" onChange={this.handleSumChange} placeholder="pvz. 55.7"/>
                                </div>
                                <div className="scnd-block">
                                    <p className="lbl-sec">Vidutinės mėnesio pajamos</p>
                                    <input className="price-inp-sec" type="number" onChange={this.handleIncomeChange} placeholder="pvz. 350"/>
                                </div>
                            </div>
                        </div>
                        <button type={"submit"} className="submit-plan" onClick={this.addPlan}>Pasirinkti</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default NewPlan;
