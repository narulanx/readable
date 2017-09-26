// Helper function to capitalize the first character of a string
export function capitalize (str = '') {
  return typeof str !== 'string' || str === ''
    ? ''
    : str[0].toUpperCase() + str.slice(1)
}

// helper function to get a social date from the date object
export function getSocialDate(date = new Date()) {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const month = months[date.getMonth()];
  return date.getDate() + ' ' + month + ' ' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
}

// helper function to create guid to use in the ID of posts and comments
export function guid() {
  function _p8(s) {
    var p = (Math.random().toString(16)+"000000000").substr(2,8);
    return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
  }
  return _p8() + _p8(true) + _p8(true) + _p8();
}