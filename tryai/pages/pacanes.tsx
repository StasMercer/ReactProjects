import React from 'react'
import Header from '../components/Header'

import {textGenNames} from "../utils/types";
import strings from "../utils/strings";
import TextGen from "../components/TextGen";


export default function PacanesPage() {
    const text_info:textGenNames = {
        header: "Генерация цитат",
        begin_text: strings.pacanes_text,
        geek_info: strings.pacanes_geek_info,
        link: strings.pacanes_link
    }
    const imgPath = "/images/pacanes_placeholder.png"

    return (
        <div>
            <Header/>
            <TextGen imgPath={imgPath} strings={text_info} endpointName={"pacanes"} />
        </div>
    )
}
