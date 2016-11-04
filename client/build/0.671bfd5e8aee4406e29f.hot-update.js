webpackHotUpdate(0,{

/***/ 434:
/***/ function(module, exports, __webpack_require__) {

	eval("/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(3), RootInstanceProvider = __webpack_require__(11), ReactMount = __webpack_require__(13), React = __webpack_require__(67); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {\n\n'use strict';\n\nObject.defineProperty(exports, '__esModule', {\n  value: true\n});\n\nvar _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();\n\nvar _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar _react = __webpack_require__(67);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _utilitiesRegexValidators = __webpack_require__(430);\n\nvar initialFormState = {\n  errorMessage: null,\n  isEmailFieldIncorrect: false,\n  isPasswordFieldIncorrect: false\n};\n\nvar LoginPage = (function (_Component) {\n  _inherits(LoginPage, _Component);\n\n  function LoginPage(props) {\n    _classCallCheck(this, LoginPage);\n\n    _get(Object.getPrototypeOf(LoginPage.prototype), 'constructor', this).call(this, props);\n    this.handleOnClickLogin = this.handleOnClickLogin.bind(this);\n    this.state = Object.assign({}, initialFormState);\n  }\n\n  _createClass(LoginPage, [{\n    key: 'findErrorsInLoginForm',\n    value: function findErrorsInLoginForm(formData) {\n      // Only finding one error at a time.\n      var newState = Object.assign({}, initialFormState);\n\n      // Checking email\n      if (formData.email === \"\") {\n        newState.errorMessage = \"Email is required\";\n      } else if (!(0, _utilitiesRegexValidators.validateEmail)(formData.email)) {\n        newState.errorMessage = \"Please enter a valid email address\";\n      }\n      // Checking password\n      else if (formData.password === \"\") {\n          newState.errorMessage = \"Password is required\";\n        } else if (!(0, _utilitiesRegexValidators.validatePassword)(formData.password)) {\n          newState.errorMessage = \"Passwords must contain at least 6 valid characters\";\n        }\n\n      return newState;\n    }\n  }, {\n    key: 'handleOnClickLogin',\n    value: function handleOnClickLogin() {\n      var formData = {\n        email: this.refs.email.getDOMNode().value.trim(),\n        password: this.refs.password.getDOMNode().value.trim(),\n        role: this.refs.role.getDOMNode().value.trim()\n      };\n      var newState = this.findErrorsInLoginForm(formData);\n      this.setState(newState);\n      if (!newState.errorMessage) {\n        this.props.onClickLogin(formData);\n      }\n    }\n  }, {\n    key: 'componentDidMount',\n    value: function componentDidMount() {\n      _react2['default'].findDOMNode(this.refs.email).focus();\n    }\n  }, {\n    key: 'componentDidUpdate',\n    value: function componentDidUpdate() {\n\n      if (this.props.serverError === \"Email not found.\") {\n        if (!this.state.isEmailFieldIncorrect) {\n          var newState = Object.assign({}, this.state);\n          newState.isEmailFieldIncorrect = true;\n          this.setState(newState);\n        }\n        _react2['default'].findDOMNode(this.refs.email).focus();\n      }\n      if (this.props.serverError === \"Incorrect password.\") {\n        if (!this.state.isPasswordFieldIncorrect) {\n          var newState = Object.assign({}, this.state);\n          newState.isPasswordFieldIncorrect = true;\n          this.setState(newState);\n        }\n        _react2['default'].findDOMNode(this.refs.password).focus();\n      }\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      var errorLabel;\n      if (this.state.errorMessage) {\n        errorLabel = _react2['default'].createElement(\n          'div',\n          null,\n          _react2['default'].createElement(\n            'label',\n            { className: 'control-label' },\n            this.state.errorMessage\n          )\n        );\n      }\n      return _react2['default'].createElement(\n        'div',\n        { id: 'login', className: 'uk-modal geo_modals' },\n        _react2['default'].createElement(\n          'div',\n          { className: 'uk-modal-dialog' },\n          _react2['default'].createElement('button', { type: 'button', className: 'uk-modal-close uk-close' }),\n          _react2['default'].createElement(\n            'div',\n            { className: 'uk-modal-header' },\n            _react2['default'].createElement(\n              'h2',\n              null,\n              'Login'\n            )\n          ),\n          errorLabel,\n          _react2['default'].createElement(\n            'form',\n            { className: 'uk-form' },\n            _react2['default'].createElement(\n              'div',\n              { className: 'uk-form-row' },\n              _react2['default'].createElement('input', { className: 'uk-width-1-1 uk-form-large', placeholder: 'Username', type: 'text', ref: 'email' })\n            ),\n            _react2['default'].createElement(\n              'div',\n              { className: 'uk-form-row' },\n              _react2['default'].createElement('input', { className: 'uk-width-1-1 uk-form-large', placeholder: 'Password', type: 'password', ref: 'password' }),\n              _react2['default'].createElement('input', { value: 'user', type: 'hidden', ref: 'role' })\n            ),\n            _react2['default'].createElement(\n              'div',\n              { className: 'uk-form-row' },\n              _react2['default'].createElement(\n                'div',\n                { className: 'uk-text-small uk-pull-left f_r_p' },\n                _react2['default'].createElement(\n                  'label',\n                  { className: 'uk-float-left' },\n                  _react2['default'].createElement('input', { type: 'checkbox' }),\n                  ' Remember Me'\n                ),\n                _react2['default'].createElement(\n                  'a',\n                  { className: 'uk-float-right uk-link uk-link-muted', href: '#' },\n                  'Forgot Password?'\n                )\n              ),\n              _react2['default'].createElement(\n                'a',\n                { className: 'uk-width-1-1 uk-button uk-button-primary uk-button-large', href: '#', onClick: this.handleOnClickLogin },\n                'Login'\n              )\n            )\n          )\n        )\n      );\n    }\n  }]);\n\n  return LoginPage;\n})(_react.Component);\n\nexports['default'] = LoginPage;\n\nLoginPage.propTypes = {\n  onClickLogin: _react.PropTypes.func.isRequired,\n  isFetchingData: _react.PropTypes.bool.isRequired,\n  serverError: _react.PropTypes.string\n};\nmodule.exports = exports['default'];\n\n/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(385); if (makeExportsHot(module, __webpack_require__(67))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error(\"Cannot not apply hot update to \" + \"LoginPage.jsx\" + \": \" + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))\n\n/*****************\n ** WEBPACK FOOTER\n ** ./components/front/LoginPage.jsx\n ** module id = 434\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./components/front/LoginPage.jsx?");

/***/ }

})