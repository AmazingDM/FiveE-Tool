// ==UserScript==
// @name         估算5E天梯分
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Thanks https://thagki9.com/5e/!
// @author       Amaz1ngDM
// @include      https://www.5ewin.com/data/player/*
// @require http://code.jquery.com/jquery-3.5.0.min.js
// ==/UserScript==

(function() {
    'use strict';

    var uid = window.location.href.split("data/player/")[1];

    var eloElm =$('.elo-word');
    var eloElmOriText =$('.elo-word').text();
    $.getJSON("https://1217741033825494.cn-shenzhen.fc.aliyuncs.com/2016-08-15/proxy/FiveEEloLookup/InferElo/?id="+uid+"&t="+new Date(),function(data){
        if(data.success){
            eloElm.text(eloElmOriText+"(估算"+data.data.elo+")");
        }else{
            console.log("估算5E天梯分API返回错误")
        }
    });
})();
