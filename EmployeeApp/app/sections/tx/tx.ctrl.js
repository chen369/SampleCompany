angular
    .module('app.core')
    .controller("TxController", function($scope, $http, $cookies, $routeParams, appConstants, TxService, OpenAMService) {

        // Get OpenAM cookie from browser
        $scope.openAMCookie = $cookies.get(appConstants.openAMCookie);

        //For testing purposes only, password grant flow
        var roParams = {
            "grant_type": "password",
            "scope": "uid mail",
            "username": 'emp1',
            "password": 'password'
        };

        var implicitParams = {
            "response_type": "token",
            "scope": "uid mail",
            "client_id": appConstants.clientID,
            "redirect_uri": appConstants.redirectURI
        };

        // Check if access token is present in request param.
        if (null === $routeParams.tokenId || $routeParams.tokenId === undefined) {
            // If access token is not present in request then start implicit oauth2 flow
            OpenAMService.startImplicitFlow(implicitParams);
        }

        // Set access_token in scope
        $scope.access_token = $routeParams.tokenId;

        // Perform OpenAM token validation and get uid
        OpenAMService.validateToken($scope.openAMCookie).success(function(data) {
            $scope.validate = data;

            // In case no cookie is not found or validation fails.
            if (!$scope.validate.valid) {
                $scope.error = "No valid OpenAM cookie found !";
                return;
            }

            // Get user's tx history
            TxService.historyUsingAT($scope.validate.uid, $scope.access_token).success(function(data) {
                $scope.users = data;
            }, function(data) {
                $scope.error = "Error in invoking Tx Service !";
            });

        }, function() {
            $scope.error = "OpenAM server(s) are not reachable !";
        });


    });
