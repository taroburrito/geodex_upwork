import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navigation, Link } from 'react-router';
import { validateDisplayName } from '../../utilities/RegexValidators';
var AvatarEditor = require('react-avatar-editor');
var Slider = require('react-slick');
var moment = require('moment');
//import Slider from 'react-image-slider';
//var Loading = require('react-loading');

import ImageGallery from 'react-image-gallery';
import CategoryList from './manage_category/CategoryList';
import TimeAgo from 'react-timeago';

function generateUUID(){
  //Note: this is a simple implentation for this project. //TODO create a better one
  return (Math.round(Math.random()*10000000000000000).toString()+(Date.now()));
}

const initialMessageStates={
  error: null,
  success:null
}

export default class DashboardPage extends Component {
  constructor(props) {

    super(props);
    this.handleClickAddCategory = this.handleClickAddCategory.bind(this);
    this.handleOnClickSendEmail = this.handleOnClickSendEmail.bind(this);
    this.handleClickPlus = this.handleClickPlus.bind(this);
    this.handleSavePostImage = this.handleSavePostImage.bind(this);
    this.handleSavePost = this.handleSavePost.bind(this);
    this.handleChangeSort = this.handleChangeSort.bind(this);
    this.sortByAllCategory = this.sortByAllCategory.bind(this);
    this.handleClickPostComment = this.handleClickPostComment.bind(this);
    this.onSlide = this.onSlide.bind(this);
    this.clickSlider = this.clickSlider.bind(this);
    this.handleVideoLinkChange = this.handleVideoLinkChange.bind(this);
    this.handlePostMessage = this.handlePostMessage.bind(this);
    this.handleCloseImagePopUp = this.handleCloseImagePopUp.bind(this);

    this.state ={
      errorMessage: null,
    //  image: "public/images/user.jpg",
      image:null,
      preview_image:null,
      fileData:null,
      active_cat:'all',
      handleMessage:initialMessageStates,
      popupImage:null,
      popupContent:null,
      uploadDir:null,
      postLargeImage:null,
      loading:false,
      clickedUser:false,
      getClickedUser: null,
      clickedPost:null,
      showCommentBox:null,
      replyContent:null,
      postComment:null,
      currentSlide:0,
      loadPostContent:false,
      videoLink:null,
      popupVideo:null,
      clickedImageIcon:null,
      clickedYouTubeLink:null,
      postMessage:null,
      showLargeSlider:false

    }
  }

  componentWillMount(){
    const{userAuthSession} = this.props;
    var userId= userAuthSession.userObject.id;
    var uploadDir = 'uploads/images/';
    this.setState({uploadDir:uploadDir,loading:true});
    this.props.fetchInitialData(userAuthSession.userObject.id,null);
    document.getElementById("html").className = "";
    //console.log("removed");
    //htmlTag.classList.remove('uk-modal-page');
  }
   handleCloseImagePopUp(){
      this.setState({showLargeSlider:false});
    //console.log(this.refs.largeSliderContent.getDOMNode.innerHtml);
    console.log("closed");
  }
  onSlide(e){
    //React.unmountComponentAtNode(document.getElementById('test'));
      //this._imageGallery.slideToIndex(e);
    this.pauseAllYoutube();
    var postId = this._imageGallery.props.items[e].postId;
    this.props.fetchComments(postId);
    //this.loadPostContent(postId,this.state.clickedUser,null,null,e);
    this.setState({clickedPost:postId});
  

  }

  pauseAllYoutube(){
    //console.log('===========23322323==========');
        $('iframe[src*="youtube.com"]').each(function() {
            var iframe = $(this)[0].contentWindow;
            iframe.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        });

  }
  clickSlider(e){

  }
  componentDidMount(){

    const{dashboardData} = this.props;
    if(dashboardData){

      this.setState({loading:false});
    }
  }


  handlePostMessage()
  {
      //console.log(e.value);
      var msg = this.refs.postContent.getDOMNode().value.trim();
     this.setState({postMessage:msg});
    // var videoid = msg.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
     var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
     var match = msg.match(regExp);
     var modal = UIkit.modal("#statusImageModel");
            if (match && match[2].length == 11) {
                //console.log('https://www.youtube.com/embed/' + match[2] + '?autoplay=0');
                var videoLink = 'https://www.youtube.com/embed/'+match[2];
                var videoImg = "https://img.youtube.com/vi/"+match[2]+"/0.jpg"
                this.setState({clickedYouTubeLink:true,clickedImageIcon:null,videoLink:videoLink,image:null,videoImage:videoImg,postMessage:null});
                modal.show();
            }
            else {
                this.setState({videoLink:null,image:null,videoImage:null})
                 //console.log("The youtube url is not valid.");
            }
   
  }

  
  handleClickPostComment(){

    const{userAuthSession} = this.props;
    this.refs.commentBox.getDOMNode().value = "";
    this.setState({replyContent:null,postComment:null});
    var req = {
      comment: this.state.postComment,
      parent_id:'',
      user_id: userAuthSession.userObject.id,
      post_id:this.state.clickedPost,
      status:1,
    }

    this.props.postComment(req);

    //console.log(req);

  }

  handleClickReplyComment(parent_id,post_id){

    //console.log("parent:"+parent_id);
    this.setState({showCommentBox:null,replyContent:null,postComment:null});

    const{userAuthSession} = this.props;
    var req = {
      comment: this.state.replyContent,
      parent_id:parent_id,
      user_id: userAuthSession.userObject.id,
      post_id:post_id,
      status:1,
    }

    this.props.postComment(req);

  }

  sortByAllCategory(){

    const{userAuthSession} = this.props;
    this.props.fetchInitialData(userAuthSession.userObject.id,null);
    this.setState({active_cat:'all'});
  }
  handleImageChange(evt) {
      var self = this;
      var reader = new FileReader();
      var file = evt.target.files[0];


      reader.onloadend = function(upload) {
      self.setState({
          image: upload.target.result,
          fileData:file,
          videoLink:null,
          videoImage:null
        });

      };
  reader.readAsDataURL(file);

  }

  handleSavePostImage(){
    const{userAuthSession} = this.props;
    var formData = {
      user_id: userAuthSession.userObject.id,
      content: this.refs.postImageContent.getDOMNode().value.trim(),
      image: this.state.image,
      youtube_url: this.state.videoLink,
      youtube_image: this.state.videoImage,
      //fileData:this.state.fileData
    }

    if(!formData.image && !formData.youtube_url){
      this.setState({handleMessage:{error:"Please choose image",success:null}});
    }else{
      //this.setState({loading:true});
      this.props.onClickSavePost(formData);
      this.setState({image:null,post_image:null,fileData:null,videoImage:null,videoLink:null,postMessage:null});
      this.refs.postImageContent.getDOMNode().value = "";
      this.refs.postContent.getDOMNode().value = "";
    }
  }

  handleOnClickSendEmail(){
    const{userAuthSession} = this.props;
    var to = this.refs.sendto.getDOMNode().value;
    var from = userAuthSession.userObject.email;
    var subject = this.refs.Subject.getDOMNode().value.trim();
    var content = this.refs.emailBody.getDOMNode().value;

    if(subject == ''){
      this.setState({errorMessage:{sendEmail:"Please enter subject"}});
    }else if (content == '') {
      this.setState({errorMessage:{sendEmail:"Please enter content"}});
    }else {
    this.props.sendEmail(from,to,subject,content);
    this.setState({errorMessage:null});
    }

  }
  handleSavePost(){
    const{userAuthSession} = this.props;
    var formData = {
      user_id: userAuthSession.userObject.id,
      content: this.refs.postContent.getDOMNode().value.trim(),
      image: null
    }
    if(!formData.content && !formData.image){
      alert("enter text or image");
    }else {
      this.props.onClickSavePost(formData);
      this.setState({image:null,post_image:null,postMessage:null});
      this.refs.postContent.getDOMNode().value = "";
    }

    //this.props.fetchInitialData(userAuthSession.userObject.id);
  }

setMessageStateToDefault (){
  this.setState({handleMessage:{error:null,success:null}});
}
componentDidUpdate(){

}
handleClickPlus(){
    this.setMessageStateToDefault();
    this.props.setMessageToDefault();
    this.refs.categoryName.getDOMNode().value = "";
  }



  getProfileImage(img,userId){
     if(img){
       var imageSrc = this.state.uploadDir+"user_"+userId+"/"+img;
      return imageSrc;
    }else{
     return "public/images/user.png";
    }

  }

  handleClickAddCategory(){
    const{userAuthSession} = this.props;
    var category_name= this.refs.categoryName.getDOMNode().value.trim();
    var req = {
    user_id:userAuthSession.userObject.id,
    category_name: category_name,
    added_by:'user'
    };


    if(category_name === ''){
      this.setState({handleMessage:{error:"Please enter category name"}});
    }else if (!validateDisplayName(category_name)) {
      this.setState({handleMessage:{error:"Please enter alpha numeric value"}});
    }else{
      this.setMessageStateToDefault();

      this.props.addCategory(req);
    // this.refs.categoryName.getDOMNode().value = "";
   }
  }


  logCallback(e){

  }



  handleChangeSort(){
    var sortBy = this.refs.sortFriends.getDOMNode().value;
    const{dashboardData} = this.props;
    var friends = dashboardData.friends;

      var newArr = {};
      if(sortBy == 'created'){
        var fullySorted = _.sortBy(friends, 'post_id').reverse();
      }else{
        var fullySorted = _.sortBy(friends, sortBy);
      }

      Object.keys(fullySorted).map((id)=>{
        newArr[id] = fullySorted[id];
      });

     // console.log(friends);
     // console.log("******");

     // console.log(fullySorted);
     // console.log(newArr);
    //   var newArr = _.sortBy(friends, 'first_name', function(n) {
    //   return Math.sin(n);
    // });
    if(newArr){
      this.props.updateDashboardFriendList(newArr);
    }



  //   const{friends} = this.props;
  //   var list = [
  //   { name:'Charlie', age:3},
  //   { name:'Dog', age:1 },
  //   { name:'Baker', age:7},
  //   { name:'Abel', age:9 },
  //   { name:'Baker', age:5 }
  //   ];
  //
  //
  //   console.log('*********');
  //   console.log(friends);
  //   var newArr = {};
  //   var fullySorted = _.sortBy( friends, sortBy);
  //   Object.keys(fullySorted).map((id)=>{
  //     var sorted = fullySorted[id];
  //     if(sorted.status == 1)
  //     newArr[id] = sorted;
  //   });
  // //   var newArr = _.sortBy(friends, 'first_name', function(n) {
  // //   return Math.sin(n);
  // // });
  // if(newArr){
  //   this.props.updateFriendList(newArr);
  // }
  // console.log('*********');
  // console.log(fullySorted);
  // console.log('*********');
  // console.log(newArr);

}

resetEmailForm(){
  this.refs.Subject.getDOMNode().value = '';
  this.refs.emailBody.getDOMNode().value = '';
  this.setState({errorMessage:null});
}
  handleOnClickEmailIcon(email){
      this.refs.sendto.getDOMNode().value = email;
      this.resetEmailForm();
     // console.log(email);
  }
  sortByCategory(catId){
    const{userAuthSession} = this.props;
    this.setState({active_cat: catId});
    this.props.fetchInitialData(userAuthSession.userObject.id, catId);
  }



  renderCategoriesContent(){
    const{dashboardData} = this.props;
    var categoriesElement = [];
    var categories = dashboardData.categories;
    if(categories)
    Object.keys(categories).map(function (key) {
      var item = categories[key];
      categoriesElement.push(<li id={item.id} onClick={this.sortByCategory.bind(this,item.id)} className={this.state.active_cat == item.id ? "active_sm":''}>{item.category_name}</li>);
    }, this);
    categoriesElement.push(<a data-uk-modal="{target:'#categoryModal'}" href="#" onClick={this.handleClickPlus}><li id={0}>+</li></a>);

    return (
      {categoriesElement}
    );
  }

  renderFriendPostContent(user_id){
      const{friendsPosts} = this.props;
      var friend_post_content;

      var friendsPost = friendsPosts[user_id];
      if(friendsPost && friendsPost.length){
         friend_post_content = (
          <div className="uk-width-small-1-2 post_control">
            {friendsPost[0].image?<img src={friendsPost[0].image} className="uk-float-left img_margin_right"/>:null}

          <p>{friendsPost[0].content}</p>
          </div>
        );
      }else{
        // console.log(friendsPost);
        if(friendsPost)
         friend_post_content = (
          <div className="uk-width-small-1-2 post_control">
            {friendsPost.image?<img src={friendsPost.image} className="uk-float-left img_margin_right"/>:null}

          <p>{friendsPost.content}</p>
          </div>
        );
      }

    return(
      {friend_post_content}
    )
  }
   sortImages(a, fn) {
  var non_matches = [];
  var matches = a.filter(function(e, i, a) {
    var match = fn(e, i, a);
    if (!match) non_matches.push(e);
    return match;
  });
  return matches.concat(non_matches);
}
imageSlideTo(e){
  //console.log("ee:"+e);
  this._imageGallery.slideToIndex(e);
}


_myImageGalleryRenderer(item) {
  console.log('==============');
  console.log(item); console.log('==============');
    // your own image error handling
    const onImageError = this._handleImageError;
    return (
      <div className='image-gallery-image'>
        {item.video?<iframe src={item.video} height="500" width="700"/>:<img src={item.original}/>}



      </div>
    )
  }


   renderFriendsPostImagesLargeSlider(user_id){

     const{dashboardData} = this.props;
     var friendsPosts = dashboardData.friendsPostImages;
     var friend_post_images;
     if(friendsPosts)
     var friendsPost = friendsPosts[user_id];
       if(friendsPost && friendsPost.length > 0){
         //var newPost = this.sortImages(friendsPost, e => e.id === this.state.clickedPost);

       var friendElement = [];
       var i = 0;
       Object.keys(friendsPost).forEach((postImage)=> {

         var postContent = friendsPost[postImage];
         var postImageSrc = this.state.uploadDir+"user_"+postContent.user_id+"/"+postContent.post_image;
         if(postContent.post_image){
         friendElement.push(
           {
             original:postImageSrc,
             postId:postContent.id,

           }

         );
         i++;
       }

       });

       if(this.state.showLargeSlider){

       return(
         <div id="test">
        <ImageGallery
        ref={i => this._imageGallery = i}
        items={friendElement}
        slideInterval={200}
        startIndex={this.state.currentSlide}
        onSlide={this.onSlide}
        infinite={false}
        showBullets={false}
        showThumbnails={false}
        autoPlay={false}
        showPlayButton={false}
        showFullscreenButton={false}
      //  renderItem={this._myImageGalleryRenderer.bind(this)}
      //  showNav={false}
        //onClick={this.clickSlider}
        onImageLoad={this.imageSlideTo.bind(this,this.state.currentSlide)}
        />
    </div>

      );
     }else{
      return(
<div>Loading</div>
        );
     }
     }

    //console.log(friendsPost);

  }

   renderFriendsPostImagesSmallSlider(user_id){

     const{dashboardData} = this.props;
     var friendsPosts = dashboardData.friendsPostImages;
     var friend_post_images;
     if(friendsPosts)
     var friendsPost = friendsPosts[user_id];
       if(friendsPost && friendsPost.length > 0){

       var friendElement = [];
       var i = 1;

       Object.keys(friendsPost).forEach((friendId)=> {

         var item = friendsPost[friendId];
         var post_image = item.post_image;
         var postImage = this.state.uploadDir+"user_"+user_id+"/thumbs/"+post_image;

         // Image content
         if(item.post_image){
          //var postImage = this.state.uploadDir+"user_"+user_id+"/thumbs/"+post_image;
         }
         //Video Content
         else if (item.youtube_image) {
          //var  postVideo = item.youtube_url;
           }

         //text content
         else {

         }
         if(post_image){
         friendElement.push(
             <div key={item.i} className="slider_image uk-grid-small uk-grid-width-medium-1-4">
               <a data-uk-modal="{target:'#postImageModel'}"  onClick={this.loadPostContent.bind(this,item.id,user_id,null,null,i,null)}>
                 <img src={postImage}/>
                </a>
            </div>
         );
         i++;
       }

       });


       const settings = {
         slidesToShow:3,
         infinite:false,
        // slikGoTo:this.state.currentSlide
       };
       return(
        <div>
          <Slider {...settings}>
            {friendElement}
                </Slider>
          {/* <ul className="uk-slider uk-grid-small uk-grid-width-medium-1-4">
            {friendElement}
          </ul> */}
        </div>

      );
     }
    //console.log(friendsPost);

  }

  renderImageContentModel(){
    const{userAuthSession} = this.props;
    var user = userAuthSession.userObject;

    if(this.state.postLargeImage){
      var imageContent = (
        <div className="image-gallery-slide">
        <img className="single-slide" src={this.state.postLargeImage}/>
        </div>
      )
    }else if (this.state.popupVideo) {
      var imageContent = (
        <div className="image-gallery-slide">
        <iframe  src={this.state.popupVideo} height="500" width="700"/>
        </div>
        );
    }else{
      var imageContent = null;
    }

    return(
      <div id="postImageModel" className="uk-modal coment_popup">
          <div className="uk-modal-dialog uk-modal-dialog-blank">
          <button className="uk-modal-close uk-close" type="button" onClick={this.handleCloseImagePopUp}></button>
            <div className="uk-grid">

              <div className="uk-width-small-3-4 popup_img_left" ref="largeSliderContent">
                    {(this.state.postLargeImage || this.state.popupVideo)?
                      {imageContent}:this.renderFriendsPostImagesLargeSlider(this.state.clickedUser)}
              </div>
              <div className="uk-width-small-1-4 popup_img_right">

              {this.loadPostByInfo(this.state.clickedUser,this.state.clickedPost)}
              <h5 className="coment_heading">Comments</h5>
              <ul className="uk-comment-list">
              {this.renderComments(this.state.clickedPost)}
                  </ul>

                  <div className="comenting_form border-top_cf">
              <img className="uk-comment-avatar" src={this.getProfileImage(user.profile_image,user.id)} alt="" width="40" height="40"/>
              <textarea placeholder="Write Comment..." value={this.state.postComment} onChange={(e)=>this.setState({postComment:e.target.value})} ref="commentBox"></textarea>
              <a onClick={this.handleClickPostComment} className="uk-button uk-button-primary comment_btn">Post</a>
              </div>


              </div>
            </div>
        </div>
      </div>
    )
  }

  loadPostContent(postId,userId,popupImage,popupContent,currentSlide,postVideo){

    if(currentSlide){
      var current = parseInt(currentSlide) - 1;
     // console.log("current:"+current);
      //this.setState({loadPostContent:true})
      this.setState({currentSlide:current});
      if(this._imageGallery){
        this._imageGallery.slideToIndex(current);
      }
      //this._imageGallery.slideToIndex(currentSlide);
      //console.log(this._imageGallery); console.log("cjed");
    //  React.unmountComponentAtNode(document.getElementById('postImageModel'));
      //this.refs.largeSliderContent.getDOMNode.innerHtml = "";
      //ReactDOM.unmountComponentAtNode(this.refs.largeSliderContent);


    }
    this.props.fetchComments(postId);

    this.setState({showLargeSlider:true,clickedPost:postId,clickedUser:userId,getClickedUser:userId,postLargeImage:popupImage,popupContent:popupContent,popupVideo:postVideo});

  }

  loadSinglePostContent(postId,userId,popupImage,popupContent,postVideo){

    this.props.fetchComments(postId);

    this.setState({clickedPost:postId,clickedUser:userId,getClickedUser:userId,postLargeImage:popupImage,popupContent:popupContent,popupVideo:postVideo});

  }




  renderFriendList(){

    const{dashboardData} = this.props;
    var friendsElement = [];
    var friends = dashboardData.friends;

    if(friends)
    Object.keys(friends).map((key)=> {

      var item = friends[key];

      var user_id = friends[key].id;
      var profile_link = "/user/"+user_id;
      var content = item.post_content;

      if(item){
        var content_length = content.length;
        var post_image = item.post_image || item.youtube_image;
        var postVideo;
        var postImage;
        var timestamp = moment(item.post_date);
        var formatted = timestamp.format('YYYY-MM-DD HH:mm:ss');
        // Image content
        if(item.post_image){
          if(content_length > 300){
          content = content.substring(0,300).concat(' ...LoadMore');
          }else{
          content = content;
          }
           postImage = this.state.uploadDir+"user_"+user_id+"/"+item.post_image;
        }
        //Video Content
        else if (item.youtube_image) {
          if(content.length > 300){
          content = content.substring(0,300).concat(' ...LoadMore');
          }else{
          content = content;
          }
           postVideo = item.youtube_url;

        }

        //text content
        else {
          if(content.length > 500){
          content = content.substring(0,500).concat(' ...LoadMore');
          }else{
          content = content;
          }

        }
      }

      var slider_images = this.renderFriendsPostImagesSmallSlider(user_id);
      friendsElement.push(  <div className="uk-grid dash_top_head dash_botom_list" id={item.id}>

            <div className="uk-width-small-1-2">
              <div className="uk-grid uk-grid-small">
              <div className="uk-width-3-10 user_img_left"><Link to={profile_link}><img src={this.getProfileImage(item.profile_image,user_id)} className=""/></Link></div>
              <div className="uk-width-7-10 user_bottom_img_right">
              <h3 className="capital_first"><Link to={profile_link} className="user-name-anchor">{item.first_name} {item.last_name} </Link>
              
             <small className="user_location">{item.address}</small>

                </h3>
                <div className="uk-width-7-10 comm-icon-div">
                <a data-uk-modal="{target:'#sendEmail'}" onClick={this.handleOnClickEmailIcon.bind(this,item.email)} data={item.email}  href="#" className="">
                <img className="comm-icons" src="public/images/email_icon.png"/>
                </a>
                
                <img className="comm-icons" src="public/images/message_icon.png"/>
                <img className="comm-icons" src="public/images/phone_icon.png"/>
                </div>

            <div className="uk-slidenav-position uk-margin" data-uk-slider="{autoplay: true}">

                    <div className="uk-slider-container img_slid">
                        {slider_images}
                    </div>
                </div>
                </div>
              </div>
            </div>

            <div className="uk-width-small-1-2 post_control">
              <div>
                <a href="#" className="post_txt_dashboard" data-uk-modal={post_image?"{target:'#postImageModel'}":"{target:'#postContentModel'}"} onClick={this.loadSinglePostContent.bind(this,item.post_id,user_id,postImage,item.post_content,postVideo)}>

                  <img src={post_image? this.state.uploadDir+"user_"+user_id+"/thumbs/"+post_image: null} className="uk-float-left img_margin_right"/>
                  <p>{content}</p>
                   <small className="user_location post_timestamp">
                   <TimeAgo date={formatted} />
                   </small>
                </a>

           </div>
         </div>

         </div>);

    });

    if(friendsElement && friendsElement.length > 0){
    return(
      {friendsElement}

    )
  }else {
      return(
        <div>No friend is added in this category, <Link to="manage_friends">Manage Friends </Link>here.</div>
      )
    }
  }


  renderManageCategories(){
    const{dashboardData,userAuthSession} = this.props;
    var categoriesElement = [];
    var categories = dashboardData.categories;
    var user_id = userAuthSession.userObject.id;
    if(categories)
    Object.keys(categories).map(function (key) {
      var item = categories[key];
      if(item.user_id == user_id)
      categoriesElement.push(
           <div>
               <input id={item.id} placeholder="Category name" className="uk-width-10-10" type="text" value={item.category_name} ref="updateCategoryName"/>
                <a className="uk-button uk-button-primary">Update</a>
                <a className="uk-button uk-button-primary">Delete</a>
           </div>
        );
    }, this);
    return (
      {categoriesElement}
    );
  }

  loadPostByInfo(userId,postId){

    if(userId){
    const{dashboardData,userAuthSession} = this.props;
    
    if(userAuthSession.userObject.id === userId){
        var friendData = userAuthSession.userObject;
    }else{
      var friendData = {};
    var friendsData = dashboardData.friends;
     Object.keys(friendsData).map(function (key) {
      var item = friendsData[key];
      if(item.id == userId){
        friendData = item;
        return false;
      }
    }, this);
     
  }

  var profile_link = "/user/"+friendData.id;
  // if(postId){
  //
  //   var post = visitedUser.posts[postId];
  //   var postContent = post.content;
  // }else{
  //     var postContent = null;
  // }
    if(friendData)
    return(
      <article className="uk-comment">
          <header className="uk-comment-header">
              <img src={this.getProfileImage(friendData.profile_image,userId)} className="uk-comment-avatar" width="60" height="60"/>
              <Link to={profile_link}>
                <h4 className="uk-comment-title">{friendData.first_name} {friendData.last_name}</h4>
              </Link>
              
              <div className="uk-comment-meta"><span>{friendData.address}</span></div>
          </header>

          <div className="uk-comment-body">
            <div className="uk-width-small-1-1 post_control">
            <p>{this.state.popupContent}</p>
            </div>
          </div>
      </article>
    )
  }else{
    return(
      <div>No record</div>
    )
  }
  }

//   getNestedChildren(arr, parent) {
//   var out = []
//   for(var i in arr) {
//       if(arr[i].parent_id == parent) {
//           var children = this.getNestedChildren(arr, arr[i].id)
//
//           if(children.length) {
//               arr[i].children = children
//           }
//           out.push(arr[i])
//       }
//   }
//   return out;
// }

//  _queryTreeSort(options) {
//    var cfi, e, i, id, o, pid, rfi, ri, thisid, _i, _j, _len, _len1, _ref, _ref1;
//
//   ri = [];
//   rfi = {};
//   cfi = {};
//   o = [];
//   _ref = options;
//   for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
//   var  id = options[i].id || "id";
//   var  pid = options[i].parentid || "parentid";
//     e = _ref[i];
//     rfi[e[id]] = i;
//     if (cfi[e[pid]] == null) {
//       cfi[e[pid]] = [];
//     }
//     cfi[e[pid]].push(options[i][id]);
//   }
//   _ref1 = options;
//   for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
//     var  id = options.id || "id";
//     var  pid = options.parentid || "parentid";
//     e = _ref1[_j];
//     if (rfi[e[pid]] == null) {
//       ri.push(e[id]);
//     }
//   }
//   while (ri.length) {
//     thisid = ri.splice(0, 1);
//     o.push(options.q[rfi[thisid]]);
//     if (cfi[thisid] != null) {
//       ri = cfi[thisid].concat(ri);
//     }
//   }
//   return o;
// };
//
// _makeTree (options) {
//   console.log(options);
//   var children, e, id, o, pid, temp, _i, _len, _ref;
//   id = options.id || "id";
//   pid = options.parentid || "parentid";
//   children = options.children || "children";
//   temp = {};
//   o = [];
//   _ref = options.newArr;
//   for (_i = 0, _len = _ref.length; _i < _len; _i++) {
//     e = _ref[_i];
//     e[children] = [];
//     temp[e[id]] = e;
//     if (temp[e[pid]] != null) {
//       temp[e[pid]][children].push(e);
//     } else {
//       o.push(e);
//     }
//   }
//   return o;
// };

 buildHierarchy(arry) {

    var roots = [], children = {};

    // find the top level nodes and hash the children based on parent
    for (var i = 0, len = arry.length; i < len; ++i) {
          var item = arry[i];
            var p = item.parent_id;

            var target = !p ? roots : (children[p] || (children[p] = []));

        target.push({ value: item });
    }

    // function to recursively build the tree
    var findChildren = function(parent) {
        if (children[parent.value.id]) {
            parent.children = children[parent.value.id];
            for (var i = 0, len = parent.children.length; i < len; ++i) {
                findChildren(parent.children[i]);
            }
        }
    };

    // enumerate through to handle the case where there are multiple roots
    for (var i = 0, len = roots.length; i < len; ++i) {
        findChildren(roots[i]);
    }

    return roots;
}

loadChild(child){
  const{userAuthSession} = this.props;
  var childElement = [];
  if(child)
  Object.keys(child).forEach((id)=>{
    var item = child[id]['value'];

    var childArr = child[id]['children'];

    if(this.state.showCommentBox == item.id){
      var commentBox = (
        <div className="comenting_form border-top_cf">
        <img className="uk-comment-avatar" src={this.getProfileImage(userAuthSession.userObject.profile_image,userAuthSession.userObject.id)} alt="" width="40" height="40"/>
        <textarea placeholder="Write Comment..."  value={this.state.replyContent} onChange={(e)=>this.setState({replyContent:e.target.value})}></textarea>
        <a onClick={this.handleClickReplyComment.bind(this,item.id,item.post_id)} className="uk-button uk-button-primary comment_btn">Send</a>
        </div>
      );
    }else{
      var commentBox = "";
    }


    childElement.push(
      <li>
          <article className="uk-comment">
              <header className="uk-comment-header">
                  <img className="uk-comment-avatar" src={this.getProfileImage(item.profile_image,item.user_id)} alt="" width="40" height="40"/>
                  <h4 className="uk-comment-title">{item.NAME}</h4>
                  <div className="uk-comment-meta"><span>{item.email}</span> | {item.address}</div>
              </header>
              <div className="uk-comment-body">
                  <p>{item.comment}</p>
              </div>
          </article>
          <a onClick={()=>this.setState({showCommentBox:item.id,replyContent:null})} className="reply_to_c">Reply</a>
          {commentBox}

          <ul>
          {this.loadChild(childArr)}
        </ul>
      </li>
    );
  });
  return(
    {childElement}
  )
}

  renderComments(postId){
    const{comments,userAuthSession} = this.props;
    var commentElement = [];
    if(comments){
    var newArr = [];
    Object.keys(comments).forEach((id)=>{
      var item = comments[id];
      newArr.push(item);
    });

  }else{
    //commentElement = (<div>No comments yet</div>);
  }
  var newItem = null;
  if(newArr){
    newItem = this.buildHierarchy(newArr);

  }

  if(newItem)
  Object.keys(newItem).forEach((id)=>{
    var item = newItem[id]['value'];
    var child = newItem[id]['children'];
    if(child){

    }
    if(this.state.showCommentBox == item.id){
      var commentBox = (
        <div className="comenting_form border-top_cf">
        <img className="uk-comment-avatar" src={this.getProfileImage(userAuthSession.userObject.profile_image,userAuthSession.userObject.id)} alt="" width="40" height="40"/>
        <textarea placeholder="Write Comment..."  value={this.state.replyContent} onChange={(e)=>this.setState({replyContent:e.target.value})}></textarea>
        <a onClick={this.handleClickReplyComment.bind(this,item.id,item.post_id)} className="uk-button uk-button-primary comment_btn">Reply</a>
        </div>
      );
    }else{
      var commentBox = "";
    }

    commentElement.push(
      <li>
          <article className="uk-comment">
              <header className="uk-comment-header">
                  <img className="uk-comment-avatar" src={this.getProfileImage(item.profile_image,item.user_id)} alt="" width="40" height="40"/>
                  <h4 className="uk-comment-title">{item.NAME}</h4>
                  <div className="uk-comment-meta"><span>{item.email}</span> | {item.address}</div>
              </header>
              <div className="uk-comment-body">
                  <p>{item.comment}</p>
              </div>
          </article>
          <a onClick={()=>this.setState({showCommentBox:item.id,replyContent:null})} className="reply_to_c">Reply</a>
          {commentBox}

          <ul>
            {this.loadChild(child)}
          </ul>

    </li>
  );
});


    return(
      {commentElement}

    )
  }

  renderPostContentModel(){
    const{userAuthSession} = this.props;
    var user = userAuthSession.userObject;

    return(
      <div id="postContentModel" className="uk-modal coment_popup">
          <div className="uk-modal-dialog uk-modal-dialog-blank">
          <button className="uk-modal-close uk-close" type="button" onClick={this.pauseAllYoutube}></button>
            <div className="uk-grid">

              <div className="uk-width-small-1-1 popup_img_right coment_pop_cont">


            {this.loadPostByInfo(this.state.clickedUser,this.state.clickedPost)}
              <h5 className="coment_heading">Comments</h5>
              <ul className="uk-comment-list" ref="commentsul">
                {this.renderComments(this.state.clickedPost)}
              </ul>


            <div className="comenting_form border-top_cf">
            <img className="uk-comment-avatar" src={this.getProfileImage(user.profile_image,user.id)} alt="" width="40" height="40"/>
            <textarea placeholder="Write Comment..." value={this.state.postComment} onChange={(e)=>this.setState({postComment:e.target.value})} ref="commentBox"></textarea>
            <a onClick={this.handleClickPostComment} className="uk-button uk-button-primary comment_btn">Post</a>
            </div>


        </div>
      </div>
    </div>
  </div>
    );
  }

  renderLatestPost(){
    const{dashboardData, userAuthSession} = this.props;
    var content;
    var latestPost = dashboardData.latestPost;
    var userProfile = userAuthSession.userObject;

    if(latestPost){
      var content = latestPost.content;
      var content_length = latestPost.content.length;
      var post_image = latestPost.image || latestPost.youtube_image;
      var postImage;
      var postVideo;
      var timestamp = moment(latestPost.created);
      var formatted = timestamp.format('YYYY-MM-DD HH:mm:ss');

      // Image content
      if(latestPost.image){
        if(content.length > 300){
        content = content.substring(0,300).concat(' ...LoadMore');
        }else{
        content = content;
        }
         postImage = this.state.uploadDir+"user_"+userProfile.id+"/"+post_image;
      }
      //Video Content
      else if (latestPost.youtube_image) {
        if(content.length > 300){
        content = content.substring(0,300).concat(' ...LoadMore');
        }else{
        content = content;
        }
         postVideo = latestPost.youtube_url;

      }

      //text content
      else {
        if(content.length > 500){
        content = content.substring(0,500).concat(' ...LoadMore');
        }else{
        content = content;
        }

      }

       return (
         <div className="uk-width-small-1-2 post_control">
        <div className="latest-post">
        <a href="#" className="post_txt_dashboard" data-uk-modal={post_image?"{target:'#postImageModel'}":"{target:'#postContentModel'}"} onClick={this.loadSinglePostContent.bind(this,latestPost.id,userProfile.id,postImage,latestPost.content,postVideo)}>

        <img src={post_image? this.state.uploadDir+"user_"+userProfile.id+"/thumbs/"+post_image: null} className="uk-float-left img_margin_right"/>
        <p style={{paddingTop:3,paddingRight:10}}>{content}</p>
        <small className="user_location post_timestamp" style={{margin:7}}>
        <TimeAgo date={formatted} /></small>
        </a>

        </div>
        {/* <div id='postContentPop' className="uk-modal coment_popup">
            <div className="uk-modal-dialog uk-modal-dialog-blank">
           <button className="uk-modal-close uk-close" type="button"></button>
             <div className="uk-grid">

               <div className="uk-width-small-1-1 popup_img_right coment_pop_cont">

               <article className="uk-comment">
                    <header className="uk-comment-header">
                        {userProfile.profile_image?<img src={this.getProfileImage(userProfile.profile_image,userProfile.id)} className="uk-comment-avatar" width="60" height="60"/>:null}

                        <h4 className="uk-comment-title">{userProfile.first_name} {userProfile.last_name}</h4>
                        <div className="uk-comment-meta">{userProfile.address}<span>{userProfile.email}</span></div>
                    </header>

                    <div className="uk-comment-body">
                      <div className="uk-width-small-1-1 post_control">
                        {post_image?<img src={this.state.uploadDir+"user_"+userProfile.id+"/thumbs/"+post_image} className="uk-float-left img_margin_right"/>:null}
                         <p>{latestPost.content}</p>
                     </div>
                    </div>
                </article>
               <h5 className="coment_heading">Comments</h5>
               {/* <ul className="uk-comment-list" ref="commentsul">
                  {comments?this.renderComments(item.post_id):null}
             </ul> }


             <div className="comenting_form border-top_cf">
             <img className="uk-comment-avatar" src="public/images/user.jpg" alt="" width="40" height="40"/>
             <textarea placeholder="Write Comment..."></textarea>
             <input type="submit" value="Send"/>
             </div>


         </div>
        </div>
      </div>
    </div> */}
  </div>
      );
    }
  }



  handleVideoLinkChange(e){

    var videoid = e.target.value.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);

    if(videoid != null) {
      //console.log("video id = ",videoid[1]);
      var videoLink = 'https://www.youtube.com/embed/'+videoid[1];
      var videoImg = "https://img.youtube.com/vi/"+videoid[1]+"/0.jpg"
      this.setState({videoLink:videoLink,image:null,videoImage:videoImg});
      //console.log("https://img.youtube.com/vi/"+videoid[1]+"/0.jpg");
    } else {
      //console.log("The youtube url is not valid.");
      this.setState({videoLink:null,image:null,videoImage:null})
    }
    //if()
    //this.setState({videoLink:e.target.value,image:null})
  }

 renderCategoryModel(){
   const{dashboardData} = this.props;
   var categoryMessage;
   if(this.state.handleMessage.error){
      categoryMessage = (<div className="uk-alert uk-alert-danger"><p>{this.state.handleMessage.error}</p></div>);
   }else if (this.state.handleMessage.success) {
     categoryMessage = (<div className="uk-alert uk-alert-success"><p>{this.state.handleMessage.success}</p></div>);
   }else if (dashboardData && dashboardData.error) {
       categoryMessage = (<div className="uk-alert uk-alert-danger"><p>{dashboardData.error}</p></div>);
   }else if (dashboardData && dashboardData.success) {
       categoryMessage = (<div className="uk-alert uk-alert-success"><p>{dashboardData.success}</p></div>);
   }

   return(
     <div id="categoryModal" className="uk-modal" ref="modal" >
       <div className="uk-modal-dialog">
          <button type="button" className="uk-modal-close uk-close" onClick={this.pauseAllYoutube}></button>

            <form className="uk-form uk-margin uk-form-stacked add_category">
              {categoryMessage}
                  <fieldset>

                    <div className="uk-grid">
                      <div className="uk-width-1-1">
                        <div className="uk-form-controls">
                          <label className="uk-form-label" for="form-gs-street">Add Category</label>
                          <input id="" placeholder="Category name" className="uk-width-10-10" type="text" ref="categoryName"/>

                            <a className="uk-button uk-button-primary" onClick={this.handleClickAddCategory} style={{marginTop:5,float:'right'}}>Add</a>

                        </div>
                      </div>
                    </div>

                </fieldset>

             </form>
             <CategoryList
                categories={dashboardData.categories}
                onDeleteClick={this.props.onDeleteClick}
                onChange={this.props.onChange}
                />

        </div>

      </div>

   );
 }

 renderStatusModel(){
   var errorLabel;
   if(this.state.handleMessage && this.state.handleMessage.error){
       errorLabel = (
         <div className="uk-alert uk-alert-danger"><p>{this.state.handleMessage.error}</p></div>
       )
     }
  //var videoSrc = "http://www.youtube.com/embed/" + this.state.videoLink;
   return(
     <div id="statusImageModel" className="uk-modal" >

        <div className="uk-modal-dialog uk-text-center" >
          <form className="post_img_modal_form">
          {errorLabel}
           {this.state.image
             ?<div className="img_border"><img src={this.state.image}   ref="postImage"/>
           <textarea placeholder="text about image" className="uk-width-1-1" ref="postImageContent" >{this.state.postMessage}</textarea>
             </div>:null}

            {this.state.videoLink?
              <div className="img_border">
              <iframe className="player" type="text/html" width="100%" height="100%" src={this.state.videoLink}/>
              <textarea placeholder="text about video" className="uk-width-1-1" ref="postImageContent" >{this.state.postMessage}</textarea>
              </div>
            : null}

             <br />
             {this.state.clickedImageIcon?
           <input type="file"  ref="file" className="uk-float-left"  onChange={this.handleImageChange.bind(this)}/>
           :null}
         {this.state.clickedYouTubeLink?
          <input type="text" ref="videoLink" className="input-img-url"  value={this.state.videoLink} placeholder="Enter youtube url" onChange={this.handleVideoLinkChange}/>
          :null}
      {(this.state.image || this.state.videoLink) ?
          <div className="uk-modal-footer uk-text-right">
                        <button className="uk-button uk-modal-close" type="button">Cancel</button>
                        <input className="uk-button uk-button-primary uk-modal-close" type="button" onClick={this.handleSavePostImage} value="Save" />
                    </div>

      : null}
      </form>
      </div>
    </div>
   );
 }

 renderSendEmailModel(){
   const{dashboardData} = this.props;
   var errorLabel;
   if(this.state.errorMessage && this.state.errorMessage.sendEmail){
       errorLabel = (
         <div className="uk-alert uk-alert-danger"><p>{this.state.errorMessage.sendEmail}</p></div>
       )
     }else if (dashboardData && dashboardData.error) {
       errorLabel = (
         <div className="uk-alert uk-alert-danger"><p>{dashboardData.error}</p></div>
       )
     }else if (dashboardData && dashboardData.success) {
       errorLabel = (
         <div className="uk-alert uk-alert-success"><p>{dashboardData.success}</p></div>
       )
     }
   return(
     <div id="sendEmail" className="uk-modal" ref="modal" >
          <div className="uk-modal-dialog">
             <button type="button" className="uk-modal-close uk-close" onClick={this.pauseAllYoutube}></button>

             <div className="uk-modal-header">
                 <h3>Send Email</h3>
             </div>
             {errorLabel}
            <form className="uk-form">
                   <div className="uk-form-row">
                       <input className="uk-width-1-1 uk-form-large" placeholder="To" type="text" ref="sendto" disabled="disabled"/>
                   </div>
                   <div className="uk-form-row">
                       <input className="uk-width-1-1 uk-form-large" placeholder="Subject" type="text" ref="Subject"/>
                   </div>
                   <div className="uk-form-row">
                      <textarea className="uk-width-1-1 uk-form-large" placeholder="Body" rows="8" ref="emailBody"></textarea>

                   </div>
                   <div className="uk-form-row">
                       <a className="uk-button uk-button-primary uk-button-large" onClick={this.handleOnClickSendEmail}>Send Mail</a>
                   </div>
               </form>
          </div>
        </div>
   );
 }

  render() {
    const { dispatch, userAuthSession, friendsPosts, dashboardData} = this.props;
    var userProfileData = userAuthSession.userObject;
    var content;
    var errorLabel;
    if(userProfileData){
    var profile_link = "/user/"+userProfileData.id;
  }else{
      var profile_link = null;
  }



    if(userProfileData)
    return (

      <div className="uk-container uk-container-center middle_content dashboad">


         <div className="uk-grid dash_top_head my_profile">


          <div className="uk-width-small-1-2">
            <div className="uk-grid uk-grid-small">
            <div className="uk-width-3-10 user_img_left">
              <Link to={profile_link}><img src={this.getProfileImage(userProfileData.profile_image,userProfileData.id)}/></Link>

            </div>
            <div className="uk-width-7-10 user_img_right">
            <h3><Link to={profile_link}  className="user-name-anchor">{userProfileData.first_name} {userProfileData.last_name}</Link>

               <small className="uk-float-right">{userProfileData.email}</small></h3>


            <div className="cont_post_btn">
              <textarea placeholder="Post to ambulist..." className="uk-width-1-1" onChange={this.handlePostMessage} ref="postContent"></textarea>
              <a className="uk-button uk-button-primary uk-button-large" onClick={this.handleSavePost}>Post</a>
              <div className="yt_img"><i data-uk-tooltip title="Upload Image" className="uk-icon-image" data-uk-modal="{target:'#statusImageModel'}" style={{cursor:"pointer"}} onClick={()=>this.setState({clickedYouTubeLink:null,clickedImageIcon:true,videoLink:null,image:null})}></i>
              
            </div>

          </div>

            </div>
            </div>
          </div>

           {this.renderLatestPost()}

         </div>
         <div className="uk-width-small-1-1 shortlist_menu">
           <ul>
             <li onClick={this.sortByAllCategory} className={this.state.active_cat == 'all'?"active_sm":''}>All</li>
             {this.renderCategoriesContent()}

        </ul>
        <div className="uk-float-right">
        <label>Sort</label>
          <select name="sort" ref="sortFriends" onChange={this.handleChangeSort}>
            <option selected="true" value="created">Recent</option>
            <option value="first_name">First name</option>
            <option value="last_name">Last name</option>
            <option value="email">Email</option>
            <option value="latitude">Location</option>


        </select>
        </div>
          </div>

            {this.renderFriendList()}
            {this.renderSendEmailModel()}
            {this.renderCategoryModel()}
            {this.renderStatusModel()}
            {this.renderPostContentModel()}
            {this.renderImageContentModel()}


      </div>


    );
    else {
      return(
        <div>Dashboard</div>
      )
    }
  }
}

DashboardPage.contextTypes = {

};

function select(state) {
  return {
  };
}

var customPrevIcon = React.createClass({

  render(){
    return  <button className='button-left' {...this.props}>Prev</button>
  }
});
var customNextIcon = React.createClass({

  render(){
    return  <button className='button-right' {...this.props}>Next</button>
  }
});





// Wrap the component to inject dispatch and state into it
export default connect(select)(DashboardPage);
