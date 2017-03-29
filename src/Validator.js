import Rules from './Rules';
import {getMessage} from './Functions/Utils';

class Validator {
    constructor() {
        this.rules = Rules;
    }

    validate(form) {
        const errors = [];

        for (let field in form) {
            if (!form.hasOwnProperty(field)) {
                continue;
            }

            const {value, rules, label} = form[field];

            for (let i = 0; i < rules.length; i++) {
                const rule = typeof rules[i] === 'function' ? rules[i]() : rules[i];
                const {method, message, options} = rule;
                const passed = method(value, options || null);
                const placeholders = rule.placeholders || {};
                placeholders[':name'] = label;

                if (passed === false) {
                    errors.push(getMessage(message, placeholders));
                }
            }
        }

        return {
            passed: errors.length === 0,
            errors: errors
        };
    }
}

export default Validator;
