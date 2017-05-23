'use strict';
const Voyages = require('../Voyages');

module.exports = function(PortCall) {

  PortCall.getRoutes = function(etd, eta, includeTrans, cb) {
    // For more information on how to query data in loopback please see
    // https://docs.strongloop.com/display/public/LB/Querying+data
    const query = {
      where: {
        and: [
          { // port call etd >= etd param, or can be null
            or: [{ etd: { gte: etd } }, { etd: null }]
          },
          { // port call eta <= eta param, or can be null
            or: [{ eta: { lte: eta } }, { eta: null }]
          }
        ]
      }
    };

    PortCall.find(query)
      .then(calls => {

        console.log(calls);

        let voyages = new Voyages();
        let routeList = voyages.extractRoutes(calls);
        let allRoutes = voyages.generateAllRoutes(routeList);

        if(includeTrans == true) {
          let transhipments = voyages.findTranshipments(allRoutes);
          allRoutes = allRoutes.concat(transhipments);
        }

        console.log("allRoutes: \n");
        console.log(allRoutes);

        // return cb(null, calls);
        return cb(null, allRoutes);
      })
      .catch(err => {
        console.log(err);

        return cb(err);
      });
  };

  PortCall.remoteMethod('getRoutes', {
    accepts: [
      { arg: 'etd', 'type': 'date' },
      { arg: 'eta', 'type': 'date' },
      { arg: 'includeTrans', 'type': 'boolean' }
    ],
    returns: [
      { arg: 'routes', type: 'array', root: true }
    ]
  });

};
