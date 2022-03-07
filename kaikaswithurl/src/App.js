import React, { useState, useEffect } from 'react';
import logo from './ryuk.gif';
import './App.css';

const App = () => {
  const [accountInfo, setAccountInfo] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async() => {
    const urlParameter = window.location.href;
    const url = new URL(urlParameter);
    const urlParams = url.searchParams

    console.warn(url.search)

    if(!url.search) {
      console.warn("아무것도 없네~")
      return
    }

    const txInfo = {
      to: urlParams.get('to'),
      gas: urlParams.get('gas'),
      value: urlParams.get('value'),
      data: urlParams.get('data'),
    }

    await loadAccountInfo()
    await sendTransaction(txInfo)
  }, []);

  const isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  const loadAccountInfo = async () => {
    if (isMetaMaskInstalled) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccountInfo(accounts)
      } catch (error) {
        console.log('User denied account access')
      }
    } else {
      console.log('Non-Metamask browser detected. You should consider trying Metamask!')
    }
  };

  const sendTransaction = async (txInfo) => {
    const { to, gas, value, data } = txInfo
    const params = [
      {
        from: '0xe456064545F872B311aE7432689a0fECE90C9a29',
        to,
        gas,
        gasPrice: '0x9184e72a000', // 10000000000000
        value,
        data
      },
    ];

    console.log(params)

    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params,
      });

      if (wasAdded) {
        console.log('Thanks for your interest!');
      } else {
        console.log('Your loss!');
      }
    } catch (error) {
      console.log(error);
    }
  }

    
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>{accountInfo && accountInfo.length > 0 ? accountInfo[0] : "ㅋ"}</div>
        <button onClick={() => sendTransaction()}>zz</button>
      </header>
    </div>
  );
}

export default App;
