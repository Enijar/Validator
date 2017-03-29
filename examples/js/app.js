(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Length = require('./Validators/Length');

var _Length2 = _interopRequireDefault(_Length);

var _Pattern = require('./Validators/Pattern');

var _Pattern2 = _interopRequireDefault(_Pattern);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validator = function () {
    function Validator() {
        _classCallCheck(this, Validator);

        this.rules = {
            regex: this.regex,
            email: this.email,
            required: this.required,
            min: this.min,
            max: this.max
        };
    }

    _createClass(Validator, [{
        key: 'getMessage',
        value: function getMessage(message, placeholders) {
            for (var placeholder in placeholders) {
                if (!placeholders.hasOwnProperty(placeholder)) {
                    continue;
                }

                message = message.split(placeholder).join(placeholders[placeholder]);
            }

            return message;
        }
    }, {
        key: 'regex',
        value: function regex(expression) {
            return {
                method: _Pattern2.default,
                message: 'The :name field must follow the pattern :expression',
                placeholders: {
                    ':expression': expression
                },
                options: {
                    regex: expression
                }
            };
        }
    }, {
        key: 'email',
        value: function email() {
            return {
                method: _Pattern2.default,
                message: 'The :name field must be a valid email',
                options: {
                    regex: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                }
            };
        }
    }, {
        key: 'required',
        value: function required() {
            return {
                method: _Length2.default,
                message: 'The :name field is required',
                options: {
                    min: 1
                }
            };
        }
    }, {
        key: 'min',
        value: function min(length) {
            return {
                method: _Length2.default,
                message: 'The :name field must be min of :length characters',
                placeholders: {
                    ':length': length
                },
                options: {
                    min: length
                }
            };
        }
    }, {
        key: 'max',
        value: function max(length) {
            return {
                method: _Length2.default,
                message: 'The :name field must be max of :length characters',
                placeholders: {
                    ':length': length
                },
                options: {
                    max: length
                }
            };
        }
    }, {
        key: 'validate',
        value: function validate(form) {
            var errors = [];

            for (var field in form) {
                if (!form.hasOwnProperty(field)) {
                    continue;
                }

                var _form$field = form[field],
                    value = _form$field.value,
                    rules = _form$field.rules,
                    label = _form$field.label;


                for (var i = 0; i < rules.length; i++) {
                    var rule = typeof rules[i] === 'function' ? rules[i]() : rules[i];
                    var method = rule.method,
                        message = rule.message,
                        options = rule.options;

                    var passed = method(value, options || null);
                    var placeholders = rule.placeholders || {};
                    placeholders[':name'] = label;

                    if (passed === false) {
                        errors.push(this.getMessage(message, placeholders));
                    }
                }
            }

            return {
                passed: errors.length === 0,
                errors: errors
            };
        }
    }]);

    return Validator;
}();

exports.default = Validator;

},{"./Validators/Length":2,"./Validators/Pattern":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (value, _ref) {
    var _ref$min = _ref.min,
        min = _ref$min === undefined ? 0 : _ref$min,
        _ref$max = _ref.max,
        max = _ref$max === undefined ? Infinity : _ref$max;

    value = value || '';
    value = String(value);
    return value.length >= min && value.length <= max;
};

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (value, _ref) {
    var _ref$regex = _ref.regex,
        regex = _ref$regex === undefined ? /.+/ : _ref$regex;

    value = value || null;
    value = String(value);
    return regex.test(value);
};

},{}],4:[function(require,module,exports){
'use strict';

var _Validator = require('./Validator');

var _Validator2 = _interopRequireDefault(_Validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validator = new _Validator2.default();

var schema = {
    email: {
        label: 'Email',
        value: '',
        rules: [validator.rules.required, validator.rules.email, validator.rules.max(255)]
    },
    firstName: {
        label: 'First Name',
        value: '',
        rules: [validator.rules.required, validator.rules.max(20)]
    },
    lastName: {
        label: 'Last Name',
        value: '',
        rules: [validator.rules.required, validator.rules.max(20)]
    },
    pin: {
        label: 'PIN',
        value: '',
        rules: [validator.rules.required, validator.rules.min(4), validator.rules.max(4)]
    }
};

var form = document.querySelector('#form');
var errors = document.querySelector('#errors');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    for (var element in form.elements) {
        if (!form.elements.hasOwnProperty(element)) {
            continue;
        }

        var field = form.elements[element];

        if (field.name) {
            schema[field.name].value = field.value;
        }
    }

    var validation = validator.validate(schema);

    if (!validation.passed) {
        errors.innerHTML = validation.errors.map(function (error) {
            return '<li>' + error + '</li>';
        }).join('');
    } else {
        errors.innerHTML = '';
    }
});

},{"./Validator":1}]},{},[4]);

//# sourceMappingURL=app.js.map
