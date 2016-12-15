import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {blockUser} from '../../../actions/AdminActions';
var Griddle = require('griddle-react');
export default class ManageUserList extends Component{
  constructor(props){
    super(props);

  }

test(data){
  console.log("data:"+data);
}

  render(){
    const{userList} = this.props;
    console.log(userList);
    if(userList){
      var userData = [];
      Object.keys(userList).map((userId)=>{
        var item = userList[userId];

        var date = new Date(item.join_date);
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June","July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        //var viewLink = "<a>Vi</a>";
        if(item.status == "active"){
        var actionLink =  "Block";
        }else if (item.status == "blocked") {
          var actionLink = "Unblock";
        }


        var join_date = monthNames[(date.getMonth() + 1)] + '-' + date.getDate() + '-' +  date.getFullYear();


        userData.push({id:item.id,Name:item.NAME,email:item.email,address:item.address,join:join_date,status:item.status,action:actionLink});
      })
    }else{
      var userData = [];
    }
    actionComponent.bind(this.test);
  var columnMetaData = [
    {
        'columnName': 'Name',
        'visible': true,
    },
    {
        'columnName': 'email',
        'visible': true,
        'customComponent': LinkComponent,
    },
    {
        'columnName': 'address',
        'visible': true,
    },
    {
        'columnName': 'join',
        'visible': true,
    },
    {
        'columnName': 'status',
        'visible': true,
    },
        {
            'columnName': 'action',
            'customComponent': actionComponent,
            'visible': true,
        }
    ];

    return(

<div className="tm-main uk-width-medium-3-4">
  <div className="uk-container uk-container-center mu_table">
        <Griddle
          resultsPerPage={15}
          results={userData}
          showFilter={true}
          tableClassName="uk-table uk-table-hover uk-table-striped griddle_table"

          columns={["Name", "email","address","join","status", "action"]}
          columnMetadata={columnMetaData}
          showPager={true}/>
   </div>

  </div>

    )
  }
}

var LinkComponent = React.createClass({
  render: function(){
    var userId = this.props.rowData.id;
    return (
    <Link to={'/profile/'+userId}>{this.props.data}</Link>
    )
  }
});

var actionComponent = React.createClass({


  deleteItem(userId) {
   console.log(userId);
 },
 toggleBlockUser(userId,status){


   console.log(userId+"|"+status);

 },

  render: function(){
    var userId = this.props.rowData.id;
    return (
      <div>
        <a className="uk-button uk-button-danger" onClick={(userId)=>{if(confirm('Delete the item?')) this.deleteItem.bind(this,userId)}}>Delete</a>
        <a className="uk-button uk-button-primary" onClick={this.toggleBlockUser.bind(this,userId,this.props.data)}>{this.props.data}</a>
      </div>
    )
  }
});
