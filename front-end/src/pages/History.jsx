import React, {Component} from 'react';
import SideBar from "../SideBar";
import {Redirect} from 'react-router-dom';
import { Icon, InlineIcon } from '@iconify/react';
import meatOnBone from '@iconify/icons-emojione-monotone/meat-on-bone';
import pencilIcon from '@iconify/icons-foundation/pencil';
import fastFoodSharp from '@iconify/icons-ion/fast-food-sharp';
import trashIcon from '@iconify/icons-si-glyph/trash';
import foodCroissant from '@iconify/icons-mdi/food-croissant';

class History extends Component{
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
    render() {
        if(this.state.redirect){
            return (<Redirect to={'/signup'}/>)
        }
        return (
            <div id={"viewport"}>
                <SideBar/>
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
                                <tr>
                                    <td>
                                        <Icon  className="iconify list-cat-icon" icon={meatOnBone} />
                                        <span style={{verticalAlign: "1rem"}}>Maisto produktai</span>
                                    </td>
                                    <td>5.89 <span className="euro">&euro;</span></td>
                                    <td>28/10/2019</td>
                                    <td>
                                        <Icon className="edit-btn" icon={pencilIcon} />
                                        <span style={{borderLeft: "1px solid #dee2e6", padding: "1.5em 0 1.5em 0.7em"}}/>
                                        <Icon className="remove-btn" icon={trashIcon} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Icon className="iconify list-cat-icon" icon={fastFoodSharp} />
                                        <span style={{verticalAlign: "1rem"}}>Greitas maistas</span></td>
                                    <td>5.89 <span className="euro">&euro;</span></td>
                                    <td>28/10/2019</td>
                                    <td>
                                        <Icon className="edit-btn" icon={pencilIcon} />
                                        <span style={{borderLeft: "1px solid #dee2e6", padding: "1.5em 0 1.5em 0.7em"}}/>
                                        <Icon className="remove-btn" icon={trashIcon} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Icon className="iconify list-cat-icon" icon={foodCroissant} />
                                        <span style={{verticalAlign: "1rem"}}>Saldumynai</span>
                                    </td>
                                    <td>5.89 <span className="euro">&euro;</span></td>
                                    <td>28/10/2019</td>
                                    <td>
                                        <Icon className="edit-btn" icon={pencilIcon} />
                                        <span style={{borderLeft: "1px solid #dee2e6", padding: "1.5em 0 1.5em 0.7em"}}/>
                                        <Icon className="remove-btn" icon={trashIcon} />
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
export default History;
