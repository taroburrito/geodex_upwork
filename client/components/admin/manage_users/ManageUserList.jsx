import React, { Component, PropTypes } from 'react';

var Griddle = require('griddle-react');
export default class ManageUserList extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const{userList} = this.props;
    console.log(userList);
    if(userList){
      var userData = [];
      Object.keys(userList).map((userId)=>{
        var item = userList[userId];
        var name = item.first_name+" "+item.last_name;
        userData.push({Name:name,address:item.address,join:item.date_created,action:"view"});
      })
    }else{
      var userData = [];
    }
    var products = [{
      id: 1,
      name: "Item name 1",
      price: 100
  },{
      id: 2,
      name: "Item name 2",
      price: 100
  }];
    return(

<div className="tm-main uk-width-medium-3-4">
  <div className="uk-container uk-container-center mu_table">
        <Griddle
          results={userData}
          showFilter={true}
          tableClassName="uk-table uk-table-hover uk-table-striped"
          columns={["Name", "address","join","action"]}
          showSettings={true}/>
   </div>
  </div>

    )
  }
}
