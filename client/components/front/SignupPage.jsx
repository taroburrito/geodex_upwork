import React, {Component, PropTypes} from 'react';
import GooglePlacesSuggest from 'react-google-places-suggest'
import Datetime from 'react-datetime'
import { validateEmail, validateDisplayName, validatePassword } from '../../utilities/RegexValidators';
import { attemptSignUp } from '../../actions/AuthActions';
require('react-datetime/css/react-datetime.css');

//import Autocomplete from 'react-google-autocomplete';
//Google map Api key  AIzaSyDdrvniQ-jYHgBr6ENTdsk815jwSERUN3c  //
// Google places AIzaSyCB6cSZOedSN950kc2pczIym6wlD5VgeSo


const initialFormState ={
  longitude: null,
  latitude: null,
};



export default class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.handleOnClickSignUp = this.handleOnClickSignUp.bind(this);
    this.state = {
    search: '',
    selectedCoordinate: initialFormState,
    errorMessage :null,
    gender: null,
    dob:null
    }

    //this.onChange = (address) => this.setState({ address })
  }

  handleSearchChange(e){

    this.setState({ search: e.target.value })
  }

  handleSelectSuggest(suggestName, coordinate){
    this.setState({ search: suggestName, selectedCoordinate: coordinate })
  }

  handleOnClickSignUp(){

    var gender;
    if(this.refs.radio_male.getDOMNode().value){
      gender = this.refs.radio_male.getDOMNode().value;
    }else if (this.refs.radio_female.getDOMNode().value) {
      gender = this.refs.radio_female.getDOMNode().value;
    }else{
      gender = "male";
    }

    var formData = {
      first_name: this.refs.first_name.getDOMNode().value.trim(),
      last_name:  this.refs.last_name.getDOMNode().value.trim(),
      email: this.refs.email.getDOMNode().value.trim(),
      address: this.refs.address.getDOMNode().value.trim(),
      password: this.refs.password.getDOMNode().value.trim(),
      confirm_password: this.refs.confirm_password.getDOMNode().value.trim(),
      dob: this.state.dob,
      gender: this.state.gender,
      longitude: this.state.selectedCoordinate.longitude,
      latitude:this.state.selectedCoordinate.latitude,
    }

    this.findErrorsInSignUpForm(formData);

  }

  setDateofBirth(x){
       var selectedDate = JSON.stringify(x);
       this.setState({dob:selectedDate});
    }

  findErrorsInSignUpForm(formData){

    var newState = this.state.errorMessage;
    if(formData.first_name === ''){
        this.setState({errorMessage:'Please enter first name'});
        this.refs.first_name.getDOMNode().focus();
    }else if (formData.last_name === '') {
      this.setState({errorMessage:'Please enter last name'});
      this.refs.last_name.getDOMNode().focus();
    }else if (formData.email === '') {
      this.setState({errorMessage:'Please enter email'});
      this.refs.email.getDOMNode().focus();
    }else if (!validateEmail(formData.email)) {
      this.setState({errorMessage:'Please enter correct email address'});
      this.refs.email.getDOMNode().focus();
    }
    else if (formData.address === '') {
      this.setState({errorMessage:'Please enter address'});
      this.refs.address.getDOMNode().focus();
    }else if (formData.password === '') {
      this.setState({errorMessage:'Please enter Password'});
      this.refs.password.getDOMNode().focus();
    }else if (!validatePassword(formData.password)) {
      this.setState({errorMessage:'Your password must contain at least 6 valid characters'});
      this.refs.password.getDOMNode().focus();
    }else if (formData.confirm_password === '') {
      this.setState({errorMessage:'Please enter confirm password'});
      this.refs.confirm_password.getDOMNode().focus();
    }else if (formData.confirm_password != formData.password) {
      this.setState({errorMessage:'Password and confirm password does not match'});
      this.refs.confirm_password.getDOMNode().focus();
    }
    else if (this.state.dob === null) {
      this.setState({errorMessage:'Please enter date of birth'});
    }else{
      this.setState({errorMessage:null});
      //dispatch(attemptSignUp(formData));
      this.props.onClickSignUp(formData);

    }

  }
  selsectGender(e){
    this.setState({gender:e.target.value});
  }

  render(){
    const { search } = this.state;
    var errorLabel;
    if(this.state.errorMessage){
      errorLabel =(<div className="uk-alert uk-alert-danger">
          <p>{this.state.errorMessage}</p>
        </div>);
    }
    return(
      <div id="signup" className="uk-modal geo_modals">
       <div className="uk-modal-dialog">
          <button type="button" className="uk-modal-close uk-close"></button>
          <div className="uk-modal-header">
              <h2>Signup Now</h2>
          </div>
          {errorLabel}
         <form className="uk-form">
           <div className="uk-grid uk-grid-small">
             <div className="uk-width-small-1-2">
                    <input className="uk-width-1-1 uk-form-large" placeholder="First name" type="text" ref="first_name"/>
             </div>
                <div className="uk-width-small-1-2">
                    <input className="uk-width-1-1 uk-form-large" placeholder="Last name" type="text" ref="last_name"/>
                </div>
              </div>

               <GooglePlacesSuggest onSelectSuggest={ this.handleSelectSuggest.bind(this) } search={ search }>
                  <input className="uk-width-1-1 uk-form-large" type="text" ref="address" value={ search } placeholder="Search a location" onChange={ this.handleSearchChange.bind(this) }/>
                  <input type="hidden" value={this.state.selectedCoordinate?this.state.selectedCoordinate.latitude:''} ref="latitude"/>
                  <input type="hidden" value={this.state.selectedCoordinate?this.state.selectedCoordinate.longitude:''} ref="longitude"/>
            </GooglePlacesSuggest>


              <div className="uk-grid uk-grid-small">
                <div className="uk-width-small-1-1">
                    <input className="uk-width-1-1 uk-form-large" placeholder="Email address" type="text" ref="email"/>
                </div>
              </div>

              <div className="uk-grid uk-grid-small">
                <div className="uk-width-small-1-2">
                    <input className="uk-width-1-1 uk-form-large" placeholder="Password" type="password" ref="password"/>
                </div>

                <div className="uk-width-small-1-2">
                    <input className="uk-width-1-1 uk-form-large" placeholder="Confirm Password" type="password" ref="confirm_password"/>
                </div>
              </div>

              <div className="uk-grid uk-grid-small">
                <div className="uk-width-small-1-2">
                    <Datetime inputProps={{name:"dateofbirth",placeholder:"Date of birth"}} onChange={(dob) => this.setDateofBirth(dob)}  input={true} className={"dob"} closeOnSelect={true} viewMode={"years"} timeFormat={false} dateFormat={'YYYY-MM-DD'}  />
                </div>

            <div className="uk-width-small-1-2 gender_select">
              <label>Gender</label>

              <input name="sex" value="male" id="u_0_d" type="radio" ref="radio_male" onChange={this.selsectGender.bind(this)} checked={true}/>
              <label className="_58mt" for="u_0_d">
                Male
              </label>

              <input name="sex" value="female" id="u_0_e" type="radio" ref="radio_female" onChange={this.selsectGender.bind(this)}/>
              <label className="_58mt" for="u_0_e">
                Female
              </label>
            </div>
          </div>

          <div className="uk-grid uk-grid-small sign_btn">

              <a className="uk-width-1-1 uk-button uk-button-primary uk-button-large" href="#" onClick={this.handleOnClickSignUp}>Signup</a>

              <a className="uk-width-1-1 uk-button uk-button-primary uk-button-large uk-modal-close" href="dashboard.html">Cancel</a>

            </div>
       </form>
         </div>
     </div>
    );
  }
}
