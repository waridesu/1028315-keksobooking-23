const createFetch = (onSuccess, onError) => fetch('https://23.javascript.pages.academy/keksobooking/data',
  {
    method: 'GET',
    credentials: 'same-origin',
  },
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw  new Error(`${response.status} ${response.statusText}`);
  })
  .then((json) => onSuccess(json))
  .catch((err) => {
    onError(err);
  });


const sendForm = (onSuccess, onError, data) => fetch('https://23.javascript.pages.academy/keksobooking',
  {
    method: 'POST',
    credentials: 'same-origin',
    body: data,
  })
  .then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onError('no');
    }
  })
  .catch(() => {
    onError('no');
  });

export {createFetch, sendForm};
