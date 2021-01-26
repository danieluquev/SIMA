import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import { csv } from "d3";

import Aux from "../../hoc/_Aux";
import LluviaAnual from "./lluvia_anual";

const data = require("../../BD/Offline/PrecipitacionHistorica.csv");

export default function Precipitacion() {
  const [charts, setCharts] = useState();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    csv(data).then((data) => {
      let xValues = [];

      let years = [];
      let months = [];
      let estaciones = [];
      data.columns.shift();

      estaciones = data.columns;

      for (let i = 0; i < data.length; i++) {
        data[i]["date"] = new Date(data[i]["Fecha"]).toISOString();
        xValues[i] = data[i]["Fecha"];
        years[i] = new Date(data[i]["Fecha"]).getFullYear();
        months[i] = new Date(data[i]["Fecha"]).getMonth();
      }

      var rangeyears = [...new Set(years)];
      var rangemonths = [...new Set(months)];

      var lluvia_anual;
      var lluvia_filtrada = [];

      estaciones.forEach((est) => {
        lluvia_filtrada[est] = {};
        rangeyears.forEach((year) => {
          lluvia_filtrada[est][year.toString()] = [];
        });
      });

      lluvia_anual = lluvia_filtrada;

      rangeyears.forEach((year) => {
        var result = data.filter(function (obj) {
          return (
            obj.date >= new Date(year.toString()).toISOString() &&
            obj.date <= new Date((year + 1).toString()).toISOString()
          );
        });
        result.forEach((el) => {
          estaciones.forEach((est) => {
            if (isNaN(parseFloat(el[est]))) {
              lluvia_filtrada[est][year].push(0);
            } else {
              lluvia_filtrada[est][year].push(parseFloat(el[est]));
            }
          });
        });
      });

      estaciones.forEach((est) => {
        rangeyears.forEach((year) => {
          lluvia_anual[est][year] = Math.round(
            lluvia_filtrada[est][year].reduce((a, b) => a + b)
          );
        });
      });

      console.log(data);

      console.log(lluvia_filtrada);

      console.log(estaciones);

      console.log(lluvia_anual);

      const graficas = {
        LMN: [],
        PBV: [],
      };

      estaciones.forEach((est) => {
        if (estaciones.slice(10, 12).includes(est)) {
          graficas.PBV.push({
            name: est,
            type: "bar",
            smooth: true,
            data: Object.values(lluvia_anual[est]),
            animationDelay: function (idx) {
              return idx * 10 + 100;
            },
            symbolSize: 0.1,
            connectNulls: true,
            label: {
              normal: {
                show: true,
                position: "top",
              },
            }, 
            markLine: {
              data: [
                {
                  type: "average",
                  label: {
                    formatter: "Precipitación promedio anual",
                    position: "insideStartTop",
                  },
                },
              ],
              symbol: "none",
              lineStyle: { color: "rgba(41, 112, 255, 1)", width: 2.5 },
            }
          });
        } else {
          graficas.LMN.push({
            name: est,
            type: "bar",
            smooth: true,
            data: Object.values(lluvia_anual[est]),
            animationDelay: function (idx) {
              return idx * 10 + 100;
            },
            symbolSize: 0.1,
            connectNulls: true,
            markLine: {
              data: [
                {
                  type: "average",
                  label: {
                    formatter: "Precipitación promedio anual",
                    position: "insideStartTop",
                  },
                },
              ],
              symbol: "none",
              lineStyle: { color: "rgba(41, 112, 255, 1)", width: 2.5 },
            },
            label: {
              normal: {
                show: true,
                position: "top",
              },
            },
          });
        }
      });

      console.log(graficas);

      const listCharts = [];

      Object.keys(graficas).forEach((el, i) => {
        listCharts.push(
          <LluviaAnual
            key={i}
            title={el}
            series={rangeyears}
            datos={graficas[el]}
          />
        );
      });

      setCharts(listCharts);
    });
  }, []);

  return (
    <Aux>
      <Row>{charts}</Row>
    </Aux>
  );
}
