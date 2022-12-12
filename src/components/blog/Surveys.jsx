import React from "react";
import { Col, List, Row } from "antd";

const Surveys = () => {

  const surveys = [
    {
      link: "https://questionpro.com/t/AW5JeZv9Q1",
      text: "Encuesta de satisfacción en el Éxito",
    },
    {
      link: "https://questionpro.com/t/AW5JeZv9U3",
      text: "Encuesta de satisfacción del sitio web Efipuntos",
    },
    {
      link: "https://questionpro.com/t/AW5JeZv9Rc",
      text: "Encuesta de satisfacción de compra de productos Colgate",
    }
  ]

  return (
    <Row justify="center">
      <Col >
        <List
          dataSource={surveys}
          renderItem={(survey) => (
            <List.Item>
              <a href={survey.link}>{survey.text}</a>
            </List.Item>
          )}
        />
      </Col>
    </Row>
  )
}

export default Surveys;