import React from 'react';
import MasonryLayout from 'react-masonry-layout';

class Masonry extends React.Component {

constructor(props){
  super(props);




}




  render() {
    var posts = this.props.posts;
    console.log(posts)
    var postContent = [];
    if(posts){
      var i = 1;
      Object.keys(posts).map((postId)=>{
      //  console.log(posts[key]);
        var item = posts[postId];
        if(item.image){
        var post_img = item.image;
        postContent.push(

          <div className="profile_post_photos" >

              <a href="#photoVideoSlider"  data-uk-modal>
                <img className="grid-item" src={'uploads/images/user_'+item.user_id+'/medium/'+post_img}/>

              </a>

        </div>
      );
      i++;
    }
      });
    }else{
      postContent.push(
        <div><p>No post is found for this user.</p></div>
      )
    }

    return(
    <div>cdd</div>
  );
  }
}

Masonry.defaultProps = {
 maxCount: 5,
 perPage: 20
}
