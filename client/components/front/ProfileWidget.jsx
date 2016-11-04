import React, { Component, PropTypes } from 'react';

import EditProfile from './EditProfile';

export default class ProfileWidget extends Component {

    constructor(props){
        super(props);

    }
    componentWillMount() {
        const {userAuthSession, dispatch} = this.props;
        this.props.fetchInitialData(userAuthSession.userObject.id);
    }


    render() {

        if(this.props.userdetail){
            
                return (
                    <div>
                        <EditProfile  userdetail={this.props.userdetail}/>

                    </div>

                );
        }else{
            return (
                    <div></div>
                );
        }
        
    }

}
