import React from 'react';
import PropTypes from 'prop-types';
import { ActionRow, Button, Container, Nav, Row } from '@openedx/paragon';
import { Close, MenuIcon } from '@openedx/paragon/icons';
import Cookies from 'js-cookie';
import CourseLockUp from './CourseLockUp';
import UserMenu from './UserMenu';
import BrandNav from './BrandNav';
import NavDropdownMenu from './NavDropdownMenu';
const HeaderBody = _ref => {
  let {
    logo,
    logoAltText,
    number,
    org,
    title,
    username,
    isAdmin,
    studioBaseUrl,
    logoutUrl,
    authenticatedUserAvatar,
    isMobile,
    setModalPopupTarget,
    toggleModalPopup,
    isModalPopupOpen,
    isHiddenMainMenu,
    mainMenuDropdowns,
    outlineLink
  } = _ref;
  const renderBrandNav = /*#__PURE__*/React.createElement(BrandNav, {
    studioBaseUrl,
    logo,
    logoAltText
  });
  const domain = window.location.hostname.replace('apps', '');
  const language = Cookies.get('openedx-language-preference', {
    domain
  }) ?? 'en';
  const handleChangeLanguage = event => {
    const newLanguage = event.target.value ?? 'en';
    Cookies.set('openedx-language-preference', newLanguage, {
      domain
    });
    window.location.reload();
  };
  const fullNameTH = 'หอภาพยนตร์ (องค์การมหาชน)';
  const fullNameEN = 'Film Archive (Public Organization)';
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
    outlineLink,
    number,
    org,
    title
  })), isMobile ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ActionRow.Spacer, null), /*#__PURE__*/React.createElement("div", {
    className: "logo-container"
  }, renderBrandNav)) : /*#__PURE__*/React.createElement(Nav, {
    "data-testid": "desktop-menu",
    className: "ml-2"
  }, mainMenuDropdowns.map(dropdown => {
    const {
      id,
      buttonTitle,
      items
    } = dropdown;
    return /*#__PURE__*/React.createElement(NavDropdownMenu, {
      key: id,
      id,
      buttonTitle,
      items
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
    username,
    studioBaseUrl,
    logoutUrl,
    authenticatedUserAvatar,
    isAdmin
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