export default (value, {min = 0, max = Infinity}) => {
    value = value || '';
    value = String(value);
    return value.length >= min && value.length <= max;
};
