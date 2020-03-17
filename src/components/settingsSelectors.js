import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCategories } from '../services/triviaAPI';
import { handleSelectorsChanges } from '../actions';

class SettingSelectors extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categorie: '',
    };
  }

  componentDidMount() {
    const categorias = getCategories();
    categorias.then((categorias) => {
      this.setState({categorie: [...categorias.trivia_categories]})
    })
  }

  handleChange(e, handleSelectorChange) {
    const { name, value } = e.target;
    handleSelectorChange(value, name);
  };

  categorieSelector(handleSelectorChange, categorie) {
    const categories = this.state.categorie || [];
    return (
      <div>
        <label htmlFor="categorie">Categoria</label>
        <select
          data-testid="question-category-dropdown"
          value={categorie} name='categorie'
          onChange={(event) => this.handleChange(event, handleSelectorChange)}
        >
          <option value="categorie">Escolha uma categoria</option>
          {categories.map(({ name }) => (
            <option key={name}>{name}</option>
          ))
          }
        </select >
      </div>
    )
  }

  typeSelector(handleSelectorChange, type) {
    return (
      <div>
        <label htmlFor="type">tipo</label>
        <select
          data-testid="question-type-dropdown"
          value={type} name='type'
          onChange={(event) => this.handleChange(event, handleSelectorChange)}
        >
          <option value='type'>Escolha um tipo</option>
          <option value='boolean'>V ou F</option>
          <option value='multiple'>Múltipla Escolha</option>
        </select>
      </div>
    )
  }

  difficultySelector(handleSelectorChange, difficulty) {
    return (
      <div>
        <label htmlFor="difficulty">Dificuldade</label>
        <select
          data-testid="question-difficulty-dropdown"
          value={difficulty} name='difficult'
          onChange={(event) => this.handleChange(event, handleSelectorChange)}
        >
          <option value="difficulty">Escolha a dificuldade</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
    )
  }

  render() {
    const { handleSelectorChange, categorie, difficult, type } = this.props
    return (
      <div>
        <Link to="/">
          <button>
            Voltar
      </button>
        </Link>
        <div>
          {this.categorieSelector(handleSelectorChange, categorie)}
          {this.difficultySelector(handleSelectorChange, difficult)}
          {this.typeSelector(handleSelectorChange, type)}
        </div >
      </div >
    )
  }
};

const mapStateToProps = ({ selectorsChange: { categorie, difficult, type } }) => (
  {
    categorie,
    difficult,
    type,
  }
);
const mapDispatchToProps = (dispatch) => ({
  handleSelectorChange: (value, name) => dispatch(handleSelectorsChanges(value, name)),
  getCategories: () => dispatch({ type: 'GET_' })
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingSelectors);;
