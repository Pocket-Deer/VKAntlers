// ==UserScript==
// @name         VKAntlers
// @namespace    https://github.com/Pocket-Deer/VKAntlers
// @version      1.1.5
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
//
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
//
// ========================================================================


var jquery_script = function() {
    var tmp = null;
    window.jQuery.ajax({ type: "GET",
                        url: 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js',
                        async: false,
                        success : function(text)
                        {
                            tmp = text;
                        }
                       });
    return tmp;
}();

var jquery = document.createElement('script');
jquery.append(document.createTextNode(jquery_script));
(document.body || document.head || document.documentElement).append(jquery);

var main = function() {

//     $('._im_dialog_link').on('DOMContentLoaded', function(e) {
//         $(function(){
//             $("._im_dialog_link").css({"filter":"blur(4px)"});
//         });
//     });

//     var observer = new MutationObserver(function(mutations) {
//         mutations.forEach(function(mutation) {
//             $(mutation.addedNodes).find('._im_dialog_link').each(function() {
//                 /* do something */
//                 $("._im_dialog_link").css({"filter":"blur(4px)"});
//                 console.dir(this); // Note, it's a DOM element, use $(this) if needed
//             });
//         });
//     });

//     observer.observe(document.getElementByClass('_im_dialog_link'), { childList: true, subtree: true });

    // Очевидное сокращение JQuery до значка доллара
    var $ = window.jQuery;

    //-----------------------------------------------------------------
    // Перехватчик AJAX запросов
    (function(send){
        XMLHttpRequest.prototype.send = function(body) {
            // your code

            if (/act=a_send/.test(body)) {
                //var newstr = body.replace(/msg=/i, 'msg=%CC%A3');
                //body = newstr;
            };

            if (/act=a_mark_read/.test(body)) {
                if (vka_config.unread == true){
                    //console.log("READ ABORTED!");
                    XMLHttpRequest.abort();
                }
            };

            if(/act=a_activity/.test(body) && /type=typing/.test(body)){
                if (vka_config.untype == true){
                    //console.log("TYPE ABORTED!");
                    XMLHttpRequest.abort();
                };
            };

            send.call(this, body);
            //console.log ("Request sended!");
        };
    })(XMLHttpRequest.prototype.send);

    //-----------------------------------------------------------------
    // Переадресация при введении vk.com в адресную строку
    if(document.location == "https://vk.com/feed"){
        window.location.replace("https://vk.com/im")
    };

    //========================================================================
    document.addEventListener ("DOMContentLoaded", DOM_ContentReady);
    window.addEventListener ("load", pageFullyLoaded);

    //-----------------------------------------------------------------
    //Подгрузка стилей главного меню
    var mainMenu = GetSourceFromSite('https://raw.githubusercontent.com/Pocket-Deer/VKAntlers/master/mainmenu.html');
    var mainMenu_css = GetSourceFromSite('https://raw.githubusercontent.com/Pocket-Deer/VKAntlers/master/mainmenu.css');
    //var update_info_menu = GetSourceFromSite('https://raw.githubusercontent.com/Pocket-Deer/VKAntlers/master/popupupdate.html');
    var version_info = GetSourceFromSite('https://raw.githubusercontent.com/Pocket-Deer/VKAntlers/master/version_info.md');
    var mainMenu_stylein = '<style type="text/css">';
    var mainMenu_styleout = '</style>';

    $("head").after(mainMenu_stylein + mainMenu_css + mainMenu_styleout);
    $("head").after('<style type="text/css"> .background_deer {height: 25%; position: fixed; justify-content: center; margin: auto; left: 0; right: 0; top: 0; bottom: 0;} </style>');
    $("head").after('<div class="background_deer" style="display: none"><img style="display:inline-block; width: auto; height: 100%;" src="https://raw.githubusercontent.com/Pocket-Deer/VKAntlers/master/files/vkantlers_logo_dark_theme.png"></div>');
    $("head").after('<link href="https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@500&display=swap" rel="stylesheet">');
    $("head").after('<link href="https://fonts.googleapis.com/css2?family=Comfortaa&display=swap" rel="stylesheet">');
    $("head").after('<link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">');

    //$("#box_layer").after(update_info_menu);
    //$(".box_controls_text._box_controls_text").after(update_info);

    //-----------------------------------------------------------------
    // Подгрузка тем с исходников с гита
    // Данная тёмная тема принадлежит SayRus
    // Найдено на Stylish
    // https://userstyles.org/styles/175597/vk-dark-theme-material
    var dark_theme = GetSourceFromSite('https://raw.githubusercontent.com/Pocket-Deer/VKAntlers/master/dark_style.css');
    if (dark_theme != null || dark_theme != undefined){
        console.log("Dark Theme Downloaded!");
    } else
    {
        console.log("Dark Theme NOT downloaded! CHECK THIS");
    }
    //----------------
    //var timenow = new Date();

    //-----------------------------------------------------------------
    // Список всех возможных хэштегов
    var hashtag_list = ["флеймлучший", "задонать", "темнаятёма", "да", "дирохерел", "ачё\)", "сидидомаблэд", "фывапролджэ", "missingno",
                        "сижуахерел", "дистанционочка", "скибидивапа", "ойдевачьки", "настиле", "чайвсемуголова", "мрарф",
                        "гобухать", "сказочноебали", "дирлох", "ложка", "300bucks", "стыдпозорный", "ugotthat", "heybuddy", "яобязательновыживу",
                        "нечиталОчка", "слышработать", "кофемания", "hohol", "(﻿ ͡° ͜ʖ ͡°)", "атлишна", "дагестанскаясвадьба"];
    // Смена хэштега в левом верхнем углу во время пандемии 2020.
    var logo_hashtag_text = hashtag_list[Math.floor(Math.random() * hashtag_list.length)];

    //========================================================================
    // Получение данных сохранённых в TamperMonkey
    //var dark_style = GM_getValue("dark_style");
    //var theme_changer = GM_getValue("theme_changer");

    // По сути, вытаскивает первое значение
    //GM_setValue("vka_version", GetSourceFromSite('https://raw.githubusercontent.com/Pocket-Deer/VKAntlers/master/version_info').split('Версия ').shift().split('\n')[0]);
    //var vka_version = GM_getValue("vka_version");

    var vka_config_default = {
        // version
        version: "1.1.5",

        // style
        custom_theme: false,
        theme_type: "dark",
        custom_theme_autotoggle: false,
        ctt_end: "8",
        ctt_start: "20",
        custom_theme_icon: false,
        custom_hashtags: true,
        custom_back_button: true,
        hide_names: false,
        hide_messages: false,
        hide_photo: false,

        // patches
        unread: false,
        untype: false,
        offline: false,
        full_offline: false,

        // test
        test: true,
        test2: false,
        text: "test_text"
    }

    var vka_config;
    //var vka_version_text;
    vka_config = JSON.parse(localStorage.getItem("vka_config"));
    //console.log ("Config loaded and: " + JSON.stringify(vka_config));

    if (vka_config == undefined || vka_config == null){
        vka_config = vka_config_default;
        localStorage.setItem("vka_config", JSON.stringify(vka_config));

        $("body").ready(function() {
            update_show();
        });

        //console.log("Приветственное сообщение о установке свежего скрипта");
    };


    if(vka_config_default.version > vka_config.version){
        console.log ("BEFORE vka_config is:" + vka_config.version + " default is: " + vka_config_default.version);
        vka_config.version = vka_config_default.version;
        vka_config_set("version", vka_config.version);

        $("body").ready(function() {
            update_show();
        });

        //console.log("Сообщение что нового при обновлении");
    }

    if (vka_config.custom_theme == true){
        $("head").after('<style type="text/css" id="dark_theme_style">' + dark_theme + mainMenu_styleout);
        console.log("Theme changed on Dark by condition");
    };

    // Работа меню с базой данных
    $(".vka_content").ready(function() {
        $("input[type='checkbox'], input[type='radio']").on("click", function() {
            menu.onclick(this);
        });
        $("input[type='text']").keyup(function() {
            //$(this).change(function() {
                menu.onclick(this);
            //});

        });

        menu.onload();
    });

    //console.log("ds: " + dark_style + " tc: " + theme_changer + " vka_v: " + vka_version);

    //GM_setValue("theme_changer", "0"); // Для отключения автопереключения тёмной темы, замените 1 на 0
    //https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&display=swap

    // Решительно неясно, как это вообще использовать, фу
    //===================================================
    // ВСЁ ЧТО НИЖЕ ЗАПУСКАЕТСЯ ПОСЛЕ ЗАГРУЗКИ СТРАНИЦЫ =
    //===================================================
    function DOM_ContentReady () {
        (function (window, undefined) { //Одна из важных частей, не удалять. Связана с }(window)
            //========================================================================
            //========================================================================
            //         var w;
            //         if (typeof unsafeWindow != undefined) {
            //             w = unsafeWindow
            //         } else {
            //             w = window;
            //         };
            //         // [3] не запускаем скрипт во фреймах
            //         // без этого условия скрипт будет запускаться несколько раз на странице с фреймами
            //         if (w.self != w.top) {
            //             return;
            //         };
            //========================================================================
            // Не хочешь соглашаться с VKConnect?
            // upd: В жопу эту херь, она мне вк ломает.
            //      Когда-нибудь я справлюсь с этим
            //      Когда-нибудь...
            //$(".scroll_fix_wrap.fixed").remove();
            //$("#box_layer_bg.fixed").remove();
            //$("body").attr('style', 'overflow: auto;');
            //========================================================================

            //      $( "span.left_label inl_bl" ).replaceWith( "<span href=\"vk.com/feed/\" class=\"left_label inl_bl\">Новости</span>" );

            //========================================================================
            //====================== СОЗДАНИЕ ГЛАВНОГО МЕНЮ ==========================
            // var mainMenu = '';
            // var mainMenu_css = '';

            // Создание левых стилей и встраивание их на сайт
            //$("body").append('<link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&display=swap" rel="stylesheet">');
            //GM_addStyle ('.body_im {font-family: "Comfortaa", cursive !important; }');

            // Создание главного меню
            $("body").append(mainMenu);
            // Создание кнопочки открывающей меню
            var vkantlers_menu = '<div class="head_nav_item deer" style="float: right;padding: 9px;"><a id="vkantlers_toggle" style="font-size: 20px;">🦌</a></div>';
            $(".HeaderNav").append(vkantlers_menu);

            //        $("body").append('<div style="position: absolute; top:0; right:0; z-index: 999">' + vka_version + '</div>');
            //========================================================================
            //         $(".vka_content").ready(function() {
            //             console.log( 'SERIALIZED:' + $(".vka_innerBlock:first").serialize() );
            //         });

//             $(".vka_content").ready(function() {
//                 function showValues() {
//                     var str = $("form.vka_form").serialize();
//                     console.log("Serialize:" + str)
//                 }
//                 $("input[type='checkbox'], input[type='radio']").on( "click", showValues );
//                 $("select").on( "change", showValues );
//                 showValues();
//             });

            // Всплывающее уведомление

            // <div id="notifiers_wrap" class="fixed" style="bottom: 0px;"><div class="notifier_baloon_wrap" style="visibility: visible;">
            //                     <div class="notifier_baloon notifier_type_mail" style="opacity: 1;">
            //                       <div class="notifier_baloon_head clear_fix">
            //                         <a class="notifier_close_wrap" role="link" title="Закрыть" aria-label="Закрыть"></a>
            //                         <h4 class="notifier_baloon_title">Установлено обновление</h4>
            //                       </div>
            //                       <div class="notifier_baloon_body clear_fix">
            //                         <div class="notifier_image_wrap"><a href="/id527557359"><img alt="" src="/images/camera_100.png?ava=1" class="notifier_image"></a></div>
            //                         <div class="notifier_baloon_msg wrapped"><span class="notifier_author_quote"><a href="/id527557359" class="mem_link">VKAntlers</a></span> Нажмите на меня что-бы узнать подробности!</div>
            //                       </div>
            //                     </div></div></div>

            //         console.log("Config_style_theme_type is: " + vka_config.style.theme_type);
            //         console.log('Unstringify Config: ' + JSON.parse(JSON.stringify(vka_config)));
            //         console.log("Config is: " + JSON.stringify(vka_config));

            //========================================================================

//             $.each(vka_config, function (key, value) {
//                 var field = document.getElementById(key);
//                 if(field.type == 'radio' || field.type == 'checkbox'){
//                     field.checked = value;
//                 }else{
//                     field.value = value;
//                 }
//             });

            // Тыканье на кнопку пееркючения темы в шапке
            $(document).ready(function() { // Без неё, клик не работает, что очень интересно, надо изучить
                $("#dark_theme_toggle").on("click", function(){
                    $("#custom_theme").click();
                });
            });


            // Тыкалка для открытия менюшки
            $("#vkantlers_toggle").on("click", function vkantlers_menu_toggle(){
                //console.log("CLicked on deer");
                $('.vka_parent').toggleClass('vka_parent_flex');
            });

            $('.vka_section').on("click",function() {
                $(this).next('.vka_innerBlock').toggleClass('vka_displayBlock');
            });

            $('.vka_close').on("click",function() {
                $('.vka_parent').removeClass('vka_parent_flex');
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
            // Нажатие кнопки на клавиатуре
            var delta = 500;
            var lastKeypressTime = 0;
            document.addEventListener("keyup", function(e){
                var key = e.key + e.location;
                if(key == "Control1") // Левый CTRL
                {
                    //alert('Left Control');
                }
                if(key == "Control2") // Правый CTRL
                {
                    // do nothing, of course
                }
                if(event.keyCode == 9) // TAB
                {
                    var thisKeypressTime = new Date();
                    if ( thisKeypressTime - lastKeypressTime <= delta )
                    {
                        $('div.ms_items_more_wrap.ms_items_more_wrap_vector.to_up').toggleClass('shown');
                        // optional - if we'd rather not detect a triple-press
                        // as a second double-press, reset the timestamp
                        thisKeypressTime = 0;
                    }
                    lastKeypressTime = thisKeypressTime;
                }
            });

            //========================================================================
            //Пишет в консоль ASCII нажатой клавиши
            //         document.addEventListener("keydown", function(event) {
            //             console.log(event.which);
            //         })
            //========================================================================
            // Принудительно показывать кнопку НАЗАД в новых диалогах
            //$(".im-page--back").css({"display":"block"});
            //========================================================================

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

            //            onRequestQuery: function(url, query, options) {
            //                var prefix = (query.gid) ? 'gim' : 'im';
            //                if (url === 'al_im.php') {
            //                    if (query.type === 'typing'  && vkopt.settings.get(prefix + '_block_typing')) {
            //                        return false;
            //                    }
            //                    /* something interesting:
            //                    a_mark_answered
            //                    a_mark
            //                    a_restore_dialog
            //                    */
            //                    if (query.act === 'a_mark_read' && vkopt.settings.get(prefix + '_block_mark_read')) {
            //                        return false;
            //                    }
            //                 }
            //            };
            //         ========================================================================
            //$("body").fadeIn(1000);
            //========================================================================

        })(window); //Одна из важных частей, не удалять. Связана с (function (window, undefined)
    }
    //========================================================================
    function pageFullyLoaded () {
        console.log ("==> Page is fully loaded, including images.", new Date() );
    };

    //============================== FUNCTIONS ===============================

    // Выставление значений к дефолтным
    // function vka_config_set_default (){
    // //    GM_setValue("vka_config", vka_config_default);
    //     vka_config = vka_config_default;
    //     console.log ("vka_config is resetti! Reload page?");
    // }

    function update_show(){
        var version_info_in = '<div class="version_info" style="height: 100%;width: 100%;z-index: 999;background-color: rgba(0,0,0,0.5);display: flex;position: fixed;top: 0;left: 0;align-items: center;/* align-content: center; */justify-content: center;">';
        var version_info_out = '</div>';
        $("body").append(version_info_in + '<div style="background-color: white; color: black; font-size: 18px; width: 50%; padding: 20px; overflow: auto; height: 75%; border: 4px solid black; border-radius: 10px;">' + version_info + "</div>" + version_info_out);
        $('.version_info').on('click', function() {
            $(this).remove();
        });
    };

    var menu = {
        onclick: function (name){
            //console.log("Clicked on: " + name.id + ". Checked: " + name.checked + " Value: " + name.value);
            if (name.type == "radio" || name.type == "checkbox"){
                vka_config_set(name.id, name.checked);
            }
            if (name.type == "text"){
                vka_config_set(name.id, name.value);
            }
            if ($.isEmptyObject(func[name.id])){
            } else {
                var onclick = true;
                func[name.id](onclick);
            };
        },

        onload: function (){
            $(".vka_field, .vka_textarea").each(function(){
                if (this.type == "radio" || this.type == "checkbox"){
                    //console.log("TESTED checkbox\radio: \"" + this.id + "\" and value is: " + this.checked);
                    $(this).prop("checked", vka_config_get(this.id));
                    if ($.isEmptyObject(func[this.id])){
                    } else {
                        func[this.id]();
                    };
                    //console.log("Checked?");
                    //                        mngrFields[this.id] = this.checked;
                } if (this.type == "text") {
                    //console.log("TESTED textarea: " + this.id + " and value is: " + this.value);
                    //                        mngrFields[this.id] = this.value;
                    $(this).prop("value", vka_config_get(this.id));
                    if ($.isEmptyObject(func[this.id])){
                    } else {
                        func[this.id]();
                    };
                } else {
                    //console.log("TESTED other ones: \"" + this.id + "\" and value is: " + this.value);
                };
            });
        },
    };

    // Все функции переключения и прочего, важная часть
    var func = {
        custom_theme: function (onclick){
            //console.log("dark_theme_func is running! custom_theme is: " + vka_config.custom_theme);
            //$(".background_deer").css({'display':'flex'});

            if (vka_config.custom_theme == true && vka_config.theme_type == "dark"){
                if (onclick == true){
                    $(".background_deer").css({'display':'flex'});
                    $("body").fadeOut(500, function() {
                        // Switch the stylesheet
                        $("head").after('<style type="text/css" id="dark_theme_style">' + dark_theme + mainMenu_styleout);
                        //console.log("Theme changed on Dark by function");
                        // And then:
                        $("body").fadeIn(1000, 'swing', function() {
                            $(".background_deer").css({'display':'none'});
                        });
                    } );
                    $("html").css('background', '#edeef0');
                } else {
                    //$("head").after('<style type="text/css" id="dark_theme_style">' + dark_theme + mainMenu_styleout);
                }

            } if (vka_config.custom_theme == false) {
                if (onclick == true){
                    $(".background_deer").css({'display':'flex'});
                    $("body").fadeOut(500, function() {
                        // Switch the stylesheet
                        $("#dark_theme_style").remove();
                        //console.log("Theme changed on Standart by function");
                        // And then:
                        $("body").fadeIn(1000, 'swing', function() {
                            $(".background_deer").css({'display':'none'});
                        });
                    } );
                    $("html").css('background', '#24282d');
                } else {
                    //$("#dark_theme_style").remove();
                };
            };
        },

        custom_theme_icon: function(){
            // Создание кнопочки темы
            var dark_theme_block_button = '<div class="head_nav_item moon" style="float: right;padding: 9px;"><a id="dark_theme_toggle" style="font-size: 20px;">🌒</a></div>';
            if (vka_config.custom_theme_icon == true){
                $(".HeaderNav").append(dark_theme_block_button);
            } else {
                $(".head_nav_item.moon").remove();
            }
        },

        custom_hashtags: function(){
            //Изменение названия возле диалога с хештегом
            if (vka_config.custom_hashtags == true){
                //            var hashtagname = GM_getValue("logo_hashtag_text");
                //        $("div.CovidLogo__hashtag").replaceWith("<div class=\"CovidLogo__hashtag \">#" + hashtagname + "</div>");
                $(".top_home_link.fl_l").append('<div class="vka_hashtags">#' + logo_hashtag_text + "</div>");
                $(".top_home_link.fl_l").css({"display":"inline-flex","align-items":"center"});
                $(".top_home_logo").css({"margin":"0px 10px 0 0"});
            } else {
                $(".vka_hashtags").remove();
            };
        },

        custom_back_button: function(){
            // Выравнимание онлайна под именем в новом дизайне
            $("body").on('DOMSubtreeModified', '.im-page--title-wrapper', function() {
                if (vka_config.custom_back_button == true){
                    $(".im-page--back").css({"display":"block"});
                    $(".im-page--title").css({"align-items":"center", "flex-direction":"column", "padding":"8px 20px 20px 20px"});
                    $(".im-page--title-main").css({"overflow":"unset"});
                    $(".im-page--title-meta._im_page_peer_online").css({"margin-left":"0"});
                } else {
                    $(".im-page--back").css({"display":"none"});
                    $(".im-page--title").css({"align-items":"center", "flex-direction":"none", "padding":"15px 20px"});
                    $(".im-page--title-main").css({"overflow":"hidden"});
                    $(".im-page--title-meta._im_page_peer_online").css({"margin-left":"8px"});
                };
            });
        },

//         hide_names: function(){

//         },

        hide_messages: function(){
        },

        hide_photo: function(){
        },
    }

    if (vka_config.hide_names == true){
//         $(function(){
//         $("._im_dialog_link").css({"filter":"blur(4px)"});
//         });
    }

    function test_onclick(data){
        alert(data);
        return (this.checked=!this.checked);
    };

    function vka_config_set(name, value) {
        vka_config[name] = value;
//        console.log("vka_config_set_func is running and values is: " + vka_config[name] + "=" + value);
        localStorage.setItem("vka_config", JSON.stringify(vka_config));
    };

    function vka_config_get(name) {
        var vkac = JSON.parse(localStorage.getItem("vka_config"));
        return vkac[name];
    };

    // SLEEP Функция
    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }
        }
    }

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

    // Парсинг системного времени и изменение стиля в зависимости от времени
    if (vka_config.custom_theme_autotoggle == true){
        (function (){
            function checkTime(i) {
                return (i < 10) ? "0" + i : i;
            }
            var chck = 0;
            function startTime() {
                var today = new Date(),
                    h = checkTime(today.getHours()),
                    m = checkTime(today.getMinutes()),
                    s = checkTime(today.getSeconds());

                //document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
                //console.log(h + ":" + m + ":" + s);
                if ((h >= vka_config.ctt_start || h < vka_config.ctt_end) && chck == 0){
                    vka_config.custom_theme = true;
                    func.custom_theme(true);
                    chck = 1;
                    console.log("DARK_THEME ON");
                    console.log("Dark Theme LOADED with THEME_CHANGER");
                } if ((h < vka_config.ctt_start && h >= vka_config.ctt_end) && chck == 1){
                    vka_config.custom_theme = false;
                    func.custom_theme(true);
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

};

var code = main.toString().match(/^.+?\{([\s\S]+)\}$/)[1];
var script = document.createElement('script');
script.appendChild(document.createTextNode(code));
(document.body || document.head || document.documentElement).appendChild(script);
