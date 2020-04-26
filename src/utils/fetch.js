function handleError (response) {
  return new Promise((resolve, reject) => {
    if (response.status === 204) {
      return resolve();
    }
    return response.json()
    .then(result => {
      return resolve(result);
    })
    .catch(() => {
      return resolve();
    });
  });
}

export const get = (url, params) => {
  let getURL = `${url}`;
  if (params) {
    getURL += `?${params}`;
  }
  return fetch(getURL, {
    credentials: 'same-origin',
  }).then(handleError);
}
