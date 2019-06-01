import * as R from  'ramda';

const staticUrl = (url = "") => `${process.env.REACT_APP_BASE_PATH}/${url}`;

const classes = (rawClass, conditionClass = {}) => {
    const getOnlyTruthyClasses = Object.keys(conditionClass).map(className => conditionClass[className] ? className : null).filter(item => item).join(' ');
    return rawClass + (getOnlyTruthyClasses ? ` ${getOnlyTruthyClasses}` : '');
};

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

const preLoadImages = (imageUrls) => {
    imageUrls.forEach(imageUrl => (new Image()).src = imageUrl);
};

const checkHasActionType = R.curry((prefixName, actionName) => {
    return actionName.split(".").slice(0, -1).join(".") === prefixName;
});
const makeActionsType =  R.curry((prefixName, name) => `${prefixName}.${name.toUpperCase()}`);

const booleanToPromise = bool => bool ? Promise.resolve() : Promise.reject();

const mapByProp = R.curry((prop, arr) => arr.reduce((acc, item) => ({
    ...acc,
    [item[prop]]: item
}), {}));

const mapByIds = mapByProp('id');

const renameProp = R.curry(
    (oldProp, newProp, { [oldProp]: old, ...others }) => ({
        [newProp]: old,
        ...others,
    }),
);

const copyToClipboard = str => {
  const el = document.createElement('textarea');  // Create a <textarea> element
  el.value = str;                                 // Set its value to the string that you want copied
  el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
  el.style.position = 'absolute';
  el.style.left = '-9999px';                      // Move outside the screen to make it invisible
  document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
  const selected =
    document.getSelection().rangeCount > 0        // Check if there is any content selected previously
      ? document.getSelection().getRangeAt(0)     // Store selection if found
      : false;                                    // Mark as false to know no selection existed before
  el.select();                                    // Select the <textarea> content
  document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
  document.body.removeChild(el);                  // Remove the <textarea> element
  if (selected) {                                 // If a selection existed before copying
    document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
    document.getSelection().addRange(selected);   // Restore the original selection
  }
};

export default {
  classes,
  uuidv4,
  staticUrl,
  checkHasActionType,
  makeActionsType,
  booleanToPromise,
  mapByIds,
  mapByProp,
  renameProp,
  preLoadImages,
  copyToClipboard
};

export {
  classes,
  uuidv4,
  staticUrl,
  checkHasActionType,
  makeActionsType,
  booleanToPromise,
  mapByIds,
  mapByProp,
  renameProp,
  preLoadImages,
  copyToClipboard
};