import React, { Component, PropTypes } from 'react';
import AdminSidebar from '../AdminSidebar';
import{getPageById,updateInput,updatePage} from '../../../actions/PageActions';

import {connect} from 'react-redux';

const initialFormState = {
      errorMessage:  null
};


export default class EditPage extends Component{

  constructor(props){
    super(props);

    this.state = Object.assign({},initialFormState);
    this.handleClickUpdate = this.handleClickUpdate.bind(this);

    const { dispatch } = this.props;
    if(this.props.params.id){
      dispatch(getPageById(this.props.params.id));

    }

  }

  componentWillMount(){
  //  console.log("rrr");

  }

  componentDidMount(){
    const { pageData } = this.props;
    //console.log(pageData);
  }

  handleClickUpdate(){
    const { dispatch } = this.props;
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
    dispatch(updatePage(this.props.params.id, formData));
  }
  }


  findErrorsInAddPageForm(formData) {
    // Only finding one error at a time.
    let newState = Object.assign({}, initialFormState);
    // Checking display name
    if (formData.title === "") {
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
   onChangeSlugInput(event){
      const { dispatch } = this.props;

    dispatch(updateInput('slug',event.target.value));

   }
   onChangeTitleInput(event){
      const { dispatch } = this.props;

    dispatch(updateInput('title',event.target.value));

   }
   onChangeMetaTagsInput(event){
      const { dispatch } = this.props;

    dispatch(updateInput('meta_tags',event.target.value));

   }
   onChangeMetaDescriptionInput(event){
      const { dispatch } = this.props;

    dispatch(updateInput('meta_description',event.target.value));

   }
   onChangeContentInput(event){
      const { dispatch } = this.props;

    dispatch(updateInput('content',event.target.value));

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
    const { pageData, handleMessage } = this.props;
    if(handleMessage.error){
          message = (<div className="uk-alert uk-alert-danger" >{handleMessage.error}</div>);
    }
    if(handleMessage.success){
          message = (<div className="uk-alert uk-alert-success" >{handleMessage.success}</div>);
    }
    if(pageData.id){

    return (
      <div className="tm-middle">
        <div className="uk-container-my uk-container-center">
          <div data-uk-grid-margin="" className="uk-grid">
              <AdminSidebar/>

                <div className="tm-main uk-width-medium-3-4">
                  <div className="uk-container uk-container-center">
                    <h2 className="white_heading">Edit page</h2>
                    {message}
                    <form className="uk-form uk-margin uk-form-stacked">

                      <fieldset>
                        <div className="uk-grid">
                          <div className="uk-width-1-1">
                              <label className="uk-form-label" for="form-gs-street">Page Slug</label>
                              <div className="uk-form-controls">
                                  <input id="" placeholder="Slug" className="uk-width-1-1" type="text" ref="slug" onChange={this.onChangeSlugInput.bind(this)} value={pageData.slug}/>
                              </div>
                          </div>
                        </div>

                        <div className="uk-grid">
                          <div className="uk-width-1-1">
                              <label className="uk-form-label" for="form-gs-street">Page Title</label>
                              <div className="uk-form-controls">
                                  <input id="" placeholder="Title" className="uk-width-1-1" type="text" ref="title" onChange={this.onChangeTitleInput.bind(this)} value={pageData.title}/>
                              </div>
                          </div>
                        </div>

                        <div className="uk-grid">
                          <div className="uk-width-1-1">
                              <label className="uk-form-label" for="form-gs-street">Meta tags <small>(Comma seperated)</small></label>
                              <div className="uk-form-controls">
                                  <input id="" placeholder="Meta tags" className="uk-width-1-1" type="text" ref="meta_tags" value={pageData.meta_tags} onChange={this.onChangeMetaTagsInput.bind(this)}/>
                              </div>
                          </div>
                        </div>

                        <div className="uk-grid">
                          <div className="uk-width-1-1">
                              <label className="uk-form-label" for="form-gs-street"><small>Meta Description</small></label>
                              <div className="uk-form-controls">
                               <textarea id=""  className="uk-width-1-1" placeholder="Meta Description" ref="meta_description" value={pageData.meta_description} onChange={this.onChangeMetaDescriptionInput.bind(this)}></textarea>
                              </div>
                          </div>
                        </div>

                        <div className="uk-grid">
                          <div className="uk-width-1-1">
                              <label className="uk-form-label" for="form-gs-street"><small>Page Content</small></label>
                              <div className="uk-form-controls">
                               <textarea id="" rows="5" className="uk-width-1-1" placeholder="" ref="content"    value={pageData.content} onChange={this.onChangeContentInput.bind(this)}></textarea>
                              </div>
                          </div>
                        </div>



                        <div className="uk-grid uk-float-right">

                              <a className="uk-button uk-button-primary uk-float-right" onClick={this.handleClickUpdate}>Update</a>

                        </div>
                        </fieldset>

                    </form>

                </div>
                </div>
          </div>
        </div>
      </div>

    );
  }else{
    return(
      <div>Page not found</div>
    );
  }
  }
}

EditPage.propTypes = {
  onClickPost: PropTypes.func.isRequired,
};

function select(state) {
  return {
    pageData: state.getPageData,
    handleMessage: state.handleMessage
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(EditPage);
