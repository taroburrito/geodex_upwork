import React, { Component, PropTypes } from 'react';
import AdminSidebar from '../AdminSidebar';

const initialFormState = {
      errorMessage:  null
};

export default class AddNewPage extends Component{

  constructor(props){
    super(props);
    this.handleOnClickPost = this.handleOnClickPost.bind(this);
    this.state = Object.assign({},initialFormState);
  }
  findErrorsInAddPageForm(formData) {
    // Only finding one error at a time.
    let newState = Object.assign({}, initialFormState);
    // Checking display name
    if (formData.slug === "") {
      newState.errorMessage = "Slug is required";
      this.refs.slug.getDOMNode().focus();
    }else if (formData.title === "") {
      newState.errorMessage = "Title is required";
      this.refs.title.getDOMNode().focus();
    }else if (formData.meta_tags === "") {
      newState.errorMessage = "Meta tags are required";
      this.refs.meta_tags.getDOMNode().focus();
    }else if (formData.meta_description === "") {
      newState.errorMessage = "Meta description is required";
      this.refs.meta_description.getDOMNode().focus();
    }else if (formData.content ==="") {
      newState.errorMessage = "Content is required";
      this.refs.content.getDOMNode().focus();
    }

    return newState;
  }
   handleOnClickPost(){
     var formData = {
       slug : this.refs.slug.getDOMNode().value.trim(),
       title : this.refs.title.getDOMNode().value.trim(),
       meta_tags : this.refs.meta_tags.getDOMNode().value.trim(),
       meta_description: this.refs.meta_description.getDOMNode().value,
       content: this.refs.content.getDOMNode().value,
       status: "1",
     }
     let newState = this.findErrorsInAddPageForm(formData);
     this.setState(newState);
     if(!newState.errorMessage){
     this.props.onClickPost(formData);
   }


     console.log(formData);
  }

  render(){
    var message;
    if(this.state.errorMessage){
      message = (<div className="uk-alert uk-alert-danger" >{this.state.errorMessage}</div>);
    }else if (this.props.error) {
      message = (<div className="uk-alert uk-alert-danger" >{this.props.error}</div>);
    }else if (this.props.success) {
        message = (<div className="uk-alert uk-alert-success" >{this.props.success}</div>);
    }
    return (
      <div className="tm-main uk-width-medium-3-4">
        <div className="uk-container uk-container-center">
          <h2 className="white_heading">Add new page</h2>
          {message}
          <form className="uk-form uk-margin uk-form-stacked">

            <fieldset>
              <div className="uk-grid">
                <div className="uk-width-1-1">
                    <label className="uk-form-label" for="form-gs-street">Page Slug</label>
                    <div className="uk-form-controls">
                        <input id="" placeholder="Title" className="uk-width-1-1" type="text" ref="slug"/>
                    </div>
                </div>
              </div>

              <div className="uk-grid">
                <div className="uk-width-1-1">
                    <label className="uk-form-label" for="form-gs-street">Page Title</label>
                    <div className="uk-form-controls">
                        <input id="" placeholder="Title" className="uk-width-1-1" type="text" ref="title"/>
                    </div>
                </div>
              </div>

              <div className="uk-grid">
                <div className="uk-width-1-1">
                    <label className="uk-form-label" for="form-gs-street">Meta tags <small>(Comma seperated)</small></label>
                    <div className="uk-form-controls">
                        <input id="" placeholder="" className="uk-width-1-1" type="text" ref="meta_tags"/>
                    </div>
                </div>
              </div>

              <div className="uk-grid">
                <div className="uk-width-1-1">
                    <label className="uk-form-label" for="form-gs-street"><small>Meta Description</small></label>
                    <div className="uk-form-controls">
                     <textarea id=""  className="uk-width-1-1" placeholder="Meta Description" ref="meta_description"></textarea>
                    </div>
                </div>
              </div>

              <div className="uk-grid">
                <div className="uk-width-1-1">
                    <label className="uk-form-label" for="form-gs-street"><small>Page Content</small></label>
                    <div className="uk-form-controls">
                     <textarea id="" rows="5" className="uk-width-1-1" placeholder="" ref="content"></textarea>
                    </div>
                </div>
              </div>



              <div className="uk-grid uk-float-right">

                    <a className="uk-button uk-button-primary uk-float-right" onClick={this.handleOnClickPost}>Post</a>

              </div>
              </fieldset>

          </form>

      </div>
      </div>
    );
  }
}

AddNewPage.propTypes = {
  onClickPost: PropTypes.func.isRequired,
};
