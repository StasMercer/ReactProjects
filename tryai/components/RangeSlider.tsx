import React from 'react'
import styles from '../styles/RangeSlider.module.scss'

type Props ={
    value: number
    setValue: (value:number)=>void
}

export default function RangeSlider({value, setValue}:Props) {

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setValue(+event.target.value)
    }
    return (
        <div className={styles.main}>
            <label>Число символов</label>
            <div className={styles.slider}>
                <input 
                        id="typeinp" 
                        type="range" 
                        min="100" max="500" 
                        value={value} 
                        onChange={handleChange}
                        step="100"/>
                <label >{value}</label>
            </div>
        </div>
    )
}
