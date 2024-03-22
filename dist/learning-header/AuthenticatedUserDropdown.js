import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { getConfig } from '@edx/frontend-platform';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Dropdown } from '@openedx/paragon';
import Cookies from 'js-cookie';
import messages from './messages';
var AuthenticatedUserDropdown = function AuthenticatedUserDropdown(_ref) {
  var _Cookies$get;
  var intl = _ref.intl,
    username = _ref.username;
  var dashboardMenuItem = /*#__PURE__*/React.createElement(Dropdown.Item, {
    href: "".concat(getConfig().LMS_BASE_URL, "/dashboard")
  }, intl.formatMessage(messages.dashboard));
  var language = (_Cookies$get = Cookies.get('openedx-language-preference', {
    domain: process.env.SESSION_COOKIE_DOMAIN
  })) !== null && _Cookies$get !== void 0 ? _Cookies$get : 'en';
  var handleChangeLanguage = function handleChangeLanguage(event) {
    var _event$target$value;
    var newLanguage = (_event$target$value = event.target.value) !== null && _event$target$value !== void 0 ? _event$target$value : 'en';
    Cookies.set(newLanguage, {
      domain: process.env.SESSION_COOKIE_DOMAIN
    });
    window.location.reload();
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("select", {
    className: "language-selector",
    value: language,
    name: "language",
    onChange: handleChangeLanguage
  }, /*#__PURE__*/React.createElement("option", {
    value: "en"
  }, "EN"), /*#__PURE__*/React.createElement("option", {
    value: "th"
  }, "TH")), /*#__PURE__*/React.createElement(Dropdown, {
    className: "user-dropdown ml-3"
  }, /*#__PURE__*/React.createElement(Dropdown.Toggle, {
    variant: "outline-primary"
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: faUserCircle,
    className: "d-md-none",
    size: "lg"
  }), /*#__PURE__*/React.createElement("span", {
    "data-hj-suppress": true,
    className: "d-none d-md-inline"
  }, username)), /*#__PURE__*/React.createElement(Dropdown.Menu, {
    className: "dropdown-menu-right"
  }, dashboardMenuItem, getConfig().ORDER_HISTORY_URL && /*#__PURE__*/React.createElement(Dropdown.Item, {
    href: "".concat(getConfig().LMS_BASE_URL, "/courses")
  }, intl.formatMessage(messages.courses)), /*#__PURE__*/React.createElement(Dropdown.Item, {
    href: "".concat(getConfig().ACCOUNT_PROFILE_URL, "/u/").concat(username)
  }, intl.formatMessage(messages.profile)), /*#__PURE__*/React.createElement(Dropdown.Item, {
    href: getConfig().ACCOUNT_SETTINGS_URL
  }, intl.formatMessage(messages.account)), /*#__PURE__*/React.createElement(Dropdown.Item, {
    href: getConfig().LOGOUT_URL
  }, intl.formatMessage(messages.signOut)))));
};
AuthenticatedUserDropdown.propTypes = {
  intl: intlShape.isRequired,
  username: PropTypes.string.isRequired
};
export default injectIntl(AuthenticatedUserDropdown);
//# sourceMappingURL=AuthenticatedUserDropdown.js.map