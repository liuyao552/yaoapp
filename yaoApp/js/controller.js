/**
 * Created by Administrator on 2016/10/10.
 */
angular.module('myController',[])
    .controller('HomeController',function($scope,$timeout,$ionicSlideBoxDelegate,NewsServices){
        $timeout(function(){
            $scope.img_list=[
                'img/swiper1.jpg',
                'img/swiper2.jpg',
                'img/swiper3.jpg',
                'img/swiper4.jpg'
            ];
            $ionicSlideBoxDelegate.update();   /*注意 ng-repeat的时候用*/

        },1000)

        $scope.items=[];
        $scope.hasData = true;
        $scope.loadMore=function(){
            if(NewsServices.hasDataFun()){
                NewsServices.requestData();/* 请求数据*/
            }else {
                $scope.hasData = false;
            }
        }
        $scope.$on('NewsServicesUpdate',function(event,data){
            $scope.items=NewsServices.getData();
            /*上拉更新数据请求要广播*/
            $scope.$broadcast('scroll.infiniteScrollComplete');
            console.log("broadcastnews")
        })
    })
    .controller('NewsController',function($scope,NewsServices){
        $scope.cates=[
            {'catid':'20','title':'健康资讯'},
            {'catid':'18','title':'健康保健'},
            {'catid':'15','title':'健康秘方'},
            {'catid':'11','title':'小秘方'}
        ];
        $scope.$on('$destroy',function(){
            console.log('$destroy');
        })
        console.log("newscontroller")
        $scope.items=[];
        $scope.hasData = true;
        console.log($scope.hasData);
        console.log(NewsServices.hasDataFun());
        NewsServices.setCateid(15)
        $scope.loadMore=function(){
            if(NewsServices.hasDataFun()){
                NewsServices.requestData();/* 请求数据*/
            }else {
                $scope.hasData = false;
            }
        }
        $scope.$on('NewsServicesUpdate',function(event,data){
            $scope.items=NewsServices.getData();
            /*上拉更新数据请求要广播*/
            $scope.$broadcast('scroll.infiniteScrollComplete');
            console.log("broadcastnews")
        })
    })
    .controller('CareController', function ($scope,NewsServices) {
        console.log("CareController");
        console.log(NewsServices)
        $scope.items=[];
        $scope.hasData = true;
        console.log(NewsServices.hasDataFun());
        NewsServices.setCateid(11)
        $scope.loadMore=function(){
            if(NewsServices.hasDataFun()){
                NewsServices.requestData();/* 请求数据*/
            }else {
                $scope.hasData = false;
            }
        }
        $scope.$on('NewsServicesUpdate',function(){
            $scope.items=NewsServices.getData();
            /*上拉更新数据请求要广播*/
            $scope.$broadcast('scroll.infiniteScrollComplete');
            console.log("broadcast")
        })
    })
    .controller('DietController', function ($scope,NewsServices) {
        console.log("DietController");
        $scope.items=[];
        $scope.hasData =true;
        NewsServices.setCateid(20)
        $scope.loadMore=function(){
            if(NewsServices.hasDataFun()){
                NewsServices.requestData();/* 请求数据*/
            }else {
                $scope.hasData = false;
            }
        }
        $scope.$on('NewsServicesUpdate',function(event,data){
            $scope.items=NewsServices.getData();
            /*上拉更新数据请求要广播*/
            $scope.$broadcast('scroll.infiniteScrollComplete');
        })
    })
    .controller('PrescriptionController', function ($scope,NewsServices) {
        console.log("PrescriptionController");
        $scope.items=[];
        $scope.hasData = true;
        NewsServices.setCateid(9)
        $scope.loadMore=function(){
            if(NewsServices.hasDataFun()){
                NewsServices.requestData();/* 请求数据*/
            }else {
                $scope.hasData = false;
            }
        }
        $scope.$on('NewsServicesUpdate',function(event,data){
            $scope.items=NewsServices.getData();
            /*上拉更新数据请求要广播*/
            $scope.$broadcast('scroll.infiniteScrollComplete');
        })
    })
    .controller('NewsContentController',function($scope,$stateParams,NewsServices,$ionicModal,$ionicBackdrop,$ionicLoading,$ionicPopup){
        $scope.font={};
        $scope.font.size = "fontMiddle";
        var aid=$stateParams.aid;
        //字体
        $scope.fonts=["特大字号","大字号","中字号","小字号"];
        $scope.ret = {select:"小字号"};

        /*去服务器请求数据*/
        NewsServices.requestNewsContentData(aid);
        $scope.$on('NewsContentUpdate',function(event,data){
            $scope.item=data;
            //判断是否已经收藏
            $scope.isCollect = iscollectFun();
        });

        //判断是否已收藏
        function iscollectFun(){
            if(localStorage.getItem('collect')){
                collectData = JSON.parse(localStorage.getItem('collect'));
                var currenData = $scope.item;
                for(var i=0; i<collectData.length; i++){
                    if(currenData.aid==collectData[i].aid){
                        return true;
                    }
                }
            }
            return false;
        }

        //更改字体
        $scope.changFont = function() {
            // 调用$ionicPopup弹出定制弹出框
            $ionicPopup.show({
                templateUrl: "templates/news/changeFont.html",
                title: "正文字体",
                scope: $scope,
                buttons: [
                    { text: "取消" ,
                      type: "button-outline button-dark"
                    },
                    {
                        text: "<b>确定</b>",
                        type: "button-positive",
                        onTap: function(e) {
                            switch($scope.ret.select)
                            {
                                case "特大字号":
                                    $scope.font.size = "fontSuper";
                                    break;
                                case "大字号":
                                    $scope.font.size = "fontBig";
                                    break;
                                case "中字号":
                                    $scope.font.size = "fontMiddle";
                                    break;
                                case "小字号":
                                    $scope.font.size = "fontLittle";
                                    break;
                                default:
                                    console.log("error!");
                            }
                        }
                    }
                ]
            })
        };

        $ionicModal.fromTemplateUrl('templates/modal/changeFont.html', function (modal) {
            $scope.modal = modal;
        }, {
            scope:$scope,
            animation: 'slide-in-up',
            focusFirstInput: true,
            backdropClickToClose:false
        });

        //收藏
        $scope.collect = function(){
            var info = "";
            var index=-1;
            var collectData=[];
            if(localStorage.getItem('collect')){
                collectData = JSON.parse(localStorage.getItem('collect'));
            }
            var currenData = $scope.item;
            for(var i=0; i<collectData.length; i++){
                if(currenData.aid==collectData[i].aid){
                    index=i;
                }
            }
            if(!$scope.isCollect){
                info="收藏成功";
                if(index==-1){
                    collectData.push(currenData);
                    localStorage.setItem("collect",JSON.stringify( collectData));
                }
            }else {
                info="取消收藏";
                if(index!=-1){
                    collectData.splice(index,1);
                    localStorage.setItem("collect",JSON.stringify( collectData))
                }
             }
            $ionicLoading.show({
                template:'<p>'+info+'</p>',
                noBackdrop:false,
                hideOnStateChange:true,
                duration:600
            });
            $scope.isCollect=!$scope.isCollect;
        };
    })

    .controller('AccountController',function($scope,$ionicModal,$timeout,$state,$interval){
        $scope.res = {};
        $scope.res.phoneNumber = "";
        $scope.res.password = "";
        $scope.res.repassword="";
        $scope.res.errorPhone = false;
        $scope.res.errorPassword = false;
        $scope.res.errorRepassword = false;
        $scope.res.erroruser = false;
        $scope.send= {};
        $scope.send.prompt= "发送验证码"
        $scope.send.time= '';
        $scope.sendable= false;
        $scope.islogin = false;
        var userinfo=[];
        //退出登录
        $scope.outof = function () {
            $scope.islogin = false;
        }
        //登录界面
        $ionicModal.fromTemplateUrl('templates/user/login.html', function (modal) {
            $scope.modalLogin = modal;
        }, {
            scope:$scope,
            animation: 'slide-in-up'
        });
        //注册界面
        $ionicModal.fromTemplateUrl('templates/user/register.html', function (modal) {
            $scope.modalRegister = modal;
        }, {
            scope:$scope,
            animation: 'slide-in-up'
        });
        //发送验证码界面
        $ionicModal.fromTemplateUrl('templates/user/messages.html', function (modal) {
            $scope.modalMessages = modal;
        }, {
            scope:$scope,
            animation: 'slide-in-up'
        });
        //弹出登陆界面
        $scope.loginShow = function(){
            $scope.modalRegister.hide();
            $scope.modalLogin.show();
        }
        //弹出注册界面
        $scope.registerShow = function(){
            $scope.res.phoneNumber = "";
            $scope.res.errorPhone = false;
            $scope.modalLogin.hide();
            $scope.res.password = "";
            $scope.res.repassword="";
            $scope.modalRegister.show();
        };
        //弹出发送短信界面
        $scope.messagesShow = function () {
            $scope.modalLogin.hide();
            $scope.modalRegister.hide();
            $scope.modalMessages.show();
        }
        //关闭模态窗口
        $scope.close = function() {  /*这里执行广播关闭的事件*/
            $scope.modalLogin.hide();
            $scope.modalRegister.hide();
            $scope.modalMessages.hide();
        };
        //验证手机
        function isMobil(s)
        {
            if(!s){
                return true;
            }
            var patrn=/^[1]\d{10}$/;
            if (!patrn.exec(s)) return false;
            return true
        }
        //验证密码
        function isPasswd(s)
        {
            if(s.replace(/(^s*)|(s*$)/g, "").length ==0){
                return true;
            }
            var patrn=/^(\w){6,20}$/;
            if (!patrn.exec(s)) return false;
            return true
        }
        //验证二次密码
        function issame(s1,s2){
            if(s1==s2){
                return true;
            }else {
                return false;
            }
        }
        //手机号码验证ng-change
        $scope.isPhonenumber= function(data){
            iserror(data,"errorPhone",isMobil);
        };
        //密码验证ng-change
        $scope.changePassword= function (data) {
            iserror(data,"errorPassword",isPasswd);
        }
        //验证二次密码
        $scope.changeSame = function (data) {
            iserror(data,"errorRepassword",issame);
        }
        //验证函数
        var timer;
        var iserror = function(data,error,fun){

            $timeout.cancel(timer);
            timer=$timeout(function(){
                if(!fun(data,$scope.res.password)){
                    if(error=="errorPhone"){$scope.res.errorPhone=true;}
                    if(error=="errorPassword"){$scope.res.errorPassword=true;}
                    if(error=="errorRepassword"){$scope.res.errorRepassword=true;}
                }else {
                    if(error=="errorPhone"){$scope.res.errorPhone=false;}
                    if(error=="errorPassword"){$scope.res.errorPassword=false;}
                    if(error=="errorRepassword"){$scope.res.errorRepassword=false;}
                }
            },400);
        }

        //登录
        $scope.login = function(){
            if(!$scope.res.errorPhone && $scope.res.phoneNumber!=null && $scope.res.password!=null){
                userinfo= JSON.parse(localStorage.getItem("userinfo")) || [];
                for(var i=0;i<userinfo.length;i++){
                    if($scope.res.phoneNumber == userinfo[i].username ){
                        if($scope.res.password == userinfo[i].password){
                            $scope.close();
                            $scope.islogin = true;
                        }
                    }
                }
                $scope.res.erroruser=true;
            }
        }
        //弹出发送短信界面
        $scope.sendMessages = function () {
            if(!$scope.res.errorPhone &&
                !$scope.res.errorPassword &&
                !$scope.res.errorRepassword &&
                $scope.res.phoneNumber!=null &&
                $scope.res.password.replace(/(^s*)|(s*$)/g, "").length !=0 &&
                $scope.res.repassword.replace(/(^s*)|(s*$)/g, "").length !=0){
                $scope.messagesShow();
            }
        }
        //注册
        $scope.register= function () {
            $scope.loginShow();
             userinfo= JSON.parse(localStorage.getItem("userinfo")) || [];
             var user = {};
             user.username = $scope.res.phoneNumber;
             user.password = $scope.res.password;
             userinfo.push(user);
             localStorage.setItem("userinfo",JSON.stringify(userinfo));
        }
        //发送短信验证
        $scope.sendMessage = function () {
            $scope.sendable=true;
            $scope.send.prompt= "重发";
            $scope.send.time= 60;
            var sendtimer = $interval(function () {
                $scope.send.time--;
                if($scope.send.time == 0){
                    $interval.cancel(sendtimer);
                    $scope.send.prompt= "发送验证码"
                    $scope.send.time= '';
                    $scope.sendable = false;
                }
            },1000)
        };
        //显示我的收藏
        $scope.myFavorite = function () {
            $state.go('favorite');
        }
        
    })
    .controller('FavoriteController', function ($scope,$ionicListDelegate) {
        $scope.favorite=getFavorite();
        $scope.options={};
        $scope.options.selected = true;
        $scope.showOption = false;
        $scope.$on('$ionicView.beforeEnter', function() {
            $scope.favorite=getFavorite();
        });
        function getFavorite(){
            if(localStorage.getItem('collect')){
                return JSON.parse(localStorage.getItem('collect'));
            }else {
                return [];
            }
        }
       
        //删除
        $scope.delete = function (index) {
            $scope.favorite.splice(index,1);
            localStorage.setItem('collect',$scope.favorite);
        }
        //长安弹出选项
        $scope.options = function () {
            $scope.showOption=true;
        }
        
    })
