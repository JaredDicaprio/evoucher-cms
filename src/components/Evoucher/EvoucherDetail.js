import React from 'react';

export default function EvoucherDetail({ evoucher }) {
  return <div>{JSON.stringify(evoucher, null, 2)}</div>;
}
