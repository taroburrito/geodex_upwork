webpackHotUpdate(0,{

/***/ 384:
/***/ function(module, exports, __webpack_require__) {

	eval("/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(3), RootInstanceProvider = __webpack_require__(11), ReactMount = __webpack_require__(13), React = __webpack_require__(67); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {\n\n/* REACT HOT LOADER */\"use strict\";\n\nif (true) {\n\t(function () {\n\t\tvar ReactHotAPI = __webpack_require__(3),\n\t\t    RootInstanceProvider = __webpack_require__(11),\n\t\t    ReactMount = __webpack_require__(13),\n\t\t    React = __webpack_require__(67);module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () {\n\t\t\treturn RootInstanceProvider.getRootInstances(ReactMount);\n\t\t}, React);\n\t})();\n}try {\n\t(function () {\n\n\t\t/*\n   * action types\n   */\n\n\t\t'use strict';\n\n\t\tObject.defineProperty(exports, '__esModule', {\n\t\t\tvalue: true\n\t\t});\n\t\texports.clickedSignUp = clickedSignUp;\n\t\texports.signUpSuccess = signUpSuccess;\n\t\texports.signUpFail = signUpFail;\n\t\texports.tokenVerifyFail = tokenVerifyFail;\n\t\texports.tokenVerifySuccess = tokenVerifySuccess;\n\t\texports.resetPasswordFailed = resetPasswordFailed;\n\t\texports.resetPasswordSuccess = resetPasswordSuccess;\n\t\texports.clickedLogin = clickedLogin;\n\t\texports.loginSuccess = loginSuccess;\n\t\texports.loginFail = loginFail;\n\t\texports.startedSessionCheck = startedSessionCheck;\n\t\texports.checkedSessionStatus = checkedSessionStatus;\n\t\texports.clickedLogout = clickedLogout;\n\t\texports.logoutSuccess = logoutSuccess;\n\t\texports.navigatedAwayFromAuthFormPage = navigatedAwayFromAuthFormPage;\n\t\texports.forgotPasswordEmailError = forgotPasswordEmailError;\n\t\texports.forgotPasswordEmailSuccess = forgotPasswordEmailSuccess;\n\t\texports.clickedForgotPassword = clickedForgotPassword;\n\t\texports.clickedResetPassword = clickedResetPassword;\n\t\texports.verifyToken = verifyToken;\n\t\texports.resetPassword = resetPassword;\n\t\texports.attemptSignUp = attemptSignUp;\n\t\texports.attemptLogin = attemptLogin;\n\t\texports.checkSessionStatus = checkSessionStatus;\n\t\texports.attemptLogout = attemptLogout;\n\t\texports.forgetPasswordSubmit = forgetPasswordSubmit;\n\t\tvar Clicked_SignUp = 'Clicked_SignUp';\n\t\texports.Clicked_SignUp = Clicked_SignUp;\n\t\tvar SignUp_Success = 'SignUp_Success';\n\t\texports.SignUp_Success = SignUp_Success;\n\t\tvar SignUp_Fail = 'SignUp_Fail';\n\n\t\texports.SignUp_Fail = SignUp_Fail;\n\t\tvar Clicked_Login = 'Clicked_Login';\n\t\texports.Clicked_Login = Clicked_Login;\n\t\tvar Login_Success = 'Login_Success';\n\t\texports.Login_Success = Login_Success;\n\t\tvar Login_Fail = 'Login_Fail';\n\n\t\texports.Login_Fail = Login_Fail;\n\t\tvar Started_Session_Check = 'Started_Session_Check';\n\t\texports.Started_Session_Check = Started_Session_Check;\n\t\tvar Checked_Session_Status = 'Checked_Session_Status';\n\n\t\texports.Checked_Session_Status = Checked_Session_Status;\n\t\tvar Clicked_Logout = 'Clicked_Logout';\n\t\texports.Clicked_Logout = Clicked_Logout;\n\t\tvar Logout_Success = 'Logout_Success';\n\n\t\texports.Logout_Success = Logout_Success;\n\t\t// Note: Considered creating a new actions file for navigation\n\t\t//\t\t\t\trelated actions. For now, will leave these here.\n\t\tvar Navigate_Away_From_Auth_Form = 'Navigate_Away_From_Auth_Form';\n\n\t\texports.Navigate_Away_From_Auth_Form = Navigate_Away_From_Auth_Form;\n\t\tvar Token_Verified_Failed = 'Token_Verified_Failed';\n\t\texports.Token_Verified_Failed = Token_Verified_Failed;\n\t\tvar Token_Verified_Success = 'Token_Verified_Success';\n\n\t\texports.Token_Verified_Success = Token_Verified_Success;\n\t\tvar Reset_Password_Failed = 'Reset_Password_Failed';\n\t\texports.Reset_Password_Failed = Reset_Password_Failed;\n\t\tvar Reset_Password_Success = 'Reset_Password_Success';\n\t\texports.Reset_Password_Success = Reset_Password_Success;\n\t\tvar Clicked_Reset_Password = 'Clicked_Reset_Password';\n\n\t\texports.Clicked_Reset_Password = Clicked_Reset_Password;\n\t\tvar Forgot_Password_Email_Error = 'Forgot_Password_Email_Error';\n\t\texports.Forgot_Password_Email_Error = Forgot_Password_Email_Error;\n\t\tvar Forgot_Password_Email_Success = 'Forgot_Password_Email_Success';\n\t\texports.Forgot_Password_Email_Success = Forgot_Password_Email_Success;\n\t\tvar Clicked_Forgot_Password = 'Clicked_Forgot_Password';\n\t\texports.Clicked_Forgot_Password = Clicked_Forgot_Password;\n\t\t/*\n   * other constants\n   */\n\n\t\t/*\n   * action creators\n   */\n\n\t\tfunction clickedSignUp() {\n\t\t\treturn { type: Clicked_SignUp };\n\t\t}\n\n\t\tfunction signUpSuccess(userObject) {\n\t\t\treturn { type: SignUp_Success, userObject: userObject };\n\t\t}\n\n\t\tfunction signUpFail(error) {\n\t\t\treturn { type: SignUp_Fail, error: error };\n\t\t}\n\n\t\tfunction tokenVerifyFail(token) {\n\t\t\treturn { type: Token_Verified_Failed, token: token };\n\t\t}\n\n\t\tfunction tokenVerifySuccess(token) {\n\t\t\treturn { type: Token_Verified_Success, token: token };\n\t\t}\n\n\t\tfunction resetPasswordFailed(error) {\n\t\t\treturn { type: Reset_Password_Failed, error: error };\n\t\t}\n\n\t\tfunction resetPasswordSuccess() {\n\t\t\treturn { type: Reset_Password_Success };\n\t\t}\n\n\t\tfunction clickedLogin() {\n\t\t\treturn { type: Clicked_Login };\n\t\t}\n\n\t\tfunction loginSuccess(userObject) {\n\t\t\treturn { type: Login_Success, userObject: userObject };\n\t\t}\n\n\t\tfunction loginFail(error) {\n\t\t\treturn { type: Login_Fail, error: error };\n\t\t}\n\n\t\tfunction startedSessionCheck() {\n\t\t\treturn { type: Started_Session_Check };\n\t\t}\n\n\t\tfunction checkedSessionStatus(result) {\n\t\t\treturn { type: Checked_Session_Status, result: result };\n\t\t}\n\n\t\tfunction clickedLogout() {\n\t\t\treturn { type: Clicked_Logout };\n\t\t}\n\n\t\tfunction logoutSuccess() {\n\t\t\treturn { type: Logout_Success };\n\t\t}\n\n\t\tfunction navigatedAwayFromAuthFormPage() {\n\t\t\treturn { type: Navigate_Away_From_Auth_Form };\n\t\t}\n\n\t\tfunction forgotPasswordEmailError(error) {\n\t\t\treturn { type: Forgot_Password_Email_Error, error: error };\n\t\t}\n\n\t\tfunction forgotPasswordEmailSuccess(success) {\n\t\t\treturn { type: Forgot_Password_Email_Success };\n\t\t}\n\n\t\tfunction clickedForgotPassword() {\n\t\t\treturn { type: Clicked_Forgot_Password };\n\t\t}\n\n\t\tfunction clickedResetPassword() {\n\t\t\treturn { type: Clicked_Reset_Password };\n\t\t}\n\n\t\tfunction verifyToken(field, data) {\n\t\t\treturn function (dispatch) {\n\t\t\t\t$.ajax({\n\t\t\t\t\ttype: 'GET',\n\t\t\t\t\turl: '/api/v1/users/verifyToken/' + data\n\t\t\t\t}).done(function (result) {\n\t\t\t\t\tif (result.error) {\n\t\t\t\t\t\tconsole.log(\"Error in verifyToken api\");\n\t\t\t\t\t\tdispatch(tokenVerifyFail(data));\n\t\t\t\t\t} else {\n\t\t\t\t\t\tconsole.log(\"Success verifyToken api\");\n\t\t\t\t\t\tdispatch(tokenVerifySuccess(data));\n\t\t\t\t\t}\n\t\t\t\t}).fail(function (error) {\n\t\t\t\t\tconsole.log(error);\n\t\t\t\t});\n\t\t\t};\n\t\t}\n\n\t\tfunction resetPassword(token, pwd) {\n\n\t\t\treturn function (dispatch) {\n\n\t\t\t\t$.ajax({\n\t\t\t\t\ttype: 'POST',\n\t\t\t\t\turl: '/api/v1/users/resetPassword',\n\t\t\t\t\tdata: { token: token, pwd: pwd }\n\t\t\t\t}).done(function (data) {\n\t\t\t\t\tif (data.error) {\n\t\t\t\t\t\tdispatch(resetPasswordFailed(data.error));\n\t\t\t\t\t} else {\n\t\t\t\t\t\tconsole.log(data);\n\t\t\t\t\t\tdispatch(resetPasswordSuccess());\n\t\t\t\t\t}\n\t\t\t\t}).error(function (error) {\n\t\t\t\t\tconsole.log(\"Error in get all pages api call\" + JSON.stringify(error));\n\t\t\t\t\tdispatch(resetPasswordFailed(error));\n\t\t\t\t});\n\t\t\t};\n\t\t}\n\n\t\tfunction attemptSignUp(email, password, displayName) {\n\t\t\treturn function (dispatch) {\n\t\t\t\tdispatch(clickedSignUp());\n\n\t\t\t\t$.ajax({\n\t\t\t\t\ttype: 'POST',\n\t\t\t\t\turl: '/signup',\n\t\t\t\t\tdata: { email: email, password: password, displayName: displayName } }).done(function (data) {\n\t\t\t\t\tif (data.error) {\n\t\t\t\t\t\tdispatch(signUpFail(data.error));\n\t\t\t\t\t} else {\n\t\t\t\t\t\tdispatch(signUpSuccess(data));\n\t\t\t\t\t}\n\t\t\t\t}).fail(function (a, b, c, d) {\n\t\t\t\t\t// console.log('failed to signup',a,b,c,d);\n\t\t\t\t\tdispatch(signUpFail(\"TODO find the error...\"));\n\t\t\t\t});\n\t\t\t};\n\t\t}\n\n\t\tfunction attemptLogin(email, password, role) {\n\t\t\treturn function (dispatch) {\n\t\t\t\tdispatch(clickedLogin());\n\n\t\t\t\t$.ajax({\n\t\t\t\t\ttype: 'POST',\n\t\t\t\t\turl: '/login',\n\t\t\t\t\tdata: { email: email, password: password, role: role } }).done(function (data) {\n\t\t\t\t\tif (data.error) {\n\t\t\t\t\t\tdispatch(loginFail(data.error));\n\t\t\t\t\t} else {\n\t\t\t\t\t\tdispatch(loginSuccess(data));\n\t\t\t\t\t}\n\t\t\t\t}).fail(function (a, b, c, d) {\n\t\t\t\t\t// console.log('failed to login',a,b,c,d);\n\t\t\t\t\tdispatch(loginFail(\"failed to login\"));\n\t\t\t\t});\n\t\t\t};\n\t\t}\n\n\t\tfunction checkSessionStatus(email, password) {\n\t\t\treturn function (dispatch) {\n\t\t\t\tdispatch(startedSessionCheck());\n\n\t\t\t\t$.ajax({\n\t\t\t\t\ttype: 'POST',\n\t\t\t\t\turl: '/checkSession',\n\t\t\t\t\tdata: {} }).done(function (result) {\n\t\t\t\t\tdispatch(checkedSessionStatus(result));\n\t\t\t\t}).fail(function (a, b, c, d) {\n\t\t\t\t\t// console.log('failed to check',a,b,c,d);\n\t\t\t\t\tdispatch(checkedSessionStatus(\"TODO find the error...\"));\n\t\t\t\t});\n\t\t\t};\n\t\t}\n\n\t\tfunction attemptLogout() {\n\t\t\treturn function (dispatch) {\n\t\t\t\tdispatch(clickedLogout());\n\n\t\t\t\t$.ajax({\n\t\t\t\t\ttype: 'POST',\n\t\t\t\t\turl: '/logout' }).done(function () {\n\t\t\t\t\tdispatch(logoutSuccess());\n\t\t\t\t}).fail(function () {\n\t\t\t\t\t// Not the redux way, but I think it's fair enough.\n\t\t\t\t\talert(\"Can't log you out at the moment. Try again in a bit\");\n\t\t\t\t});\n\t\t\t};\n\t\t}\n\n\t\tfunction forgetPasswordSubmit(email) {\n\t\t\treturn function (dispatch) {\n\t\t\t\tdispatch(clickedForgotPassword());\n\t\t\t\t$.ajax({\n\t\t\t\t\ttype: 'POST',\n\t\t\t\t\turl: '/forgetSubmit',\n\t\t\t\t\tdata: { email: email } }).done(function (result) {\n\n\t\t\t\t\tif (result.error) {\n\t\t\t\t\t\tdispatch(forgotPasswordEmailError(result.error));\n\t\t\t\t\t} else {\n\t\t\t\t\t\tdispatch(forgotPasswordEmailSuccess(result));\n\t\t\t\t\t}\n\t\t\t\t\t//dispatch(emailSendSuccess(result));\n\t\t\t\t}).fail(function (error) {\n\n\t\t\t\t\t// console.log('failed to check',a,b,c,d);\n\t\t\t\t\tdispatch(forgotPasswordEmailError(error));\n\t\t\t\t});\n\t\t\t};\n\t\t}\n\n\t\t/* REACT HOT LOADER */\n\t}).call(undefined);\n} finally {\n\tif (true) {\n\t\t(function () {\n\t\t\tvar foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false;if (module.exports && module.makeHot) {\n\t\t\t\tvar makeExportsHot = __webpack_require__(385);if (makeExportsHot(module, __webpack_require__(67))) {\n\t\t\t\t\tfoundReactClasses = true;\n\t\t\t\t}var shouldAcceptModule = true && foundReactClasses;if (shouldAcceptModule) {\n\t\t\t\t\tmodule.hot.accept(function (err) {\n\t\t\t\t\t\tif (err) {\n\t\t\t\t\t\t\tconsole.error(\"Cannot not apply hot update to \" + \"AuthActions.js\" + \": \" + err.message);\n\t\t\t\t\t\t}\n\t\t\t\t\t});\n\t\t\t\t}\n\t\t\t}module.hot.dispose(function (data) {\n\t\t\t\tdata.makeHot = module.makeHot;data.foundReactClasses = foundReactClasses;\n\t\t\t});\n\t\t})();\n\t}\n}\n\n/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(385); if (makeExportsHot(module, __webpack_require__(67))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error(\"Cannot not apply hot update to \" + \"AuthActions.js\" + \": \" + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))\n\n/*****************\n ** WEBPACK FOOTER\n ** ./actions/AuthActions.js\n ** module id = 384\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./actions/AuthActions.js?");

/***/ }

})