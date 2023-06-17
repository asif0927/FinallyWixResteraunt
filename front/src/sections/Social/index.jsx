import React, { useEffect, useState } from "react";
import { getAllSocials } from "../../api/socialrequest";

const Index = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllSocials().then((res) => {
      setData(res);
    });
  }, []);

  return (
    <div style={{ position: "fixed", top: "40%", left: "96%", transform: "translate(-50%, -50%)", zIndex: "12000" }}>
      {data &&
        data.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              backgroundColor: "white",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              margin: "10px",
              zIndex:"11000"
            }}
          >
            <a href={item.socialmediaurl}>
              <i className={item.iconurl} style={{color:"black"}}></i>
            </a>
          </div>
        ))}
    </div>
  );
};

export default Index;
