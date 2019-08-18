import React, { Component } from 'react'

export default class HeaderInclude extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
    this.logout = this.logout.bind(this);
  }

  logout() {
    localStorage.setItem("loggedIn", "")
    localStorage.setItem("username", "")
  }

  componentDidMount() {
    window.minGlobal()
  }


  render() {
    return (
      <React.Fragment>

        <button type="button" id="sidebarCollapse" className="btn main-background btn-toggle">
          <i className="fas fa-align-left"></i>
        </button>
        <nav id="sidebar">
          <div id="dismiss">
            <i className="fas fa-arrow-left"></i>
          </div>

          <div className="sidebar-header">
            <h3>Football transfer app</h3>
          </div>

          <ul className="list-unstyled components">
            <li>
              <a href="/"><i className="fas fa-home icon-nav"></i>Home</a>
            </li>
            <li>
              <a href="/transfers"><i className="fas fa-random icon-nav"></i>Transfers</a>
            </li>
          </ul>

          <ul className="list-unstyled CTAs">
            <li>
              <a onClick={this.logout} href="/" className="download">Logout</a>
            </li>
            <li className="text-center">
              <img src="./images/site/logo.png" className="logo"></img>
            </li>
            <li className="text-center">
              <img src="./images/site/adidas.png" className="logo-adidas"></img>
            </li>
            <li className="text-center">
              <img src="./images/site/fly.png" className="logo-fly"></img>
            </li>
            <li className="official"> 
              <a href="www.arsenal.com" className="">www.arsenal.com</a>
            </li>


          </ul>
        </nav>
      </React.Fragment>
    )

  }

}