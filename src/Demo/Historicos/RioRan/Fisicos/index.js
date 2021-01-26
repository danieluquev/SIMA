import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";

import Aux from "../../../../hoc/_Aux";
import FisicosCharts from "./FisicosCharts";

import { csv } from "d3";
const data = require("../../../../BD/Offline/Hist_RioRan.csv");

export default function RioRanFisicos() {

  const [isMounted, setMounted] = useState(false);

  const [charts, setcharts] = useState();

  useEffect(() => {
    let parametros = [];
    let codigos = [];
    let fechas = [];
    let unidades = [];
    let newdata = [];

    var valores = {};

    csv(data).then((data) => {
      data.columns.shift();
      data.columns.shift();
      parametros = data.columns;

      data.forEach((d, i) => {
        fechas.push(d["Fecha"]);
        codigos.push(d["Codigo"]);
      });

      fechas.shift();
      codigos.shift();

      var unique_cod = [...new Set(codigos)];
      var unique_date = [...new Set(fechas)];

      unidades = data[0];

      data.shift();

      console.log(unique_date);

      console.log(data);

      console.log("newdata");

      unique_date.forEach((date) => {
        var result = data.filter(function (obj) {
          return obj.Fecha === date;
        });

        if (result.length === unique_cod.length) {
          newdata.push(result);
        } else {
          unique_cod.forEach((cod) => {
            if (!result.some((code) => code.Codigo === cod)) {
              let insert = {};
              Object.keys(result[0]).forEach((el) => {
                insert[el] = "";
              });
              insert["Codigo"] = cod;
              result.push(insert);
            }
          });
          newdata.push(result);
        }
      });

      const series = []

      parametros.forEach((params) => {
        valores[params] = [];;
        unique_cod.forEach((code) => {
          valores[params][code] = [];
        });
      });

      newdata.forEach(dato=> {
        dato.forEach(el => {
          parametros.forEach(params => {
            valores[params][el.Codigo].push(el[params])
          });
        });
      });

      console.log(newdata);

      console.log(valores);

      const listCharts = [];

      parametros.forEach((params) => {
        series[params] = []
        unique_cod.forEach((code) => {
          series[params].push(
          {
            name: code,
            type: "line",
            smooth: true,
            data: valores[params][code],
            animationDelay: function (idx) {
              return idx * 10 + 100;
            },
            symbolSize: 0.1,
            connectNulls: true
          }
          );
        });
      });

      console.log(series)

      parametros.forEach((p, i) => {
        listCharts.push(
          <FisicosCharts
            key={i}
            parametro={p}
            unidades={unidades[p]}
            series={series[p]}
            fechas={unique_date}
          />
        );
      });

      setcharts(listCharts);

    });

  }, []);

  return (
    <Aux>
      <Row>{charts}</Row>
    </Aux>
  );
}
