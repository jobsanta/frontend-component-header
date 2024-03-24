import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { getLoginRedirectUrl } from '@edx/frontend-platform/auth';
import { AppContext } from '@edx/frontend-platform/react';
import { Squash as Hamburger } from 'hamburger-react';
import { useMediaQuery } from 'react-responsive';
import Cookies from 'js-cookie';

import AnonymousUserMenu from './AnonymousUserMenu';
import AuthenticatedUserDropdown from './AuthenticatedUserDropdown';
import messages from './messages';
import genericMessages from '../generic/messages';

const LinkedLogo = ({
  href,
  src,
  alt,
  ...attributes
}) => (
  <a href={href} {...attributes}>
    <img className="d-block" src={src} alt={alt} />
  </a>
);

LinkedLogo.propTypes = {
  href: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

const LearningHeader = ({
  courseOrg, courseNumber, courseTitle, intl, showUserDropdown,
}) => {
  const { authenticatedUser } = useContext(AppContext);
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const isDesktop = useMediaQuery({ query: '(min-width: 992px)' });

  const headerLogo = (
    <LinkedLogo
      className="link-logo"
      href={`${getConfig().LMS_BASE_URL}/dashboard`}
      src={getConfig().LOGO_URL}
      alt={getConfig().SITE_NAME}
    />
  );

  const fullNameTH = 'หอภาพยนตร์ (องค์การมหาชน)';
  const fullNameEN = 'Film Archive (Public Organization)';
  const isHideMenuItem = isDesktop || !isOpenMobileMenu;

  const domain = window.location.hostname.replace('apps', '');

  const language = Cookies.get('openedx-language-preference', { domain }) ?? 'en';

  document.addEventListener('click', (event) => {
    if (
      !event.target.classList.contains('hamburger-react')
      && !(
        event.target.parentElement
        && event.target.parentElement.classList.contains('hamburger-react')
      )
      && isOpenMobileMenu
    ) {
      setIsOpenMobileMenu(false);
    }
  });

  return (
    <>
      <header className="learning-header">
        <div className="header-container container-xl">
          <a className="sr-only sr-only-focusable" href="#main-content">{intl.formatMessage(messages.skipNavLink)}</a>
          <div className="py-2 d-flex header-logo">
            {!isDesktop && <Hamburger toggled={isOpenMobileMenu} toggle={setIsOpenMobileMenu} /> }
            <div className="d-flex flex-row">
              {headerLogo}
              <div className="full-name-container">
                <div className="full-name-th">{fullNameTH}</div>
                <div className="full-name-en">{fullNameEN}</div>
              </div>
              <div className="flex-grow-1 course-title-lockup" style={{ lineHeight: 1 }}>
                <span className="d-block m-0 font-weight-bold course-title">{courseTitle}</span>
                <span className="d-block small m-0">{courseOrg} {courseNumber}</span>
              </div>
            </div>
            <div className="dropdown-conotainer">
              <select className="language-selector" value={language} name="language" onChange={handleChangeLanguage}>
                <option value="en">EN</option>
                <option value="th">TH</option>
              </select>
              {showUserDropdown && authenticatedUser && (
              <AuthenticatedUserDropdown
                username={authenticatedUser.username}
              />
              )}
              {showUserDropdown && !authenticatedUser && (
              <AnonymousUserMenu />
              )}
            </div>
          </div>
        </div>

        <div className="banner">
          <div className="banner-container">
            <h2>{fullNameTH}</h2>
            <h1>E - Learning</h1>
          </div>
        </div>

        {!isHideMenuItem && (
          authenticatedUser ? (
            <div className="mobile-menu">
              <div className="mobile-nav-link">
                <a href={`${getConfig().LMS_BASE_URL}`}>
                  {intl.formatMessage(messages.dashboard)}
                </a>
              </div>
              <div className="mobile-nav-link">
                <a href={`${getConfig().LMS_BASE_URL}/courses`}>
                  {intl.formatMessage(messages.courses)}
                </a>
              </div>
              <div className="mobile-nav-link">
                <a href={`${getConfig().ACCOUNT_PROFILE_URL}/u/${authenticatedUser.username}`}>
                  {intl.formatMessage(messages.profile)}
                </a>
              </div>
              <div className="mobile-nav-link">
                <a href={`${getConfig().ACCOUNT_SETTINGS_URL}`}>
                  {intl.formatMessage(messages.account)}
                </a>
              </div>
              <div className="mobile-nav-link">
                <a href={`${getConfig().LOGOUT_URL}`}>
                  {intl.formatMessage(messages.signOut)}
                </a>
              </div>
            </div>
          ) : (
            <div className="mobile-menu">
              <div className="mobile-nav-link">
                <a href={`${getConfig().LMS_BASE_URL}/register?next=${encodeURIComponent(global.location.href)}`}>
                  {intl.formatMessage(genericMessages.registerSentenceCase)}
                </a>
              </div>
              <div className="mobile-nav-link">
                <a href={`${getLoginRedirectUrl(global.location.href)}`}>
                  {intl.formatMessage(genericMessages.signInSentenceCase)}
                </a>
              </div>
            </div>
          )
        )}
      </header>
      <div className="alocate-space" />
    </>
  );
};

LearningHeader.propTypes = {
  courseOrg: PropTypes.string,
  courseNumber: PropTypes.string,
  courseTitle: PropTypes.string,
  intl: intlShape.isRequired,
  showUserDropdown: PropTypes.bool,
};

LearningHeader.defaultProps = {
  courseOrg: null,
  courseNumber: null,
  courseTitle: null,
  showUserDropdown: true,
};

export default injectIntl(LearningHeader);
