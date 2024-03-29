import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";
import artifact from "../abi/MyCoin.json"

function Coin(props: { signer_address: string, friend_address: string }) {
  const provider = new ethers.providers.JsonRpcProvider();
  const coin_address = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  const signer = provider.getSigner(props.signer_address);
  const contract = new ethers.Contract(coin_address, artifact.abi, provider);
  const client = contract.connect(signer);

  const [isOwner, setIsOwner] = useState<boolean>(false)
  const [balance, setBalance] = useState<string>("")
  const [coinName, setCoinName] = useState<string>("")
  const [symbolName, setSymbolName] = useState<string>("")
  const { balanceOf, name, symbol, mint, approve, transfer, transferFrom } = client.functions;
  useEffect(() => {
    const setNameFunc = async () => {
      setCoinName((await name()).toString())
      setSymbolName((await symbol()).toString())
    }
    const setIsOwnerFunc = async () => {
      const owner = (await client.owner()).toString()
      const signer = (await client.signer.getAddress()).toString()
      setIsOwner(owner === signer)
    }
    setNameFunc()
    setIsOwnerFunc()
    setBalanceFunc()
  }, [])

  const setBalanceFunc = async () => {
    const ret = (await balanceOf(props.signer_address)).toString()
    setBalance(await ret)
  }

  const hundleMint = async () => {
    mint(props.signer_address, 100).then(() => {
      setBalanceFunc()
    }).catch((error) => {
      alert(error)
    })
  }

  const hundleApprove = async() => {
    await approve(props.friend_address, 100)
  }

  const hundleTransferFromFriend = async () => {
    transferFrom(props.friend_address, props.signer_address, 100).then(() =>{
      setBalanceFunc()
    }).catch((error) => {
      alert(error)
    })
  }

  const hundleTransfer = async() => {
    transfer(props.friend_address, 100).then(() => {
      setBalanceFunc()
    }).catch((error) => {
      alert(error)
    })
  }

  return (
    <>
    <div style={{margin: "10px 20px", borderRadius: "10px", boxShadow: "2px 2px 10px #bbb", padding: "20px"}}>
      <div>{coinName}</div>
      <div>user_address: {props.signer_address}{isOwner ? " (owner)" : ""}</div>
      <div>amount: {balance}{symbolName}</div>
      {isOwner ?
        <div>
          <button onClick={() => { hundleMint() }}>mint</button>
        </div> :
        null
      }
      <div>
        <button onClick={() => { hundleTransfer() }}>友人に転送する</button>
        <button onClick={() => { hundleApprove() }}>approve to transfer from friend</button>
        <button onClick={() => { hundleTransferFromFriend() }}>transfer from friend</button>
      </div>
    </div>
    </>
  )
}

export default Coin;