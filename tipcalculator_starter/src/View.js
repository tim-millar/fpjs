import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import {
  billAmountInputMsg,
  tipPercentInputMsg,
} from './Update'

const {
  div,
  h1,
  pre,
  input,
} = hh(h);

function calculateTip(model) {
  return (0.01 * model.billAmount) * model.tipPercent;
}

function calculateTotal(model) {
  return model.billAmount + calculateTip(model);
}

function inputField(dispatch, valueMsg, name, value) {
  return div({ className: 'w-50 ma1' }, [
    name,
    input({
      type: 'number',
      min: '0.00',
      step: '0.01',
      className: 'db w-100 mv2 pa2 input-select ba tr',
      value,
      oninput: e => dispatch(valueMsg(e.target.value))
    })
  ]);
}

function tip(model) {
  return div({ className: 'w-50 ma1' }, [
    'Tip: ',
    model.tip.toFixed(2),
  ]);
}

function total(model) {
  return div({ className: 'w-50 ma1' }, [
    'Total: ',
    parseFloat(model.total).toFixed(2),
  ]);
}

function view(dispatch, model) {
  return div({ className: 'mw6 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Tip Calculator'),
    inputField(dispatch, billAmountInputMsg, 'Bill Amount', model.billAmount),
    inputField(dispatch, tipPercentInputMsg, 'Tip %', model.tipPercent),
    tip(model),
    total(model),
    pre(JSON.stringify(model, null, 2)),
  ]);
}

export default view;
