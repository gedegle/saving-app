import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import adminSettings from '@iconify/icons-dashicons/admin-settings';
import plusIcon from '@iconify/icons-dashicons/plus';
import archiveIcon from '@iconify/icons-fa-solid/archive';
import piggyBank from '@iconify/icons-fa-solid/piggy-bank';
import logoutVariant from '@iconify/icons-mdi/logout-variant';
import {Redirect} from 'react-router-dom';

let newPlanPath = "/new-plan";
let archivePath = "/archive";
let mainViewPath = "/home";

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
        }
        this.changeThisPlanId = this.changeThisPlanId.bind(this);
    }
    changeThisPlanId(){
        sessionStorage.setItem("thisPlanId", this.props.i);
        this.setState({
            redirect: true
        })
    }
    render() {
        console.log()
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
function SideBar(props) {
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
                    {props.activePlans && props.activePlans.length > 0 && props.activePlans.map((item)=>(
                        <div>
                        {item.id === JSON.parse(sessionStorage.getItem("thisPlanId")) ? <ReturnActivePlans class={"plan active-plan"} i={item.id} sum={item.sum} id={item.id}/> :
                                <ReturnActivePlans class={"plan"} i={item.id} sum={item.sum} id={item.id}/>}
                        </div>
                    ))}
                </ul>
                <div className="btn-group">
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
                    <div className="btn-side settings" type="button">
                        <Icon className="iconify sett conf" icon={adminSettings} />
                        Nustatymai
                    </div>
                </div>
                <div className={"logoutWrapper"}>
                <LogOut />
                </div>
            </div>
        </div>

    )
}

export default SideBar;
