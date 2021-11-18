(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@babel/runtime/helpers/slicedToArray'), require('react'), require('prop-types'), require('react-stonecutter'), require('lodash'), require('react-full-screen')) :
  typeof define === 'function' && define.amd ? define(['@babel/runtime/helpers/slicedToArray', 'react', 'prop-types', 'react-stonecutter', 'lodash', 'react-full-screen'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global["react-instagram-streamer"] = factory(global._slicedToArray, global.React, global.propTypes, global.reactStonecutter, global._, global.reactFullScreen));
})(this, (function (_slicedToArray, React, propTypes, reactStonecutter, _, reactFullScreen) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var ___default = /*#__PURE__*/_interopDefaultLegacy(_);

  const img$1 = require('./full-screen.png');

  const img = require('./info.png');

  var InstagramStreamer = function InstagramStreamer(props) {
    var _props$accessToken = props.accessToken,
        accessToken = _props$accessToken === void 0 ? '' : _props$accessToken;

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

    var handle = reactFullScreen.useFullScreenHandle();
    React.useEffect(function () {
      if (accessToken !== '') {
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

    if (accessToken === '') {
      return /*#__PURE__*/React__default["default"].createElement("div", null, "Error: Invalid access_token");
    } else if (error) {
      return /*#__PURE__*/React__default["default"].createElement("div", null, "Error: ", error.message);
    } else if (!isLoaded) {
      return /*#__PURE__*/React__default["default"].createElement("div", null, "Loading...");
    } else {
      return /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement("a", {
        href: "#",
        className: "float-fullscreen",
        onClick: handle.enter
      }, /*#__PURE__*/React__default["default"].createElement("img", {
        src: img$1,
        alt: "fullscreen"
      })), /*#__PURE__*/React__default["default"].createElement("a", {
        href: "#",
        className: "float-info",
        target: "_blank"
      }, /*#__PURE__*/React__default["default"].createElement("img", {
        src: img,
        alt: "info"
      })), /*#__PURE__*/React__default["default"].createElement(reactFullScreen.FullScreen, {
        handle: handle
      }, /*#__PURE__*/React__default["default"].createElement(reactStonecutter.CSSGrid, {
        component: "ul",
        columns: 5,
        columnWidth: 150,
        gutterWidth: 130,
        gutterHeight: 40,
        layout: reactStonecutter.layout.pinterest,
        duration: 3000,
        easing: "ease-out"
      }, items.map(function (item) {
        return /*#__PURE__*/React__default["default"].createElement("li", {
          key: item.id,
          itemHeight: 250
        }, /*#__PURE__*/React__default["default"].createElement("img", {
          src: item.media_url,
          alt: "",
          height: "320"
        }));
      }))));
    }
  };

  InstagramStreamer.propTypes = {
    accessToken: propTypes.string
  };

  var returnLibrary = function returnLibrary() {
    return {
      InstagramStreamer: InstagramStreamer
    };
  };

  var index = returnLibrary();

  return index;

}));
