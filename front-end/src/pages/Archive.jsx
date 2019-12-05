import React, {Component} from 'react';
import SideBar from "../SideBar";
import {Redirect} from 'react-router-dom';
import { Icon } from '@iconify/react';
import piggyBank from '@iconify/icons-fa-solid/piggy-bank';
import axios from "axios";
import ActivePlansSingleton from "../ActivePlansSingleton";
import IconProxy from "../IconProxy";

var iconProxy = new IconProxy();

const activePlans =ActivePlansSingleton.getInstance();

function DisplayArchiveRows(props){
    return (
        <tr>
            <td>
                <span className="plan plan-in-archive">
                    <Icon className="iconify icon-in-archive" icon={piggyBank} />
                    <span className="euro">&euro;</span>
                    <span style={{marginRight: '0.5em'}}>{props.sum}</span>
				</span>
            </td>
            <td>{props.edited}</td>
            <td className={"archive-status-icon"}>
                {iconProxy.getIcon(props.ifSaved)}
            </td>
        </tr>
    )
}

class Archive extends Component{
    constructor(props){
        super(props);
        this.state = {
            redirect: false,
            url: 'http://localhost:8000/api/plans-all'
        }
    }
    componentDidMount() {
        if(!sessionStorage.getItem("userData")) this.setState({redirect: true});
        else {
            let tempArr = [];
            axios.get(this.state.url)
                .then(res =>{
                    res.data.data.forEach((x)=>{
                        if(x.user_id == JSON.parse(sessionStorage.getItem("userData")).id){
                            if(x.status == 0) tempArr.push(x);
                        }
                    })
                    this.setState({
                        archive: tempArr
                    })
                })
                .catch(error => {
                    console.log(error.response)
                });
        }

    }

    render(){
        if(this.state.redirect){
            return (<Redirect to={'/signup'}/>)
        }
        return(
            <div id={"viewport"}>
                <SideBar activePlans={JSON.parse(sessionStorage.getItem("activePlans"))}/>
                <div className="biggest-bubble">
                </div>
                <div id="dashboard">
                    <div id="archive-list-view">
                        <div id="archive-viewport">
                            <h3 className="list-h3">Archyvas
                                <span style={{fontWeight: 400, fontSize: '1rem', marginLeft: '1rem'}}>Visų turėtų planų archyvas</span>
                            </h3>
                            <table className="table">
                                <thead className="thead-light">
                                <tr>
                                    <th scope="col">Planas</th>
                                    <th scope="col">Užšaldyta</th>
                                    <th scope="col">Ar sutaupyta?</th>
                                </tr>
                                </thead>
                            </table>
                            <div className={"table-wrapper"}>
                            <table className="table">
                                <tbody>
                                {this.state.archive && this.state.archive.map((item)=>(
                                    <DisplayArchiveRows sum={item.sum} edited={item.updated_at} ifSaved={item.if_saved}/>
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
export default Archive;
