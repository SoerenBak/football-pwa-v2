import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Login from './components/Login.js'
import Home from './components/Home.js'
import './App.css';
require('dotenv').config()
var store = require('store')

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            HomeButtonTransfers: <button> TRANSFERS </button>,
            user: null,
            text: "Transfer",
            date: "12-12-2012",
            isLoggedIn: "",
            username: "",
            password: "",
            loggedIn: false
            
        };
    }
    
    componentDidMount() {
        if (!localStorage.getItem("loggedIn")) {
            localStorage.setItem("loggedIn", "")
        }     
    }

    render() {
        if (!localStorage.getItem("loggedIn")) {
            localStorage.setItem("loggedIn", "")
        }   
        if(localStorage.getItem("loggedIn").length == 0) {         
            return (<Login />)
        }
        return ((<Home />))        
    }
}

export default App;