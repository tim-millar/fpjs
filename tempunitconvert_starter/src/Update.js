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

function convert(model) {
  const { leftValue, leftUnit, rightValue, rightUnit } = model;

  const [fromUnit, fromTemp, toUnit] =
        model.leftFocus
        ? [leftUnit, leftValue, rightUnit]
        : [rightUnit, rightValue, leftUnit]

  const otherValue = R.pipe(
    convertFromToTemp,
    round,
  )(fromUnit, toUnit, fromTemp);

  return model.leftFocus
    ? { ...model, rightValue: otherValue }
    : { ...model, leftValue: otherValue };
}

function convertFromToTemp(fromUnit, toUnit, temp) {

  const convertFn = R.pathOr(
    R.identity,
    [fromUnit, toUnit],
    unitConversions,
  );

  return convertFn(temp);
}

function fToC(temp) {
  return 5 / 9 * (temp - 32);
}

function cToF(temp) {
  return 9 / 5 * (temp + 32);
}

function kToC(temp) {
  return temp - 237.15;
}

function cToK(temp) {
  return temp + 273.15;
}

const fToK = R.pipe(fToC, cToK);

const kToF = R.pipe(kToC, cToF);

function round(number) {
  return Math.round(number);
}

const unitConversions = {
  Celsius: {
    Fahrenheit: cToF,
    Kelvin: cToK,
  },
  Fahrenheit: {
    Celsius: fToC,
    Kelvin: fToK,
  },
  Kelvin: {
    Fahrenheit: kToF,
    Celsius: kToC,
  },
};

function update (msg, model) {
  switch (msg.type) {
    case MSGS.LEFT_VALUE_INPUT: {
      if (msg.leftValue === '')
        return { ...model, leftFocus: true, leftValue: '', rightValue: '' };
      const leftValue = toInt(msg.leftValue);
      return convert({ ...model, leftFocus: true, leftValue });
    }
    case MSGS.RIGHT_VALUE_INPUT: {
      if (msg.rightValue === '')
        return { ...model, leftFocus: false, leftValue: '', rightValue: '' };
      const rightValue = toInt(msg.rightValue);
      return convert({ ...model, leftFocus: false, rightValue });
    }
    case MSGS.LEFT_UNIT_INPUT: {
      const { leftUnit } = msg;
      return convert({ ...model, leftUnit });
    }
    case MSGS.RIGHT_UNIT_INPUT: {
      const { rightUnit } = msg;
      return convert({ ...model, rightUnit });
    }
  }
  return model;
}

export default update;
