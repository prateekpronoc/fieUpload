(function() {
    'use strict';

    angular
        .module('fieUpload')
        .directive('multipleFieUpload', multipleFieUpload);

    /** @ngInject */
    function multipleFieUpload() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/multipleFileUpload/multpleFileUpload.html',
            scope: {
                filePath: '=',
                fileNames: '='
            },
            controller: function($scope, $q, toastr) {
                $scope.uploadFile = undefined;
                $scope.$watch('uploadFile', function(newValue) {
                    if (angular.isDefined(newValue)) {
                        validateAndUpload(newValue).then(function(result) {
                                $scope.fileNames.push({
                                    name: result.name,
                                    filePath: result.filePath,
                                    size: humanFileSize(newValue.size)
                                });
                            //     $scope.filePath.push(result.filePath);
                            // if (_.size(result) > 0 && _.has(result, 'status')) {
                            //     $scope.fileNames.push({
                            //         name: result.name,
                            //         filePath: result.filePath,
                            //         size: humanFileSize(newValue.size)
                            //     });
                            //     $scope.filePath.push(result.filePath);
                            // }
                        });
                    }
                });

                function validateAndUpload(uploadFile) {
                    if (!angular.isDefined(uploadFile)) {
                        return $q.when({});
                    }

                    if (uploadFile.size > 1000000) {
                        toastr.info('Upload file of max size 1 MB only');
                        return $q.when({});
                    }

                    return $q.when({
                        filePath: 'Prateek',
                        name: 'Prateek',
                        status: 'ok'
                    });
                    // return fileUpload.uploadFile('/api/files/fileupload',
                    //     uploadFile
                    // ).then(function(fileResponse) {
                    //     console.log(fileResponse);
                    //     if (fileResponse.data.Error === 'true') {
                    //         return false;
                    //     }
                    //     return $q.when({
                    //         filePath: fileResponse.data.filePath,
                    //         name: uploadFile.name,
                    //         status: 'ok'
                    //     });
                    // }).catch(function(err) {
                    //     notifier.error('Error uploading image : ' + err);
                    //     console.error('Error Uploading Image : ', err);
                    // });

                }

                function humanFileSize(size) {
                    var i = Math.floor(Math.log(size) / Math.log(1024));
                    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
                }
            }
        };

        return directive;

        // /** @ngInject */
        // function NavbarController(moment) {
        //     var vm = this;

        //     // "vm.creationDate" is available by directive option "bindToController: true"
        //     vm.relativeDate = moment(vm.creationDate).fromNow();
        // }
    }

})();
