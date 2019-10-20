import React from 'react';
import './TransactionHistory.module.css';

const TransactionHistory = ({ items }) => (
  <table className="history">
    <thead>
      <tr>
        <th>Transaction</th>
        <th>Amount</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {items.map(item => (
        <tr key={item.id}>
          <td>{item.type}</td>
          <td>{item.amount}$</td>
          <td>{item.date}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default TransactionHistory;
