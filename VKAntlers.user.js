// ==UserScript==
// @name         VKAntlers [dev]
// @namespace    https://github.com/Pocket-Deer/VKAntlers
// @version      1.1.6
// @description  Make it more useful!
// @author       Pocket Deer
// @homepage     https://github.com/Pocket-Deer/VKAntlers
// @updateURL    https://github.com/Pocket-Deer/VKAntlers/raw/dev/VKAntlers.user.js
// @downloadURL  https://github.com/Pocket-Deer/VKAntlers/raw/dev/VKAntlers.user.js
// @include      *://vk.com/*
// @include      *://*.vk.com/*
// @match        *://vk.com/*
// @match        *://*.vk.com/*
// @match        *://userapi.com/*
// @match        *://*.userapi.com/*
// @match        *://*.userstyles.org/*
// @match        https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&display=swap
// @require      http://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js
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
// обойтись без ненужной и тупой критики.
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
// Огромное спасибо выражается создателю VKOpt, за помощь по моим глупым
// вопросам, а так же моим друзьям, которые поддерживали меня и
// помогали мне в наполнении аддона новыми и интересными йункциями.
//
// А так же спасибо вам, пользователям.
//
// С любовью, ваш говнокодер - Pocket Deer
//
// ========================================================================

// ========================================================================
// Добавление на страницу JQuery

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

//if(document.location.href.indexOf('audios') === -1){
var jquery = window.document.createElement('script');
jquery.type = 'text/javascript';
jquery.append(window.document.createTextNode(jquery_script));
(window.document.body || window.document.head || window.document.documentElement).append(jquery);
//};

// ========================================================================
// Исходный скрипт, добавляющийся на страничьку, не нравится, удоляй

var main = function() {
    var $ = window.jQuery;

    // ====================================================================
    // Переменные

    var hashtag_list = ["флеймлучший", "задонать", "темнаятёма", "да", "дирохерел", "ачё\)", "сидидомаблэд", "фывапролджэ", "missingno",
                        "сижуахерел", "дистанционочка", "скибидивапа", "ойдевачьки", "настиле", "чайвсемуголова", "мрарф",
                        "гобухать", "сказочноебали", "дирлох", "ложка", "300bucks", "стыдпозорный", "ugotthat", "heybuddy", "яобязательновыживу",
                        "нечиталОчка", "слышработать", "кофемания", "hohol", "(﻿ ͡° ͜ʖ ͡°)", "атлишна", "42"];
    var logo_hashtag_text = hashtag_list[Math.floor(Math.random() * hashtag_list.length)];

    //Подгрузка менюшки
    var vka_menu = vka_getraw("https://raw.githubusercontent.com/Pocket-Deer/VKAntlers/dev/mainmenu.html");
    var vka_menu_css = vka_getraw("https://raw.githubusercontent.com/Pocket-Deer/VKAntlers/dev/mainmenu.css");

    //var test_color = '#444444';
    //$('head').append('<style type="text/css">#page_header_cont {background-color: $(test_color) !important}</style>');
    var vka_config = JSON.parse(localStorage.getItem("vka_config"));
    if (vka_config != null || vka_config != '' || vka_config != undefined){
        console.log ("Config loaded and: " + JSON.stringify(vka_config));
    } else {
        console.log('Config not loaded. Maybe some error?')
    };
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
        custom_hashtags: false,
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
        text: "test_text",

        // development
        dev_alerts: false,
        dev_msg: false
    };

    // Функции при переключении пунктов меню
    var vka_func = {

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
//             var dark_theme_block_button = '<div class="head_nav_item moon" style="float: right;padding: 9px;"><a id="dark_theme_toggle" style="font-size: 20px;">🌒</a></div>';
//             if (vka_config.custom_theme_icon == true){
//                 $(".HeaderNav").append(dark_theme_block_button);
//             } else {
//                 $(".head_nav_item.moon").remove();
//             }
        },

        custom_hashtags: function(){
            //Изменение названия возле диалога с хештегом
            if (vka_config.custom_hashtags == true){
                preload_load('page_header_wrap', preload.custom_hashtags);
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

        hide_names: function(){
            if (vka_config.hide_names == true){
                $('head').append('<style id="hide_names" type="text/css">.nim-dialog .nim-dialog--name .nim-dialog--name-w{filter: blur(4px) !important} .im-right-menu .im-right-menu--text{filter: blur(4px) !important} .im-page--title-main{filter: blur(4px) !important}</style>');
            } else {
                $('#hide_names').remove()
            };
        },

        hide_messages: function(){
            if (vka_config.hide_messages == true){
                $('head').append('<style id="hide_messages" type="text/css">.nim-dialog.nim-dialog_classic .nim-dialog--text-preview{filter: blur(4px) !important}</style>');
            } else {
                $('#hide_messages').remove()
            };
        },

        hide_photo: function(){
            if (vka_config.hide_photo == true){
                $('head').append('<style id="hide_photo"type="text/css">.nim-dialog.nim-dialog_classic .nim-dialog--photo{filter: blur(10px) !important}</style>');
            } else {
                $('#hide_photo').remove()
            };
        },
    };

    // Загрузка кода до полной загрузки страницы. Использует MutationObserver
    var preload = {
        mainmenu: function(){
            var vkantlers_menu = '<li class="HeaderNav__item deer" style="float: right;padding: 9px;"><a id="vkantlers_toggle" style="font-size: 20px;">🦌</a></li>';
            $('#top_nav').append(vkantlers_menu);
        },
        custom_hashtags: function(){
            $(".top_home_link.fl_l").append('<div class="vka_hashtags">#' + logo_hashtag_text + "</div>");
            $(".top_home_link.fl_l").css({"display":"inline-flex","align-items":"center"});
            $(".top_home_logo").css({"margin":"0px 10px 0 0"});
        }
    };

    // Не добавлять менюшку в аудиозаписи
    // TODO: Сделать её наконец, а то при добавлении на страницу с аудио
    // менюшка тупо ломается и добавляется в виде текста
    if(document.location.href.indexOf('audios') === -1){
        preload_load('page_header_wrap', preload.mainmenu);
    };

    // ====================================================================
    // Основные команды

    // Добавление меню на сайт
    $("head").after(vka_menu_css);
    $("body").ready(function() {
        $(".HeaderNav__item.deer").append(vka_menu);
    });

    $(document).on("click", "#vkantlers_toggle", function(){
        vka_menu_toggle();
    });

    // Ставит дефолтные настройки, если не существует, или версия обновлена
    // TODO: Перенастройка настроек при обновлении на новую версию
    if (vka_config == undefined || vka_config == null){
        vka_config = vka_config_default;
        localStorage.setItem("vka_config", JSON.stringify(vka_config));
        $("body").ready(function() {
//            update_show();
        });
    };

    // Применяет настройки на странице
    vka_set();

    // Дебаггеры
    if (vka_config.dev_alerts == true){
        alert('dev_alerts is active!');
        window.onerror = function(message, url, lineNumber) {
            //save error and send to server for example.
            alert(message + ' on line: ' + lineNumber + '\nURL: ' + url);
            return true;
        };
    };

    // Заполнение меню настройками с базы данных
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

    // Перехватчик XML запросов
    if (vka_config.unread == true){
        (function(send){
            XMLHttpRequest.prototype.send = function(body) {
                if (/act=a_mark_read/.test(body)) {
                    XMLHttpRequest.abort();
                };
//                 if (/act=a_start/.test(body)) {
//                     var newstr = body.replace(/al=1/, 'al=2');
//                     body = newstr;
//                 };
                send.call(this, body);
            };
        })(XMLHttpRequest.prototype.send);
    };

    if (vka_config.offline == true){
        (function(send){
            XMLHttpRequest.prototype.send = function(body) {
                if (/act=a_mark_read/.test(body) || /act=a_activity/.test(body)) {
                    XMLHttpRequest.abort();
                };
                send.call(this, body);
            };
        })(XMLHttpRequest.prototype.send);
    };


    // ====================================================================
    // Функции

    function vka_menu_toggle(){
        console.log("Clicked on deer");
        $('.vka_parent').toggleClass('vka_parent_display');
    };

    function preload_load(class_target, func){
        // Добавляет кнопку менюшки во время загрузки страницы
        var observer = new MutationObserver(function(mutations) {
            for (var i=0; i<mutations.length; i++) {
                var mutationAddedNodes = mutations[i].addedNodes;
                for (var j=0; j<mutationAddedNodes.length; j++) {
                    var node = mutationAddedNodes[j];
                    if (node.classList && node.classList.contains(class_target)) {
                        node.firstElementChild.innerHTML = node.firstElementChild.innerHTML.replace(/[\d.]+/g, function(m) { return 2 * m });
                        // don't hog resources any more as we've just done what we wanted
                        func();
                        observer.disconnect();
                        return;
                    }
                }
            }
        });
        observer.observe(document, {childList: true, subtree: true});
    };

    // Самая главная функция работы с меню
    var menu = {
        onclick: function (name){
            //console.log("Clicked on: " + name.id + ". Checked: " + name.checked + " Value: " + name.value);
            if (name.type == "radio" || name.type == "checkbox"){
                vka_config_set(name.id, name.checked);
            }
            if (name.type == "text"){
                vka_config_set(name.id, name.value);
            }
            if ($.isEmptyObject(vka_func[name.id])){
            } else {
                var onclick = true;
                vka_func[name.id](onclick);
            };
        },

        onload: function (){
            $(".vka_field, .vka_textarea").each(function(){
                if (this.type == "radio" || this.type == "checkbox"){
                    //console.log("TESTED checkbox\radio: \"" + this.id + "\" and value is: " + this.checked);
                    $(this).prop("checked", vka_config_get(this.id));
                    if ($.isEmptyObject(vka_func[this.id])){
                    } else {
                        vka_func[this.id]();
                    };
                    //console.log("Checked?");
                    //                        mngrFields[this.id] = this.checked;
                } if (this.type == "text") {
                    //console.log("TESTED textarea: " + this.id + " and value is: " + this.value);
                    //                        mngrFields[this.id] = this.value;
                    $(this).prop("value", vka_config_get(this.id));
                    if ($.isEmptyObject(vka_func[this.id])){
                    } else {
                        vka_func[this.id]();
                    };
                } else {
                    //console.log("TESTED other ones: \"" + this.id + "\" and value is: " + this.value);
                };
            });
        },
    };

    function vka_set(setting){
        if (setting == null || setting == undefined){
            for (var i=0; i<Object.keys(vka_config).length; i++){
                var temp = Object.keys(vka_config)[i];
                for (var j=0; j<Object.keys(vka_func).length; j++){
                    if (temp == Object.keys(vka_func)[j]){
                        vka_func[temp]();
                    };
                };
            };
        } else {
            //???
        };
    };

    // Берёт исходник кода со страницы
    function vka_getraw(URL_Address){
        var tmp = null;
        $.ajax({ type: "GET",
                url: URL_Address,
                async: false,
                success : function(text){
                    tmp = text;
                }
               });
        return tmp;
    };

    // Ставит значение в определённую переменную в конфиге
    function vka_config_set(name, value) {
        vka_config[name] = value;
        localStorage.setItem("vka_config", JSON.stringify(vka_config));
    };

    // Загружает значение переменной из конфига
    function vka_config_get(name) {
        var vkac = JSON.parse(localStorage.getItem("vka_config"));
        return vkac[name];
    };

};

// ========================================================================
// Инжект скрипта в страницу

var code = main.toString().match(/^.+?\{([\s\S]+)\}$/)[1];
var script = document.createElement('script');
script.type = 'text/javascript';
script.appendChild(document.createTextNode(code));
(document.body || document.head || document.documentElement).appendChild(script);
