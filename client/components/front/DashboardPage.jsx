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
    this.state ={
      errorMessage: null,
      image: "public/images/user.jpg",
      post_image:null
    }
  }

  componentWillMount(){
    const{userAuthSession} = this.props;
    this.props.fetchInitialData(userAuthSession.userObject.id);
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
    console.log(sortBy);
    const{friends} = this.props;
    var list = [
    { name:'Charlie', age:3},
    { name:'Dog', age:1 },
    { name:'Baker', age:7},
    { name:'Abel', age:9 },
    { name:'Baker', age:5 }
    ];


    console.log('*********');
    console.log(friends);
    var newArr = {};
    var fullySorted = _.sortBy( friends, sortBy);
    Object.keys(fullySorted).map((id)=>{
      var sorted = fullySorted[id];
      if(sorted.status == 1)
      newArr[id] = sorted;
    });
  //   var newArr = _.sortBy(friends, 'first_name', function(n) {
  //   return Math.sin(n);
  // });
  if(newArr){
    this.props.updateFriendList(newArr);
  }
  console.log('*********');
  console.log(fullySorted);
  console.log('*********');
  console.log(newArr);

  }

  renderCategoriesContent(){
    const{dashboardData} = this.props;
    var categoriesElement = [];
    var categories = dashboardData.categories;
    if(categories)
    Object.keys(categories).map(function (key) {
      var item = categories[key];
      categoriesElement.push(<li id={item.id}>{item.category_name}</li>);
    });
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


  }

  renderFriendList(){

    const{dashboardData} = this.props;
    var friendsElement = [];
    var friends = dashboardData.friends;
    if(friends)
    Object.keys(friends).map((key)=> {
      var item = friends[key];
      var user_id = key;
      var profile_link = "/user/"+user_id;
      friendsElement.push(  <div className="uk-grid dash_top_head dash_botom_list" id={item.id}>

            <div className="uk-width-small-1-2">
              <div className="uk-grid uk-grid-small">
              <div className="uk-width-3-10 user_img_left"><img src={item.profile_image?item.profile_image:"public/images/user.jpg"} className=""/></div>
              <div className="uk-width-7-10 user_bottom_img_right">
              <h3 className="capital_first"><Link to={profile_link}>{item.NAME} </Link><img className="online_user" src="public/images/online.png"/> <small className="user_location">{item.address}<i className="uk-icon-envelope"></i></small></h3>


            <div className="uk-slidenav-position uk-margin" data-uk-slider="{autoplay: true}">

                    <div className="uk-slider-container img_slid">
                        <ul className="uk-slider uk-grid-small uk-grid-width-medium-1-4">
                          {this.renderFriendPostImages(user_id)}

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
            </div>
         </div>);

    });
    return(
      {friendsElement}

    )
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
        <div className="uk-modal-dialog" style={{width:300}}>
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
             {this.renderCategoriesContent()}

        </ul>
        <div className="uk-float-right">
        <label>Sort</label>
          <select name="sort" ref="sortFriends" onChange={this.handleChangeSort}>
            <option>Please Select</option>
            <option value="created">Recently added</option>
            <option value="first_name">First Name</option>
            <option value="last_name">Last Name</option>
            <option value="email">Email</option>
            <option value="locaton">Location</option>


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
