import React, { useState, useEffect } from "react";
import { Col, Card } from "react-bootstrap";
import ReactEcharts from "echarts-for-react";
import { set } from "d3";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

export default function Caudalchart(props) {

  const [value, onChange] = useState([new Date(), new Date()])

  let echarts_react;

  const [fechas, setfechas] = useState();

  const [range, setrange] = useState(["", ""]);

  const [options, setoption] = useState({
    dataZoom: [
      {
        start: 0,
        end: 10,
      },
    ],
    legend: {
      bottom: 45,
    },

    grid: {
      bottom: 120,
    },

    title: {
      text: props.parametro,
      subtext: "-",
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
    tooltip: {
      trigger: "axis",
      axisPointer: {
        label: {
          show: true,
        },
      },
    },
    yAxis: {
      name: props.unidades,
      nameLocation: "center",
      nameGap: "30",
      splitLine: { show: false },
      splitNumber: 10,
    },
    series: [],
    xAxis: [
      {
        data: props.fechas,
        splitLine: { show: false },
      },
    ],
  });

  useEffect(() => {
    setoption((prevState) => ({
      ...prevState,
      series: props.series,
    }));

    setfechas(props.fechas);
  }, []);

  const onChangeRange = (...rest) => {
    const {
      startValue,
      endValue,
    } = echarts_react.getEchartsInstance().getOption().dataZoom[0];
    console.log(startValue);
    echarts_react.getEchartsInstance().setOption({
      title: {
        text: props.parametro,
        subtext:
          "Fecha de reporte: " + fechas[startValue] + " - " + fechas[endValue],
        left: "center",
      },
    });
  };

  return (
    <Col md={6}>
      <Card className="Recent-Users">
        <Card.Header>
          <div className="row align-items-center justify-content-center">
            <div className="col">
              <h5 className="m-0">{props.parametro}</h5>
            </div>
            <DateRangePicker onChange={onChange} value={value} />
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
              datazoom: onChangeRange,
            }}
          />
        </Card.Body>
      </Card>
    </Col>
  );
}
