import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import GooglePlacesSuggest from 'react-google-places-suggest';
import { Navigation } from 'react-router';
import Datetime from 'react-datetime'
import ChangePassword from './ChangePassword';
import { validateEmail, validateDisplayName, validatePassword,validateDate } from '../../utilities/RegexValidators';
require('react-datetime/css/react-datetime.css');
import {updateProfileInput,updateUserProfileData,updateUserData} from '../../actions/ProfileActions';
var AvatarEditor = require('react-avatar-editor');

const initialFormState ={
  longitude: null,
  latitude: null,
};

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.onDobChange=this.onDobChange.bind(this);
    this.onGenderChange=this.onGenderChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleSaveCoverImage = this.handleSaveCoverImage.bind(this);
    this.handleScale = this.handleScale.bind(this);
    this.handleBorderRadius = this.handleBorderRadius.bind(this);
    this.handleOnClickUpdate=this.handleOnClickUpdate.bind(this);

    this.state = Object.assign({},this.props.userAuthSession.userObject,{
      search: '',
      selectedCoordinate: initialFormState,
      errorMessage :null,

      scale: 1,
      borderRadius: 0,
      preview: null,
      content: 'edit_profile'
    });

  }

  componentWillMount(){
  }

  componentDidMount(){

  }
  handleSave (data) {
    var img = this.refs.avatar.getImage();
   // this.setState({ preview: img});
    const {dispatch, userAuthSession}=this.props;
    var userData = userAuthSession.userObject;
    userData.profile_image = img;
    var req={
      id:userData.id,
      field:'profile_image',
      val: img
    }
    //if(dispatch(updateUserProfileData(userData))){
    if(dispatch(updateUserData(req))){

    }
    //}

  }

  handleSaveCoverImage(data) {
    var img = this.refs.cover.getImage();
   // this.setState({ preview: img});
    const {dispatch, userAuthSession}=this.props;
    var userData = userAuthSession.userObject;
    userData.cover_image = img;
    //this.setState({cover_image: img});
  //  console.log(userData);
    var req={
      id:userData.id,
      field:'cover_image',
      val: img
    }

    // update user data for specific field
     if(dispatch(updateUserData(req))){
     //dispatch(updateProfileInput('cover_image',img));
     }

  }



  handleScale (e) {
    var scale = parseFloat(e.target.value);
     this.setState({ scale: scale })
  }

  handleBorderRadius () {
    var borderRadius = parseInt(this.refs.borderRadius.value);
    this.setState({ borderRadius: borderRadius })
  }
  handleSearchChange(e){
    this.setState({ search: e.target.value })
    this.setState({ address: e.target.value })

  }
   handleSelectSuggest(suggestName, coordinate){
     var latitude = coordinate.latitude;
     var longitude = coordinate.longitude;
    this.setState({ search: suggestName, latitude: latitude, longitude:longitude })
     const { dispatch} = this.props;
     dispatch(updateProfileInput('address',suggestName));
  }

  logCallback (e) {
    //console.log("callback", e);
  }
    handleOnClickUpdate(){
        const {dispatch, userAuthSession}=this.props;
        var newState = this.state.errorMessage;
        var formData={
          first_name: this.refs.first_name.getDOMNode().value.trim(),
          last_name:  this.refs.last_name.getDOMNode().value.trim(),
          email: this.refs.email.getDOMNode().value.trim(),
          address: this.refs.address.getDOMNode().value.trim(),
          dob: this.state.dob,
          gender: this.state.gender,
          longitude: this.state.longitude,
          latitude:this.state.latitude,
          id: userAuthSession.userObject.id
        };

        console.log(formData);
        //dispatch(updateUserProfileData(formData));
        if(!validateDisplayName(formData.first_name)){
            this.setState({errorMessage:'Please enter first name'});
            this.refs.first_name.getDOMNode().focus();
        }else if (!validateDisplayName(formData.last_name)) {
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
        }
        else if (!validateDate(new Date(formData.dob))) {
          this.setState({errorMessage:'Please enter date of birth'});
        }else if (!this.state.gender) {
          this.setState({errorMessage:'Please choose gender.'});

        }else{
            this.setState({errorMessage:null});
            // save profile data
            dispatch(updateUserProfileData(formData));
        }


    }

 onDobChange(dob){
    const {dispatch}=this.props;
    dispatch(updateProfileInput('dob',dob));
 }
 onGenderChange(event){
    const {dispatch}=this.props;
    dispatch(updateProfileInput('gender',event.target.value));
 }


dateVal(date){
    var dateval=new Date(date);
    var month=dateval.getMonth()+1;
    var year=dateval.getFullYear();
    var day=dateval.getDate();
    return year+'/'+month+'/'+day;
}


getProfileImage(img,userId){
     if(img){
       var imageSrc = "uploads/images/user_"+userId+"/"+img;
      return imageSrc;
    }else{
     return "public/images/user.png";
    }

  }

  getImageSrc(img){
    if(img){

     return img;
   }else{
    return "public/images/user.png";
   }
  }

handleImageChange(evt) {
    var self = this;
    var reader = new FileReader();
    var file = evt.target.files[0];

    reader.onloadend = function(upload) {
    self.setState({
        profile_image: upload.target.result
      });
    };
reader.readAsDataURL(file);

}
handleCoverImageChange(evt) {
    var self = this;
    var reader = new FileReader();
    var file = evt.target.files[0];

    reader.onloadend = function(upload) {
    self.setState({
        cover_image: upload.target.result
      });
    };
reader.readAsDataURL(file);

}

setDateofBirth(x){
     var selectedDate = JSON.stringify(x);
     this.setState({dob:new Date(x)});
  }

__renderContent(){
  const { dispatch,userAuthSession} = this.props;
  var userData = userAuthSession.userObject;
  var dob = new Date(this.state.dob);
  const { search } = this.state;
  if(this.state.content == 'edit_profile'){
    return(
      <div className="uk-width-medium-2-3 profile-form">

          <div className="uk-grid uk-grid-medium">
              <h4 className="uk-width-medium-1-1">Personal Information</h4>
              <div className="uk-width-medium-1-2">
                  <label className="uk-form-label" for="form-gs-a">First Name</label>
                  <div className="uk-form-controls">
                      <input id="form-gs-a" placeholder="" ref="first_name" className="uk-width-1-1" onChange={(e)=>this.setState({first_name:e.target.value})} value={this.state.first_name}   type="text"/>
                  </div>
              </div>
              <div className="uk-width-medium-1-2">
                  <label className="uk-form-label" for="form-gs-b">Last Name</label>
                  <div className="uk-form-controls">
                      <input id="form-gs-b" placeholder="" ref="last_name" onChange={(e)=>this.setState({last_name:e.target.value})} value={this.state.last_name} className="uk-width-1-1" type="text"/>
                  </div>
              </div>
          </div>

          <div className="uk-grid uk-grid-medium">
              <div className="uk-width-medium-1-2">
                  <label className="uk-form-label" for="form-gs-a">Email Id</label>
                  <div className="uk-form-controls">
                      <input id="form-gs-a" placeholder="" ref="email" onChange={(e)=>this.setState({email:e.target.value})} value={this.state.email}  className="uk-width-1-1" type="text"/>
                  </div>
              </div>
              <div className="uk-width-medium-1-2">
                  <label className="uk-form-label" for="form-gs-b">Location</label>
                  <div className="uk-form-controls">
                      <GooglePlacesSuggest onSelectSuggest={ this.handleSelectSuggest.bind(this) } search={ search }>
                        <input className="uk-width-1-1 uk-form-large" type="text" ref="address" value={ search?search:this.state.address } placeholder="Search a location" onChange={ this.handleSearchChange.bind(this) }/>
                        <input type="hidden" value={this.state.latitude} ref="latitude"/>
                        <input type="hidden" value={this.state.longitude} ref="longitude"/>
                    </GooglePlacesSuggest>
                  </div>
              </div>
          </div>

          <div className="uk-grid uk-grid-medium">
              <div className="uk-width-medium-1-2">
                  <label className="uk-form-label" for="form-gs-a">Date of Birth</label>
                  <div className="uk-form-controls">
                  <Datetime defaultValue={dob} inputProps={{name:"dateofbirth",placeholder:"Date of birth"}} onChange={(dob) => this.setDateofBirth(dob)}  input={true} className={"dob"} closeOnSelect={true} viewMode={"years"} timeFormat={false} dateFormat={'DD-MM-YYYY'}  />

                  </div>
              </div>
              <div className="uk-width-medium-1-2">
                  <label className="uk-form-label" for="form-gs-b">Gender</label>
                  <div className="uk-form-controls">
                      <div className="uk-width-small-1-2 gender_select">

                          <input name="sex" ref="radio_female" value="female" id="u_0_d" type="radio" onChange={(e)=>this.setState({gender:e.target.value})} checked={this.state.gender == 'female'?true:false} />
                          <label className="_58mt" for="u_0_d">
                              &nbsp;Female&nbsp;
                          </label>

                          <input name="sex" ref="radio_male" value="male" id="u_0_e" type="radio" onChange={(e)=>this.setState({gender:e.target.value})} checked={this.state.gender == 'male'?true:false}/>
                          <label className="_58mt" for="u_0_e">
                              &nbsp;Male&nbsp;
                          </label>
                      </div>
                  </div>
              </div>
          </div>

          <div>
            <p className="text-align-right">
                <button className="uk-button uk-button-success uk-button-large" onClick={this.handleOnClickUpdate} >Update </button>

                <a className="uk-button uk-button-large" href="#/dashboard">Cancel</a>

            </p>
          </div>
      </div>
    );
  }else if (this.state.content == 'change_password') {
    return(
    <ChangePassword userData={userData}/>
    );
  }else if (this.state.content == 'custom') {
    return(
      <div>Custom</div>
    );
  }else {
    return(
      <div>Else</div>
    );
  }
}

renderProfileModel(){
  const{userAuthSession} = this.props;
  var userData = userAuthSession.userObject;
  return(
    <div id="profilepic" className="uk-modal profile-modal" >
       <div className="uk-modal-dialog">
           <AvatarEditor
             image={this.getImageSrc(this.state.profile_image)}
             ref="avatar"
             width={250}
             height={250}
             border={10}
             color={[255, 255, 255, 0.6]} // RGBA
             scale={parseFloat(this.state.scale)}
             borderRadius={this.state.borderRadius}
             onSave={this.handleSave}
             onLoadFailure={this.logCallback.bind(this, 'onLoadFailed')}
             onLoadSuccess={this.logCallback.bind(this, 'onLoadSuccess')}
             onImageReady={this.logCallback.bind(this, 'onImageReady')}
             onImageLoad={this.logCallback.bind(this, 'onImageLoad')}
             onDropFile={this.logCallback.bind(this, 'onDropFile')}
            />
        <br />
        <input type="file"  ref="file"  onChange={this.handleImageChange.bind(this)}/><br/>
       <input name="scale" type="range" ref="scale" onChange={this.handleScale} min="1" max="2" step="0.01"
                    defaultValue="1" />

       <br />
       <input className="uk-button uk-button-primary uk-button-large uk-modal-close" type="button" onClick={this.handleSave} value="Save" />

       <br />
   </div>
</div>
  );
}

renderCoverModel(){
  const{userAuthSession} = this.props;
  var userData = userAuthSession.userObject;
  return(
    <div id="coverImage" className="uk-modal profile-modal" >
       <div className="uk-modal-dialog custom-width">
           <AvatarEditor
             image={this.getImageSrc(this.state.cover_image)}
             ref="cover"
             width={1300}
             height={215}
             border={10}
             color={[255, 255, 255, 0.6]} // RGBA
             scale={1}
             borderRadius={this.state.borderRadius}
             onSave={this.handleSaveCoverImage}
             onLoadFailure={this.logCallback.bind(this, 'onLoadFailed')}
             onLoadSuccess={this.logCallback.bind(this, 'onLoadSuccess')}
             onImageReady={this.logCallback.bind(this, 'onImageReady')}
             onImageLoad={this.logCallback.bind(this, 'onImageLoad')}
             onDropFile={this.logCallback.bind(this, 'onDropFile')}
            />
        <br />
          <input type="file"  ref="coverfile"  onChange={this.handleCoverImageChange.bind(this)}/><br/>
       <input className="uk-button uk-button-primary uk-button-large uk-modal-close" type="button" onClick={this.handleSaveCoverImage} value="Save" />

       <br />
   </div>
</div>
  );
}

 render() {

    const { dispatch,userAuthSession} = this.props;
    var userData = userAuthSession.userObject;

    if(!userData.cover_image){
    var background_profile_css ={
      backgroundImage: 'url(public/images/profile_banner.jpg)'
    }
  }else{
    var background_profile_css ={
    //  var coverImage = "uploads/images/user_"+userData.id+"/"+userData.cover_image;
      backgroundImage: 'url(' + userData.cover_image + ')'
    }
  }

    const { search } = this.state;
    if(userData){
        var errorLabel;
        var errorLabelStyle={
          position:'absolute'
        };
        if(this.state.errorMessage){
            errorLabel =(<div className="uk-alert uk-alert-danger uk-width-small-1-2" style={errorLabelStyle}>
                <p>{this.state.errorMessage}</p>
            </div>);
        }else if(userData.success){
          errorLabel =(<div className="uk-alert uk-alert-success uk-width-small-1-2" style={errorLabelStyle}>
              <p>{userData.success}</p>
          </div>);
        }
         return (

            <div>
              <div className="background_profile" style={background_profile_css}>
                    <div className="uk-container uk-container-center">
                        <div className="uk-grid uk-grid-large dash_top_head">
                            <div className="uk-width-small-1-2">
                                <div className="uk-grid uk-grid-small">
                                    <div className="uk-width-3-10 user_img_left">
                                        <img src={this.getProfileImage(userData.profile_image,userData.id)} style={{borderRadius: this.state.borderRadius + 5 /* because of the 5px padding */}} />
                                        <a data-uk-modal="{target:'#profilepic'}" href="#" className="edit_profile_img_btn">Edit <i className="uk-icon-file-image-o"></i></a>
                                    </div>
                                    <div className="uk-width-7-10 pro_right">
                                       <h3>{userData.first_name} {userData.last_name} </h3>
                                        <h4>{ userData.address }</h4>
                                        <h5>{userData.email}</h5>
                                    </div>
                                </div>
                            </div>
                            <a href="#" data-uk-modal="{target:'#coverImage'}" className="edit_profile_background_btn">Edit <i className="uk-icon-file-image-o"></i></a>
                        </div>
                    </div>
                </div>
                <div className="uk-container uk-container-center middle_content profile profile_page">
                    <div className="uk-grid uk-grid-large profile_bottom">
                        <div className="uk-form uk-margin uk-form-stacked edit_profile uk-grid uk-grid-large uk-width-medium-1-1">
                            <div className="uk-width-medium-1-3 profile-sidebar">
                                <ul className="uk-tab uk-tab-left uk-width-medium-1-1" data-uk-tab="">
                                    <li className="uk-active" aria-expanded="true">
                                        <a href="#" onClick={()=>this.setState({content: 'edit_profile'})}>Edit Profile</a>
                                    </li>
                                    <li className="" aria-expanded="false">
                                        <a href="#" onClick={()=>this.setState({content: 'change_password'})}>Change Password</a>
                                    </li>
                                    <li aria-expanded="false" className="">
                                        <a href="#" onClick={()=>this.setState({content: 'custom'})}>Custom Design</a>
                                    </li>

                                </ul>
                            </div>
                            {errorLabel}

                            {this.__renderContent()}
                        </div>
                    </div>

                </div>
                {this.renderProfileModel()}
                {this.renderCoverModel()}
            </div>



    );
    }

  }
}

EditProfile.contextTypes = {

};

function select(state) {
   return {
     userAuthSession: state.userAuthSession
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(EditProfile);
