import React, { useState, useEffect } from "react";
import { Col, Card } from "react-bootstrap";
import { csv } from "d3";
import ReactEcharts from "echarts-for-react";

const data = require("../../BD/Offline/Vert_Cloru.csv");

export default function VertCloru() {

  const [fechas, setfechas] = useState();

  const [options, setOptions] = useState({
    dataZoom: [{
        start: 97,
        end: 100
    }],

    grid: {
      bottom: 120
    },

    title: {
      text: "Discharge Chlorides - Ponds And Reservoir LMN",
      left: "center",
    },
    toolbox: {
      // y: 'bottom',
      feature: {
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
      name: "Concentrations (mg/L)",
      nameLocation: "center",
      nameGap: "50",
      splitNumber: 10,
      splitLine: { show: false }
    }
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    
    csv(data).then((data) => {
      let xValues = [];
      let lags = [];
      let verts = [];

      console.log(data);
      for (let i = 0; i < data.length; i++) {
        data[i]["date"] = new Date(data[i]["Fecha"]);
        xValues[i] = data[i]["Fecha"];
        lags = data.columns

        lags.forEach(el => {
            if(i === 0){
                verts[el] = []
            }
            verts[el][i] = data[i][el]
        });
      }

      lags.shift()

      console.log(lags)

      console.log(verts)

      let series = []

      let limite = new Array (verts['Fecha'].length).fill(800)

      lags.forEach(lag => {
          series.push(
            {
                name: lag,
                type: "scatter",
                smooth: true,
                data: verts[lag],
                label: {
                  show: true,
                  position: "top",
                  color: "rgba(0,0,0,1)"
                },
                animationDelay: function (idx) {
                  return idx * 10 + 100;
                },
                symbolSize: 10
              }
          )
      });

      series.push(
        {
            name: 'limite',
            type: "scatter",
            symbol: 'none',
            symbolSize: 10,
            data: limite,
            markLine: {
                data: [
                    {name: 'Limite Sulfatos', yAxis: 500, label: {formatter: 'Limit Chlorides (Res. 631/15)', position: 'insideStartTop'}}
                ],
                symbol: 'none',
                lineStyle: {color: "rgba(255, 51, 51)", width: 2.5}
            }
          }
      )

      setOptions((prevState) => ({
        ...prevState,
        legend: {
            data: lags,
            bottom: 45
        },
        xAxis: [
          {
            axisLabel: {
              rotate: 0,
            },
            data: xValues,
            splitLine: { show: false },
          },
        ],
        series: series
      }));
      setfechas(xValues)
    });
  }, []);

  let echarts_react;

  const onChangeRange = (...rest) => {
    const { startValue, endValue } = echarts_react.getEchartsInstance().getOption().dataZoom[0];
    console.log(startValue)
    echarts_react.getEchartsInstance().setOption({
      title: {
        subtext: "Fecha de reporte: " + fechas[startValue] + " - " + fechas[endValue],
        left: "center",
      }
    })
  };

  return (
    <Col md={6}>
      <Card className="Recent-Users">
        <Card.Header>
          <div className="row align-items-center justify-content-center">
            <div className="col">
              <h5 className="m-0">Reporte de Vertimientos Lagunas de Retención LMN</h5>
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
            onEvents={{
              datazoom: onChangeRange
            }}
          />
        </Card.Body>
      </Card>
    </Col>
  );
}