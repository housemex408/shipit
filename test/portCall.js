const assert = require('chai').assert;
const Voyages = require('../common/Voyages');

describe('Voyages', function() {
  it('extractRoutes', function(done) {
    //arrange
    const portCalls = [
      {
        "id":1,
        "vessel": "USS Harpoon",
        "routeId": 1,
        "port": "HKHKG",
        "eta": null,
        "etd": "2016-01-03 00:00:00"
      },
      {
        "id":2,
        "vessel": "USS Harpoon",
        "routeId": 1,
        "port": "SGSIN",
        "eta": "2016-01-06 00:00:00",
        "etd": "2016-01-09 00:00:00"
      },
      {
        "id":3,
        "vessel": "USS Harpoon",
        "routeId": 1,
        "port": "USLAX",
        "eta": "2016-01-12 00:00:00",
        "etd": "2016-01-15 00:00:00"
      },
      {
        "id":4,
        "vessel": "USS Harpoon",
        "routeId": 1,
        "port": "USOAK",
        "eta": "2016-01-18 00:00:00",
        "etd": null
      },
      {
        "id":5,
        "vessel": "USS Starboard",
        "routeId": 2,
        "port": "HKHKG",
        "eta": null,
        "etd": "2016-01-04 00:00:00"
      },
      {
        "id":6,
        "vessel": "USS Starboard",
        "routeId": 2,
        "port": "USLAX",
        "eta": "2016-01-06 00:00:00",
        "etd": "2016-01-08 00:00:00"
      },
      {
        "id":7,
        "vessel": "USS Starboard",
        "routeId": 2,
        "port": "USOAK",
        "eta": "2016-01-10 00:00:00",
        "etd": "2016-01-12 00:00:00"
      },
      {
        "id":8,
        "vessel": "USS Starboard",
        "routeId": 2,
        "port": "SGSIN",
        "eta": "2016-01-14 00:00:00",
        "etd": "2016-01-16 00:00:00"
      },
      {
        "id":9,
        "vessel": "USS Starboard",
        "routeId": 2,
        "port": "HKHKG",
        "eta": "2016-01-18 00:00:00",
        "etd": "2016-01-20 00:00:00"
      },
      {
        "id":10,
        "vessel": "USS Starboard",
        "routeId": 2,
        "port": "USLAX",
        "eta": "2016-01-22 00:00:00",
        "etd": null
      },
      {
        "id":11,
        "vessel": "HMS Port",
        "routeId": 3,
        "port": "USOAK",
        "eta": null,
        "etd": "2016-01-15 00:00:00"
      },
      {
        "id":12,
        "vessel": "HMS Port",
        "routeId": 3,
        "port": "HKHKG",
        "eta": "2016-01-20 00:00:00",
        "etd": "2016-01-25 00:00:00"
      },
      {
        "id":13,
        "vessel": "HMS Port",
        "routeId": 3,
        "port": "SGSIN",
        "eta": "2016-01-30 00:00:00",
        "etd": null
      },
      {
        "id":14,
        "vessel": "USS Harpoon",
        "routeId": 4,
        "port": "USOAK",
        "eta": null,
        "etd": "2016-01-24 00:00:00"
      },
      {
        "id":15,
        "vessel": "USS Harpoon",
        "routeId": 4,
        "port": "USLAX",
        "eta": "2016-01-25 00:00:00",
        "etd": "2016-01-27 00:00:00"
      },
      {
        "id":16,
        "vessel": "USS Harpoon",
        "routeId": 4,
        "port": "HKHKG",
        "eta": "2016-01-28 00:00:00",
        "etd": "2016-01-30 00:00:00"
      },
      {
        "id":17,
        "vessel": "USS Harpoon",
        "routeId": 4,
        "port": "SGSIN",
        "eta": "2016-02-01 00:00:00",
        "etd": null
      }
    ];

    //act
    const vg = new Voyages();
    const voyages = vg.extractRoutes(portCalls);

    //assert
    assert.equal(voyages[0][0].routeId, 1);
    assert.equal(voyages[1][0].routeId, 2);
    assert.equal(voyages[2][0].routeId, 3);
    assert.equal(voyages[3][0].routeId, 4);

    done();
  });

  it('generateAllRoutes', function(done) {
    //arrange
    const portCalls = [[
      {
        "id":1,
        "vessel": "USS Harpoon",
        "routeId": 1,
        "port": "HKHKG",
        "eta": null,
        "etd": "2016-01-03 00:00:00"
      },
      {
        "id":2,
        "vessel": "USS Harpoon",
        "routeId": 1,
        "port": "SGSIN",
        "eta": "2016-01-06 00:00:00",
        "etd": "2016-01-09 00:00:00"
      },
      {
        "id":3,
        "vessel": "USS Harpoon",
        "routeId": 1,
        "port": "USLAX",
        "eta": "2016-01-12 00:00:00",
        "etd": "2016-01-15 00:00:00"
      },
      {
        "id":4,
        "vessel": "USS Harpoon",
        "routeId": 1,
        "port": "USOAK",
        "eta": "2016-01-18 00:00:00",
        "etd": null
      }]
    ];

    //act
    const vg = new Voyages();
    const voyages = vg.generateAllRoutes(portCalls);

    //assert
    //HKHKG to SGSIN
    assert.equal(voyages[0].from.port, portCalls[0][0].port);
    assert.equal(voyages[0].to.port, portCalls[0][1].port);
    //HKHKG to USLAX
    assert.equal(voyages[1].from.port, portCalls[0][0].port);
    assert.equal(voyages[1].to.port, portCalls[0][2].port);
    //HKHKG to USOAK
    assert.equal(voyages[2].from.port, portCalls[0][0].port);
    assert.equal(voyages[2].to.port, portCalls[0][3].port);
    //SGSIN to USLAX
    assert.equal(voyages[3].from.port, portCalls[0][1].port);
    assert.equal(voyages[3].to.port, portCalls[0][2].port);
    //SGSIN to USOAK
    assert.equal(voyages[4].from.port, portCalls[0][1].port);
    assert.equal(voyages[4].to.port, portCalls[0][3].port);
    //USLAX to USOAK
    assert.equal(voyages[5].from.port, portCalls[0][2].port);
    assert.equal(voyages[5].to.port, portCalls[0][3].port);

    assert.equal(voyages.length, 6);

    done();
  });

  it('findTranshipments', function(done) {
    //arrange
    const portCalls = [
      {
        from: {
          "id":3,
          "vessel": "USS Harpoon",
          "routeId": 1,
          "port": "USLAX",
          "eta": "2016-01-12 00:00:00",
          "etd": "2016-01-15 00:00:00"
        },
        to: {
          "id":4,
          "vessel": "USS Harpoon",
          "routeId": 1,
          "port": "USOAK",
          "eta": "2016-01-18 00:00:00",
          "etd": null
        }
      },
      {
        from: {
          "id":5,
          "vessel": "USS Awesome",
          "routeId": 2,
          "port": "USLAX",
          "eta": "2016-01-12 00:00:00",
          "etd": "2016-01-15 06:00:00"
        },
        to: {
          "id":6,
          "vessel": "USS Awesome",
          "routeId": 2,
          "port": "COBOG",
          "eta": "2016-01-18 00:00:00",
          "etd": null
        }
      }
    ];

    //act
    const vg = new Voyages();
    const voyages = vg.findTranshipments(portCalls);

    //assert
    assert.equal(voyages[0].from, portCalls[0].from);
    assert.equal(voyages[0].to, portCalls[1].to);

    done();
  });
});
