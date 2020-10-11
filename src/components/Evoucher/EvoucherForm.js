import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { Formik } from 'formik';
import { getToken } from '../../utils';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const paymentMethods = [
  {
    name: 'VISA',
    discount: 0.1, // 10%
  },
  {
    name: 'JCB',
    discount: 0.05, // 5%
  },
  {
    name: 'MasterCard',
    discount: 0.2, // 20%
  },
  {
    name: 'PayPal',
    discount: 0.15, // 15%
  },
];

export default function EvoucherForm({
  mode = 'create',
  initialData = {},
  callBack = () => {},
}) {
  const classes = useStyles();

  const initialValues = {
    title: '',
    description: '',
    expiryDate: '2020-12-31',
    amount: 0,
    quantity: 0,
    buyLimit: 10,
    giftLimit: 10,
    visa: 0,
    mastercard: 0,
    jcb: 0,
    paypal: 0,
    ...initialData,
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          {mode === 'edit' && (
            <Button onClick={callBack}>
              <CloseIcon />
            </Button>
          )}
          <Typography component="h1" variant="h4" align="center">
            {mode === 'create' ? 'Create' : 'Edit'} Evoucher
          </Typography>
          <br />
          <br />
          <Formik
            initialValues={initialValues}
            onSubmit={async (data, { setSubmitting, resetForm }) => {
              const paymentMethod = [
                {
                  name: 'VISA',
                  discount: data.visa,
                },
                {
                  name: 'JCB',
                  discount: data.jcb,
                },
                {
                  name: 'MasterCard',
                  discount: data.mastercard,
                },
                {
                  name: 'PayPal',
                  discount: data.paymentMethod,
                },
              ];
              const payload = {
                ...data,
                paymentMethod: JSON.stringify(paymentMethod),
              };

              if (mode === 'edit') {
                payload.id = initialData.id;
              }

              delete payload.visa;
              delete payload.mastercard;
              delete payload.jcb;
              delete payload.paypal;

              setSubmitting(true);

              try {
                const token = getToken();

                await fetch(
                  `${process.env.REACT_APP_SERVER_BASE_URL}/evouchers`,
                  {
                    method: mode === 'create' ? 'POST' : 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ data: payload }),
                  },
                );

                setSubmitting(false);
                if (mode === 'create') {
                  resetForm();
                } else if (mode === 'edit') {
                  callBack();
                }
              } catch (err) {
                console.error(err);
                setSubmitting(false);
              }
            }}
          >
            {({
              values,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="title"
                      name="title"
                      label="Title"
                      fullWidth
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="description"
                      name="description"
                      label="Description"
                      fullWidth
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="expiryDate"
                      name="expiryDate"
                      label="Expiry Date"
                      type="date"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      value={values.expiryDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="amount"
                      name="amount"
                      label="Amount"
                      fullWidth
                      value={values.amount}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      inputMode="numeric"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <h3>Discounts Per Payment</h3>
                  </Grid>
                  {paymentMethods.length > 0 &&
                    paymentMethods.map(({ name }) => {
                      const pm = `${name}`.toLowerCase();
                      return (
                        <Grid item xs={12} sm={6} key={pm}>
                          <TextField
                            // required
                            id={pm}
                            name={pm}
                            label={name}
                            fullWidth
                            value={values[pm]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            inputProps={{
                              name: pm,
                              id: pm,
                            }}
                            inputMode="numeric"
                          />
                        </Grid>
                      );
                    })}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="buyLimit"
                      name="buyLimit"
                      label="Maximum eVoucher buying limit"
                      fullWidth
                      value={values.buyLimit}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      inputMode="numeric"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="giftLimit"
                      name="giftLimit"
                      label="Maximum eVoucher gift limit"
                      fullWidth
                      value={values.giftLimit}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      inputMode="numeric"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="quantity"
                      name="quantity"
                      label="Quantity"
                      fullWidth
                      value={values.quantity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      inputMode="numeric"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <br />
                    <br />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      disabled={isSubmitting}
                    >
                      Create
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </Paper>
      </main>
    </React.Fragment>
  );
}
