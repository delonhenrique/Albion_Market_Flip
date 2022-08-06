import React, { Component } from "react";
import api from './api';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {value: '', items: []}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.componentDidMount()
  }

  async componentDidMount() {
    const response = await api.get(this.state.value);


    this.setState({ items: response.data })
  }

  render() {

    const { items } = this.state;
    console.log(items)

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Pesquisar filme:
            <input type="text" name="movie" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Pesquisar" />
        </form>

        <h1>Listar os Filmes</h1>
        {items.map((item, i) => (
          <li key={i.toString()}>
             <p>
              <strong>Nome: </strong>
              {item.item_id}
            </p>
            <p>
              <strong>Cidade: </strong>
              {item.city}
            </p>
            <p>
              <strong>Qualidade: </strong>
              {item.quality}
            </p>
            <p>
              <strong>Preço mínimo: </strong>
              {item.sell_price_min}
            </p>
            <p>
              <strong>Data da atualização: </strong>
              {item.sell_price_min_date}
            </p>
           
          </li>
        ))}
      </div>
    )
  }
}

export default App;