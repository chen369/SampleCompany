angular
    .module('app.core')
    .controller("TxController", function($scope, $http, $cookies, appConstants, TxService, OpenAMService) {

        // Get OpenAM cookie from browser
        $scope.openAMCookie = $cookies.get(appConstants.openAMCookie);

        // Perform OpenAM token validation and get uid
        OpenAMService.validateToken($scope.openAMCookie).success(function(data) {
            $scope.validate = data;

            // In case no cookie is not found or validation fails.
            if (!$scope.validate.valid) {
                $scope.error = "No valid OpenAM cookie found !";
                return;
            }

            // Get user's tx history
            TxService.history($scope.validate.uid).success(function(data) {
                $scope.users = data;
            });

        }, function() {
            $scope.error = "OpenAM server(s) are not reachable !";
        });
    });