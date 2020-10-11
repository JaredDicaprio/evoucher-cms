import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

export default function PaymentMethodForm() {
  const [fields, setfields] = React.useState([]);

  return (
    <>
      <Grid item xs={12}>
        <TextField
          required
          id="visa"
          name="amount"
          label="Amount"
          fullWidth
          // value={values.amount}
          // onChange={handleChange}
          // onBlur={handleBlur}
          inputMode="numeric"
        />
      </Grid>
    </>
  );
}
