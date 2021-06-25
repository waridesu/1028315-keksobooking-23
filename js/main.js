import {createTemporalData} from './utils/get-temporal-data.js';
import { createNewDomElement } from './utils/create-new-dom-elemnts.js';

const offerArray = createTemporalData();
const map = [];
offerArray.forEach((value) => map.push(createNewDomElement(value)));

const canvasBlock = document.querySelector('#map-canvas');
canvasBlock.append(createNewDomElement(offerArray[0]));
