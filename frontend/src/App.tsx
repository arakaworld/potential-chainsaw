import React from 'react';
import Coin from "./components/Coin"

import './App.css';

function App() {
  const coins = [
    {
      signer_address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      friend_address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
    },
    {
      signer_address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
      friend_address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    }
  ];

  return (
    <>
      {coins.map((coin, index) => (
        <Coin
          key={index}
          signer_address={coin.signer_address}
          friend_address={coin.friend_address}
        />
      ))}
    </>
  );
}

export default App;
