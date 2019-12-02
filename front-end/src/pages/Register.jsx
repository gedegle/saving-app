import React, {Component} from 'react';
import PiggyBankPic from "../pictures/taupykle2.jpg";
import Piggy from "../pictures/piggy.png";

import {Redirect} from 'react-router-dom';
import axios from "axios";
import { Link } from 'react-router-dom';

let loginPath = "/login";

class Register extends Component{
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            password: '',
            password2: '',
            email: '',
            redirect: false
        }
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onPasswordChange2 = this.onPasswordChange2.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.signup = this.signup.bind(this);
    }
    componentWillUnmount(){
        document.body.style.backgroundColor = null;
    }
    componentDidMount() {
        document.body.style.backgroundColor = "white";

        /*axios.get('http://piggy-bank.com/api/users')
            .then(res =>{
                console.log("Nuskaityta")
               // this.setState({allUsers: res.data.data});
            })
            .catch(error => {
                console.log(error.response)
            });*/
    }
    signup(){
        if(this.state.name && (this.state.password === this.state.password2) && this.state.email) {
            axios.post('http://piggy-bank.com/api/register', {
                    name: this.state.name,
                    password: this.state.password,
                    email: this.state.email,
                    password_confirmation: this.state.password2
                })
                .then(response => {
                    console.log('from handle submit', response);
                    this.setState({redirect: true});
                    sessionStorage.setItem('userData',JSON.stringify(response.data));
                })
                .catch(error => {
                    console.log(error.response)
                });
        }

    }
    onNameChange(e){
        this.setState({
            name: e.target.value
        })
    }
    onPasswordChange(e){
        this.setState({
            password: e.target.value
        })
    }
    onPasswordChange2(e){
        this.setState({
            password2: e.target.value
        })
    }
    onEmailChange(e){
        this.setState({
            email: e.target.value
        })
    }

    render() {
        if(this.state.redirect || sessionStorage.getItem('userData')){
            return (<Redirect to={'/home'}/>)
        }
        return(
            <div className="viewport" id={"viewportRegister"}>
                <div className="photo-side">
                    <img id="back-img" src={PiggyBankPic} className="animated bounce infinite"/>
                </div>
                <div>
                    <div className="sign-up-side">
                        <img id="piggy" src={Piggy}/>
                            <div className="signup-lbl">PRISIJUNK</div>
                            <div className="signup-lbl-smaller">Užsiregistruokite ir pradėkite taupyti</div>
                            <div className="inputs">
                                <input className="input" type="text" onChange={this.onNameChange} required placeholder="Vardas"/>
                                <input className="input" type="email" onChange={this.onEmailChange}required placeholder="El. Paštas"/>
                                <input className="input" type="password" onChange={this.onPasswordChange} required placeholder="Slaptažodis"/>
                                <input className="input" type="password" onChange={this.onPasswordChange2} required placeholder="Pakartoti slaptažodį"/>
                                </div>
                            <button id="register-btn" type={"submit"} onClick={this.signup}>Užsiregistruoti</button>
                            <div>
                                <div className="have-acc">Turite paskyrą?
                                    <Link to={loginPath} >
                                        <span className="sign-in">Prisijungti</span>
                                    </Link>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Register;
