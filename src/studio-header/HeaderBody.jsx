import React from 'react';
import PropTypes from 'prop-types';
import {
  ActionRow,
  Button,
  Container,
  Nav,
  Row,
} from '@openedx/paragon';
import { Close, MenuIcon } from '@openedx/paragon/icons';
import Cookies from 'js-cookie';

import CourseLockUp from './CourseLockUp';
import UserMenu from './UserMenu';
import BrandNav from './BrandNav';
import NavDropdownMenu from './NavDropdownMenu';

const HeaderBody = ({
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
  outlineLink,
}) => {
  const renderBrandNav = (
    <BrandNav
      {...{
        studioBaseUrl,
        logo,
        logoAltText,
      }}
    />
  );

  const domain = window.location.hostname.replace('apps', '');

  const language = Cookies.get('openedx-language-preference', { domain }) ?? 'en';

  const handleChangeLanguage = (event) => {
    const newLanguage = event.target.value ?? 'en';
    Cookies.set('openedx-language-preference', newLanguage, { domain });
    window.location.reload();
  };

  const fullNameTH = 'หอภาพยนตร์ (องค์การมหาชน)';
  const fullNameEN = 'Film Archive (Public Organization)';

  return (
    <Container size="xl" className="px-2.5">
      <ActionRow as="header">
        {isHiddenMainMenu ? (
          <Row className="logo-container flex-nowrap ml-4">
            {renderBrandNav}
          </Row>
        ) : (
          <>
            {isMobile ? (
              <Button
                ref={setModalPopupTarget}
                className="d-inline-flex align-items-center"
                variant="tertiary"
                onClick={toggleModalPopup}
                iconBefore={isModalPopupOpen ? Close : MenuIcon}
                data-testid="mobile-menu-button"
              >
                Menu
              </Button>
            ) : (
              <Row className="logo-container m-0 flex-nowrap">
                {renderBrandNav}
                <div className="full-name-container">
                  <div className="full-name-th">{fullNameTH}</div>
                  <div className="full-name-en">{fullNameEN}</div>
                </div>
                <CourseLockUp
                  {...{
                    outlineLink,
                    number,
                    org,
                    title,
                  }}
                />
              </Row>
            )}
            {isMobile ? (
              <>
                <ActionRow.Spacer />
                <div className="logo-container">
                  {renderBrandNav}
                </div>
              </>
            ) : (
              <Nav data-testid="desktop-menu" className="ml-2">
                {mainMenuDropdowns.map(dropdown => {
                  const { id, buttonTitle, items } = dropdown;
                  return (
                    <NavDropdownMenu key={id} {...{ id, buttonTitle, items }} />
                  );
                })}
              </Nav>
            )}
          </>
        )}
        <ActionRow.Spacer />
        <Nav>
          <select className="language-selector" value={language} name="language" onChange={handleChangeLanguage}>
            <option value="en">EN</option>
            <option value="th">TH</option>
          </select>
          <UserMenu
            {...{
              username,
              studioBaseUrl,
              logoutUrl,
              authenticatedUserAvatar,
              isAdmin,
            }}
          />
        </Nav>
      </ActionRow>
    </Container>
  );
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
      title: PropTypes.string,
    })),
  })),
  outlineLink: PropTypes.string,
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
  outlineLink: null,
};

export default HeaderBody;
