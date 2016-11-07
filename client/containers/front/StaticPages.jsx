import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import AboutUsPage from '../../components/static_pages/AboutUs';
import ContactUsPage from '../../components/static_pages/ContactUs';
import StaticPage from '../../components/static_pages/StaticPage';
import {registerPages} from '../../utilities/ServerSocket';
import Navbar from '../../components/Navbar';
import {getPageById} from '../../actions/PageActions';


class StaticPages extends Component{
  constructor(props){
    super(props);
    const {dispatch} = this.props;
    dispatch(getPageById(this.props.params.slug));

  }
  componentWillMount(){

  }
  componentDidMount(){
    const {dispatch} = this.props;
    dispatch(getPageById(this.props.params.slug));
  }

  render(){
    const{dispatch} = this.props;
    if (this.props.params.slug == 'contactUs') {
      return(
        <div className="full_widh">
          <Navbar changeContent={slug=>dispatch(getPageById(slug))}/>
          <ContactUsPage/>

       </div>
      );
    }else {
      return(
        <div className="full_widh">
          <Navbar changeContent={slug=>dispatch(getPageById(slug))}/>
        <StaticPage
          currentPage={this.props.params.slug}
          currentPageContent={this.props.getPageData}
          />

     </div>);
    }

  }
}

function select(state) {
  return {
    getPageData: state.getPageData,
  };
}

export default connect(select)(StaticPages);
