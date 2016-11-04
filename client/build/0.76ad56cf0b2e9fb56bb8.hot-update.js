webpackHotUpdate(0,{

/***/ 584:
/***/ function(module, exports, __webpack_require__) {

	eval("/* WEBPACK VAR INJECTION */(function(module) {/* REACT HOT LOADER */ if (true) { (function () { var ReactHotAPI = __webpack_require__(3), RootInstanceProvider = __webpack_require__(11), ReactMount = __webpack_require__(13), React = __webpack_require__(67); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {\n\n'use strict';\n\nObject.defineProperty(exports, '__esModule', {\n    value: true\n});\n\nvar _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();\n\nvar _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar _react = __webpack_require__(67);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(550);\n\nvar _reactDom2 = _interopRequireDefault(_reactDom);\n\nvar _reactRedux = __webpack_require__(373);\n\nvar _reactGooglePlacesSuggest = __webpack_require__(436);\n\nvar _reactGooglePlacesSuggest2 = _interopRequireDefault(_reactGooglePlacesSuggest);\n\nvar _reactRouter = __webpack_require__(397);\n\nvar _reactDatetime = __webpack_require__(437);\n\nvar _reactDatetime2 = _interopRequireDefault(_reactDatetime);\n\nvar _utilitiesRegexValidators = __webpack_require__(430);\n\nvar _actionsProfileActions = __webpack_require__(391);\n\n__webpack_require__(551);\n\nvar AvatarEditor = __webpack_require__(585);\n\nvar initialFormState = {\n    longitude: null,\n    latitude: null\n};\nvar src = 'http://fengyuanchen.github.io/cropper/img/picture.jpg';\n\nvar EditProfile = (function (_Component) {\n    _inherits(EditProfile, _Component);\n\n    function EditProfile(props) {\n        _classCallCheck(this, EditProfile);\n\n        _get(Object.getPrototypeOf(EditProfile.prototype), 'constructor', this).call(this, props);\n        this.onFirstNameChange = this.onFirstNameChange.bind(this);\n        this.onLastNameChange = this.onLastNameChange.bind(this);\n        this.onEmailChange = this.onEmailChange.bind(this);\n        this.onDobChange = this.onDobChange.bind(this);\n        this.onGenderChange = this.onGenderChange.bind(this);\n        this.handleSave = this.handleSave.bind(this);\n        this.handleScale = this.handleScale.bind(this);\n        this.handleBorderRadius = this.handleBorderRadius.bind(this);\n        this.handleOnClickUpdate = this.handleOnClickUpdate.bind(this);\n        this.state = {\n            search: '',\n            selectedCoordinate: initialFormState,\n            errorMessage: null,\n            gender: null,\n            dob: null,\n            scale: 1,\n            borderRadius: 0,\n            preview: null\n        };\n    }\n\n    _createClass(EditProfile, [{\n        key: 'handleSave',\n        value: function handleSave(data) {\n            var img = this.refs.avatar.getImage();\n            // this.setState({ preview: img});\n            var dispatch = this.props.dispatch;\n\n            dispatch((0, _actionsProfileActions.updateProfileInput)('profile_image', img));\n        }\n    }, {\n        key: 'handleScale',\n        value: function handleScale(e) {\n            var scale = parseFloat(e.target.value);\n            this.setState({ scale: scale });\n        }\n    }, {\n        key: 'handleBorderRadius',\n        value: function handleBorderRadius() {\n            var borderRadius = parseInt(this.refs.borderRadius.value);\n            this.setState({ borderRadius: borderRadius });\n        }\n    }, {\n        key: 'handleSearchChange',\n        value: function handleSearchChange(e) {\n            var dispatch = this.props.dispatch;\n\n            dispatch((0, _actionsProfileActions.updateProfileInput)('address', e.target.value));\n            this.setState({ search: e.target.value });\n        }\n    }, {\n        key: 'handleSelectSuggest',\n        value: function handleSelectSuggest(suggestName, coordinate) {\n            this.setState({ search: suggestName, selectedCoordinate: coordinate });\n            var dispatch = this.props.dispatch;\n\n            dispatch((0, _actionsProfileActions.updateProfileInput)('address', suggestName));\n        }\n    }, {\n        key: 'logCallback',\n        value: function logCallback(e) {\n            //console.log(\"callback\", e);\n        }\n    }, {\n        key: 'handleOnClickUpdate',\n        value: function handleOnClickUpdate() {\n            var _props = this.props;\n            var userData = _props.userData;\n            var dispatch = _props.dispatch;\n\n            var newState = this.state.errorMessage;\n            if (userData.first_name === '') {\n                this.setState({ errorMessage: 'Please enter first name' });\n                this.refs.first_name.getDOMNode().focus();\n            } else if (userData.last_name === '') {\n                this.setState({ errorMessage: 'Please enter last name' });\n                this.refs.last_name.getDOMNode().focus();\n            } else if (userData.email === '') {\n                this.setState({ errorMessage: 'Please enter email' });\n                this.refs.email.getDOMNode().focus();\n            } else if (!(0, _utilitiesRegexValidators.validateEmail)(userData.email)) {\n                this.setState({ errorMessage: 'Please enter correct email address' });\n                this.refs.email.getDOMNode().focus();\n            } else if (userData.address === '') {\n                this.setState({ errorMessage: 'Please enter address' });\n                this.refs.address.getDOMNode().focus();\n            } else if (userData.dob === null) {\n                this.setState({ errorMessage: 'Please enter date of birth' });\n            } else {\n                this.setState({ errorMessage: null });\n                dispatch((0, _actionsProfileActions.updateUserProfileData)(userProfileData));\n            }\n        }\n    }, {\n        key: 'onFirstNameChange',\n        value: function onFirstNameChange(event) {\n            var dispatch = this.props.dispatch;\n\n            dispatch((0, _actionsProfileActions.updateProfileInput)('first_name', event.target.value));\n        }\n    }, {\n        key: 'onLastNameChange',\n        value: function onLastNameChange(event) {\n            var dispatch = this.props.dispatch;\n\n            dispatch((0, _actionsProfileActions.updateProfileInput)('last_name', event.target.value));\n        }\n    }, {\n        key: 'onEmailChange',\n        value: function onEmailChange(event) {\n            var dispatch = this.props.dispatch;\n\n            dispatch((0, _actionsProfileActions.updateProfileInput)('email', event.target.value));\n        }\n    }, {\n        key: 'onDobChange',\n        value: function onDobChange(dob) {\n            var dispatch = this.props.dispatch;\n\n            dispatch((0, _actionsProfileActions.updateProfileInput)('dob', dob));\n        }\n    }, {\n        key: 'onGenderChange',\n        value: function onGenderChange(event) {\n            var dispatch = this.props.dispatch;\n\n            dispatch((0, _actionsProfileActions.updateProfileInput)('gender', event.target.value));\n        }\n    }, {\n        key: 'dateVal',\n        value: function dateVal(date) {\n            var dateval = new Date(date);\n            var month = dateval.getMonth() + 1;\n            var year = dateval.getFullYear();\n            var day = dateval.getDate();\n            return year + '/' + month + '/' + day;\n        }\n    }, {\n        key: 'getProfileImage',\n        value: function getProfileImage(img) {\n            //console.log(img);\n            if (img) {\n                return img;\n            } else {\n                return \"public/images/user.jpg\";\n            }\n        }\n    }, {\n        key: 'render',\n        value: function render() {\n            var _this = this;\n\n            var _props2 = this.props;\n            var dispatch = _props2.dispatch;\n            var userData = _props2.userData;\n            var search = this.state.search;\n\n            if (userData) {\n                var errorLabel;\n                if (this.state.errorMessage) {\n                    errorLabel = _react2['default'].createElement(\n                        'div',\n                        { className: 'uk-alert uk-alert-danger' },\n                        _react2['default'].createElement(\n                            'p',\n                            null,\n                            this.state.errorMessage\n                        )\n                    );\n                }\n                return _react2['default'].createElement(\n                    'div',\n                    null,\n                    _react2['default'].createElement(\n                        'div',\n                        { id: 'profilepic', className: 'uk-modal profile-modal' },\n                        _react2['default'].createElement(\n                            'div',\n                            { className: 'uk-modal-dialog' },\n                            _react2['default'].createElement(AvatarEditor, {\n                                image: this.getProfileImage(userData.profile_image),\n                                ref: 'avatar',\n                                width: 250,\n                                height: 250,\n                                border: 10,\n                                color: [255, 255, 255, 0.6], // RGBA\n                                scale: parseFloat(this.state.scale),\n                                borderRadius: this.state.borderRadius,\n                                onSave: this.handleSave,\n                                onLoadFailure: this.logCallback.bind(this, 'onLoadFailed'),\n                                onLoadSuccess: this.logCallback.bind(this, 'onLoadSuccess'),\n                                onImageReady: this.logCallback.bind(this, 'onImageReady'),\n                                onImageLoad: this.logCallback.bind(this, 'onImageLoad'),\n                                onDropFile: this.logCallback.bind(this, 'onDropFile')\n                            }),\n                            _react2['default'].createElement('br', null),\n                            _react2['default'].createElement('input', { name: 'scale', type: 'range', ref: 'scale', onChange: this.handleScale, min: '1', max: '2', step: '0.01',\n                                defaultValue: '1' }),\n                            _react2['default'].createElement('br', null),\n                            _react2['default'].createElement('input', { className: 'uk-button uk-button-primary uk-button-large', type: 'button', onClick: this.handleSave, value: 'Save' }),\n                            _react2['default'].createElement('br', null)\n                        )\n                    ),\n                    _react2['default'].createElement(\n                        'div',\n                        { className: 'background_profile' },\n                        _react2['default'].createElement(\n                            'div',\n                            { className: 'uk-container uk-container-center' },\n                            _react2['default'].createElement(\n                                'div',\n                                { className: 'uk-grid uk-grid-large dash_top_head' },\n                                _react2['default'].createElement(\n                                    'div',\n                                    { className: 'uk-width-small-1-2' },\n                                    _react2['default'].createElement(\n                                        'div',\n                                        { className: 'uk-grid uk-grid-small' },\n                                        _react2['default'].createElement(\n                                            'div',\n                                            { className: 'uk-width-3-10 user_img_left' },\n                                            _react2['default'].createElement('img', { src: this.getProfileImage(userData.profile_image), style: { borderRadius: this.state.borderRadius + 5 /* because of the 5px padding */ } }),\n                                            _react2['default'].createElement(\n                                                'a',\n                                                { 'data-uk-modal': '{target:\\'#profilepic\\'}', href: '#', className: 'edit_profile_img_btn' },\n                                                'Edit ',\n                                                _react2['default'].createElement('i', { className: 'uk-icon-file-image-o' })\n                                            )\n                                        ),\n                                        _react2['default'].createElement(\n                                            'div',\n                                            { className: 'uk-width-7-10 pro_right' },\n                                            _react2['default'].createElement(\n                                                'h3',\n                                                null,\n                                                userData.first_name,\n                                                ' ',\n                                                userData.last_name,\n                                                ' '\n                                            ),\n                                            _react2['default'].createElement(\n                                                'h4',\n                                                null,\n                                                userData.address\n                                            ),\n                                            _react2['default'].createElement(\n                                                'h5',\n                                                null,\n                                                userData.profile_image\n                                            )\n                                        )\n                                    )\n                                )\n                            )\n                        )\n                    ),\n                    _react2['default'].createElement(\n                        'div',\n                        { className: 'uk-container uk-container-center middle_content profile profile_page' },\n                        _react2['default'].createElement(\n                            'div',\n                            { className: 'uk-grid uk-grid-large profile_bottom' },\n                            _react2['default'].createElement(\n                                'div',\n                                { className: 'uk-form uk-margin uk-form-stacked edit_profile uk-grid uk-grid-large uk-width-medium-1-1' },\n                                _react2['default'].createElement(\n                                    'div',\n                                    { className: 'uk-width-medium-1-3 profile-sidebar' },\n                                    _react2['default'].createElement(\n                                        'ul',\n                                        { className: 'uk-tab uk-tab-left uk-width-medium-1-1', 'data-uk-tab': '' },\n                                        _react2['default'].createElement(\n                                            'li',\n                                            { className: 'uk-active', 'aria-expanded': 'true' },\n                                            _react2['default'].createElement(\n                                                'a',\n                                                { href: '#' },\n                                                'Edit Profile'\n                                            )\n                                        ),\n                                        _react2['default'].createElement(\n                                            'li',\n                                            { className: '', 'aria-expanded': 'false' },\n                                            _react2['default'].createElement(\n                                                'a',\n                                                { href: '#' },\n                                                'Change Password'\n                                            )\n                                        ),\n                                        _react2['default'].createElement(\n                                            'li',\n                                            { 'aria-expanded': 'false', className: '' },\n                                            _react2['default'].createElement(\n                                                'a',\n                                                { href: '#' },\n                                                'Custom Design'\n                                            )\n                                        )\n                                    )\n                                ),\n                                _react2['default'].createElement(\n                                    'div',\n                                    { className: 'uk-width-medium-2-3 profile-form' },\n                                    errorLabel,\n                                    _react2['default'].createElement(\n                                        'div',\n                                        { className: 'uk-grid uk-grid-medium' },\n                                        _react2['default'].createElement(\n                                            'h4',\n                                            { className: 'uk-width-medium-1-1' },\n                                            'Personal Information'\n                                        ),\n                                        _react2['default'].createElement(\n                                            'div',\n                                            { className: 'uk-width-medium-1-2' },\n                                            _react2['default'].createElement(\n                                                'label',\n                                                { className: 'uk-form-label', 'for': 'form-gs-a' },\n                                                'First Name'\n                                            ),\n                                            _react2['default'].createElement(\n                                                'div',\n                                                { className: 'uk-form-controls' },\n                                                _react2['default'].createElement('input', { id: 'form-gs-a', placeholder: '', ref: 'first_name', className: 'uk-width-1-1', onChange: this.onFirstNameChange, value: userData.first_name, type: 'text' })\n                                            )\n                                        ),\n                                        _react2['default'].createElement(\n                                            'div',\n                                            { className: 'uk-width-medium-1-2' },\n                                            _react2['default'].createElement(\n                                                'label',\n                                                { className: 'uk-form-label', 'for': 'form-gs-b' },\n                                                'Last Name'\n                                            ),\n                                            _react2['default'].createElement(\n                                                'div',\n                                                { className: 'uk-form-controls' },\n                                                _react2['default'].createElement('input', { id: 'form-gs-b', placeholder: '', ref: 'last_name', onChange: this.onLastNameChange, value: userData.last_name, className: 'uk-width-1-1', type: 'text' })\n                                            )\n                                        )\n                                    ),\n                                    _react2['default'].createElement(\n                                        'div',\n                                        { className: 'uk-grid uk-grid-medium' },\n                                        _react2['default'].createElement(\n                                            'div',\n                                            { className: 'uk-width-medium-1-2' },\n                                            _react2['default'].createElement(\n                                                'label',\n                                                { className: 'uk-form-label', 'for': 'form-gs-a' },\n                                                'Email Id'\n                                            ),\n                                            _react2['default'].createElement(\n                                                'div',\n                                                { className: 'uk-form-controls' },\n                                                _react2['default'].createElement('input', { id: 'form-gs-a', placeholder: '', ref: 'email', onChange: this.onEmailChange, value: userData.email, className: 'uk-width-1-1', type: 'text' })\n                                            )\n                                        ),\n                                        _react2['default'].createElement(\n                                            'div',\n                                            { className: 'uk-width-medium-1-2' },\n                                            _react2['default'].createElement(\n                                                'label',\n                                                { className: 'uk-form-label', 'for': 'form-gs-b' },\n                                                'Location'\n                                            ),\n                                            _react2['default'].createElement(\n                                                'div',\n                                                { className: 'uk-form-controls' },\n                                                _react2['default'].createElement(\n                                                    _reactGooglePlacesSuggest2['default'],\n                                                    { onSelectSuggest: this.handleSelectSuggest.bind(this), search: search },\n                                                    _react2['default'].createElement('input', { className: 'uk-width-1-1 uk-form-large', type: 'text', ref: 'address', value: userData.address, placeholder: 'Search a location', onChange: this.handleSearchChange.bind(this) }),\n                                                    _react2['default'].createElement('input', { type: 'hidden', value: this.state.selectedCoordinate ? this.state.selectedCoordinate.latitude : '', ref: 'latitude' }),\n                                                    _react2['default'].createElement('input', { type: 'hidden', value: this.state.selectedCoordinate ? this.state.selectedCoordinate.longitude : '', ref: 'longitude' })\n                                                )\n                                            )\n                                        )\n                                    ),\n                                    _react2['default'].createElement(\n                                        'div',\n                                        { className: 'uk-grid uk-grid-medium' },\n                                        _react2['default'].createElement(\n                                            'div',\n                                            { className: 'uk-width-medium-1-2' },\n                                            _react2['default'].createElement(\n                                                'label',\n                                                { className: 'uk-form-label', 'for': 'form-gs-a' },\n                                                'Date of Birth'\n                                            ),\n                                            _react2['default'].createElement(\n                                                'div',\n                                                { className: 'uk-form-controls' },\n                                                _react2['default'].createElement(_reactDatetime2['default'], { value: this.dateVal(userData.dob), disableOnClickOutside: true, inputProps: { name: \"dob\", placeholder: \"Date of birth\" }, onChange: function (dob) {\n                                                        return _this.onDobChange(dob);\n                                                    }, input: true, className: \"dob\", closeOnSelect: true, viewMode: \"days\", timeFormat: false, dateFormat: 'YYYY-MM-DD' })\n                                            )\n                                        ),\n                                        _react2['default'].createElement(\n                                            'div',\n                                            { className: 'uk-width-medium-1-2' },\n                                            _react2['default'].createElement(\n                                                'label',\n                                                { className: 'uk-form-label', 'for': 'form-gs-b' },\n                                                'Gender'\n                                            ),\n                                            _react2['default'].createElement(\n                                                'div',\n                                                { className: 'uk-form-controls' },\n                                                _react2['default'].createElement(\n                                                    'div',\n                                                    { className: 'uk-width-small-1-2 gender_select' },\n                                                    _react2['default'].createElement('input', { name: 'gender', ref: 'radio_female', value: 'female', id: 'u_0_d', type: 'radio', onChange: this.onGenderChange, checked: userData.gender === 'female' }),\n                                                    _react2['default'].createElement(\n                                                        'label',\n                                                        { className: '_58mt', 'for': 'u_0_d' },\n                                                        ' Female '\n                                                    ),\n                                                    _react2['default'].createElement('input', { name: 'gender', ref: 'radio_male', value: 'male', id: 'u_0_e', type: 'radio', onChange: this.onGenderChange, checked: userData.gender === 'male' }),\n                                                    _react2['default'].createElement(\n                                                        'label',\n                                                        { className: '_58mt', 'for': 'u_0_e' },\n                                                        ' Male '\n                                                    )\n                                                )\n                                            )\n                                        )\n                                    )\n                                )\n                            )\n                        ),\n                        _react2['default'].createElement(\n                            'p',\n                            { className: 'text-align-right' },\n                            _react2['default'].createElement(\n                                'button',\n                                { className: 'uk-button uk-button-success uk-button-large', onClick: this.handleOnClickUpdate },\n                                'Update '\n                            ),\n                            _react2['default'].createElement(\n                                'a',\n                                { className: 'uk-button uk-button-large', href: '#/dashboard' },\n                                'Cancel'\n                            )\n                        )\n                    )\n                );\n            }\n        }\n    }]);\n\n    return EditProfile;\n})(_react.Component);\n\nexports['default'] = EditProfile;\n\nEditProfile.contextTypes = {};\n\nfunction select(state) {\n    return {\n        userData: state.userProfileData\n    };\n}\n\n// Wrap the component to inject dispatch and state into it\nexports['default'] = (0, _reactRedux.connect)(select)(EditProfile);\nmodule.exports = exports['default'];\n\n/* REACT HOT LOADER */ }).call(this); } finally { if (true) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = __webpack_require__(385); if (makeExportsHot(module, __webpack_require__(67))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error(\"Cannot not apply hot update to \" + \"EditProfile.jsx\" + \": \" + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))\n\n//////////////////\n// WEBPACK FOOTER\n// ./components/front/EditProfile.jsx\n// module id = 584\n// module chunks = 0\n//# sourceURL=webpack:///./components/front/EditProfile.jsx?");

/***/ }

})