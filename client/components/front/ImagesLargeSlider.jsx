export default class renderFriendsPostImagesLargeSlider extends Component {
  constructor(props) {
    super(props);
    }
   const{dashboardData} = this.props;
   var friendsPosts = dashboardData.friendsPostImages;
   var friend_post_images;
   if(friendsPosts)
   var friendsPost = friendsPosts[user_id];
     if(friendsPost && friendsPost.length > 0){
      // var newPost = this.sortImages(friendsPost, e => e.id === this.state.clickedPost);

     var friendElement = [];
     var i = 0;
     Object.keys(friendsPost).forEach((postImage)=> {

       var postContent = friendsPost[postImage];
       var postImageSrc = this.state.uploadDir+"user_"+postContent.user_id+"/"+postContent.post_image;
       if(postImage)
       friendElement.push(
         {
           original:postImageSrc,
           postId:postContent.id,
         }

       );
       i++;

     });
     render(){
       return(
        <ImageGallery
        ref={i => this._imageGallery = i}
        items={friendElement}
        slideInterval={2000}
        startIndex={this.state.currentSlide}
        onSlide={this.onSlide}
        //onClick={this.clickSlider}
      //  onImageLoad={this.imageSlideTo.bind(this,this.state.currentSlide)}
        />

      );
     }

   }

  //console.log(friendsPost);

}
