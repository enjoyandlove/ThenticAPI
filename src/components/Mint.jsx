import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Mint = () => {
  const [chainID, setChainID] = useState(null);
  const [NFTId, setNFTId] = useState(null)
  const [NFTName, setNFTName] = useState('');
  const [description, setDescription] = useState('');
  const [minter, setMinter] = useState('');
  const [transactionUrl, setTransactionUrl] = useState('');
  const [contracts, setContracts] = useState([]);
  const [address, setAddress] = useState('');

  useEffect(() => {
    axios.get('https://thentic.tech/api/contracts', {
      params: {
        'key': '3qEqOk95717CSm2lSZwxnns2mAOCPUxM',
        'chain_id': '97'
      }
    })
      .then(res => {console.log(res); setContracts(res.data.contracts);})
      .catch(err => console.log(err))
  });

  const handleClick = () => {
    if (transactionUrl) window.open(transactionUrl);
    else {
      const nftdata = JSON.stringify({
        'name': `${NFTName}`,
        'description': `${description}`,
        'url': 'https://picsum.photos/200/300'
      })
      const data = {
        'key': '3qEqOk95717CSm2lSZwxnns2mAOCPUxM',
        'chain_id': `${chainID}`,
        'contract': `${address}`,
        'nft_id': `${NFTId}`,
        'nft_data': `${nftdata}`,
        'to': `${minter}`
      }
      axios.post('https://thentic.tech/api/nfts/mint', data)
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
        <h2>Please select collection where you want to mint your NFT.</h2><br /><br />
        <div style={{ display: 'flex', marginBottom: '20px'}}>
          <h3 style={{ width: '50%' }}>Name</h3>
          <h3 style={{ width: '50%' }}>Contract Address</h3>
        </div>
        {contracts.map((contract, index) => {
          if (contract.status === 'success') return (
            <div key={index} style={{ display: 'flex', marginBottom: '10px' }} onClick={()=>{setAddress(contract.contract); setChainID(contract.chain_id);}}>
              <div style={{ width: '50%' }}>{contract.name}</div>
              <div style={{ width: '50%' }}>{contract.contract}</div>
            </div>
          );
        })}
      </div>
      <div style={{ width: '50%' }}>
        <h2>Mint NFT</h2>
        <label for='ChainID'>ChainID : </label>
        <input placeholder='type chainID' id='ChainID' onChange={e => setChainID(e.target.value)} value={chainID}/><br /><br />
        <label for='NFTID'>NFT ID : </label>
        <input placeholder='type NFTID' id='NFTID' onChange={e => setNFTId(e.target.value)} /><br /><br />
        <label for='collection'>Collection : </label>
        <input placeholder='type Collection' id='collection' onChange={e => setAddress(e.target.value)} value={address}/><br /><br />
        <label for='NFTname'>NFTname : </label>
        <input placeholder='type NFT name' id='NFTname' onChange={e => setNFTName(e.target.value)} /><br /><br />
        <label for='desc'>Description : </label>
        <input placeholder='type description' id='desc' onChange={e => setDescription(e.target.value)} /><br /><br />
        <label for='to'>Minter : </label>
        <input placeholder='type your address' id='to' onChange={e => setMinter(e.target.value)} /><br /><br />
        <button onClick={handleClick}>{transactionUrl ? 'Continue' : 'Mint NFT'}</button><br /><br />
      </div>

    </div>
  );
}

export default Mint;