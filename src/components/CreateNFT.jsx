import React, { useState } from 'react';
import axios from 'axios';

const CreateNFT = () => {

  const [chainID, setChainID] = useState();
  const [NFTName, setNFTName] = useState('');
  const [shortName, setShortName] = useState('');
  const [transactionurl, setTransactionurl] = useState('');


  const handleClick = () => {
    if(transactionurl) window.open(transactionurl);
    else{
      const data = {
        'key': '3qEqOk95717CSm2lSZwxnns2mAOCPUxM',
        'chain_id': `${chainID}`,
        'name': `${NFTName}`,
        'short_name': `${shortName}`
      }
      axios.post('https://thentic.tech/api/nfts/contract', data)
        .then(res => { 
          console.log(res);
          setTransactionurl(res.data.transaction_url)
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <div>
      <h2>Create NFT</h2>
      <label for='ChainID'>ChainID : </label>
      <input placeholder='type chainID' id='ChainID' onChange={e => setChainID(e.target.value)} /><br /><br />
      <label for='NFTname'>NFTname : </label>
      <input placeholder='type NFT name' id='NFTname' onChange={e => setNFTName(e.target.value)} /><br /><br />
      <label for='Shortname'>Short NFTname : </label>
      <input placeholder='type NFT shortname' id='Shortname' onChange={e => setShortName(e.target.value)} /><br /><br />
      <button onClick={handleClick}>{transactionurl ? 'Deploy Contract' : 'Create NFT'}</button><br /><br />
    </div>
  );
}

export default CreateNFT;
