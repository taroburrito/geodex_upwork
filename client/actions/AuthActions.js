/*
 * action types
 */

export const Clicked_SignUp = 'Clicked_SignUp';
export const SignUp_Success = 'SignUp_Success';
export const SignUp_Fail = 'SignUp_Fail';

export const Clicked_Login = 'Clicked_Login';
export const Login_Success = 'Login_Success';
export const Login_Fail = 'Login_Fail';

export const Started_Session_Check = 'Started_Session_Check';
export const Checked_Session_Status = 'Checked_Session_Status';

export const Clicked_Logout = 'Clicked_Logout';
export const Logout_Success = 'Logout_Success';

// Note: Considered creating a new actions file for navigation
//				related actions. For now, will leave these here.
export const Navigate_Away_From_Auth_Form = 'Navigate_Away_From_Auth_Form';

export const Token_Verified_Failed = 'Token_Verified_Failed';
export const Token_Verified_Success = 'Token_Verified_Success';

export const Reset_Password_Failed = 'Reset_Password_Failed';
export const Reset_Password_Success = 'Reset_Password_Success';

export const Change_Password_Failed = 'Change_Password_Failed';
export const Change_Password_Success = 'Change_Password_Success';

export const Clicked_Reset_Password = 'Clicked_Reset_Password';

export const Forgot_Password_Email_Error = 'Forgot_Password_Email_Error';
export const Forgot_Password_Email_Success = 'Forgot_Password_Email_Success';
export const Clicked_Forgot_Password = 'Clicked_Forgot_Password';
export const Handle_Error_Signup = 'Handle_Error_Signup';


/*
 * other constants
 */


/*
 * action creators
 */

export function clickedSignUp() {
	return { type: Clicked_SignUp }
}

export function signUpSuccess(userObject) {
	return { type: SignUp_Success, userObject };
}

export function signUpFail(error) {
	return { type: Handle_Error_Signup, error };
}

export function tokenVerifyFail(token){
	return{type: Token_Verified_Failed, token:token};
}

export function tokenVerifySuccess(token){
	return{type: Token_Verified_Success,token:token};
}

export function resetPasswordFailed(error){
	return{type: Reset_Password_Failed, error};
}

export function resetPasswordSuccess(){
	return{type: Reset_Password_Success};
}

export function changePasswordFailed(error){
	return{type: Change_Password_Failed, error};
}

export function changePasswordSuccess(){
	return{type: Change_Password_Success};
}

export function clickedLogin() {
	return { type: Clicked_Login };
}

export function loginSuccess(userObject) {
	return { type: Login_Success, userObject };
}

export function loginFail(error) {
	return { type: Login_Fail, error };
}

export function startedSessionCheck() {
	return { type: Started_Session_Check };
}

export function checkedSessionStatus(result) {
	return { type: Checked_Session_Status, result };
}
export function clickedLogout() {
	return { type: Clicked_Logout };
}

export function logoutSuccess() {
	return { type: Logout_Success };
}

export function navigatedAwayFromAuthFormPage() {
	return { type: Navigate_Away_From_Auth_Form }
}

export function forgotPasswordEmailError(error){
	return { type: Forgot_Password_Email_Error, error}
}

export function forgotPasswordEmailSuccess(success){
	return { type: Forgot_Password_Email_Success}
}

export function clickedForgotPassword(){
	return { type: Clicked_Forgot_Password};
}

export function clickedResetPassword(){
	return { type: Clicked_Reset_Password};
}


export function verifyToken(field, data){
	return(dispatch) => {
		$.ajax({
			type: 'GET',
				url: ('/api/v1/users/verifyToken/' + data)
			})
			.done(function(result){
				if(result.error){
					console.log("Error in verifyToken api");
					dispatch(tokenVerifyFail(data));
				}else{
					console.log("Success verifyToken api");
					dispatch(tokenVerifySuccess(data));
				}
			}).fail(function(error){
				console.log(error);

		});
	}
}
export function resetPassword(token, pwd){

	return (dispatch) => {

		$.ajax({
			type:'POST',
			url:'/api/v1/users/resetPassword',
			data: {token:token,pwd:pwd}
		}).done(function(data){
			if(data.error){
				dispatch(resetPasswordFailed(data.error));
			}else{
			console.log(data);
			dispatch(resetPasswordSuccess());
			}

		}).error(function(error){
			console.log("Error in get all pages api call"+JSON.stringify(error));
			dispatch(resetPasswordFailed(error));
		});
	}
}

export function changePassword(email,newPwd){

	return (dispatch) => {

		$.ajax({
			type:'POST',
			url:'/api/v1/users/changePassword',
			data: {email:email,new_pwd:newPwd}
		}).done(function(data){
			if(data.error){
				console.log(data);
				dispatch(changePasswordFailed(data.error));
			}else{
			console.log(data);
			dispatch(changePasswordSuccess());
			}

		}).error(function(error){
			console.log("Error in change password api call call"+JSON.stringify(error));
			//dispatch(resetPasswordFailed(error));
		});
	}
}

export function attemptSignUp(formData) {
	console.log(formData);
  return (dispatch) => {
    dispatch(clickedSignUp());

    $.ajax({
			type: 'POST',
			url: '/api/v1/users/signUp',
			data: formData
		 })
			.done(function(data) {

				console.log(data);
				//return false;
				if (data.error){
					dispatch(signUpFail(data.error));

				} else {
					dispatch(attemptLogin(formData.email,formData.password,'user'));
				}
			})
			.fail(function(a,b,c,d) {
			   dispatch(signUpFail("Error in signup"));

			});
  }
}

export function attemptLogin(email, password, role) {
	
  return (dispatch) => {
    dispatch(clickedLogin());

    $.ajax({
			type: 'POST',
			url: '/login',
			data: {email, password, role} })
			.done(function(data) {
				console.log(data);
				if (data.error){
					dispatch(loginFail(data.error));
				} else {
					var storageData=data;
					storageData['isLoggedIn']=true;
					localStorage.setItem("userData",JSON.stringify(storageData));
					dispatch(loginSuccess(data));

				}
			})
			.fail(function(a,b,c,d) {
			  // console.log('failed to login',a,b,c,d);
			  dispatch(loginFail("failed to login"));
			});
  }
}

export function checkSessionStatus(email, password) {
	var sessionData=localStorage.getItem("userData");
	if(sessionData){
		return (dispatch)=>{
			//dispatch(startedSessionCheck());
			dispatch(checkedSessionStatus(JSON.parse(sessionData)));
		}
	}else{
		return (dispatch)=>{
			dispatch(checkedSessionStatus("TODO find the error..."));
		}
		/*return (dispatch) => {
		    dispatch(startedSessionCheck());
		    $.ajax({
					type: 'POST',
					url: '/checkSession',
					data: {} })
					.done(function(result) {
						dispatch(checkedSessionStatus(result));
					})
					.fail(function(a,b,c,d) {
					   console.log('failed to check',a,b,c,d);
					  //dispatch(checkedSessionStatus("TODO find the error..."));
					});
		  }*/
	}

}

export function attemptLogout(){
  return (dispatch) => {
    dispatch(clickedLogout());

    $.ajax({
	      type: 'POST',
	      url: '/logout'})
			  .done(function() {
			  		localStorage.removeItem("userData");
					dispatch(logoutSuccess());
			  })
			  .fail(function() {
			  	// Not the redux way, but I think it's fair enough.
			    alert("Can't log you out at the moment. Try again in a bit");
			  });
  }
}

export function forgetPasswordSubmit(email){
	return (dispatch) => {
		  dispatch(clickedForgotPassword());
    $.ajax({
			type: 'POST',
			url: '/forgetSubmit',
			data: {email} })
			.done(function(result) {

				if(result.error){
					dispatch(forgotPasswordEmailError(result.error));
				}else{
					dispatch(forgotPasswordEmailSuccess(result));
				}
				//dispatch(emailSendSuccess(result));
			})
			.fail(function(error) {

			  // console.log('failed to check',a,b,c,d);
			  dispatch(forgotPasswordEmailError(error));
			});
  }
}
