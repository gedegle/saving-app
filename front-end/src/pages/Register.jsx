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
        };

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onPasswordChange2 = this.onPasswordChange2.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.signup = this.signup.bind(this);
    }
    componentWillUnmount(){
        document.body.style.backgroundColor = null;
    }
    componentDidMount() {
        document.body.style.backgroundColor = "white";
    }
    validatePassword(e) {
        if(this.state.password !== e.target.value) {
            e.target.setCustomValidity("Slaptažodžiai nesutampa");
        } else {
            e.target.setCustomValidity('');
        }
    }
    signup = evt => {
        evt.preventDefault();
        let email = document.getElementById('email');

        if(this.state.name && (this.state.password === this.state.password2) && this.state.email) {
            axios.post('http://localhost:8000/api/register', {
                    name: this.state.name,
                    password: this.state.password,
                    email: this.state.email,
                    password_confirmation: this.state.password2
                })
                .then(response => {
                    this.setState({redirect: true});
                    sessionStorage.setItem('userData',JSON.stringify(response.data));
                })
                .catch(error => {
                    if(error.response.status === 422) {
                        email.setCustomValidity('Paskyra su tokiu el. paštu jau egzistuoja');
                    } else email.setCustomValidity('');
                });
        }

    };

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
        });

        this.validatePassword(e);
    }
    onEmailChange(e){
        this.setState({
            email: e.target.value
        });

        e.target.setCustomValidity('');
    }

    render() {
        if(this.state.redirect || sessionStorage.getItem('userData')){
            return (<Redirect to={'/new-plan'}/>)
        }
        return(
            <div className="viewport" id={"viewportRegister"}>
                <div className="photo-side">
                    <img id="back-img" src={PiggyBankPic} alt={"piggy bank"} className="animated bounce infinite"/>
                </div>
                <div>
                    <div className="sign-up-side">
                        <img id="piggy" alt={"pink piggy bank"} src={Piggy}/>
                            <div className="signup-lbl">PRISIJUNK</div>
                            <div className="signup-lbl-smaller">Užsiregistruokite ir pradėkite taupyti</div>
                            <div className="inputs">
                                <form onSubmit={this.signup}>
                                <input className="input" type="text" name={"name"} value={this.state.name} onChange={this.onNameChange} required placeholder="Vardas"/>
                                <input id={"email"} className="input" type="email" name={"email"} value={this.state.email} onChange={this.onEmailChange} required placeholder="El. Paštas"/>
                                <input className="input" type="password" minLength="8" name={"password"} value={this.state.password} onChange={this.onPasswordChange} required placeholder="Slaptažodis"/>
                                <input className="input" type="password" minLength="8" name={"password2"} value={this.state.password2} onChange={this.onPasswordChange2} required placeholder="Pakartoti slaptažodį"/>
                                <button id="register-btn" type={"submit"}>Užsiregistruoti</button>
                                </form>
                            </div>
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
