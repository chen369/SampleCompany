angular
    .module('app.core')
    .controller("BenefitsController", function($http, $cookies) {
        var benefits = this;
        benefits.title = 'Benefits Portal';

        benefits.enrollments = [];

        $http.get('data/benefits.json').success(function(data) {
            benefits.enrollments = data;
        });

        benefits.username = JSON.parse($cookies.get('ssoToken')).username;
    });
