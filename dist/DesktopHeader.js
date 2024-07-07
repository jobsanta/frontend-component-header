function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';

// Local Components
import { Menu, MenuTrigger, MenuContent } from './Menu';
import Avatar from './Avatar';
import { LinkedLogo, Logo } from './Logo';

// i18n
import messages from './Header.messages';

// Assets
import { CaretIcon } from './Icons';
class DesktopHeader extends React.Component {
  constructor(props) {
    // eslint-disable-line no-useless-constructor
    super(props);
  }
  renderMainMenu() {
    const {
      mainMenu
    } = this.props;

    // Nodes are accepted as a prop
    if (!Array.isArray(mainMenu)) {
      return mainMenu;
    }
    return mainMenu.map(menuItem => {
      const {
        type,
        href,
        content,
        submenuContent
      } = menuItem;
      if (type === 'item') {
        return /*#__PURE__*/React.createElement("a", {
          key: `${type}-${content}`,
          className: "nav-link",
          href: href
        }, content);
      }
      return /*#__PURE__*/React.createElement(Menu, {
        key: `${type}-${content}`,
        tag: "div",
        className: "nav-item",
        respondToPointerEvents: true
      }, /*#__PURE__*/React.createElement(MenuTrigger, {
        tag: "a",
        className: "nav-link d-inline-flex align-items-center",
        href: href
      }, content, " ", /*#__PURE__*/React.createElement(CaretIcon, {
        role: "img",
        "aria-hidden": true,
        focusable: "false"
      })), /*#__PURE__*/React.createElement(MenuContent, {
        className: "pin-left pin-right shadow py-2"
      }, submenuContent));
    });
  }

  // Renders an optional App Menu for
  renderAppMenu() {
    const {
      appMenu
    } = this.props;
    const {
      content: appMenuContent,
      menuItems
    } = appMenu;
    return /*#__PURE__*/React.createElement(Menu, {
      transitionClassName: "menu-dropdown",
      transitionTimeout: 250
    }, /*#__PURE__*/React.createElement(MenuTrigger, {
      tag: "a",
      className: "nav-link d-inline-flex align-items-center"
    }, appMenuContent, " ", /*#__PURE__*/React.createElement(CaretIcon, {
      role: "img",
      "aria-hidden": true,
      focusable: "false"
    })), /*#__PURE__*/React.createElement(MenuContent, {
      className: "mb-0 dropdown-menu show dropdown-menu-right pin-right shadow py-2"
    }, menuItems.map(_ref => {
      let {
        type,
        href,
        content
      } = _ref;
      return /*#__PURE__*/React.createElement("a", {
        className: `dropdown-${type}`,
        key: `${type}-${content}`,
        href: href
      }, content);
    })));
  }
  renderUserMenu() {
    const {
      userMenu,
      avatar,
      username,
      intl
    } = this.props;
    return /*#__PURE__*/React.createElement(Menu, {
      transitionClassName: "menu-dropdown",
      transitionTimeout: 250
    }, /*#__PURE__*/React.createElement(MenuTrigger, {
      tag: "button",
      "aria-label": intl.formatMessage(messages['header.label.account.menu.for'], {
        username
      }),
      className: "btn btn-outline-primary d-inline-flex align-items-center pl-2 pr-3"
    }, /*#__PURE__*/React.createElement(Avatar, {
      size: "1.5em",
      src: avatar,
      alt: "",
      className: "mr-2"
    }), username, " ", /*#__PURE__*/React.createElement(CaretIcon, {
      role: "img",
      "aria-hidden": true,
      focusable: "false"
    })), /*#__PURE__*/React.createElement(MenuContent, {
      className: "mb-0 dropdown-menu show dropdown-menu-right pin-right shadow py-2"
    }, userMenu.map(_ref2 => {
      let {
        type,
        href,
        content
      } = _ref2;
      return /*#__PURE__*/React.createElement("a", {
        className: `dropdown-${type}`,
        key: `${type}-${content}`,
        href: href
      }, content);
    })));
  }
  renderLoggedOutItems() {
    const {
      loggedOutItems
    } = this.props;
    return loggedOutItems.map((item, i, arr) => /*#__PURE__*/React.createElement("a", {
      key: `${item.type}-${item.content}`,
      className: i < arr.length - 1 ? 'btn mr-2 btn-link' : 'btn mr-2 btn-outline-primary',
      href: item.href
    }, item.content));
  }
  render() {
    const {
      logo,
      logoAltText,
      logoDestination,
      loggedIn,
      intl,
      appMenu
    } = this.props;
    const logoProps = {
      src: logo,
      alt: logoAltText,
      href: logoDestination
    };
    const logoClasses = getConfig().AUTHN_MINIMAL_HEADER ? 'mw-100' : null;
    return /*#__PURE__*/React.createElement("header", {
      className: "site-header-desktop"
    }, /*#__PURE__*/React.createElement("a", {
      className: "nav-skip sr-only sr-only-focusable",
      href: "#main"
    }, intl.formatMessage(messages['header.label.skip.nav'])), /*#__PURE__*/React.createElement("div", {
      className: `container-fluid ${logoClasses}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "nav-container position-relative d-flex align-items-center"
    }, logoDestination === null ? /*#__PURE__*/React.createElement(Logo, {
      className: "logo",
      src: logo,
      alt: logoAltText
    }) : /*#__PURE__*/React.createElement(LinkedLogo, _extends({
      className: "logo"
    }, logoProps)), /*#__PURE__*/React.createElement("nav", {
      "aria-label": intl.formatMessage(messages['header.label.main.nav']),
      className: "nav main-nav"
    }, this.renderMainMenu()), appMenu ? /*#__PURE__*/React.createElement("nav", {
      "aria-label": intl.formatMessage(messages['header.label.app.nav']),
      className: "nav app-nav"
    }, this.renderAppMenu()) : null, /*#__PURE__*/React.createElement("nav", {
      "aria-label": intl.formatMessage(messages['header.label.secondary.nav']),
      className: "nav secondary-menu-container align-items-center ml-auto"
    }, loggedIn ? this.renderUserMenu() : this.renderLoggedOutItems()))));
  }
}
DesktopHeader.propTypes = {
  mainMenu: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
  userMenu: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf(['item', 'menu']),
    href: PropTypes.string,
    content: PropTypes.string
  })),
  loggedOutItems: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf(['item', 'menu']),
    href: PropTypes.string,
    content: PropTypes.string
  })),
  logo: PropTypes.string,
  logoAltText: PropTypes.string,
  logoDestination: PropTypes.string,
  avatar: PropTypes.string,
  username: PropTypes.string,
  loggedIn: PropTypes.bool,
  // i18n
  intl: intlShape.isRequired,
  // appMenu
  appMenu: PropTypes.shape({
    content: PropTypes.string,
    menuItems: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string,
      href: PropTypes.string,
      content: PropTypes.string
    }))
  })
};
DesktopHeader.defaultProps = {
  mainMenu: [],
  userMenu: [],
  loggedOutItems: [],
  logo: null,
  logoAltText: null,
  logoDestination: null,
  avatar: null,
  username: null,
  loggedIn: false,
  appMenu: null
};
export default injectIntl(DesktopHeader);
//# sourceMappingURL=DesktopHeader.js.map