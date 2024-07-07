const _excluded = ["href", "src", "alt"];
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
import Cookies from 'js-cookie';
import fapotImage from '../images/fapot_Header_1_0.png';
import AnonymousUserMenu from './AnonymousUserMenu';
import AuthenticatedUserDropdown from './AuthenticatedUserDropdown';
import messages from './messages';
import genericMessages from '../generic/messages';
const LinkedLogo = _ref => {
  let {
      href,
      src,
      alt
    } = _ref,
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
const LearningHeader = _ref2 => {
  let {
    courseOrg,
    courseNumber,
    courseTitle,
    intl,
    showUserDropdown
  } = _ref2;
  const {
    authenticatedUser
  } = useContext(AppContext);
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const isDesktop = useMediaQuery({
    query: '(min-width: 992px)'
  });
  const headerLogo = /*#__PURE__*/React.createElement(LinkedLogo, {
    className: "link-logo",
    href: `${getConfig().LMS_BASE_URL}/dashboard`,
    src: getConfig().LOGO_URL,
    alt: getConfig().SITE_NAME
  });
  const fullNameTH = 'หอภาพยนตร์ (องค์การมหาชน)';
  const fullNameEN = 'Film Archive (Public Organization)';
  const isHideMenuItem = isDesktop || !isOpenMobileMenu;
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
  document.addEventListener('click', event => {
    if (!event.target.classList.contains('hamburger-react') && !(event.target.parentElement && event.target.parentElement.classList.contains('hamburger-react')) && !(event.target.parentElement?.parentElement && event.target.parentElement.parentElement.classList.contains('hamburger-react')) && isOpenMobileMenu) {
      setIsOpenMobileMenu(false);
    }
  });
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
  }, /*#__PURE__*/React.createElement("select", {
    className: "language-selector",
    value: language,
    name: "language",
    onChange: handleChangeLanguage
  }, /*#__PURE__*/React.createElement("option", {
    value: "en"
  }, "EN"), /*#__PURE__*/React.createElement("option", {
    value: "th"
  }, "TH")), showUserDropdown && authenticatedUser && /*#__PURE__*/React.createElement(AuthenticatedUserDropdown, {
    username: authenticatedUser.username
  }), showUserDropdown && !authenticatedUser && /*#__PURE__*/React.createElement(AnonymousUserMenu, null)))), /*#__PURE__*/React.createElement("div", {
    className: "banner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "banner-container"
  }, /*#__PURE__*/React.createElement("img", {
    src: fapotImage,
    alt: fullNameTH
  }))), !isHideMenuItem && (authenticatedUser ? /*#__PURE__*/React.createElement("div", {
    className: "mobile-menu"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mobile-nav-link"
  }, /*#__PURE__*/React.createElement("a", {
    href: `${getConfig().LMS_BASE_URL}`
  }, intl.formatMessage(messages.dashboard))), /*#__PURE__*/React.createElement("div", {
    className: "mobile-nav-link"
  }, /*#__PURE__*/React.createElement("a", {
    href: `${getConfig().LMS_BASE_URL}/courses`
  }, intl.formatMessage(messages.courses))), /*#__PURE__*/React.createElement("div", {
    className: "mobile-nav-link"
  }, /*#__PURE__*/React.createElement("a", {
    href: `${getConfig().ACCOUNT_PROFILE_URL}/u/${authenticatedUser.username}`
  }, intl.formatMessage(messages.profile))), /*#__PURE__*/React.createElement("div", {
    className: "mobile-nav-link"
  }, /*#__PURE__*/React.createElement("a", {
    href: `${getConfig().ACCOUNT_SETTINGS_URL}`
  }, intl.formatMessage(messages.account))), /*#__PURE__*/React.createElement("div", {
    className: "mobile-nav-link"
  }, /*#__PURE__*/React.createElement("a", {
    href: `${getConfig().LOGOUT_URL}`
  }, intl.formatMessage(messages.signOut)))) : /*#__PURE__*/React.createElement("div", {
    className: "mobile-menu"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mobile-nav-link"
  }, /*#__PURE__*/React.createElement("a", {
    href: `${getConfig().LMS_BASE_URL}/register?next=${encodeURIComponent(global.location.href)}`
  }, intl.formatMessage(genericMessages.registerSentenceCase))), /*#__PURE__*/React.createElement("div", {
    className: "mobile-nav-link"
  }, /*#__PURE__*/React.createElement("a", {
    href: `${getLoginRedirectUrl(global.location.href)}`
  }, intl.formatMessage(genericMessages.signInSentenceCase)))))), /*#__PURE__*/React.createElement("div", {
    className: "allocate-space"
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