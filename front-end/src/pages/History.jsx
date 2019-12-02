import React, {Component} from 'react';
import SideBar from "../SideBar";
import {Redirect} from 'react-router-dom';
import { Icon, InlineIcon } from '@iconify/react';
import meatOnBone from '@iconify/icons-emojione-monotone/meat-on-bone';
import pencilIcon from '@iconify/icons-foundation/pencil';
import fastFoodSharp from '@iconify/icons-ion/fast-food-sharp';
import trashIcon from '@iconify/icons-si-glyph/trash';
import foodCroissant from '@iconify/icons-mdi/food-croissant';
import axios from "axios";
import {Modal} from "react-bootstrap";
import ModalNewPost from "../ModalNewPost";
import ActivePlansSingleton from "../ActivePlansSingleton";

const activePlans = ActivePlansSingleton.getInstance();


class DisplayHistoryRows extends Component{
    constructor(props) {
        super(props);
        this.state = {
            url: 'http://localhost:8000/api/post'
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSumChange = this.handleSumChange.bind(this);
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
    handleSubmit(evt) {
        axios.put(this.state.url, {
            id: this.props.id,
            user_id: JSON.parse(sessionStorage.getItem("userData").id),
            date: this.state.date,
            sum: this.state.sum,
            plan_id: JSON.parse(sessionStorage.getItem("thisPlanId")),
            type: this.state.type
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
        return (
            <tr>
                <td>
                    <span style={{verticalAlign: "1rem"}}>{this.props.type}</span>
                </td>
                <td>{this.props.price.toFixed(2)}<span className="euro">&euro;</span></td>
                <td>{this.props.date}</td>
                <td>
                    <Icon className="edit-btn toggle-button" id="centered-toggle-button"
                          onClick={e => {
                              this.showModal(e);
                          }} icon={pencilIcon} />
                    <Modal className={"modal"} onHide={this.showModal} animation={false} onClose={this.showModal} show={this.state.show} autoFocus={false}>
                        <Modal.Body  id="hide-this">
                            <div variant="link" onClick={this.showModal} className="exit"/>
                            <div className="adding-line">
                                <ModalNewPost getSumInput={this.handleSumChange}/>
                                <div onClick={this.handleSubmit} type={"submit"} className="submit-post">Pridėti</div>
                            </div>
                        </Modal.Body>
                    </Modal>
                    <span style={{borderLeft: "1px solid #dee2e6", padding: "1.5em 0 1.5em 0.7em", marginLeft: "0.5em"}}/>
                    <Icon className="remove-btn" icon={trashIcon} />
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
            url: 'http://localhost:8000/api/posts'
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
                    })
                    this.setState({
                        history: tempArr
                    })
                })
                .catch(error => {
                    console.log(error.response)
                });
        }
    }

    render() {
        if(this.state.redirect){
            return (<Redirect to={'/signup'}/>)
        }
        return (
            <div id={"viewport"}>
                <SideBar activePlans={activePlans.getPlans()}/>
                <div className="biggest-bubble">
                </div>
                <div id="dashboard">
                    <div id="archive-list-view">
                        <div id="list-viewport">
                            <h3 className="list-h3">Įrašų istorija<span
                                style={{fontWeight: 400, fontSize: "1rem", marginLeft: "1rem"}}>Visų įrašų plane istorija</span>
                            </h3>
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
                                <tbody>
                                {this.state.history && this.state.history.map((item)=>(
                                    <DisplayHistoryRows type={item.type} price={item.sum} date={item.date}/>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default History;
