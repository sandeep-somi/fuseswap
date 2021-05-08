import axios from 'axios'

const endPoint = `https://raw.githubusercontent.com/fuseio/default-token-list/master/build/fuseswap-default.tokenlist.json`
// const endPoint = `https://raw.githubusercontent.com/fuseio/fuseswap-default-token-list/master/build/fuseswap-default.tokenlist.json`

export function getData() {
  return new Promise((resolve, reject) => {
    //
    // We can add env to save base URL but as for now making it hardcoded with endpoint
    //
    axios.get(endPoint)
      .then(res => {
        const { data } = res
        return resolve(data)
      })
      .catch(err => {
        return reject(err)
      })
  })
}