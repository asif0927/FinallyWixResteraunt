import React, { useEffect, useState } from 'react';
import { getAllAddresses } from '../../api/adressrequest';

const Index = () => {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const addressesData = await getAllAddresses();
        setAddresses(addressesData);
      } catch (error) {
        console.error('Failed to retrieve addresses:', error);
      }
    };

    fetchAddresses();
  }, []);

  return (
    <>
      <section style={{ marginTop: "60px", backgroundColor: "black" }}>
        {addresses.map((address) => (
          <h4 key={address.id} style={{ textAlign: "center", fontSize: "14px", color: "rgb(174, 154, 100)" ,padding:"20px 0"}}>
            {address.street}
            {address.city}, {address.state} {address.zipCode}. Tel &nbsp;{address.telephone}
          </h4>
        ))}
      </section>
    </>
  );
}

export default Index;  