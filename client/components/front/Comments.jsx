import React, { Component, PropTypes } from 'react';
import { Navigation, Link } from 'react-router';

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state={
      showCommentBox:null,
      postComment:null,
      replyContent:null,
    }
    //this.handleClickPostComment = this.handleClickPostComment.bind(this);
  }

  componentWillMount(){
    this.props.fetchComments(this.props.postId);
  }

  handleClickPostComment(postId){

    const{userAuthSession} = this.props;
    this.refs.commentBox.getDOMNode().value = "";
  //  this.refs.contentCommentBox.getDOMNode().value = "";

    this.setState({replyContent:null,postComment:null});
    var req = {
      comment: this.state.postComment,
      parent_id:'',
      user_id: userAuthSession.userObject.id,
      post_id:postId,
      status:1,
    }
    if(this.state.postComment==null){
      this.addAlert("","type something to post comment...");
    }else{
    console.log(this.props);
      this.props.postComment(req);

    }


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



  }

  getProfileImage(img,userId){
     if(img){
       var imageSrc = "uploads/images/user_"+userId+"/"+img;
      return imageSrc;
    }else{
     return "public/images/user.png";
    }

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
    console.log(comments);
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
      <ul className="uk-comment-list">
        {commentElement}
      </ul>


    )
  }
  render(){
    const{postId,comments,userAuthSession} = this.props;
    var user = userAuthSession.userObject;
    return(
      <div className="uk-width-small-1-1 full-width-cmnt uk-float-left">
        <h5 className="coment_heading">Comments</h5>
        {this.renderComments(postId)}
        <div className="comenting_form border-top_cf">
          <img className="uk-comment-avatar" src={this.getProfileImage(user.profile_image,user.id)} alt="" width="40" height="40"/>
          <textarea placeholder="Write Comment..." value={this.state.postComment} onChange={(e)=>this.setState({postComment:e.target.value})} ref="commentBox"></textarea>
          <a onClick={this.handleClickPostComment.bind(this,postId)} className="uk-button uk-button-primary comment_btn">Post</a>
        </div>
      </div>
    )
  }
}
