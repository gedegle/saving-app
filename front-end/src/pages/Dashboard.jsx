import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import SideBar from "../SideBar";
import {Redirect} from 'react-router-dom';
import { Icon, InlineIcon } from '@iconify/react';
import piggyBank from '@iconify/icons-fa-solid/piggy-bank';

import { Button, Modal } from 'react-bootstrap';
import moment, {now} from "moment";
import axios from "axios";
import ModalNewPost from "../ModalNewPost";
import ActivePlansSingleton from "../ActivePlansSingleton";

const activePlans = ActivePlansSingleton.getInstance();

const historyPath = "/history";

function ReturnCalendar() {
    moment.locale('LT');
    var startOfWeek = moment().startOf('isoWeek');
    var endOfWeek = moment().endOf('isoWeek');
    var today = moment().format('dd');
    var days = [];
    var day = startOfWeek;

    while (day <= endOfWeek) {
        days.push(day.toDate());
        day = day.clone().add(1, 'd');
    }

    return(
        <div className="calnd">
            <div className="cal-lbl">Kalendorius</div>
            <div className="calendar">
                {days && days.map((d)=>(
                    <div>
                    {today === moment(d).format('dd') ?
                        <div className="day active-day">
                            <div className="day-name">{moment(d).locale('LT').format('dd')}</div>
                            <div className="day-numb">{moment(d).format('D')}</div>
                        </div> :
                        <div className="day">
                            <div className="day-name">{moment(d).locale('LT').format('dd')}</div>
                            <div className="day-numb">{moment(d).format('D')}</div>
                        </div>}
                    </div>
                ))}
            </div>
        </div>
    )
}
class CalculateEmitOffer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            url: 'http://localhost:8000/api/posts-all'
        }
        this.whatToEmit = this.whatToEmit.bind(this);
    }
    componentDidMount() {
        if(!sessionStorage.getItem("userData")) this.setState({redirect: true});
        else{
            let tempArr = [];
            axios.get(this.state.url)
                .then(res =>{
                    res.data.data.forEach((x)=>{
                        if(x.plan_id == JSON.parse(sessionStorage.getItem("thisPlanId"))) tempArr.push(x);
                    })
                    this.setState({
                        posts: tempArr
                    })
                    this.whatToEmit(tempArr);
                })
                .catch(error => {
                    console.log(error.response)
                });
        }
    }
    whatToEmit(x) {
        let maxName = "";
        let maxSum = 0;
        let tempArr = [];

        let result = x.reduce((c, v) => {
            c[v.type] = v.sum + (c[v.type] || 0) ;
            return c;
        }, {});

        for(let i=0; i<5; i++) {
            maxName = Object.keys(result).reduce((a, b) => result[a] > result[b] ? a : b);
            maxSum = result[maxName];
            if(maxName === "Pramogos" && maxSum >= 30) tempArr.push(maxName);
            else if((maxName === "Greitas maistas" || maxName === "Saldumynai" || maxName === "Gaivieji gėrimai") && maxSum >= 20) tempArr.push(maxName);
            else if(maxName === "Baldai" && maxSum >= 150) tempArr.push(maxName);
            else if(maxName === "Dekoro prekės" && maxSum >= 80) tempArr.push(maxName);
            else if(maxName === "Apyvokos prekės" && maxSum >= 30) tempArr.push(maxName);
            else if(maxName === "Viršutiniai rūbai" && maxSum >= 45) tempArr.push(maxName);
            else if(maxName === "Avalynė" && maxSum >= 30) tempArr.push(maxName);
            else if(maxName === "Aksesuarai" && maxSum >= 15) tempArr.push(maxName);
            else if(maxName === "Nuosavas trans." && maxSum >= 15) tempArr.push(maxName);
            else if((maxName === "Žaidimų įranga" || maxName === "Video ir audio" || maxName === "Telefoninė įranga" || maxName === "Kompiuterinė įranga") && maxSum >= 100) tempArr.push(maxName);
            delete result[maxName];
        }
        this.setState({
            emitOffer: tempArr
        })

    }
    render() {
        return (
            <div className="emit-offer">
                <div id="rec-label">Rekomenduojama atsisakyti</div>
                <div className="recommend">
                    {this.state.emitOffer && this.state.emitOffer.map((item) =>(
                        <div>{item}</div>
                    ))}
                </div>
            </div>
        );
    }
}
class CalculateExpenses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'http://localhost:8000/api/posts-all'
        }
        this.biggestExpenses = this.biggestExpenses.bind(this);
    }
    componentDidMount() {
        if(!sessionStorage.getItem("userData")) this.setState({redirect: true});
        else{
            let tempArr = [];
            axios.get(this.state.url)
                .then(res =>{
                    res.data.data.forEach((x)=>{
                        if(x.plan_id == JSON.parse(sessionStorage.getItem("thisPlanId"))) tempArr.push(x);
                    })
                    this.setState({
                        posts: tempArr
                    })

                    this.biggestExpenses(tempArr);
                })
                .catch(error => {
                    console.log(error.response)
                });
        }
    }

    biggestExpenses(x) {
        let result = x.reduce((c, v) => {
            c[v.type] = v.sum + (c[v.type] || 0) ;
            return c;
        }, {});

        let maxName1 = Object.keys(result).reduce((a, b) => result[a] > result[b] ? a : b);
        let maxSum1 = result[maxName1];

        delete result[maxName1];
        let maxName2 = Object.keys(result).reduce((a, b) => result[a] > result[b] ? a : b);
        let maxSum2 = result[maxName2];

        delete result[maxName2];
        let maxName3 = Object.keys(result).reduce((a, b) => result[a] > result[b] ? a : b);
        let maxSum3 = result[maxName3];

        this.setState({
            maxSum1: maxSum1,
            maxName1 : maxName1,
            maxSum2: maxSum2,
            maxName2 : maxName2,
            maxSum3: maxSum3,
            maxName3 : maxName3
        })


    }
    render() {
        return (
            <div className="top-expenses">
                <div>
                    <div id="big-bubble">
                        <div className="number-row" id="first-row">1</div>
                        <div className="expenses-labels">{this.state.maxName1}</div>
                        <div className="expenses-sum"><span className="euro">&euro;</span>{this.state.maxSum1}</div>
                    </div>
                </div>
                <div>
                    <div id="small-bubble">
                        <div className="number-row" id="second-row">2</div>
                        <div className="expenses-labels">{this.state.maxName2}</div>
                        <div className="expenses-sum"><span className="euro">&euro;</span>{this.state.maxSum2}</div>
                    </div>
                </div>
                <div>
                    <div id="smaller-bubble">
                        <div className="number-row" id="third-row">3</div>
                        <div className="expenses-labels">{this.state.maxName3}</div>
                        <div className="expenses-sum"><span className="euro">&euro;</span>{this.state.maxSum3}</div>
                    </div>
                </div>
            </div>
        );
    }

}
class AddNew extends Component{
    constructor(props){
        super(props);

        this.state = {
            show: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSumChange = this.handleSumChange.bind(this);
        this.handleIncomeChange = this.handleIncomeChange.bind(this);
    }
    showModal = e => {

        this.setState({
            show: !this.state.show
        });
    };
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
    handleSubmit (evt) {
        axios.post('http://localhost:8000/api/post', {
            user_id: this.props.userId,
            date: moment().format('YYYY-MM-DD'),
            sum: this.state.sum,
            plan_id: this.props.planId,
            type: sessionStorage.getItem("typeId")
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
                            <ModalNewPost getSumInput={this.handleSumChange}/>
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
            saved: null,
            degrees: null

        }
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
        let sum,
            income,
            date,
            tempArr = [],
            count=1,
            inAll = 0,
            avgPerDay = 0,
            avgPerMonth = 0,
            tempLeftAMonth = 0,
            tempWhileSum = 0,
            monthCount = 1,
            daysToSave = 0,
            leftToSave = 0,
            saved = 0,
            tempDays = 0;


        plans.forEach((x)=>{
            if(x.id===parseInt(id)) {
                sum = x.sum;
                income = x.income;
                date = x.created_at;
            }
        });

        tempDays = (moment.duration((Date.now()-Date.parse(date)), 'milliseconds')).asDays();
        tempDays = Math.round(tempDays);

        tempArr = this.state.posts;


        tempArr = tempArr.sort((a, b) => b.date - a.date);
        tempArr = tempArr.filter((el, i, tempArr) => i === tempArr.indexOf(el));
        count = tempArr.length;
        //is viso isleista (inAll)
        for(var k=0; k<tempArr.length; k++) {
            inAll+=tempArr[k].sum;
        }
        inAll = inAll.toFixed(2);
        avgPerDay = inAll / count;
        avgPerMonth = avgPerDay * 30;
        if(avgPerMonth>income) monthCount = Math.ceil(avgPerMonth/income);
        else monthCount = 1;

        var tempIncome = monthCount * income;
        tempLeftAMonth = tempIncome - avgPerMonth;

        if(tempLeftAMonth<sum) {
            tempWhileSum = sum;

            while (tempWhileSum >= sum) {
                monthCount++;
                tempWhileSum = sum - tempLeftAMonth;
            }

            if(tempWhileSum !== 0){
                daysToSave = tempWhileSum/avgPerDay;
            }
        }
        console.log(sum)
        if(avgPerMonth<sum) {
            daysToSave = Math.ceil(sum/avgPerMonth);
        } else daysToSave = Math.ceil(daysToSave) + monthCount*30;

        saved = ((income/30)*tempDays - inAll).toFixed(2);
        if(saved<0) {
            saved = 0;
        }
        leftToSave = sum - saved;
        this.setState({
            saved: saved,
            leftToSave: leftToSave,
            degrees: saved*180/sum,
            daysToSave: moment().add(daysToSave, 'days').format('YYYY-MM-DD')
        })

    }
    render() {
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
                                    <div className={"wrapper-saved-dash"}>
                                        <Icon className="iconify" id="piggy-dash" icon={piggyBank} />
                                        <span id="saved">Sutaupyta</span>
                                    </div>
                                    <h2 id="saved-money"><span className="euro">&euro;</span>{this.state.saved ? this.state.saved : "Loading"}</h2>
                                    <div className={"save-content"}>
                                        <p className="to-save">Liko: <span
                                            className="euro">&euro;</span>{this.state.leftToSave ? this.state.leftToSave : "Loading"}
                                        </p>
                                        <p className={"date-to-save-lbl"}>Numatoma sutaupymo data: </p>
                                        <p className={"date-to-save"}>{this.state.daysToSave ? this.state.daysToSave : "Loading"}</p>
                                    </div>
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
        console.log(this.userData);
        this.state = {
            redirect: false,
            redirectNewPlan : false,
            id: 0,
            userId: 0
        }
    }

    componentDidMount() {
        if(!sessionStorage.getItem("userData")) this.setState({redirect: true});
        else {
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

                    sessionStorage.setItem("thisPlanId", tempArr2[0].id);

                    if(tempArr.find(status => status === 0)) this.setState({redirectNewPlan: true});
                    else this.setState({redirectNewPlan: false})

                })
                .catch(error => {
                    console.log(error.response)
                });
        }
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
                <SideBar activePlans={activePlans.getPlans()}/>
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
                                <CalculateEmitOffer />
                                <ReturnCalendar />
                                <CalculateExpenses />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            )
    }
}
export default Dashboard;
