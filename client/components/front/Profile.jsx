import React, { Component, PropTypes } from 'react';
// var Slider = require('react-slick');
var ScrollbarWrapper = require('react-scrollbars').ScrollbarWrapper;
import { validateDisplayName, formatter } from '../../utilities/RegexValidators';
var moment = require('moment');
import TimeAgo from 'react-timeago';
import ImageGallery from 'react-image-gallery';

export default class Profile extends Component {

    constructor(props){
        super(props);
        this.state={
          isFriendWithLoggedInUser: false,
          uploadDir: 'uploads/images/',

          popupContent:null,

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
          clickedYouTubeLink:null
        }
        this.handleClickAddFriend = this.handleClickAddFriend.bind(this);
      //  this.handleClickAcceptRequest = this.handleClickAcceptRequest.bind(this);
       this.handleClickDenyRequest = this.handleClickDenyRequest.bind(this);
       this.handleClickPostComment = this.handleClickPostComment.bind(this);
       this.onSlide = this.onSlide.bind(this);
       this.loadMorePosts = this.loadMorePosts.bind(this);
       this.handleOnClickSendEmail = this.handleOnClickSendEmail.bind(this);



    }
    componentWillMount() {
      //console.log(this.props);
    }
    componentDidMount(){
        setTimeout(function() {
          // Main content container
            var container = $('#content');

            // Masonry + ImagesLoaded
            container.imagesLoaded(function(){
              container.masonry({
                // selector for entry content
                columnWidth: 250,
                itemSelector: '.photos-item',
                isFitWidth:true,
                isAnimated: true
              });
            });
        }, 2000);

    }

    deletePost(postId){
      UIkit.modal.confirm('Are you sure to delete this?', function(){
         // do some thing if click Yes
         this.props.deletePost(postId);
         setTimeout(function() {
           // Main content container
             var container = $('#content');

             // Masonry + ImagesLoaded
             container.imagesLoaded(function(){
               container.masonry({
                 // selector for entry content
                 columnWidth: 250,
                 itemSelector: '.photos-item',
                 isFitWidth:true,
                 isAnimated: true
               });
             });
         }, 2000);
        }.bind(this),
         {labels: {'Ok': 'Yes', 'Cancel': 'No'}
       }
     );
      // if(UIkit.modal.confirm("Are you sure?")){
      // this.props.deletePost(postId);
      // setTimeout(function() {
      //   // Main content container
      //     var container = $('#content');
      //
      //     // Masonry + ImagesLoaded
      //     container.imagesLoaded(function(){
      //       container.masonry({
      //         // selector for entry content
      //         columnWidth: 250,
      //         itemSelector: '.photos-item',
      //         isFitWidth:true,
      //         isAnimated: true
      //       });
      //     });
      // }, 2000);
      // }



    }

    handleClickReplyComment(parent_id,post_id){

      //console.log("parent:"+parent_id);


      const{userAuthSession} = this.props;
      var req = {
        comment: this.state.replyContent,
        parent_id:parent_id,
        user_id: userAuthSession.userObject.id,
        post_id:post_id,
        status:1,
      }
      if(this.state.replyContent==null){
        this.addAlert("","type something to post comment...");
      }else{
        this.setState({showCommentBox:null,replyContent:null,postComment:null});
        this.props.postComment(req);
      }

      //this.props.postComment(req);

    }

    loadPostContent(postId,userId,popupImage,popupContent,currentSlide,postVideo){

      if(currentSlide){
        var current = parseInt(currentSlide) - 1;
        //console.log("current:"+current);
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
        this.setState({clickedPost:postId,clickedUser:userId,getClickedUser:userId,postLargeImage:popupImage,popupContent:popupContent,popupVideo:postVideo});
      this.props.fetchComments(postId);



    }

    handleClickPostComment(){
      const{userAuthSession} = this.props;
      this.refs.commentBox.getDOMNode().value = "";
      this.refs.contentCommentBox.getDOMNode().value = "";

      this.setState({replyContent:null,postComment:null});
      var req = {
        comment: this.state.postComment,
        parent_id:'',
        user_id: userAuthSession.userObject.id,
        post_id:this.state.clickedPost,
        status:1,
      }

      this.props.postComment(req);

     // console.log(req);

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

      if(friendStatus.status == 1 && LoggedInUserId != profileId){
        link = (
          <a className="uk-button add_friend_btn">Friends</a>
        );
      }else if (friendStatus.status == 0 && LoggedInUserId != profileId) {

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

    }else if(LoggedInUserId != profileId){
      link =(
          <a className="uk-button add_friend_btn" onClick={this.handleClickAddFriend}>Add Friend</a>
        )
    }
      return(
            {link}
        );


    }

    loadSinglePostContent(postId,userId,popupImage,popupContent,postVideo){

      this.setState({clickedPost:postId,clickedUser:userId,postLargeImage:popupImage,popupContent:popupContent,popupVideo:postVideo});
      this.props.fetchComments(postId);



    }

// Posts of visited user.
    renderPostsContent(){
        const{visitedUser,userAuthSession} = this.props;
        var posts = visitedUser.posts;

        var postItem = [];
        if(posts){
          Object.keys(posts).map((postId)=>{
          //  console.log(posts[key]);

            var item = posts[postId];

            var postContent = item.content;
            var postImage;
            var postVideo;
            var timestamp = moment(item.created);
            var formatted = timestamp.format('YYYY-MM-DD HH:mm:ss');
            var post_image = item.image || item.youtube_image;

            // Image content
            if(item.image){
              if(postContent.length > 300){
              postContent = postContent.substring(0,300).concat(' ...LoadMore');
              }else{
              postContent = postContent;
              }
               postImage = this.state.uploadDir+"user_"+item.user_id+"/"+item.image;
            }
            //Video Content
            else if (item.youtube_image) {
              if(postContent.length > 300){
              postContent = postContent.substring(0,300).concat(' ...LoadMore');
              }else{
              postContent = postContent;
              }
               postVideo = item.youtube_url;

            }

            //text content
            else {
              if(postContent.length > 500){
              postContent = postContent.substring(0,500).concat(' ...LoadMore');
              }else{
              postContent = postContent;
              }

            }
            postItem.push(
              <div className="uk-width-small-1-1 post_control">
                <div className="uk-width-small-1-1 uk-float-left">
                  <a href="#" className="post_txt_dashboard" data-uk-modal={post_image?"{target:'#postImageModel'}":"{target:'#postContentModel'}"} onClick={this.loadSinglePostContent.bind(this,item.id,item.user_id,postImage,item.content,postVideo)}>

                    <img src={post_image? this.state.uploadDir+"user_"+item.user_id+"/thumbs/"+post_image: null} className="uk-float-left img_margin_right"/>
                    <p>{postContent}  </p>
                    <small className="user_location post_timestamp">
                    {/* <TimeAgo date={formatted} formatter= {formatter}  /> */}
                    </small>

                  </a>

             </div>
             {(userAuthSession.userObject.id == item.user_id)?


               <div className="uk-button-dropdown btn_sm" data-uk-dropdown="{delay: 100}">
                  <a className="uk-button">Action<i className="uk-icon-caret-down"></i></a>
                    <div className="uk-dropdown uk-dropdown-small uk-dropdown-bottom">
                      <ul className="uk-nav uk-nav-dropdown">
                        <li><a onClick={this.deletePost.bind(this,item.id)}>Delete</a></li>
                      </ul>
                    </div>
              </div>

             :null}

           </div>
          );
          });
        }else{
          postItem.push(
            <div><p>No post is found for this user.</p></div>
          )
        }

        return(
          {postItem}
        )

    }

    onClickPhotoVideo(postId, currentSlide){



      this.setState({clickedPost:postId});
        if(this._imageGallery){
          this._imageGallery.slideToIndex(currentSlide-1);
        }
        this.props.fetchComments(postId);
    }

loadMorePosts(){
  const{visitedUser} = this.props;
  var posts = visitedUser.posts;

  var postContent = [];
  if(posts){
    var i = 1;
    Object.keys(posts).map((postId)=>{
    //  console.log(posts[key]);
      var item = posts[postId];
      if(item.image){
      var post_img = item.image;
      postContent.push(

        <div className="profile_post_photos">

            <a href="#photoVideoSlider" onClick={this.onClickPhotoVideo.bind(this,item.id,i)} data-uk-modal>
              <img src={this.state.uploadDir+'user_'+item.user_id+'/medium/'+post_img}/>

            </a>

      </div>
    );
    i++;
  }
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
      var i = 1;
      Object.keys(posts).map((postId)=>{
      //  console.log(posts[key]);

      //var findPost = _.findKey(posts, function (o) { return o.id == action.data;})
        var item = posts[postId];

     // console.log(item);
        if(item.image){
        var post_img = item.image;
        postContent.push(

          <div className="photos-item" >

              <a href="#photoVideoSlider" onClick={this.onClickPhotoVideo.bind(this,item.id,i)} data-uk-modal>
                <img className="photos-item-img" src={this.state.uploadDir+'user_'+item.user_id+'/medium/'+post_img}/>

              </a>

        </div>

      );
      i++;
    }
      });
    }else{
      postContent.push(
        <div><p>No post is found for this user.</p></div>
      )
    }

    return(
      <div className="profile_photos_container">
      <div id="content" >{postContent}</div>

      </div>


    )

}

onSlide(e){
  //React.unmountComponentAtNode(document.getElementById('test'));
    //this._imageGallery.slideToIndex(e);
    if(this._imageGallery){
  var postId = this._imageGallery.props.items[e].postId;
  this.setState({clickedPost:postId});
  this.props.fetchComments(postId);
}
  //this.loadPostContent(postId,this.state.clickedUser,null,null,e);


}

imageSlideTo(e){
  //console.log("ee:"+e);
  this._imageGallery.slideToIndex(e);
}

_myImageGalleryRenderer(item) {
    // your own image error handling
    const onImageError = this._handleImageError;
    return (
      <div className='image-gallery-image'>
        {item.video?<iframe src={item.video} height="500" width="700"/>:<img src={item.original}/>}



      </div>
    )
  }

renderFriendsPostImagesLargeSlider(user_id){


   const{visitedUser} = this.props;
   var posts = visitedUser.posts;
   if(posts){
     var postImgEle = [];
     var i = 0;
     Object.keys(posts).forEach((postId)=> {
       var item = posts[postId];
       var postContent = item.content;
       var postImageSrc = item.image?this.state.uploadDir+"user_"+item.user_id+"/"+item.image:null;
       if(item.image)
       postImgEle.push(
         {
           original:postImageSrc,
           postId:item.id
         }

       );
       i++;


     });
     return(
      <div>
        <ImageGallery
        ref={i => this._imageGallery = i}
        items={postImgEle}
        slideInterval={200}
        startIndex={this.state.currentSlide}
        onSlide={this.onSlide}
        infinite={false}
        showBullets={false}
        showThumbnails={false}
        autoPlay={false}
        showPlayButton={false}
        showFullscreenButton={false}
        renderItem={this._myImageGalleryRenderer.bind(this)}
      //  showNav={false}
        //onClick={this.clickSlider}
        onImageLoad={this.imageSlideTo.bind(this,this.state.currentSlide)}
        />

      </div>

    );
   }
  //console.log(friendsPost);

}

loadPostByInfo(userId,postId){

  const {visitedUser} = this.props;
  if(postId){
    var findPost = _.findKey(visitedUser.posts, function (o) { return o.id == postId;})
    var post = visitedUser.posts[findPost];
    var postContent = post.content;
  }else{
      var postContent = null;
  }
  if(visitedUser.userProfileData)
  var userProfileData = visitedUser.userProfileData;
  return(
    <article className="uk-comment">
        <header className="uk-comment-header">
            <img src={this.getProfileImage(userProfileData.profile_image,userId)} className="uk-comment-avatar" width="60" height="60"/>

            <h4 className="uk-comment-title">{userProfileData.first_name} {userProfileData.last_name}</h4>
            <div className="uk-comment-meta"><span>{userProfileData.address}</span></div>
        </header>

        <div className="uk-comment-body">
          <div className="uk-width-small-1-1 post_control">
          <p>{postContent}</p>
          </div>
        </div>
    </article>
  );

}

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
       <textarea placeholder="Reply comment..."  value={this.state.replyContent} onChange={(e)=>this.setState({replyContent:e.target.value})}></textarea>
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
      <textarea placeholder="Reply Comment..."  value={this.state.replyContent} onChange={(e)=>this.setState({replyContent:e.target.value})}></textarea>
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

renderPostImageModal(){
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
        <button className="uk-modal-close uk-close" type="button"></button>
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
    <div id="photoVideoSlider" className="uk-modal coment_popup">
        <div className="uk-modal-dialog uk-modal-dialog-blank">
        <button className="uk-modal-close uk-close" type="button"></button>
          <div className="uk-grid">

            <div className="uk-width-small-3-4 popup_img_left" ref="largeSliderContent">
                  {this.renderFriendsPostImagesLargeSlider(this.props.profileId)}
            </div>
            <div className="uk-width-small-1-4 popup_img_right">

            {this.loadPostByInfo(this.props.profileId,this.state.clickedPost)}
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
    </div>
);
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

renderPostContentModal(){
  const{userAuthSession} = this.props;
  var user = userAuthSession.userObject;
  return(
    <div id="postContentModel" className="uk-modal coment_popup">
        <div className="uk-modal-dialog uk-modal-dialog-blank">
        <button className="uk-modal-close uk-close" type="button"></button>
          <div className="uk-grid">

            <div className="uk-width-small-1-1 popup_img_right coment_pop_cont">


          {this.loadPostByInfo(this.state.clickedUser, this.state.clickedPost)}
            <h5 className="coment_heading">Comments</h5>
            <ul className="uk-comment-list" ref="commentsul">
              {this.renderComments(this.state.clickedPost)}
            </ul>


          <div className="comenting_form border-top_cf">
          <img className="uk-comment-avatar" src={this.getProfileImage(user.profile_image,user.id)} alt="" width="40" height="40"/>
          <textarea placeholder="Write Comment..." value={this.state.postComment} onChange={(e)=>this.setState({postComment:e.target.value})} ref="contentCommentBox"></textarea>
          <a onClick={this.handleClickPostComment} className="uk-button uk-button-primary comment_btn">Post</a>
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
        <div className="hidden-scrollbar">
          <div className="full_width">

            <div className="background_profile" style={background_profile_css}>
              <div className="uk-container uk-container-center">
                 <div className="uk-grid uk-grid-large dash_top_head">
                  <div className="uk-width-small-1-2">
                    <div className="uk-grid uk-grid-small">
                    <div className="uk-width-2-10 user_img_left profile_page_pic">
                      <img src={this.getProfileImage(userProfileData.profile_image,userProfileData.id)} />

                      </div>
                    <div className="uk-width-7-10 pro_right">
                      {(userAuthSession.userObject.id != this.props.profileId)? this.renderAddFriendLink(): null}
                    <h3 className="name-heading">{userProfileData.first_name} {userProfileData.last_name}</h3>
                    <h4>{userProfileData.address}</h4>
                    {/*<h5>{userProfileData.email} <i className="uk-icon-envelope"></i></h5>*/}
                    {(userAuthSession.userObject.id != this.props.profileId)? 
                         <a data-uk-modal="{target:'#sendEmail'}"  onClick={this.handleOnClickEmailIcon.bind(this,userProfileData.email)} data={userProfileData.email}  href="javascript:void(0)" className="">
                    {userProfileData.email}
                    </a>
                      : <h5>{userProfileData.email}</h5>
                    }
                    
                   
                    </div>
                    </div>
                  </div>
                 </div>
               </div>
              </div>


          <div className="uk-container uk-container-center middle_content profile">
             <div className="uk-grid uk-grid-large profile_bottom">

              <div className="uk-width-medium-1-2 profile_post_left">
              <h3>Photos</h3>

                  <ScrollbarWrapper>

                      {this.renderPhotos()}

                      </ScrollbarWrapper>


              </div>

              <div className="uk-width-medium-1-2 profile_post_right">
              <h3>Recent Activity</h3>
               <ScrollbarWrapper vertical={true} >
                  <div>
                    {this.renderPostsContent()}
                </div>
              </ScrollbarWrapper>


              </div>

             </div>
           </div>

        </div>
        {this.renderPostImageModal()}
        {this.renderPostContentModal()}
        {this.renderSendEmailModel()}
      </div>

      );

    }else{
      return(
        <div>Profile</div>
      )
    }
    }

}
