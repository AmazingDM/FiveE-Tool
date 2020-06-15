// ==UserScript==
// @name         估算5E天梯分
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  算法来自 @THaGKI9 thagki9.com/5e
// @author       Amaz1ngDM
// @include      https://www.5ewin.com/data/player/*
// @require http://code.jquery.com/jquery-3.5.0.min.js
// ==/UserScript==

(function() {
    'use strict';

    var uid = window.location.href.split("data/player/")[1];

    var svip_eloElm =$('.elo');
    var eloElm =$('.elo-word');

    if(eloElm.length==0)
        eloElm = svip_eloElm
    var eloElmOriText =eloElm.text();
    $.getJSON("https://1217741033825494.cn-shenzhen.fc.aliyuncs.com/2016-08-15/proxy/FiveEEloLookup/InferElo/?id="+uid+"&t="+new Date(),function(data){
        if(data.success){
            eloElm.text(eloElmOriText+"("+data.data.elo+")");
        }else{
            eloElm.text(eloElmOriText+"(API错误)");
        }
    });
})();