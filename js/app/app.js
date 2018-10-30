(function(){
    angular
        .module('pinoyApp',['ui.router'])
        .controller('LandingCtrl', LandingCtrl)
        .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
            $locationProvider.html5Mode(true);
            $urlRouterProvider.otherwise('/home');
            $stateProvider
                .state('home', {
                    url: '/home',
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
                const req =new Request(DB_URI+'/news/'+today+'.json', {method:'GET'});
                fetch(req)
                    .then(response => {
                        response.json().then(data=> {
                            vm.news.popular = data;
                            console.log(vm);
                            $scope.$apply();
                        });
                    });

            }();
        };
    
})();