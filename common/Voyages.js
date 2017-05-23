class Voyages {

  constructor() {
    //do nothing
  }

  /*
    This routine does the following:
    1) groups all port calls by routeId
    2) creates an 2D array or port calls by routeId
   */
  extractRoutes(portCalls) {
    const results = [];
    const routeIds = new Set();

    portCalls.forEach((value) => {
      routeIds.add(value.routeId);
    });

    for (let item of routeIds.values()) {
      const routeItems = portCalls.filter((i) => i.routeId == item);
      results.push(routeItems);
    }

    return results;
  }

  /*
   This routine does the following:
   1) takes an 2D array of port calls grouped by routeId
   2) generates all permutations for routes from a list of port calls
   */
  generateAllRoutes(portCalls) {
    const results = [];
    portCalls.forEach((route) => {
      route.forEach((port, index, arr) => {
        for (let v = index + 1; v < arr.length; v++) {
          const next = arr[v];
          results.push({from: port, to: next})
        }
      })
    });
    return results;
  }

  /*
   This routine does the following:
   1) takes an array of pairs of ports
   2) looks at departures to see if there are any opportunities for transhipments
   3) if so, we connect the ports for transhipments
   */
  findTranshipments(portCalls) {
    const map = new Map();
    const results = [];
    const transhipments = [];

    //get a list of ports if they occur twice in the list
    //if so, this is a possible transhipment opportunity
    portCalls.forEach((value) => {
      let count = 0;

      if (value.from.etd == null)
        return;

      if (map.has(value.from.port)) {
        count = map.get(value.from.port);
      }
      map.set(value.from.port, ++count);
    });

    for (let key of map.keys()) {
      let value = map.get(key);
      if (value > 1) {
        portCalls.forEach((i) => {
          if (i.from.port == key)
            results.push(i);
        });
      }
    }

    //now let's sort the list in ascending order by etd
    results.sort((a, b) => {
      let dateA = new Date(a.from.etd);
      let dateB = new Date(b.from.etd);
      if (dateA < dateB)
        return -1;
      else
        return 1;
    })

    //if we have at least two port calls
    //with same port, let's ensure they are not from
    //the same route or port (otherwise not a true transhipment)
    for (let i = 1; i < results.length; i++) {
      let current = results[i - 1];
      let next = results[i];
      if (current.from.routeId != next.to.routeId && current.from.port != next.to.port)
        transhipments.push({from: current.from, to: next.to});
    }

    return transhipments;
  }
}

module.exports = Voyages;
