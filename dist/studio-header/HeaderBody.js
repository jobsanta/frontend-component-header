import React from 'react';
import PropTypes from 'prop-types';
import { ActionRow, Button, Container, Nav, Row } from '@openedx/paragon';
import { Close, MenuIcon } from '@openedx/paragon/icons';
import Cookies from 'js-cookie';
import CourseLockUp from './CourseLockUp';
import UserMenu from './UserMenu';
import BrandNav from './BrandNav';
import NavDropdownMenu from './NavDropdownMenu';
var HeaderBody = function HeaderBody(_ref) {
  var _Cookies$get;
  var logo = _ref.logo,
    logoAltText = _ref.logoAltText,
    number = _ref.number,
    org = _ref.org,
    title = _ref.title,
    username = _ref.username,
    isAdmin = _ref.isAdmin,
    studioBaseUrl = _ref.studioBaseUrl,
    logoutUrl = _ref.logoutUrl,
    authenticatedUserAvatar = _ref.authenticatedUserAvatar,
    isMobile = _ref.isMobile,
    setModalPopupTarget = _ref.setModalPopupTarget,
    toggleModalPopup = _ref.toggleModalPopup,
    isModalPopupOpen = _ref.isModalPopupOpen,
    isHiddenMainMenu = _ref.isHiddenMainMenu,
    mainMenuDropdowns = _ref.mainMenuDropdowns,
    outlineLink = _ref.outlineLink;
  var renderBrandNav = /*#__PURE__*/React.createElement(BrandNav, {
    studioBaseUrl: studioBaseUrl,
    logo: logo,
    logoAltText: logoAltText
  });
  var domain = window.location.hostname.replace('apps', '');
  var language = (_Cookies$get = Cookies.get('openedx-language-preference', {
    domain: domain
  })) !== null && _Cookies$get !== void 0 ? _Cookies$get : 'en';
  var handleChangeLanguage = function handleChangeLanguage(event) {
    var _event$target$value;
    var newLanguage = (_event$target$value = event.target.value) !== null && _event$target$value !== void 0 ? _event$target$value : 'en';
    Cookies.set('openedx-language-preference', newLanguage, {
      domain: domain
    });
    window.location.reload();
  };
  var fullNameTH = 'หอภาพยนตร์ (องค์การมหาชน)';
  var fullNameEN = 'Film Archive (Public Organization)';
  return /*#__PURE__*/React.createElement(Container, {
    size: "xl",
    className: "px-2.5"
  }, /*#__PURE__*/React.createElement(ActionRow, {
    as: "header"
  }, isHiddenMainMenu ? /*#__PURE__*/React.createElement(Row, {
    className: "logo-container flex-nowrap ml-4"
  }, renderBrandNav) : /*#__PURE__*/React.createElement(React.Fragment, null, isMobile ? /*#__PURE__*/React.createElement(Button, {
    ref: setModalPopupTarget,
    className: "d-inline-flex align-items-center",
    variant: "tertiary",
    onClick: toggleModalPopup,
    iconBefore: isModalPopupOpen ? Close : MenuIcon,
    "data-testid": "mobile-menu-button"
  }, "Menu") : /*#__PURE__*/React.createElement(Row, {
    className: "logo-container m-0 flex-nowrap"
  }, renderBrandNav, /*#__PURE__*/React.createElement("div", {
    className: "full-name-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "full-name-th"
  }, fullNameTH), /*#__PURE__*/React.createElement("div", {
    className: "full-name-en"
  }, fullNameEN)), /*#__PURE__*/React.createElement(CourseLockUp, {
    outlineLink: outlineLink,
    number: number,
    org: org,
    title: title
  })), isMobile ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ActionRow.Spacer, null), /*#__PURE__*/React.createElement("div", {
    className: "logo-container"
  }, renderBrandNav)) : /*#__PURE__*/React.createElement(Nav, {
    "data-testid": "desktop-menu",
    className: "ml-2"
  }, mainMenuDropdowns.map(function (dropdown) {
    var id = dropdown.id,
      buttonTitle = dropdown.buttonTitle,
      items = dropdown.items;
    return /*#__PURE__*/React.createElement(NavDropdownMenu, {
      key: id,
      id: id,
      buttonTitle: buttonTitle,
      items: items
    });
  }))), /*#__PURE__*/React.createElement(ActionRow.Spacer, null), /*#__PURE__*/React.createElement(Nav, null, /*#__PURE__*/React.createElement("select", {
    className: "language-selector",
    value: language,
    name: "language",
    onChange: handleChangeLanguage
  }, /*#__PURE__*/React.createElement("option", {
    value: "en"
  }, "EN"), /*#__PURE__*/React.createElement("option", {
    value: "th"
  }, "TH")), /*#__PURE__*/React.createElement(UserMenu, {
    username: username,
    studioBaseUrl: studioBaseUrl,
    logoutUrl: logoutUrl,
    authenticatedUserAvatar: authenticatedUserAvatar,
    isAdmin: isAdmin
  }))));
};
HeaderBody.propTypes = {
  studioBaseUrl: PropTypes.string.isRequired,
  logoutUrl: PropTypes.string.isRequired,
  setModalPopupTarget: PropTypes.func,
  toggleModalPopup: PropTypes.func,
  isModalPopupOpen: PropTypes.bool,
  number: PropTypes.string,
  org: PropTypes.string,
  title: PropTypes.string,
  logo: PropTypes.string,
  logoAltText: PropTypes.string,
  authenticatedUserAvatar: PropTypes.string,
  username: PropTypes.string,
  isAdmin: PropTypes.bool,
  isMobile: PropTypes.bool,
  isHiddenMainMenu: PropTypes.bool,
  mainMenuDropdowns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    buttonTitle: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      href: PropTypes.string,
      title: PropTypes.string
    }))
  })),
  outlineLink: PropTypes.string
};
HeaderBody.defaultProps = {
  setModalPopupTarget: null,
  toggleModalPopup: null,
  isModalPopupOpen: false,
  logo: null,
  logoAltText: null,
  number: '',
  org: '',
  title: '',
  authenticatedUserAvatar: null,
  username: null,
  isAdmin: false,
  isMobile: false,
  isHiddenMainMenu: false,
  mainMenuDropdowns: [],
  outlineLink: null
};
export default HeaderBody;
//# sourceMappingURL=HeaderBody.js.map