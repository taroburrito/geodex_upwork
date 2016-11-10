import React, { Component, PropTypes } from 'react';

export default class Profile extends Component {

    constructor(props){
        super(props);
        console.log(this.props);

    }
    componentWillMount() {
      this.props.fetchInitialData(this.props.userId);
    }
    getProfileImage(img){
       if(img){
        return img;
      }else{
       return "public/images/user.jpg";
      }

    }


    render() {
      const{userProfileData} = this.props;
      if(userProfileData.cover_image){
        var background_profile_css ={
          backgroundImage: 'url('+userProfileData.cover_image+')'
        }
      }else{
        var background_profile_css ={
          backgroundImage: 'url(public/images/profile_banner.jpg)'
        }
      }

      return(
          <div className="full_width">
            <div className="background_profile" style={background_profile_css}>
              <div className="uk-container uk-container-center">
                 <div className="uk-grid uk-grid-large dash_top_head">
                  <div className="uk-width-small-1-2">
                    <div className="uk-grid uk-grid-small">
                    <div className="uk-width-3-10 user_img_left">
                      <img src={this.getProfileImage(userProfileData.profile_image)} />

                      </div>
                    <div className="uk-width-7-10 pro_right">
                    <h3>{userProfileData.first_name} {userProfileData.last_name}</h3>
                    <h4>{userProfileData.address}</h4>
                    <h5>{userProfileData.email} <i className="uk-icon-envelope"></i></h5>
                    </div>
                    </div>
                  </div>
                 </div>
               </div>
              </div>
            

          <div className="uk-container uk-container-center middle_content profile">
             <div className="uk-grid uk-grid-large profile_bottom">

              <div className="uk-width-small-1-2 profile_gallery_left">
              <h3>Photos and Videos</h3>
              <a href="#img_coment_pop" data-uk-modal><img src="public/images/img_pro_page.jpg"/></a>
              <a href="#img_coment_pop" data-uk-modal><img src="public/images/img_pro_page.jpg"/></a>
              <a href="#img_coment_pop" data-uk-modal><img src="public/images/img_pro_page.jpg"/></a>
              <a href="#img_coment_pop" data-uk-modal><img src="public/images/img_pro_page.jpg"/></a>
              </div>

              <div className="uk-width-small-1-2 profile_post_right">
              <h3>Recent Activity</h3>


              <div className="uk-width-small-1-1 post_control">
              <img src="public/images/post_img.jpg" className="uk-float-left img_margin_right"/>
              <p><b>Lorem Ipsum is simply dummy text</b>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled... <a href="#contant_coment_pop" data-uk-modal>[more]</a></p>
              <p className="time">3.25pm</p>
              </div>

              <div className="uk-width-small-1-1 post_control">
              <img src="public/images/post_img.jpg" className="uk-float-left img_margin_right"/>
              <p><b>Lorem Ipsum is simply dummy text</b>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled... <a href="#contant_coment_pop" data-uk-modal>[more]</a></p>
              <p className="time">3.25pm</p>
              </div>

              <div className="uk-width-small-1-1 post_control">
              <img src="public/images/post_img.jpg" className="uk-float-left img_margin_right"/>
              <p><b>Lorem Ipsum is simply dummy text</b>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled... <a href="#contant_coment_pop" data-uk-modal>[more]</a></p>
              <p className="time">3.25pm</p>
              </div>

              <div className="uk-width-small-1-1 post_control">
              <p><b>Lorem Ipsum is simply dummy text</b>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled... <a href="#contant_coment_pop" data-uk-modal>[more]</a></p>
              <p className="time">3.25pm</p>
              </div>

              <div className="uk-width-small-1-1 post_control">
              <img src="public/images/post_img.jpg" className="uk-float-left img_margin_right"/>
              <p><b>Lorem Ipsum is simply dummy text</b>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled... <a href="#contant_coment_pop" data-uk-modal>[more]</a></p>
              <p className="time">3.25pm</p>
              </div>

              <div className="uk-width-small-1-1 post_control">
              <img src="public/images/post_img.jpg" className="uk-float-left img_margin_right"/>
              <p><b>Lorem Ipsum is simply dummy text</b>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled... <a href="#contant_coment_pop" data-uk-modal>[more]</a></p>
              <p className="time">3.25pm</p>
              </div>



              </div>

             </div>
           </div>
          </div>
      );


    }

}
