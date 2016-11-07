import { receivedAllUniversalTodos, optimisticUniversalAddSuccess } from '../actions/TodoActions';
import { receivedAllUniversalCategories } from '../actions/CategoryActions';
import { receivedAllUniversalPages } from '../actions/PageActions';
import {getUserDetails} from '../actions/ProfileActions';

var socket = io();
var  encode =function(input) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    while (i < input.length) {
        chr1 = input[i++];
        chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index 
        chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                  keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }
    return output;
}

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
			var data=JSON.parse(result);
			console.log(data);
			dispatch(getUserDetails(data));
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
