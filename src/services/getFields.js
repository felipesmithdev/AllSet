const axios = require('axios');
require('dotenv').config();

const auth = {
  username: process.env.JIRA_EMAIL,
  password: process.env.JIRA_API_TOKEN
};

axios.get('https://allsetsupport.atlassian.net/rest/api/3/field', { auth })
  .then(response => {
    console.log(JSON.stringify(response.data, null, 2));
  })
  .catch(error => {
    console.error('Erro ao buscar campos:', error.response?.data || error.message);
  });
