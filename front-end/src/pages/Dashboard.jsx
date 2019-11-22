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
import silverwareClean from '@iconify/icons-mdi/silverware-clean';
import furniture15 from '@iconify/icons-maki/furniture-15';
import flowerpotIcon from '@iconify/icons-whh/flowerpot';
import highHeeledShoe from '@iconify/icons-emojione-monotone/high-heeled-shoe';
import sunglassesIcon from '@iconify/icons-emojione-monotone/sunglasses';
import womansClothes from '@iconify/icons-emojione-monotone/womans-clothes';
import socksIcon from '@iconify/icons-fa-solid/socks';
import pcIcon from '@iconify/icons-raphael/pc';
import gaming15 from '@iconify/icons-maki/gaming-15';
import photoVideo from '@iconify/icons-fa-solid/photo-video';
import mittenIcon from '@iconify/icons-fa-solid/mitten';
import carIcon from '@iconify/icons-fa-solid/car';
import busAlt from '@iconify/icons-fa-solid/bus-alt';
import motorbikeIcon from '@iconify/icons-mdi/motorbike';

import { Button, Modal } from 'react-bootstrap';
import moment, {now} from "moment";
import axios from "axios";
import styled, { keyframes, css }  from 'styled-components';
import * as types from "lodash";
const Types =[
    {
        name: "food",
        types: [
            {
                tname: "Maisto produktai",
                icon: meatOnBone
            },
            {
                tname: "Greitas maistas",
                icon:  fastFoodSharp
            },
            {
                tname: "Užkandžiai",
                icon: foodAppleOutline
            },
            {
                tname: "Saldumynai",
                icon: foodCroissant
            },
            {
                tname: "Gaivieji gėrimai",
                icon: sodacupIcon
            }
        ],
    },
    {
        name: "housing",
        types: [
            {
                tname: "Apyvokos prekės",
                icon: silverwareClean
            },
           {
               tname: "Baldai",
               icon: furniture15
           },
            {
                tname: "Dekoro prekės",
                icon: flowerpotIcon
            }
        ],
    },
    {
        name: "clothes",
        types: [
            {
                tname: "Viršutiniai rūbai",
                icon: womansClothes
            },
            {
                tname: "Avalynė",
                icon: highHeeledShoe
            },
            {
                tname: "Aksesuarai",
                icon: sunglassesIcon
            },
            {
                tname: "Lauko rūbai",
                icon: mittenIcon
            },
            {
                tname: "Kita",
                icon: socksIcon
            }
        ],
    },
    {
        name: "electronics",
        types: [
            {
                tname: "Žaidimų įranga",
                icon: gaming15
            },
            {
                tname: "Video ir audio",
                icon: photoVideo
            },
            {
                tname: "Telefoninė įranga",
                icon: cellphoneWireless
            },
            {
                tname: "Kompiuterinė įranga",
                icon: pcIcon
            }
        ],
    },
    {
        name: "transport",
        types: [
            {
                tname: "Viešasis trans.",
                icon: busAlt
            },
            {
                tname: "Nuosavas trans.",
                icon: carIcon
            },
            {
                tname: "Kita",
                icon: motorbikeIcon
            }
        ],
    }
]

class AddNew extends Component{
    constructor(props){
        super(props);

        this.state = {
            show: false,
            id: null,
            typeId: null,
            sum: 0
        }
        this.changeId = this.changeId.bind(this);
        this.changeTypeId = this.changeTypeId.bind(this);
        this.handleSumChange = this.handleSumChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    showModal = e => {

        this.setState({
            show: !this.state.show
        });
    };
    changeId (x, index) {
        this.setState({
            id: x,
            activeIndex: index
        })
    }
    changeTypeId(x) {
        this.setState({
            typeId: x
        })
    }
    handleSumChange (evt){
        this.setState({
            sum: evt.target.value
        });
    };

    handleSubmit (evt) {
        axios.post('http://localhost:8000/api/post', {
            user_id: this.props.userId,
            date: moment().format('YYYY-MM-DD'),
            sum: this.state.sum,
            plan_id: this.props.planId,
            type: this.state.typeId
        })
            .then(res =>{
                this.setState({redirectHome: true})
                window.location.reload();
            })
            .catch(error => {
                console.log(error.response)
            });
    }
    render() {
        if(this.state.redirectHome){
            return (<Redirect to={'/home'}/>)
        }
        return (
            <div>
                <div className="add-new toggle-button"
                     id="centered-toggle-button"
                     onClick={e => {
                    this.showModal(e);
                }}/>
            <Modal className={"modal"} onHide={this.showModal} animation={false} onClose={this.showModal} show={this.state.show} autoFocus={false}>
                <Modal.Body  id="hide-this">
                    <div variant="link" onClick={this.showModal} className="exit"/>
                    <div className="adding-line">
                        <Modal.Title className="category-lbl">Pasirinkite kategoriją</Modal.Title>
                        <div className={"wrapper-categories"}>
                        <div className={
                            this.state.id && this.state.id === "food" ? 'categ-grid categ-grid-active' : 'categ-grid'
                        }  onClick={()=>this.changeId("food")}>
                            <Icon className="iconify categ-icons" icon={shallowPanOfFood} />
                            <span id={"maistas"} className="categ-lbl">Maistas</span>
                        </div>
                        <div className={
                            this.state.id && this.state.id === "housing" ? 'categ-grid categ-grid-active' : 'categ-grid'
                        } onClick={()=>this.changeId("housing")}>
                            <Icon className="iconify categ-icons" icon={houseIcon} />
                            <span id={"buitines-prekes"} className="categ-lbl">Buities prekės</span>
                        </div>
                        <div className={
                            this.state.id && this.state.id === 'clothes' ? 'categ-grid categ-grid-active' : 'categ-grid'
                        } onClick={()=>this.changeId("clothes")}>
                            <Icon className="iconify categ-icons" icon={shirtIcon} />
                            <span id={"drabuziai"} className="categ-lbl">Drabužiai</span>
                        </div>
                        <div className={
                            this.state.id && this.state.id === 'electronics' ? 'categ-grid categ-grid-active' : 'categ-grid'
                        } onClick={()=>this.changeId("electronics")}>
                            <Icon className="iconify categ-icons" icon={cellphoneWireless} />
                            <span id={"elektronika"} className="categ-lbl">Elektronika</span>
                        </div>
                        <div className={
                            this.state.id && this.state.id === "transport" ? 'categ-grid categ-grid-active' : 'categ-grid'
                        } onClick={()=>this.changeId("transport")}>
                            <Icon className="iconify categ-icons" icon={trainCar} />
                            <span id={"transportas"} className="categ-lbl">Transportas</span>
                        </div>
                        <div className={
                            this.state.id && this.state.id === "entertainment" ? 'categ-grid categ-grid-active' : 'categ-grid'
                        } onClick={()=>this.changeId("entertainment")}>
                            <Icon className="iconify categ-icons" icon={buddiconsActivity} />
                            <span id={"pramogos"} className="categ-lbl">Pramogos</span>
                        </div>
                        <div className={
                            this.state.id && this.state.id === "bills" ? 'categ-grid categ-grid-active' : 'categ-grid'
                        }  onClick={()=>this.changeId("bills")}>
                            <Icon className="iconify categ-icons" icon={documentsSharp} />
                            <span id={"mokesciai"} className="categ-lbl">Mokesčiai</span>
                        </div>
                        <div className={
                            this.state.id && this.state.id === "other" ? 'categ-grid categ-grid-active' : 'categ-grid'
                        }  onClick={()=>this.changeId("other")}>
                            <Icon className="iconify categ-icons" icon={outlineMore} />
                            <span id={"kita"} className="categ-lbl">Kita</span>
                        </div>
                        </div>
                        {this.state.id && Types.map((item)=>(
                            <div id={item.name} className="categ-things">
                            {this.state.id == item.name && item.types.map((i)=>(
                                <div className={
                                    this.state.typeId && this.state.typeId === i.tname ? 'categ-thing categ-thing-active' : 'categ-thing'}  onClick={()=>this.changeTypeId(i.tname)}>
                                    <Icon className="iconify thing-icon" icon={i.icon} />
                                    <div className="thing-lbl">{i.tname}</div>
                                </div>
                            ))}
                            </div>
                        ))}
                        <div className={"price-wrapper"}><label className="price-lbl">Suma</label></div>
                        <input className="price-inp" type="number" onChange={this.handleSumChange} placeholder="pvz. 55.7"/>
                        <div onClick={this.handleSubmit} type={"submit"} className="submit-post">Pridėti</div>
                    </div>
                </Modal.Body>
            </Modal>
            </div>
        );
    }
}
class ReturnActivePlan extends Component{
    constructor(props){
        super(props);
        this.state = {
            posts:"",
            saved: 0,
            degrees: 0

        }
        const keyframesOfDegrees = keyframes`
        {
         0% {
         transform: rotate(0deg);
        }
        100% {
        transform: rotate(${this.state.degrees}deg);
        }
        }`;

        const degrees = css`
        animation: ${keyframesOfDegrees} ease-in-out 3s;
        transform: rotate(${this.state.degrees}deg);`;

        this.CalculateSavings = this.CalculateSavings.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let tempArr = [];
        if(prevProps.id !== this.props.id){
            axios.get('http://localhost:8000/api/posts-all')
                .then(res =>{
                    res.data.data.forEach((x)=>{
                        if(x.plan_id === parseInt(this.props.id) ) {
                            tempArr.push(x);
                        }
                    });
                    this.setState({
                        posts: tempArr
                    });
                    sessionStorage.setItem("activePlans", JSON.stringify(this.props.activePlans));
                    this.CalculateSavings(this.props.activePlans, this.props.id);
                    //document.getElementsByClassName('fill').style = this.degrees;
                })
                .catch(error => {
                    console.log(error.response)
                });
        }
    }
    CalculateSavings(plans, id){
        let tempSum,
            tempIncome,
            tempDate,
            tempArr = [],
            count=1,
            inAll = 0,
            avgPerDay = 0,
            avgPerMonth = 0,
            tempLeftAMonth = 0,
            tempWhileSum = 0,
            monthCount = 0,
            daysToSave = 0,
            leftToSave = 0,
            saved = 0,
            tempDays = 0;


        plans.forEach((x)=>{
            if(x.id===parseInt(id)) {
                tempSum = x.sum;
                tempIncome = x.income;
                tempDate = x.created_at;
            }
        });

        tempDays = (moment.duration((Date.now()-Date.parse(tempDate)), 'milliseconds')).asDays();
        tempDays = Math.round(tempDays);

        tempArr = this.state.posts;


        tempArr = tempArr.sort((a, b) => b.date - a.date);
        tempArr = tempArr.filter((el, i, tempArr) => i === tempArr.indexOf(el));
        count = tempArr.length;

        for(var k=0; k<tempArr.length; k++) {
            inAll+=tempArr[k].sum;
        }
        inAll = inAll.toFixed(2);
        avgPerDay = inAll / count;
        avgPerMonth = avgPerDay * 30;

        tempLeftAMonth = tempIncome - avgPerMonth;
        tempWhileSum = tempSum;

        if(tempLeftAMonth < 0){
            monthCount = Math.round(tempSum/tempLeftAMonth);

        }

        console.log(tempLeftAMonth)
        // while(tempWhileSum >= tempSum){
        //     monthCount++;
        //     tempWhileSum = tempSum - tempLeftAMonth;
        // }
        console.log(monthCount)
        if(tempWhileSum !== 0){
            daysToSave = tempWhileSum/avgPerDay;
        }

        daysToSave = daysToSave + monthCount*30;
        saved = ((tempIncome/30)*tempDays - inAll).toFixed(2);

        leftToSave = tempSum - saved;

        if(tempSum < tempLeftAMonth) {
            saved = tempLeftAMonth;
            leftToSave = 0;
        }

        this.setState({
            saved: saved,
            leftToSave: leftToSave,
            degrees: saved*180/tempSum
        })

    }
    render() {
        /*let tempArr = [];
        if(this.props.UserPlans){
            this.props.UserPlans.forEach((x)=>{
                if(x.status){
                    tempArr.push(x);
                }
            })
        }

        let tempDate = tempArr.map(function(e) { return e.created_at; }).sort().reverse()[0];
        /!*if(this.props.UserPlans && tempDate!=undefined) {

            }*!/*/
        return (
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
                                    <h2 id="saved-money"><span className="euro">&euro;</span>{this.state.saved}</h2>
                                    <p className="to-save">Liko sutaupyti: <span
                                        className="euro">&euro;</span>{this.state.leftToSave}</p>
                                    <AddNew planId={this.props.id} userId={this.props.userId} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
class Dashboard extends Component{
    constructor(props){
        super(props);

        this.state = {
            redirect: false,
            redirectNewPlan : false,
            id: 0,
            userId: 0
        }
    }

    componentDidMount() {
        if(!sessionStorage.getItem("userData")) this.setState({redirect: true});

        let tempArr = [], tempArr2 = [];
        let temp;
        axios.get('http://localhost:8000/api/plans-all')
            .then(res =>{
                res.data.data.forEach((x)=>{
                    //console.log(JSON.parse(sessionStorage.getItem('userData')).id)
                    if(x.user_id === JSON.parse(sessionStorage.getItem('userData')).id) tempArr.push(x);
                })

                this.setState({UserPlans: tempArr});
                if(this.state.UserPlans && this.state.UserPlans.length > 0) {
                    this.state.UserPlans.forEach((x)=>{
                        if(x.status === 1) tempArr2.push(x);
                    })
                }
                this.setState({
                    activePlans: tempArr2,
                    id: tempArr2[0].id,
                    userId: JSON.parse(sessionStorage.getItem('userData')).id
                })

                if(tempArr.find(status => status === 0)) this.setState({redirectNewPlan: true});
                else this.setState({redirectNewPlan: false})

            })
            .catch(error => {
                console.log(error.response)
            });
    }
 /*   componentDidUpdate(prevProps, prevState, snapshot) {
        let tempClass = document.getElementsByClassName("plan")[0];

        if(tempClass!==undefined) {
            let tempId = document.getElementsByClassName("plan")[0].id;
            if(tempId !== prevState.id)
                this.setState({
                    id: tempId
                })
        }
    }*/


    render(){
        if(this.state.redirect){
            return (<Redirect to={'/signup'}/>)
        }
        if(this.state.redirectNewPlan){
            return (<Redirect to={'/new-plan'}/>)
        }
        return(
            <div id={"viewport"}>
                <SideBar activePlans={JSON.parse(sessionStorage.getItem("activePlans"))}/>
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
                            <ReturnActivePlan UserPlans={this.state.UserPlans} id={this.state.id} userId={this.state.userId} activePlans={this.state.activePlans}/>
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
