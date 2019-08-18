import React, { Component } from 'react'

export default class NewTransfer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      text: "",
      date: ""
    }

    this.handleTransfersInput = this.handleTransfersInput.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }

  onChangeText(event) {
    this.setState({
      text: event.target.value
    })
  }

  handleTransfersInput(event) {
    event.preventDefault()
    this.props.addTransfers(this.state.date = Date.now, this.state.text);
  }


  render() {
    return (
      <React.Fragment>

        <div class="container">
            <div class="col-lg-12">
              <form class="custom-form">
                <h2 class="center">New Transfer</h2>
                <div className="form-group col-lg-12">

                <label>Text</label>
                  <input type="text" onChange={this.onChangeText} className="form-control" id="text" placeholder="Enter text here..."></input>
                </div>

                <button onClick={this.handleTransfersInput}
                  type="submit" id="submitButton" className="btn btn-danger"> Create Transfer
                </button>

              </form>
            </div>
        </div>
      </React.Fragment>
    )
  }
}