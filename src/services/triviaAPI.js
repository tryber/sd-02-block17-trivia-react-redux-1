const TRIVIA_BASE_API = 'https://opentdb.com';

export const getToken = () => (
  fetch(`${TRIVIA_BASE_API}/api_token.php?command=request`)
    .then((response) => response.json())
    .then((result) => localStorage.setItem('token', result.token))
);

export const getCategories = async () => {
  const response = await fetch(`${TRIVIA_BASE_API}/api_category.php`);
  const result = await response.json();
  return result;
};

export const getsQuestions = (categorie, difficult, type, token) => (
  fetch(`${TRIVIA_BASE_API}/api.php?amount=5${token}${categorie}${difficult}${type}`)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);
