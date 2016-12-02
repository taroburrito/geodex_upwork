import React, { Component, PropTypes } from 'react';

import {Link} from 'react-router';

export default class Friends extends Component {
  constructor(props) {
    super(props);
    this.handleClickBlock = this.handleClickBlock.bind(this);
    this.handleClickUnblock = this.handleClickUnblock.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
  }
  handleClickDelete(){

    this.props.onDeleteClick(this.props.id);

  }
  handleClickBlock(){
  //  this.props.onClickBlock(this.props.sender_id,this.props.receiver_id,'23');
  }
  handleClickUnblock(){

  }
  handleChangeFriendCat(friendId){
    const {userAuthSession} = this.props;
    var catId = this.refs.category.getDOMNode().value;
    var userId = userAuthSession.userObject.id;
    this.props.onChangeFriendCat(userId,friendId,catId);
  }

  renderCategoryOption(){

    const{categories} = this.props;
    var catOptions = [];
    var category_id;
    if(categories){
      Object.keys(categories).forEach((catId)=>{

        var item = categories[catId];
       category_id = item.id;

        catOptions.push(<option key={item.id} value={item.id} >{item.category_name}</option>);
      });
    }
    return(

      {catOptions}

    )
  }
  render() {
    const{categoryData} = this.props;
    var img;
    if(this.props.profile_image){
      img = this.props.profile_image;

    }else{
      img= "public/images/user.jpg";
    }
    if(!this.props.blocked_by){
        var block_link = (
        <li><a  onClick={this.handleClickBlock}>Block user</a></li>
      );
    }else{
      var block_link = (
        <li><a  onClick={this.handleClickUnblock}>Unblock user</a></li>
      );
    }
    var view_link = "/user/"+this.props.user_id;

    return (
      <div className="uk-width-small-1-3 add_friend custom-freind">
        <div className="af_border">
          <div className="uk-grid uk-grid-small">
            <div className="uk-width-2-10 user_img_left"><img src={img} className=""/></div>
            <div className="uk-width-6-10 user_bottom_img_right">
              <h3><Link to={view_link}>{this.props.first_name} {this.props.last_name}</Link><small className="user_location"><a>{this.props.address}</a></small></h3>
            </div>

            <div className="uk-width-2-10">
              <div className="uk-button-group  uk-float-right">
                <div data-uk-dropdown="" aria-haspopup="true" aria-expanded="false" className="">
                  <a href="#" className="uk-button"><i className="uk-icon-chevron-down"></i></a>
                  <div className="uk-dropdown uk-dropdown-small uk-dropdown-bottom" aria-hidden="true" tabindex="">

                    <ul className="uk-nav uk-nav-dropdown">
                       <li><a onClick={this.handleClickDelete}>Delete</a></li>
                       {block_link}
                     </ul>
                   </div>
                  </div>
                </div>
              </div>
              <div className="category-select">
                <span>Category:</span>
                <select ref="category" onChange={this.handleChangeFriendCat.bind(this,this.props.user_id)} value={categoryData?categoryData.category_id:0}>
                  <option value="0">Please Select</option>
                {this.renderCategoryOption()}
              </select>
              </div>
            </div>
          </div>
       </div>
    );
  }
}
