import React, { Component, PropTypes } from 'react';

export default class LatestPost extends Component {
  constructor(props){
    super(props);

  }


loadSinglePostContent(postId,userId,postImage,postContent,postVideo){
  this.props.loadSinglePostContent(postId,userId,postImage,postContent,postVideo);
}
render(){

    const{dashboardData, userAuthSession} = this.props;
    var content;
    var latestPost = dashboardData.latestPost;
    var userProfile = userAuthSession.userObject;
    
    if(dashboardData.latestPost){
      var content = latestPost.content;
      var content_length = latestPost.content.length;
      var post_image = latestPost.image || latestPost.youtube_image;
      var postImage;
      var postVideo;
    //  var timestamp = moment(latestPost.created);
      //var formatted = timestamp.format('YYYY-MM-DD HH:mm:ss');

      // Image content
      if(latestPost.image){
        if(content.length > 300){
        content = content.substring(0,300).concat(' ...Read More');
        }else{
        content = content;
        }
         postImage = "uploads/images/user_"+userProfile.id+"/"+post_image;
      }
      //Video Content
      else if (latestPost.youtube_image) {
        if(content.length > 300){
        content = content.substring(0,300).concat(' ...Read More');
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
        <a  className="post_txt_dashboard" data-uk-modal onClick={this.loadSinglePostContent.bind(this,latestPost.id,userProfile.id,postImage,latestPost.content,postVideo)}>

        <img src={post_image? "uploads/images/user_"+userProfile.id+"/thumbs/"+post_image: null} className="uk-float-left img_margin_right"/>
        <p style={{paddingTop:3,paddingRight:10}}>{content}</p>
        <small className="user_location post_timestamp" style={{margin:7}}>
        {/* <TimeAgo date={formatted} formatter= {formatter} /> */}
        </small>
        </a>

        </div>

        </div>

      );
    }else{
      return(
        null
      )
    }

}
}
