import React from 'react'
import style from '../styles/TopBar.module.scss'

export default function TopBar(props: any) {

    const showSelect = props.showSelect
    const setShowSelect = props.setShowSelect
    const setSearch = props.setSearch
    // const search = props.search
    const searchGrocery = props.searchGrocery

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
          // Handle the Enter key press here
          searchGrocery();
        }
      };

  return (
    <div className={style.topBar}>
        {/* <h1>Billig Mat</h1> */}
        <div className={style.searchDiv}>
          <input 
            placeholder="Sök varor" 
            type="text" 
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearch(e.target.value)}/>
          <button onClick={searchGrocery}>Sök</button>
        </div>
        <div className={style.storeButton} onClick={() => {showSelect ? setShowSelect(false) : setShowSelect(true)}}>
            <h3>Välj butik</h3>
            <svg className={`${style.arrow} ${showSelect ? style.arrowUp : style.arrowDown}`} viewBox="0 0 251 155" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.1599 15.7161L70.291 77.9153L124.292 138.84C124.643 139.236 124.819 139.434 125.019 139.522C125.276 139.635 125.568 139.635 125.825 139.522C126.025 139.434 126.201 139.236 126.552 138.84L235.684 15.7161" stroke="black" stroke-width="30" stroke-linecap="round"/>
            </svg>
        </div>
    </div>
  )
}
