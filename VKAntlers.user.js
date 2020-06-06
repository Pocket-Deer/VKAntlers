// ==UserScript==
// @name         VKAntlers
// @namespace    https://github.com/Pocket-Deer/VKAntlers
// @version      0.1.0.19
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
// @match        *://*.userstyles.org/*
// @match        https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&display=swap
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @run-at       document-start
// @noframes
// ==/UserScript==

// ВСЁ ЧТО НИЖЕ ЗАПУСКАЕТСЯ ДО ЗАГРУЗКИ СТРАНИЦЫ
//========================================================================
// Переадресация при введении vk.com в адресную строку
if(document.location == "https://vk.com/feed"){
    window.location.replace("https://vk.com/im")
};
//========================================================================
document.addEventListener ("DOMContentLoaded", DOM_ContentReady);
window.addEventListener ("load", pageFullyLoaded);
//========================================================================
var $ = window.jQuery;

var mainMenu = GetSourceFromSite('https://raw.githubusercontent.com/Pocket-Deer/VKAntlers/master/mainmenu.html');
var mainMenu_css = GetSourceFromSite('https://raw.githubusercontent.com/Pocket-Deer/VKAntlers/master/style.css');
var dark_theme = GetSourceFromSite('https://raw.githubusercontent.com/Pocket-Deer/VKAntlers/master/dark_style.css');
var mainMenu_stylein = '<style type="text/css">';
var mainMenu_styleout = '</style>';
//========================================================================
if (GM_getValue("dark_style") == 1){
    $("head").append('<style type="text/css" id="dark_theme_style">' + dark_theme + mainMenu_styleout);
}
//========================================================================
GM_setValue("logo_hashtag_text","дирохерел");
var dark_style = GM_getValue("dark_style");
//========================================================================


//https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&display=swap

// ВСЁ ЧТО НИЖЕ ЗАПУСКАЕТСЯ ПОСЛЕ ЗАГРУЗКИ СТРАНИЦЫ
function DOM_ContentReady () {
    (function (window, undefined) { //Одна из важных частей, не удалять. Связана с }(window)
        //========================================================================
        //========================================================================
        var w;
        if (typeof unsafeWindow != undefined) {
            w = unsafeWindow
        } else {
            w = window;
        };

        // [3] не запускаем скрипт во фреймах
        // без этого условия скрипт будет запускаться несколько раз на странице с фреймами
        if (w.self != w.top) {
            return;
        };
        //========================================================================
        //Изменение названия возле диалога с хештегом
        var hashtagname = GM_getValue("logo_hashtag_text");
        $("div.CovidLogo__hashtag").replaceWith("<div class=\"CovidLogo__hashtag \">#" + hashtagname + "</div>");
        //      $( "span.left_label inl_bl" ).replaceWith( "<span href=\"vk.com/feed/\" class=\"left_label inl_bl\">Новости</span>" );

        //========================================================================
        //====================== СОЗДАНИЕ ГЛАВНОГО МЕНЮ ==========================
        // var mainMenu = '';
        // var mainMenu_css = '';

        // Создание левых стилей и встраивание их на сайт
        //$("body").append('<link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&display=swap" rel="stylesheet">');
        //GM_addStyle ('.body_im {font-family: "Comfortaa", cursive !important; }');

        // Создание главного меню и взятие его стиля с гитхаба

        var dark_theme_block_button = '<div class="head_nav_item moon" style="float: right;padding: 9px;"><a id="dark_theme_toggle" style="font-size: 20px;">🌒</a></div>';
        $("body").append(mainMenu);
        $("head").append(mainMenu_stylein + mainMenu_css + mainMenu_styleout);
        $(".head_nav_item.fl_r").before(dark_theme_block_button);
        //========================================================================
        // Скрипт для выделения нажатых клавиш цветом
        $('.menu_toggle').on("click",function() {
            $(this).toggleClass('menu_toggle_on')
        });

        $("#dark_theme_toggle").on("click", function dark_theme_toggle(){
            dark_style = GM_getValue("dark_style");
            dark_style = (dark_style==0 ? 1 : 0);
            GM_setValue ("dark_style", dark_style);
            if (dark_style == 1){
                $("head").append('<style type="text/css" id="dark_theme_style">' + dark_theme + mainMenu_styleout);
            } if (dark_style == 0) {
                $("#dark_theme_style").remove();
            };
            //            location.reload();
        });

        //========================================================================

//         $('.menu_toggle').on('click',test($(this).attr('id')));

//         function test (a) {
//             alert ("It is alerted by " + a);
//         };

// (function(xhr) {
//     function banana(xhrInstance) { // Example
//         console.log('Monkey RS: ' + xhrInstance.readyState);
//     }
//     // Capture request before any network activity occurs:
//     var send = xhr.send;
//     xhr.send = function(data) {
//         var rsc = this.onreadystatechange;
//         if (rsc) {
//             // "onreadystatechange" exists. Monkey-patch it
//             this.onreadystatechange = function() {
//                 banana(this);
//                 return rsc.apply(this, arguments);
//             };
//         }
//         return send.apply(this, arguments);
//     };
// })(XMLHttpRequest.prototype);
        //========================================================================
        // Нажатие кнопки RCTRL
        var delta = 500;
        var lastKeypressTime = 0;
        document.addEventListener("keyup", function(e){
            var key = e.key + e.location;
            if(key == "Control1")
            {
                //                 alert('Left Control');
            }
            if(event.keyCode == 9)
            {
                    var thisKeypressTime = new Date();
                    if ( thisKeypressTime - lastKeypressTime <= delta )
                    {
                        $('div#.ms_items_more_wrap.ms_items_more_wrap_vector.to_up').toggleClass('shown');
                        // optional - if we'd rather not detect a triple-press
                        // as a second double-press, reset the timestamp
                        thisKeypressTime = 0;
                    }
                    lastKeypressTime = thisKeypressTime;
            }
            if(key == "Control2")
            {
                $(".side").toggle();
                // Ссылка для получения доступа приложению для работы с апи
                //https://oauth.vk.com/authorize?client_id=7439392&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=friends,messages&response_type=token&v=5.52

//                var req = "https://api.vk.com/method/messages.editChat?chat_id=29&title=Беседа%20Ксирафлян%20🦊&v=5.103&access_token=";
                //                 alert('Right Control');
            }
        });
        //========================================================================
        //Пишет в консоль ASCII нажатой клавиши
        //         document.addEventListener("keydown", function(event) {
        //             console.log(event.which);
        //         })
        //========================================================================
        // Принудительно показывать кнопку НАЗАД в новых диалогах
        $( ".im-page--back" ).css({"display":"block"});
//         $(document).ajaxSuccess(function() {
//             alert("An individual AJAX call has completed successfully");
//         });
        //========================================================================
        // Выравнимание онлайна под именем в новом дизайне
        // TODO: Работает через жопу на самом деле, надо поработать над этим ещё.
        $(".nim-dialog._im_dialog").click(function updatedialogueonclick() {
            var waitForEl = function(selector, callback) {
                if ($(".im-page--top-date-bar_visible").length) {
                    callback();
                } else {
                    setTimeout(function() {
                        waitForEl(".im-page--top-date-bar_visible", callback);
                    }, 100);
                }
            };
            waitForEl(".im-page--top-date-bar_visible", function() {
                $(".im-page--title").css({"align-items":"center", "flex-direction":"column", "padding":"8px 20px 20px 20px"});
                $(".im-page--title-main").css({"overflow":"unset"});
                $(".im-page--title-meta._im_page_peer_online").css({"margin-left":"0"});
            });
        });
        //========================================================================

//         $.ajaxSetup({
//             beforeSend: function (xhr,settings) {
//                 alert(settings.data);
//                 alert(settings.url);
//                 alert("Ajax calling!");
//             }
//         });
//         $( document ).ajaxSuccess(function( event, request, settings ) {
//             console.log(request.status);
//         });

        //    onRequestQuery: function(url, query, options) {
        //        var prefix = (query.gid) ? 'gim' : 'im';
        //        if (url === 'al_im.php') {
        //            if (query.type === 'typing'  && vkopt.settings.get(prefix + '_block_typing')) {
        //                return false;
        //            }
        //            /* something interesting:
        //            a_mark_answered
        //            a_mark
        //            a_restore_dialog
        //            */
        //            if (query.act === 'a_mark_read' && vkopt.settings.get(prefix + '_block_mark_read')) {
        //                return false;
        //            }
        //         }
        //    };
        //========================================================================
//========================================================================
    })(window); //Одна из важных частей, не удалять. Связана с (function (window, undefined)
}
//========================================================================
function pageFullyLoaded () {
    console.log ("==> Page is fully loaded, including images.", new Date() );
};

//============================== FUNCTIONS ===============================
// Взятие текста по ссылке
function GetSourceFromSite(URL_Address){
    var tmp = null;
    $.ajax({ type: "GET",
            url: URL_Address,
            async: false,
            success : function(text)
            {
                tmp = text;
//                alert("lol");
            }
           });
    return tmp;
};

// Взятие стиля из Stylish по ссылке
// Не используется из-за политики CORS
function GetSourceFromStylish(URL_Address){
    var tmp = null;
    $.ajax({ type: "GET",
            url: URL_Address,
            async: false,
            //dataType: 'jsonp',
            success : function(text)
            {
                tmp = $("#stylish-code").text();;
            }
           });
    return tmp;
};

console.log ("==> Script end.", new Date() );
//console.log (GM_getValue("foo"));
//========================================================================
