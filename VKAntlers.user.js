// ==UserScript==
// @name         VKAntlers
// @namespace    http://tampermonkey.net/
// @version      0.1.0.12
// @description  Make it more useful!
// @author       Pocket Deer
// @updateURL    https://github.com/Pocket-Deer/VKAntlers/raw/master/VKAntlers.user.js
// @downloadURL  https://github.com/Pocket-Deer/VKAntlers/raw/master/VKAntlers.user.js
// @include      *://vk.com/*
// @include      *://*.vk.com/*
// @match        *://vk.com/*
// @match        *://*.vk.com/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @run-at       document-start
// @noframes
// ==/UserScript==

//testified
//========================================================================
// Переадресация при введении vk.com в адресную строку
if(document.location == "https://vk.com/feed"){
    window.location.replace("https://vk.com/im")
};
//========================================================================
document.addEventListener ("DOMContentLoaded", DOM_ContentReady);
window.addEventListener ("load", pageFullyLoaded);
//========================================================================
GM_setValue("foo","bar");
function DOM_ContentReady () {
    (function (window, undefined) { //Одна из важных частей, не удалять. Связана с }(window)
        //========================================================================
        var $ = window.jQuery;
        //========================================================================
        var w;
        if (typeof unsafeWindow != undefined) {
            w = unsafeWindow
        } else {
            w = window;
        }

        // [3] не запускаем скрипт во фреймах
        // без этого условия скрипт будет запускаться несколько раз на странице с фреймами
        if (w.self != w.top) {
            return;
        }
        //========================================================================
        //Изменение названия возле диалога с хештегом
        var hashtagname = "телегалучше"
        $("div.CovidLogo__hashtag").replaceWith("<div class=\"CovidLogo__hashtag \">#" + hashtagname + "</div>");
        //      $( "span.left_label inl_bl" ).replaceWith( "<span href=\"vk.com/feed/\" class=\"left_label inl_bl\">Новости</span>" );
        //========================================================================
        //====================== СОЗДАНИЕ ГЛАВНОГО МЕНЮ ==========================
        var mainMenu = '<div class="side"> <ul class="menu"> <li class="menu__list"><a href="#">Пункт 1</a> <ul class="menu__drop"> <li><a href="#">Подпункт 1</a></li> <li><a href="#">Подпункт 2</a></li> </ul> </li> <li><a href="#">Пункт 2</a></li> <li class="menu__list"><a href="#">Пункт 3</a> <ul class="menu__drop"> <li><a href="#">Подпункт 1</a></li> <li><a href="#">Подпункт 2</a></li> <li><a href="#">Подпункт 3</a></li> <li><a href="#">Подпункт 4</a></li> </ul> </li> <li><a href="#">Пункт 4</a></li> </ul> </div>';
        var mainMenu_css = '.side a{ text-decoration: none; }  .side ul{ margin: 0; padding: 0; list-style: none; }  .side{ z-index: 99999; display: none; text-decoration: none; width: 200px; margin: 10px; position: absolute; top: 47px; right: 10px; }  .menu a{ background-color: rgba(0, 0, 0, 0.5); color: #fff; padding: 10px; display: block; border-bottom: solid 1px #666; transition: 0.25s all; }  .menu a:hover{ background-color: rgba(0, 0, 0, 0.35); }  /* Всплывающие пункты меню */  .menu__list{ position: relative; box-sizing: border-box; border-right: 4px solid rgb(0, 161, 255); }  .menu__drop{ position: absolute; width: 100%; right: 100%; top: -99999em; transition: 0.25s opacity; opacity: 0; }  .menu__list:hover .menu__drop{ opacity: 1; top: 0; }';
        //         var mainMenu_css = '';
        var mainMenu_stylein = '<style type="text/css">';
        var mainMenu_styleout = '</style>';
        $("body").append(mainMenu);
        $("head").append(mainMenu_stylein + mainMenu_css + mainMenu_styleout);
        //========================================================================
        // Нажатие кнопки RCTRL
        document.addEventListener("keyup", function(e){
            var key = e.key + e.location;
            if(key == "Control1")
            {
                //                 alert('Left Control');
            }
            if(key == "Control2")
            {
                $(".side").toggle();
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
console.log ("==> Script end.", new Date() );
console.log (GM_getValue("foo"));
//========================================================================
