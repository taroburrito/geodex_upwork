import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-router';

import { registerToUniversalTodo } from '../../utilities/ServerSocket';

import AdminSidebar from '../../components/admin/AdminSidebar';

//Actions
// import { addUniversalTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../actions/TodoActions';
//import { addUniversalTodo } from '../actions/TodoActions';

//import TodoWidget from '../components/todo_components/TodoWidget';

//TODO put this in some utility class somewhere and import it
function generateUUID(){
  //Note: this is a simple implentation for this project. //TODO create a better one
  return (Math.round(Math.random()*10000000000000000).toString()+(Date.now()));
}


class Dashboard extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    const { dispatch, visibleTodos, visibilityFilter, userAuthSession } = this.props;

    var content;
    return (
      <div>
        <div className="tm-middle">
            <div className="uk-container-my uk-container-center">

                <div data-uk-grid-margin="" className="uk-grid">
                  <AdminSidebar/>
              <div className="tm-main uk-width-medium-3-4">
              <div className="uk-container uk-container-center">
              <h2 className="white_heading">Dashboard</h2>
              </div>
              </div>
            </div>
      </div>
    </div>


    </div>

    );
  }
}

Dashboard.contextTypes = {
  router: PropTypes.object.isRequired
};

// App.propTypes = {
//   visibleTodos: PropTypes.arrayOf(PropTypes.shape({
//     text: PropTypes.string.isRequired,
//     completed: PropTypes.bool.isRequired
//   })),
//   visibilityFilter: PropTypes.oneOf([
//     'Show_All',
//     'Show_Completed',
//     'Show_Active'
//   ]).isRequired
// };

// function selectTodos(todos, filter) {
//   switch (filter) {
//   case VisibilityFilters.Show_All:
//     return todos;
//   case VisibilityFilters.Show_Completed:
//     return todos.filter(todo => todo.completed);
//   case VisibilityFilters.Show_Active:
//     return todos.filter(todo => !todo.completed);
//   }
// }


// TODO move this to a lower level in the app.
// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
  return {
    // visibleTodos: selectTodos(state.todos, state.visibilityFilter), //TODO reimplement
    universalTodos: state.universalTodos,
    unsavedUniversalTodos: state.unsavedUniversalTodos,
    // visibilityFilter: state.visibilityFilter,
    userAuthSession: state.userAuthSession
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Dashboard);
