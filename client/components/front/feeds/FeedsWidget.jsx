import React, { Component, PropTypes } from 'react';

import FeedsList from './FeedsList';

export default class FeedsWidget extends Component {

    constructor(props){
        super(props);

    }
    componentWillMount() {
      const{userAuthSession} = this.props;
      this.props.fetchAllPosts(userAuthSession.userObject.id);

      this.props.fetchCategories(userAuthSession.userObject.id);
    }


    render() {

          return (
            <div className="uk-container uk-container-center middle_content ">
			        <div className="uk-grid uk-grid-large">
                	<div className="uk-width-large-1-1">

                  </div>

				    </div>
            <FeedsList
               posts={this.props.posts}
               categories={this.props.categories}
               userAuthSession={this.props.userAuthSession}
               fetchPostByFriendsCategory={this.props.fetchPostByFriendsCategory}
               fetchUniversalPosts={this.props.fetchAllPosts}
               fetchComments={this.props.fetchComments}
               comments={this.props.comments}
               postComment={this.props.postComment}
               fetchNewsPosts={this.props.fetchNewsPosts}
               />
            </div>


              );
        }

}
