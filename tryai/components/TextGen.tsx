import {ChangeEvent, useState} from 'react';
import RangeSlider from '../components/RangeSlider'
import Header from '../components/Header'
import Button from '../components/Button';
import styles from '../styles/TextGen.module.scss'
import axios from 'axios';
import ScaleLoader from 'react-spinners/ScaleLoader'

type Props = {
    strings: {
        header: string,
        begin_text: string,
        geek_info: string,
        link: string
    }
    imgPath:string
    endpointName:string
}


export default function TextGen({strings, endpointName, imgPath}:Props) {

    const [numGenerate, setNumGenerate] = useState(200);
    const [text, setText] = useState({text: '', isLoading: false});
    const [seed, setSeed] = useState('Почему');
    const [error, setError] = useState('');

    const generateHandler = () => {
        if (seed.trim().length > 0) {
            setText({...text, isLoading: true})
            axios.get(`/api/${endpointName}?seed=${seed} &numGen=${numGenerate}`).then(res => {

                setText({text: res.data.data, isLoading: false});
            });
        }

    }
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {

        if (!/[^а-яА-ЯЁё\s]+/ig.test(e.target.value)) {
            setSeed(e.target.value);
            setError('');
        } else {
            setError('Только кирилица)');
        }
    }

    return (

        <div>
            <div style={{backgroundImage: `url("${imgPath}")`}} className={styles.image_holder}>
                <div>
                    {strings.header}
                </div>
            </div>
            <div className={styles.main}>
                <div className={styles.section}>
                    <h3>Как это работает</h3>
                    <p>
                        {strings.begin_text}
                    </p>
                </div>
                <div className={styles.section}>
                    <label>Начальное слово</label>

                    <input maxLength={40} placeholder='Я помню' type="text" value={seed} onChange={handleInputChange}/>
                    {error &&
                    <label className={styles.error}>{error}</label>
                    }
                    <RangeSlider value={numGenerate} setValue={setNumGenerate}/>
                    <Button handler={generateHandler} text={"Сгенерировать"}/>
                    {text.text && !text.isLoading && <pre>{text.text}</pre>}
                    {text.isLoading && <ScaleLoader css={`margin: 2em auto;`}/>}
                </div>

                <div className={styles.section}>
                    <h3>Немного инфы для гиков</h3>

                    <p>{strings.geek_info} <a href={strings.link}>{strings.link.slice(0, 30)}...</a></p>
                </div>
            </div>
        </div>
    )
}