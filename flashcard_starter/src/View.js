import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import {
  questionMsg,
  answerMsg,
  saveCardMsg,
  editCardMsg,
} from './Update';

const {
  div,
  h1,
  pre,
  button,
  i,
  textarea,
} = hh(h);

function addCard() {
  return div([
    button({ className: 'pa2 br1 mv2 bg-green bn white' }, [
      i( { className: 'fa fa-plus ph1' }),
      'Add Flashcard',
    ])
  ]);
}

function cardList(flashcards, dispatch) {
  return div({ className: 'flex flex-wrap nl2 nr2' }, flashcards.map(
    flashcard => div({ className: 'w-third pa2' }, card(flashcard, dispatch))
  ))
}

function card(flashcard, dispatch) {
  if (flashcard.edit)
    return div(
      { className: 'w-100 pa2 bg-light-yellow mv2 shadow-1 relative' },
      createCard(flashcard, dispatch),
    );
  else if (flashcard.preview)
    return div(
      { className: 'w-100 pa2 bg-light-yellow shadow-1 mv2 relative pb5' },
      previewCard(flashcard, dispatch),
    );
  else
    return div(
      { className: 'w-100 pa2 bg-light-yellow shadow-1 mv2 relative pb5' },
      showCard(flashcard, dispatch),
    );
}

function createCard(flashcard, dispatch) {
  return div([
    div([
      div({ className: 'b f6 mv1' }, 'Question'),
      textarea({
        className: 'w-100 bg-washed-yellow outline-0',
        value: flashcard.question,
        oninput: e => dispatch(questionMsg(e.target.value)),
      }),
    ]),
    div([
      div({ className: 'b f6 mv1' }, 'Answer'),
      textarea({
        className: 'w-100 bg-washed-yellow outline-0',
        value: flashcard.answer,
        oninput: e => dispatch(answerMsg(e.target.value)),
      }),
    ]),
    button({
      className: 'f4 ph3 pv2 br1 bg-gray bn white mv2',
      onclick: e => dispatch(saveCardMsg()),
    }, 'Save'),
    i({ className: 'absolute top-0 right-0 fa fa-remove fa-fw black-50 pointer' }),
  ])
}

function previewCard(flashcard, dispatch) {
  return div([
    cardSegment('Question', flashcard.question, dispatch),
    cardSegment('Show Answer', undefined, dispatch),
    i({ className: 'absolute top-0 right-0 fa fa-remove fa-fw black-50 pointer' }),
  ]);
}

function showCard(flashcard, dispatch) {
  return div([
    cardSegment('Question', flashcard.question, dispatch),
    cardSegment('Answer', flashcard.answer, dispatch),
    div(
      { className: 'absolute bottom-0 left-0 w-100 ph2' },
      cardResponse(),
    ),
    i({ className: 'absolute top-0 right-0 fa fa-remove fa-fw black-50 pointer' }),
  ]);
}

function cardSegment(header, text, dispatch) {
  return [
    div({
      className: 'b f6 mv1 underline',
    }, header),
    div({
      className: 'pointer',
      onclick: e => dispatch(editCardMsg()),
    }, text),
  ];
}

function cardResponse() {
  return div({ className: 'mv2 flex justify-between' }, [
    button({ className: 'f4 ph3 pv2 bg-red bn white br1' }, 'Bad'),
    button({ className: 'f4 ph3 pv2 bg-blue bn white br1' }, 'Good'),
    button({ className: 'f4 ph3 pv2 bg-dark-green bn white br1' }, 'Great'),
  ]);
}

function view(dispatch, model) {
  return div({ className: 'mw8 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Flashcard Study'),
    addCard(),
    cardList(Object.values(model.flashcards), dispatch),
    pre(JSON.stringify(model, null, 2)),
  ]);
}

export default view;
