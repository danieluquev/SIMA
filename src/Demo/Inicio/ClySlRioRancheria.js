import React, { useState, useEffect } from "react";
import { Col, Card } from "react-bootstrap";
import { csv } from "d3";
import ReactEcharts from "echarts-for-react";

const data = require("../../BD/Offline/ClySl_RioRan.csv");

export default function ClySlRioRancheria() {

  const [options, setOptions] = useState({
    dataZoom: [{
        start: 97,
        end: 100
    }],

    grid: {
      bottom: 120
    },

    title: {
      text: "CHLORIDES AND SULPHATES R RANCHERIA",
      subtext: "Downstream and Upstream",
      left: "center",
    },
    legend: {
        data: ['S112 - Palomino (Upstream Chlorides)', 'S109 - Cuestecita (Downstream Chlorides)', 'S112 - Palomino (Upstream Sulphates)', 'S109 - Cuestecita (Downstream Sulphates)'],
        bottom: 45
    },
    toolbox: {
      // y: 'bottom',
      feature: {
        magicType: {
          type: ["bar", "line"],
          title: ['Barras', 'Linea']
        },
        dataView: {
          title: 'Revisar datos',
          lang: ['Tabla de datos', 'Cerrar', 'Actualizar']
        },
        saveAsImage: {
          pixelRatio: 2,
          title: 'Descargar imagen'
        },
      },
    },
    tooltip: {},
    xAxis: [
      {
        axisLabel: {
          rotate: 90,
        },
        data: [],
        splitLine: { show: false },
      },
    ],
    yAxis: {
      name: "Concentraciones (mg/L)",
      nameLocation: "center",
      nameGap: "40",
      max: 500,
      splitNumber: 10,
      splitLine: { show: false }
    }
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    
    csv(data).then((data) => {
      let xValues = [];
      let Up_Cl = [];
      let Up_Sl = [];
      let Down_Cl = [];
      let Down_Sl = []

      console.log(data);
      for (let i = 0; i < data.length; i++) {
        data[i]["date"] = new Date(data[i]["Fecha"]);
        xValues[i] = data[i]["Fecha"];
        Up_Cl[i] = data[i]["S112 - Palomino (Upstream Chlorides)"];
        Down_Cl[i] = data[i]["S109 - Cuestecita (Downstream Chlorides)"];
        Up_Sl[i] = data[i]["S112 - Palomino (Upstream Sulphates)"];
        Down_Sl[i] = data[i]["S109 - Cuestecita (Downstream Sulphates)"];
      }

      setOptions((prevState) => ({
        ...prevState,
        xAxis: [
          {
            axisLabel: {
              rotate: 0,
            },
            data: xValues,
            splitLine: { show: false },
          },
        ],
        series: [
          {
            name: "S112 - Palomino (Upstream Chlorides)",
            type: "bar",
            smooth: true,
            data: Up_Cl,
            label: {
              show: true,
              position: "top",
              color: "rgba(0,0,0,1)"
            },
            animationDelay: function (idx) {
              return idx * 10 + 100;
            },
            symbolSize: 0.1
          },{
            name: "S109 - Cuestecita (Downstream Chlorides)",
            type: "bar",
            smooth: true,
            data: Down_Cl,
            label: {
              show: true,
              position: "top",
              color: "rgba(0,0,0,1)"
            },
            animationDelay: function (idx) {
              return idx * 10 + 100;
            },
            symbolSize: 0.1,
            markLine: {
                data: [
                    {name: 'Limite Sulfatos', yAxis: 250, label: {formatter: 'Límite máximo permisible Cloruros (D.1594/84)', position: 'insideEndTop'}}
                ],
                symbol: 'none',
                lineStyle: {color: "rgba(255, 192, 0, 1)", width: 2.5}
            }
          },{
            name: "S112 - Palomino (Upstream Sulphates)",
            type: "bar",
            smooth: true,
            data: Up_Sl,
            label: {
              show: true,
              position: "top",
              color: "rgba(0,0,0,1)"
            },
            animationDelay: function (idx) {
              return idx * 10 + 100;
            },
            symbolSize: 0.1
          },{
            name: "S109 - Cuestecita (Downstream Sulphates)",
            type: "bar",
            smooth: true,
            data: Down_Sl,
            label: {
              show: true,
              position: "top",
              color: "rgba(0,0,0,1)"
            },
            animationDelay: function (idx) {
              return idx * 10 + 100;
            },
            symbolSize: 0.1,
            markLine: {
                data: [
                    {name: 'Limite Sulfatos', yAxis: 400, label: {formatter: 'Límite máximo permisible Sulfatos (D.1594/84)', position: 'insideStartTop'}}
                ],
                symbol: 'none',
                lineStyle: {color: "#000", width: 2.5}
            }
          }
        ]
      }));

    });
  }, []);


  return (
    <Col md={6}>
      <Card className ="Recent-Users">
        <Card.Header>
          <div className="row align-items-center justify-content-center">
            <div className="col">
              <h5 className="m-0">Monitoreo Cloruros y Sulfatos Rio Rancheria</h5>
            </div>
          </div>
        </Card.Header>
        <Card.Body className="px-0 py-2 justify-content-center row align-items-center">
          <ReactEcharts
            option={options}
            style={{ height: "569px", width: "95%" }}
          />
        </Card.Body>
      </Card>
    </Col>
  );
}
