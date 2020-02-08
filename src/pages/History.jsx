import React, {Component} from 'react';
import SideBar from "../SideBar";
import {Redirect} from 'react-router-dom';
import { Icon } from '@iconify/react';
import pencilIcon from '@iconify/icons-foundation/pencil';
import trashIcon from '@iconify/icons-si-glyph/trash';
import axios from "axios";
import {Modal} from "react-bootstrap";
import ModalNewPost from "../ModalNewPost";
import "react-datepicker/dist/react-datepicker.css";

class DisplayHistoryRows extends Component{
    constructor(props) {
        super(props);
        this.state = {
            urlPost: 'http://localhost:8000/api/post',
            urlDelete: 'http://localhost:8000/api/post/'
        };
        this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
        this.handleSumChange = this.handleSumChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
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
    handleSubmitUpdate(evt) {
        axios.put(this.state.urlPost, {
            id: this.props.id,
            user_id: JSON.parse(sessionStorage.getItem("userData").id),
            date: this.state.date,
            sum: this.state.sum,
            plan_id: JSON.parse(sessionStorage.getItem("thisPlanId")),
            type: this.state.type
        })
            .then(res =>{
                this.setState({redirectHome: true});
                window.location.reload();
            })
            .catch(error => {
              //  console.log(error.response)
            });
    }
    handleDelete(planId){
        axios.delete(this.state.urlDelete+planId)
            .then(res =>{
                window.location.reload();
            })
            .catch(error => {
             //   console.log(error.response)
            });
    }
    filterByDate() {

    }
    render() {
        return (
            <tr>
                <td>
                    <span style={{verticalAlign: "1rem"}}>{this.props.type}</span>
                </td>
                <td id={"sum-"+this.props.i}>{this.props.sum.toFixed(2)}<span className="euro">&euro;</span></td>
                <td>{this.props.date}</td>
                <td>
                    <Icon className={"edit-btn toggle-button button-"+this.props.i} id="centered-toggle-button"
                          onClick={e => {
                              this.showModal(e);
                          }} icon={pencilIcon} />
                    <Modal className={"modal"} onHide={this.showModal} animation={false} onClose={this.showModal} show={this.state.show} autoFocus={false}>
                        <Modal.Body  id="hide-this">
                            <div variant="link" onClick={this.showModal} className="exit"/>
                            <div className="adding-line">
                                <ModalNewPost x={this.props.i} getSumInput={this.handleSumChange}/>
                                <div onClick={(e)=>this.handleSubmitUpdate} type={"submit"} className="submit-post">Pridėti</div>
                            </div>
                        </Modal.Body>`
                    </Modal>
                    <span style={{borderLeft: "1px solid #dee2e6", padding: "1.5em 0 1.5em 0.7em", marginLeft: "0.5em"}}/>
                    <Icon onClick={(e)=>{this.handleDelete(this.props.planId)}} className="remove-btn" icon={trashIcon} />
                </td>
            </tr>
        )
    }
}

class History extends Component{
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            url: 'http://localhost:8000/api/posts-all',
            startDate:  new Date()
        }
    }
    componentDidMount() {
        if(!sessionStorage.getItem("userData")) this.setState({redirect: true});
        else{
            let tempArr = [];
            axios.get(this.state.url)
                .then(res =>{
                    res.data.data.forEach((x)=>{
                        if(x.plan_id == JSON.parse(sessionStorage.getItem("thisPlanId"))) tempArr.push(x);
                    });
                    if(sessionStorage.getItem("dateClicked")) {
                        let newTempArr = [];
                        tempArr.forEach((item)=>{
                            if(item.date == sessionStorage.getItem("dateClicked")) newTempArr.push(item);
                        });
                        tempArr = newTempArr;
                    }
                    this.setState({
                        history: tempArr
                    })
                })
                .catch(error => {
                  //  console.log(error.response)
                });
        }
    }

    render() {
        if(this.state.redirect){
            return (<Redirect to={'/signup'}/>)
        }
        let x = 1;
        return (
            <div id={"viewport"}>
                <SideBar activePlans={JSON.parse(sessionStorage.getItem("activePlans"))}/>
                <div className="biggest-bubble">
                </div>
                <div id="dashboard">
                    <div id="archive-list-view">
                        <div id="list-viewport">
                            <div className={"headings-display"}>
                                <h3 className="list-h3">Įrašų istorija<span
                                    style={{fontWeight: 400, fontSize: "1rem", marginLeft: "1rem"}}>Visų įrašų plane istorija</span>
                                    </h3>
                                {sessionStorage.getItem("dateClicked") ? <h4 className={"history-date"}>Įrašai iš {sessionStorage.getItem("dateClicked")}</h4> : ''}

                            </div>

                            <table className="table">
                                <thead className="thead-light">
                                <tr>
                                    <th scope="col">Įrašo tipas</th>
                                    <th scope="col">Suma</th>
                                    <th scope="col">Įvedimo data</th>
                                    <th scope="col">Veiksmai</th>
                                    <th scope="col"/>
                                </tr>
                                </thead>
                            </table>
                            <div className={"table-wrapper"}>
                            <table className="table">
                                <tbody>
                                {this.state.history && this.state.history.map((item, i)=>(
                                    <DisplayHistoryRows key={i} i={x++} type={item.type} sum={item.sum} date={item.date} planId={item.id}/>
                                ))}
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default History;
