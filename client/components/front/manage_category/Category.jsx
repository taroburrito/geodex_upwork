import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router';

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state={
      showButton: false,
      inputValue: this.props.category_name,
    }
  }
  clickHandleDelete(e){
    console.log(e);
    this.props.onDeleteClick(e.props.id);

  }
  handleInputChange(e){


    //this.props.onChangeInput(this.props.id,e.target.value);
    //this.props.category_name = e.target.value;
    this.setState({showButton: true});
    this.setState({inputValue: e.target.value});

  }
  clickUpdateCategory(){
    this.props.onChangeInput(this.props.id,this.state.inputValue);
    this.setState({showButton:false});
  }
  render() {
    //console.log(this.props);
    var content = this.state.inputValue;
    return (
      <li className="uk-nestable-item">
          <div className="uk-nestable-panel dash-cat">

              <div className="uk-nestable-toggle" data-nestable-action="toggle"></div>
        <input value={content} className ="uk-width-9-10 myinputcont" type="text" onChange={this.handleInputChange.bind(this)}/>
        {!this.state.showButton? '' :

          <a title="Edit" alt="edit" className="uk-icon-save first-icn" onClick={()=>this.clickUpdateCategory(this)}></a>}
            <a title="Delete" alt="Delete" className="uk-icon-trash uk-float-right" onClick={()=>this.clickHandleDelete(this)}></a>


        </div>
      </li>
    );
  }
}

Category.propTypes = {
  text: PropTypes.string.isRequired
};
