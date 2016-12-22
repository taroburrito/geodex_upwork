import React, { findDOMNode, Component, PropTypes } from 'react';

const initialFormState = {
      errorMessage:  null,
};

export default class AddCategory extends Component {
  constructor(props){
    super(props);
    this.state = Object.assign({},initialFormState);
  }

  handleClickAdd(e) {
    const{userAuthSession} = this.props;
    const node = findDOMNode(this.refs.categoryName);
    const text = node.value.trim();
    if(text === ''){
      this.setState({errorMessage:"Please enter category name"});
        node.focus();
    }else{
      this.setState({errorMessage:null});
      var req = {
      user_id:userAuthSession.userObject.id,
      category_name: text,
      added_by:'admin'
      };
    this.props.onAddClick(req);
    node.value = '';
    }
  }
  componentDidUpdate(){
    }
  render() {
    var errorLabel;
    if(this.state.errorMessage){
      errorLabel = (<div className="uk-alert uk-alert-danger"><p>{this.state.errorMessage}</p></div>);
    }
    return (
      <div>
        {errorLabel}
        <form className="uk-form uk-margin uk-form-stacked add_category">
          <fieldset>
            <div className="uk-grid">
                <div className="uk-width-1-1">
                    <label className="uk-form-label" for="form-gs-street">Add Category</label>
                </div>
            </div>

            <div className="uk-grid">
              <div className="uk-width-1-1">
                <div className="uk-form-controls">
                  <input id="" placeholder="Categorie name" className="uk-width-8-10" type="text" ref="categoryName"/>

                  <div className="uk-width-2-10 uk-float-right add_cat_btn">
                    <a className="uk-button uk-button-primary " onClick={()=>this.handleClickAdd(this)}>Add</a>

                  </div>
                </div>
              </div>
            </div>

        </fieldset>

     </form>
      </div>

    );
  }


}

AddCategory.propTypes = {
  onAddClick: PropTypes.func.isRequired
};
