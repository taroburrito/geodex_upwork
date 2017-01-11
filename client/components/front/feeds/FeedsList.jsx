import React, { Component, PropTypes } from 'react';
import { Navigation, Link } from 'react-router';
import MasonryLayout from 'react-masonry-layout'

//import InfiniteScroll from 'react-infinite-scroller';

export default class FeedsList extends Component {

    constructor(props){
        super(props);

        this.state={
          clickedPost:null,
          clickedUser:null,
          clickedPostImage:null,
          clickedPostContent:null,
          clickedPostVideo:null,
          active_cat:null,
          filter:'all',
          animation:false,
        },
        this.handleFilterFeeds = this.handleFilterFeeds.bind(this);

    }
    componentWillMount() {
      const{userAuthSession} = this.props;

    }

    loadSinglePostContent(postId,userId,popupImage,popupContent,postVideo){

      //this.props.fetchComments(postId);

      this.setState({clickedPostImage:popupImage,clickedPostContent:popupContent,clickedPostVideo:postVideo,clickedPost:postId,clickedUser:userId});

    }

    getProfileImage(img,userId){
       if(img){
         var imageSrc = "uploads/images/user_"+userId+"/"+img;
        return imageSrc;
      }else{
       return "public/images/user.png";
      }

    }

    loadPostByInfo(userId,postId){
     const{posts} = this.props;
        if(posts)
        var post = _.find(posts, function (o) { return o.id == postId; })
        if(post)
      return(

        <article className="uk-comment">
            <header className="uk-comment-header">
                <img src={this.getProfileImage(post.profile_image,post.user_id)} className="uk-comment-avatar" width="60" height="60"/>
                <Link to={"user/"+post.user_id}>
                  <h4 className="uk-comment-title">{post.NAME}</h4>
                </Link>

                <div className="uk-comment-meta"><span>{post.address}</span></div>
            </header>

            <div className="uk-comment-body">
              <div className="uk-width-small-1-1 post_control">
              <p>{this.state.clickedPostContent}</p>
              </div>
            </div>
        </article>
      )

    }

    postImageModal(){
      return(
        <div id="postImageModel" className="uk-modal coment_popup">
            <div className="uk-modal-dialog uk-modal-dialog-blank">
            <button className="uk-modal-close uk-close" type="button"></button>
              <div className="uk-grid">

                <div className="uk-width-small-3-4 popup_img_left">
                  <div className="image-gallery-slide">
                  {this.state.clickedPostImage?<img src={this.state.clickedPostImage}/>:null}
                  {this.state.clickedPostVideo?<iframe src={this.state.clickedPostVideo} height="500" width="700"/>:null}
                </div>
                </div>
                <div className="uk-width-small-1-4 popup_img_right">

                  {this.loadPostByInfo(this.state.clickedUser,this.state.clickedPost)}
                  <h5 className="coment_heading">Comments</h5>
                  <ul className="uk-comment-list">
                    {/* {this.renderComments(this.state.clickedPost)} */}
                  </ul>

                    {/* <div className="comenting_form border-top_cf">
                      <img className="uk-comment-avatar" src={this.getProfileImage(user.profile_image,user.id)} alt="" width="40" height="40"/>
                      <textarea placeholder="Write Comment..." value={this.state.postComment} onChange={(e)=>this.setState({postComment:e.target.value})} ref="commentBox"></textarea>
                      <a onClick={this.handleClickPostComment} className="uk-button uk-button-primary comment_btn">Post</a>
                    </div> */}


                </div>
              </div>
          </div>
        </div>
      );
    }

    postContentModal(){
      return(
        <div id="postContentModel" className="uk-modal coment_popup">
            <div className="uk-modal-dialog uk-modal-dialog-blank">
            <button className="uk-modal-close uk-close" type="button"></button>
              <div className="uk-grid">

                <div className="uk-width-small-1-1 popup_img_right coment_pop_cont">


              {this.loadPostByInfo(this.state.clickedUser,this.state.clickedPost)}
                <h5 className="coment_heading">Comments</h5>
                <ul className="uk-comment-list" ref="commentsul">
                  {/* {this.renderComments(this.state.clickedPost)} */}
                </ul>


              {/* <div className="comenting_form border-top_cf">
              <img className="uk-comment-avatar" src={this.getProfileImage(user.profile_image,user.id)} alt="" width="40" height="40"/>
              <textarea placeholder="Write Comment..." value={this.state.postComment} onChange={(e)=>this.setState({postComment:e.target.value})} ref="commentBox"></textarea>
              <a onClick={this.handleClickPostComment} className="uk-button uk-button-primary comment_btn">Post</a>
              </div> */}


          </div>
        </div>
      </div>
    </div>
      )
    }

    sortByCategory(catId){
      const{userAuthSession} = this.props;
      this.setState({active_cat: catId,animation:true});
      setTimeout(function() { this.setState({animation: false}); }.bind(this), 1000);
      if(!catId){
        this.props.fetchUniversalPosts();
      }else{
      this.props.fetchPostByFriendsCategory(userAuthSession.userObject.id,catId);
    }
      //this.props.fetchInitialData(userAuthSession.userObject.id, catId);
    }

    renderCategoriesContent(){
      const{categories} = this.props;
      var categoriesElement = [];

      if(categories)
      categoriesElement.push(<li id="all" onClick={this.sortByCategory.bind(this,null)} className={!this.state.active_cat? "active_sm":''}>All</li>);
      Object.keys(categories).map(function (key) {
        var item = categories[key];
        categoriesElement.push(<li id={item.id} onClick={this.sortByCategory.bind(this,item.id)} className={this.state.active_cat == item.id ? "active_sm":''}>{item.category_name}</li>);
      }, this);


      return (
        <div className="uk-width-small-1-1 shortlist_menu">
          <ul>
            {categoriesElement}
          </ul>
        </div>

      );
    }

    handleFilterFeeds(){
      var state = this.refs.filterFeeds.getDOMNode().value;
      this.setState({filter:state,animation:true});
        setTimeout(function() { this.setState({animation: false}); }.bind(this), 1000);
    }

    renderSortContent(){
      return(
      <div className="uk-width-small-1-1 shortlist_menu">
        <ul>
          <li onClick={this.filterFeeds.bind(this,'all')} className={this.state.filter === 'all'?'active_sm':''}>All</li>
          <li onClick={this.filterFeeds.bind(this,'photos')} className={this.state.filter === 'photos'?'active_sm':''}>Photos</li>
        </ul>
      </div>
    )
    }

    renderAllPosts(){
      const{posts} = this.props;

      var postItem = [];
      var len = Object.keys(posts).length;

      if(posts && len > 0){

        Object.keys(posts).forEach((postId)=>{
          var post = posts[postId];
          var post_image = post.image || post.youtube_image;
          var content = post.content;



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



        postItem.push(

        <div className={this.state.animation?"feeds-box animated  fadeIn":"feeds-box animated"}>
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
                <a href="#" data-uk-modal={post_image?"{target:'#postImageModel'}":"{target:'#postContentModel'}"} onClick={this.loadSinglePostContent.bind(this,post.id,post.user_id,postImage,post.content,postVideo)}>
                  <div className="feed_img"><img src={imgSrc} className=""/></div>

                  <p>{content}</p>
                </a>
              </div>
            </article>
          </div>

      );

    });
  }else{
      postItem.push(
        <div>No post to show</div>
      );
  }
      return(
        {postItem}
      )
    }
    renderPhotos(){
      const{posts} = this.props;

      var postItem = [];
      var len = Object.keys(posts).length;

      if(posts && len > 0){
        var i = 1;
        Object.keys(posts).forEach((postId)=>{
          var post = posts[postId];
          var post_image = post.image || post.youtube_image;




          // Image content
          if(post_image && post.image){

            var imgSrc = "uploads/images/user_"+post.user_id+"/medium/"+post_image;
            var postVideo = null;
            var postImage = "uploads/images/user_"+post.user_id+"/"+post_image;;
          }
          //Video Content
          else if (post_image && post.youtube_image) {

            var imgSrc = "uploads/images/user_"+post.user_id+"/thumbs/"+post_image;
            var postVideo = post.youtube_url;
            var postImage = null;
          }

          //text content
          else {

            var imgSrc = null;
            var postVideo = null;
            var postImage = null;
          }


          if(post_image){
        postItem.push(

        <div className={this.state.animation?" animated  fadeIn":" animated"}
          // style={{
          //   maxWidth: '250px',
          //   height: `${i % 2 === 0 ? 3 * 50 : 150 }px`,
          //   display: 'block',
          //   background: 'rgba(0,0,0,0.7)'
          // }}
          >


              <div className="feeds_photos">
                <a href="#" data-uk-modal={post_image?"{target:'#postImageModel'}":"{target:'#postContentModel'}"} onClick={this.loadSinglePostContent.bind(this,post.id,post.user_id,postImage,null,postVideo)}>
                  <div className="feed_img"><img src={imgSrc} className=""/></div>


                </a>
              </div>

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
        <div className="feeds-box">
        {/* <MasonryLayout
      id="items" > */}


        {postItem}

    {/* </MasonryLayout> */}
  </div>

      )
    }
    render() {

          return (
            <div>
              <select name="sort" ref="filterFeeds" onChange={this.handleFilterFeeds}>
                <option selected="true" value="all">All</option>
                <option value="photos">Photos</option>
                </select>
              {this.renderCategoriesContent()}
              {this.state.filter == 'all'? this.renderAllPosts(): this.renderPhotos()}
              {this.postImageModal()}
              {this.postContentModal()}
            </div>
              );
        }

}
