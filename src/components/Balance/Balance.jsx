import React from 'react';

const Balance = ({ balance, income, expenses }) => (
  <section className="balance">
    <span role="img" aria-labelledby="arrow1">
      ⬆️{income}$
    </span>
    <span role="img" aria-labelledby="arrow2">
      ⬇️{expenses}$
    </span>
    <span>Balance: {balance}$</span>
  </section>
);

export default Balance;
