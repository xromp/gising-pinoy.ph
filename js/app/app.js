(function(){
    angular
        .module('pinoyApp',['ui.router'])
        .controller('LandingCtrl', LandingCtrl)
        .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
            $locationProvider.html5Mode(true);
            $urlRouterProvider.otherwise('/');
            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'home.html',
                    controller: LandingCtrl
                })
                // .state('tos', {
                //     url: '/tos',
                //     templateUrl: 'terms.html',
                //     controller: TOSCtrl

                // });
            });

        LandingCtrl.$inject = ['$scope', '$location', '$stateParams', '$http'];
        function LandingCtrl($scope, $location, $stateParams, $http){
            const vm = this;
            const DB_URI = 'https://imquiz-001.firebaseio.com';
            const ref = firebase.database().ref();
            const today = '10292018';

            vm.news = {
                popular: []
            };

            vm.getNews = function() {
                // orderBy="weight"&limitToLast=2
                const req =new Request(DB_URI+'/news/'+today+'.json?orderBy="$key"&limitToFirst=50', {method:'GET'});
                fetch(req)
                    .then(response => {
                        response.json().then(data=> {
                            const formData = angular.copy(data);
                            vm.news.header = formData.slice(0,3);
                            vm.news.leftSide = formData.slice(4,10);
                            vm.news.popular = formData.slice(11,19);
                            vm.news.popular2 = formData.slice(20,28);
                            vm.news.leftSide2 = formData.slice(29,33);
                            console.log(vm);
                            $scope.$apply();
                        });
                    });

            }();
        };

})();
