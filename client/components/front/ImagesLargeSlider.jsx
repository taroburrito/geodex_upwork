import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navigation, Link } from 'react-router';
import ImageGallery from 'react-image-gallery';

export default class ImagesLargeSlider extends Component {
  constructor(props) {
    super(props);
    this.onSlide = this.onSlide.bind(this);
    }

    onSlide(e){
      //React.unmountComponentAtNode(document.getElementById('test'));
        this._imageGallery.slideToIndex(e);
        var postId = this._imageGallery.props.items[e].postId;
        //this.props.fetchComments(postId);
      //this.loadPostContent(postId,this.state.clickedUser,null,null,e);
      //  this.setState({clickedPost:postId});

    }

  render(){
    const{dashboardData} = this.props;
     var friendsPosts = dashboardData.friendsPostImages;
     var friend_post_images;
      if(friendsPosts)
      var friendsPost = friendsPosts[this.props.clickedUser];
        if(friendsPost && friendsPost.length > 0){
          //var newPost = this.sortImages(friendsPost, e => e.id === this.state.clickedPost);

        var friendElement = [];
        var i = 0;
        Object.keys(friendsPost).forEach((postImage)=> {

          var postContent = friendsPost[postImage];
          var postImageSrc = "uploads/images/user_"+postContent.user_id+"/"+postContent.post_image;
          if(postImage)
          friendElement.push(
            {
              original:postImageSrc,
              postId:postContent.id,
            }

          );
          i++;

        });
      }

      // const{dashboardData} = this.props;
      //  var friendsPosts = dashboardData.friendsPostImages;
      //  var friend_post_images;
      //  if(friendsPosts)
      //  var friendsPost = friendsPosts[user_id];
      //    if(friendsPost && friendsPost.length > 0){
      //      //var newPost = this.sortImages(friendsPost, e => e.id === this.state.clickedPost);
      //
      //    var friendElement = [];
      //    var i = 0;
      //    Object.keys(friendsPost).forEach((postImage)=> {
      //
      //      var postContent = friendsPost[postImage];
      //      var postImageSrc = this.state.uploadDir+"user_"+postContent.user_id+"/"+postContent.post_image;
      //      if(postImage)
      //      friendElement.push(
      //        {
      //          original:postImageSrc,
      //          postId:postContent.id,
      //        }
      //
      //      );
      //      i++;
      //
      //    });
    //

         return(

          <ImageGallery

          ref={i => this._imageGallery = i}
          items={friendElement}
          slideInterval={200}
          startIndex={0}
          onSlide={this.onSlide}
          infinite={false}
          showIndex={false}
          showBullets={false}
        //  showNav={false}
          //onClick={this.clickSlider}
        //  onImageLoad={this.imageSlideTo.bind(this,this.state.currentSlide)}
          />


        );
  //}
}
   }
