import React, { Component, PropTypes } from 'react';
import Footer from '../front/Footer';

export default class ContactUsPage extends Component {
  render() {
    return (
      <div>
        <div className="uk-container uk-container-center middle_content">
             <h2>Get in touch</h2>
               <div className="uk-grid" data-uk-grid-margin="">
                 <div className="uk-width-small-2-3 contact_form">
                   <div className="uk-panel uk-panel-header">
                     <form className="uk-form uk-form-stacked">

                       <div className="uk-form-row">
                         <div className="uk-form-controls">
                           <input placeholder="Full Name" className="uk-width-1-1" type="text"/>
                         </div>
                        </div>

                        <div className="uk-form-row">
                          <div className="uk-form-controls">
                            <input placeholder="Your Email" className="uk-width-1-1" type="text"/>
                          </div>
                        </div>

    							      <div className="uk-form-row">
                          <div className="uk-form-controls">
                            <input placeholder="Subject" className="uk-width-1-1" type="text"/>
                          </div>
                        </div>

                        <div className="uk-form-row">
                          <div className="uk-form-controls">
                            <textarea placeholder="Your Message" className="uk-width-1-1" id="form-h-t" cols="100" rows="9"></textarea>
                          </div>
                        </div>

                        <div className="uk-form-row">
                          <div className="uk-form-controls">
                            <button className="uk-button uk-button-primary">Send</button>
                          </div>
                        </div>

                      </form>

                  </div>
              </div>

              <div className="uk-width-small-1-3 cont_details">
                <h3 className="uk-panel-title">Contact Details</h3>
                  <p>
                      <strong>Ambulist</strong>
                      <br/>Street, Country
                      <br/>Postal Zip Code
                  </p>
                  <p>
                      <a><i className="uk-icon-envelope"></i> info@ambulist.com</a>
                      <br/><a><i className="uk-icon-twitter"></i> @ambulistTwitter</a><br/>
				                  <a><i className="uk-icon-facebook"></i> Follow Us</a><br/>
                      <i className="uk-icon-phone"></i> P+44 (0) 208 0000 000
                  </p>


                </div>
          </div>
    	</div>
     <Footer/>
     </div>
    );
  }
}
