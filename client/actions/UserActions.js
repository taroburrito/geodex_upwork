/*
 * action types
 */
export const Fetch_Freind_List = 'Fetch_Freind_List';
export const Delete_friend_Success = 'Delete_friend_Success';
export const Fetch_User_Data = 'Fetch_User_Data';
export const Fetch_Friends_Posts = 'Fetch_Friends_Posts';



/*
 * other constants
 */

/*
 * action creators
 */
 export function receivedAllfriendsList(friendList){
   //console.log(friendList);
   return {type: Fetch_Freind_List, data: friendList}
 }

 export function receivedAllFriendsPosts(friendsPosts){
   console.log(friendsPosts);
   return {type: Fetch_Friends_Posts, data:friendsPosts}
 }

 export function getUserDataSuccess(userData){
   return{type: Fetch_User_Data, data:userData}
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

export function clickedAddFriend(sender,receiver) {

    $.ajax({
      type:'POST',
      url:'/api/v1/user/addFriendRequest',
      dataType:'json',
      data:{sender:sender,receiver:receiver},
    }).done(function(data){
      console.log("Success add friend request :"+ JSON.stringify(data));
    }).fail(function(error){
      console.log("Error in add friend request:"+JSON.stringify(error));
    });


}

export function respondFriendRequest(id) {

    $.ajax({
      type:'POST',
      url:'/api/v1/user/updateFriendList/'+id,
      dataType:'json',
      data:{field:"status", val:1,id:id},
    }).done(function(data){
      console.log("Success add friend request :"+ JSON.stringify(data));
    }).fail(function(error){
      console.log("Error in add friend request:"+JSON.stringify(error));
    });


}

export function deleteFriendSuccess(id){
  return {type: Delete_friend_Success, id:id}
}

export function clickedDeleteFriend(id) {

//  return (dispatch) => {

    $.ajax({
			type: 'POST',
			url: '/api/v1/user/deleteFriend/'+id})
			.done(function(data) {
				if (data.error){
					console.log("delete friend works but error: ", data);
						//dispatch(optimisticUniversalAddFail());
					} else {
						console.log("delete friend success", data);
						//dispatch(deleteFriendSuccess(id));
					}
				})
			.fail(function(a,b,c,d) {
				console.log("delete failure: ", a, b, c, d)
			  //dispatch(optimisticUniversalAddFail()); //TODO figure out what to pass
			});
//}
}
