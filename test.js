const { getMotels } = require('./sheets');

getMotels().then(motels => {
  console.log(motels);
});