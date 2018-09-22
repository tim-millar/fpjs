const flashcards = {
  0: {
    question: 'What is a pure function?',
    answer: 'It is a function that generates its output purely interms of its input, and produces no side effects.',
    rank: 0,
    preview: true,
    edit: false,
  },
  1: {
    question: 'What is partial application?',
    answer: 'It is the application of a curried function to less than the full arity of its arguments.',
    rank: 0,
    preview: false,
    edit: false,
  },
  2: {
    question: '',
    answer: '',
    rank: 0,
    preview: false,
    edit: true,
  }
};

const initModel = {
  activeFlashcardId: 0,
  flashcards: flashcards,
};

export default initModel;
