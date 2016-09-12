'use strict';
// Input Masks
// TODO: babel and import from
// git+https://github.com/austinwulf/input-masks.git#develop
!function(){function t(t){return l.reduce(function(r,e){return e.character===t?e.match:r},null)}function r(t,r){var e=new RegExp(t);return e.test(r)}function e(e,a){if(e.length!==a.length)return!1;var n=e.split("");return n.every(function(e,n){var i=a[n],c=t(i);return null===c&&i===e||r(c,e)})}function a(a,n){var c=a.split(""),u=n.split("").reduce(function(e,a,n){var u=c.shift(),s=t(a),h=r(s,u);return s&&h?i(e,n,u):(c.unshift(u),e)},n);return e(u,n)?u:null}function n(t){var r=arguments.length<=1||void 0===arguments[1]?0:arguments[1],e=r>0?t.substr(r):t,a=l.map(function(t){return t.character});return e.split("").reduce(function(t,e,n){var i=a.indexOf(e)>-1,c=r>0?n+r:n;return t>-1?t:i?c:t},-1)}function i(t,r,e){return e?t.substr(0,r)+e+t.substr(r+1):t}function c(t){var r=arguments.length<=1||void 0===arguments[1]?0:arguments[1];t.setSelectionRange(r,r)}function u(a){var i=this.mask,u=this.placeholder,s=n(i);""===a.target.value?(a.target.value=this.placeholder,c(a.target,s)):e(a.target.value,i)?c(a.target,u.length):(s=a.target.value.split("").reduce(function(e,a,n){var c=t(i[n]);return r(c,a)?n+1:u[n]===a?e:e},s),c(a.target,n(i,s)))}function s(e){var a=e.target.value,u=e.target.selectionStart,s=e.keyCode,h=String.fromCharCode(e.charCode),o=this.mask[u],f=this.mask[u+1],d=a[u],v=a[u+1],g=l.reduce(function(t,e){return e.character===o?r(e.match,h):t},!1),m=n(this.mask,u);return(m===u||null===t(f))&&(m=n(this.mask,u+1)),-1===[9,13,37,38,39,40].indexOf(s)&&e.preventDefault(),g||h===d?(e.target.value=i(a,u,h),void(m>-1&&c(e.target,m))):void(8===s?(e.target.value=i(a,u-1,this.placeholder[u-1]),c(e.target,u-1)):32===s&&f&&f===v&&c(e.target,m))}function h(t){var r=e(t.target.value,this.mask);r&&this.onMatch&&this.onMatch(t.target.value),!r&&this.onFail&&this.onFail(),r||this.clearOnFail===!1||(t.target.value="")}function o(t,r){if("string"==typeof r&&(r={mask:r}),r.placeholder||(r.placeholder=r.mask),!r.mask||"string"!=typeof r.mask)throw new Error("inputMask called with invalid mask string: "+r.mask);var e=a(t.value,r.mask);e&&(t.value=e,r.onMatch&&r.onMatch(e)),t.addEventListener("focus",u.bind(r)),t.addEventListener("keypress",s.bind(r)),t.addEventListener("blur",h.bind(r))}var l=[{character:"#",match:"[0-9]"},{character:"a",match:"[A-Za-z]"}];o.addIdentifier=function(r){if(!r||!r.character||!r.match)throw new Error("New identifier must contain a character and a match.");if(r.character.length>1)throw new Error("Identifier character must have length of 1.");if(null!==t(r.character))throw new Error("Identifier already exists for character "+r.character);l.push({character:r.character,match:r.match})},o.removeIdentifier=function(t){var r=l.filter(function(r){return r.character===t})[0],e=l.indexOf(r);if(r&&e>-1)return l.splice(e,1);throw new Error("Could not find identifier for character "+t)},window.inputMask=o}();

document.addEventListener('DOMContentLoaded', function() {
  let inputs = document.querySelectorAll('[data-mask]');
  inputs.forEach(element => mapMaskToInput(element));
});

function mapMaskToInput(input) {
  let mask = input.dataset.mask;

  if(!mask) {
    return;
  }

  inputMask(input, mask);
}