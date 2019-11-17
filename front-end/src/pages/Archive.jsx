import React, {Component} from 'react';
import SideBar from "../SideBar";
import {Redirect} from 'react-router-dom';
import { Icon, InlineIcon } from '@iconify/react';
import piggyBank from '@iconify/icons-fa-solid/piggy-bank';
import checkIcon from '@iconify/icons-foundation/check';
import xIcon from '@iconify/icons-foundation/x';

class Archive extends Component{
    constructor(props){
        super(props);
        this.state = {
            redirect: false
        }
    }
    componentWillMount() {
        if(sessionStorage.getItem("userData")){
            console.log("Call user feed");
        }
        else{
            this.setState({redirect: true});
        }
    }
    render(){
        if(this.state.redirect){
            return (<Redirect to={'/signup'}/>)
        }
        return(
            <div id={"viewport"}>
                <SideBar/>
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
                                    <th scope="col">Plano rūšis</th>
                                    <th scope="col">Užšaldyta</th>
                                    <th scope="col">Ar sutaupyta?</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
								<span className="plan plan-in-archive">
                                     <Icon className="iconify icon-in-archive" icon={piggyBank} />
                                     <span className="euro">&euro;</span>
                                     <span style={{marginRight: '0.5em'}}>550</span>
								</span>
                                    </td>
                                    <td>Pirmas planas</td>
                                    <td>28/10/2019</td>
                                    <td>
                                        <Icon icon={checkIcon} color="#00cf95" width="2em" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className="plan plan-in-archive">
									        <Icon className="iconify icon-in-archive" icon={piggyBank} />
                                            <span className="euro">&euro;</span>
                                            <span style={{marginRight: '0.5em'}}>223</span>
								        </span>
                                    </td>
                                        <td>Antras planas</td>
                                        <td>28/10/2019</td>
                                        <td>
                                            <Icon icon={xIcon} color="#CF2E00" width="2em" />
                                        </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className="plan plan-in-archive">
									        <Icon className="iconify icon-in-archive" icon={piggyBank} />
                                            <span className="euro">&euro;</span>
                                            <span style={{marginRight: '0.5em'}}>50</span>
								        </span>
                                    </td>
                                        <td>Antras planas</td>
                                        <td>28/10/2019</td>
                                        <td>
                                            <Icon icon={checkIcon} color="#00cf95" width="2em" />
                                        </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
export default Archive;
