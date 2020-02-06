import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import adminSettings from '@iconify/icons-dashicons/admin-settings';
import plusIcon from '@iconify/icons-dashicons/plus';
import archiveIcon from '@iconify/icons-fa-solid/archive';
import piggyBank from '@iconify/icons-fa-solid/piggy-bank';
import logoutVariant from '@iconify/icons-mdi/logout-variant';
import pencilIcon from '@iconify/icons-foundation/pencil';
import {Redirect} from 'react-router-dom';
import userPic from "./pictures/user.svg";
import axios from "axios";
import outlineArrowBackIos from '@iconify/icons-ic/outline-arrow-back-ios';


let newPlanPath = "/new-plan";
let archivePath = "/archive";
let mainViewPath = "/home";

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state={
            display: false,
            name: "",
            email: "",
            urlEmail: "http://localhost:8000/api/user/update",
            urlPass: "http://localhost:8000/api/user/update-pass"
        };

        this.handleEmailEdit = this.handleEmailEdit.bind(this);
        this.handlePassEdit = this.handlePassEdit.bind(this);
        this.handleClickEditEmail = this.handleClickEditEmail.bind(this);
        this.handleClickEditPass = this.handleClickEditPass.bind(this);
        this.displayProfileSettings = this.displayProfileSettings.bind(this);
    }
    componentDidMount() {
        if(sessionStorage.getItem("userData")) {
            this.setState({
                name: JSON.parse(sessionStorage.getItem("userData")).name,
                email: JSON.parse(sessionStorage.getItem("userData")).email
            })
        }
    }

    handleEmailChange = (evt) => {
        this.setState({
            newEmail: evt.target.value
        })
    };

    handlePassChange = (evt) => {
        this.setState({
            newPass: evt.target.value
        })
    };

    handleEmailEdit(){
        if(sessionStorage.getItem("userData")) {
            axios.put(this.state.urlEmail, {
                id: JSON.parse(sessionStorage.getItem("userData")).id,
                email: this.state.newEmail
            })
                .then(res => {
                    this.setState({
                        email: this.state.newEmail
                    });

                    this.handleClickEditEmail();
                })
                .catch(error => {
                    console.log(error.response)
                });
        }

    }
    handlePassEdit(){
        if(sessionStorage.getItem("userData")) {
            axios.put(this.state.urlPass, {
                id: JSON.parse(sessionStorage.getItem("userData")).id,
                password: this.state.newPass
            })
                .then(res => {
                    this.handleClickEditPass();
                })
                .catch(error => {
                    console.log(error.response)
                });
        }

    }
    handleClickEditEmail(){
        document.getElementById("email-edit-id").classList.toggle("none");
    }
    handleClickEditPass(){
        document.getElementById("pass-edit-id").classList.toggle("none");
    }
    displayProfileSettings(){
        document.getElementById("user-profile-id").classList.toggle("none");
        document.getElementById("planDisplay").classList.toggle("none");
        document.getElementById("plans").classList.toggle("none");
    }
    render() {
        return (
            <div id={"user-profile-id"} className={"user-profile none"}>
                <div className={"wrapper-settings"}>
                    <Icon onClick={this.displayProfileSettings} style={{cursor: "pointer"}} type="button" icon={outlineArrowBackIos} color="#3C3F41" />
                    <img className={"user-profile-img"} src={userPic} alt={"human profile"}/>
                </div>
                <h2 className={"profile-settings"}>Profilio nustatymai</h2>
                <div className={"settings section"}>
                    <div className={"settings-section-wrapper"}>
                        <div>
                            <label className={"names-of-settings"}>Vardas</label>
                            <div className={"settings-value"}>{this.state.name}</div>
                        </div>
                    </div>
                    <div className={"settings-section-wrapper"}>
                        <div>
                            <label className={"names-of-settings"}>El. paštas</label>
                            <div className={"settings-value email-value"}>{this.state.email}</div>
                        </div>
                        <Icon type="button" className={"edit-btn toggle-button edit-email"} onClick={this.handleClickEditEmail} id="edit-email"
                              icon={pencilIcon}/>
                    </div>
                    <div className={"settings-section-wrapper"}>
                        <div className={"names-of-settings  diff-color-name"}>Keisti slaptažodį</div>
                        <Icon type="button" className={"edit-btn toggle-button edit-pass"} onClick={this.handleClickEditPass} id="edit-email"
                              icon={pencilIcon}/>
                    </div>
                    <div className={"edit-email none"} id={"email-edit-id"}>
                        <label className={"names-of-settings"}>Įveskite el. paštą</label>
                        <input className="inp-sec" onChange={this.handleEmailChange} type="text" placeholder={"pvz. email@email.com"}/>
                        <button type={"submit"} onClick={this.handleEmailEdit} className="submit-settings">Patvirtinti</button>
                    </div>
                    <div className={"edit-password none"} id={"pass-edit-id"}>
                        <label className={"names-of-settings"}>Įveskite naują slaptažodį</label>
                        <input className="inp-sec" onChange={this.handlePassChange} type="password" placeholder={"Slaptažodis"}/>
                        <button type={"submit"} onClick={this.handleDisplay} className="submit-settings">Patvirtinti</button>
                    </div>
                </div>
            </div>
        );
    }
}

function LogOut(){
    function clearSessionStorage() {
        sessionStorage.clear();
        window.location.reload();
    }
    return (
        <div className="logout" type="button" onClick={clearSessionStorage}>
            <Icon className="iconify log" icon={logoutVariant} />
            ATSIJUNGTI
        </div>
    )
}
class ReturnActivePlans extends Component{
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };

        this.changeThisPlanId = this.changeThisPlanId.bind(this);
    }
    changeThisPlanId(){
        sessionStorage.setItem("thisPlanId", this.props.i);
        this.setState({
            redirect: true
        })
    }

    render() {
        if(this.state.redirect) {
            if (window.location.pathname !== mainViewPath)
                return <Redirect to={mainViewPath}/>;
            else window.location.reload();
        }

        return (
            <li className={this.props.class} id={this.props.i} onClick={this.changeThisPlanId}>
                <Icon className="iconify" icon={piggyBank} />
                <span className="euro">&euro;</span><span>{this.props.sum}</span>
            </li>
        )
    }
}
class SideBar extends Component{
    constructor(props) {
        super(props);
        this.state = {

        };

        this.displayProfileSettings = this.displayProfileSettings.bind(this);
    }

    displayProfileSettings(){
        if(document.getElementById("user-profile-id")) {
            document.getElementById("user-profile-id").classList.toggle("none");
            document.getElementById("planDisplay").classList.toggle("none");
            document.getElementById("plans").classList.toggle("none");
        }
    }

    render() {
        return (
            <div id="side-nav">
                <div className="inside">
                    <div className="top-side-bar">
                        <div>
                            <Link to={mainViewPath}>
                                <span className="saving-lbl">TAUPYKLĖ</span>
                            </Link>
                        </div>
                    </div>
                    <div className="lign"/>
                    <ul id="plans">
                        {this.props.activePlans && this.props.activePlans.length > 0 && this.props.activePlans.map((item, i)=>(
                            <div key={i}>
                                {item.id === JSON.parse(sessionStorage.getItem("thisPlanId")) ? <ReturnActivePlans class={"plan active-plan"} i={item.id} sum={item.sum} id={item.id}/> :
                                    <ReturnActivePlans class={"plan"} i={item.id} sum={item.sum} id={item.id}/>}
                            </div>
                        ))}
                    </ul>
                    <UserProfile />
                    <div id={"planDisplay"}  className="btn-group">
                        <Link to={newPlanPath}>
                            <div className="btn-side add-plan" type="button">
                                <Icon className="iconify sett" icon={plusIcon} />
                                Naujas planas
                            </div>
                        </Link>
                        <Link to={archivePath}>
                            <div className="btn-side archive" type="button">
                                <Icon className="iconify sett arch" icon={archiveIcon} />
                                Archyvas
                            </div>
                        </Link>
                        <div className="btn-side settings" type="button" onClick={this.displayProfileSettings}>
                            <Icon className="iconify sett conf" icon={adminSettings} />
                            Nustatymai
                        </div>
                    </div>
                    <div className={"logoutWrapper"}>
                        <LogOut />
                    </div>
                </div>
            </div>

        );
    }
}

export default SideBar;
