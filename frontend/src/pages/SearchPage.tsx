import React, { useEffect, useState } from 'react'
import {url} from '../App'
import TopBar from '../components/TopBar'
import SelectStore from '../components/SelectStore'
import style from '../styles/SearchPage.module.scss'
import '../styles/Global.scss'

import GroceryProducts from '../components/GroceryProducts'
import ErrorMessage from '../components/ErrorMessage'


export default function SearchPage() {

    const [select, setSelect] = useState<string[]>([])
    const [search, setSearch] = useState('')
    const [grocery, setGrocery] = useState([])
    const [showSelect, setShowSelect] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')


    async function searchGrocery() {
      console.log(select.length)
      if (select.length === 0) {
        setErrorMessage('Klicka på de butiker du vill handla hos')
        console.log(errorMessage)
      } else if(search == ''){
        setErrorMessage('Skriv in varan du vill jämföra i sökfältet')
      }else{
        setShowSelect(true)
        setGrocery([])
        await fetch(`${url}/groceries/searchGrocery`, {
          method: 'POST',
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({search, select}),
        })        
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setGrocery(data)
        })
      }
    }



  return (
    <div>
          <ErrorMessage
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
          <TopBar
            select={select}
            showSelect={showSelect}
            setShowSelect={setShowSelect}
            setSearch={setSearch}
            search={search}
            searchGrocery={searchGrocery}
            setErrorMessage={setErrorMessage}
          />
          <div className={style.content}>
            <SelectStore
              select={select}
              setSelect={setSelect}
              showSelect={showSelect}
              setShowSelect={setShowSelect}
            />
            <GroceryProducts
              showSelect={showSelect}
              grocery={grocery}
            />
          </div>
    </div>
  )
}
