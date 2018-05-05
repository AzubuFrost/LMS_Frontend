export function statusCodeToError(statusCode) {
  if (statusCode === 200) {
    return '';
  }
  if (statusCode === 404) {
    return 'No such record was found : (';
  }
  return 'Oops, there was an error : (';
}

export function isName(words) {
  if (words === '') { return 1; }
  const re = /^\w+[\w\s]+\w+$/;
  return words.match(re);
}

export function isEmail(words) {
  if (words === '') { return 1; }
  const re = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
  return words.match(re);
}

export function isNumber(id) {
  if (typeof (id) !== 'number') {
    const re = /^[1-9][0-9]*$/;
    return id.match(re);
  }
  return 1;
}

export function isFloat(number) {
  if (typeof (number) !== 'number' && number !== '') {
    const re = /[+]?[0-9]*\.?[0-9]+/;
    return number.match(re);
  }
  return 1;
}

export function isUsername(username) {
  if (username === '') { return 1; }
  const re = /^[a-zA-Z]\w{4,15}$/;
  return username.match(re);
}
