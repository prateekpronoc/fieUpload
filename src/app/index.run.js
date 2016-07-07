(function() {
  'use strict';

  angular
    .module('fieUpload')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
