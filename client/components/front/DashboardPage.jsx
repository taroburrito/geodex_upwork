import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navigation, Link } from 'react-router';
import { validateDisplayName, formatter, validateUrl,getProfileImage } from '../../utilities/RegexValidators';

var ReactToastr = require("react-toastr");
var {ToastContainer} = ReactToastr; // This is a React Element.
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
import TimeAgo from 'react-timeago';




// components
// import LatestPost from './LatestPost';
import LoadNewsPost from './dashboard/LoadNewsPost';
import PostStatus from './dashboard/PostStatus';
import FriendsList from './dashboard/FriendsList';
import CategoryList from './manage_category/CategoryList';

//Actions
import {checkNews} from  '../../actions/UserActions';

function generateUUID(){
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

    this.handleClickPlus = this.handleClickPlus.bind(this);


    this.handleChangeSort = this.handleChangeSort.bind(this);
    this.sortByAllCategory = this.sortByAllCategory.bind(this);


    this.clickSlider = this.clickSlider.bind(this);
    this.handleVideoLinkChange = this.handleVideoLinkChange.bind(this);


    this.handleScale = this.handleScale.bind(this);
    this.addAlert = this.addAlert.bind(this);
    this.handleClickCheckBox = this.handleClickCheckBox.bind(this);
    this.handleClickCancelPost = this.handleClickCancelPost.bind(this);
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
      showLargeSlider:false,
      animation:false,
      scale:1,
      previewImageWidth:250,
      previewImageHeight:250,
      postanimation:false,
      showMessage:true,
      isNewsChecked:false,
      newsLink: false,
      isLoading:false,
      postLink:false,

    }
  }

  componentWillMount(){
    const{userAuthSession} = this.props;
    var userId= userAuthSession.userObject.id;
    var uploadDir = 'uploads/images/';
    this.setState({uploadDir:uploadDir,loading:true});
    this.props.fetchInitialData(userAuthSession.userObject.id,null);
    document.getElementById("html").className = "";

  }
  handleScale (e) {
    var scale = parseFloat(e.target.value);
     this.setState({ scale: scale })
  }
  

  onSlide(e){
    this.pauseAllYoutube();
    var postId = this._imageGallery.props.items[e].postId;
    this.props.fetchComments(postId);
    //this.loadPostContent(postId,this.state.clickedUser,null,null,e);
    this.setState({clickedPost:postId});


  }

  handleClickCancelPost(){
  //  this.setState({uploadedIndex:null,uploadImages:null});
    this.setState({image:null,post_image:null,fileData:null,videoImage:null,videoLink:null,postMessage:null,newsLink:null,isNewsChecked:null});
  }

  addAlert (title,message) {
     this.refs.container.error(
      message,
      title, {
      timeOut: 3000,
      extendedTimeOut: 1000
    });
    //window.open("http://youtu.be/3SR75k7Oggg");
  }
  pauseAllYoutube(){
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

  //
  // handleClickPostComment(){
  //
  //   const{userAuthSession} = this.props;
  //   this.refs.commentBox.getDOMNode().value = "";
  //   this.refs.contentCommentBox.getDOMNode().value = "";
  //
  //   //this.refs.commentBox1.getDOMNode().value = "";
  //   this.setState({replyContent:null,postComment:null});
  //   var req = {
  //     comment: this.state.postComment,
  //     parent_id:'',
  //     user_id: userAuthSession.userObject.id,
  //     post_id:this.state.clickedPost,
  //     status:1,
  //   }
  //
  //   if(this.state.postComment==null){
  //     this.addAlert("","type something to post comment...");
  //   }else{
  //     this.props.postComment(req);
  //   }
  //
  //
  //
  //   //console.log(req);
  //
  // }
  //
  // handleClickReplyComment(parent_id,post_id){
  //
  //   //console.log("parent:"+parent_id);
  //
  //
  //   const{userAuthSession} = this.props;
  //   var req = {
  //     comment: this.state.replyContent,
  //     parent_id:parent_id,
  //     user_id: userAuthSession.userObject.id,
  //     post_id:post_id,
  //     status:1,
  //   }
  //   if(this.state.replyContent==null){
  //     this.addAlert("","type something to post comment...");
  //   }else{
  //     this.setState({showCommentBox:null,replyContent:null,postComment:null});
  //     this.props.postComment(req);
  //   }
  //
  //   //this.props.postComment(req);
  //
  // }

  sortByAllCategory(){

    const{userAuthSession} = this.props;
    this.props.fetchInitialData(userAuthSession.userObject.id,null);
    this.setState({active_cat:'all'});
  }



  handleClickCheckBox(e){
    console.log(e.target.checked);
    if(e.target.checked){
    this.setState({isNewsChecked:'yes'});
  }else{
    this.setState({isNewsChecked:'no'});
  }
  }


setMessageStateToDefault (){
  this.setState({handleMessage:{error:null,success:null}});
}
handleClickPlus(){
    this.setMessageStateToDefault();
    this.props.setMessageToDefault();
    this.refs.categoryName.getDOMNode().value = "";
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
      this.refs.categoryName.getDOMNode().value = "";
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


    if(newArr){
      this.props.updateDashboardFriendList(newArr);
    }

   //remove
  this.setState({animation:true});
  setTimeout(function() { this.setState({animation: false}); }.bind(this), 1000);
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
    categoriesElement.push(<a data-uk-modal="{target:'#categoryModal'}" href="#" onClick={this.handleClickPlus} title="add category"><li id={0}>+</li></a>);

    return (
      {categoriesElement}
    );
  }



// sortImages(a, fn) {
//   var non_matches = [];
//   var matches = a.filter(function(e, i, a) {
//     var match = fn(e, i, a);
//     if (!match) non_matches.push(e);
//     return match;
//   });
//   return matches.concat(non_matches);
// }



  // renderManageCategories(){
  //   const{dashboardData,userAuthSession} = this.props;
  //   var categoriesElement = [];
  //   var categories = dashboardData.categories;
  //   var user_id = userAuthSession.userObject.id;
  //   if(categories)
  //   Object.keys(categories).map(function (key) {
  //     var item = categories[key];
  //     if(item.user_id == user_id)
  //     categoriesElement.push(
  //          <div>
  //              <input id={item.id} placeholder="Category name" className="uk-width-10-10" type="text" value={item.category_name} ref="updateCategoryName"/>
  //               <a className="uk-button uk-button-primary">Update</a>
  //               <a className="uk-button uk-button-primary">Delete</a>
  //          </div>
  //       );
  //   }, this);
  //   return (
  //     {categoriesElement}
  //   );
  // }



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



 savePostText(formData){
   const{userAuthSession} = this.props;
   this.props.onClickSavePost(formData);
   this.props.fetchInitialData(userAuthSession.userObject.id);

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
      <div>
        <ToastContainer
           ref="container"
           toastMessageFactory={ToastMessageFactory}
           className="toast-top-right" />

    </div>
          <PostStatus
             userAuthSession={userAuthSession}
             dashboardData={dashboardData}
             {...this.state}
             savePostText={(formData)=>this.savePostText(formData)}
             checkNews={this.props.checkNews}
             handleEmptyPost={(error)=>this.handleEmptyPost(error)}
             fetchInitialData={(userId,catId)=>this.props.fetchInitialData(userId,catId)}
             onClickSavePost={(data)=>this.props.onClickSavePost(data)}
             addAlert={(title,message)=>this.addAlert(title,message)}
             />
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

              {/* {this.renderFriendList()} */}
              <FriendsList
                postComments={this.props.postComment}
                comments={this.props.comments}
                dashboardData={dashboardData}
                userAuthSession={userAuthSession}
                fetchComments={this.props.fetchComments}

                onFetchPreviousPost={this.props.onFetchPreviousPost}
                onFetchNextPost={this.props.onFetchNextPost}
                sendEmail={this.props.sendEmail}
                {...this.state}
                />

            {/* {this.renderSendEmailModel()} */}
            {this.renderCategoryModel()}
            {/* {this.renderStatusModel()} */}
            {/* {this.renderPostContentModel()}
            {this.renderImageContentModel()} */}


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

// Wrap the component to inject dispatch and state into it
export default connect(select)(DashboardPage);
