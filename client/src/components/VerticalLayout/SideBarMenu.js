// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const SubMenu = ({ item }) => {
//   const [subnav, setSubnav] = useState(false);

//   const showSubnav = () => setSubnav(!subnav);

//   return (
//     <ul className="metismenu list-unstyled " id="side-menu">
//       <li>
//         <Link to={item.path} onClick={item.subNav && showSubnav}>
//           <div className={`wave-effect ${item.subNav ? 'has-arrow' : null}`}>
//             <i className={item.icon}></i>
//             <span>{item.title}</span>
//           </div>
//         </Link>
//         {subnav &&
//           item.subNav.map((item, index) => {
//             return (
//               <ul className="sub-menu">
//                 <li>
//                   <Link to={item.path} key={index} className="waves-effect">
//                     <i className={item.icon}></i>
//                     <span className="sub-menu">{item.title}</span>
//                   </Link>
//                 </li>
//               </ul>
//             );
//           })}
//       </li>
//     </ul>
//   );
// };

// export default SubMenu;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <ul className="metismenu list-unstyled " id="side-menu">
      <li>
        <Link
          to={item.main_link !== null ? item.main_link : null}
          onClick={item.SubMenuTables.length > 0 && showSubnav}
        >
          <div
            className={`wave-effect ${
              item.SubMenuTables.length > 0 ? 'has-arrow' : null
            }`}
          >
            <i className={item.main_icon}></i>
            <span>{item.main_menuname}</span>
          </div>
        </Link>
        {subnav &&
          item.SubMenuTables.map((item, index) => {
            return (
              <ul className="sub-menu">
                <li>
                  <Link to={item.sub_link} key={index} className="waves-effect">
                    <i className={item.sub_icon}></i>
                    <span className="sub-menu">{item.sub_name}</span>
                  </Link>
                </li>
              </ul>
            );
          })}
      </li>
    </ul>
  );
};

export default SubMenu;
