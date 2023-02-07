let url = 'http://18.211.47.55:80/'
let globalRequestParameters = {
  method: 'GET',
  mode: 'cors', 
  cache: 'no-cache', 
  credentials: 'same-origin', 
  headers: {
      'Content-Type': 'application/json'
  },
  redirect: 'follow', 
  referrerPolicy: 'no-referrer'
}

let sortByName = function (a, b) {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
};

module.exports.globalRequestParameters = globalRequestParameters;
module.exports.url = url;
module.exports.sortByName = sortByName;