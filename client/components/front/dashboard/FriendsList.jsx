import React, {Component} from 'react';
import { Navigation, Link } from 'react-router';
import { getProfileImage } from '../../../utilities/RegexValidators';
import Comments from '../Comments';

var Slider = require('react-slick');
var moment = require('moment');
import ImageGallery from 'react-image-gallery';

export default class FriendsList extends Component {
  constructor(props) {
    super(props);
    this.loadPostImg = this.loadPostImg.bind(this);
    this.handleOnClickSendEmail = this.handleOnClickSendEmail.bind(this);
    this.handleCloseImagePopUp = this.handleCloseImagePopUp.bind(this);
    this.state= this.props;
  }

  handleCloseImagePopUp(){
     this.setState({showLargeSlider:false,postLargeImage:null,popupVideo:null});
   //  console.log("closed");
 }

  handleOnClickEmailIcon(email){
      this.refs.sendto.getDOMNode().value = email;
      this.resetEmailForm();
     // console.log(email);
  }

  loadPrevImg(userId,postId){
    const{dashboardData,userAuthSession} = this.props;
    var friendsPost = dashboardData.friendsPostImages[userId];
    if(friendsPost){
    var findPostKey = _.findKey(friendsPost, function (o) { return o.id == postId;})
    var newKey = findPostKey-1;
    var post = friendsPost[newKey];
    if(post && (!post.youtube_image && post.is_news !="yes")){
     this.setState({clickedPost:post.id});
   }else {
     //this.setState({disableNextBtn:true});
   }
   }
  }
  loadNextImg(userId,postId){
    const{dashboardData,userAuthSession} = this.props;
    var friendsPost = dashboardData.friendsPostImages[userId];
    if(friendsPost){
    var findPostKey = _.findKey(friendsPost, function (o) { return o.id == postId;})
    var newKey = parseInt(findPostKey)+1;
    var post = friendsPost[newKey];
    if(post && (!post.youtube_image && post.is_news !="yes")){
     this.setState({clickedPost:post.id});
   }else {
     //this.setState({disableNextBtn:true});
   }
   }
  }

  loadPostImg(userId,postId,is_single){

    const{dashboardData,userAuthSession} = this.props;

    if(is_single){
       var friendsPost = dashboardData.friends_post;
      if(friendsPost){
    //  var findPostKey = _.findKey(friendsPost, function (o) { return o.post_id == postId;})
       var post = friendsPost[userId];
       if(post && post.post_image){
         return(
           <div className="image-gallery-slide">
             <img src={getProfileImage(post.post_image,userId)}/>

           </div>
         );
       } else if (post && post.youtube_image) {
         return(
           <div className="image-gallery-slide">
            <iframe src={post.youtube_url}/>
           </div>
         );
       }
    }
    }else {
      if(this.state.showLargeSlider){
      var friendsPost = dashboardData.friendsPostImages[userId];
      if(friendsPost){
      var findPostKey = _.findKey(friendsPost, function (o) { return o.id == postId;})
       var post = friendsPost[findPostKey];
       if(post && post.image){
         return(
           <div className="image-gallery-slide">
             <img src={getProfileImage(post.post_image,userId)}/>

           </div>
         );
       } else if (post && post.youtube_image) {
         return(
           <div className="image-gallery-slide">
            <iframe src={post.youtube_url}/>
           </div>
         );
       }else {
         return(
           <div className="loading" style={{display:'block'}}>Loading</div>
         )
       }
    }
  }else {
    return(
      <div className="loading" style={{display:'block'}}>Loading</div>
    )
  }




   }
  }

  loadPrevPost(postId,userId){
    this.setState({clickedPost:null});

    this.props.onFetchPreviousPost(postId,userId);
  }

  loadNextPost(postId,userId){
    this.setState({clickedPost:null});

    this.props.onFetchNextPost(postId,userId);
  }

  loadSinglePostContent(postId,userId,content_type){

    console.log(postId+"|"+userId+"|"+content_type)

    if(content_type == 'image' || content_type == 'video'){
       var modal = UIkit.modal("#postSingleImageModel");
    }else  {
      var modal = UIkit.modal("#postContentModel");
    }
    modal.show();
    this.props.fetchComments(postId);
    this.setState({clickedPost:postId,clickedUser:userId,content_type:content_type,showLargeSlider:true});


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
        if(item.content.length > 300){
        var content = item.content.substring(0,100).concat(' ...');
        }else{
        var content = item.content;
        }
      //  console.log(item);
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
        //console.log(item);

        if(post_image && item.is_news !='yes'){
        friendElement.push(
            <div key={item.i} className="slider_image uk-grid-small uk-grid-width-medium-1-1">
              <figure className="uk-overlay uk-overlay-hover">



              <a data-uk-modal="{target:'#postImageModel'}"  onClick={this.loadPostContent.bind(this,item.id,item.user_id,null,item.content,i,null)}>
                <img src={postImage}/>

               {item.content?
                 <figcaption className="uk-overlay-panel uk-overlay-background uk-overlay-bottom">

                   <p>{content}</p>
               </figcaption>
               :null}
             </a>
               </figure>
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

           <Comments
             postId={this.state.clickedPost}
             comments={this.props.comments}
             userAuthSession={this.props.userAuthSession}
             fetchComments={this.props.fetchComments}
             postComment={(req)=>this.props.postComments(req) }
             page="dashboard"
             />
             </div>
     </div>
   </div>
 </div>
   );
 }

 imageSlideTo(e){
   //console.log("ee:"+e);
   this._imageGallery.slideToIndex(e);
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

_myImageGalleryRenderer(item) {
  //console.log('==============');
  //console.log(item); console.log('==============');
    // your own image error handling
    const onImageError = this._handleImageError;
    return (
      <div className='image-gallery-image'>
        {item.video?<iframe src={item.video} height="500" width="700"/>:<img src={item.original}/>}



      </div>
    )
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
     <div>
     <div id="postImageModel" className="uk-modal coment_popup">
         <div className="uk-modal-dialog uk-modal-dialog-blank">
         <button className="uk-modal-close uk-close" type="button" onClick={this.handleCloseImagePopUp}></button>
           <div className="uk-grid">

             <div className="uk-width-small-3-4 popup_img_left" ref="largeSliderContent">
                   {/* {(this.state.postLargeImage || this.state.popupVideo)?
                     {imageContent}:this.renderFriendsPostImagesLargeSlider(this.state.clickedUser)} */}
                    {this.loadPostImg(this.state.clickedUser,this.state.clickedPost,null)}
                    <button type="button" data-role="none" className="slick-prev" onClick={this.loadPrevImg.bind(this,this.state.clickedUser,this.state.clickedPost)}>Previous</button>
                    <button type="button" data-role="none" className="slick-next" onClick={this.loadNextImg.bind(this,this.state.clickedUser,this.state.clickedPost)}> Next</button>

             </div>
             <div className="uk-width-small-1-4 popup_img_right">

             {this.loadPostByInfo(this.state.clickedUser,this.state.clickedPost)}

             <Comments
               postId={this.state.clickedPost}
               comments={this.props.comments}
               userAuthSession={this.props.userAuthSession}
               fetchComments={this.props.fetchComments}
               postComment={(req)=>this.props.postComments(req) }
               page="dashboard"
               />


             </div>
           </div>
       </div>
     </div>
     <div id="postSingleImageModel" className="uk-modal coment_popup">
         <div className="uk-modal-dialog uk-modal-dialog-blank">
         <button className="uk-modal-close uk-close" type="button" onClick={this.handleCloseImagePopUp}></button>
           <div className="uk-grid">

             <div className="uk-width-small-3-4 popup_img_left" ref="largeSliderContent">

                    {this.loadPostImg(this.state.clickedUser,this.state.clickedPost,true)}
              </div>
             <div className="uk-width-small-1-4 popup_img_right">

             {this.loadPostByInfo(this.state.clickedUser,this.state.clickedPost)}

             <Comments
               postId={this.state.clickedPost}
               comments={this.props.comments}
               userAuthSession={this.props.userAuthSession}
               fetchComments={this.props.fetchComments}
               postComment={(req)=>this.props.postComments(req) }
               page="dashboard"
               />


             </div>
           </div>
       </div>
     </div>
   </div>
   )
 }


 loadPostByInfo(userId,postId){

   if(userId){
   const{dashboardData,userAuthSession} = this.props;


   // if latest post
   // if(userAuthSession.userObject.id === userId){
   //     var friendData = userAuthSession.userObject;
   //     var postContent = dashboardData.latestPost.content;
   // }else{

     //friends profile data

   var findPost = _.findKey(dashboardData.friends, function (o) { return o.id == userId;})
    var friendData = dashboardData.friends[findPost];


   // post content
   if(postId){

     var findPost = _.findKey(dashboardData.friendsPostImages[userId], function (o) { return o.id == postId;})
     if(!findPost){
       var findPost = _.findKey(dashboardData.friends, function (o) { return o.post_id == postId;})
       var friendPost = dashboardData.friends[findPost];
       if(friendPost){
       var postContent = friendPost.post_content;
     }else{
        var postContent = null;
     }
     }else {
       var postContent = dashboardData.friendsPostImages[userId][findPost].content;
     }

   }else{
       var postContent = null;
   }
//  }



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
             <img src={getProfileImage(friendData.profile_image,userId)} className="uk-comment-avatar" width="60" height="60"/>
             <Link to={profile_link}>
               <h4 className="uk-comment-title">{friendData.first_name} {friendData.last_name}</h4>
             </Link>

             <div className="uk-comment-meta"><span>{friendData.address}</span></div>
         </header>

         <div className="uk-comment-body">
           <div className="uk-width-small-1-1 post_control">
           <p>{postContent}</p>
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

 resetEmailForm(){
   this.refs.Subject.getDOMNode().value = '';
   this.refs.emailBody.getDOMNode().value = '';
   this.setState({errorMessage:null});
 }

 renderSendEmailModel(){
   const{dashboardData} = this.props;
   var errorLabel;
   if(this.state.showMessage){
   if(this.state.errorMessage && this.state.errorMessage.sendEmail){
       errorLabel = (
         <div className="uk-alert uk-alert-danger"><p>{this.state.errorMessage.sendEmail}</p></div>
       )
     }
     else if (dashboardData && dashboardData.error) {
       errorLabel = (
         <div className="uk-alert uk-alert-danger"><p>{dashboardData.error}</p></div>
       )
     }else if (dashboardData && dashboardData.success) {
       errorLabel = (
         <div className="uk-alert uk-alert-success"><p>{dashboardData.success}</p></div>
       )
     }
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

 handleOnClickSendEmail(){
   const{userAuthSession} = this.props;
   var to = this.refs.sendto.getDOMNode().value;
   var from = userAuthSession.userObject.email;
   var subject = this.refs.Subject.getDOMNode().value.trim();
   var content = this.refs.emailBody.getDOMNode().value.trim();

   if(subject == ''){
     this.setState({errorMessage:{sendEmail:"Please enter subject"}});
   }else if (content == '') {
     this.setState({errorMessage:{sendEmail:"Please enter content"}});
   }else {
   this.props.sendEmail(from,to,subject,content);
   this.setState({errorMessage:null});
   }
   this.setState({showMessage:true});

 }

 __renderRecentPost(user_id){
   const{dashboardData} = this.props;
   var friendsPost = dashboardData.friends_post;
   if(friendsPost[user_id]){
     var item = friendsPost[user_id];
     var profile_link = "/user/"+user_id;
     var content = item.post_content;
     if(item){
       var content_length = content.length;
       var post_image = item.post_image || item.youtube_image;
       if(post_image){

         var imgSrc = this.state.uploadDir+"user_"+user_id+"/thumbs/"+post_image;
       }


       var postVideo;
       var postImage;
       var content_type;
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
          content_type="image";
       }
       //Video Content
       else if (item.youtube_image) {
         if(content.length > 300){
         content = content.substring(0,300).concat(' ...LoadMore');
         }else{
         content = content;
         }
          postVideo = item.youtube_url;
          content_type="video";

       }

       //text content
       else {
         if(content.length > 500){
         content = content.substring(0,500).concat(' ...LoadMore');
         }else{
         content = content;
         }
         content_type="text";
       }

      //  var animateidBlockClass;
      //  if(content == ''){
      //    animateidBlockClass = 'uk-width-small-2-10';
      //  }else{
      //    animateidBlockClass = 'uk-width-small-1-2';
      //  }
     }


   return(
     <div id="animateid" className="uk-width-small-1-2 post_control animated">
       <div>
       <img src='/public/images/Loading_icon.gif' id={"loader_"+user_id} className="loadingPost"/>

         <a href="#" className="post_txt_dashboard" data-uk-modal={post_image?"{target:'#postImageModel'}":"{target:'#postContentModel'}"} onClick={this.loadSinglePostContent.bind(this,item.post_id,user_id,content_type)}>
           {post_image?<img src={imgSrc} className="uk-float-right img_margin_left"/>:null}
         </a>

           <div className="dash-news-heading">
               <h3><a target="_blank" href={item.link}>{item.title}</a></h3>
               <span>{item.news_source}</span>
           </div>

             <a href="#" className="post_txt_dashboard" data-uk-modal={post_image?"{target:'#postImageModel'}":"{target:'#postContentModel'}"} onClick={this.loadSinglePostContent.bind(this,item.post_id,user_id,content_type)}>
               <p>{content}</p>
           </a>
            <small className="user_location post_timestamp">
            {/* <TimeAgo date={formatted} formatter= {formatter}  /> */}
            </small>

         <p>


           {item.prev && item.post_count!=1?<small onClick={this.loadPrevPost.bind(this,item.post_id,user_id)} href="" className="uk-slidenav uk-slidenav-previous"></small>:null}
           {item.next && item.post_count!=1?<small onClick={this.loadNextPost.bind(this,item.post_id,user_id)} className="uk-slidenav uk-slidenav-next"></small>:null}

         </p>
       </div>
     </div>
   )
 }
 }


  render(){
    const{dashboardData, userAuthSession} = this.props;
    var friendsElement = [];
    var friends = dashboardData.friends;
    console.log(dashboardData);
    console.log("***")
    if(friends)
    Object.keys(friends).map((key)=> {

      var item = friends[key];
      var user_id = friends[key].id;
      var profile_link = "/user/"+user_id;
      var content = item.post_content;

      if(item){
        var content_length = content.length;
        var post_image = item.post_image || item.youtube_image;
        if(post_image){

          var imgSrc = this.state.uploadDir+"user_"+user_id+"/thumbs/"+post_image;
        }


        var postVideo;
        var postImage;
        var content_type;
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
           content_type="image";
        }
        //Video Content
        else if (item.youtube_image) {
          if(content.length > 300){
          content = content.substring(0,300).concat(' ...LoadMore');
          }else{
          content = content;
          }
           postVideo = item.youtube_url;
           content_type="video";

        }

        //text content
        else {
          if(content.length > 500){
          content = content.substring(0,500).concat(' ...LoadMore');
          }else{
          content = content;
          }
          content_type="text";
        }
      }

      var animateidBlockClass;
      if(content == ''){
        animateidBlockClass = 'uk-width-small-2-10';
      }else{
        animateidBlockClass = 'uk-width-small-1-2';
      }

      var slider_images = this.renderFriendsPostImagesSmallSlider(user_id);
      friendsElement.push(
          <div ref="animate" key={key} className={this.state.animation ? "uk-grid dash_top_head dash_botom_list new_d animated fadeIn":'uk-grid dash_top_head dash_botom_list new_d animated'} id={item.id}>


            <div className="gray_strip" >
              <Link className="pro_i" to={profile_link}><img src={getProfileImage(item.profile_image,user_id)} className=""/></Link>

              <div className="top_usinfo gray_strip_2">
                <div className=" user_bottom_img_right">
                  <h3 className="capital_first"><Link to={profile_link} className="user-name-anchor">{item.first_name} {item.last_name} </Link>
                  <small className="user_location">{item.address}</small>
                  </h3>
                  {(user_id != userAuthSession.userObject.id)?
                    <div className=" comm-icon-div">

                    <a data-uk-modal="{target:'#sendEmail'}" onClick={this.handleOnClickEmailIcon.bind(this,item.email)} data={item.email}  href="#" className="">
                    <img className="comm-icons" src="public/images/email_icon.png" onClick={()=>this.setState({showMessage:false})}/>
                    </a>
                    <img className="comm-icons" src="public/images/message_icon.png"/>
                    <img className="comm-icons" src="public/images/phone_icon.png"/>

                    </div>
                        :null}
                  </div>
                </div>
            </div>

            <div className="uk-grid uk-grid-small below_gray_s">

            <div  className={(dashboardData.friends_post[user_id])?"uk-width-small-1-2":"uk-width-small-1-1"}>

              <div className="uk-grid uk-grid-small top_usinfo">
                    <div className="uk-width-1">
                      <div className="uk-grid uk-grid-small slider_contt">
                        <div className="uk-slidenav-position uk-margin" data-uk-slider="{autoplay: true}">
                          <div className="uk-slider-container img_slid">
                            {slider_images}
                          </div>
                        </div>
                     </div>
                  </div>

            </div>
          </div>
          {this.__renderRecentPost(user_id)}
          </div>
         </div>);

    });

    if(friendsElement && friendsElement.length > 0){
    return(
      <div >

    {friendsElement}
    {this.renderPostContentModel()}
    {this.renderImageContentModel()}
    {this.renderSendEmailModel()}
  </div>


    )
  }else {
      return(
        <div>No friend is added in this category, <Link to="manage_friends">Manage Friends </Link>here.</div>
      )
    }
  }
}
