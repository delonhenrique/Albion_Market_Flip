import React, { Component } from "react";
import api from './api';
import list_items from './data/items'

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

  populateItems(list_items) {
    const items_br = list_items.map((item_name, count) => {
      if (item_name.LocalizedNames) {
        return item_name.LocalizedNames['PT-BR']
      } else {
        return item_name.UniqueName
      }
      
  })
    console.log(items_br)
    return items_br
  }
  
    render() {

    const { items } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Pesquisar filme:
            <input type="text" name="movie" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Pesquisar" />
        </form>

        <h1>Listar os Items</h1>

        {this.populateItems(list_items)}
        {/* {list_items.map((item_name, count) => (
          {item_name.LocalizedNames && item_name.LocalizedNames['PT-BR'] ? (
            <li key={count.toString()}>
              {item_name.LocalizedNames['PT-BR']}
            </li>
            )}
        ))} */}

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
              <strong>Pedido de compra: </strong>
              {item.buy_price_max}
            </p>
            <p>
              <strong>Data do Pedido de compra: </strong>
              {item.buy_price_max_date}
            </p>
            <p>
              <strong>Pedido de venda: </strong>
              {item.sell_price_max}
            </p>
            <p>
              <strong>Data do Pedido de venda: </strong>
              {item.sell_price_max_date}
            </p>
           
          </li>
        ))}
      </div>
    )
  }
}

export default App;