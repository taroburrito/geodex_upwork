import React, { Component, PropTypes } from 'react';

import Profile from './Profile';

export default class VisitProfileWidget extends Component {

    constructor(props){
        super(props);

    }
    componentWillMount() {
      const{userAuthSession} = this.props;
      this.props.fetchInitialData(userAuthSession.userObject.id,this.props.profileId);
    }


    render() {
          return (
                    <div>
                        <Profile
                        comments={this.props.comments}
                        userAuthSession={this.props.userAuthSession}
                        visitedUser={this.props.visitedUser}
                        profileId={this.props.profileId}
                        onClickAddFriend={this.props.onClickAddFriend}
                        clickAcceptRequest={this.props.clickAcceptRequest}
                        onClickDenyRequest={this.props.onClickDenyRequest}
                        fetchComments={this.props.fetchComments}
                        postComment={this.props.postComment}
                        deletePost={this.props.deletePost}
                        sendEmail={this.props.sendEmail}
                       dashboardData={this.props.dashboardData}
                        />

                    </div>

                );


    }

}
