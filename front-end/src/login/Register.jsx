import React, {Component} from 'react';
import PiggyBankPic from "../pictures/taupykle2.jpg";
import Piggy from "../pictures/piggy.png";

class Register extends Component{
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            password: '',
            password2: '',
            email: ''
        }
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onPasswordChange2 = this.onPasswordChange2.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
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
        return(
            <div className="viewport">
                <div className="photo-side">
                    <img id="back-img" src={PiggyBankPic} className="animated bounce infinite"/>
                </div>
                <div>
                    <div className="sign-up-side">
                        <img id="piggy" src={Piggy}/>
                            <div className="signup-lbl">PRISIJUNK</div>
                            <div className="signup-lbl-smaller">Užsiregistruokite ir pradėkite taupyti</div>
                        <form method="post" action="">
                            <div className="inputs">
                                <input className="input" type="text" onChange={this.onNameChange} required placeholder="Vardas"/>
                                <input className="input" type="email" onChange={this.onEmailChange}required placeholder="El. Paštas"/>
                                <input className="input" type="password" onChange={this.onPasswordChange} required placeholder="Slaptažodis"/>
                                <input className="input" type="password" onChange={this.onPasswordChange2} required placeholder="Pakartoti slaptažodį"/>
                                </div>
                            <button id="register-btn" type="submit">Užsiregistruoti</button>
                            </form>
                            <div>
                                <div className="have-acc">Turite paskyrą?
                                    <span className="sign-in">Prisijungti</span>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Register;
