import { receivedAllUniversalTodos, optimisticUniversalAddSuccess } from '../actions/TodoActions';
import { receivedAllUniversalCategories } from '../actions/CategoryActions';
import { receivedAllUniversalPages } from '../actions/PageActions';
import {getUserDetails} from '../actions/ProfileActions';

var socket = io();

export function linkSocketToStore(dispatch) {
	// Add listeners that dispatch actions here.
	socket.on("current-universal-todos", function(result){
		// console.log("got all todos!", result);
		if(result.error){
			//TODO handle some how
			alert("something went wrong retrieving all todos");
		} else {
			dispatch(receivedAllUniversalTodos(result.todos));
		}
	});

	socket.on("new-todo", function(result){
		// console.log("got a new todo!", result);
		if(result.error){
			//Do nothing
		} else {
			dispatch(optimisticUniversalAddSuccess(result.todo));
		}
	});

	socket.on("allCategories",function(result){
		if(result.error){

		console.log("Error in server socket");
		} else {
			console.log(result);
			dispatch(receivedAllUniversalCategories(result.categories));
		}
	});

	socket.on("allPages",function(result){

		if(result.error){
			console.log("Error in server socket");
		}else{
			dispatch(receivedAllUniversalPages(result.pages));
		}
	});
	socket.on("userDetail",function(result){

		if(result.error){
			console.log("Error in server socket");
		}else{

			dispatch(getUserDetails(result));
		}
	});


}

// Add functions that emit socket events:
export function registerToUniversalTodo() {
	socket.emit("viewing");
}

export function registerCategory(){
	socket.emit("getAllCategoriesData");
}

export function registerPages(){
	socket.emit("getAllPagesData");
}

export function getUserDetail(userId){
	socket.emit("user-detail",userId);
}
