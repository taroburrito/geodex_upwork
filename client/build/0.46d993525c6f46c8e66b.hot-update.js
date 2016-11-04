webpackHotUpdate(0,{

/***/ 435:
/***/ function(module, exports, __webpack_require__) {

	eval("/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(3), RootInstanceProvider = __webpack_require__(11), ReactMount = __webpack_require__(13), React = __webpack_require__(67); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {\n\n'use strict';\n\nObject.defineProperty(exports, '__esModule', {\n  value: true\n});\n\nvar _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();\n\nvar _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar _react = __webpack_require__(67);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactGooglePlacesSuggest = __webpack_require__(436);\n\nvar _reactGooglePlacesSuggest2 = _interopRequireDefault(_reactGooglePlacesSuggest);\n\nvar _reactDatetime = __webpack_require__(437);\n\nvar _reactDatetime2 = _interopRequireDefault(_reactDatetime);\n\nvar _utilitiesRegexValidators = __webpack_require__(430);\n\nvar _actionsAuthActions = __webpack_require__(384);\n\n//import Autocomplete from 'react-google-autocomplete';\n//Google map Api key  AIzaSyDdrvniQ-jYHgBr6ENTdsk815jwSERUN3c  //\n// Google places AIzaSyCB6cSZOedSN950kc2pczIym6wlD5VgeSo\n__webpack_require__(583);\n\nvar SignupPage = (function (_Component) {\n  _inherits(SignupPage, _Component);\n\n  function SignupPage(props) {\n    _classCallCheck(this, SignupPage);\n\n    _get(Object.getPrototypeOf(SignupPage.prototype), 'constructor', this).call(this, props);\n    this.handleOnClickSignUp = this.handleOnClickSignUp.bind(this);\n    this.state = {\n      search: '',\n      selectedCoordinate: null,\n      errorMessage: null,\n      gender: null\n    };\n\n    //this.onChange = (address) => this.setState({ address })\n  }\n\n  _createClass(SignupPage, [{\n    key: 'handleSearchChange',\n    value: function handleSearchChange(e) {\n\n      this.setState({ search: e.target.value });\n    }\n  }, {\n    key: 'handleSelectSuggest',\n    value: function handleSelectSuggest(suggestName, coordinate) {\n      this.setState({ search: suggestName, selectedCoordinate: coordinate });\n    }\n  }, {\n    key: 'handleOnClickSignUp',\n    value: function handleOnClickSignUp() {\n\n      var gender;\n      if (this.refs.radio_male.getDOMNode().value) {\n        gender = this.refs.radio_male.getDOMNode().value;\n      } else if (this.refs.radio_female.getDOMNode().value) {\n        gender = this.refs.radio_female.getDOMNode().value;\n      } else {\n        gender = \"male\";\n      }\n\n      var formData = {\n        first_name: this.refs.first_name.getDOMNode().value.trim(),\n        last_name: this.refs.last_name.getDOMNode().value.trim(),\n        email: this.refs.email.getDOMNode().value.trim(),\n        address: this.refs.address.getDOMNode().value.trim(),\n        password: this.refs.password.getDOMNode().value.trim(),\n        confirm_password: this.refs.confirm_password.getDOMNode().value.trim(),\n        dob: this.refs.dateofbirth.getDOMNode().value.trim(),\n        gender: this.state.gender,\n        longitude: this.state.selectedCoordinate.longitude,\n        latitude: this.state.selectedCoordinate.latitude\n      };\n\n      this.findErrorsInSignUpForm(formData);\n    }\n  }, {\n    key: 'assginDob',\n    value: function assginDob(e) {\n      alert(e.target.value);\n    }\n  }, {\n    key: 'findErrorsInSignUpForm',\n    value: function findErrorsInSignUpForm(formData) {\n      console.log(formData);\n      var newState = this.state.errorMessage;\n      if (formData.first_name === '') {\n        this.setState({ errorMessage: 'Please enter first name' });\n        this.refs.first_name.getDOMNode().focus();\n      } else if (formData.last_name === '') {\n        this.setState({ errorMessage: 'Please enter last name' });\n        this.refs.last_name.getDOMNode().focus();\n      } else if (formData.email === '') {\n        this.setState({ errorMessage: 'Please enter email' });\n        this.refs.email.getDOMNode().focus();\n      } else if (!(0, _utilitiesRegexValidators.validateEmail)(formData.email)) {\n        this.setState({ errorMessage: 'Please enter correct email address' });\n        this.refs.email.getDOMNode().focus();\n      } else if (formData.address === '') {\n        this.setState({ errorMessage: 'Please enter address' });\n        this.refs.address.getDOMNode().focus();\n      } else if (formData.password === '') {\n        this.setState({ errorMessage: 'Please enter Password' });\n        this.refs.password.getDOMNode().focus();\n      } else if (!(0, _utilitiesRegexValidators.validatePassword)(formData.password)) {\n        this.setState({ errorMessage: 'Your password must contain at least 6 valid characters' });\n        this.refs.password.getDOMNode().focus();\n      } else if (formData.confirm_password === '') {\n        this.setState({ errorMessage: 'Please enter confirm password' });\n        this.refs.confirm_password.getDOMNode().focus();\n      } else if (formData.confirm_password != formData.password) {\n        this.setState({ errorMessage: 'Password and confirm password does not match' });\n        this.refs.confirm_password.getDOMNode().focus();\n      } else if (formData.dob === '') {\n        this.setState({ errorMessage: 'Please enter date of birth' });\n        this.refs.dob.getDOMNode().focus();\n      } else {\n        this.setState({ errorMessage: null });\n        //dispatch(attemptSignUp(formData));\n        this.props.onClickSignUp(formData);\n      }\n    }\n  }, {\n    key: 'selsectGender',\n    value: function selsectGender(e) {\n      this.setState({ gender: e.target.value });\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      var search = this.state.search;\n\n      var errorLabel;\n      if (this.state.errorMessage) {\n        errorLabel = _react2['default'].createElement(\n          'div',\n          { className: 'uk-alert uk-alert-danger' },\n          _react2['default'].createElement(\n            'p',\n            null,\n            this.state.errorMessage\n          )\n        );\n      }\n      return _react2['default'].createElement(\n        'div',\n        { id: 'signup', className: 'uk-modal geo_modals' },\n        _react2['default'].createElement(\n          'div',\n          { className: 'uk-modal-dialog' },\n          _react2['default'].createElement('button', { type: 'button', className: 'uk-modal-close uk-close' }),\n          _react2['default'].createElement(\n            'div',\n            { className: 'uk-modal-header' },\n            _react2['default'].createElement(\n              'h2',\n              null,\n              'Signup Now'\n            )\n          ),\n          errorLabel,\n          _react2['default'].createElement(\n            'form',\n            { className: 'uk-form' },\n            _react2['default'].createElement(\n              'div',\n              { className: 'uk-grid uk-grid-small' },\n              _react2['default'].createElement(\n                'div',\n                { className: 'uk-width-small-1-2' },\n                _react2['default'].createElement('input', { className: 'uk-width-1-1 uk-form-large', placeholder: 'First name', type: 'text', ref: 'first_name' })\n              ),\n              _react2['default'].createElement(\n                'div',\n                { className: 'uk-width-small-1-2' },\n                _react2['default'].createElement('input', { className: 'uk-width-1-1 uk-form-large', placeholder: 'Last name', type: 'text', ref: 'last_name' })\n              )\n            ),\n            _react2['default'].createElement(\n              _reactGooglePlacesSuggest2['default'],\n              { onSelectSuggest: this.handleSelectSuggest.bind(this), search: search },\n              _react2['default'].createElement('input', { className: 'uk-width-1-1 uk-form-large', type: 'text', ref: 'address', value: search, placeholder: 'Search a location', onChange: this.handleSearchChange.bind(this) }),\n              _react2['default'].createElement('input', { type: 'hidden', value: this.state.selectedCoordinate ? this.state.selectedCoordinate.latitude : '', ref: 'latitude' }),\n              _react2['default'].createElement('input', { type: 'hidden', value: this.state.selectedCoordinate ? this.state.selectedCoordinate.longitude : '', ref: 'longitude' })\n            ),\n            _react2['default'].createElement(\n              'div',\n              { className: 'uk-grid uk-grid-small' },\n              _react2['default'].createElement(\n                'div',\n                { className: 'uk-width-small-1-1' },\n                _react2['default'].createElement('input', { className: 'uk-width-1-1 uk-form-large', placeholder: 'Email address', type: 'text', ref: 'email' })\n              )\n            ),\n            _react2['default'].createElement(\n              'div',\n              { className: 'uk-grid uk-grid-small' },\n              _react2['default'].createElement(\n                'div',\n                { className: 'uk-width-small-1-2' },\n                _react2['default'].createElement('input', { className: 'uk-width-1-1 uk-form-large', placeholder: 'Password', type: 'password', ref: 'password' })\n              ),\n              _react2['default'].createElement(\n                'div',\n                { className: 'uk-width-small-1-2' },\n                _react2['default'].createElement('input', { className: 'uk-width-1-1 uk-form-large', placeholder: 'Reenter Password', type: 'password', ref: 'confirm_password' })\n              )\n            ),\n            _react2['default'].createElement(\n              'div',\n              { className: 'uk-grid uk-grid-small' },\n              _react2['default'].createElement(\n                'div',\n                { className: 'uk-width-small-1-2' },\n                _react2['default'].createElement(_reactDatetime2['default'], { inputProps: { name: \"dateofbirth\", placeholder: \"Date of birth\" }, onChange: this.assginDob(this), input: true, className: \"dob\", closeOnSelect: true, viewMode: \"years\", timeFormat: false, dateFormat: 'YYYY-MM-DD' })\n              ),\n              _react2['default'].createElement(\n                'div',\n                { className: 'uk-width-small-1-2 gender_select' },\n                _react2['default'].createElement(\n                  'label',\n                  null,\n                  'Gender'\n                ),\n                _react2['default'].createElement('input', { name: 'sex', value: 'male', id: 'u_0_d', type: 'radio', ref: 'radio_male', onChange: this.selsectGender.bind(this) }),\n                _react2['default'].createElement(\n                  'label',\n                  { className: '_58mt', 'for': 'u_0_d' },\n                  'Male'\n                ),\n                _react2['default'].createElement('input', { name: 'sex', value: 'female', id: 'u_0_e', type: 'radio', ref: 'radio_female', onChange: this.selsectGender.bind(this) }),\n                _react2['default'].createElement(\n                  'label',\n                  { className: '_58mt', 'for': 'u_0_e' },\n                  'Female'\n                )\n              )\n            ),\n            _react2['default'].createElement(\n              'div',\n              { className: 'uk-grid uk-grid-small sign_btn' },\n              _react2['default'].createElement(\n                'a',\n                { className: 'uk-width-1-1 uk-button uk-button-primary uk-button-large', href: '#', onClick: this.handleOnClickSignUp },\n                'Signup'\n              ),\n              _react2['default'].createElement(\n                'a',\n                { className: 'uk-width-1-1 uk-button uk-button-primary uk-button-large uk-modal-close', href: 'dashboard.html' },\n                'Cancel'\n              )\n            )\n          )\n        )\n      );\n    }\n  }]);\n\n  return SignupPage;\n})(_react.Component);\n\nexports['default'] = SignupPage;\nmodule.exports = exports['default'];\n\n/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(385); if (makeExportsHot(module, __webpack_require__(67))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error(\"Cannot not apply hot update to \" + \"SignupPage.jsx\" + \": \" + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))\n\n//////////////////\n// WEBPACK FOOTER\n// ./components/front/SignupPage.jsx\n// module id = 435\n// module chunks = 0\n//# sourceURL=webpack:///./components/front/SignupPage.jsx?");

/***/ }

})