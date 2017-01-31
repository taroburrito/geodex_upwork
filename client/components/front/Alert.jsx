import React, {Component} from 'react';
var ReactToastr = require("react-toastr");
var {ToastContainer} = ReactToastr; // This is a React Element.
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);


export default class Alert extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <ToastContainer
         ref="container"
         toastMessageFactory={ToastMessageFactory}
         className="toast-top-right"

          />
    )
  }
}
