import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Transfer = () => {
  const [chainID, setChainID] = useState(null);
  const [nftid, setNftid] = useState(null);
  const [address, setAddress] = useState('');
  const [nfts, setNfts] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [transactionUrl, setTransactionUrl] = useState('');

  useEffect(() => {
    axios.get('https://thentic.tech/api/nfts', {
      params: {
        'key': '3qEqOk95717CSm2lSZwxnns2mAOCPUxM',
        'chain_id': '97'
      }
    })
      .then(res => {console.log(res); setNfts(res.data.nfts);})
      .catch(err => console.log(err))
  });

  const handleClick = () => {
    if (transactionUrl) window.open(transactionUrl);
    else {
      const data = {
        'key': '3qEqOk95717CSm2lSZwxnns2mAOCPUxM',
        'chain_id': `${chainID}`,
        'contract': `${address}`,
        'nft_id': `${nftid}`,
        'from': `${from}`,
        'to': `${to}`
      }
      axios.post('https://thentic.tech/api/nfts/transfer', data)
        .then(res => {
          console.log(res);
          setTransactionUrl(res.data.transaction_url);
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '50%' }}>
        <h2>Please select NFT to transfer.</h2><br /><br />
        <div style={{ display: 'flex', marginBottom: '20px'}}>
          <h3 style={{ width: '50%' }}>Name</h3>
          <h3 style={{ width: '50%' }}>Contract Address</h3>
        </div>
        {nfts.map((nft, index) => {
          if (nft.status === 'success') return (
            <div key={index} style={{ display: 'flex', marginBottom: '10px' }} onClick={()=>{setAddress(nft.contract); setChainID(nft.chain_id); setNftid(nft.id);}}>
              <div style={{ width: '50%' }}>{nft.name}</div>
              <div style={{ width: '50%' }}>{nft.contract}</div>
            </div>
          );
        })}
      </div>
      <div style={{ width: '50%' }}>
        <h2>Transfer NFT</h2>
        <label for='ChainID'>ChainID : </label>
        <input placeholder='type chainID' id='ChainID' onChange={e => setChainID(e.target.value)} value={chainID} /><br /><br />
        <label for='contract'>Contract : </label>
        <input placeholder='type Contract Address' id='contract' onChange={e => setAddress(e.target.value)} value={address} /><br /><br />
        <label for='nftid'>NFT ID : </label>
        <input placeholder='type NFT id' id='nftid' onChange={e => setNftid(e.target.value)} value={nftid} /><br /><br />
        <label for='from'>from : </label>
        <input placeholder='type from address' id='from' onChange={e => setFrom(e.target.value)} /><br /><br />
        <label for='to'>to : </label>
        <input placeholder='type to address' id='to' onChange={e => setTo(e.target.value)} /><br /><br />
        <button onClick={handleClick}>{transactionUrl ? 'Continue' : 'Transfer NFT'}</button><br /><br />
      </div>
    </div>
  );
}

export default Transfer;