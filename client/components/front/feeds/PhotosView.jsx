import React, { Component, PropTypes } from 'react';
import { Navigation, Link } from 'react-router';

export default class PhotosView extends Component {
  constructor(props) {
    super(props);
    this.state={
      showPhotos:false,
    }
  }
  componentWillMount(){

  }

  componentDidMount(){
    setTimeout(function() {

      // Main content container
        var container = $('#content');

        // Masonry + ImagesLoaded
        container.imagesLoaded(function(){
          container.masonry({
            // selector for entry content
            columnWidth: 250,
            itemSelector: '.item',
            isFitWidth:'true',
            isAnimated: true
          });
        });

      // Infinite Scroll
      // container.infinitescroll({
      //
      //   // selector for the paged navigation (it will be hidden)
      //   navSelector  : ".navigation",
      //   // selector for the NEXT link (to page 2)
      //   nextSelector : ".nav-previous a",
      //   // selector for all items you'll retrieve
      //   itemSelector : ".item",
      //
      //   // finished message
      //   loading: {
      //     finishedMsg: 'No more pages to load.'
      //     }
      //   },
      //
      //   // Trigger Masonry as a callback
      //   function( newElements ) {
      //     alert("dddd");
      //     // // hide new items while they are loading
      //     // var newElems = $( newElements ).css({ opacity: 0 });
      //     // // ensure that images load before adding to masonry layout
      //     //   newElems.imagesLoaded(function(){
      //     // 	// show elems now they're ready
      //     // 	newElems.animate({ opacity: 1 });
      //     // 	container.masonry( 'appended', $newElems, true );
      //     // });
      //
      // });


}, 1000);
  }

  loadSinglePostContent(postId,userId,popupImage,popupContent,postVideo){
    this.props.loadSinglePostContent(postId,userId,popupImage,popupContent,postVideo);
  }

  render(){
      console.log("photosview");
    const{posts} = this.props;
    if(posts)
    var postItem = [];
    var len = Object.keys(posts).length;

    if(posts && len > 0){
      var i = 1;
      Object.keys(posts).forEach((postId)=>{
        var post = posts[postId];
        var post_image = post.image || post.youtube_image;




        // Image content
        if(post_image && post.image){

          var imgSrc = "uploads/images/user_"+post.user_id+"/medium/"+post_image;
          var postVideo = null;
          var postImage = "uploads/images/user_"+post.user_id+"/"+post_image;;
        }
        //Video Content
        else if (post_image && post.youtube_image) {

          var imgSrc = "uploads/images/user_"+post.user_id+"/thumbs/"+post_image;
          var postVideo = post.youtube_url;
          var postImage = null;
        }

        //text content
        else {

          var imgSrc = null;
          var postVideo = null;
          var postImage = null;
        }


        if(post_image){
      postItem.push(

        <div className={this.props.animation?"item animated  fadeIn":"item animated"} key={i}>
            <a href="#" data-uk-modal={post_image?"{target:'#postImageModel'}":"{target:'#postContentModel'}"} onClick={this.loadSinglePostContent.bind(this,post.id,post.user_id,postImage,null,postVideo)}>
                <img src={imgSrc} className="feedImg"/>
            </a>
        </div>
      );i++;
    }

  });
}else{

      return(
          <div className="item">No post to show</div>
      )


}
  if(!this.props.animation){
    return(

    <div className="feed_container">

      <div id="content" >
        {postItem}
      </div>
    </div>


    )
  }else {
    return(
      <div>Loading....</div>
    )
  }
  }
}
