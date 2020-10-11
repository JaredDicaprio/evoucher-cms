import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShopIcon from '@material-ui/icons/Shop';
import { useStateValue } from '../../providers/StateProvider';
import { NAV_CHANGED } from '../../utils';

export default function Nav() {
  const [, dispatch] = useStateValue();

  const handleChange = (nav) => {
    dispatch({
      type: NAV_CHANGED,
      value: nav,
    });
  };

  return (
    <div>
      <ListItem button onClick={() => handleChange('home')}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button onClick={() => handleChange('create')}>
        <ListItemIcon>
          <ShopIcon />
        </ListItemIcon>
        <ListItemText primary="Create Evoucher" />
      </ListItem>
    </div>
  );
}
