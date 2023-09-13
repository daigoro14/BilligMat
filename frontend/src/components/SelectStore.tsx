import React, { useState } from 'react'
import style from '../styles/SelectStore.module.scss'

export default function SelectStore(props: any) {

    const showSelect = props.showSelect
    const setShowSelect = props.setShowSelect
    const select = props.select
    const setSelect = props.setSelect

    const checkSelect = (store: string) => {
        if (select.includes(store)) {
            const unselectStore = select.filter((item: string) => item !== store);
            setSelect(unselectStore)
        } else {
            setSelect((prevItems: string[]) => [...prevItems, store]);
        }
      };


  return (
    <div className={`${style.slideContent} ${showSelect ? style.hideSlideContent : ''}`}>
        <div 
            className={`${style.imageDiv} ${select.includes("willys") ? style.select : ""}`}
            onClick={() => checkSelect('willys')}
        >
            <svg className={style.willysSvg}xmlns="http://www.w3.org/2000/svg" viewBox="0 0 306.3 63.7" xmlSpace="preserve"><title>Willys</title><path fill-rule="evenodd" clip-rule="evenodd" fill="#E60019" d="M164.5 17.8h-7.1V7.6H186v10.2h-6.9v30.8h4.4l1-5.4.2-.1h.2l.1.1h10.9v17.4h-38.5v-9l7.1-1.6z" data-darkreader-inline-fill="" style={{ fill: '#ff2b42' }}></path><path fill-rule="evenodd" clip-rule="evenodd" d="M3.2 17.8V7.6h23.6v10.2H22l4.1 21 7.1-31.2h15.1l7 30.6 4.6-20.4h-5V7.6h22.7v10.2h-3.3L63.7 60.6H45.9L40 30.2l-6.6 30.4H16.5L6.2 17.8z"></path><path fill-rule="evenodd" clip-rule="evenodd" fill="#E60019" d="M120.5 17.8h-7.1V7.6H142v10.2h-6.9v30.8h4.4l1-5.4h.1l.1-.1h.2l.2.1h10.8v17.4h-38.5v-9l7.1-1.6z" data-darkreader-inline-fill="" style={{ fill: '#ff2b42' }}></path><path fill-rule="evenodd" clip-rule="evenodd" d="M195.3 17.8V9.7l-.1-1 .1-1.1H216l1 .1 1-.1v10.2h-3.1l4.6 10 5-10h-3.4V7.6h22.6v10.2H240l-12.9 25.4V50l6.4 1.6v9h-28.6v-9l7-1.6v-6.8l-5.4-9.8-1.3-2.7-7-12.9zM267.2 19.3c.6-2.5 1.6-4.2 3.1-6.3l1.4-1.4 1.6-1.3c3.3-2.1 6.7-2.9 10.5-3.4l1-.1h3.8l1.8.1 1.8.2 1.8.2 1.8.2 1.8.3 1.8.3 1.8.3v15.5h-12.6v-5.1h-1.1l-1.3.3-1.8.7c-2.5 1.4-2.9 3.9-.3 5.5l.8.5 1.7.7 2.6.9 1.3.5c3.5 1.4 7.4 3.2 9.9 6l1.2 1.7c2.1 4.1 2.2 6.7 1.1 11.1l-.2.8c-1.6 5-4.5 8.4-9.5 10.9l-1.8.8c-5.6 2.1-10.4 2-16.4 1.6l-1.7-.2-5-.9V43.2h12.1V48h3.9l1.6-.6.3-.1c2.4-1.8 1.4-3.7-.3-5.3l-.3-.2-1.8-.7-2.1-.7-2.1-.7-2.1-.8-3-1.3-1.8-1.2-1.6-1.4-1.3-1.6-1.1-1.6-.8-1.5-.3-.8c-1-3.7-1.2-6.6-.2-10.2M81 21.4h19.7l.5.1.6-.1h.6V50l5.6 1.6v9H81v-9l6.7-1.6V32H81z"></path><g fill-rule="evenodd" clip-rule="evenodd"><path d="M95.1 2.3c4.7 0 8.5 3.8 8.5 8.5s-3.8 8.5-8.5 8.5-8.5-3.8-8.5-8.5c.1-4.8 3.9-8.5 8.5-8.5M251.4 23.5c4.7 0 8.5 3.8 8.5 8.5s-3.8 8.5-8.5 8.5-8.5-3.8-8.5-8.5 3.8-8.5 8.5-8.5M251.4 44.8c4.7 0 8.5 3.8 8.5 8.5s-3.8 8.5-8.5 8.5-8.5-3.8-8.5-8.5 3.8-8.5 8.5-8.5"></path></g></svg>
        </div>
    </div>
  )
}
