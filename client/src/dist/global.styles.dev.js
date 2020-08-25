"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GlobalStyle = void 0;

var _styledComponents = require("styled-components");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\nbody {\n    font-family: 'Open Sans Condensed', sans-serif;\n    padding: 20px 60px;\n\n    @media screen and (max-width: 800px) {\n        padding: 10px;\n    }\n  }\n  \n  a {\n    text-decoration: none;\n    color: #000;\n  }\n  \n  * {\n    box-sizing: border-box;\n  }\n  \n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var GlobalStyle = (0, _styledComponents.createGlobalStyle)(_templateObject());
exports.GlobalStyle = GlobalStyle;