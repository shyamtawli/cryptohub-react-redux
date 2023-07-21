import React, { useState, useEffect } from "react";
import axios from "axios";
import millify from "millify";
import Loader from "./Loader";
import { Table } from "antd";

function Exchanges() {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/exchanges")
      .then((res) => {
        setExchanges(res.data);
        setLoading(false);
        // console.log(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  if (loading) return <Loader />;

  const columns = [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
    },
    {
      title: "Logo",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} style={{ borderRadius: "50%" }} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "24h Vol BTC",
      dataIndex: "trade_volume_24h_btc",
      key: "trade_volume_24h_btc",
    },
    {
      title: "Trust Score",
      dataIndex: "trust_score",
      key: "trust_score",
    },
    {
      title: "Year Established",
      dataIndex: "year_established",
      key: "year_established",
    },
  ];

  const data = exchanges.map((exchange) => {
    const list = {
      key: exchange.id,
      rank: exchange.trust_score_rank,
      name: exchange.name,
      image: exchange.image,
      trade_volume_24h_btc: `$${millify(exchange.trade_volume_24h_btc)}`,
      trust_score: exchange.trust_score,
      year_established: exchange.year_established,
    };

    return list;
  });

  console.log(data);

  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
}

export default Exchanges;
