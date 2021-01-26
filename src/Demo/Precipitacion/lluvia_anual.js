import React, { useState, useEffect } from "react";
import { Col, Card } from "react-bootstrap";
import ReactEcharts from "echarts-for-react";

export default function LluviaAnual(props) {
  let echarts_react;

  const [options, setOptions] = useState({
    dataZoom: [
      {
        start: 0,
        end: 100,
      },
    ],

    grid: {
      bottom: 135,
    },

    title: {
      text: "PRECIPITACIÓN ANUAL",
      subtext: "",
      left: "center",
    },
    legend: {
      bottom: 45,
      selected: {
        COTORRA: false,
        FOOTWALL: false,
        "LA PUENTE": false,
        "OREGANAL 1/3": false,
        "BASE 45": false,
        "T. ANNEX": false,
        "PIT SUR - PATILLA": false,
        TABACO: false,
        "OREGANAL 2": false,
      },
    },
    toolbox: {
      // y: 'bottom',
      feature: {
        magicType: {
          type: ["bar", "line"],
          title: ["Barras", "Linea"],
        },
        dataView: {
          title: "Revisar datos",
          lang: ["Tabla de datos", "Cerrar", "Actualizar"],
        },
        saveAsImage: {
          pixelRatio: 2,
          title: "Descargar imagen",
        },
        myTool1: {
          show: true,
          title: "Añadir/Eliminar promedio",
          icon:
            "path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891",
          onclick: function () {
            echarts_react.getEchartsInstance().setOption({
              title: {
                subtext: "Fecha de reporte:",
              },
            });
          },
        },
      },
    },
    tooltip: {},
    series: props.datos,
    xAxis: [
      {
        axisLabel: {
          show: true,
          rotate: 90,
        },
        data: props.series,
        splitLine: { show: false },
      },
    ],
    yAxis: {
      name: "mm",
      nameLocation: "center",
      nameGap: "40",
      splitNumber: 10,
      splitLine: { show: false },
    },
  });

  return (
    <Col md={6}>
      <Card className="Recent-Users">
        <Card.Header>
          <div className="row align-items-center justify-content-center">
            <div className="col">
              <h5 className="m-0">{"Lluvia Anual " + props.title}</h5>
            </div>
          </div>
        </Card.Header>
        <Card.Body className="px-0 py-2 justify-content-center row align-items-center">
          <ReactEcharts
            option={options}
            style={{ height: "569px", width: "95%" }}
            ref={(e) => {
              echarts_react = e;
            }}
          />
        </Card.Body>
      </Card>
    </Col>
  );
}
