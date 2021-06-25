import {createTemporalData} from './utils/get-temporal-data.js';
import { createNewDomElement } from './utils/create-new-dom-elemnts.js';

const offerArray = createTemporalData();
const map = [];
offerArray.forEach((value) => map.push(createNewDomElement(value)));

const mapBlock = document.querySelector('#map-canvas');
mapBlock.append(createNewDomElement(offerArray[0]));
