import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navigation, Link } from 'react-router';
var AvatarEditor = require('react-avatar-editor');

function generateUUID(){
  //Note: this is a simple implentation for this project. //TODO create a better one
  return (Math.round(Math.random()*10000000000000000).toString()+(Date.now()));
}

export default class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.handleClickAddCategory = this.handleClickAddCategory.bind(this);
    this.handleClickPlus = this.handleClickPlus.bind(this);
    this.handleSavePostImage = this.handleSavePostImage.bind(this);
    this.handleSavePost = this.handleSavePost.bind(this);
    this.handleChangeSort = this.handleChangeSort.bind(this);
    this.sortByAllCategory = this.sortByAllCategory.bind(this);
    this.state ={
      errorMessage: null,
      image: "public/images/user.jpg",
      post_image:null,
      active_cat:'all'

    }
  }

  componentWillMount(){
    const{userAuthSession} = this.props;
    this.props.fetchInitialData(userAuthSession.userObject.id,null);
  }

  sortByAllCategory(){
    const{userAuthSession} = this.props;
    this.props.fetchInitialData(userAuthSession.userObject.id,null);
    this.setState({active_cat:'all'});
  }
  handleSavePostImage(){
    var img = this.refs.postImage.getImage();
    this.setState({post_image: img});
  }
  handleSavePost(){
    const{userAuthSession} = this.props;
    var formData = {
      user_id: userAuthSession.userObject.id,
      content: this.refs.postContent.getDOMNode().value,
      image: this.state.post_image
    }

    this.props.onClickSavePost(formData);
    this.setState({image:null,post_image:null});
    this.refs.postContent.getDOMNode().value = "";
    //this.props.fetchInitialData(userAuthSession.userObject.id);
  }


  handleClickPlus(){
    this.setState({errorMessage:null});
    this.props.handleMessage = null;
  }

  componentDidMount(){

  }

  getProfileImage(img){
     if(img){
      return img;
    }else{
     return "public/images/user.jpg";
    }

  }

  handleClickAddCategory(){
    const{userAuthSession} = this.props;
    var category_name= this.refs.categoryName.getDOMNode().value.trim();
    if(category_name === ''){
      this.setState({errorMessage:"Please Enter category name"});
    }else{
      this.setState({errorMessage:null});
      var req = {
      user_id:userAuthSession.userObject.id,
      category_name: this.refs.categoryName.getDOMNode().value,
      added_by:'user'
      };

      this.props.addCategory(req);
     this.refs.categoryName.getDOMNode().value = "";
    }
  }


  logCallback(e){

  }

  handleImageChange(evt) {
      var self = this;
      var reader = new FileReader();
      var file = evt.target.files[0];

      reader.onloadend = function(upload) {
      self.setState({
          image: upload.target.result
        });
      };
  reader.readAsDataURL(file);

  }

  handleChangeSort(){
    var sortBy = this.refs.sortFriends.getDOMNode().value;
    console.log(this.props);
    const{dashboardData} = this.props;
    var friends = dashboardData.friends;
      var newArr = {};
      var fullySorted = _.sortBy(friends, sortBy);
      Object.keys(fullySorted).map((id)=>{
        newArr[id] = fullySorted[id];
      });
    //   var newArr = _.sortBy(friends, 'first_name', function(n) {
    //   return Math.sin(n);
    // });
    if(newArr){
      console.log(newArr);
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

  renderFriendPostImages(user_id){

     const{dashboardData} = this.props;
     var friendsPosts = dashboardData.friendsPostImages;
     var friend_post_images;
     if(friendsPosts)
     var friendsPost = friendsPosts[user_id];
       if(friendsPost && friendsPost.length){

       var friendElement = [];
       Object.keys(friendsPost).forEach((postImage)=> {

         var postContent = friendsPost[postImage];
         if(postImage)
         friendElement.push(
             <li id={postContent.user_id}><img src={postContent.post_image}/></li>
         );
       });

       return(
         {friendElement}
       );
     }
    console.log(friendsPost);

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
      var slider_images = this.renderFriendPostImages(user_id);
      friendsElement.push(  <div className="uk-grid dash_top_head dash_botom_list" id={item.id}>

            <div className="uk-width-small-1-2">
              <div className="uk-grid uk-grid-small">
              <div className="uk-width-3-10 user_img_left"><img src={item.profile_image?item.profile_image:"public/images/user.jpg"} className=""/></div>
              <div className="uk-width-7-10 user_bottom_img_right">
              <h3 className="capital_first"><Link to={profile_link}>{item.NAME} </Link><img className="online_user" src="public/images/online.png"/> <small className="user_location">{item.address}<i className="uk-icon-envelope"></i></small></h3>


            <div className="uk-slidenav-position uk-margin" data-uk-slider="{autoplay: true}">

                    <div className="uk-slider-container img_slid">
                        <ul className="uk-slider uk-grid-small uk-grid-width-medium-1-4">
                          {slider_images}

                        </ul>
                    </div>

                    <a href="#" className="uk-slidenav uk-slidenav-contrast uk-slidenav-previous" data-uk-slider-item="previous" draggable="false"></a>
                    <a href="#" className="uk-slidenav uk-slidenav-contrast uk-slidenav-next" data-uk-slider-item="next" draggable="false"></a>

                </div>
                </div>
              </div>
            </div>
            <div className="uk-width-small-1-2 post_control">
              {item.post_image?<img src={item.post_image} className="uk-float-left img_margin_right"/>:null}

            <p>{item.post_content}</p>
            {this.renderPostComments(item)}
            <a  href="#" data-uk-modal={"{target:'#content_comment_pop_"+item.post_id+"'}"} onClick={this.loadComments.bind(this,item.post_id)}>more...</a>
            </div>
         </div>);

    });
    return(
      {friendsElement}

    )
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

  renderPostComments(item){
    const {comments} = this.props;
    return(
      <div id={'content_comment_pop_'+item.post_id} className="uk-modal coment_popup">
          <div className="uk-modal-dialog uk-modal-dialog-blank">
      		<button className="uk-modal-close uk-close" type="button"></button>
      			<div className="uk-grid">

      				<div className="uk-width-small-1-1 popup_img_right coment_pop_cont">

      				<article className="uk-comment">
                  <header className="uk-comment-header">
                      {item.profile_image?<img src={item.profile_image} className="uk-comment-avatar" width="60" height="60"/>:null}

                      <h4 className="uk-comment-title">{item.NAME}</h4>
                      <div className="uk-comment-meta">{item.address}<span>{item.email}</span></div>
                  </header>

                  <div className="uk-comment-body">
                    <div className="uk-width-small-1-1 post_control">
                      {item.post_image?<img src={item.post_image} className="uk-float-left img_margin_right"/>:null}
            		        <p>{item.post_content}</p>
            				</div>
                  </div>
              </article>
      				<h5 className="coment_heading">Comments</h5>
      				<ul className="uk-comment-list" ref="commentsul">
                {comments?this.renderComments(item.post_id):null}
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
    const{dashboardData} = this.props;
    var content;
    var latestPost = dashboardData.latestPost;

    if(latestPost){
       return (
        <div className="uk-width-small-1-2 post_control" style={{maxHeight:200,overflow:"hidden"}}>
        <img src={latestPost.image? latestPost.image: null} className="uk-float-right img_margin_left"/>
        <p>{latestPost.content}</p>
        </div>
      );
    }

  }

 renderCategoryModel(){
   return(
     <div id="categoryModal" className="uk-modal" ref="modal" >
       <div className="uk-modal-dialog">
          <button type="button" className="uk-modal-close uk-close"></button>

            <form className="uk-form uk-margin uk-form-stacked add_category">
                  <fieldset>
                    <div className="uk-grid">
                        <div className="uk-width-1-1">
                            <label className="uk-form-label" for="form-gs-street">Add Category</label>
                        </div>
                    </div>

                    <div className="uk-grid">
                      <div className="uk-width-1-1">
                        <div className="uk-form-controls">
                          <input id="" placeholder="Categorie name" className="uk-width-8-10" type="text" ref="categoryName"/>

                          <div className="uk-width-2-10 uk-float-right add_cat_btn">
                            <a className="uk-button uk-button-primary " onClick={this.handleClickAddCategory}>Add</a>

                          </div>
                        </div>
                      </div>
                    </div>

                </fieldset>

             </form>

        </div>
      </div>
   );
 }

 renderStatusModel(){
   return(
     <div id="statusImage" className="uk-modal" >
        <div className="uk-modal-dialog uk-text-center" style={{width:300}}>
          <AvatarEditor
            image={this.getProfileImage(this.state.image)}
            ref="postImage"
            width={200}
            height={150}
            border={10}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={1}
            onSave={this.handleSavePostImage}
            onLoadFailure={this.logCallback.bind(this, 'onLoadFailed')}
            onLoadSuccess={this.logCallback.bind(this, 'onLoadSuccess')}
            onImageReady={this.logCallback.bind(this, 'onImageReady')}
            onImageLoad={this.logCallback.bind(this, 'onImageLoad')}
            onDropFile={this.logCallback.bind(this, 'onDropFile')}
           />
         <br />
           <input type="file"  ref="file"  onChange={this.handleImageChange.bind(this)
 }
/>
<br/>
        <input className="uk-button uk-button-primary uk-button-large uk-modal-close" type="button" onClick={this.handleSavePostImage} value="Save" />
    </div>
</div>
   );
 }

  render() {

    const { dispatch, userAuthSession, friendsPosts, dashboardData} = this.props;
    var userProfileData = userAuthSession.userObject;
    var content;
    var errorLabel;
    if(this.state.errorMessage){
        errorLabel = (
          <div className="uk-alert uk-alert-danger"><p>{this.state.errorMessage}</p></div>
        )
      }

      if(userProfileData)
    return (

      <div className="uk-container uk-container-center middle_content dashboad">
         <div className="uk-grid uk-grid-large dash_top_head">
           {this.renderCategoryModel()}
            {this.renderStatusModel()}

          <div className="uk-width-small-1-2">
            <div className="uk-grid uk-grid-small">
            <div className="uk-width-3-10 user_img_left">
              <img src={this.getProfileImage(userProfileData.profile_image)} />

            </div>
            <div className="uk-width-7-10 user_img_right">
            <h3>{userProfileData.first_name} {userProfileData.last_name}
               <small className="uk-float-right">{userProfileData.email}</small></h3>
            <textarea placeholder="Post to geodex..." className="uk-width-1-1" ref="postContent"></textarea>


            <i className="uk-icon-image" data-uk-modal="{target:'#statusImage'}"></i>
            <a className="uk-button uk-button-primary uk-button-large" onClick={this.handleSavePost}>Post</a>

            </div>
            </div>
          </div>

           {this.renderLatestPost()}

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
            <option value="NAME">Name</option>
            <option value="email">Email</option>
            <option value="latitude">Location</option>


        </select>
        </div>
          </div>

          {this.renderFriendList()}
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
