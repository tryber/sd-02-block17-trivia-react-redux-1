const TRIVIA_BASE_API = 'https://opentdb.com/';

export const getToken = () => (
  fetch(`${TRIVIA_BASE_API}/api_token.php?command=request`)
    .then((response) => response.json())
    .then((result) => localStorage.setItem('token', result.token))
);

export const getQuestions = () => {
  fetch(`${TRIVIA_BASE_API}/api.php?amount=5&token=${localStorage.getItem('token')}`)
    .then((response) => response.json())
    .then((result) => localStorage.setItem('questions', JSON.stringify(result.results)));
};

export const getCategories = () => {
  fetch(`${TRIVIA_BASE_API}/api_category.php`)
    .then((response) => response.json())
    .then((result) => localStorage.setItem('categories', JSON.stringify(result.trivia_categories)));
}
