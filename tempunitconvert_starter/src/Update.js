import * as R from 'ramda';

const MSGS = {
  LEFT_VALUE_INPUT: 'LEFT_VALUE_INPUT',
  RIGHT_VALUE_INPUT: 'RIGHT_VALUE_INPUT',
  LEFT_UNIT_INPUT: 'LEFT_UNIT_INPUT',
  RIGHT_UNIT_INPUT: 'RIGHT_UNIT_INPUT',
};

const toInt = R.pipe(parseInt, R.defaultTo(0));

export function leftValueInputMsg(leftValue) {
  return {
    type: MSGS.LEFT_VALUE_INPUT,
    leftValue,
  };
}

export function rightValueInputMsg(rightValue) {
  return {
    type: MSGS.RIGHT_VALUE_INPUT,
    rightValue,
  };
}

export function leftUnitInputMsg(leftUnit) {
  return {
    type: MSGS.LEFT_UNIT_INPUT,
    leftUnit,
  };
}

export function rightUnitInputMsg(rightUnit) {
  return {
    type: MSGS.RIGHT_UNIT_INPUT,
    rightUnit,
  };
}

function update (msg, model) {
  switch (msg.type) {
    case MSGS.LEFT_VALUE_INPUT: {
      if (msg.leftValue === '')
        return { ...model, leftFocus: true, leftValue: '', rightValue: '' };
      const leftValue = toInt(msg.leftValue);
      return { ...model, leftFocus: true, leftValue };
    }
    case MSGS.RIGHT_VALUE_INPUT: {
      if (msg.rightValue === '')
        return { ...model, leftFocus: false, leftValue: '', rightValue: '' };
      const rightValue = toInt(msg.rightValue);
      return { ...model, leftFocus: false, rightValue };
    }
    case MSGS.LEFT_UNIT_INPUT: {
      const { leftUnit } = msg;
      return { ...model, leftUnit };
    }
    case MSGS.RIGHT_UNIT_INPUT: {
      const { rightUnit } = msg;
      return { ...model, rightUnit };
    }
  }
  return model;
}

export default update;
