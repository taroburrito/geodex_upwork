import React, { Component, PropTypes } from 'react';

import {Link} from 'react-router';

export default class Friends extends Component {
  constructor(props) {
    super(props);
  }
  handleClickDelete(e){
    console.log(e);
    //this.props.onDeleteClick(e.props.id);

  }
  render() {
    return (
      <div className="uk-width-small-1-3 add_friend">
        <div className="af_border">
          <div className="uk-grid uk-grid-small">
            <div className="uk-width-2-10 user_img_left"><img src="public/images/user.jpg" className=""/></div>
            <div className="uk-width-6-10 user_bottom_img_right">
              <h3>Lindsay Lemon  <small className="user_location"><a>Los Angeles, CA</a></small></h3>
            </div>

            <div className="uk-width-2-10">
              <div className="uk-button-group  uk-float-right">
                <div data-uk-dropdown="" aria-haspopup="true" aria-expanded="false" className="">
                  <a href="#" className="uk-button"><i className="uk-icon-chevron-down"></i></a>
                  <div className="uk-dropdown uk-dropdown-small uk-dropdown-bottom" aria-hidden="true" tabindex="">

                    <ul className="uk-nav uk-nav-dropdown">
                       <li><a href="#">Item</a></li>
                       <li><a href="#">Another item</a></li>
                     </ul>
                   </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
       </div>
    );
  }
}
