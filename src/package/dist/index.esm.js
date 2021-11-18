import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import React, { useState, useEffect } from 'react';
import { string } from 'prop-types';
import { CSSGrid, layout } from 'react-stonecutter';
import _ from 'lodash';
import { useFullScreenHandle, FullScreen } from 'react-full-screen';

const img$1 = require('./full-screen.png');

const img = require('./info.png');

var InstagramStreamer = function InstagramStreamer(props) {
  var _props$accessToken = props.accessToken,
      accessToken = _props$accessToken === void 0 ? '' : _props$accessToken;

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      error = _useState2[0],
      setError = _useState2[1];

  var _useState3 = useState(true),
      _useState4 = _slicedToArray(_useState3, 2),
      isLoaded = _useState4[0],
      setIsLoaded = _useState4[1];

  var _useState5 = useState([]),
      _useState6 = _slicedToArray(_useState5, 2),
      items = _useState6[0],
      setItems = _useState6[1];

  var randomize = function randomize() {
    return setItems(_.shuffle(items));
  };

  var handle = useFullScreenHandle();
  useEffect(function () {
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
  useEffect(function () {
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
    return /*#__PURE__*/React.createElement("div", null, "Error: Invalid access_token");
  } else if (error) {
    return /*#__PURE__*/React.createElement("div", null, "Error: ", error.message);
  } else if (!isLoaded) {
    return /*#__PURE__*/React.createElement("div", null, "Loading...");
  } else {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("a", {
      href: "#",
      className: "float-fullscreen",
      onClick: handle.enter
    }, /*#__PURE__*/React.createElement("img", {
      src: img$1,
      alt: "fullscreen"
    })), /*#__PURE__*/React.createElement("a", {
      href: "#",
      className: "float-info",
      target: "_blank"
    }, /*#__PURE__*/React.createElement("img", {
      src: img,
      alt: "info"
    })), /*#__PURE__*/React.createElement(FullScreen, {
      handle: handle
    }, /*#__PURE__*/React.createElement(CSSGrid, {
      component: "ul",
      columns: 5,
      columnWidth: 150,
      gutterWidth: 130,
      gutterHeight: 40,
      layout: layout.pinterest,
      duration: 3000,
      easing: "ease-out"
    }, items.map(function (item) {
      return /*#__PURE__*/React.createElement("li", {
        key: item.id,
        itemHeight: 250
      }, /*#__PURE__*/React.createElement("img", {
        src: item.media_url,
        alt: "",
        height: "320"
      }));
    }))));
  }
};

InstagramStreamer.propTypes = {
  accessToken: string
};

var returnLibrary = function returnLibrary() {
  return {
    InstagramStreamer: InstagramStreamer
  };
};

var index = returnLibrary();

export { index as default };
