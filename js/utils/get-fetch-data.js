import {createFetch} from './toFetchData.js';
import {createMarker} from './marker.js';

const requestErrorMessage = (err)=> document.body.innerHTML += `<div class="error">
                    <p class="error__message">${err.message}</p>
                    <button type="button" class="error__button" onclick="document.querySelector('.error').style.display='none'">Попробовать снова</button>
                </div>`;

const getRequestData = () => {
  createFetch(
    (place) => place.slice(0, 10).forEach((element) => createMarker(element)),
    (err) => requestErrorMessage(err));
};

export { getRequestData };
