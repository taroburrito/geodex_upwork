webpackHotUpdate(0,{

/***/ 432:
/***/ function(module, exports, __webpack_require__) {

	eval("/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(3), RootInstanceProvider = __webpack_require__(11), ReactMount = __webpack_require__(13), React = __webpack_require__(67); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {\n\n'use strict';\n\nObject.defineProperty(exports, '__esModule', {\n  value: true\n});\n\nvar _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();\n\nvar _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar _react = __webpack_require__(67);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _frontFooter = __webpack_require__(433);\n\nvar _frontFooter2 = _interopRequireDefault(_frontFooter);\n\nvar _LoginPage = __webpack_require__(434);\n\nvar _LoginPage2 = _interopRequireDefault(_LoginPage);\n\nvar _SignupPage = __webpack_require__(435);\n\nvar _SignupPage2 = _interopRequireDefault(_SignupPage);\n\nvar _reactRedux = __webpack_require__(373);\n\nvar _actionsAuthActions = __webpack_require__(384);\n\nvar Home = (function (_Component) {\n  _inherits(Home, _Component);\n\n  function Home() {\n    _classCallCheck(this, Home);\n\n    _get(Object.getPrototypeOf(Home.prototype), 'constructor', this).apply(this, arguments);\n  }\n\n  _createClass(Home, [{\n    key: 'componentDidUpdate',\n    value: function componentDidUpdate() {\n\n      if (this.props.serverError === \"Email not found.\") {\n        if (!this.state.isEmailFieldIncorrect) {\n          var newState = Object.assign({}, this.state);\n          newState.isEmailFieldIncorrect = true;\n          this.setState(newState);\n        }\n        _react2['default'].findDOMNode(this.refs.email).focus();\n      }\n      if (this.props.serverError === \"Incorrect password.\") {\n        if (!this.state.isPasswordFieldIncorrect) {\n          var newState = Object.assign({}, this.state);\n          newState.isPasswordFieldIncorrect = true;\n          this.setState(newState);\n        }\n        _react2['default'].findDOMNode(this.refs.password).focus();\n      }\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      var _props = this.props;\n      var dispatch = _props.dispatch;\n      var userAuthSession = _props.userAuthSession;\n\n      return _react2['default'].createElement(\n        'div',\n        null,\n        _react2['default'].createElement(\n          'div',\n          { className: 'uk-grid', 'data-uk-grid-margin': true },\n          _react2['default'].createElement(\n            'div',\n            { className: 'uk-width-medium-1-1 banner_home' },\n            _react2['default'].createElement(\n              'div',\n              { className: 'uk-vertical-align uk-text-center' },\n              _react2['default'].createElement(\n                'div',\n                { className: 'uk-vertical-align-middle uk-width-1-1' },\n                _react2['default'].createElement(\n                  'p',\n                  null,\n                  _react2['default'].createElement(\n                    'a',\n                    { className: 'uk-button uk-button-primary uk-button-large', 'data-uk-modal': '{target:\\'#login\\'}' },\n                    'Login'\n                  ),\n                  _react2['default'].createElement(\n                    'a',\n                    { className: 'uk-button uk-button-large', 'data-uk-modal': '{target:\\'#signup\\'}' },\n                    'Signup'\n                  )\n                )\n              )\n            )\n          )\n        ),\n        _react2['default'].createElement(_frontFooter2['default'], null),\n        _react2['default'].createElement(\n          'div',\n          { id: 'offcanvas', className: 'uk-offcanvas' },\n          _react2['default'].createElement(\n            'div',\n            { className: 'uk-offcanvas-bar' },\n            _react2['default'].createElement(\n              'ul',\n              { className: 'uk-nav uk-nav-offcanvas' },\n              _react2['default'].createElement(\n                'li',\n                null,\n                _react2['default'].createElement(\n                  'a',\n                  { href: 'about_us.html' },\n                  'About Us'\n                )\n              ),\n              _react2['default'].createElement(\n                'li',\n                null,\n                _react2['default'].createElement(\n                  'a',\n                  { href: 'contact_us.html' },\n                  'Contact Us'\n                )\n              ),\n              _react2['default'].createElement(\n                'li',\n                null,\n                _react2['default'].createElement(\n                  'a',\n                  { href: 'terms_of_use.html' },\n                  'Terms of use'\n                )\n              )\n            )\n          )\n        ),\n        _react2['default'].createElement(_LoginPage2['default'], { onClickLogin: function (formData) {\n            dispatch((0, _actionsAuthActions.attemptLogin)(formData.email, formData.password, formData.role));\n          },\n          isFetchingData: userAuthSession.fetchingAuthUpdate,\n          serverError: userAuthSession.error\n        }),\n        _react2['default'].createElement(_SignupPage2['default'], null)\n      );\n    }\n  }]);\n\n  return Home;\n})(_react.Component);\n\nexports['default'] = Home;\n\nfunction select(state) {\n  return {\n    userAuthSession: state.userAuthSession,\n    forgotPasswordResult: state.forgotPasswordResult\n  };\n}\n\nexports['default'] = (0, _reactRedux.connect)(select)(Home);\nmodule.exports = exports['default'];\n\n/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(385); if (makeExportsHot(module, __webpack_require__(67))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error(\"Cannot not apply hot update to \" + \"Home.jsx\" + \": \" + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))\n\n/*****************\n ** WEBPACK FOOTER\n ** ./components/front/Home.jsx\n ** module id = 432\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./components/front/Home.jsx?");

/***/ }

})