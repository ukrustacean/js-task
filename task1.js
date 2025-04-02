// Original code:
//
// ctx.prototype.__applyStyleState = function (styleState) { var keys = Object.keys(styleState),
// i, key; for (i=0; i<keys.length; i++) { key = keys[i]; this[key] = styleState[key]; } };
// ctx.prototype.__setDefaultStyles = function () { var keys = Object.keys(STYLES), i, key;
// // keys of object - object selection for (i=0; i<keys.length; i++) { key = keys[i]; this[key] =
// STYLES[key].canvas; // field selection } }; ctx.prototype.__getStyleState = function () {
// var i, styleState = {}, keys = Object.keys(STYLES), key; for (i=0; i<keys.length; i++) {
// key = keys[i]; styleState[key] = this[key]; } return styleState; };

// The task is to use DRY principle on the code.
// After formatting I saw this repeating piece of code:
//
// ```
//   let keys = Object.keys($1);
//   for (let i = 0; i < keys.length; i++) {
//     let key = keys[i];
//     $2[key] = $3(key);
//   }
// ```
//
// According to the task, I moved the code to the separate function down below 

/** Function to copy styles from one object to another.
 * 
 * @param { Record<string, any> } keySource - object, keys from which will be assigned to `styleTarget`
 *                                            and will be passed to `styleSourceMapper`
 * @param { Record<string, any> } styleTarget - object, to which styles will be copied
 * @param { (key: string) => any } styleSourceMapper - function, which maps key to the corresponding style
*/
function copyStyles(keySource, styleTarget, styleSourceMapper) {
  const keys = Object.keys(keySource);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    styleTarget[key] = styleSourceMapper(key);
  }
}

const ctx = {
  __applyStyleState: function (styleState) {
    copyStyles(styleState, this, (key) => styleState[key]);
  },

  __setDefaultStyles: function () {
    copyStyles(STYLES, this, (key) => STYLES[key].canvas);
  },

  __getStyleState: function () {
    const styleState = {};
    copyStyles(STYLES, styleState, (key) => this[key]);
    return styleState;
  },
};
