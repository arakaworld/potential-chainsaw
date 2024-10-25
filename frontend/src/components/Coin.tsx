import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";
import artifact from "../abi/MyCoin.json"

const provider = new ethers.providers.JsonRpcProvider();
const coin_address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

async function getContract(signer_address: string) {
  const signer = provider.getSigner(signer_address);
  const contract = new ethers.Contract(coin_address, artifact.abi, provider);
  return contract.connect(signer);
}

async function getCoinName(client: any) {
  return (await client.name()).toString();
}

async function getSymbolName(client: any) {
  return (await client.symbol()).toString();
}

async function getIsOwner(client: any) {
  const owner = (await client.owner()).toString();
  const signer = (await client.signer.getAddress()).toString();
  return owner === signer;
}

async function getBalance(client: any, address: string) {
  return (await client.balanceOf(address)).toString();
}

async function handleMint(client: any, address: string) {
  try {
    await client.mint(address, 100);
    return true;
  } catch (error) {
    alert(error);
    return false;
  }
}

async function handleApprove(client: any, address: string) {
  try {
    await client.approve(address, 100);
    return true;
  } catch (error) {
    alert(error);
    return false;
  }
}

async function handleTransfer(client: any, address: string) {
  try {
    await client.transfer(address, 100);
    return true;
  } catch (error) {
    alert(error);
    return false;
  }
}

async function handleTransferFrom(client: any, from: string, to: string) {
  try {
    await client.transferFrom(from, to, 100);
    return true;
  } catch (error) {
    alert(error);
    return false;
  }
}

function Coin(props: { signer_address: string, friend_address: string }) {
  const [client, setClient] = useState<any>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [balance, setBalance] = useState<string>("");
  const [coinName, setCoinName] = useState<string>("");
  const [symbolName, setSymbolName] = useState<string>("");

  useEffect(() => {
    const init = async () => {
      const client = await getContract(props.signer_address);
      setClient(client);
      setCoinName(await getCoinName(client));
      setSymbolName(await getSymbolName(client));
      setIsOwner(await getIsOwner(client));
      setBalance(await getBalance(client, props.signer_address));
    };
    init();
  }, [props.signer_address]);

  const refreshBalance = async () => {
    if (client) {
      setBalance(await getBalance(client, props.signer_address));
    }
  };

  return (
    <div style={{ margin: "10px 20px", borderRadius: "10px", boxShadow: "2px 2px 10px #bbb", padding: "20px" }}>
      <div>{coinName}</div>
      <div>user_address: {props.signer_address}{isOwner ? " (owner)" : ""}</div>
      <div>amount: {balance}{symbolName}</div>
      {isOwner ?
        <div>
          <button onClick={async () => { if (await handleMint(client, props.signer_address)) refreshBalance(); }}>mint</button>
        </div> :
        null
      }
      <div>
        <button onClick={async () => { if (await handleTransfer(client, props.friend_address)) refreshBalance(); }}>友人に転送する</button>
        <button onClick={async () => { await handleApprove(client, props.friend_address); }}>approve to transfer from friend</button>
        <button onClick={async () => { if (await handleTransferFrom(client, props.friend_address, props.signer_address)) refreshBalance(); }}>transfer from friend</button>
      </div>
    </div>
  );
}

export default Coin;
