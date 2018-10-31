import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            netID: '',
            role: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps);
    }

    handleClick(event, role) {
        var apiBaseUrl = "http://chenzhu2.web.illinois.edu/";
        //var apiBaseUrl = "http://localhost:3001/"
        console.log("values in register handler", role);
        var self = this;
        //To be done:check for empty values before hitting submit
        if (this.state.first_name.length > 0 && this.state.last_name.length > 0 && this.state.email.length > 0 && this.state.password.length > 0) {
            var payload = {
                "first_name": this.state.first_name,
                "last_name": this.state.last_name,
                "email": this.state.email,
                "password": this.state.password,
                "role": role,
                "netID": this.state.netID
            };
            axios.post(apiBaseUrl + 'users/register', payload)
                .then(function (response) {
                    console.log(response);
                    if (response.status === 201) {
                        console.log("registration successfull");
                        alert("registration successful!");
                        var loginscreen = [];
                        loginscreen.push(<Login parentContext={this} appContext={self.props.appContext} role={role}/>);
                        var loginmessage = "Not Registered yet? Go to registration";
                        self.props.parentContext.setState({
                            loginscreen: loginscreen,
                            loginmessage: loginmessage,
                            buttonLabel: "Register",
                            isLogin: true
                        });
                    }
                    else {
                        console.log("some error ocurred", response.statusText);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        else {
            alert("Input field value is missing");
        }

    }

    render() {
        // console.log("props",this.props);
        var userhintText, userLabel;
        userhintText = "Enter your Illinois email";
        userLabel = "email";
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Register"
                        />
                        <TextField
                            type="netID"
                            hintText="Enter your netID"
                            floatingLabelText="netID"
                            onChange={(event, newValue) => this.setState({netID: newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter your First Name"
                            floatingLabelText="First Name"
                            onChange={(event, newValue) => this.setState({first_name: newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter your Last Name"
                            floatingLabelText="Last Name"
                            onChange={(event, newValue) => this.setState({last_name: newValue})}
                        />
                        <br/>
                        <TextField
                            hintText={userhintText}
                            floatingLabelText={userLabel}
                            onChange={(event, newValue) => this.setState({email: newValue})}
                        />
                        <br/>
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange={(event, newValue) => this.setState({password: newValue})}
                        />
                        <br/>

                        <RaisedButton label="Submit" primary={true} style={style}
                                      onClick={(event) => this.handleClick(event, this.props.role)}/>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

const style = {
    margin: 15,
};

export default Register;