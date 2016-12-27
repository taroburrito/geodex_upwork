import React, { Component, PropTypes } from 'react';
var Slider = require('react-slick');

export default class Profile extends Component {

    constructor(props){
        super(props);
        this.state={
          isFriendWithLoggedInUser: false,
          uploadDir: 'uploads/images/',
          postLargeImage:null,
          clickedUser:null
        }
        this.handleClickAddFriend = this.handleClickAddFriend.bind(this);
      //  this.handleClickAcceptRequest = this.handleClickAcceptRequest.bind(this);
       this.handleClickDenyRequest = this.handleClickDenyRequest.bind(this);


    }
    componentWillMount() {

    }
    componentDidMount(){

    }

    getProfileImage(img,userId){
       if(img){
         var imageSrc = this.state.uploadDir+"user_"+userId+"/"+img;
        return imageSrc;
      }else{
       return "public/images/user.png";
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

// Posts of visited user.
    renderPostsContent(){
        const{visitedUser} = this.props;
      var posts = visitedUser.posts;

        var postContent = [];
        if(posts){
          Object.keys(posts).map((postId)=>{
          //  console.log(posts[key]);

            var item = posts[postId];
            if(item.image){
            var  content = item.content.substring(0,300).concat(' ...');
            }else {
            var  content = item.content.substring(0,500).concat(' ...');
            }
            postContent.push(
              <div className="uk-width-small-1-1 post_control">
                {item.image?<img src={this.state.uploadDir+'user_'+item.user_id+'/thumbs/'+item.image} className="uk-float-left img_margin_right"/>:null}
                <p>{content}<a href={item.image?'#postImageModel':'#postContentModel'} onClick={()=>this.setState({postLargeImage:this.state.uploadDir+'user_'+item.user_id+'/'+item.image})} data-uk-modal>[more]</a></p>
                <p className="time">{item.created}</p>
            </div>
          );
          });
        }else{
          postContent.push(
            <div><p>No post is found for this user.</p></div>
          )
        }

        return(
          {postContent}
        )

    }

    // photos of visited user.
renderPhotos(){
    const{visitedUser} = this.props;
    var posts = visitedUser.posts;

    var postContent = [];
    if(posts){
      Object.keys(posts).map((postId)=>{
      //  console.log(posts[key]);
        var item = posts[postId];
        if(item.image && item.content == '')
        postContent.push(
          <div className="profile_post_photos">
            {item.image?<a href="#postImageModel" onClick={()=>this.setState({postLargeImage:null,clickedUser:item.user_id})} data-uk-modal><img src={this.state.uploadDir+'user_'+item.user_id+'/thumbs/'+item.image}/></a>:null}

        </div>
      );
      });
    }else{
      postContent.push(
        <div><p>No post is found for this user.</p></div>
      )
    }

    return(
      {postContent}
    )

}

renderFriendsPostImagesLargeSlider(user_id){


   const{visitedUser} = this.props;
   var posts = visitedUser.posts;
   if(posts){
     var postImgEle = [];
     Object.keys(posts).forEach((postId)=> {
       var item = posts[postId];
       var postImageSrc = this.state.uploadDir+"user_"+item.user_id+"/"+item.image;
       if(postImageSrc)
       postImgEle.push(
           <div key={item.id} className="main-box"><img src={postImageSrc}/></div>
       );


     });





    return(
      <div>
        <Slider slidesToShow="1" slidesToScroll="1" infinite="false">
          {postImgEle}
              </Slider>

      </div>

    );
   }
  //console.log(friendsPost);

}

renderPostImageModal(){
  return(
  <div id="postImageModel" className="uk-modal coment_popup">
      <div className="uk-modal-dialog uk-modal-dialog-blank">
      <button className="uk-modal-close uk-close" type="button"></button>
        <div className="uk-grid">

          <div className="uk-width-small-1-2 popup_img_left">
                {this.state.postLargeImage?<img src={this.state.postLargeImage}/>:this.renderFriendsPostImagesLargeSlider(this.state.clickedUser)}
          </div>
          <div className="uk-width-small-1-2 popup_img_right">

          <article className="uk-comment">
            <header className="uk-comment-header">
                <img className="uk-comment-avatar" src="public/images/user.jpg" alt="" width="60" height="60"/>
                <h4 className="uk-comment-title">Author</h4>
                <div className="uk-comment-meta">Los Angeles, CA <span>s.dali@gmail.com</span></div>
            </header>
            <div className="uk-comment-body">
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr</p>
            </div>
        </article>
          <h5 className="coment_heading">Comments</h5>
          <ul className="uk-comment-list">
            <li>
                <article className="uk-comment">
                    <header className="uk-comment-header">
                        <img className="uk-comment-avatar" src="public/images/user.jpg" alt="" width="40" height="40"/>
                        <h4 className="uk-comment-title">Author</h4>
                        <div className="uk-comment-meta"><span>email@gmail.com</span> | Los Angeles, CA</div>
                    </header>
                    <div className="uk-comment-body">
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy</p>
                    </div>
                </article>
                <ul>
                    <li>
                        <article className="uk-comment">
                            <header className="uk-comment-header">
                                <img className="uk-comment-avatar" src="public/images/user.jpg" alt="" width="40" height="40"/>
                                <h4 className="uk-comment-title">Author</h4>
                                <div className="uk-comment-meta"><span>email@gmail.com</span> | Los Angeles, CA</div>
                            </header>
                            <div className="uk-comment-body">
                                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
                            </div>
                        </article>

                        <div className="comenting_form">
                          <img className="uk-comment-avatar" src="public/images/user.jpg" alt="" width="40" height="40"/>
                          <textarea placeholder="Write Comment..."></textarea>
                          <input type="submit" value="Send"/>
                          </div>
                          </li>
                      </ul>
                  </li>
              </ul>


          <div className="comenting_form border-top_cf">
          <img className="uk-comment-avatar" src="public/images/user.jpg" alt="" width="40" height="40"/>
          <textarea placeholder="Write Comment..."></textarea>
          <input type="submit" value="Send"/>
          </div>


          </div>
        </div>
    </div>
  </div>
);
}

renderPostContentModal(){
  return(
    <div id="postContentModel" className="uk-modal coment_popup">
        <div className="uk-modal-dialog uk-modal-dialog-blank">
        <button className="uk-modal-close uk-close" type="button"></button>
          <div className="uk-grid">

            <div className="uk-width-small-1-1 popup_img_right coment_pop_cont">

            <article className="uk-comment">
                <header className="uk-comment-header">
                    <img src="" className="uk-comment-avatar" width="60" height="60"/>

                    <h4 className="uk-comment-title"></h4>
                    <div className="uk-comment-meta"><span></span></div>
                </header>

                <div className="uk-comment-body">
                  <div className="uk-width-small-1-1 post_control">
                    <p></p>
                  </div>
                </div>
            </article>
            <h5 className="coment_heading">Comments</h5>
            <ul className="uk-comment-list" ref="commentsul">

         </ul>


          <div className="comenting_form border-top_cf">
          <img className="uk-comment-avatar" src="public/images/user.jpg" alt="" width="40" height="40"/>
          <textarea placeholder="Write Comment..."></textarea>
          <input type="submit" value="Send"/>
          </div>


      </div>
    </div>
  </div>
</div>
  );
}


    render() {
      const{visitedUser, userAuthSession} = this.props;
      if(visitedUser){

      var userProfileData = visitedUser.userProfileData;
      if(userProfileData && !userProfileData.cover_image){
      var background_profile_css ={
        backgroundImage: 'url(public/images/profile_banner.jpg)'
      }
    }else{
      var coverImage = "uploads/images/user_"+userProfileData.id+"/"+userProfileData.cover_image;
      var background_profile_css ={

        backgroundImage: 'url(' + coverImage + ')'
      }
    }
      return(
        <div>
          <div className="full_width">

            <div className="background_profile" style={background_profile_css}>
              <div className="uk-container uk-container-center">
                 <div className="uk-grid uk-grid-large dash_top_head">
                  <div className="uk-width-small-1-2">
                    <div className="uk-grid uk-grid-small">
                    <div className="uk-width-3-10 user_img_left">
                      <img src={this.getProfileImage(userProfileData.profile_image,userProfileData.id)} />

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

              {this.renderPhotos()}
              </div>

              <div className="uk-width-small-1-2 profile_post_right">
              <h3>Recent Activity</h3>


              {this.renderPostsContent()}
              </div>

             </div>
           </div>

        </div>
        {this.renderPostImageModal()}
        {this.renderPostContentModal()}
      </div>

      );

    }else{
      return(
        <div>Profile</div>
      )
    }
    }

}
