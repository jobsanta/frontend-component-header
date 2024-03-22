import React, { useContext } from 'react';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import { APP_CONFIG_INITIALIZED, ensureConfig, mergeConfig, subscribe } from '@edx/frontend-platform';
import LearningHeader from './learning-header/LearningHeader';
import messages from './Header.messages';
ensureConfig(['LMS_BASE_URL', 'LOGOUT_URL', 'LOGIN_URL', 'SITE_NAME', 'LOGO_URL', 'ORDER_HISTORY_URL'], 'Header component');
subscribe(APP_CONFIG_INITIALIZED, function () {
  mergeConfig({
    AUTHN_MINIMAL_HEADER: !!process.env.AUTHN_MINIMAL_HEADER
  }, 'Header additional config');
});
var Header = function Header(_ref) {
  var intl = _ref.intl;
  var _useContext = useContext(AppContext),
    authenticatedUser = _useContext.authenticatedUser,
    config = _useContext.config;
  var orderHistoryItem = {
    type: 'item',
    href: config.ORDER_HISTORY_URL,
    content: intl.formatMessage(messages['header.user.menu.order.history'])
  };
  var userMenu = authenticatedUser === null ? [] : [{
    type: 'item',
    href: "".concat(config.LMS_BASE_URL, "/dashboard"),
    content: intl.formatMessage(messages['header.user.menu.dashboard'])
  }, {
    type: 'item',
    href: "".concat(config.ACCOUNT_PROFILE_URL, "/u/").concat(authenticatedUser.username),
    content: intl.formatMessage(messages['header.user.menu.profile'])
  }, {
    type: 'item',
    href: config.ACCOUNT_SETTINGS_URL,
    content: intl.formatMessage(messages['header.user.menu.account.settings'])
  }, {
    type: 'item',
    href: config.LOGOUT_URL,
    content: intl.formatMessage(messages['header.user.menu.logout'])
  }];

  // Users should only see Order History if have a ORDER_HISTORY_URL define in the environment.
  if (config.ORDER_HISTORY_URL) {
    userMenu.splice(-1, 0, orderHistoryItem);
  }
  return /*#__PURE__*/React.createElement(LearningHeader, null);
};
Header.propTypes = {
  intl: intlShape.isRequired
};
export default injectIntl(Header);
//# sourceMappingURL=Header.js.map