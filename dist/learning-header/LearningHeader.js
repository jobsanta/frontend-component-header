var _excluded = ["href", "src", "alt"];
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { getLoginRedirectUrl } from '@edx/frontend-platform/auth';
import { AppContext } from '@edx/frontend-platform/react';
import { Squash as Hamburger } from 'hamburger-react';
import { useMediaQuery } from 'react-responsive';
import AnonymousUserMenu from './AnonymousUserMenu';
import AuthenticatedUserDropdown from './AuthenticatedUserDropdown';
import messages from './messages';
import genericMessages from '../generic/messages';
var LinkedLogo = function LinkedLogo(_ref) {
  var href = _ref.href,
    src = _ref.src,
    alt = _ref.alt,
    attributes = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href
  }, attributes), /*#__PURE__*/React.createElement("img", {
    className: "d-block",
    src: src,
    alt: alt
  }));
};
LinkedLogo.propTypes = {
  href: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};
var LearningHeader = function LearningHeader(_ref2) {
  var courseOrg = _ref2.courseOrg,
    courseNumber = _ref2.courseNumber,
    courseTitle = _ref2.courseTitle,
    intl = _ref2.intl,
    showUserDropdown = _ref2.showUserDropdown;
  var _useContext = useContext(AppContext),
    authenticatedUser = _useContext.authenticatedUser;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isOpenMobileMenu = _useState2[0],
    setIsOpenMobileMenu = _useState2[1];
  var isDesktop = useMediaQuery({
    query: '(min-width: 992px)'
  });
  var headerLogo = /*#__PURE__*/React.createElement(LinkedLogo, {
    className: "link-logo",
    href: "".concat(getConfig().LMS_BASE_URL, "/dashboard"),
    src: getConfig().LOGO_URL,
    alt: getConfig().SITE_NAME
  });
  var fullNameTH = 'หอภาพยนตร์ (องค์การมหาชน)';
  var fullNameEN = 'Film Archive (Public Organization)';
  var isHideMenuItem = isDesktop || !isOpenMobileMenu;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("header", {
    className: "learning-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "header-container container-xl"
  }, /*#__PURE__*/React.createElement("a", {
    className: "sr-only sr-only-focusable",
    href: "#main-content"
  }, intl.formatMessage(messages.skipNavLink)), /*#__PURE__*/React.createElement("div", {
    className: "py-2 d-flex header-logo"
  }, !isDesktop && /*#__PURE__*/React.createElement(Hamburger, {
    toggled: isOpenMobileMenu,
    toggle: setIsOpenMobileMenu
  }), /*#__PURE__*/React.createElement("div", {
    className: "d-flex flex-row"
  }, headerLogo, /*#__PURE__*/React.createElement("div", {
    className: "full-name-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "full-name-th"
  }, fullNameTH), /*#__PURE__*/React.createElement("div", {
    className: "full-name-en"
  }, fullNameEN)), /*#__PURE__*/React.createElement("div", {
    className: "flex-grow-1 course-title-lockup",
    style: {
      lineHeight: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "d-block m-0 font-weight-bold course-title"
  }, courseTitle), /*#__PURE__*/React.createElement("span", {
    className: "d-block small m-0"
  }, courseOrg, " ", courseNumber))), /*#__PURE__*/React.createElement("div", {
    className: "dropdown-conotainer"
  }, showUserDropdown && authenticatedUser && /*#__PURE__*/React.createElement(AuthenticatedUserDropdown, {
    username: authenticatedUser.username
  }), showUserDropdown && !authenticatedUser && /*#__PURE__*/React.createElement(AnonymousUserMenu, null)))), /*#__PURE__*/React.createElement("div", {
    className: "banner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "banner-container"
  }, /*#__PURE__*/React.createElement("h2", null, fullNameTH), /*#__PURE__*/React.createElement("h1", null, "E - Learning"))), !isHideMenuItem && (authenticatedUser ? /*#__PURE__*/React.createElement("div", {
    className: "mobile-menu"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mobile-nav-link"
  }, /*#__PURE__*/React.createElement("a", {
    href: "".concat(getConfig().LMS_BASE_URL)
  }, intl.formatMessage(messages.dashboard))), /*#__PURE__*/React.createElement("div", {
    className: "mobile-nav-link"
  }, /*#__PURE__*/React.createElement("a", {
    href: "".concat(getConfig().LMS_BASE_URL, "/courses")
  }, intl.formatMessage(messages.courses))), /*#__PURE__*/React.createElement("div", {
    className: "mobile-nav-link"
  }, /*#__PURE__*/React.createElement("a", {
    href: "".concat(getConfig().ACCOUNT_PROFILE_URL, "/u/").concat(authenticatedUser.username)
  }, intl.formatMessage(messages.profile))), /*#__PURE__*/React.createElement("div", {
    className: "mobile-nav-link"
  }, /*#__PURE__*/React.createElement("a", {
    href: "".concat(getConfig().ACCOUNT_SETTINGS_URL)
  }, intl.formatMessage(messages.account))), /*#__PURE__*/React.createElement("div", {
    className: "mobile-nav-link"
  }, /*#__PURE__*/React.createElement("a", {
    href: "".concat(getConfig().LOGOUT_URL)
  }, intl.formatMessage(messages.signOut)))) : /*#__PURE__*/React.createElement("div", {
    className: "mobile-menu"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mobile-nav-link"
  }, /*#__PURE__*/React.createElement("a", {
    href: "".concat(getConfig().LMS_BASE_URL, "/register?next=").concat(encodeURIComponent(global.location.href))
  }, intl.formatMessage(genericMessages.registerSentenceCase))), /*#__PURE__*/React.createElement("div", {
    className: "mobile-nav-link"
  }, /*#__PURE__*/React.createElement("a", {
    href: "".concat(getLoginRedirectUrl(global.location.href))
  }, intl.formatMessage(genericMessages.signInSentenceCase)))))), /*#__PURE__*/React.createElement("div", {
    className: "alocate-space"
  }));
};
LearningHeader.propTypes = {
  courseOrg: PropTypes.string,
  courseNumber: PropTypes.string,
  courseTitle: PropTypes.string,
  intl: intlShape.isRequired,
  showUserDropdown: PropTypes.bool
};
LearningHeader.defaultProps = {
  courseOrg: null,
  courseNumber: null,
  courseTitle: null,
  showUserDropdown: true
};
export default injectIntl(LearningHeader);
//# sourceMappingURL=LearningHeader.js.map