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

  return (
    <header className="learning-header">
      <div className="header-container container-xl">
        <a className="sr-only sr-only-focusable" href="#main-content">{intl.formatMessage(messages.skipNavLink)}</a>
        {!isDesktop && <Hamburger size={40} toggled={isOpenMobileMenu} toggle={setIsOpenMobileMenu} /> }
        <div className="py-2 d-flex header-logo">
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
      { isOpenMobileMenu && (
        <div className="banner">
          <div className="banner-container">
            <h2>{fullNameTH}</h2>
            <h1>E - Learning</h1>
          </div>
        </div>
      )}

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
    </header>
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
