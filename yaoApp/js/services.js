/**
 * Created by Administrator on 2016/10/11 0011.
 */
angular.module('myService',[])
    .service('NewsServices',function($http,$rootScope){
        var items=[];

        var page =[];

        var cid=29;
        var hasData=true;
        return {
            requestData:function(){
                /*�������� 29*/
                if(!page[cid]){
                    page[cid]=1;
                }
                var myUrl = "http://www.phonegap100.com/appapi.php?a=getPortalList&catid="+cid+"&page="+page[cid]+"&callback=JSON_CALLBACK";
                //
                $http.jsonp(myUrl).success(
                    function(data){
                        if(items[cid]==undefined){    /*��һ������*/
                            items[cid]=data.result;
                        }else{
                            items[cid]=items[cid].concat(data.result);      /*ƴ������*/
                        }
                        console.log(data.result)
                        if(data.result.length<20){
                            console.log("xiaoyu20")

                            hasData=false;
                            console.log(hasData)
                        }
                        page[cid]++;     /*����ÿһ������� pageֵ*/
                        console.log(page);
                        $rootScope.$broadcast('NewsServicesUpdate');
                    }
                ).error(function(){
                        alert('shibai');
                    });
            },
            getData:function(){    /*��ȡ����*/
                if(items[cid]){
                    return items[cid];
                }
                return '';

            },
            setCateid:function(cateid){  //���÷���id
                cid=cateid;
                page[cid]=1;     /*�����ʱ�� page��Ϊ1*/

            }
            ,hasDataFun:function(){
                console.log(hasData)
                return hasData;

            },
            /*��������*/
            requestNewsContentData:function(aid){   /*aid ������*/
                var myUrl = "http://www.phonegap100.com/appapi.php?a=getPortalArticle&aid="+aid+"&callback=JSON_CALLBACK";

                $http.jsonp(myUrl).success(
                    function(data){

                        news_content = data.result[0];
                        $rootScope.$broadcast('NewsContentUpdate',news_content);
                    }
                ).error(function(){
                        alert('shibai');

                    });

            }

        }
    })