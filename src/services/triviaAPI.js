const TRIVIA_BASE_API = 'https://opentdb.com/';

export const getToken = () => (
  fetch(`${TRIVIA_BASE_API}/api_token.php?command=request`)
    .then((response) => response.json())
    .then((result) => localStorage.setItem('token', result.token))
);

export const getQuestions = (categorie, difficult, type) => {
  fetch(`${TRIVIA_BASE_API}/api.php?amount=5${categorie}${difficult}${type}`)
    .then((response) => response.json())
    .then((result) => localStorage.setItem('questions', JSON.stringify(result.results)));
};

export const getCategories = async () => {
  const response = await fetch(`${TRIVIA_BASE_API}/api_category.php`);
  const result = await response.json();
  return result;
}
