import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { updateLeftValue, updateRightValue } from './Update';

const {
  div,
  h1,
  pre,
  span,
  input,
  select,
  option,
  form,
} = hh(h);

const units = ['Fahrenheit', 'Celsius', 'Kelvin'];

function unitOptions(selectedUnit) {
  return R.map(
    unit => option({ value: unit, selected: unit === selectedUnit }, unit),
    units,
  );
}

function unitSection(dispatch, value, unit, oninput) {
  return div({ className: 'w-50 ma1' }, [
    input({
      type: 'text',
      className: 'db w-100 mv2 pa2 input-select ba',
      value,
      oninput,
    }),
    select(
      { className: 'db w-100 pa2 input-reset br1 bg-white ba b--black' },
      unitOptions(unit),
    )
  ]);
}

function view(dispatch, model) {
  return div({ className: 'mw6 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Temperature Unit Converter'),
    div({ className: 'flex' }, [
      unitSection(
        dispatch,
        model.leftValue,
        model.leftUnit,
        e => dispatch(updateLeftValue(e.target.value)),
      ),
      unitSection(
        dispatch,
        model.rightValue,
        model.rightUnit,
        e => dispatch(updateRightValue(e.target.value)),
      ),
    ]),
    pre(JSON.stringify(model, null, 2)),
  ]);
}

export default view;
