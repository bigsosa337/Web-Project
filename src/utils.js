let url = 'http://ec2-18-211-47-55.compute-1.amazonaws.com:8080/'
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