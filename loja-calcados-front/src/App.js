import React, { Component } from "react";
import axios from "axios";
import Produto from "./Produto";
import "./index.css";
import MyHeader from "./Header";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      produtos: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3001/estoque").then(resposta => {
      this.setState({
        produtos: resposta.data
      });
    });
  }

  addOne = event => {
    event.preventDefault();
    this.setState({
      produtos: [
        ...this.state.produtos,
        { descricao: "", valor: 0, quantidade: 0 }
      ]
    });
  };
  render() {
    return (
      <div>
        <MyHeader />

        {this.state.produtos.map(produto => (
          <Produto
            key={produto.id}
            _id={produto._id}
            id={produto.id}
            descricao={produto.descricao}
            valor={produto.valor}
            quantidade={produto.quantidade}
          />
        ))}
        <div>
          <br></br>
          <br></br>

          <button onClick={this.addOne} className="add">
            +
          </button>
        </div>
      </div>
    );
  }
}
export default Container;
