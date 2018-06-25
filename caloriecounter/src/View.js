import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import {
  showFormMsg,
  mealInputMsg,
  caloriesInputMsg,
  saveMealMsg
} from './Update';
import * as R from 'ramda';

const { pre, div, h1, button, form, label, input, table, tr, td, th } = hh(h);

function fieldSet(labelText, inputValue, oninput) {
  return div([
    label({ className: 'db mb1' }, labelText),
    input({
      className: 'pa2 input-reset ba w-100 mb2',
      type: 'text',
      value: inputValue,
      oninput
    })
  ]);
}

function buttonSet(dispatch) {
  return div([
    button(
      {
        className: 'f3 pv2 ph3 bg-blue white bn mr2 dim',
        type: 'submit',
      },
      'Save',
    ),
    button(
      {
        className: 'f3 pv2 ph3 bn bg-light-gray dim',
        type: 'button',
        onclick: () => dispatch(showFormMsg(false)),
      },
      'Cancel',
    ),
  ]);
}

function formView(dispatch, model) {
  const { description, calories, showForm } = model;
  if (showForm) {
    return form(
      {
        className: 'w-100 mv2',
        onsubmit: e => {
          e.preventDefault();
          dispatch(saveMealMsg);
        }
      },
      [
        fieldSet(
          'Meal',
          description,
          e => dispatch(mealInputMsg(e.target.value))
        ),
        fieldSet(
          'Calories',
          calories || '',
          e => dispatch(caloriesInputMsg(e.target.value))
        ),
        buttonSet(dispatch),
      ]
    )
  } else {
    return button(
      {
        className: 'f3 pv2 ph3 bg-blue white bn',
        onclick: () => dispatch(showFormMsg(true)),
      },
      'Add Meal',
    );
  }
}

function cell(className, value) {
  return td({ className }, value);
}

function mealRow(className, meal) {
  const { description, calories } = meal;
  return tr({ className }, [
    cell('pa2 tl', description),
    cell('pa2 tr', calories),
  ]);
}

function tableHeader(className) {
  return tr({ className }, [
    th({ className: 'pa2 tl' }, 'Meal'),
    th({ className: 'pa2 tr' }, 'Calories')
  ]);
}

function totalRow(className, meals) {
  const total = R.reduce(
    (acc, { calories }) => acc + calories,
    0,
    meals,
  );
  return tr({ className }, [
    cell('pa2 tl', 'Total:'),
    cell('pa2 tr', total),
  ]);
}

function tableView({ meals }) {
  return table(
    { className: 'f3 w-100 mv2 collapse' },
    [
      tableHeader('stripe-dark'),
      R.map(meal => mealRow('stripe-dark', meal), meals),
      totalRow('b fw5 stripe-dark', meals),
  ]);
}

function view(dispatch, model) {
  return div(
    { className: 'mw6 center' },
    [
      h1({ className: 'f2 pv2 bb' }, 'Calorie Counter'),
      formView(dispatch, model),
      tableView(model),
      // pre(JSON.stringify(model, null, 2)),
    ]);
}

export default view;
