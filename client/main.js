var Ractive = require("ractive");

var ractive = new Ractive({
  el: 'ractiveContainer',
  template: '#demo',
  data: {person: 'You'}
});