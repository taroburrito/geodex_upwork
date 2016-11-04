import './LandingPage.css';
import React, { Component, PropTypes } from 'react';

class LandingPageHeader extends Component {
	render() {
		return (
			<div>
				<nav className="uk-navbar fixed-nav">
						<a className="uk-navbar-brand uk-hidden-small" href="index.html"><img src="public/images/logo.png" alt=""/></a>
						<ul className="uk-navbar-nav uk-hidden-small uk-float-right">
								<li><a href="about_us.html">About Us</a></li>
								<li><a href="contact_us.html">Contact Us</a></li>
								<li><a href="terms_of_use.html">Terms of use</a></li>
						</ul>
						<a href="#offcanvas" className="uk-navbar-toggle uk-visible-small" data-uk-offcanvas></a>
						<div className="uk-navbar-brand uk-navbar-center uk-visible-small"><a className="" href="index.html"><img src="public/images/logo.png"/></a></div>
				</nav>
			</div>);
	}
}

// TODO include option for button
// 			i.e.
// 				// <div className="col-lg-4">
	        //   <img className="img-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="140" height="140"/>
	        //   <h2>Heading</h2>
	        //   <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
	        //   <p><a className="btn btn-default" href="#" role="button">View details »</a></p>
	        // </div>
// TODO props-isize the image
class LandingPageColumn extends Component {
	render() {
		return (
			<div className="col-lg-4">

        <img className="img-circle" src={this.props.imageSrc} alt="Generic placeholder image" width="140" height="140"/>
        <h2>{this.props.heading}</h2>
        <p>{this.props.text}</p>
      </div>
		);
	}
}

class LandingPageThreeColumnSection extends Component {
	render() {
		return (
			<div>

				<div className="full_width">
					

						<div className="uk-grid" data-uk-grid-margin>
								<div className="uk-width-medium-1-1 banner_home uk-row-first">

										<div className="uk-vertical-align uk-text-center">
												<div className="uk-vertical-align-middle uk-width-1-1">
													<p>
														<a className="uk-button uk-button-primary uk-button-large" data-uk-modal="{target:'#login'}">Login</a>
														<a className="uk-button uk-button-large" data-uk-modal="{target:'#signup'}">Signup</a>
													</p>
												</div>
										</div>

								</div>
						</div>
						<div className="footer home_foot">

							<div className="foot_social">
								<img src="public/images/facebook.png"/>
								<img src="public/images/twitter.png"/>
								<img src="public/images/google_plus.png"/>
							</div>

					  </div>

       </div>

				<div id="offcanvas" className="uk-offcanvas">
						<div className="uk-offcanvas-bar">
								<ul className="uk-nav uk-nav-offcanvas">
								<li><a href="about_us.html">About Us</a></li>
								<li><a href="contact_us.html">Contact Us</a></li>
								<li><a href="terms_of_use.html">Terms of use</a></li>
								</ul>
						</div>
				</div>

				<div id="login" className="uk-modal geo_modals"  style={{display:'none'}}>
					<div className="uk-modal-dialog">
						<button type="button" className="uk-modal-close uk-close"></button>
						<div className="uk-modal-header">
							<h2>Login</h2>
						</div>
						<form className="uk-form">

							<div className="uk-form-row">
								<input className="uk-width-1-1 uk-form-large" placeholder="Username" type="text"/>
							</div>
							<div className="uk-form-row">
								<input className="uk-width-1-1 uk-form-large" placeholder="Password" type="text"/>
							</div>
							<div className="uk-form-row">
								<div className="uk-text-small uk-pull-left f_r_p">
									<label className="uk-float-left"><input type="checkbox"/> Remember Me</label>
										<a className="uk-float-right uk-link uk-link-muted" href="#">Forgot Password?</a>
								</div>
								<a className="uk-width-1-1 uk-button uk-button-primary uk-button-large" href="dashboard.html">Login</a>
							</div>

					</form>
				 </div>
				</div>
				<div id="signup" className="uk-modal geo_modals"  style={{display:'none'}}>
					<div className="uk-modal-dialog">
						<button type="button" className="uk-modal-close uk-close"></button>
						  <div className="uk-modal-header">
								<h2>Signup Now</h2>
							</div>
							<form className="uk-form">
								<div className="uk-grid uk-grid-small">
									<div className="uk-width-small-1-2">
										<input className="uk-width-1-1 uk-form-large" placeholder="First name" type="text"/>
									</div>
									<div className="uk-width-small-1-2">
										<input className="uk-width-1-1 uk-form-large" placeholder="Last name" type="text"/>
									</div>
				         </div>

				         <div className="uk-grid uk-grid-small">
					   	 		 <div className="uk-width-small-1-1">
										 <input className="uk-width-1-1 uk-form-large" placeholder="Email address" type="text"/>
									 </div>
								 </div>

								 <div className="uk-grid uk-grid-small">
									 <div className="uk-width-small-1-2">
												<input className="uk-width-1-1 uk-form-large" placeholder="Password" type="text"/>
										</div>

										<div className="uk-width-small-1-2">
												<input className="uk-width-1-1 uk-form-large" placeholder="Reenter Password" type="text"/>
										</div>
									</div>

									<div className="uk-grid uk-grid-small">
										<div className="uk-width-small-1-2">
											<label className="pading_top">Date of Birth</label>

										<div className="uk-form-controls uk-float-right">
												<input id="form-date" data-uk-datepicker="{format:'DD.MM.YYYY'}" type="text"/>

										</div>

										</div>

										<div className="uk-width-small-1-2 gender_select">
											<label>Gender</label>
											<input name="sex" value="1" id="u_0_d" type="radio"/>
											<label className="_58mt" for="u_0_d">
												Female
											</label>

											<input name="sex" value="2" id="u_0_e" type="radio"/>
											<label className="_58mt" for="u_0_e">
												Male
											</label>
										</div>
									</div>

									<div className="uk-grid uk-grid-small sign_btn">

										<a className="uk-width-1-1 uk-button uk-button-primary uk-button-large" href="dashboard.html">Signup</a>

										<a className="uk-width-1-1 uk-button uk-button-primary uk-button-large uk-modal-close" href="dashboard.html">Cancel</a>

								 </div>
							</form>
						</div>
					</div>


	    </div>

		);
	}
}


export default class LandingPage extends Component {
  render() {
    return (
      <div>


        <LandingPageThreeColumnSection />

      </div>
    );
  }
}
