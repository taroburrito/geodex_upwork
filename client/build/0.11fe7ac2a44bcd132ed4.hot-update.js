webpackHotUpdate(0,{

/***/ 560:
/***/ function(module, exports, __webpack_require__) {

	eval("/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(3), RootInstanceProvider = __webpack_require__(11), ReactMount = __webpack_require__(13), React = __webpack_require__(67); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {\n\n'use strict';\n\nObject.defineProperty(exports, '__esModule', {\n  value: true\n});\n\nvar _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();\n\nvar _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar _react = __webpack_require__(67);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRedux = __webpack_require__(373);\n\nvar _componentsFrontHome = __webpack_require__(432);\n\nvar _componentsFrontHome2 = _interopRequireDefault(_componentsFrontHome);\n\nvar _componentsFrontDashboardPage = __webpack_require__(561);\n\nvar _componentsFrontDashboardPage2 = _interopRequireDefault(_componentsFrontDashboardPage);\n\nvar _componentsNavbar = __webpack_require__(427);\n\nvar _componentsNavbar2 = _interopRequireDefault(_componentsNavbar);\n\nvar _actionsAuthActions = __webpack_require__(384);\n\nvar HomePage = (function (_Component) {\n  _inherits(HomePage, _Component);\n\n  function HomePage(props) {\n    _classCallCheck(this, HomePage);\n\n    _get(Object.getPrototypeOf(HomePage.prototype), 'constructor', this).call(this, props);\n  }\n\n  _createClass(HomePage, [{\n    key: 'componentWillMount',\n    value: function componentWillMount() {}\n  }, {\n    key: 'render',\n    value: function render() {\n      var _props = this.props;\n      var userAuthSession = _props.userAuthSession;\n      var dispatch = _props.dispatch;\n\n      if (userAuthSession.isLoggedIn) {\n\n        return _react2['default'].createElement(\n          'div',\n          { className: 'full_width' },\n          _react2['default'].createElement(_componentsFrontDashboardPage2['default'], null)\n        );\n      } else {\n        return _react2['default'].createElement(\n          'div',\n          { className: 'full_width' },\n          _react2['default'].createElement(_componentsNavbar2['default'], { userAuthSession: userAuthSession }),\n          _react2['default'].createElement(_componentsFrontHome2['default'], null)\n        );\n      }\n    }\n  }]);\n\n  return HomePage;\n})(_react.Component);\n\nfunction select(state) {\n  return {\n    userAuthSession: state.userAuthSession\n  };\n}\n\nexports['default'] = (0, _reactRedux.connect)(select)(HomePage);\nmodule.exports = exports['default'];\n\n/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(385); if (makeExportsHot(module, __webpack_require__(67))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error(\"Cannot not apply hot update to \" + \"HomePage.jsx\" + \": \" + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))\n\n//////////////////\n// WEBPACK FOOTER\n// ./containers/front/HomePage.jsx\n// module id = 560\n// module chunks = 0\n//# sourceURL=webpack:///./containers/front/HomePage.jsx?");

/***/ }

})