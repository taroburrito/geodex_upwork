import React, {Component} from 'react';
var ReactToastr = require("react-toastr");
var {ToastContainer} = ReactToastr; // This is a React Element.
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);


export default class Alert extends Component {
  constructor(props) {
    super(props);
    this.addAlert = this.addAlert.bind(this);
  }

  componentDidMount(){
    this.addAlert("",this.props.message);
  }

  addAlert (title,message) {
     this.refs.alert_container.error(
      message,
      title, {
      timeOut: 3000,
      extendedTimeOut: 1000
    });
  }

  render(){
    return(
      <ToastContainer
         ref="alert_container"
         toastMessageFactory={ToastMessageFactory}
         className="toast-top-right"

          />
    )
  }
}
