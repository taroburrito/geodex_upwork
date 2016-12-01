import React, { Component, PropTypes } from 'react';

export default class Profile extends Component {

    constructor(props){
        super(props);
        this.state={
          isFriendWithLoggedInUser: false,
        }
        this.handleClickAddFriend = this.handleClickAddFriend.bind(this);
      //  this.handleClickAcceptRequest = this.handleClickAcceptRequest.bind(this);
       this.handleClickDenyRequest = this.handleClickDenyRequest.bind(this);


    }
    componentWillMount() {

    }
    componentDidMount(){

    }
    getProfileImage(img){
       if(img){
        return img;
      }else{
       return "public/images/user.jpg";
      }

    }
    handleClickDenyRequest(reqId){

      this.props.onClickDenyRequest(reqId);
    }
    handleClickAddFriend(){

      const{userAuthSession,visitedUser} = this.props;
      var sender;
      var receiver;
      if(userAuthSession && userAuthSession.userObject){
        var sender ={
          id: userAuthSession.userObject.id,
          email:userAuthSession.userObject.email,
        }
      }
      if(visitedUser && visitedUser.userProfileData){
        var receiver ={
          id: visitedUser.userProfileData.id,
          email:visitedUser.userProfileData.email,
        }
      }
      if(sender && receiver){
        this.props.onClickAddFriend(sender,receiver);
      }else{
        console.log("Can't find sender and receiver");
      }

      //this.props.fetchInitialData(userAuthSession.userObject.id,this.props.userId);
    }
    //
    handleClickAcceptRequest(reqId){
      if(reqId)
      this.props.clickAcceptRequest(reqId);
      //this.props.fetchInitialData(userAuthSession.userObject.id,this.props.userId);
    }

    renderAddFriendLink(){
      const{visitedUser, userAuthSession, profileId} = this.props;
      var userProfileData = visitedUser.userProfileData;
      var friendStatus = visitedUser.friendStatus;
      var link;
      var denyLink = "";
      var LoggedInUserId = userAuthSession.userObject.id;
      if(friendStatus){
//       Object.keys(friends).forEach( (id) => {
//       var friendsData = friends[id];
//
//       // if there is friend list record for loggedin user and visited user
//       if(friendsData.sender_id == LoggedInUserId || friendsData.receiver_id == LoggedInUserId){
// //console.log("LoggedIn:"+LoggedInUserId);
//         //if visited user and loggedin user are friend
//         if(friendsData.status == 1){
//           link =(
//             <a className="uk-button add_friend_btn">Friends</a>
//           );
//
//         // if visited user and loggedin user are blocked
//         }else if (friendsData.status == 2) {
//
//           // if an friend request is sent either by visited user or by loggedin user
//         }else {
//           // If loggedin user sends request
//           if (friendsData.sender_id == LoggedInUserId) {
//             link =(
//               <a className="uk-button add_friend_btn">Friend request sent</a>
//             );
//
//
//             // if visited user sent friend request
//           }else {
//             link =(
//               <div data-uk-dropdown="" aria-haspopup="true" aria-expanded="false" className="add_friend_btn">
//                 <a className="uk-button"><i className="uk-icon-chevron-down"></i></a>
//                 <div className="uk-dropdown uk-dropdown-small uk-dropdown-bottom" aria-hidden="true" tabindex="">
//
//                   <ul className="uk-nav uk-nav-dropdown">
//                      <li><a  onClick={this.handleClickRespondToRequest}>Accept request</a></li>
//                      <li><a onClick={this.handleClickDenyRequest.bind(this,friendsData.id)}>Deny request</a></li>
//                    </ul>
//                  </div>
//                 </div>
//
//
//               );
//
//           }
//         }
//
//       }else{
//
//       }
//       });

      if(friendStatus.status == 1){
        link = (
          <a className="uk-button add_friend_btn">Friends</a>
        );
      }else if (friendStatus.status == 0) {

        // if profile user sent friend request
        if(friendStatus.sender_id == profileId){
          link =(
            <div data-uk-dropdown="" aria-haspopup="true" aria-expanded="false" className="add_friend_btn">
              <a className="uk-button"><i className="uk-icon-chevron-down"></i></a>
              <div className="uk-dropdown uk-dropdown-small uk-dropdown-bottom" aria-hidden="true" tabindex="">

                <ul className="uk-nav uk-nav-dropdown">
                   <li><a  onClick={this.handleClickAcceptRequest.bind(this,friendStatus.id)}>Accept request</a></li>
                   <li><a onClick={this.handleClickDenyRequest.bind(this,friendStatus.id)}>Deny request</a></li>
                 </ul>
               </div>
              </div>


            );
        }else {
          link =(
              <a className="uk-button add_friend_btn">Friend request sent</a>
                      );
        }
      }

    }else{
      link =(
          <a className="uk-button add_friend_btn" onClick={this.handleClickAddFriend}>Add Friend</a>
        )
    }

        return(
            {link}
        );


    }


    render() {
      const{visitedUser, userAuthSession} = this.props;
      if(visitedUser){

      var userProfileData = visitedUser.userProfileData;
      if(userProfileData && userProfileData.cover_image){
        var background_profile_css ={
          backgroundImage: 'url('+userProfileData.cover_image+')'
        }
      }else{
        var background_profile_css ={
          backgroundImage: 'url(public/images/profile_banner.jpg)'
        }
      }

      return(
          <div className="full_width">
            <div className="background_profile" style={background_profile_css}>
              <div className="uk-container uk-container-center">
                 <div className="uk-grid uk-grid-large dash_top_head">
                  <div className="uk-width-small-1-2">
                    <div className="uk-grid uk-grid-small">
                    <div className="uk-width-3-10 user_img_left">
                      <img src={this.getProfileImage(userProfileData.profile_image)} />

                      </div>
                    <div className="uk-width-7-10 pro_right">
                      {(userAuthSession.userObject.id != this.props.userId)? this.renderAddFriendLink(): null}
                    <h3>{userProfileData.first_name} {userProfileData.last_name}</h3>
                    <h4>{userProfileData.address}</h4>
                    <h5>{userProfileData.email} <i className="uk-icon-envelope"></i></h5>
                    </div>
                    </div>
                  </div>
                 </div>
               </div>
              </div>


          <div className="uk-container uk-container-center middle_content profile">
             <div className="uk-grid uk-grid-large profile_bottom">

              <div className="uk-width-small-1-2 profile_gallery_left">
              <h3>Photos and Videos</h3>
              <a href="#img_coment_pop" data-uk-modal><img src="public/images/img_pro_page.jpg"/></a>
              <a href="#img_coment_pop" data-uk-modal><img src="public/images/img_pro_page.jpg"/></a>
              <a href="#img_coment_pop" data-uk-modal><img src="public/images/img_pro_page.jpg"/></a>
              <a href="#img_coment_pop" data-uk-modal><img src="public/images/img_pro_page.jpg"/></a>
              </div>

              <div className="uk-width-small-1-2 profile_post_right">
              <h3>Recent Activity</h3>


              <div className="uk-width-small-1-1 post_control">
              <img src="public/images/post_img.jpg" className="uk-float-left img_margin_right"/>
              <p><b>Lorem Ipsum is simply dummy text</b>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled... <a href="#contant_coment_pop" data-uk-modal>[more]</a></p>
              <p className="time">3.25pm</p>
              </div>

              <div className="uk-width-small-1-1 post_control">
              <img src="public/images/post_img.jpg" className="uk-float-left img_margin_right"/>
              <p><b>Lorem Ipsum is simply dummy text</b>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled... <a href="#contant_coment_pop" data-uk-modal>[more]</a></p>
              <p className="time">3.25pm</p>
              </div>

              <div className="uk-width-small-1-1 post_control">
              <img src="public/images/post_img.jpg" className="uk-float-left img_margin_right"/>
              <p><b>Lorem Ipsum is simply dummy text</b>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled... <a href="#contant_coment_pop" data-uk-modal>[more]</a></p>
              <p className="time">3.25pm</p>
              </div>

              <div className="uk-width-small-1-1 post_control">
              <p><b>Lorem Ipsum is simply dummy text</b>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled... <a href="#contant_coment_pop" data-uk-modal>[more]</a></p>
              <p className="time">3.25pm</p>
              </div>

              <div className="uk-width-small-1-1 post_control">
              <img src="public/images/post_img.jpg" className="uk-float-left img_margin_right"/>
              <p><b>Lorem Ipsum is simply dummy text</b>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled... <a href="#contant_coment_pop" data-uk-modal>[more]</a></p>
              <p className="time">3.25pm</p>
              </div>

              <div className="uk-width-small-1-1 post_control">
              <img src="public/images/post_img.jpg" className="uk-float-left img_margin_right"/>
              <p><b>Lorem Ipsum is simply dummy text</b>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled... <a href="#contant_coment_pop" data-uk-modal>[more]</a></p>
              <p className="time">3.25pm</p>
              </div>



              </div>

             </div>
           </div>
          </div>
      );

    }else{
      return(
        <div>Profile</div>
      )
    }
    }

}
