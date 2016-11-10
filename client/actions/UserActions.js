/*
 * action types
 */
export const Fetch_Freind_List = 'Fetch_Freind_List';
export const Delete_friend_Success = 'Delete_friend_Success';



/*
 * other constants
 */

/*
 * action creators
 */
 export function receivedAllfriendsList(friendList){
   return {type: Fetch_Freind_List, data: friendList}
 }

export function clickedBlockUser(senderId,receiverId,userId) {

  return (dispatch) => {

    $.ajax({
			type: 'POST',
			url: '/api/v1/user/blockUser',
      dataType: 'json',
			data: {sender:senderId, receiver:receiverId, user:userId} })
			.done(function(data) {
				if (data.error){
					console.log("block user works but error: ", data);
						//dispatch(optimisticUniversalAddFail());
					} else {
						console.log("block user success", data);
					//	dispatch(deleteFriendSuccess(data));
					}
				})
			.fail(function(a,b,c,d) {
				console.log("actual failure: ", a, b, c, d)
			  //dispatch(optimisticUniversalAddFail()); //TODO figure out what to pass
			});
  }
}

export function deleteFriendSuccess(id){
  return {type: Delete_friend_Success, id:id}
}

export function clickedDeleteFriend(id) {

  return (dispatch) => {

    $.ajax({
			type: 'POST',
			url: '/api/v1/user/deleteFriend/'+id})
			.done(function(data) {
				if (data.error){
					console.log("delete friend works but error: ", data);
						//dispatch(optimisticUniversalAddFail());
					} else {
						console.log("delete friend success", data);
						dispatch(deleteFriendSuccess(id));
					}
				})
			.fail(function(a,b,c,d) {
				console.log("delete failure: ", a, b, c, d)
			  //dispatch(optimisticUniversalAddFail()); //TODO figure out what to pass
			});
  }
}
