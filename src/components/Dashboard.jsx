import React, { Component } from 'react';
import shortid from 'shortid';
import './Dashboard.module.css';
import Controls from './Controls/Controls';
import Balance from './Balance/Balance';
import TransactionHistory from './TransactionHistory/TransactionHistory';
import storage from './helpers/localStorege';

export default class Dashboard extends Component {
  state = {
    transactions: [],
    balance: 0,
  };

  componentDidMount() {
    const transactions = storage.get('transactions');
    const balance = storage.get('balance');

    if (transactions && balance) {
      this.setState({ transactions, balance });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { transactions, balance } = this.state;

    if (prevState.transactions !== transactions) {
      storage.save('transactions', transactions);
    }

    if (prevState.balance !== balance) {
      storage.save('balance', balance);
    }
  }

  findSumByType = type => {
    const arrayOfDeposits = this.state.transactions.filter(
      el => el.type === type,
    );
    return arrayOfDeposits.reduce((count, el) => (count += el.amount), 0);
  };

  handleDeposit = amount => {
    this.setState(prevState => ({
      transactions: [
        ...prevState.transactions,
        {
          id: shortid.generate(),
          type: 'deposit',
          amount,
          date: new Date().toLocaleString(),
        },
      ],
      balance: prevState.balance + amount,
    }));
  };

  handleWithdraw = amount => {
    this.setState(prevState => ({
      transactions: [
        ...prevState.transactions,
        {
          id: shortid.generate(),
          type: 'withdraw',
          amount,
          date: new Date().toLocaleString(),
        },
      ],
      balance: prevState.balance - amount,
    }));
  };

  render() {
    return (
      <div className="dashboard">
        <Controls
          onDeposit={this.handleDeposit}
          onWithdraw={this.handleWithdraw}
          balance={this.state.balance}
        />

        <Balance
          balance={this.state.balance}
          income={this.findSumByType('deposit')}
          expenses={this.findSumByType('withdraw')}
        />

        {this.state.transactions.length > 0 && (
          <TransactionHistory items={this.state.transactions} />
        )}
      </div>
    );
  }
}
