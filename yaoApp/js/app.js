/**
 * Created by Administrator on 2016/10/10.
 */
var app = angular.module('myApp',['ionic','myController','myService']);
app.config(function($stateProvider,$urlRouterProvider,$ionicConfigProvider){
    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('standard');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');

    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');
    $stateProvider
        .state('tab', {  /*表示公共导航*/
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html'
        })
        //home页面继承tab
        .state('tab.home', {
            url: '/home',
            views: {
                'tab-home': {/*要在那个视图显示*/
                    templateUrl: 'templates/home/home.html',
                    controller: 'HomeController'
                }
            }
        })
        .state('tab.analyze', {
            url: '/analyze',
            views: {
                'tab-analyze': {/*要在那个视图显示*/
                    templateUrl: 'templates/analyze/photo.html'

                }
            }
        })
        .state('tab.news', {
            url: '/news',
            views: {
                'tab-news': {/*要在那个视图显示*/
                    templateUrl: 'templates/news/newslist.html',
                    controller: 'NewsController'
                }
            }
        })
        .state('tab.health', {
            url: '/health',
            views: {
                'tab-news': {/*要在那个视图显示*/
                    templateUrl: 'templates/news/newslist.html',
                    controller: 'HealthController'
                }
            }
        })
        .state('tab.care', {
            url: '/care',
            views: {
                'tab-news': {/*要在那个视图显示*/
                    templateUrl: 'templates/news/newslist.html',
                    controller: 'CareController'
                }
            }
        })
        .state('tab.diet', {
            url: '/diet',
            views: {
                'tab-news': {/*要在那个视图显示*/
                    templateUrl: 'templates/news/newslist.html',
                    controller: 'DietController'
                }
            }
        })
        .state('tab.prescription', {
            url: '/prescription',
            views: {
                'tab-news': {/*要在那个视图显示*/
                    templateUrl: 'templates/news/newslist.html',
                    controller: 'PrescriptionController'
                }
            }
        })
        .state('tab.account', {
            url: '/account',
            views: {
                'tab-account': {/*要在那个视图显示*/
                    templateUrl: 'templates/user/account.html',
                    controller: 'AccountController'
                }
            }
        })
        .state('news_content', {
            url: '/news_content/:aid',
            templateUrl:'templates/news/content.html',
            controller:'NewsContentController'
        })
        .state('favorite', {
            url: '/favorite',
            templateUrl:'templates/user/favorite.html',
            controller:'FavoriteController'
        })


    $urlRouterProvider.otherwise('/tab/home');
});
app.filter('jpg',function(){

    return function(input,n1,n2){
        input="http://www.phonegap100.com/data/attachment/"+input+".thumb.jpg";
        return input;
    }
});
