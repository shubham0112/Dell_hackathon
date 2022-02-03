import React from 'react';
import './Loader.css';

function Loader() {
  return <>
    <div class="outer">
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </>;
}

export default Loader;
