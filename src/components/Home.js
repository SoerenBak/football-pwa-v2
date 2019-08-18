import React, { Component } from 'react'
import Transfers from "./Transfers.js";
import Header from "./Header.js";
import CreateTransfers from "./CreateTransfers.js";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Offline, Online } from "react-detect-offline";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "Transfer",
            date: "12-12-2012",
            transfers: [],
            status: ""
        }
        this.sendNoti = this.sendNoti.bind(this);
    }

    //Localhosts
    // http://localhost:9090/getTrans
    // http://localhost:9090/createTrans
    // http://localhost:9090/api/push_message
    

    componentDidMount() {
        fetch('http://localhost:9090/getTrans')
            .then(response => response.json())
            .then(data => this.setState({ transfers: data }))
    }

 
    addTransfers(date, text ) {
    fetch('http://localhost:9090/createTrans', {
        method: 'POST',
        body: JSON.stringify({
            text: text,
            date: date
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      fetch('http://localhost:9090/api/push_message', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                text: text,
                date: date
            }),
        }).catch(error => console.error(error));

    }

    sendNoti(text) {
        fetch('http://localhost:9090/api/push_message', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                text: text,
            }),
        }).catch(error => console.error(error));
    }

    render() {

        return (
            <Router>
                <React.Fragment>
                    <Switch>
                        <Route exact path={"/"}
                            render={(props) =>
                                <React.Fragment>
                                    <div className="wrapper">
                                        <div id="content">
                                            <Header></Header>                                            
                                            <div className="col-ld-12">
                                                <div className="container">
                                                    <div className="card">
                                                    <div>
                                                        <Online></Online>
                                                        <Offline><h3 className="connection">Your connection status is currently offline</h3></Offline>
                                                    </div>   
                                                        <h1>Football Transfer News</h1>
                                                            <h2>Mainly News from Arsenal FC.</h2>
                                                            <br></br>
                                                            <h2>About</h2>
                                                                <p>This site makes it possible to get notifications when a transfer happens.<br></br>The PWA is downloadable.<br></br>It is possible to use the site offline.</p>
                                                            <h2>Notifications</h2> 
                                                                <p>To get notifications you need to <i>turn on and allow notifications.</i></p>      
                                                                <a href="/transfers" ><button className="btn btn-danger center-block">Go to Transfers</button></a>                                                             
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </React.Fragment>
                            }
                        />
                        <Route exact path={"/Transfers"}
                            render={(props) =>
                                <React.Fragment>  
                        <div className="wrapper">
                            <div id="content">                           
                                <Transfers {...props} transfers={this.state.transfers} />    
                                <CreateTransfers {...props} addTransfers={this.addTransfers}></CreateTransfers>                         
                            </div>
                        </div>                                     
                            </React.Fragment>      
                                }
                        />
                    </Switch>
                </React.Fragment>
            </Router>
        )
    }
}
