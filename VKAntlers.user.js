// ==UserScript==
// @name         VKAntlers
// @namespace    https://github.com/Pocket-Deer/VKAntlers
// @version      0.1.0.21
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
// @require      http://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// @run-at       document-start
// @noframes
// ==/UserScript==

// =============================== ВАЖНО ==================================
// Прочитайте, если вы зашли в исходник кода по какой-то своей причине
// и уделите пожалуйста этому хотя бы немного внимания.
// Если вы зашли сюда что-то поменять, или же что-то использовать для
// своих целей, то скажу сразу - да, я не профессиональный кодер и
// мой код можно считать говнокодом, есть косяки, есть недочёты,
// есть костыли и прочее, так что поймите меня правильно и прошу вас
// обойтись без лишней критики.
// Итак
// Во первых, если вы зашли сюда что-то поменять, поругать меня и
// исправить в своём стиле - для этого есть чёртов гит. Я его
// использую именно для этого, чтобы вы могли давать свои идеи и
// я мог их реализовать, так же вы могли бы сказать мол
// "Вот тут лучше использовать такой код, а не такой", и
// я отнесусь к этом с понимаением и постараюсь разобраться со всем,
// или же сообщать мне об ошибках, которые я постараюсь решить
// в скором времени.
// Во вторых, если вы скопировали этот код с репозитория, и собираетесь
// использовать его в своих целях, или ж в своём проекте, прошу,
// ссылайтесь хоть как-то на исходник, т.е. сюда, откуда вы взяли
// тот или иной кусочек. Так вы хотя бы выразите свою благодарность
// в предоставлении вам какой-либо идеи и её реализации.
// Ну и так же завоюете моё уважение, если я встречу свой кусочек
// кода в вашем проекте
//
// С любовью, ваш говнокодер - Pocket Deer
// ========================================================================

// ВСЁ ЧТО НИЖЕ ЗАПУСКАЕТСЯ ДО ЗАГРУЗКИ СТРАНИЦЫ
// ========================================================================
// Переадресация при введении vk.com в адресную строку
if(document.location == "https://vk.com/feed"){
    window.location.replace("https://vk.com/im")
};
//========================================================================
document.addEventListener ("DOMContentLoaded", DOM_ContentReady);
window.addEventListener ("load", pageFullyLoaded);
//========================================================================
//---------------- Очевидное сокращение JQuery до значка доллара
var $ = window.jQuery;
//---------------- Подгрузка стилей главного меню
var mainMenu = GetSourceFromSite('https://raw.githubusercontent.com/Pocket-Deer/VKAntlers/master/mainmenu.html');
var mainMenu_css = GetSourceFromSite('https://raw.githubusercontent.com/Pocket-Deer/VKAntlers/master/style.css');
var mainMenu_stylein = '<style type="text/css">';
var mainMenu_styleout = '</style>';
//---------------- Подгрузка тем с исходников с гита
var dark_theme = GetSourceFromSite('https://raw.githubusercontent.com/Pocket-Deer/VKAntlers/master/dark_style.css');
//----------------
//var timenow = new Date();
//----------------
//----------------
//----------------
//----------------
//========================================================================
// Добавление стиля при выполненном условии
// TODO: Переименовать значение для остальных тем и их значений (от 1 до n)
if (GM_getValue("dark_style") == 1){
    $("head").append('<style type="text/css" id="dark_theme_style">' + dark_theme + mainMenu_styleout);
}
//========================================================================
// Смена хэштега в левом верхнем углу во время пандемии 2020.
GM_setValue("logo_hashtag_text","дирохерел");
//========================================================================
// Получение данных сохранённых в TamperMonkey
var dark_style = GM_getValue("dark_style");
var theme_changer = GM_getValue("theme_changer");

GM_setValue("theme_changer", "1"); // Для отключения автопереключения тёмной темы, замените 1 на 0
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
        // TODO: Убрать и заменить, или использовать в дальнейшей менюхе
        $('.menu_toggle').on("click",function() {
            $(this).toggleClass('menu_toggle_on')
        });

        // Скрипт смены стиля по клику кнопки и запись в ГМ
        $("#dark_theme_toggle").on("click", function dark_theme_toggle(){
            dark_style = GM_getValue("dark_style");
            dark_style = (dark_style==0 ? 1 : 0); // TODO: Слишком муторная херня, исправить попроще и убрать лишний var
            GM_setValue ("dark_style", dark_style);// Ну потому что ну ты посомтри, что за стыдоба то ну, не по уму сделано.
            dark_theme_func();
            //            location.reload();  // А вот это нахрен не надо, сделал так, что меняет без обновления страницы.
        });


        // Скрипт смены тёмного стиля по времени от 21 вечера до 8 утра


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

console.log("1");
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
console.log("2");
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
console.log("3");
// Функция переключения тёмного стиля
function dark_theme_func(){
    if (dark_style == 1){
        $("head").append('<style type="text/css" id="dark_theme_style">' + dark_theme + mainMenu_styleout);
    } if (dark_style == 0) {
        $("#dark_theme_style").remove();
    }
};

// Парсинг системного времени и изменение стиля в зависимости от времени
if (theme_changer == 1){
    (function (){
        function checkTime(i) {
            return (i < 10) ? "0" + i : i;
        }

        function startTime() {
            var today = new Date(),
                h = checkTime(today.getHours()),
                m = checkTime(today.getMinutes()),
                s = checkTime(today.getSeconds());
            var chck = 0;
            //document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
            console.log(h + ":" + m + ":" + s);
            if ((h >= 22 || h < 8) && chck == 0){
                GM_setValue ("dark_style", "1");
                dark_style = 1;
                dark_theme_func();
                chck = 1;
                console.log("DARK_THEME ON");
            } if ((h < 22 && h >= 8) && chck == 1){
                GM_setValue ("dark_style", "0");
                dark_style = 0;
                dark_theme_func();
                chck = 0;
                console.log("DARK_THEME OFF");
            };
            var t = setTimeout(function () {
                startTime()
            }, 60000);
        }
        startTime();
    })();
};
console.log ("==> Script end.", new Date() );
//console.log (GM_getValue("foo"));
//========================================================================
