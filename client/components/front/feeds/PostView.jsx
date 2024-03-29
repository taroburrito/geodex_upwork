import React, { Component, PropTypes } from 'react';
import { Navigation, Link } from 'react-router';
import Comments from '../Comments';

export default class PostView extends Component {
  constructor(props) {
    super(props);
    this.state={
      clickedPost:null,
      itemsPerPage:10,
      totalItems:null,
    }
  }

  componentWillMount(){

  }
  componentDidMount(){

  }
  getProfileImage(img,userId){
     if(img){
       var imageSrc = "uploads/images/user_"+userId+"/"+img;
      return imageSrc;
    }else{
     return "public/images/user.png";
    }

  }

  loadSinglePostContent(postId,userId,popupImage,popupContent,postVideo){
    this.props.loadSinglePostContent(postId,userId,popupImage,popupContent,postVideo);
  }

  loadMore(itemsPerPage){
    const{userAuthSession} = this.props;
    //this.setState({itemsPerPage:itemsPerPage+this.state.itemsPerPage});

    this.props.fetchMorePosts(userAuthSession.userObject.id,itemsPerPage,this.state.itemsPerPage);
  }


  render(){
    const{posts} = this.props;
    if(posts){
    var postItem = [];
    var len = Object.keys(posts).length;

    if(posts && len > 0){
      var i=1;
      Object.keys(posts).forEach((postId)=>{
        var post = posts[postId];
        var post_image = post.image || post.youtube_image;
        var content = post.content;

        // var postCount = i + parseInt(this.state.itemsPerPage);
        // console.log("count="+postCount);
        // console.log(len);

        // Image content
        if(post_image && post.image){
          if(content.length > 300){
          content = content.substring(0,300).concat(' ...LoadMore');
          }else{
          content = content;
          }
          var imgSrc = "uploads/images/user_"+post.user_id+"/medium/"+post_image;
          var postVideo = null;
          var postImage = "uploads/images/user_"+post.user_id+"/"+post_image;;
        }
        //Video Content
        else if (post_image && post.youtube_image) {
          if(content.length > 300){
          content = content.substring(0,300).concat(' ...LoadMore');
          }else{
          content = content;
          }
          var imgSrc = "uploads/images/user_"+post.user_id+"/thumbs/"+post_image;
          var postVideo = post.youtube_url;
          var postImage = null;
        }

        //text content
        else {
          if(content.length > 500){
          content = content.substring(0,500).concat(' ...LoadMore');
          }else{
          content = content;
          }
          var imgSrc = null;
          var postVideo = null;
          var postImage = null;
        }

        if(this.props.filter != 'photos'){
          if(this.props.filter == 'news' && post.is_news == 'yes' ){
            var isRender = true;
          }else if (this.props.filter == 'no_news' && post.is_news != 'yes') {
            var isRender = true;
          }else if (this.props.filter == 'all') {
            var isRender = true;
          }else {
            var isRender = false;
          }
          if(isRender)
      postItem.push(

      <div className={this.props.animation?"feeds-box animated  fadeIn":"feeds-box animated"}>
        <article className="uk-comment uk-comment-primary">
          <header className=" feeds-header uk-grid-medium uk-flex-middle" uk-grid>

            <div className="uk-width-auto">
              <img className="uk-comment-avatar" src={this.getProfileImage(post.profile_image,post.user_id)} width="80" height="80" alt=""/>
            </div>
            <div className="uk-width-expand">
              <h4 className="uk-comment-title uk-margin-remove"><Link to={"/user/"+post.user_id}>{post.NAME}</Link></h4>
              <span className="feeds-address">{post.address}</span>
                <span className="feeds-address">{post.email}</span>

              </div>
            </header>
            <div className="uk-comment-body">
              <div className="feed-heading">
                <h3><a href={post.link} target="_blank">{post.title}</a></h3>
                <span>{post.news_source}</span>
              </div>
              <a href="#" data-uk-modal={post_image?"{target:'#postImageModel'}":"{target:'#postContentModel'}"} onClick={this.loadSinglePostContent.bind(this,post.id,post.user_id,postImage,post.content,postVideo)}>
                <div className="feed_img"><img src={imgSrc} className=""/></div>

                <p>{content}</p>
              </a>

            </div>
            <div className="feed_comments_section">
              <a onClick={()=>this.setState({clickedPost:post.id})} className="reply_to_c">Comments</a>
              {(this.state.clickedPost == post.id)?
                <div className="feeds_overflow">
                <Comments
                  postId={post.id}
                  comments={this.props.comments}
                  userAuthSession={this.props.userAuthSession}
                  fetchComments={this.props.fetchComments}
                  handleClickPostComment={this.props.handleClickPostComment}
                  postComment={this.props.postComment}
                  />
                </div>
                :null}
            </div>
          </article>

          {/* {(len % this.state.itemsPerPage == 0 && i == len) ?<div className="uk-width-large-1"><a className="loadMore" onClick={this.loadMore.bind(this,len)}>Load More</a></div>:null} */}
        </div>

    );i++;
  }

  });
}else{
    postItem.push(
      <div>No post to show</div>
    );
}
    return(
      <div>

          {postItem}

      </div>

    )
  }else {
    return (
      <div></div>
    )
  }
}
}
