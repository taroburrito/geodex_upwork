import React,{Component, PropTypes} from 'react';

export default class Main extends Component{
  constructor(props) {
    super(props);
  }
    render(){
    return(
      <div>
        <div className="tm-middle">
            <div className="uk-container-my uk-container-center">

                <div data-uk-grid-margin="" className="uk-grid">
                    <div className="tm-sidebar uk-width-medium-1-4 uk-hidden-small">

              <ul data-uk-nav="" className="uk-nav uk-nav-offcanvas uk-nav-parent-icon">

                <li><a href="#">Dashboard</a></li>

                <li className="uk-parent">
                <a href="#">Manage CMS</a>
                  <ul className="uk-nav-sub">
                    <li><a href="#">Add new page</a></li>
                    <li><a href="#">Manage pages</a></li>
                  </ul>
                </li>
                <li><a href="#">Manage Categories</a></li>
              </ul>

                    </div>
              <div className="tm-main uk-width-medium-3-4">
              <div className="uk-container uk-container-center">
              <h2 className="white_heading">Dashboard</h2>
              </div>
              </div>
            </div>
      </div>
    </div>

        <div id="offcanvas" className="uk-offcanvas">
            <div className="uk-offcanvas-bar">
               <ul data-uk-nav="" className="uk-nav uk-nav-offcanvas uk-nav-parent-icon">
              <li><a href="dashboard.html">Dashboard</a></li>
                <li className="uk-parent">
                <a href="#">Manage CMS</a>
                  <ul className="uk-nav-sub">
                    <li><a href="#">Add new page</a></li>
                    <li><a href="#">Manage pages</a></li>
                  </ul>
                </li>
                <li><a href="/#/admin/manage-category">Manage Categories</a></li>
              </ul>
            </div>
        </div>
    </div>
    )
  }
}
