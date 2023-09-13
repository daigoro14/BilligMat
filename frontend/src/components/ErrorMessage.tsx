import React, { useEffect, useState } from 'react'
import style from '../styles/ErrorMessage.module.scss'

export default function ErrorMessage(props: any) {

    const [showMessage, setShowMessage] = useState(false)
    const message = props.errorMessage
    const setMessage = props.setErrorMessage


    useEffect(() => {
        if (message) {
            setShowMessage(true)

            const timeoutId = setTimeout(() => {
                setShowMessage(false);
                setMessage('')
              }, 2000);
          
              return () => {
                clearTimeout(timeoutId);
              };
            
            
        }
    }, [message])

  return (
    <div className={`${style.errorContainer} ${showMessage ? style.showError : style.hideError}`}>
        <h1>{message}</h1>
    </div>
  )
}
