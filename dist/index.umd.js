(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@babel/runtime/helpers/slicedToArray'), require('react'), require('prop-types'), require('lodash')) :
  typeof define === 'function' && define.amd ? define(['@babel/runtime/helpers/slicedToArray', 'react', 'prop-types', 'lodash'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global["react-instagram-streamer"] = factory(global._slicedToArray, global.React, global.propTypes, global._));
})(this, (function (_slicedToArray, React, propTypes, _) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var ___default = /*#__PURE__*/_interopDefaultLegacy(_);

  const img = require('./info.png');

  var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

  var css = "ul {\n  padding: 0;\n  margin: 0;\n}\n\nli {\n  list-style-type: none;\n}\n\n.float-fullscreen,\n.float-info {\n  position: fixed;\n  width: 50px;\n  height: 50px;\n  bottom: 40px;\n  right: 40px;\n  background-color: rgb(255, 255, 255);\n  color: #fff;\n  border-radius: 50px;\n  text-align: center;\n  box-shadow: 2px 2px 3px #999;\n  z-index: 9999;\n}\n\n.float-info {\n  bottom: 100px;\n}\n\n.float-info img,\n.float-fullscreen img {\n  height: 28px;\n  margin-top: 10px;\n}\n\n.float-info img {\n  height: 30px;\n}\n\n.photo-container {\n  width: inherit;\n}\n\n.gallery {\n  display: grid;\n  grid-gap: 10px;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n}\n\n.gallery img {\n  width: 100%;\n  -webkit-user-drag: none;\n  user-select: none;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n}\n";
  n(css,{});

  var InstagramStreamer = function InstagramStreamer(props) {
    var _props$accessToken = props.accessToken,
        accessToken = _props$accessToken === void 0 ? "" : _props$accessToken,
        _props$nos = props.nos,
        nos = _props$nos === void 0 ? 12 : _props$nos,
        _props$showOptions = props.showOptions,
        showOptions = _props$showOptions === void 0 ? false : _props$showOptions;

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
        fetch("https://graph.instagram.com/me/media?fields=media_url&access_token=" + accessToken).then(function (res) {
          return res.json();
        }).then(function (result) {
          var image_urls = result.data.map(function (i) {
            return {
              id: i.id,
              media_url: i.media_url
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
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: "photo-container"
      }, showOptions && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("a", {
        href: "https://github.com/yokesharun/react-instagram-streamer",
        className: "float-info",
        target: "_blank"
      }, /*#__PURE__*/React__default["default"].createElement("img", {
        src: img,
        alt: "info"
      }))), /*#__PURE__*/React__default["default"].createElement("div", {
        className: "gallery"
      }, items.slice(0, nos).map(function (item) {
        return /*#__PURE__*/React__default["default"].createElement("img", {
          src: item.media_url,
          alt: ""
        });
      })));
    }
  };

  InstagramStreamer.propTypes = {
    accessToken: propTypes.string,
    nos: propTypes.number,
    showOptions: propTypes.bool
  };

  var returnLibrary = function returnLibrary() {
    return {
      InstagramStreamer: InstagramStreamer
    };
  };

  var index = returnLibrary();

  return index;

}));
