angular
  .module('app')
  .controller('VoyagesCtrl', VoyagesCtrl);

function VoyagesCtrl($log, PortCall) {

  let ctrl = this;

  ctrl.voyages = [];
  ctrl.includeTrans = false;

  ctrl.dateOptions = {
    initDate: new Date(2016, 00, 01),
    formatYear: 'yy',
    startingDay: 1
  };

  ctrl.getRoutes = (etd, eta) => {
    const params = { etd, eta, includeTrans: ctrl.includeTrans };

    PortCall.getRoutes(params).$promise
      .then(voyages => {
        ctrl.voyages = voyages;
      })
      .catch(err => {
        $log.error(err);
      });
  };

  ctrl.getVessels = (from, to) => {
    if(ctrl.includeTrans && from.vessel != to.vessel)
      return `${from.vessel}, ${to.vessel}`;
    else
      return `${from.vessel}`;
  };

  ctrl.getRouteIds = (from, to) => {
    if(ctrl.includeTrans && from.routeId != to.routeId)
      return `${from.routeId}, ${to.routeId}`;
    else
      return `${from.routeId}`;
  };
}

VoyagesCtrl.$inject = ['$log', 'PortCall'];
