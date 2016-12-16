import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';


var Griddle = require('griddle-react');
export default class ManageUserList extends Component{
  constructor(props){
    super(props);
    this.deleteUser = this.deleteUser.bind(this);
    this.changeUserStatus = this.changeUserStatus.bind(this);
  }

changeUserStatus(userId,status){
  if(status == 'Unblock'){
    status = "active";
  }else {
    status = "blocked";
  }
  this.props.changeUserStatus(userId,status);
}
deleteUser(userId){
    this.props.deleteUser(userId);
}

componentWillMount(){
//  this.props.test();

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
            'update': this.changeUserStatus,
            'delete' : this.deleteUser,
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

// export default function withCustomProps(WrappedComponent, customProps) {
//   return class PP extends React.Component {
//     constructor(props) {
//       super(props);
//     }
//     render() {
//       return <WrappedComponent {...customProps} {...this.props} />;
//     }
//   };
// }

var actionComponent = React.createClass({


  deleteItem(userId) {
   this.props.metadata.delete(userId);
 },
 toggleBlockUser(userId,status){

   this.props.metadata.update(userId,status);


 },

  render: function(){
    var userId = this.props.rowData.id;
    return (
      <div>
        <a className="uk-button uk-button-danger" onClick={()=>{if(confirm("Are you sure")){this.deleteItem.bind(this,userId)}}}>Delete</a>
        <a className="uk-button uk-button-primary" onClick={this.toggleBlockUser.bind(this,userId,this.props.data)}>{this.props.data}</a>
      </div>
    )
  }
});
