import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { IoIosLock } from 'react-icons/io';
import { IoMdPerson } from 'react-icons/io';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email: "",
            username:"",
            password: "",
            loggedIn: false
        }        
    }

    login(e) {
        fetch('http://localhost:9090/login', {
      method: 'POST',
      body: JSON.stringify({
        username: this.state.email,
        password: this.state.password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
        localStorage.setItem("loggedIn", "yes")
        localStorage.setItem("username", this.state.username)
    }


    handleChange(e) {
        this.setState({
            username: e.target.value
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="bodyDiv">
                    <div className="session">
                        <form onSubmit={this.login} className="log-in" autocomplete="off">
                            <div className="floating-label">
                                <input type="text"  onChange={this.handleChange} placeholder="Email"  id="username" />
                                <label htmlFor="email">email:</label>
                                <div className="icon">
                                    <IoMdPerson></IoMdPerson>
                                </div>
                            </div>
                            <div className="floating-label">
                                <input  placeholder="Password" type="password" id="password" />
                                <label htmlFor="password">Password:</label>
                                <div className="icon">
                                    <IoIosLock></IoIosLock>
                                </div>
                            </div>
                            <button type="submit">Log in</button>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}