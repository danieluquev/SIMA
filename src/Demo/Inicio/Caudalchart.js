import React, { useState, useEffect } from "react";
import { Col, Card } from "react-bootstrap";
import { csv } from "d3";
import ReactEcharts from "echarts-for-react";

const data = require("../../BD/Offline/Caudal_RioRan.csv");


export default function Caudalchart() {
  const [options, setOptions] = useState({
    dataZoom: [{
        start: 50,
        end: 100
    }],

    grid: {
      bottom: 95
    },

    title: {
      text: "Flow R. Rancheria Vs Time",
      subtext: "Downstream - S109 Cuestecita",
      left: "center",
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
      name: "Flow (m3/s)",
      nameLocation: "center",
      nameGap: "30",
      splitLine: { show: false },
      splitNumber: 10
    }
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    
    csv(data).then((data) => {
      let xValues = [];
      let Caudales = [];

      console.log(data);
      for (let i = 0; i < data.length; i++) {
        data[i]["date"] = new Date(data[i]["Fecha"]);
        xValues[i] = data[i]["Fecha"];
        Caudales[i] = data[i]["Caudal"];
      }

      setOptions((prevState) => ({
        ...prevState,
        xAxis: [
          {
            axisLabel: {
              rotate: 90,
            },
            data: xValues,
            splitLine: { show: false },
          },
        ],
        series: [
          {
            name: "Caudal",
            type: "line",
            smooth: true,
            data: Caudales,
            lineStyle: {
              color: "rgba(9, 97, 205, 1)"
            },
            areaStyle: {
              color: "rgba(119, 167, 234, 0.5)"
            },
            label: {
              show: true,
              position: "top",
              color: "rgba(0,0,0,1)"
            },
            animationDelay: function (idx) {
              return idx * 10 + 100;
            },
            symbolSize: 0.1
          }
        ]
      }));

    });
  }, []);

  return (
    <Col md={6}>
      <Card className="Recent-Users">
        <Card.Header>
          <div className="row align-items-center justify-content-center">
            <div className="col">
              <h5 className="m-0">Monitoreo Caudal Rio Rancheria</h5>
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
