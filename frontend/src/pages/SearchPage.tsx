import React, { useEffect, useState } from 'react'
import {url} from '../App'
import TopBar from '../components/TopBar'
import SelectStore from '../components/SelectStore'
import style from '../styles/SearchPage.module.scss'
import '../styles/Global.scss'

import GroceryProducts from '../components/GroceryProducts'


export default function SearchPage() {

    const [select, setSelect] = useState<string[]>([])
    const [search, setSearch] = useState('')
    const [grocery, setGrocery] = useState([])
    const [showSelect, setShowSelect] = useState(false)


    async function searchGrocery() {
      await fetch(`${url}/groceries/willys?search=${search}`, {
        headers: {
            "Content-Type": "application/json"
        },
    })        
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setGrocery(data.results)
    })
    setSearch('')
    }



  return (
    <div>
          <TopBar
            showSelect={showSelect}
            setShowSelect={setShowSelect}
            setSearch={setSearch}
            search={search}
            searchGrocery={searchGrocery}
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
