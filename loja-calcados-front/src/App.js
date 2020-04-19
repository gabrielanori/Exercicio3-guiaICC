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
    const produtos = [...this.state.produtos];
    if (produtos.length !== 0) {
      const lastId = produtos[produtos.length - 1]._id;
      produtos.push({
        _id: lastId + 1,
        descricao: "",
        valor: 0,
        quantidade: 0
      }
      );
    } else {
      produtos.push({
        _id: 1, descricao: "",
        valor: Number(0),
        quantidade: Number(0),
      })
    } this.setState({ produtos: produtos });
  };

  render() {
    return (
      <div>
        <MyHeader />

        {this.state.produtos.map(produto => (
          <Produto
            key={produto._id}
            _id={produto._id}

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
