class Voyages  {

  constructor()
  {
    this.ports = [];
  }

  // executeDepthFirstTraversal()
  // {
  //   let visited = new Array(this.ports.length);
  //
  //   for (let v = 0; v < visited.length; v++) {
  //     if (!visited[v]) {
  //       console.log(`\nSTARTING AT ${this.ports[v].name}`);
  //       this.depthFirstTraversal(v, visited);
  //     }
  //   }
  // }
  //
  // depthFirstTraversal(v, visited)
  // {
  //   visited[v] = true;
  //   console.log(`visiting ${this.ports[v].name}`);
  //
  //   for (let nbr = this.ports[v].neighbors; nbr != null; nbr = nbr.next) {
  //     if (!visited[nbr.portNumber]) {
  //       console.log(`\n ${this.ports[v].name} -- ${this.ports[nbr.portNumber].name}`);
  //       this.depthFirstTraversal(nbr.portNumber, visited);
  //     }
  //   }
  // }

  print()
  {
    for (let v = 0; v < this.ports.length; v++) {
      console.log(this.ports[v].name);
      for (let nbr = this.ports[v].neighbors; nbr != null; nbr = nbr.next) {
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
    //   this.ports.push(new Port(index, value.port, null));
    // });
    //
    // this.ports.forEach((value, index, array) =>
    // {
    //   for(let v = index + 1; v < array.length; v++)
    //   {
    //     const nbr = this.ports[v];
    //     value.neighbors = new Neighbor(nbr.portNumber, value.neighbors);
    //   }
    // });


    this.ports.push(new Port(0, "HKHKG", null));
    this.ports.push(new Port(1, "SGSIN", null));
    this.ports.push(new Port(2, "USLAX", null));
    this.ports.push(new Port(3, "USOAK", null));
    this.ports.push(new Port(4, "COBOG", null));

    this.ports[0].neighbors = new Neighbor(1, this.ports[0].neighbors);
    this.ports[0].neighbors = new Neighbor(2, this.ports[0].neighbors);
    this.ports[0].neighbors = new Neighbor(3, this.ports[0].neighbors);
    this.ports[1].neighbors = new Neighbor(2, this.ports[1].neighbors);
    this.ports[1].neighbors = new Neighbor(3, this.ports[1].neighbors);
    this.ports[2].neighbors = new Neighbor(3, this.ports[2].neighbors);
    this.ports[2].neighbors = new Neighbor(4, this.ports[2].neighbors);

    //this.executeDepthFirstTraversal();
    this.print();
  }

}


class Port {
  constructor(portNumber, name, neighbors)
  {
    this.portNumber = portNumber;
    this.name = name;
    this.ports = neighbors;
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
