import React, { Component } from 'react';
import T from 'prop-types';
import './Controls.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Controls extends Component {
  static propTypes = {
    balance: T.number.isRequired,
    onDeposit: T.func.isRequired,
    onWithdraw: T.func.isRequired,
  };

  state = {
    amount: '',
  };

  handeleChange = e => {
    this.setState({
      amount: e.currentTarget.value,
    });
  };

  reset = () => this.setState({ amount: '' });

  handleDeposit = () => {
    if (Number(this.state.amount) === 0) {
      toast('Введите сумму для проведения операции!');
    } else if (Number(this.state.amount) > 0) {
      this.props.onDeposit(Number(this.state.amount));
      this.reset();
    } else {
      toast('Введите положительное число!');
    }
  };

  handeWithdraw = () => {
    if (Number(this.state.amount) === 0) {
      toast('Введите сумму для проведения операции!');
    } else if (this.state.amount > this.props.balance) {
      toast('На счету недостаточно средств для проведения операции!');
    } else if (Number(this.state.amount) > 0) {
      this.props.onWithdraw(Number(this.state.amount));
      this.reset();
    } else {
      toast('Введите положительное число!');
    }
  };

  render() {
    return (
      <section className="controls">
        <input
          type="number"
          name="amount"
          value={this.state.amount}
          onChange={this.handeleChange}
        />
        <button type="button" onClick={this.handleDeposit}>
          Deposit
        </button>
        <ToastContainer />
        <button type="button" onClick={this.handeWithdraw}>
          Withdraw
        </button>
        <ToastContainer />
      </section>
    );
  }
}
