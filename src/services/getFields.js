const axios = require('axios');

async function listarCampos() {
  const res = await axios.get('https://allsetsupport.atlassian.net/rest/api/3/field', {
    auth: {
      username: 'gabriel.iwakura@sptech.school',
      password: 'ATATT3xFfGF0s2LS7-PSU-DI-IGHIIk1flGumISqHsRywi5ZWM6ao6FARE4Ygm6RAp8O2OItA1hgQ5_3tGLjqKa3W04lMA1a7VId4DJmaDYmDB1qjZfEdLu1lFiS99pvznZlaLiE6dFEwzOSRH_2TrZ9WIM3OIyP0LoOgIoOvcS_N3tpP56UcZ8=2E201491'
    }
  });

  const campoLote = res.data.find(f => f.name === 'Lote');
  console.log('Campo Lote encontrado:', campoLote);
}

listarCampos();
