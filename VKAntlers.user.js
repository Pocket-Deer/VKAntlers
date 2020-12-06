// ==UserScript==
// @name         VKAntlers
// @namespace    https://github.com/Pocket-Deer/VKAntlers
// @version      2.2
// @description  Make it more useful!
// @author       Pocket Deer
// @homepage     https://github.com/Pocket-Deer/VKAntlers
// @updateURL    https://github.com/Pocket-Deer/VKAntlers/raw/master/VKAntlers.user.js
// @downloadURL  https://github.com/Pocket-Deer/VKAntlers/raw/master/VKAntlers.user.js
// @include      *://vk.com/*
// @include      *://*.vk.com/*
// @match        *://vk.com/*
// @match        *://*.vk.com/*
// @match        *://userapi.com/*
// @match        *://*.userapi.com/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js
// @run-at       document-start
// @noframes
// ==/UserScript==

// ========================================================================
// Developer config

var vka_devload = false;

// Применяет настройки выше в локалку
if (localStorage.getItem("vka_config") != null) {
    var vka_tconfig = JSON.parse(localStorage.getItem("vka_config"));
    vka_tconfig.vka_devload = vka_devload;
    localStorage.setItem('vka_config', JSON.stringify(vka_tconfig));
}

// ========================================================================
// Добавление на страницу исходник JQuery

var jquery_script = vka_ajax_get('https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js');

var jquery = window.document.createElement('script');
jquery.type = 'text/javascript';
jquery.append(window.document.createTextNode(jquery_script));
(window.document.body || window.document.head || window.document.documentElement).append(jquery);

// ========================================================================
// Добавление на страницу исходного скрипта

var main;

if (vka_devload == false){
    main = vka_ajax_get('https://raw.githubusercontent.com/Pocket-Deer/VKAntlers/master/main_script');
} else if(vka_devload == true){
    main = vka_ajax_get('https://raw.githubusercontent.com/Pocket-Deer/VKAntlers/dev/main_script');
}

var script = document.createElement('script');
script.type = 'text/javascript';
script.appendChild(document.createTextNode(main));
(document.body || document.head || document.documentElement).appendChild(script);

// ========================================================================
// Ajax запрос GET, само собой, только с параметром текста
function vka_ajax_get(link) {
    var tmp = null;
    window.jQuery.ajax({ type: "GET",
                        url: link,
                        async: false,
                        success : function(text)
                        {
                            tmp = text;
                        }
                       });
    return tmp;
};
