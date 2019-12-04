import React, {Component} from 'react';
import PiggyBankPic from "../pictures/taupykle2.jpg";
import Piggy from "../pictures/piggy.png";

import {Redirect} from 'react-router-dom';
import axios from "axios";

class Login extends Component{
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            email: '',
            redirect: false,
            allPlans: ''
        }
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.login = this.login.bind(this);

    }
    componentDidMount(){
        document.body.style.backgroundColor = "white";
    }
    componentWillUnmount(){
        document.body.style.backgroundColor = null;
    }

    login(){
        if(this.state.password && this.state.email) {
            axios.post('http://localhost:8000/api/login', {
                password: this.state.password,
                email: this.state.email
            })
                .then(response => {
                    console.log('from handle submit', response);
                    this.setState({redirect: true});
                    sessionStorage.setItem('userData',JSON.stringify(response.data.data));

                })
                .catch(error => {
                    console.log(error.response)
                });
        }

    }

    onPasswordChange(e){
        this.setState({
            password: e.target.value
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
                    <img id="back-img" src={PiggyBankPic} alt={"piggy bank"} className="animated bounce infinite"/>
                </div>
                <div>
                    <div className="sign-up-side">
                        <img id="piggy" alt={"pink piggy bank"} src={Piggy}/>
                        <div className="signup-lbl" style={{marginBottom: "10%"}}>PRISIJUNK</div>
                        <div className="inputs">
                            <input className="input" type="email" onChange={this.onEmailChange}required placeholder="El. Paštas"/>
                            <input className="input" type="password" onChange={this.onPasswordChange} required placeholder="Slaptažodis"/>
                        </div>
                        <button id="register-btn" type={"submit"} onClick={this.login}>Prisijungti</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login;
