import React from 'react';
import Coin from "./components/Coin"

import './App.css';

function App() {
  return (
    <>
      <Coin
        signer_address="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
        friend_address="0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
      />
      <Coin
        signer_address="0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
        friend_address="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
      />
    </>
  )
}

export default App;