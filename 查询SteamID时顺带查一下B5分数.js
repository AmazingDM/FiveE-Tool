// ==UserScript==
// @name         查询SteamID时顺带查一下B5分数
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  支持https://steamid.facheme.com/lookup/
// @author       Amaz1ngDM
// @include      https://steamid.facheme.com/lookup/*
// @include      https://steamid.xyz/*
// @require http://code.jquery.com/jquery-3.5.0.min.js
// ==/UserScript==

(function () {
  'use strict';

  var url = window.location.href;
  //32 SteamID
  var uid = '';

  if (url.includes('steamid.facheme.com')) {
    uid = $('#a').text();
    //[U:1:xxxxxxx]
    uid = uid.split('[U:1:')[1].split(']')[0];

    var dl = document.querySelector("#content > dl");

    dl.innerHTML += '<dt class="key">B5 昵称</dt>';
    //从b5API获取用户数据
    $.getJSON("https://www.b5csgo.com.cn/personalCenterV2Controller/user_info.do?steamId=" + uid, function (user_info) {
      if (user_info.success && user_info.data.headImg != "") {
        dl.innerHTML += '<dd class="value"><a href = "https://www.b5csgo.com.cn/personalCenter/' + uid + '" target="_blank">' + user_info.data.nickName + '</a></dd>';

        //从b5API获取段位等数据
        $.getJSON("https://www.b5csgo.com.cn/personalCenterV2Controller/power.do?steamId=" + uid, function (power) {
          if (power.success) {
            dl.innerHTML += '<dt class="key">B5 分数</dt>';
            dl.innerHTML += '<dd class="value">' + power.data.elo + '</dd>';
            dl.innerHTML += '<dt class="key">B5 排名</dt>';
            dl.innerHTML += '<dd class="value">' + (power.data.rank > 10000 ? '10000+' : +power.data.rank) + '</dd>';
            dl.innerHTML += '<dt class="key">B5 Rating</dt>';
            dl.innerHTML += '<dd class="value">' + power.data.ratingAvg + '</dd>';
            dl.innerHTML += '<dt class="key">B5 爆头率</dt>';
            dl.innerHTML += '<dd class="value">' + power.data.headShotAvg + '</dd>';
          }
        });

      } else {
        dl.innerHTML += '<dd class="value">API错误或此人没在B5注册</dd>';
      }
    });
  } else if (url.includes('steamid.xyz')) {
    uid = $('#guide > input[type=text]:nth-child(20)').val();

    var dl = document.querySelector("#guide");

    dl.innerHTML += '<br> B5 昵称';
    //从b5API获取用户数据
    $.getJSON("https://www.b5csgo.com.cn/personalCenterV2Controller/user_info.do?steamId=" + uid, function (user_info) {
      if (user_info.success && user_info.data.headImg != "") {
        dl.innerHTML += '<dd class="value"><a href = "https://www.b5csgo.com.cn/personalCenter/' + uid + '" target="_blank">' + user_info.data.nickName + '</a></dd>';

        //从b5API获取段位等数据
        $.getJSON("https://www.b5csgo.com.cn/personalCenterV2Controller/power.do?steamId=" + uid, function (power) {
          if (power.success) {
            dl.innerHTML += '<dt class="key">B5 分数</dt>';
            dl.innerHTML += '<dd class="value">' + power.data.elo + '</dd>';
            dl.innerHTML += '<dt class="key">B5 排名</dt>';
            dl.innerHTML += '<dd class="value">' + (power.data.rank > 10000 ? '10000+' : +power.data.rank) + '</dd>';
            dl.innerHTML += '<dt class="key">B5 Rating</dt>';
            dl.innerHTML += '<dd class="value">' + power.data.ratingAvg + '</dd>';
            dl.innerHTML += '<dt class="key">B5 爆头率</dt>';
            dl.innerHTML += '<dd class="value">' + power.data.headShotAvg + '</dd>';
          }
        });

      } else {
        dl.innerHTML += '<dd class="value">API错误或此人没在B5注册</dd>';
      }
    });
  }
})();
