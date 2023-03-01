import React from "react";
import trasera from "../img/trasera.jpg";

class Carta extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    this.props.handleClickCard(this.props.id);
  }

  render() {
    let img;
    if (this.props.pos === "bocaAbajo") {
      img = trasera;
    } else {
      img = this.props.src;
    }
    let hidden;
    if (this.props.pos === "Resuelta") {
      hidden = "hidden";
    }
    return (
      <div className="card">
        <img src={img} alt="" onClick={this.handleOnClick} hidden={hidden} />
      </div>
    );
  }
}

export default Carta;
