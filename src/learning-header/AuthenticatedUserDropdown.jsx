import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { getConfig } from '@edx/frontend-platform';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Dropdown } from '@openedx/paragon';
import Cookies from 'js-cookie';

import messages from './messages';

const AuthenticatedUserDropdown = ({ intl, username }) => {
  const dashboardMenuItem = (
    <Dropdown.Item href={`${getConfig().LMS_BASE_URL}/dashboard`}>
      {intl.formatMessage(messages.dashboard)}
    </Dropdown.Item>
  );

  const domain = process.env.SESSION_COOKIE_DOMAIN;

  const language = Cookies.get('openedx-language-preference', { domain }) ?? 'en';

  console.log('SESSION_COOKIE_DOMAIN', process.env.SESSION_COOKIE_DOMAIN);

  const handleChangeLanguage = (event) => {
    const newLanguage = event.target.value ?? 'en';
    Cookies.set('openedx-language-preference', newLanguage, { domain });
    window.location.reload();
  };

  return (
    <>
      <select className="language-selector" value={language} name="language" onChange={handleChangeLanguage}>
        <option value="en">EN</option>
        <option value="th">TH</option>
      </select>
      <Dropdown className="user-dropdown ml-3">
        <Dropdown.Toggle variant="outline-primary">
          <FontAwesomeIcon icon={faUserCircle} className="d-md-none" size="lg" />
          <span data-hj-suppress className="d-none d-md-inline">
            {username}
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu-right">
          {dashboardMenuItem}
          { getConfig().ORDER_HISTORY_URL && (
            <Dropdown.Item href={`${getConfig().LMS_BASE_URL}/courses`}>
              {intl.formatMessage(messages.courses)}
            </Dropdown.Item>
          )}
          <Dropdown.Item href={`${getConfig().ACCOUNT_PROFILE_URL}/u/${username}`}>
            {intl.formatMessage(messages.profile)}
          </Dropdown.Item>
          <Dropdown.Item href={getConfig().ACCOUNT_SETTINGS_URL}>
            {intl.formatMessage(messages.account)}
          </Dropdown.Item>
          <Dropdown.Item href={getConfig().LOGOUT_URL}>
            {intl.formatMessage(messages.signOut)}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

AuthenticatedUserDropdown.propTypes = {
  intl: intlShape.isRequired,
  username: PropTypes.string.isRequired,
};

export default injectIntl(AuthenticatedUserDropdown);
