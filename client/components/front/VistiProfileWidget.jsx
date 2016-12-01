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
                        userAuthSession={this.props.userAuthSession}
                        visitedUser={this.props.visitedUser}
                        profileId={this.props.profileId}
                        onClickAddFriend={this.props.onClickAddFriend}
                        clickAcceptRequest={this.props.clickAcceptRequest}
                        onClickDenyRequest={this.props.onClickDenyRequest}
                        />

                    </div>

                );


    }

}
