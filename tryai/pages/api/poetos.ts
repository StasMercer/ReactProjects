import fs from 'fs'
import path from 'path'
import { IncomingMessage } from 'http';
import { expandDims, LayersModel, loadLayersModel, squeeze, div, multinomial } from '@tensorflow/tfjs-node';


export default async (req, res) => {
    res.statusCode = 200;
    res.json("ok")
}

// type queryParams = {
//     seed: string,
//     numGen: string
// }

// function isQuery(obj: any): obj is queryParams{
//     if(obj.seed === undefined) return false
//     if(obj.numGen === undefined) return false
//     return true;
// }

// export default async (req, res) => {
//     let errors = [];
//     //at first check if query has proper params
//     if(isQuery(req.query)){

//         let {seed, numGen}: queryParams = req.query;
        
//         if(seed.length > 100) errors.push('seed length too big');
//         if(!isNaN(+numGen) && (+numGen > 500 || +numGen < 100)) errors.push('invalid numGen');
//     }else{
//         errors.push('invalid request params')
//     }

//     //if no errors found handle a request
//     if(errors.length === 0){
//         res.statusCode = 200;
//         let modelPath =  'file://models/poetos_model/model.json'
//         const model = await loadLayersModel(modelPath);
//         let generated = await generateText(model, req.query.seed, +req.query.numGen);
//         res.json({ data: generated })
//     }else{
//         res.statusCode = 400;
//         res.json(errors);
//     }

// }

// const idx2char = ['\n', ' ', '!', '"', '#', '&', "'", '(', ')', '*', ',', '-', '.',
//  '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '<', '>', '?',
//   'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
//    'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Z', '[', ']', '_', 'a', 'b', 'c', 'd',
//     'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
//      't', 'u', 'v', 'w', 'x', 'y', 'z', '|', '\xa0', '«', '»', '½', 'à', 'â', 'ç',
//       'è', 'é', 'ê', 'ô', 'ù', 'û', 'ü', '̀', '́', '·', 'А', 'Б', 'В', 'Г', 'Д',
//        'Е', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т',
//         'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ы', 'Ь', 'Э', 'Ю', 'Я', 'а', 'б',
//          'в', 'г', 'д', 'е', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р',
//           'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я',
//            'ё', 'ї', '–', '—', '‘', '’', '“', '„', '…', '‹', '›', '№']
// const char2idx = {}
// idx2char.forEach((e, index) =>{
//     char2idx[e] = index;
// })


// //fucking python converted function
// //I'm also wandering how it is fucking working
// //new tool learned - ts-ignore
// const generateText = async (model: LayersModel, startString: string, numGen: number) =>{
    
//     let numGenerate = numGen;
//     let inputEval = [];
//     startString.split('').forEach((val, index) => inputEval.push(char2idx[val]));
//     let inputExtended = expandDims(inputEval, 0);
   
//     let textGenerated = [];
//     const temperature = 0.2;

//     model.resetStates();
    
//     for(let i = 0; i< numGenerate; i++){
//         let predictions = model.predict(inputExtended);
//         //@ts-ignore
//         predictions = squeeze(predictions, 0);
//         //@ts-ignore
//         predictions = div(predictions, temperature);

        
//         //@ts-ignore
//         let predictedId = multinomial(predictions, 1);

//         let predictedArray = await predictedId.array();
//         let idAsNum = predictedArray[predictedArray.length-1][0];
//         inputExtended = expandDims([idAsNum], 0);
//         textGenerated.push(idx2char[idAsNum]);
  
//     }
//     return startString+textGenerated.join('');
// }