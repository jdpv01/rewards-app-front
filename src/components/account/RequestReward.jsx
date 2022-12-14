import { Button, List, message, Typography } from "antd";
import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthProvider";

const { Title } = Typography;

const RequestReward = () => {

  const { auth, data } = useContext(AuthContext);
  const { accessToken, id: userId } = auth;
  const { storeToRedeem } = data;

  const URL_REDEEM = '/rewards/request-reward';
  const URL_GET_ALL_REWARDS = '/rewards/get-all-rewards';

  const [rewards, setRewards] = useState([]);
  const [codeForRedemption, setCodeForRedemption] = useState('');

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const res = await axios.get(
        URL_GET_ALL_REWARDS,
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
      const stores = res.data.filter(store => store.description.includes(storeToRedeem));
      setRewards(stores);
    } catch (err) {
      message.error('Error al solicitar los bonos disponibles!')
    }
  }

  const getDescription = (requiredPoints, validityDate) => (
    <>
      <p style={{ fontSize: 20 }}><strong>Puntos requeridos: </strong>{requiredPoints}</p>
      <p style={{ fontSize: 20 }}><strong>Válido hasta: </strong>{validityDate ?? 'indefinido'}</p>
    </>
  )

  const onRedeem = async (rewardId) => {
    let formData = new FormData();
    formData.append('userId', userId);
    formData.append('rewardId', rewardId);
    console.log({userId, rewardId});
    try {
      const res = await axios.post(
        URL_REDEEM,
        formData,
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
      const { code } = res.data;
      setCodeForRedemption(code);
    } catch (err) {
      message.error('Error al intentar redimir, intente más tarde.')
    }
  }

  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={rewards}
      renderItem={(reward) => {
        const { id, description, link, image, availableQuantity, requiredPoints, validityDate } = reward;
        return (
          availableQuantity &&
          <List.Item key={id} actions={[
            !codeForRedemption && <Button onClick={() => onRedeem(id)} >Redimir</Button>,
          ]}>
            <List.Item.Meta
              title={<a href={link} ><h3>{description}</h3></a>}
              description={getDescription(requiredPoints, validityDate)}
            />
            <img
              width={270}
              alt="reward"
              src={image}
            />
            {codeForRedemption && <Title level={2} code copyable strong >{codeForRedemption}</Title>}
          </List.Item>
        )
      }}
    />
  )
}

export default RequestReward;