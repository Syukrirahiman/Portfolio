import axios from 'axios'

class API {
  getData = () => {
    return axios
      .get('https://api.internationalshowtimes.com/v4/cinemas/?countries=SG&apikey=5ogMBOJo2nty7v7YNku1eZkxHEAdEJMK')
      .then(function(response) {
        if (response.status === 200 && response != null) {
          var data = response.data
          return data
        } else {
          throw new Error('Empty data')
        }
      })
      .catch(function(error) {
        console.log(error)
        return [] // Return empty array in case error response.
      })
  }
}