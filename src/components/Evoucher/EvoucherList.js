import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Drawer from '@material-ui/core/Drawer';

import EvoucherForm from './EvoucherForm';
import { getToken } from '../../utils';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function EvoucherList() {
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [evouchers, setEvouchers] = useState([]);

  const classes = useStyles();
  useEffect(() => {
    let unmounted = false;

    async function fetchEvouchers() {
      try {
        const token = getToken();

        const res = await fetch(
          `${process.env.REACT_APP_SERVER_BASE_URL}/evouchers`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );
        const resJson = await res.json();

        if (!unmounted && resJson) {
          setEvouchers(resJson);
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchEvouchers();

    return () => {
      unmounted = true;
    };
  }, []);

  const handleChange = async (id) => {
    try {
      const token = getToken();

      const newEvouchers = [...evouchers];
      const evIndex = newEvouchers.findIndex(({ id: evId }) => evId === id);

      if (evIndex !== -1) {
        const newStatus = !newEvouchers[evIndex].isActive;

        await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/evouchers`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            data: {
              id,
              isActive: newStatus,
            },
          }),
        });

        newEvouchers[evIndex].isActive = newStatus;
      }

      setEvouchers(newEvouchers);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Evoucher</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {evouchers.map((evoucher) => {
              const { id, title, isActive } = evoucher;
              return (
                <TableRow key={title}>
                  <TableCell component="th" scope="row">
                    <div
                      onClick={() => {
                        const ev = { ...evoucher };

                        const paymentMethod = JSON.parse(ev.paymentMethod);

                        paymentMethod.forEach(({ name, discount }) => {
                          ev[`${name}`.toLowerCase()] = discount;
                        });

                        const expiryDate = new Date(ev.expiryDate);
                        const day = expiryDate.getDate().toString();

                        ev.expiryDate = `${expiryDate.getFullYear()}-${expiryDate.getMonth()}-${
                          day.length < 2 ? `0${day}` : day
                        }`;

                        delete ev.paymentMethod;
                        console.log('ev: ', ev);

                        setSelected(ev);
                        setOpen(true);
                      }}
                      style={{
                        cursor: 'pointer',
                      }}
                    >
                      {title}
                    </div>
                  </TableCell>
                  <TableCell align="right">
                    <FormControlLabel
                      control={
                        <Switch
                          checked={isActive}
                          onChange={() => handleChange(id)}
                          name="gilad"
                        />
                      }
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Drawer open={open} anchor="right">
        {selected && open && (
          <EvoucherForm
            mode="edit"
            initialData={selected}
            callBack={() => setOpen(false)}
          />
        )}
      </Drawer>
    </>
  );
}
