import React from "react";
import { Row } from "react-bootstrap";

import Aux from "../../hoc/_Aux";

import Caudalchart from "./Caudalchart.js";
import ClySlRioRancheria from "./ClySlRioRancheria";
import VertSulf from "./VertSulf";
import VertCloru from "./VertCloru";

class Inicio extends React.Component {
  render() {
    return (
      <Aux>
        <Row>
          <VertSulf />
          <VertCloru/>
          <Caudalchart />
          <ClySlRioRancheria />
        </Row>
      </Aux>
    );
  }
}

export default Inicio;
