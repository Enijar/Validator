(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var getMessage = function getMessage(message, placeholders) {
    for (var placeholder in placeholders) {
        if (!placeholders.hasOwnProperty(placeholder)) {
            continue;
        }

        message = message.split(placeholder).join(placeholders[placeholder]);
    }

    return message;
};

exports.getMessage = getMessage;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Validators = require('../Validators');

var _Validators2 = _interopRequireDefault(_Validators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    return {
        method: _Validators2.default.Pattern,
        message: 'The :name field must be a valid email',
        options: {
            regex: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        }
    };
};

},{"../Validators":11}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _required = require('./required');

var _required2 = _interopRequireDefault(_required);

var _email = require('./email');

var _email2 = _interopRequireDefault(_email);

var _regex = require('./regex');

var _regex2 = _interopRequireDefault(_regex);

var _min = require('./min');

var _min2 = _interopRequireDefault(_min);

var _max = require('./max');

var _max2 = _interopRequireDefault(_max);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    required: _required2.default,
    email: _email2.default,
    regex: _regex2.default,
    min: _min2.default,
    max: _max2.default
};

},{"./email":2,"./max":4,"./min":5,"./regex":6,"./required":7}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Validators = require('../Validators');

var _Validators2 = _interopRequireDefault(_Validators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (length) {
    return {
        method: _Validators2.default.Length,
        message: 'The :name field must be max of :length characters',
        placeholders: {
            ':length': length
        },
        options: {
            max: length
        }
    };
};

},{"../Validators":11}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Validators = require('../Validators');

var _Validators2 = _interopRequireDefault(_Validators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (length) {
    return {
        method: _Validators2.default.Length,
        message: 'The :name field must be min of :length characters',
        placeholders: {
            ':length': length
        },
        options: {
            min: length
        }
    };
};

},{"../Validators":11}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Validators = require('../Validators');

var _Validators2 = _interopRequireDefault(_Validators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (expression) {
    return {
        method: _Validators2.default.Pattern,
        message: 'The :name field must follow the pattern :expression',
        placeholders: {
            ':expression': expression
        },
        options: {
            regex: expression
        }
    };
};

},{"../Validators":11}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Validators = require('../Validators');

var _Validators2 = _interopRequireDefault(_Validators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    return {
        method: _Validators2.default.Length,
        message: 'The :name field is required',
        options: {
            min: 1
        }
    };
};

},{"../Validators":11}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Rules = require('./Rules');

var _Rules2 = _interopRequireDefault(_Rules);

var _Utils = require('./Functions/Utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validator = function () {
    function Validator() {
        _classCallCheck(this, Validator);

        this.rules = _Rules2.default;
    }

    _createClass(Validator, [{
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
                        errors.push((0, _Utils.getMessage)(message, placeholders));
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

},{"./Functions/Utils":1,"./Rules":3}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Length = require('./Length');

var _Length2 = _interopRequireDefault(_Length);

var _Pattern = require('./Pattern');

var _Pattern2 = _interopRequireDefault(_Pattern);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    Length: _Length2.default,
    Pattern: _Pattern2.default
};

},{"./Length":9,"./Pattern":10}]},{},[8]);

//# sourceMappingURL=Validator.js.map
