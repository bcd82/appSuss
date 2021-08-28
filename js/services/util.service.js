export const utilService = {
  makeId,
  makeLorem,
  getRandomIntInclusive,
  getTime,
  getTimeToDisplay,
  getPriceCurrency
};

function makeId(length = 4) {
  var txt = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return txt;
}

function makeLorem(size = 100) {
  var words = [
    'sky',
    'above',
    'port',
    'was',
    'television',
    'color',
    'tuned',
    'to',
    'dead',
    'All',
    'this',
    'more',
    'had',
    'the',
    'bit',
    'boring',
    'string',
    'from',
    'and',
    '1000',
    'as',
    'generally',
    'happens',
    'in', 
    'such',
     'cases',
    'each',
    'time',
    'it',
    'was',
    'different',
    'man',
    'story',
    'It',
    'was',
    'pleasure',
    'to',
    'burn',
  ];
  var txt = '';
  while (size > 0) {
    size--;
    txt += words[Math.floor(Math.random() * words.length)] + ' ';
  }
  return txt;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function getTime(timestamp) {
  let date = new Date(timestamp);
  let time =
    'Date: ' +
    date.getDate() +
    '/' +
    (date.getMonth() + 1) +
    '/' +
    date.getFullYear() +
    ' ' +
    date.getHours() +
    ':' +
    date.getMinutes() +
    ':' +
    date.getSeconds();
  return Promise.resolve(time);
}

function getTimeToDisplay(timestamp) {
  let time = new Date(timestamp);
  let timeNow = new Date(Date.now());
  if ((timeNow.getDate() === time.getDate() &&
    (timeNow.getMonth() === time.getMonth()) &&
    (timeNow.getFullYear() === time.getFullYear()))) {
    return (`${time.getHours() + ':' + (time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes())}`)
  }
  if (timeNow.getFullYear() === time.getFullYear()) {
    return `${time.getDate()}/${time.getMonth() + 1}`
  }
  return time.toLocaleDateString()
}

function getPriceCurrency(book) {
  let formattedPrice;
  switch (book.listPrice.currencyCode) {
    case "ILS":
      formattedPrice = ` ${book.listPrice.amount}₪`;
      break;
    case "EUR":
      formattedPrice = `€${book.listPrice.amount}`;
      break;
    default:
      formattedPrice = `$${book.listPrice.amount}`;
      break;
  }
  return formattedPrice

}
