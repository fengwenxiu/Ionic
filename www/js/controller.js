app.controller('AppController', function ($rootScope, $scope, $http, $ionicNavBarDelegate, $location, $ionicSideMenuDelegate,$ionicScrollDelegate) {
    $scope.params = {};
    $scope.news = [];
    $scope.params.needHtml = 1;
    $scope.params.channelName = "国内最新";
    $scope.visible = false;
    $scope.hasMore = true;
    $scope.params.page = 1;
    $scope.newsList = [];
    function Http() {
        $http({
            url: 'http://apis.baidu.com/showapi_open_bus/channel_news/search_news',
            method: 'GET',
            params: $scope.params,
            headers: {
                'apikey': 'a79124c4594c2e5a0799a39ea8f64c87'
            }
        })
            .success(function (data, status, hearders, config) {
                if (data.showapi_res_error) {
                    alert(data.showapi_res_error)
                }
                if (!data.showapi_res_body.pagebean.contentlist.length) {
                    alert("输入错误，没有该新闻分类！请输入：国内、国际、军事、财经、互联网、房产、汽车、体育、娱乐、游戏...等")
                    return false;
                } else {
                    $scope.news = data.showapi_res_body.pagebean.contentlist;
                }
            })
            .error(function (data, status, hearders, config) {
                console.log(data);
            })
    }
    Http();
    $http({
        url: 'http://apis.baidu.com/showapi_open_bus/channel_news/channel_news',
        method: 'GET',
        headers: {
            'apikey': 'a79124c4594c2e5a0799a39ea8f64c87'
        }
    })
        .success(function (data, status, hearders, config) {
            $scope.newsList = data.showapi_res_body.channelList;
        })
        .error(function (data, status, hearders, config) {
            console.log(data);
        })
    $scope.loadMore = function (req) {
        req = req ? req : 1;
        var allPages = req > 50 ? 50 : req;

        if ($scope.params.page < allPages) {
            ++$scope.params.page;
            $scope.hasMore = true;
        } else { 
            $scope.hasMore = false;
            return false;
        }           
        
        $http({
            url: 'http://apis.baidu.com/showapi_open_bus/channel_news/search_news',
            method: 'GET',
            params: $scope.params,
            headers: {
                'apikey': 'a79124c4594c2e5a0799a39ea8f64c87'
            }
        })
            .success(function (data, status, hearders, config) {
                if (data.showapi_res_error) {
                    alert(data.showapi_res_error)
                }
                if (!data.showapi_res_body.pagebean.contentlist.length) {
                    alert("输入错误，没有该新闻分类！请输入：国内、国际、军事、财经、互联网、房产、汽车、体育、娱乐、游戏...等")
                    return false;
                } else {
                    $scope.news = $scope.news.concat(data.showapi_res_body.pagebean.contentlist);
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }
            })
            .error(function (data, status, hearders, config) {
                console.log(data);
            })
    }

    $rootScope.$on('$locationChangeStart', function () {
        if ($location.path() == "/home") {
            $scope.visible = false;
        } else {
            $scope.visible = true;
        }
        $ionicSideMenuDelegate.canDragContent(!$scope.visible)
    });
    $scope.News = function () {
        $scope.params.page = 1;
        $scope.hasMore = true;
        $scope.params.channelName = (!$scope.params.channelName) ? "国内最新" : $scope.params.channelName;
        Http();
        $ionicScrollDelegate.scrollTop();
    }
    $scope.ListNews = function (name) {
        $scope.params.channelName = name;
        $scope.News();
    }
})
    .controller('DetailController', ['$scope', '$state', '$stateParams',
        function ($scope, $state, $stateParams, $sce) {
            var id = null;
            id = parseInt($stateParams.id);
            $scope.new = $scope.news[id];
        }
    ])
    .filter('htmlContent', ['$sce', function ($sce) {
        return function (input) {
            return $sce.trustAsHtml(input);
        }
    }]);