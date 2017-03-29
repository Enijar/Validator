export default (value, {regex = /.+/}) => {
    value = value || null;
    value = String(value);
    return regex.test(value);
};
