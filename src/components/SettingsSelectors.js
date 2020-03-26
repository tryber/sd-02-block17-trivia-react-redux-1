import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCategories } from '../services/triviaAPI';
import { handleSelectorsChanges } from '../actions';
import '../style/SettingSelectors.css';

class SettingSelectors extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: '',
    };
  }

  componentDidMount() {
    const category = getCategories();
    category.then((categorie) => {
      this.setState({ categories: [...categorie.trivia_categories] });
    });
  }

  handleChange(e, handleSelectorChange) {
    console.log(this.props);
    const { name, value } = e.target;
    handleSelectorChange(value, name);
  }

  categorieSelector(handleSelectorChange, categorie) {
    const categories = this.state.categories || [];
    return (
      <div>
        <label className="settings-label" htmlFor="categorie">Categoria</label>
        <select
          className="settings-input"
          data-testid="question-category-dropdown"
          value={categorie} name="categorie"
          onChange={(event) => this.handleChange(event, handleSelectorChange)}
        >
          <option value="">Escolha uma categoria</option>
          {categories.map(({ name, id }) => (
            <option key={name} value={id}>{name}</option>
          ))
          }
        </select >
      </div>
    );
  }

  typeSelector(handleSelectorChange, type) {
    return (
      <div>
        <label className="settings-label" htmlFor="type">Tipo</label>
        <select
          className="settings-input"
          data-testid="question-type-dropdown"
          value={type} name="type"
          onChange={(event) => this.handleChange(event, handleSelectorChange)}
        >
          <option
            data-testid="question-category-dropdown"
            value=""
          >
            Escolha um tipo
          </option>
          <option
            data-testid="question-difficulty-dropdown"
            value="boolean"
          >
            V ou F
          </option>
          <option
            data-testid="question-type-dropdown"
            value="multiple"
          >
            Múltipla Escolha
          </option>
        </select>
      </div>
    );
  }

  difficultySelector(handleSelectorChange, difficulty) {
    return (
      <div>
        <label className="settings-label" htmlFor="difficulty">Dificuldade</label>
        <select
          className="settings-input"
          data-testid="question-difficulty-dropdown"
          value={difficulty}
          name="difficulty"
          onChange={(event) => this.handleChange(event, handleSelectorChange)}
        >
          <option value="">Escolha a dificuldade</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
    );
  }

  render() {
    const { handleSelectorChange, categorie, difficulty, type } = this.props;
    return (
      <div className="settings-container">
        <p className="settings-title">Configurações</p>
        <div>
          <div>
            {this.categorieSelector(handleSelectorChange, categorie)}
            {this.difficultySelector(handleSelectorChange, difficulty)}
            {this.typeSelector(handleSelectorChange, type)}
            <Link to="/">
              <button className="settings-btn">Voltar</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ selectorsChange: { categorie, difficulty, type } }) => (
  {
    categorie,
    difficulty,
    type,
  }
);
const mapDispatchToProps = (dispatch) => ({
  handleSelectorChange: (value, name) => dispatch(handleSelectorsChanges(value, name)),
});

SettingSelectors.propTypes = {
  handleSelectorChange: PropTypes.func.isRequired,
  categorie: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingSelectors);
