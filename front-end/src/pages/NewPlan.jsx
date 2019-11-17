import React, {Component} from 'react';
import SideBar from "../SideBar";
import {Redirect} from 'react-router-dom';
import PiggyPic from "../pictures/piggy.png";
import PiggyPicGrey from "../pictures/piggy-grey.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class NewPlan extends Component{
    constructor(props){
        super(props);

        this.state = {
            startDate: new Date(),
            redirect: false
        }
        this.handleChange = this.handleChange.bind(this);

    }
    componentWillMount() {
        if(sessionStorage.getItem("userData")){
            console.log("Call user feed");
        }
        else{
            this.setState({redirect: true});
        }
    }

    handleChange = date => {
        this.setState({
            startDate: date
        });
    };
    render() {
        if(this.state.redirect){
            return (<Redirect to={'/signup'}/>)
        }

        return(
            <div id={"viewport"}>
                <SideBar/>

                <div id={"dashboard"}>
                    <div id="choose-plan">
                        <p id="choose-plan-lbl">Pasirinkite planą</p>
                        <p className="info-par">Pasirinkus pirmąjį planą galima taupyti be nustatytos datos. </p>
                        <p className="info-par">Antrasis planas leis pasirinkti datą, iki kurios norima sutaupyti įvestą
                            pinigų sumą. </p>
                        <div className="plans">
                            <div className="active-plan-sec">
                                <img className="piggy" src={PiggyPic} style={{width: "75px"}}/>
                                <p style={{marginTop: 0}}>Pirmas planas</p>
                            </div>
                            <div className="plan-sec">
                                <img className="piggy" src={PiggyPicGrey} style={{width: "75px"}}/>
                                <p style={{marginTop: 0}}>Antras planas</p>
                            </div>
                            <div className="parameters">
                                <p className="lbl-sec">Norima sutaupyti suma </p>
                                <input className="price-inp-sec" type="number" placeholder="pvz. 55.7"/>
                                <div className="scnd-block">
                                    <p className="lbl-sec scnd-lbl">Iki kada norima sutaupyti</p>
                                    <DatePicker
                                        selected={this.state.startDate}
                                        onChange={this.handleChange}
                                        id={"datepicker"}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="submit-plan">Pasirinkti</div>
                    </div>
                </div>
            </div>
        )
    }
}
export default NewPlan;
