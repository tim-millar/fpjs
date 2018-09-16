import * as R from 'ramda';

const MSGS = {
  BILL_AMOUNT_INPUT: 'BILL_AMOUNT_INPUT',
  TIP_PERCENT_INPUT: 'TIP_PERCENT_INPUT',
};

export function billAmountInputMsg(billAmount) {
  return {
    type: MSGS.BILL_AMOUNT_INPUT,
    billAmount,
  };
}

export function tipPercentInputMsg(tipPercent) {
  return {
    type: MSGS.TIP_PERCENT_INPUT,
    tipPercent,
  };
}

function calculateTip(billAmount, tipPercent) {
  return (0.01 * billAmount) * tipPercent;
}

function calculateTotal(billAmount, tipPercent) {
  return billAmount + calculateTip(billAmount, tipPercent);
}

function update (msg, model) {
  switch (msg.type) {
    case MSGS.BILL_AMOUNT_INPUT: {
      const { billAmount } = msg;
      const tip = calculateTip(billAmount, model.tipPercent);
      const total = calculateTotal(billAmount, model.tipPercent);
      return { ...model, billAmount, tip, total };
    }
    case MSGS.TIP_PERCENT_INPUT: {
      const { tipPercent } = msg;
      const tip = calculateTip(model.billAmount, tipPercent);
      const total = calculateTotal(model.billAmount, tipPercent);
      return { ...model, tipPercent, tip, total };
    }
  }
  return model;
}

export default update;
