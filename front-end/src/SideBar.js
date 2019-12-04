import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import adminSettings from '@iconify/icons-dashicons/admin-settings';
import plusIcon from '@iconify/icons-dashicons/plus';
import archiveIcon from '@iconify/icons-fa-solid/archive';
import piggyBank from '@iconify/icons-fa-solid/piggy-bank';
import logoutVariant from '@iconify/icons-mdi/logout-variant';
import userPic from "./pictures/user-pic.jpg";

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
function ReturnActivePlans(props){
    return (
        <li className="plan">
            <Icon className="iconify" icon={piggyBank} />
            <span className="euro">&euro;</span><span>{props.sum}</span>
        </li>
    )
}
function SideBar(props) {
    let activePlans = JSON.parse(sessionStorage.getItem("activePlans"));

        return (
            <div id="side-nav">
            <div className="inside">
                <div className="top-side-bar">
                    <div>
                        <Link to={mainViewPath}>
                            <span className="saving-lbl">TAUPYKLĖ</span>
                        </Link>
                        <img id="user-photo" src={userPic} alt="user"/>
                    </div>
                </div>
                <div className="lign"/>
                <ul id="plans">
                    {activePlans && activePlans.length > 0 && activePlans.map((item)=>(
                        <ReturnActivePlans sum={item.sum} id={item.id}/>
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
                <LogOut />
            </div>
        </div>

    )
}

export default SideBar;
