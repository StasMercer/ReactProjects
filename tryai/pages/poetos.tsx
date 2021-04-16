import Header from '../components/Header'
import strings from '../utils/strings'
import TextGen from "../components/TextGen";
import {textGenNames} from "../utils/types";



export default function PoetosPage() {
    const text_info:textGenNames = {
        header: "Генерация стихов",
        begin_text: strings.poetos_text,
        geek_info: strings.poetos_geek_info,
        link: strings.poetos_link
    }
    const imgPath = "/images/poets_placeholder.jpg"

    return (
        <div>
            <Header/>
            <TextGen imgPath={imgPath} strings={text_info} endpointName={"poetos"} />
        </div>
    )
}