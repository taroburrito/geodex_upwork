import React, {Component} from 'react';
import { Navigation, Link } from 'react-router';
import { getProfileImage, validateUrl } from '../../../utilities/RegexValidators';


export default class PostStatus extends Component {
  constructor(props) {
    super(props);
    this.handlePostMessage = this.handlePostMessage.bind(this);
    this.handleClickCheckBox = this.handleClickCheckBox.bind(this);
    this.handleSavePost = this.handleSavePost.bind(this);
    this.handleSavePostImage = this.handleSavePostImage.bind(this);
    this.handleClickImgIcon = this.handleClickImgIcon.bind(this);
    this.state=this.props;
  }

  componentDidMount(){

  }

  handleSavePostImage(){
    const{userAuthSession} = this.props;
    if(!this.state.videoImage && !this.state.newsLink){
    var postImageSrc = this.state.image;
    var postContent = this.refs.postImageContent.getDOMNode().value.trim();
  }else {
    var postImageSrc = null;
    var postContent = this.state.postMessage;
  }
    var formData = {
      user_id: userAuthSession.userObject.id,
      content: postContent,
      image: this.state.image,
      thumbImage:postImageSrc,
      youtube_url: this.state.videoLink,
      youtube_image: this.state.videoImage,
      is_news:this.state.isNewsChecked,
      newsImage:this.state.newsLink?this.refs.hidden_news_image.getDOMNode().value.trim():null,
      title:this.state.newsLink?this.refs.hidden_news_title.getDOMNode().value.trim():null,
      link:this.state.newsLink?this.refs.hidden_news_url.getDOMNode().value.trim():null,
      news_source: this.state.newsLink?this.refs.hidden_news_source.getDOMNode().value.trim():null,
      //fileData:this.state.fileData
    }

    if(!formData.image && !formData.youtube_url && !formData.newsImage){

      this.setState({handleMessage:{error:"Please choose image",success:null}});
        this.props.onClickSavePost(formData);
        this.props.fetchInitialData(userAuthSession.userObject.id,null);
    }else{

      //this.setState({loading:true});

      this.props.onClickSavePost(formData);
      if(this.state.uploadImages){
        var uploadedIndex = this.state.uploadedIndex + 1;
        var imgLength = this.state.uploadImages.length;
        // console.log("imgLength:"+imgLength)
        // console.log("uploadedIndex:"+uploadedIndex)
        if(imgLength > uploadedIndex){
          this.setState({uploadedIndex:uploadedIndex});
          this.previewImage(this.state.uploadImages[uploadedIndex]);
          //console.log(this.state.uploadImages);

        }else{

          setTimeout(function(){
          this.props.fetchInitialData(userAuthSession.userObject.id,null);
          }.bind(this),1000);
           var modal = UIkit.modal("#statusImageModel");
           modal.hide();
           this.setState({uploadImages:null,uploadedIndex:null});
        }

      }else{

        setTimeout(function(){
        this.props.fetchInitialData(userAuthSession.userObject.id,null);
      }.bind(this),2000);
      }

      // setTimeout(function(){
      // this.props.fetchInitialData(userAuthSession.userObject.id,null);
      // }.bind(this),1000);
      //



    }
    this.refs.postImageContent.getDOMNode().value = "";
    this.refs.postContent.getDOMNode().value = "";
    this.setState({uploadImages:null,uploadedIndex:null});
    this.setState({image:null,post_image:null,fileData:null,videoImage:null,videoLink:null,postMessage:null,newsLink:null,isNewsChecked:null});


  }

  handleClickImgIcon(){
    this.setState({clickedYouTubeLink:null,clickedImageIcon:true,videoLink:null,image:null,newsLink:null})
  }

  handleImageChange(evt) {

      var imgLength = evt.target.files.length;
      var images = [];

      for(var i = 0; i< imgLength; i++){
        images.push(evt.target.files[i]);
      }
      this.setState({uploadImages:images});
      this.setState({uploadedIndex:0});
      var file = evt.target.files[0];
        console.log("Width here");
        this.previewImage(file);



  }

  previewImage(file){
    var self = this;
    var reader = new FileReader();
    reader.onloadend = function(upload) {
      var img = new Image();

          img.src = window.URL.createObjectURL( file );

         img.onload = function() {
              var width = img.naturalWidth,
                  height = img.naturalHeight;

                  if(width < 560){
                    self.addAlert("","Upload image of min width 560px.");
                    var modal = UIkit.modal("#statusImageModel");
                    modal.hide();
                    this.setState({uploadImages:null,uploadedIndex:null});
                  }else{
                    self.setState({
                        image: upload.target.result,
                        fileData:file,
                        videoLink:null,
                        videoImage:null,
                        previewImageWidth:250,
                        previewImageHeight:250,
                      });
                  }

          };



    };
reader.readAsDataURL(file);
  }

  handlePostMessage()
  {

      var msg = this.refs.postContent.getDOMNode().value.trim();
    // this.setState({postMessage:msg});

     var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
     var urlPattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;


     var isUrl = msg.match(urlPattern);
     var match = msg.match(regExp);
     var modal = UIkit.modal("#statusImageModel");
            if (match && match[2].length == 11) {
                //console.log('https://www.youtube.com/embed/' + match[2] + '?autoplay=0');
                var videoLink = 'https://www.youtube.com/embed/'+match[2];
                var videoImg = "https://img.youtube.com/vi/"+match[2]+"/0.jpg"
                this.setState({postLink:videoLink, isLoading:true, clickedYouTubeLink:true,clickedImageIcon:null,videoLink:videoLink,image:null,videoImage:videoImg,postMessage:null,newsLink:null,post_image:null,fileData:null});
                setTimeout(function(){
                  this.setState({isLoading:false})
                }.bind(this),1000)
                modal.show();
            }else if (isUrl) {
              this.props.checkNews(isUrl[0]);
              this.setState({postLink:isUrl, isLoading:true,videoLink:null,image:null,videoImage:null,newsLink:true,clickedImageIcon:null,clickedYouTubeLink:null});
              setTimeout(function(){
                this.setState({isLoading:false})
              }.bind(this),1000)
              modal.show();
            }
            else {
                this.setState({videoLink:null,image:null,videoImage:null,newsLink:null});
                 //console.log("The youtube url is not valid.");
            }

  }

  handleClickCheckBox(e){
    console.log(e.target.checked);
    if(e.target.checked){
    this.setState({isNewsChecked:'yes'});
  }else{
    this.setState({isNewsChecked:'no'});
  }
  }

  handleSavePost(){
    const{userAuthSession} = this.props;
    var formData = {
      user_id: userAuthSession.userObject.id,
      content: this.refs.postContent.getDOMNode().value.trim(),
      image: null,
      is_news:this.state.isNewsChecked,
    }
    if(!formData.content && !formData.image){
      this.props.handleEmptyPost("Upload image or type something to post...");

    }else {

      this.props.savePostText(formData);

      // this.props.onClickSavePost(formData);
      // this.setState({image:null,post_image:null,postMessage:null});
       this.refs.postContent.getDOMNode().value = "";
    }
  }

  renderStatusModel(){
    const {dashboardData} = this.props;
    console.log(dashboardData);
    var news = dashboardData.news;
    var errorLabel;
    var newsImg;
    var content;
    //var desc;


      if(news){

     //   if(dashboardData.news){
        var desc = news.ogDescription?news.ogDescription:null;
         content = (
           <div>
             <input type="hidden" ref="hidden_news_image" value={news.ogImage?news.ogImage.url:null}/>
              <input type="hidden" ref="hidden_news_title" value={news.ogTitle?news.ogTitle:null}/>
                <input type="hidden" ref="hidden_news_url" value={news.ogUrl?news.ogUrl:null}/>
                <input type="hidden" ref="hidden_news_source" value={news.ogSiteName?news.ogSiteName:null}/>
           <div>
             <img src={news.ogImage?news.ogImage.url:null}/>

          </div>
          <div className="news_heading"><h5>{news.ogTitle?news.ogTitle:null}</h5></div>
          {/* <div className="news_description"><span>{news.ogDescription?news.ogDescription:null}</span></div> */}

            <textarea placeholder="Enter description here" className="uk-width-1-1" ref="postImageContent" >{desc}</textarea>
            <div className="news_site"><h5>{news.ogSiteName?"by|"+news.ogSiteName:null}</h5></div>
      </div>
        )
     // }
   }else if (this.state.postLink) {
     content=(
       <div>
       <div className="news_heading"><h5>{this.state.postLink}</h5></div>
       <input type="hidden" ref="hidden_news_url" value={this.state.postLink}/>
        <input type="hidden" ref="hidden_news_title" value={this.state.postLink}/>
        <input type="hidden" ref="hidden_news_source" value=""/>
        <input type="hidden" ref="hidden_news_image" value=""/>
        </div>
     )
   }else{
     content=(
       <div>Loading...</div>
     )
   }
   if(this.state.image){
     console.log(this.state.uploadImages.length)
     console.log(this.state.uploadedIndex)
     if(this.state.uploadImages && (this.state.uploadImages.length > this.state.uploadedIndex+1)){
       var saveText = "Save&Next";
     }else{
       var saveText = "Save";
     }
     var saveBtn =(
       <input className="uk-button uk-button-primary" type="button" onClick={this.handleSavePostImage} value={saveText}/>
     )
   }else {
     var saveBtn = (
       <input className="uk-button uk-button-primary uk-modal-close" type="button" onClick={this.handleSavePostImage} value="Save" />
     );
   }


   //var videoSrc = "http://www.youtube.com/embed/" + this.state.videoLink;
    return(
      <div id="statusImageModel" className="uk-modal" >

         <div className="uk-modal-dialog uk-text-center" >
           <form className="post_img_modal_form">

            {this.state.image
              ?<div className="img_border">

            <img src={this.state.image}/>
            <textarea placeholder="text about image" className="uk-width-1-1" ref="postImageContent" >{this.state.postMessage}</textarea>
              </div>:null}

             {this.state.videoLink?
               <div className="img_border">
               <iframe className="player" type="text/html" width="100%" height="100%" src={this.state.videoLink}/>
               <textarea placeholder="text about video" className="uk-width-1-1" ref="postImageContent" >{this.state.postMessage}</textarea>

             </div>
             : null}

             {this.state.newsLink?
               <div className="img_border">
               {content}
             </div>
             : null}

              <br />
              {
                this.state.clickedImageIcon?
                <div>
                  <input type="file"  ref="file" className="uk-float-left"  onChange={this.handleImageChange.bind(this)} multiple={true}/>
                  <span className="s_upload">Please upload image of min width 560px.</span>
                </div>

            :null}
          {this.state.clickedYouTubeLink?
           <input type="text" ref="videoLink" className="input-img-url"  value={this.state.videoLink} placeholder="Enter youtube url" onChange={this.handleVideoLinkChange}/>
           :null}
           {(this.state.image || this.state.videoLink || this.state.newsLink) ?
           <div className="uk-modal-footer uk-text-right">
             <div className="is_news_div">

             <input className="uk-checkbox" type="checkbox" ref="isCheck" onChange={this.handleClickCheckBox} checked={(this.state.isNewsChecked == 'yes')? true:false}/> News
             </div>
               <button className="uk-button uk-modal-close" type="button" onClick={this.handleClickCancelPost}>Cancel</button>
               {saveBtn}
           </div>

       : null}
       </form>
       </div>
     </div>
    );
  }

  render(){

    const {userAuthSession} = this.props;
    var userProfileData = userAuthSession.userObject;
    return(
      <div className="uk-grid dash_top_head my_profile">
        <div className="uk-width-small-1-2">
         <div className="uk-grid uk-grid-small">
         <div className="uk-width-1-10 user_img_left">
           <Link to={"user/"+userProfileData.id}><img src={getProfileImage(userProfileData.profile_image,userProfileData.id)}/></Link>

         </div>

         <div className="uk-width-9-10 user_img_right">
         <h3><Link to={"user/"+userProfileData.id}  className="user-name-anchor">{userProfileData.first_name} {userProfileData.last_name}</Link>
           <small className="uk-float-right">{userProfileData.email}</small></h3>

         </div>
         </div>



         <div className="uk-grid " style={{marginTop:5}}>

          <div className="uk-width-small-1-1 user_img_right">
         <div className="cont_post_btn">
           <textarea placeholder="Post to ambulist..." className="uk-width-1-1" onChange={this.handlePostMessage} ref="postContent"></textarea>
           <label>
               <input className="uk-checkbox" type="checkbox" ref="isCheck" onChange={this.handleClickCheckBox} checked={(this.state.isNewsChecked == 'yes')? true:false}/> News
           </label>
           <a className="uk-button uk-button-primary uk-button-large" onClick={this.handleSavePost}>Post</a>
           <div className="yt_img">
             <i data-uk-tooltip title="Upload Image" className="uk-icon-image" data-uk-modal="{target:'#statusImageModel'}" style={{cursor:"pointer"}} onClick={this.handleClickImgIcon}></i>

           </div>

          </div>
       </div>
       </div>
       </div>
       {this.renderStatusModel()}
      </div>
    )
  }
}
