import React, { useState, useEffect } from "react";
import { Col, Card } from "react-bootstrap";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { csv } from "d3";
import ReactEcharts from "echarts-for-react";

const data = require("../../BD/Offline/PrecipitacionHistorica.csv");

export default function Precipitacion() {
  const [rangedate, onChange] = useState([new Date(), new Date()]);

  const [options, setOptions] = useState({
    dataZoom: [
      {
        start: 99,
        end: 100,
      },
    ],

    grid: {
      bottom: 95,
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
    },
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    csv(data).then((data) => {
      let xValues = [];

      let years = [];
      let months = [];

      for (let i = 0; i < data.length; i++) {
        data[i]["date"] = new Date(data[i]["Fecha"]).toISOString();
        xValues[i] = data[i]["Fecha"];
        years[i] = new Date(data[i]["Fecha"]).getFullYear();
        months[i] = new Date(data[i]["Fecha"]).getMonth();
      }

      var rangeyears = [...new Set(years)];
      var rangemonths = [...new Set(months)];

      var lluvia_anual = [];
      var sum_lluvia_anual = [];
      var lluvia_filtrada = [];

      rangeyears.forEach((year) => {
        var result = data.filter(function (obj) {
          return (
            obj.date >= new Date(year.toString()).toISOString() &&
            obj.date <= new Date((year + 1).toString()).toISOString()
          );
        });

        lluvia_anual.push(result);

      });

      for (let i = 0; i < lluvia_anual.length; i++) {
        if(!lluvia_filtrada[i]){
          lluvia_filtrada[i] = []
        }
        for (let j = 0; i < lluvia_anual[i][j].length; i++) {
          lluvia_filtrada[i][j] = lluvia_anual[i][j]['CDA']
        }
      }

      console.log(data);
      console.log(rangeyears);
      console.log(lluvia_anual[0][0]['CDA']);
      console.log(lluvia_filtrada)
    });
  }, []);

  useEffect(() => {
    console.log(rangedate);
  }, [rangedate]);

  return (
    <Col>
      <Card className="Recent-Users">
        <Card.Header>
          <div className="row align-items-center justify-content-center">
            <div className="col">
              <h5 className="m-0">Monitoreo Caudal Rio Rancheria</h5>
            </div>
            <div className="col-auto">
              <DateRangePicker onChange={onChange} value={rangedate} />
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
