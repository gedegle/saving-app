import {Modal} from "react-bootstrap";
import {Icon} from "@iconify/react";
import shallowPanOfFood from "@iconify/icons-emojione-monotone/shallow-pan-of-food";
import houseIcon from "@iconify/icons-si-glyph/house";
import shirtIcon from "@iconify/icons-ion/shirt";
import cellphoneWireless from "@iconify/icons-mdi/cellphone-wireless";
import trainCar from "@iconify/icons-mdi/train-car";
import buddiconsActivity from "@iconify/icons-dashicons/buddicons-activity";
import documentsSharp from "@iconify/icons-ion/documents-sharp";
import outlineMore from "@iconify/icons-ic/outline-more";
import React, {Component} from "react";
import TypesFactory from "./TypesFactory";
var typesFactory =new TypesFactory();

class ModalNewPost extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            typeId: null,
            sum: 0
        }
        this.changeId = this.changeId.bind(this);
        this.changeTypeId = this.changeTypeId.bind(this);
        this.handleSumChange = this.handleSumChange.bind(this);
        this.handleOnClickType = this.handleOnClickType.bind(this);
        this.changeType = this.changeType.bind(this);

    }
    changeId (x) {
        this.setState({
            id: x
        })
    }
    changeTypeId(x) {
        this.setState({
            typeId: x
        })
        sessionStorage.setItem("typeId", x);

    }
    changeType(x) {
        let temp;
        if(x === "entertainment"){
            temp = "Pramogos"
        } else if(x === "bills" ){
            temp = "Mokesčiai"
        } else temp = "Kita"

        this.setState({
            typeId: temp
        });
        sessionStorage.setItem("typeId", temp);
    }
    handleOnClickType(x) {
        this.changeId(x);
        this.changeType(x);
    }
    handleSumChange (evt){
        this.setState({
            sum: evt.target.value
        });
    };

    render() {
        let typeId =this.state.id;
        return (
            <div>
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
                    } onClick={()=>this.handleOnClickType("entertainment")}>
                        <Icon className="iconify categ-icons" icon={buddiconsActivity} />
                        <span id={"pramogos"} className="categ-lbl">Pramogos</span>
                    </div>
                    <div className={
                        this.state.id && this.state.id === "bills" ? 'categ-grid categ-grid-active' : 'categ-grid'
                    }  onClick={()=>this.handleOnClickType("bills")}>
                        <Icon className="iconify categ-icons" icon={documentsSharp} />
                        <span id={"mokesciai"} className="categ-lbl">Mokesčiai</span>
                    </div>
                    <div className={
                        this.state.id && this.state.id === "other" ? 'categ-grid categ-grid-active' : 'categ-grid'
                    }  onClick={()=>this.handleOnClickType("other")}>
                        <Icon className="iconify categ-icons" icon={outlineMore} />
                        <span id={"kita"} className="categ-lbl">Kita</span>
                    </div>
                </div>
                {typeId && typesFactory.getTypes().map((item)=>(
                        <div id={item.name} className="categ-things">
                            {typeId == item.name && typesFactory.getSubtypes().map((i)=>(
                                <div>
                                {typeId == i.typeName  ? <div className={
                                        this.state.typeId && item.name === i.typeName && this.state.typeId === i.tname ? 'categ-thing categ-thing-active' : 'categ-thing'} onClick={()=>this.changeTypeId(i.tname)}>
                                        <Icon className="iconify thing-icon" icon={i.icon} />
                                        <div className="thing-lbl">{i.tname}</div>
                                </div> : ''}
                                </div>
                            ))}
                        </div>
                    ))}
                <div className={"price-wrapper"}><label className="price-lbl">Suma</label></div>
                <input className="price-inp" type="number" onChange={this.props.getSumInput} placeholder="pvz. 55.7"/>
            </div>
        )
    }
}
export default ModalNewPost;
