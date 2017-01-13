import React, { Component, PropTypes } from 'react';
import { Navigation, Link } from 'react-router';


import MasonryLayout from 'react-masonry-layout'

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
          postComment:null,
          replyContent:null,
        },
        this.handleFilterFeeds = this.handleFilterFeeds.bind(this);
        this.handleCloseImagePopUp = this.handleCloseImagePopUp.bind(this);
        this.handleClickPostComment = this.handleClickPostComment.bind(this);
        this.handleClickReplyComment = this.handleClickReplyComment.bind(this);

    }
    componentWillMount() {
      const{userAuthSession} = this.props;

    }

    componentDidMount(){

  }

    handleCloseImagePopUp(){
      this.setState({clickedPostImage:null,clickedPostVideo:null})
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

      if(this.state.postComment==null){
        this.addAlert("","type something to post comment...");
      }else{
        this.props.postComment(req);
      }



      //console.log(req);

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

    loadSinglePostContent(postId,userId,popupImage,popupContent,postVideo){

      this.props.fetchComments(postId);

      this.setState({
        clickedPostImage:popupImage,
        clickedPostContent:popupContent,
        clickedPostVideo:postVideo,
        clickedPost:postId,
        clickedUser:userId
      });

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
           <textarea placeholder="Write Comment..."  value={this.state.replyContent} onChange={(e)=>this.setState({replyContent:e.target.value})}></textarea>
           <a onClick={this.handleClickReplyComment.bind(this,item.id,item.post_id)} className="uk-button uk-button-primary comment_btn">Reply</a>
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
              <p>{post.content}</p>
              </div>
            </div>
        </article>
      )

    }

    postImageModal(){
      const{userAuthSession} = this.props;
      var user = userAuthSession.userObject;
      return(
        <div id="postImageModel" className="uk-modal coment_popup">
            <div className="uk-modal-dialog uk-modal-dialog-blank">
            <button className="uk-modal-close uk-close" type="button" onClick={this.handleCloseImagePopUp}></button>
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

    postContentModal(){
      const{userAuthSession} = this.props;
      var user = userAuthSession.userObject;
      return(
        <div id="postContentModel" className="uk-modal coment_popup">
            <div className="uk-modal-dialog uk-modal-dialog-blank">
            <button className="uk-modal-close uk-close" type="button"></button>
              <div className="uk-grid">

                <div className="uk-width-small-1-1 popup_img_right coment_pop_cont">


              {this.loadPostByInfo(this.state.clickedUser,this.state.clickedPost)}
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
      )
    }

    sortByCategory(catId){
      const{userAuthSession} = this.props;
      this.setState({active_cat: catId,animation:true});
      setTimeout(function() { this.setState({animation: false}); }.bind(this), 1000);
      if(!catId){
        this.props.fetchUniversalPosts(userAuthSession.userObject.id);
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

            {categoriesElement}


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

        <div className={this.state.animation?" animated  fadeIn profile_post_photos":" animated feed_photos"}
          style={{

          //  height: `${i % 3 === 0 ? 2 * 50 : 50 }px`,
            //height:'100px',
          //  display: 'block',
            background: 'rgba(0,0,0,0.7)'
          }}
          >


                <a href="#" data-uk-modal={post_image?"{target:'#postImageModel'}":"{target:'#postContentModel'}"} onClick={this.loadSinglePostContent.bind(this,post.id,post.user_id,postImage,null,postVideo)}>

                  <img src={imgSrc} className=""/>


                </a>


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
        <div style={{float:'left'}}>
        <MasonryLayout
          id="items"
          packed={"data-packed"}
          positios={false}
          sizes={
            [ { columns: 2, gutter: 20 },
               { mq: '768px', columns: 3, gutter: 10 },
               { mq: '1024px', columns: 3, gutter: 10 },


               ]}
          >
          {postItem}
        </MasonryLayout>
      </div>


      )
    }
    render() {

          return (
            <div>
              <div className="uk-width-small-1-1 shortlist_menu">
                <ul>
              {this.renderCategoriesContent()}
                </ul>
              <div className="uk-float-right">
              <label>Filter</label>
                <select name="sort" ref="filterFeeds" onChange={this.handleFilterFeeds}>
                  <option selected="true" value="all">All</option>
                  <option value="photos">Photos</option>
                  </select>
              </div>
            </div>

              {this.state.filter == 'all'? this.renderAllPosts(): this.renderPhotos()}
              {this.postImageModal()}
              {this.postContentModal()}
            </div>
              );
        }

}
