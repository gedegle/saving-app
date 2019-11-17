import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import SideBar from "../SideBar";
import {Redirect} from 'react-router-dom';
import { Icon, InlineIcon } from '@iconify/react';
import sodacupIcon from '@iconify/icons-whh/sodacup';
import foodCroissant from '@iconify/icons-mdi/food-croissant';
import foodAppleOutline from '@iconify/icons-mdi/food-apple-outline';
import fastFoodSharp from '@iconify/icons-ion/fast-food-sharp';
import meatOnBone from '@iconify/icons-emojione-monotone/meat-on-bone';
import outlineMore from '@iconify/icons-ic/outline-more';
import documentsSharp from '@iconify/icons-ion/documents-sharp';
import buddiconsActivity from '@iconify/icons-dashicons/buddicons-activity';
import trainCar from '@iconify/icons-mdi/train-car';
import cellphoneWireless from '@iconify/icons-mdi/cellphone-wireless';
import shirtIcon from '@iconify/icons-ion/shirt';
import houseIcon from '@iconify/icons-si-glyph/house';
import shallowPanOfFood from '@iconify/icons-emojione-monotone/shallow-pan-of-food';
import piggyBank from '@iconify/icons-fa-solid/piggy-bank';
import { Button, Modal } from 'react-bootstrap';
import moment from "moment";
import axios from "axios";
import $ from 'jquery';

let historyPath = "/history";

class AddNew extends Component{
    constructor(props){
        super(props);

        this.state = {
            show: false
        }


    }

    render() {
        return (
            <div>
                <div className="add-new toggle-button"
                     id="centered-toggle-button"
                     onClick={e => {
                    this.showModal(e);
                }}/>
            <Modal class={"modal"} onHide={this.showModal} animation={false} onClose={this.showModal} show={this.state.show} autoFocus={false}>
                <Modal.Body  id="hide-this">
                    <div variant="link" onClick={this.showModal} className="exit"/>
                    <div className="adding-line">
                        <Modal.Title className="category-lbl">Pasirinkite kategoriją</Modal.Title>
                        <div className="categ-grid categ-grid-active">
                            <Icon className="iconify categ-icons categ-icons-active" icon={shallowPanOfFood} />
                            <span id={"maistas"} className="categ-lbl">Maistas</span>
                        </div>
                        <div className="categ-grid">
                            <Icon className="iconify categ-icons" icon={houseIcon} />
                            <span id={"buitines-prekes"} className="categ-lbl">Buities prekės</span>
                        </div>
                        <div className="categ-grid">
                            <Icon className="iconify categ-icons" icon={shirtIcon} />
                            <span id={"drabuziai"} className="categ-lbl">Drabužiai</span>
                        </div>
                        <div className="categ-grid">
                            <Icon className="iconify categ-icons" icon={cellphoneWireless} />
                            <span id={"elektronika"} className="categ-lbl">Elektronika</span>
                        </div>
                        <div className="categ-grid">
                            <Icon className="iconify categ-icons" icon={trainCar} />
                            <span id={"transportas"} className="categ-lbl">Transportas</span>
                        </div>
                        <div className="categ-grid">
                            <Icon className="iconify categ-icons" icon={buddiconsActivity} />
                            <span id={"pramogos"} className="categ-lbl">Pramogos</span>
                        </div>
                        <div className="categ-grid">
                            <Icon className="iconify categ-icons" icon={documentsSharp} />
                            <span id={"mokesciai"} className="categ-lbl">Mokesčiai</span>
                        </div>
                        <div className="categ-grid">
                            <Icon className="iconify categ-icons" icon={outlineMore} />
                            <span id={"kita"} className="categ-lbl">Kita</span>
                        </div>
                        <div>
                            <div id="food" className="categ-things">
                                <div className="categ-thing">
                                    <Icon className="iconify thing-icon" icon={meatOnBone} />
                                    <div className="thing-lbl">Maisto produktai</div>
                                </div>
                                <div className="categ-thing">
                                    <Icon className="iconify thing-icon" icon={fastFoodSharp} />
                                    <div className="thing-lbl">Greitas maistas</div>
                                </div>
                                <div className="categ-thing categ-thing-active">
                                    <Icon className="iconify thing-icon" icon={foodAppleOutline} />
                                    <div className="thing-lbl">Užkandžiai</div>
                                </div>
                                <div className="categ-thing">
                                    <Icon className="iconify thing-icon" icon={foodCroissant} />
                                    <div className="thing-lbl">Saldumynai</div>
                                </div>
                                <div className="categ-thing">
                                    <Icon className="iconify thing-icon" icon={sodacupIcon} />
                                    <div className="thing-lbl">Gaivieji gėrimai</div>
                                </div>
                            </div>
                            <div><label className="price-lbl">Suma</label></div>
                            <input className="price-inp" type="number" placeholder="pvz. 55.7"/>
                            <div className="submit-post">Pridėti</div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            </div>
        );
    }
}
function ReturnActivePlan(props){
    let tempArr = [];
    if(props.UserPlans){
        props.UserPlans.forEach((x)=>{
            if(x.status){
                tempArr.push(x);
            }
        })
    }

    let tempDate = tempArr.map(function(e) { return e.created_at; }).sort().reverse()[0];
    console.log(tempDate)
    if (props.UserPlans){
        if(tempDate!=undefined){
            return(
                <div className="relative">
                    <div className="sav-div">
                        <h3>Progresas</h3>
                        <div className="circle-wrap">
                            <div className="circle">
                                <div className="mask full">
                                    <div className="fill"/>
                                </div>
                                <div className="mask half">
                                    <div className="fill"/>
                                </div>
                                <div className="inside-circle">
                                    <div className="piggy-bank">
                                        <Icon className="iconify" id="piggy-dash" icon={piggyBank} />
                                        <span id="saved">Sutaupyta</span>
                                        <h2 id="saved-money"><span className="euro">&euro;</span>50</h2>
                                        <p className="to-save">Liko sutaupyti: <span
                                            className="euro">&euro;</span>200</p>
                                        <AddNew />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else{
            return(
                <Redirect to={"/new-plan"}/>
            )
        }
    }else{
        return (
            <div/>
        )
    }

}
class Dashboard extends Component{
    constructor(props){
        super(props);

        this.state = {
            redirect: false,
            redirectNewPlan : false
        }
    }

    updatePeopleList() {
        const data = localStorage.getItem('listCopy');

        this.setState({
            listOfPeople: JSON.parse(data)
        });
    }
    componentWillMount() {
        if(sessionStorage.getItem("userData")){
            console.log("Call user feed");
        }
        else{
            this.setState({redirect: true});
        }
    }
    componentDidMount() {
        let tempArr = [];
        let temp;

        axios.get('http://piggy-bank.com/api/plans')
            .then(res =>{
                res.data.data.forEach((x)=>{
                    //console.log(JSON.parse(sessionStorage.getItem('userData')).id)
                    if(x.user_id === JSON.parse(sessionStorage.getItem('userData')).id) tempArr.push(x);
                })
                this.setState({UserPlans: tempArr});
                if(tempArr.find(status => status === 0)) this.setState({redirectNewPlan: true});
                    else this.setState({redirectNewPlan: false})
            })
            .catch(error => {
                console.log(error.response)
            });
    }

    render(){
        if(this.state.redirect){
            return (<Redirect to={'/signup'}/>)
        }
        if(this.state.redirectNewPlan){
            return (<Redirect to={'/new-plan'}/>)
        }
        return(
            <div id={"viewport"}>
                <SideBar/>
                <div className="biggest-bubble">
                </div>
                <div id={"dashboard"}>
                    <div id="main-view">
                        <div className="plan-view">
                            <div>
                                <div className="top-nav">
                                    <div className="top-btn dash-main active-top-btn">Pagrindinis</div>
                                    <div className="top-btn stats">Statistika</div>
                                    <Link to={historyPath}>
                                        <div className="top-btn history">Istorija</div>
                                    </Link>
                                    <div className="top-btn archive-dash active-arch-btn">Archyvuoti planą</div>
                                </div>
                            </div>
                            <ReturnActivePlan UserPlans={this.state.UserPlans} />
                            <div>
                                <div className="emit-offer">
                                    <div id="rec-label">Rekomenduojama atsisakyti</div>
                                    <div className="recommend">
                                        <div><span className="iconify recommend-icons" data-icon="ion:shirt-sharp" data-inline="false"/>Drabužiai
                                        </div>
                                        <div><span className="iconify recommend-icons" data-icon="emojione-monotone:candy" data-inline="false"/>Saldumynai
                                        </div>
                                    </div>
                                </div>
                                <div className="calnd">
                                    <div className="cal-lbl">Kalendorius</div>
                                    <div className="calendar">
                                        <div className="day">
                                            <div className="day-name">Pr</div>
                                            <div className="day-numb" id="pirmd">
                                                7
                                            </div>
                                        </div>
                                        <div className="day">
                                            <div className="day-name">A</div>
                                            <div className="day-numb" id="antrd">
                                                8
                                            </div>
                                        </div>
                                        <div className="day day-filled">
                                            <div className="day-name">T</div>
                                            <div className="day-numb" id="trecd">
                                                9
                                            </div>
                                        </div>
                                        <div className="day">
                                            <div className="day-name">K</div>
                                            <div className="day-numb" id="ketvd">
                                                10
                                            </div>
                                        </div>
                                        <div className="day">
                                            <div className="day-name">Pn</div>
                                            <div className="day-numb" id="penktd">
                                                11
                                            </div>
                                        </div>
                                        <div className="day day-filled">
                                            <div className="day-name">Š</div>
                                            <div className="day-numb" id="sestd">
                                                12
                                            </div>
                                        </div>
                                        <div className="day active-day">
                                            <div className="day-name">S</div>
                                            <div className="day-numb active" id="sekmd">
                                                13
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="top-expenses">
                                <div>
                                    <div id="big-bubble">
                                        <div className="number-row" id="first-row">1</div>
                                        <div className="expenses-labels">Maisto produktai</div>
                                        <div className="expenses-sum"><span className="euro">&euro;</span>50</div>
                                    </div>
                                </div>
                                <div>
                                    <div id="small-bubble">
                                        <div className="number-row" id="second-row">2</div>
                                        <div className="expenses-labels">Drabužiai</div>
                                        <div className="expenses-sum"><span className="euro">&euro;</span>30</div>
                                    </div>
                                </div>
                                <div>
                                    <div id="smaller-bubble">
                                        <div className="number-row" id="third-row">3</div>
                                        <div className="expenses-labels">Greitas maistas</div>
                                        <div className="expenses-sum"><span className="euro">&euro;</span>10</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )
    }
}
export default Dashboard;
