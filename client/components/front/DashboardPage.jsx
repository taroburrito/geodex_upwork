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
  }



  render() {
    const { dispatch, userAuthSession } = this.props;

    var content;
    return (
      <div className="uk-container uk-container-center middle_content dashboad">
         <div className="uk-grid uk-grid-large dash_top_head">

          <div className="uk-width-small-1-2">
            <div className="uk-grid uk-grid-small">
            <div className="uk-width-3-10 user_img_left"><img src="public/images/user.jpg" className=""/></div>
            <div className="uk-width-7-10 user_img_right">
            <h3>Salvador Dali <small className="uk-float-right">s.dali@gmail.com</small></h3>
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
                  <li className="active_sm">All</li>
                  <li>Friends</li>
          <li>COLLEAGUES</li>
          <li>+</li>
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
