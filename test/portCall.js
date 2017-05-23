const assert = require('chai').assert;
const Voyages = require('../common/Voyages');

describe('VoyagesGraph', function() {
  it('generateVoyages', function(done) {
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
      }];

    //act
    const vg = new Voyages();
    const voyages = vg.generateVoyages(portCalls);

    //assert
    assert.equal(voyages, null);

    done();
  });
});
