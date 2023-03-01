import React from "react";
import Carta from "./Carta";
import images from "../import";
import YouWin from "./YouWin";

class Tablero extends React.Component {
  maxCarta = 8;
  state = {
    carta: [],
  };

  constructor(props) {
    super(props);
    this.creaTablero(this.maxCarta);
    this.handleClickCard = this.handleClickCard.bind(this);
    this.handleVerify = this.handleVerify.bind(this);
    this.countCardsUp = this.countCardsUp.bind(this);
  }

  shuffleArray(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)); //random index
      [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
    }
  }

  creaTablero(numCartas) {
    let id = 0;
    for (let i = 0; i < numCartas / 2; i++) {
      this.state.carta.push({
        images: images[i],
        id: id,
        pos: "bocaAbajo",
        resolve: false,
      });
      id++;
      this.state.carta.push({
        images: images[i],
        id: id,
        pos: "bocaAbajo",
        resolve: false,
      });
      id++;
    }
    this.shuffleArray(this.state.carta);
  }

  handleClickCard(id) {
    if (this.state.carta.filter((c) => c.pos === "bocaArriba").length < 2) {
      this.state.carta.find((c) => {
        if (c.id === id) {
          c.pos = "bocaArriba";
        }
      });
      this.setState({ carta: this.state.carta });
      this.handleVerify(this.state.carta);
    }
  }

  handleVerify(cards) {
    let v = [];
    for (let i = 0; i < 2; i++) {
      v = cards.filter((card) => card.pos === "bocaArriba");
    }
    if (v.length === 2) {
      if (v[0].images === v[1].images) {
        console.log("es correcto");
        let resolve = cards.map((element) => {
          if (element.pos === "bocaArriba") {
            element.resolve = true;
            element.pos = "Resuelta";
            console.log(element);
          }
          return element;
        });
        this.setState({ carta: resolve });
        this.youWin(this.state.carta);
      } else {
        setTimeout(() => {
          let updatedCards = cards.map((card) => {
            if (card.pos === "bocaArriba") {
              card.pos = "bocaAbajo";
            }
            return card;
          });
          this.setState({ cards: updatedCards });
        }, 1500);
      }
    }
    console.log(v);
  }

  countCardsUp() {
    let cartasUP = [];
    this.state.carta.filter((c) => {
      if (c.pos === "bocaArriba") {
        cartasUP.push(c);
      }
      return c;
    });
    console.log(cartasUP.length);
    return cartasUP.length;
  }

  youWin(cards) {
    if (cards.every((c) => c.resolve === true)) {
      console.log("ganaste");
      return <YouWin />;
    }
  }

  render() {
    return (
      <div className="card-container">
        {/* {console.log(this.state.carta)} */}
        {this.state.carta.map((c) => {
          return (
            <Carta
              key={c.id}
              id={c.id}
              src={c.images.src}
              pos={c.pos}
              handleClickCard={this.handleClickCard}
            />
          );
        })}
      </div>
    );
  }
}
export default Tablero;
