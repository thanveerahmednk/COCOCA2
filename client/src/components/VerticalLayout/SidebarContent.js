import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { sidebarItem } from './SideBardata';
import SubMenu from './SideBarMenu';

// //Import Scrollbar
import SimpleBar from 'simplebar-react';

// MetisMenu
import MetisMenu from 'metismenujs';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

//i18n
import { withTranslation } from 'react-i18next';
import { DropdownMenu } from 'reactstrap';
import { getMenusOptions } from '../../store/menu/actions';

const SidebarContent = (props) => {
  const ref = useRef();
  const dispatch = useDispatch();
  const menuOptions = useSelector((state) => state.Menus.menuOptions);

  useEffect(() => {
    dispatch(getMenusOptions());
  }, [dispatch]);

  return (
    <React.Fragment>
      <SimpleBar
        style={{ maxHeight: '100%' }}
        ref={ref}
        className="sidebar-menu-scroll"
      >
        <div id="sidebar-menu">
          {menuOptions &&
            menuOptions.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));
