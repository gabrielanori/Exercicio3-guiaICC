import React, { Component } from "react";
import axios from "axios";

class Produto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      descricao: this.props.descricao,
      valor: this.props.valor,
      quantidade: this.props.quantidade,
    };
  }

  insertOrUpdate = (event) => {
    event.preventDefault();
    const checkData = {
      id: this.state.id,
      descricao: this.state.descricao,
      valor: this.state.valor,
      quantidade: this.state.quantidade
    };
    console.log();
    axios
      .post(`http://localhost:3001/insertUpdate/`, checkData)
      .then(response => {
        console.log(response.data);
      })
      .catch(erro => console.log(erro));
  };
  onDelete = (event) => {
    event.preventDefault();
    const headers = {
      Authorization: "Bearer paperboy",
    };

    axios
      .delete(`http://localhost:3001/deleteCalcado/`, {
        headers,
        data: { id: this.state.id },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((erro) => console.log(erro));
  };

  render() {
    return (
      <div className="tabela container ">
        <br></br>{" "}
        <form className="main">
          <label className="main2">
            Descrição<br></br>
            <input
              type="text"
              value={this.state.descricao}
              onChange={(event) => {
                this.setState({ descricao: event.target.value });
              }}
            />{" "}
          </label>
          <label>
            Valor<br></br>
            <input
              type="number"
              value={this.state.valor}
              onChange={(event) => {
                this.setState({ valor: event.target.value });
              }}
            />
          </label>
          <label>
            Quantidade<br></br>
            <input
              type="number"
              value={this.state.quantidade}
              onChange={(event) => {
                this.setState({ quantidade: event.target.value });
              }}
            />
          </label>
          <button
            onClick={(event) => {
              this.insertOrUpdate(event);
            }}
            className="fat"
          >
            Inserir/Atualizar
          </button>
          <button
            onClick={(event) => {
              this.onDelete(event);
            }}
            className="fat"
          >
            Excluir
          </button>
          <br></br>
        </form>
      </div>
    );
  }
}
export default Produto;
