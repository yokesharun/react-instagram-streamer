'use strict';

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var React = require('react');
var propTypes = require('prop-types');
var Gallery = require('react-photo-gallery');
var _ = require('lodash');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var Gallery__default = /*#__PURE__*/_interopDefaultLegacy(Gallery);
var ___default = /*#__PURE__*/_interopDefaultLegacy(_);

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css = ".photo-container {\n  width: inherit;\n}\n\n.gallery {\n  display: grid;\n  grid-gap: 10px;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n}\n\n.gallery img {\n  -webkit-user-drag: none;\n  user-select: none;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n  object-fit: cover;\n}\n";
n(css,{});

var InstagramStreamer = function InstagramStreamer(props) {
  var _props$accessToken = props.accessToken,
      accessToken = _props$accessToken === void 0 ? "" : _props$accessToken,
      nos = props.nos;

  var _useState = React.useState(null),
      _useState2 = _slicedToArray__default["default"](_useState, 2),
      error = _useState2[0],
      setError = _useState2[1];

  var _useState3 = React.useState(true),
      _useState4 = _slicedToArray__default["default"](_useState3, 2),
      isLoaded = _useState4[0],
      setIsLoaded = _useState4[1];

  var _useState5 = React.useState([]),
      _useState6 = _slicedToArray__default["default"](_useState5, 2),
      items = _useState6[0],
      setItems = _useState6[1];

  var randomize = function randomize() {
    return setItems(___default["default"].shuffle(items));
  };

  React.useEffect(function () {
    if (accessToken !== "") {
      fetch("https://graph.instagram.com/me/media?fields=id,media_url&access_token=" + accessToken).then(function (res) {
        return res.json();
      }).then(function (result) {
        var image_urls = result.data.map(function (i) {
          return {
            id: i.id,
            src: i.media_url,
            width: Math.floor(Math.random() * (5 - 3 + 1)) + 3,
            height: Math.floor(Math.random() * (4 - 3 + 1)) + 3
          };
        });
        setItems(image_urls);
        setIsLoaded(true);
      }, function (error) {
        setIsLoaded(true);
        setError(error);
      });
    }
  }, []);
  React.useEffect(function () {
    var interval = setInterval(function () {
      if (isLoaded && !error) {
        randomize();
      }
    }, 10000);
    return function () {
      return clearInterval(interval);
    };
  }, [isLoaded, error, randomize]);

  if (accessToken === "") {
    return /*#__PURE__*/React__default["default"].createElement("div", null, "Error: Invalid access_token");
  } else if (error) {
    return /*#__PURE__*/React__default["default"].createElement("div", null, "Error: ", error.message);
  } else if (!isLoaded) {
    return /*#__PURE__*/React__default["default"].createElement("div", null, "Loading...");
  } else {
    var BasicRows = function BasicRows() {
      return /*#__PURE__*/React__default["default"].createElement(Gallery__default["default"], {
        photos: items.slice(0, nos)
      });
    };

    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "photo-container"
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "gallery"
    }, /*#__PURE__*/React__default["default"].createElement(BasicRows, null)));
  }
};

InstagramStreamer.propTypes = {
  accessToken: propTypes.string.isRequired,
  nos: propTypes.number
};
InstagramStreamer.defaultProps = {
  nos: 9
};

var returnLibrary = function returnLibrary() {
  return {
    InstagramStreamer: InstagramStreamer
  };
};

var index = returnLibrary();

module.exports = index;
