import * as R from 'ramda';

const MSGS = {
  LEFT_VALUE: 'LEFT_VALUE',
  RIGHT_VALUE: 'RIGHT_VALUE',
};

export function updateLeftValue(leftValue) {
  return {
    type: MSGS.LEFT_VALUE,
    leftValue,
  };
}

export function updateRightValue(rightValue) {
  return {
    type: MSGS.RIGHT_VALUE,
    rightValue,
  };
}

function update (msg, model) {
  switch (msg.type) {
    case MSGS.LEFT_VALUE: {
      const { leftValue } = msg;
      return { ...model, leftValue: leftValue };
    }
    case MSGS.RIGHT_VALUE: {
      const { rightValue } = msg;
      return { ...model, rightValue: rightValue };
    }
  }
  return model;
}

export default update;
