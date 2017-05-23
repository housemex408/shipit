class Voyages  {

  constructor()
  {
    this.ports = [];
  }

  executeDepthFirstTraversal()
  {
    let visited = new Array(this.ports.length);

    for (let v = 0; v < visited.length; v++) {
      if (!visited[v]) {
        console.log(`\nSTARTING AT ${this.ports[v].name}`);
        this.depthFirstTraversal(v, visited);
      }
    }
  }

  depthFirstTraversal(v, visited)
  {
    visited[v] = true;
    console.log(`visiting ${this.ports[v].name}`);

    for (let nbr = this.ports[v].next; nbr != null; nbr = nbr.next) {
      if (!visited[nbr.portNumber]) {
        console.log(`\n ${this.ports[v].name} -- ${this.ports[nbr.portNumber].name}`);
        this.depthFirstTraversal(nbr.portNumber, visited);
      }
    }
  }

  extractRoutes(portCalls)
  {
    const results = [];

    const routeIds = new Set();

    portCalls.forEach((value)=>{
      routeIds.add(value.routeId);
    });

    for (let item of routeIds.values())
    {
      const routeItems = portCalls.filter((i) => i.routeId == item);
      results.push(routeItems);
    }

    return results;
  }

  generateAllRoutes(portCalls)
  {
    const results = [];
    portCalls.forEach((route, index, arr) => {
      route.forEach((port, index, arr) => {
        for(let v = index + 1; v < arr.length; v++)
        {
          const next = arr[v];
          results.push({ from: port, to: next })
        }
      })
    });
    return results;
  }

  intersection(setA, setB) {
    let intersection = new Set();
    for (let elem of setB) {
      if (setA.has(elem)) {
        intersection.add(elem);
      }
    }
    return intersection;
  }

  findTranshipments(portCalls)
  {
    //find common ports
    const map = new Map();
    const results = [];
    const transhipments = [];

    portCalls.forEach((value) => {
      let count = 0;

      if(value.from.etd == null)
        return;

      if(map.has(value.from.port))
      {
        count = map.get(value.from.port);
      }
      map.set(value.from.port, ++count);

    });

    for (let key of map.keys()) {
      let value = map.get(key);
      if(value > 1) {
        portCalls.forEach((i) => {
          if(i.from.port == key)
            results.push(i);
        });
      }
    }

    results.sort((a, b) => {
      let dateA = new Date(a.from.etd);
      let dateB = new Date(b.from.etd);
      if(dateA < dateB)
        return -1;
      else
        return 1;
    })


    for(let i = 1; i < results.length; i++)
    {
      //find index in previous array
      //see if there is a next element in current array
      //connect the two
      let current = results[i - 1];
      let next = results[i];
      transhipments.push({ from: current.from, to: next.to });
    }

    return transhipments;
  }

  print()
  {
    for (let v = 0; v < this.ports.length; v++) {
      console.log(this.ports[v].name);
      for (let nbr = this.ports[v].next; nbr != null; nbr = nbr.next) {
        console.log(` --> ${this.ports[nbr.portNumber].name}`);
      }
    console.log("\n");
    }
  }

  generateVoyages(portCalls)
  {
    //TODO: sort list first
    //Now build the list

    // portCalls.forEach((value, index) =>
    // {
    //   this.ports.push(new Port(index, value.port));
    // });
    //
    // this.ports.forEach((value, index, array) =>
    // {
    //   for(let v = index + 1; v < array.length; v++)
    //   {
    //     const nbr = this.ports[v];
    //     value.next = new Neighbor(nbr.portNumber, value.next);
    //   }
    // });


    this.ports.push(new Port(0, "HKHKG", null));
    this.ports.push(new Port(1, "SGSIN", null));
    this.ports.push(new Port(2, "USLAX", null));
    this.ports.push(new Port(3, "USOAK", null));
    this.ports.push(new Port(4, "COBOG", null));

    this.ports[0].next = new Neighbor(1, this.ports[0].next);
    this.ports[0].next = new Neighbor(2, this.ports[0].next);
    this.ports[0].next = new Neighbor(3, this.ports[0].next);
    this.ports[1].next = new Neighbor(2, this.ports[1].next);
    this.ports[1].next = new Neighbor(3, this.ports[1].next);
    this.ports[2].next = new Neighbor(3, this.ports[2].next);
    this.ports[2].next = new Neighbor(4, this.ports[2].next);

    //this.executeDepthFirstTraversal();
    this.print();
  }

}


class Port {
  constructor(portNumber, name)
  {
    this.portNumber = portNumber;
    this.name = name;
    this.next = null;
  }
}

class Neighbor {
  constructor(portNumber, neighbor)
  {
    this.portNumber = portNumber;
    this.next = neighbor;
  }
}


module.exports = Voyages;
