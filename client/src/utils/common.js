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
  preLoadImages
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
  preLoadImages
};