import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';

function generateUUID(){
  //Note: this is a simple implentation for this project. //TODO create a better one
  return (Math.round(Math.random()*10000000000000000).toString()+(Date.now()));
}

export default class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.handleClickAddCategory = this.handleClickAddCategory.bind(this);
    this.handleClickPlus = this.handleClickPlus.bind(this);
    this.state ={
      errorMessage: null,
    }
  }

  componentWillMount(){
    const{userAuthSession} = this.props;

    this.props.fetchInitialData(userAuthSession.userObject.id);
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

  renderCategoriesContent(){
    const{categories} = this.props;
    var categoriesElement = [];

    Object.keys(categories).map(function (key) {
      var item = categories[key];
      categoriesElement.push(<li id={item.id}>{item.category_name}</li>);
    });
    categoriesElement.push(<a data-uk-modal="{target:'#categoryModal'}" href="#" onClick={this.handleClickPlus}><li id={0}>+</li></a>);

    return (
      {categoriesElement}
    );
  }



  render() {

    const { dispatch, userAuthSession, userProfileData, categories, handleMessage} = this.props;
    var content;
    var errorLabel;
    if(this.state.errorMessage){
        errorLabel = (
          <div className="uk-alert uk-alert-danger"><p>{this.state.errorMessage}</p></div>
        )
      }else if (handleMessage && handleMessage.error) {
        errorLabel = (
          <div className="uk-alert uk-alert-danger"><p>{handleMessage.error}</p></div>
        )
      }else if (handleMessage && handleMessage.success) {
        errorLabel = (
          <div className="uk-alert uk-alert-success"><p>{handleMessage.success}</p></div>
        )
      }

    return (
      <div className="uk-container uk-container-center middle_content dashboad">
         <div className="uk-grid uk-grid-large dash_top_head">
           <div id="categoryModal" className="uk-modal" ref="modal" >
             <div className="uk-modal-dialog">
                <button type="button" className="uk-modal-close uk-close"></button>
                {errorLabel}
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

          <div className="uk-width-small-1-2">
            <div className="uk-grid uk-grid-small">
            <div className="uk-width-3-10 user_img_left">  <img src={this.getProfileImage(userProfileData.profile_image)} /></div>
            <div className="uk-width-7-10 user_img_right">
            <h3>{userProfileData.first_name} {userProfileData.last_name}
               <small className="uk-float-right">{userProfileData.email}</small></h3>
            <textarea placeholder="Post to geodex..." className="uk-width-1-1"></textarea>
            <i className="uk-icon-image"></i>
            </div>
            </div>
          </div>

          <div className="uk-width-small-1-2 post_control">
          <img src="public/images/post_img.jpg" className="uk-float-right img_margin_left"/>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book a galley of type and... <a href="#">[more]</a></p>
          <p className="time">3.25pm</p>
          </div>

         </div>
         <div className="uk-width-small-1-1 shortlist_menu">
           <ul>
             {this.renderCategoriesContent()}

        </ul>
        <div className="uk-float-right">
        <label>Sort</label>
          <select>
            <option>First Name</option>
          </select>
        </div>
          </div>



      <div className="uk-grid dash_top_head dash_botom_list">

          <div className="uk-width-small-1-2">
            <div className="uk-grid uk-grid-small">
            <div className="uk-width-3-10 user_img_left"><img src="public/images/user.jpg" className=""/></div>
            <div className="uk-width-7-10 user_bottom_img_right">
            <h3>Lindsay Lemon <img className="online_user" src="public/images/online.png"/> <small className="user_location">Los Angeles, CA <i className="uk-icon-envelope"></i></small></h3>


          <div className="uk-slidenav-position uk-margin" data-uk-slider="{autoplay: true}">

                  <div className="uk-slider-container img_slid">
                      <ul className="uk-slider uk-grid-small uk-grid-width-medium-1-4">
                          <li><img src="public/images/user.jpg"/></li>
              <li><img src="public/images/user.jpg"/></li>
              <li><img src="public/images/user.jpg"/></li>
              <li><img src="public/images/user.jpg"/></li>
              <li><img src="public/images/user.jpg"/></li>
              <li><img src="public/images/user.jpg"/></li>
              <li><img src="public/images/user.jpg"/></li>
                          <li><img src="public/images/user.jpg"/></li>
                      </ul>
                  </div>

                  <a href="#" className="uk-slidenav uk-slidenav-contrast uk-slidenav-previous" data-uk-slider-item="previous" draggable="false"></a>
                  <a href="#" className="uk-slidenav uk-slidenav-contrast uk-slidenav-next" data-uk-slider-item="next" draggable="false"></a>

              </div>


            </div>
            </div>
          </div>

          <div className="uk-width-small-1-2 post_control">
          <img src="public/images/post_img.jpg" className="uk-float-left img_margin_right"/>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book a galley of type and... <a href="#">[more]</a></p>
          <p className="time">3.25pm</p>
          </div>

         </div>



         <div className="uk-grid dash_top_head dash_botom_list">

          <div className="uk-width-small-1-2">
            <div className="uk-grid uk-grid-small">
            <div className="uk-width-3-10 user_img_left"><img src="public/images/user.jpg" className=""/></div>
            <div className="uk-width-7-10 user_bottom_img_right">
            <h3>Lindsay Lemon <img className="online_user" src="public/images/offline.png"/> <small className="user_location">Los Angeles, CA <i className="uk-icon-envelope"></i></small></h3>


          <div className="uk-slidenav-position uk-margin" data-uk-slider="{autoplay: true}">

                  <div className="uk-slider-container img_slid">
                      <ul className="uk-slider uk-grid-small uk-grid-width-medium-1-4">
                          <li><img src="public/images/user.jpg"/></li>
              <li><img src="public/images/user.jpg"/></li>
              <li><img src="public/images/user.jpg"/></li>
              <li><img src="public/images/user.jpg"/></li>
              <li><img src="public/images/user.jpg"/></li>
              <li><img src="public/images/user.jpg"/></li>
              <li><img src="public/images/user.jpg"/></li>
                          <li><img src="public/images/user.jpg"/></li>
                      </ul>
                  </div>

                  <a href="#" className="uk-slidenav uk-slidenav-contrast uk-slidenav-previous" data-uk-slider-item="previous" draggable="false"></a>
                  <a href="#" className="uk-slidenav uk-slidenav-contrast uk-slidenav-next" data-uk-slider-item="next" draggable="false"></a>

              </div>


            </div>
            </div>
          </div>

          <div className="uk-width-small-1-2 post_control">
          <img src="public/images/post_img.jpg" className="uk-float-left img_margin_right"/>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book a galley of type and... <a href="#">[more]</a></p>
          <p className="time">3.25pm</p>
          </div>

         </div>


         <div className="uk-grid dash_top_head dash_botom_list">

          <div className="uk-width-small-1-2">
            <div className="uk-grid uk-grid-small">
            <div className="uk-width-3-10 user_img_left"><img src="public/images/user.jpg" className=""/></div>
            <div className="uk-width-7-10 user_bottom_img_right">
            <h3>Lindsay Lemon <img className="online_user" src="public/images/offline.png"/> <small className="user_location">Los Angeles, CA <i className="uk-icon-envelope"></i></small></h3>


          <div className="uk-slidenav-position uk-margin" data-uk-slider="{autoplay: true}">

                  <div className="uk-slider-container img_slid">
                      <ul className="uk-slider uk-grid-small uk-grid-width-medium-1-4">
                          <li><img src="public/images/user.jpg"/></li>
              <li><img src="public/images/user.jpg"/></li>
              <li><img src="public/images/user.jpg"/></li>
              <li><img src="public/images/user.jpg"/></li>
              <li><img src="public/images/user.jpg"/></li>
              <li><img src="public/images/user.jpg"/></li>
              <li><img src="public/images/user.jpg"/></li>
                          <li><img src="public/images/user.jpg"/></li>
                      </ul>
                  </div>

                  <a href="#" className="uk-slidenav uk-slidenav-contrast uk-slidenav-previous" data-uk-slider-item="previous" draggable="false"></a>
                  <a href="#" className="uk-slidenav uk-slidenav-contrast uk-slidenav-next" data-uk-slider-item="next" draggable="false"></a>

              </div>


            </div>
            </div>
          </div>

          <div className="uk-width-small-1-2 post_control">
          <img src="public/images/post_img.jpg" className="uk-float-left img_margin_right"/>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book a galley of type and... <a href="#">[more]</a></p>
          <p className="time">3.25pm</p>
          </div>

         </div>
    </div>


    );
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
