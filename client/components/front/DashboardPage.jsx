import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navigation, Link } from 'react-router';
import { validateDisplayName, } from '../../utilities/RegexValidators';
var AvatarEditor = require('react-avatar-editor');
var Slider = require('react-slick');
var Loading = require('react-loading');


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
    this.state ={
      errorMessage: null,
    //  image: "public/images/user.jpg",
      image:null,
      preview_image:null,
      fileData:null,
      active_cat:'all',
      handleMessage:initialMessageStates,
      popupImage:null,
      uploadDir:null,
      postLargeImage:null,
      loading:false,
      clickedUser:false,
      getClickedUser: null

    }
  }

  componentWillMount(){
    const{userAuthSession} = this.props;
    var userId= userAuthSession.userObject.id;
    var uploadDir = 'uploads/images/';
    this.setState({uploadDir:uploadDir,loading:true});
    this.props.fetchInitialData(userAuthSession.userObject.id,null);
  }
  componentDidMount(){
    console.log("Here");
    const{dashboardData} = this.props;
    if(dashboardData){

      this.setState({loading:false});
    }
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
          fileData:file
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
      //fileData:this.state.fileData
    }

    if(!formData.image){
      this.setState({handleMessage:{error:"Please choose image",success:null}});
    }else{
      this.props.onClickSavePost(formData);
      this.setState({image:null,post_image:null,fileData:null});
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
      this.setState({image:null,post_image:null});
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
        var fullySorted = _.sortBy(friends, sortBy).reverse();
      }else{
        var fullySorted = _.sortBy(friends, sortBy);
      }

      Object.keys(fullySorted).map((id)=>{
        newArr[id] = fullySorted[id];
      });

      console.log(friends);
      console.log("******");

      console.log(fullySorted);
      console.log(newArr);
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
      console.log(email);
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

  renderFriendsPostImagesLargeSlider(user_id){


     const{dashboardData} = this.props;
     var friendsPosts = dashboardData.friendsPostImages;
     var friend_post_images;
     if(friendsPosts)
     var friendsPost = friendsPosts[user_id];
       if(friendsPost && friendsPost.length > 0){

       var friendElement = [];
       var i = 1;
       Object.keys(friendsPost).forEach((postImage)=> {

         var postContent = friendsPost[postImage];
         var postImageSrc = this.state.uploadDir+"user_"+postContent.user_id+"/"+postContent.post_image;
         if(postImage)
         friendElement.push(
             <div key={postContent.i} className="main-box"><img src={postImageSrc}/></div>
         );
         i++;

       });





      return(
        <div>
          <Slider slidesToShow="1" infinite="false" centerMode="true">
            {friendElement}
                </Slider>

        </div>

      );
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
       Object.keys(friendsPost).forEach((postImage)=> {

         var postContent = friendsPost[postImage];
         var postImageSrc = this.state.uploadDir+"user_"+postContent.user_id+"/thumbs/"+postContent.post_image;
         if(postImage)
         friendElement.push(
             <div key={postContent.i} className="slider_image uk-grid-small uk-grid-width-medium-1-4"><a data-uk-modal="{target:'#postImageModel'}" onClick={()=>this.setState({postLargeImage:null,clickedUser:user_id,getClickedUser:user_id})} ><img src={postImageSrc}/></a></div>
         );
         i++;

       });
       var settings = {

      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows:true,
      nextArrow:true,
      prevArrow:true,
    };




      return(
        <div>
          <Slider infinite="false" slidesToShow="3" >
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

    return(
      <div id="postImageModel" className="uk-modal coment_popup">
          <div className="uk-modal-dialog uk-modal-dialog-blank">
          <button className="uk-modal-close uk-close" type="button"></button>
            <div className="uk-grid">

              <div className="uk-width-small-1-2 popup_img_left">
				            {this.state.postLargeImage?<img src={this.state.postLargeImage} className="custom_img_pop_style"/>:this.renderFriendsPostImagesLargeSlider(this.state.clickedUser)}
				      </div>
              <div className="uk-width-small-1-2 popup_img_right">

              {this.loadPostByInfo(this.state.getClickedUser)}
              <h5 className="coment_heading">Comments</h5>
              <ul className="uk-comment-list">
                <li>
                    <article className="uk-comment">
                        <header className="uk-comment-header">
                            <img className="uk-comment-avatar" src="public/images/user.jpg" alt="" width="40" height="40"/>
                            <h4 className="uk-comment-title">Author</h4>
                            <div className="uk-comment-meta"><span>email@gmail.com</span> | Los Angeles, CA</div>
                        </header>
                        <div className="uk-comment-body">
                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy</p>
                        </div>
                    </article>
                    <ul>
                        <li>
                            <article className="uk-comment">
                                <header className="uk-comment-header">
                                    <img className="uk-comment-avatar" src="public/images/user.jpg" alt="" width="40" height="40"/>
                                    <h4 className="uk-comment-title">Author</h4>
                                    <div className="uk-comment-meta"><span>email@gmail.com</span> | Los Angeles, CA</div>
                                </header>
                                <div className="uk-comment-body">
                                    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
                                </div>
                            </article>

                            <div className="comenting_form">
                              <img className="uk-comment-avatar" src="public/images/user.jpg" alt="" width="40" height="40"/>
                              <textarea placeholder="Write Comment..."></textarea>
                              <input type="submit" value="Send"/>
                              </div>
                              </li>
                          </ul>
                      </li>
                  </ul>


              <div className="comenting_form border-top_cf">
              <img className="uk-comment-avatar" src="public/images/user.jpg" alt="" width="40" height="40"/>
              <textarea placeholder="Write Comment..."></textarea>
              <input type="submit" value="Send"/>
              </div>


              </div>
            </div>
        </div>
      </div>
    )
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
          if(content && content.length > 0){
        var content_length = content.length;
        var post_image = item.post_image;
        if(post_image){
          content = content.substring(0,300).concat(' ...');
        }else {
          content = content.substring(0,500).concat(' ...');
        }
      }else {

      }
      var slider_images = this.renderFriendsPostImagesSmallSlider(user_id);
      friendsElement.push(  <div className="uk-grid dash_top_head dash_botom_list" id={item.id}>

            <div className="uk-width-small-1-2">
              <div className="uk-grid uk-grid-small">
              <div className="uk-width-3-10 user_img_left"><Link to={profile_link}><img src={this.getProfileImage(item.profile_image,user_id)} className=""/></Link></div>
              <div className="uk-width-7-10 user_bottom_img_right">
              <h3 className="capital_first"><Link to={profile_link}>{item.first_name} {item.last_name} </Link>
              <a data-uk-modal="{target:'#sendEmail'}"   onClick={this.handleOnClickEmailIcon.bind(this,item.email)} data={item.email}  href="#" className="user_location">{item.email}</a>
             <small className="user_location">{item.address}</small>

                </h3>


            <div className="uk-slidenav-position uk-margin" data-uk-slider="{autoplay: true}">

                    <div className="uk-slider-container img_slid">
                        {slider_images}
                    </div>
                </div>
                </div>
              </div>
            </div>
            <div className="uk-width-small-1-2 post_control">
              {item.post_image?<img src={this.state.uploadDir+'user_'+user_id+'/thumbs/'+item.post_image} className="uk-float-left img_margin_right"/>:null}
              <p>{content} <a  href="#" data-uk-modal={item.post_image?"{target:'#postImageModel'}":"{target:'#postContentModel'}"} onClick={()=>this.setState({getClickedUser:user_id, postLargeImage:this.state.uploadDir+'user_'+user_id+'/'+item.post_image})}>LoadMore</a></p>


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

  loadPostByInfo(userId){
    if(userId){
    const{dashboardData} = this.props;
    var friendData = dashboardData.friends[userId];
    console.log(friendData); console.log("****");
    return(
      <article className="uk-comment">
          <header className="uk-comment-header">
              <img src={this.getProfileImage(friendData.profile_image,userId)} className="uk-comment-avatar" width="60" height="60"/>

              <h4 className="uk-comment-title">{friendData.first_name} {friendData.last_name}</h4>
              <div className="uk-comment-meta"><span>{friendData.address}</span></div>
          </header>

          <div className="uk-comment-body">
            <div className="uk-width-small-1-1 post_control">
            <p></p>
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
  loadComments(postId){
    const{comments} = this.props;
    this.props.fetchComments(postId);

  }

  // add(item) {
  //   console.log(item);
  //   console.log("*****");
  //      var parent;
  //     // var ul = this.refs.commentsul.getDOMNode();
  //     // if(item.parent > 0) {
  //     //     parent = ul.find('#n' + item.parent + ' > ul');
  //     //     if(parent.length < 1) {
  //     //         $.each(items, function(i) {
  //     //             if(this.id === item.parent) {
  //     //               parent = add(items.splice(i, 1)[0]);
  //     //                 return false;
  //     //             }
  //     //         });
  //     //     }
  //     // } else {
  //     //     parent = ul;
  //     // }
  //     // parent.append('<li id="n' + item.id + '">' + item.name + '<ul></ul></li>');
  //     // return parent.children().last().children();
  //
  // };

  getNestedChildren(arr, parent) {
  var out = []
  for(var i in arr) {
      if(arr[i].parent_id == parent) {
          var children = this.getNestedChildren(arr, arr[i].id)

          if(children.length) {
              arr[i].children = children
          }
          out.push(arr[i])
      }
  }
  return out;
}

  renderComments(postId){
    const{comments} = this.props;
    var commentElement = [];
    if(comments && comments.length >0){
      console.log("fffffff");
    // var data = {
    //     "menu": [
    //         {"id":5,"name":"Dashboard4","parent":1},
    //         {"id":1,"name":"Dashboard","parent":0},
    //         {"id":2,"name":"Dashboard1","parent":0 },
    //         {"id":3,"name":"Dashboard2","parent":0},
    //         {"id":4,"name":"Dashboard3","parent":0},
    //         {"id":6,"name":"Dashboard5","parent":1},
    //         {"id":7,"name":"Dashboard6","parent":1},
    //         {"id":8,"name":"Dashboard7","parent":2},
    //         {"id":9,"name":"Dashboard8","parent":5}
    //     ]
    // };
    //
    //
    // var items = data.menu;
    //
    //
    // while(items.length > 0) {
    //
    //     this.add(items.shift());
    //
    // }

    Object.keys(comments).forEach((id)=>{
      var item = comments[id];
      console.log(commentElement);
      commentElement.push(
        <li>
            <article className="uk-comment">
                <header className="uk-comment-header">
                    <img className="uk-comment-avatar" src="public/images/user.jpg" alt="" width="40" height="40"/>
                    <h4 className="uk-comment-title">Author</h4>
                    <div className="uk-comment-meta"><span>email@gmail.com</span> | Los Angeles, CA</div>
                </header>
                <div className="uk-comment-body">
                    <p>{item.comment}</p>
                </div>
            </article>

      </li>
    );
    });
  }else{

  }

    return(
      {commentElement}
    //   <li>
    //       <article className="uk-comment">
    //           <header className="uk-comment-header">
    //               <img className="uk-comment-avatar" src="public/images/user.jpg" alt="" width="40" height="40"/>
    //               <h4 className="uk-comment-title">Author</h4>
    //               <div className="uk-comment-meta"><span>email@gmail.com</span> | Los Angeles, CA</div>
    //           </header>
    //           <div className="uk-comment-body">
    //               <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
    //           </div>
    //       </article>
    //       {/* <ul>
    //           <li>
    //               <article className="uk-comment">
    //                   <header className="uk-comment-header">
    //                       <img className="uk-comment-avatar" src="public/images/user.jpg" alt="" width="40" height="40"/>
    //                       <h4 className="uk-comment-title">Author</h4>
    //                       <div className="uk-comment-meta"><span>email@gmail.com</span> | Los Angeles, CA</div>
    //                   </header>
    //                   <div className="uk-comment-body">
    //                       <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
    //                   </div>
    //               </article>
    //
    //               <div className="comenting_form">
    //                 <img className="uk-comment-avatar" src="public/images/user.jpg" alt="" width="40" height="40"/>
    //                 <textarea placeholder="Write Comment..."></textarea>
    //                 <input type="submit" value="Send"/>
    //               </div>
    //         </li>
    //     </ul> */}
    // </li>
    )
  }

  renderPostContentModel(){

    return(
      <div id="postContentModel" className="uk-modal coment_popup">
          <div className="uk-modal-dialog uk-modal-dialog-blank">
      		<button className="uk-modal-close uk-close" type="button"></button>
      			<div className="uk-grid">

      				<div className="uk-width-small-1-1 popup_img_right coment_pop_cont">


      			{this.loadPostByInfo(this.state.getClickedUser)}
      				<h5 className="coment_heading">Comments</h5>
      				<ul className="uk-comment-list" ref="commentsul">

           </ul>


    				<div className="comenting_form border-top_cf">
    				<img className="uk-comment-avatar" src="public/images/user.jpg" alt="" width="40" height="40"/>
    				<textarea placeholder="Write Comment..."></textarea>
    				<input type="submit" value="Send"/>
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
      var post_image = latestPost.image;
      if(post_image){
        content = content.substring(0,300).concat(' ...');
      }else {
        content = content.substring(0,500).concat(' ...');
      }

       return (
         <div className="uk-width-small-1-2 post_control">
        <div  style={{maxHeight:200,overflow:"hidden"}}>
        <img src={latestPost.image? this.state.uploadDir+"user_"+userProfile.id+"/thumbs/"+latestPost.image: null} className="uk-float-right img_margin_left"/>
        <p>{content} <a href="#postContentPop" data-uk-modal>LoadMore</a></p>

        </div>
        <div id='postContentPop' className="uk-modal coment_popup">
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
             </ul> */}


             <div className="comenting_form border-top_cf">
             <img className="uk-comment-avatar" src="public/images/user.jpg" alt="" width="40" height="40"/>
             <textarea placeholder="Write Comment..."></textarea>
             <input type="submit" value="Send"/>
             </div>


         </div>
        </div>
      </div>
    </div>
  </div>
      );
    }

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
          <button type="button" className="uk-modal-close uk-close"></button>

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
              {this.renderManageCategories()}
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
   return(
     <div id="statusImageModel" className="uk-modal" >

        <div className="uk-modal-dialog uk-text-center" >
          <form className="post_img_modal_form">
          {errorLabel}
           {this.state.image
             ?<div className="img_border"><img src={this.state.image}   ref="postImage"/>
           <textarea placeholder="text about image" className="uk-width-1-1" ref="postImageContent" ></textarea></div>
           :<div className="img_border"><img src="public/images/user.jpg"   ref="postImage"/></div>}
             <br />
           <input type="file"  ref="file" className="uk-float-left"  onChange={this.handleImageChange.bind(this)}/>
        <br />
        {this.state.image?
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
             <button type="button" className="uk-modal-close uk-close"></button>

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



      if(userProfileData)
    return (

      <div className="uk-container uk-container-center middle_content dashboad">
         <div className="uk-grid dash_top_head">


          <div className="uk-width-small-1-2">
            <div className="uk-grid uk-grid-small">
            <div className="uk-width-3-10 user_img_left">
              <img src={this.getProfileImage(userProfileData.profile_image,userProfileData.id)} />

            </div>
            <div className="uk-width-7-10 user_img_right">
            <h3>{userProfileData.first_name} {userProfileData.last_name}
               <small className="uk-float-right">{userProfileData.email}</small></h3>


            <div className="cont_post_btn">
              <textarea placeholder="Post to geodex..." className="uk-width-1-1" ref="postContent"></textarea>
            <a className="uk-button uk-button-primary uk-button-large" onClick={this.handleSavePost}>Post</a>
            <i className="uk-icon-image" data-uk-modal="{target:'#statusImageModel'}" style={{cursor:"pointer"}}></i>
            </div>

            </div>
            </div>
          </div>

           {this.renderLatestPost()}
           {this.state.loading?<Loading type='balls' color='#e3e3e3' />:null}
         </div>
         <div className="uk-width-small-1-1 shortlist_menu">
           <ul>
             <li onClick={this.sortByAllCategory} className={this.state.active_cat == 'all'?"active_sm":''}>All</li>
             {this.renderCategoriesContent()}

        </ul>
        <div className="uk-float-right">
        <label>Sort</label>
          <select name="sort" ref="sortFriends" onChange={this.handleChangeSort}>
            <option>Please Select</option>
            <option value="created">Recently added</option>
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

// Wrap the component to inject dispatch and state into it
export default connect(select)(DashboardPage);
