const _excluded = ["tag", "className"],
  _excluded2 = ["tag", "className"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
const MenuTrigger = _ref => {
  let {
      tag,
      className
    } = _ref,
    attributes = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement(tag, _objectSpread({
    className: `menu-trigger ${className}`
  }, attributes));
};
MenuTrigger.propTypes = {
  tag: PropTypes.string,
  className: PropTypes.string
};
MenuTrigger.defaultProps = {
  tag: 'div',
  className: null
};
const MenuTriggerComp = /*#__PURE__*/React.createElement(MenuTrigger, null);
const MenuTriggerType = MenuTriggerComp.type;
const MenuContent = _ref2 => {
  let {
      tag,
      className
    } = _ref2,
    attributes = _objectWithoutProperties(_ref2, _excluded2);
  return /*#__PURE__*/React.createElement(tag, _objectSpread({
    className: ['menu-content', className].join(' ')
  }, attributes));
};
MenuContent.propTypes = {
  tag: PropTypes.string,
  className: PropTypes.string
};
MenuContent.defaultProps = {
  tag: 'div',
  className: null
};
const menuPropTypes = {
  tag: PropTypes.string,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  closeOnDocumentClick: PropTypes.bool,
  respondToPointerEvents: PropTypes.bool,
  className: PropTypes.string,
  transitionTimeout: PropTypes.number,
  transitionClassName: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node).isRequired
};
class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.menu = /*#__PURE__*/React.createRef();
    this.state = {
      expanded: false
    };
    this.onTriggerClick = this.onTriggerClick.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onDocumentClick = this.onDocumentClick.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  // Lifecycle Events
  componentWillUnmount() {
    document.removeEventListener('touchend', this.onDocumentClick, true);
    document.removeEventListener('click', this.onDocumentClick, true);

    // Call onClose callback when unmounting and open
    if (this.state.expanded && this.props.onClose) {
      this.props.onClose();
    }
  }

  // Event handlers
  onDocumentClick(e) {
    if (!this.props.closeOnDocumentClick) {
      return;
    }
    const clickIsInMenu = this.menu.current === e.target || this.menu.current.contains(e.target);
    if (clickIsInMenu) {
      return;
    }
    this.close();
  }
  onTriggerClick(e) {
    // Let the browser follow the link of the trigger if the menu
    // is already expanded and the trigger has an href attribute
    if (this.state.expanded && e.target.getAttribute('href')) {
      return;
    }
    e.preventDefault();
    this.toggle();
  }
  onCloseClick() {
    this.getFocusableElements()[0].focus();
    this.close();
  }
  onKeyDown(e) {
    if (!this.state.expanded) {
      return;
    }
    switch (e.key) {
      case 'Escape':
        {
          e.preventDefault();
          e.stopPropagation();
          this.getFocusableElements()[0].focus();
          this.close();
          break;
        }
      case 'Enter':
        {
          // Using focusable elements instead of a ref to the trigger
          // because Hyperlink and Button can handle refs as functional components
          if (document.activeElement === this.getFocusableElements()[0]) {
            e.preventDefault();
            this.toggle();
          }
          break;
        }
      case 'Tab':
        {
          e.preventDefault();
          if (e.shiftKey) {
            this.focusPrevious();
          } else {
            this.focusNext();
          }
          break;
        }
      case 'ArrowDown':
        {
          e.preventDefault();
          this.focusNext();
          break;
        }
      case 'ArrowUp':
        {
          e.preventDefault();
          this.focusPrevious();
          break;
        }
      default:
    }
  }
  onMouseEnter() {
    if (!this.props.respondToPointerEvents) {
      return;
    }
    this.open();
  }
  onMouseLeave() {
    if (!this.props.respondToPointerEvents) {
      return;
    }
    this.close();
  }

  // Internal functions

  getFocusableElements() {
    return this.menu.current.querySelectorAll('button:not([disabled]), [href]:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])');
  }
  getAttributesFromProps() {
    // Any extra props are attributes for the menu
    const attributes = {};
    Object.keys(this.props).filter(property => menuPropTypes[property] === undefined).forEach(property => {
      attributes[property] = this.props[property];
    });
    return attributes;
  }
  focusNext() {
    const focusableElements = Array.from(this.getFocusableElements());
    const activeIndex = focusableElements.indexOf(document.activeElement);
    const nextIndex = (activeIndex + 1) % focusableElements.length;
    focusableElements[nextIndex].focus();
  }
  focusPrevious() {
    const focusableElements = Array.from(this.getFocusableElements());
    const activeIndex = focusableElements.indexOf(document.activeElement);
    const previousIndex = (activeIndex || focusableElements.length) - 1;
    focusableElements[previousIndex].focus();
  }
  open() {
    if (this.props.onOpen) {
      this.props.onOpen();
    }
    this.setState({
      expanded: true
    });
    // Listen to touchend and click events to ensure the menu
    // can be closed on mobile, pointer, and mixed input devices
    document.addEventListener('touchend', this.onDocumentClick, true);
    document.addEventListener('click', this.onDocumentClick, true);
  }
  close() {
    if (this.props.onClose) {
      this.props.onClose();
    }
    this.setState({
      expanded: false
    });
    document.removeEventListener('touchend', this.onDocumentClick, true);
    document.removeEventListener('click', this.onDocumentClick, true);
  }
  toggle() {
    if (this.state.expanded) {
      this.close();
    } else {
      this.open();
    }
  }
  renderTrigger(node) {
    return /*#__PURE__*/React.cloneElement(node, {
      onClick: this.onTriggerClick,
      'aria-haspopup': 'menu',
      'aria-expanded': this.state.expanded
    });
  }
  renderMenuContent(node) {
    return /*#__PURE__*/React.createElement(CSSTransition, {
      in: this.state.expanded,
      timeout: this.props.transitionTimeout,
      classNames: this.props.transitionClassName,
      unmountOnExit: true
    }, node);
  }
  render() {
    const {
      className
    } = this.props;
    const wrappedChildren = React.Children.map(this.props.children, child => {
      if (child.type === MenuTriggerType) {
        return this.renderTrigger(child);
      }
      return this.renderMenuContent(child);
    });
    const rootClassName = this.state.expanded ? 'menu expanded' : 'menu';
    return /*#__PURE__*/React.createElement(this.props.tag, _objectSpread({
      className: `${rootClassName} ${className}`,
      ref: this.menu,
      onKeyDown: this.onKeyDown,
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave
    }, this.getAttributesFromProps()), wrappedChildren);
  }
}
Menu.propTypes = menuPropTypes;
Menu.defaultProps = {
  tag: 'div',
  className: null,
  onClose: null,
  onOpen: null,
  respondToPointerEvents: false,
  closeOnDocumentClick: true,
  transitionTimeout: 250,
  transitionClassName: 'menu-content'
};
export { Menu, MenuTrigger, MenuContent };
//# sourceMappingURL=Menu.js.map