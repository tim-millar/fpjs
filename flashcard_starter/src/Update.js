import * as R from 'ramda';

const MSGS = {
  QUESTION: 'QUESTION',
  ANSWER: 'ANSWER',
  SAVE_CARD: 'SAVE_CARD',
  EDIT_CARD: 'EDIT_CARD',
};

export function questionMsg(question) {
  return {
    type: MSGS.QUESTION,
    question,
  };
}

export function answerMsg(answer) {
  return {
    type: MSGS.ANSWER,
    answer,
  };
}

export const saveCardMsg = () =>
  ({ type: MSGS.SAVE_CARD });

export const editCardMsg = () =>
  ({ type: MSGS.EDIT_CARD });

function update(msg, model) {
  // const { activeFlashcardId, flashcards } = model;
  // const activeFlashcard = flashcards[activeFlashcardId];
  switch (msg.type) {
  case MSGS.QUESTION: {
    const { activeFlashcardId, flashcards } = model;
    const activeFlashcard = flashcards[activeFlashcardId];
    const { question } = msg;
    const newActiveFlashcard = {
      ...activeFlashcard,
      question: question,
    };
    return {
      ...model,
      flashcards: {
        ...flashcards,
        [activeFlashcardId]: newActiveFlashcard,
      },
    };
  }
  case MSGS.ANSWER: {
    const { activeFlashcardId, flashcards } = model;
    const activeFlashcard = flashcards[activeFlashcardId];
    const { answer } = msg;
    const newActiveFlashcard = {
      ...activeFlashcard,
      answer: answer,
    };
    return {
      ...model,
      flashcards: {
        ...flashcards,
        [activeFlashcardId]: newActiveFlashcard,
      },
    };
  }
  case MSGS.SAVE_CARD: {
    const { activeFlashcardId, flashcards } = model;
    const activeFlashcard = flashcards[activeFlashcardId];
    const newActiveFlashcard = {
      ...activeFlashcard,
      preview: true,
      edit: false,
    }
    return {
      ...model,
      flashcards: {
        ...flashcards,
        [activeFlashcardId]: newActiveFlashcard,
      },
    };
  }
  case MSGS.EDIT_CARD: {
    const { activeFlashcardId, flashcards } = model;
    const activeFlashcard = flashcards[activeFlashcardId];
    const newActiveFlashcard = {
      ...activeFlashcard,
      edit: true,
    }
    return {
      ...model,
      flashcards: {
        ...flashcards,
        [activeFlashcardId]: newActiveFlashcard,
      },
    };
  }
  }
  return model;
}

export default update;
