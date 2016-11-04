import React, {Component,PropTypes} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router';
import {getPageById} from '../../actions/PageActions';
import Footer from '../front/Footer';



export default class StaticPage extends Component {
  constructor(props){
    super(props);
  }
  componentWillMount(){
    //const{dispatch} = this.props;

  }

  render() {
    if(!this.props.currentPageContent){

      var pageContent = this.props.currentPageContent;
    }else{
    var pageContent = this.props.currentPageContent;
    return (
      <div>
      <div className="uk-container uk-container-center middle_content">
        <h2>{pageContent.title}</h2>
           <p>{pageContent.content}</p>

     </div>
     <Footer/>
     </div>
    );
  }
  }
}

function select(state) {
  return {

  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(StaticPage);
