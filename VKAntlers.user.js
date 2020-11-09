// ==UserScript==
// @name         VKAntlers
// @namespace    https://github.com/Pocket-Deer/VKAntlers
// @version      1.2
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
// @run-at       document-start
// @noframes
// ==/UserScript==

// ========================================================================
// Добавление на страницу исходник JQuery
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

var jquery = window.document.createElement('script');
jquery.type = 'text/javascript';
jquery.append(window.document.createTextNode(jquery_script));
(window.document.body || window.document.head || window.document.documentElement).append(jquery);

// ========================================================================
// Исходный скрипт, который потом добавляется на страницу
var main = function() {

    // VKAntlers loves you!
    // --------------------------------------------------------------------
    // Очевидное сокращение команды
    var $ = window.jQuery;

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Конфигурация
    var vka_dev = false;

    // Дефолтный конфиг
    var vka_config_default = {
        // version
        version: "1.2",

        // style
        custom_theme: false,
        custom_theme_type: "dark",
        custom_theme_autotoggle: false,
        ctt_end: "8",
        ctt_start: "20",
        custom_theme_icon: false,
        custom_hashtags: false,
        custom_back_button: true,
        hide_names: false,
        hide_messages: false,
        hide_photo: false,

        // left menu customization
        custom_left_menu: false,
        vka_l_pr: "Моя страница",
        vka_l_nwsf: "Новости",
        vka_l_msg: "Мессенджер",
        vka_l_fr: "Друзья",
        vka_l_gr: "Сообщества",
        vka_l_ph: "Фотографии",
        vka_l_aud: "Музыка",
        vka_l_vid: "Видео",

        // text
        msg_changer: false,
        msg_changer_type: "",
        cipher: false,
        cipher_type: "none",
        custom_font: false,
        custom_font_type: "none",
        custom_font_css: "none",
        custom_font_size: "14",

        // patches
        unread: false,
        untype: false,
        unnotify: false,
        offline: false,
        full_offline: false,
        autolikes: false,
        antlers_exploit: false,

        //others
        rainbow_text: false,

        // development
        dev_alerts: false,
        dev_msg: false
    };

    // Подгрузка конфига с локального хранилища
    var vka_config = JSON.parse(localStorage.getItem("vka_config"));
    if (vka_config){
        // Сообщает о успешной загрузке конфига
        console.log ("Config loaded successfully!");
        //console.log ("Config is: " + JSON.stringify(vka_config)); // Показывает весь конфиг
    } else {
        // Ставит дефолтный если не существует конфига
        console.log('Config not exists! Default config loaded!');
        vka_config = vka_config_default;
        localStorage.setItem("vka_config", JSON.stringify(vka_config));
        // TODO: Убрать костыль с перезагрузкой из-за установки конфига. А может и не надо?
        // Прикол заключается в MutationObserver - который не ждёт загрузки конфига
        location.reload();
    };

    // Обновление конфига при обновлении версии
    // TODO: Сделать обновление лишь пунктов конфига, а не полностью заменять на дефолтный
    if(vka_config_default.version > vka_config.version){
        console.log ("Config updated! From verion: " + vka_config.version + " to: " + vka_config_default.version);
        vka_config = vka_config_default;
        localStorage.setItem("vka_config", JSON.stringify(vka_config));
        // TODO: Убрать костыль с перезагрузкой из-за установки конфига. А может и не надо?
        // Прикол заключается в MutationObserver - который не ждёт загрузки конфига
        location.reload();
    }

    // Перечисление всех возможных хэштегов
    var hashtag_list = ["флеймлучший", "задонать", "темнаятёма", "да", "дирохерел", "ачё\)", "сидидомаблэд", "фывапролджэ", "missingno",
                        "сижуахерел", "дистанционОчка", "скибидивапа", "ойдевачьки", "настиле", "чайвсемуголова", "мрарф",
                        "гобухать", "сказочноебали", "дирлох", "ложка", "300bucks", "стыдпозорный", "ugotthat", "heybuddy", "яобязательновыживу",
                        "нечиталОчка", "слышработать", "кофемания", "hohol", "(﻿ ͡° ͜ʖ ͡°)", "атлишна", "42"];
    // Выбор случайного хэштега из списка
    var logo_hashtag_text = hashtag_list[Math.floor(Math.random() * hashtag_list.length)];

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Загрузка главного меню

    // Функция загрузки текста с левых сайтов
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

    // Загрузка кнопки меню
    var vkantlers_menu = '<li class="HeaderNav__item deer" style="float: right;padding: 9px;"><a id="vkantlers_toggle" style="font-size: 20px;">🦌</a></li>';

    // Загрузка меню и его стиля [devchange]
    var vka_menu = vka_getraw("https://raw.githubusercontent.com/Pocket-Deer/VKAntlers/master/mainmenu.html");
    var vka_menu_css = vka_getraw("https://raw.githubusercontent.com/Pocket-Deer/VKAntlers/master/mainmenu.css");

    // Загрузка тёмной темы [devchange]
    // Тема принадлежит kandy (https://userstyles.org/styles/126419/vanilla-dark-2-vk)
    var dark_theme = vka_getraw('https://raw.githubusercontent.com/Pocket-Deer/VKAntlers/master/dark_style.css');


    // Загрузка кода до полной загрузки страницы. Переменные используются в MutationObserver
    var preload = {
        custom_hashtags: function(){
            $(".top_home_link.fl_l").append('<div class="vka_hashtags">#' + logo_hashtag_text + "</div>");
            $(".top_home_link.fl_l").css({"display":"inline-flex","align-items":"center"});
            $(".top_home_logo").css({"margin":"0px 10px 0 0"});
        },
        mainmenu: function(){
            $('#top_nav').append(vkantlers_menu);
            // Добавление главного меню в код сайта
            $("head").after(vka_menu_css);
            $(".HeaderNav__item.deer").append(vka_menu);
            vka_loadmenu();
        }
    };

    // Сам MutationObserver. Позволяет вставить элемент до полной загрузки страницы
    // class target - Класс, к которому присоединится func
    function preload_load(class_target, func){
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

    // Добавление кнопки вызова меню и само меню на сайт до загрузки страницы
    // TODO: Пофиксить костыль с аудиозаписями
    if(document.location.href.indexOf('audios') === -1){ //Не добавлять кнопку в аудиозаписи
        preload_load('HeaderNav__item', preload.mainmenu);
    };

    // Функция включения меню при клике на значок меню
    $(document).on("click", "#vkantlers_toggle", function(){
        console.log("Clicked on deer");
        $('.vka_parent').toggleClass('vka_parent_display');
    });

    // Функция переключения пунктов меню
    $(document).on("click", ".vka_section", function() {
        $(this).next('.vka_innerBlock').toggleClass('vka_displayBlock');
    });

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Функционал самого аддона

    // Функции работы с конфигом
    function vka_config_set(name, value) {
        vka_config[name] = value;
        localStorage.setItem("vka_config", JSON.stringify(vka_config));
    };

    function vka_config_get(name){
        var vkac = JSON.parse(localStorage.getItem("vka_config"));
        return vkac[name];
    }

    // Функционал кнопок при нажатии
    $(".vka_content").ready(function() {
        $("input[type='checkbox'], input[type='radio']").on("click", function() {
            if (this.type == "radio" || this.type == "checkbox"){
                vka_config_set(this.id, this.checked);
            }
            if (this.type == "text"){
                vka_config_set(this.id, this.value);
            }
            vka_func(this.id);
        });
        $("input[type='text']").keyup(function() {
            vka_config_set(this.id, this.value);
            vka_func(this.id);
        });
        // Загрузка меню по конфигу
        //vka_loadmenu();
    });

    // Заполняет меню по конфигу
    function vka_loadmenu(){
        $(".vka_field, .vka_textarea").each(function(){
            if (this.type == "radio" || this.type == "checkbox"){
                $(this).prop("checked", vka_config_get(this.id));
                vka_func(this.id);
            } if (this.type == "text") {
                $(this).prop("value", vka_config_get(this.id));
                vka_func(this.id);
            }
        });
    }

    function vka_func(func_name){
        switch (func_name){
                // ---------------------------------------------------- Style
            case "custom_theme":
                if (vka_config.custom_theme == true && vka_config.custom_theme_type == "dark"){
                    $("head").append('<style type="text/css" id="vka_theme_dark">' + dark_theme + '</style>');
                } else {
                    $("#vka_theme_dark").remove();
                };
                break;

            case "custom_theme_type":
                break;

            case "custom_theme_autotoggle":
                break;

            case "ctt_end":
                break;

            case "ctt_start":
                break;

            case "custom_theme_icon":
                break;

            case "custom_hashtags":
                if (vka_config.custom_hashtags == true){
                    $(".top_home_link.fl_l").append('<div class="vka_hashtags">#' + logo_hashtag_text + "</div>");
                    $(".top_home_link.fl_l").css({"display":"inline-flex","align-items":"center","color":"var(--white)"});
                    $(".top_home_logo").css({"margin":"0px 10px 0 0"});
                } else {
                    $(".vka_hashtags").remove();
                };
                break;

            case "custom_back_button":
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
                break;

            case "hide_names":
                if (vka_config.hide_names == true){
                    $('head').append('<style id="vka_hide_names" type="text/css">.nim-dialog .nim-dialog--name .nim-dialog--name-w{filter: blur(4px) !important} .im-right-menu .im-right-menu--text{filter: blur(4px) !important} .im-page--title-main{filter: blur(4px) !important} .im-mess-stack--lnk{filter: blur(4px) !important} ._im_replied_author_link{filter: blur(4px) !important} .top_profile_vkconnect_name{filter: blur(4px) !important} .top_profile_name{filter: blur(4px) !important} юim-page-pinned--name{filter: blur(4px) !important} ._im_dialog_typing{filter: blur(4px) !important} ._im_typing_name{filter: blur(4px) !important}</style>');
                } else {
                    $('#vka_hide_names').remove();
                };
                break;

            case "hide_messages":
                if (vka_config.hide_messages == true){
                    $('head').append('<style id="vka_hide_messages" type="text/css">nim-dialog--inner-text{filter: blur(4px) !important} .nim-dialog--text-preview{filter: blur(4px) !important}</style>');
                } else {
                    $('#vka_hide_messages').remove()
                };
                break;

            case "hide_photo":
                if (vka_config.hide_photo == true){
                    //TODO: nim-peer--photo = убирает по сути вообще все фотки
                    $('head').append('<style id="vka_hide_photo"type="text/css">.nim-dialog.nim-dialog_classic .nim-dialog--photo{filter: blur(10px) !important} .im-prebody{filter: brightness(0) !important} .im-mess-stack--photo{filter: blur(10px) !important} .nim-dialog--photo{filter: blur(10px) !important} .top_profile_img{filter: brightness(0) !important} .top_profile_vkconnect_img{filter: brightness(0) !important} .im-page--aside-photo{filter: brightness(0) !important}</style>');
                } else {
                    $('#vka_hide_photo').remove()
                };
                break;

                // ---------------------------------------------------- Text

            case "msg_changer":
                break;

            case "msg_changer_type":
                break;

            case "cipher":
                break;

            case "cipher_type":
                break;

                // Custom left menu
                // TODO: Сделать эту херь попроще, не повторяя постоянно одни и те же функции
            case "vka_l_pr":
            case "vka_l_nwsf":
            case "vka_l_msg":
            case "vka_l_fr":
            case "vka_l_gr":
            case "vka_l_ph":
            case "vka_l_aud":
            case "vka_l_vid":
            case "custom_left_menu":
                    if (vka_config.custom_left_menu == true){
                        $('#l_pr').find('.left_label.inl_bl').text(vka_config.vka_l_pr);
                        $('#l_nwsf').find('.left_label.inl_bl').text(vka_config.vka_l_nwsf);
                        $('#l_msg').find('.left_label.inl_bl').text(vka_config.vka_l_msg);
                        $('#l_fr').find('.left_label.inl_bl').text(vka_config.vka_l_fr);
                        $('#l_gr').find('.left_label.inl_bl').text(vka_config.vka_l_gr);
                        $('#l_ph').find('.left_label.inl_bl').text(vka_config.vka_l_ph);
                        $('#l_aud').find('.left_label.inl_bl').text(vka_config.vka_l_aud);
                        $('#l_vid').find('.left_label.inl_bl').text(vka_config.vka_l_vid);
                    } else {
                        $('#l_pr').find('.left_label.inl_bl').text(vka_config_default.vka_l_pr);
                        $('#l_nwsf').find('.left_label.inl_bl').text(vka_config_default.vka_l_nwsf);
                        $('#l_msg').find('.left_label.inl_bl').text(vka_config_default.vka_l_msg);
                        $('#l_fr').find('.left_label.inl_bl').text(vka_config_default.vka_l_fr);
                        $('#l_gr').find('.left_label.inl_bl').text(vka_config_default.vka_l_gr);
                        $('#l_ph').find('.left_label.inl_bl').text(vka_config_default.vka_l_ph);
                        $('#l_aud').find('.left_label.inl_bl').text(vka_config_default.vka_l_aud);
                        $('#l_vid').find('.left_label.inl_bl').text(vka_config_default.vka_l_vid);
                    }
                break;

            case "custom_font":
                if (vka_config.custom_font == true){
                    if (vka_config.custom_font_type == "none" || vka_config.custom_font_css == "none"){
                        alert ('Прежде чем включить шрифт - вставьте необходимые ссылки в нужные поля, которая будет содержать блок <link href="ссылка">');
                    } else {
                        $("head").append(vka_config.custom_font_type);
                        $('head').append('<style id="vka_custom_font"> *{' + vka_config.custom_font_css + '} </style>');
                    }
                } else {
                    vka_config.custom_font_type = "none";
                    vka_config.custom_font_css = "none";
                    if ($('#vka_custom_font').length > 0){
                        $('#vka_custom_font').remove();
                        location.reload();
                    }
                    //location.reload();
                }
                break;

            case "custom_font_type":
                break;

            case "custom_font_size":
                break;

                // ---------------------------------------------------- Patches
            case "unread":
                break;

            case "untype":
                break;

            case "unnotify":
                break;

            case "offline":
                break;

            case "full_offline":
                break;

            case "autolikes":
                break;

            case "antlers_exploit":
                break;

                // ---------------------------------------------------- Others

            case "rainbow_text":
                if (vka_config.rainbow_text == true){
                $('head').append('<style id="vka_rainbow_text">@keyframes colorRotate { from {color: rgb(255, 0, 0);} 16.6% { color: rgb(255, 0, 255);} 33.3% {color: rgb(0, 0, 255);} 50% {color: rgb(0, 255, 255);} 66.6% {color: rgb(0, 255, 0); } 83.3% {color: rgb(255, 255, 0);} to {color: rgb(255, 0, 0);}} a, span{animation: colorRotate 6s linear 0s infinite;}');
                } else {
                $('#vka_rainbow_text').remove();
                }
                    break;

            case "dev_alerts":
                break;

            case "dev_msg":
                break;

            default:
                break;

        }
    }

    // Перехватчик разных запросов
    // Здесь все - нечиталка, неписалка, оффлайн, уведомления
    (function(send){
        XMLHttpRequest.prototype.send = function(body) {
            // Замена сообщения
            if (/act=a_send/.test(body) && vka_config.msg_changer == true) {
                var newstr = body.replace(/msg=/i, 'msg=' + vka_config.msg_changer_type + ' ');
                body = newstr;
            };
            // Нечиталка
            if (/act=a_mark_read/.test(body) && vka_config.unread == true) {
                console.log("READ ABORTED!");
                XMLHttpRequest.abort();
            }
            // Неписалка
            if (/act=a_activity/.test(body) && /type=typing/.test(body) && vka_config.untype == true) {
                console.log("TYPING ABORTED!");
                XMLHttpRequest.abort();
            }
            // Отключение уведомлений
            if (/act=a_clean_notify/.test(body) && vka_config.unnotify == true) {
                console.log("MARKED ABORTED!");
                XMLHttpRequest.abort();
            }
            // Частичный оффлайн
            if ((/act=a_clean_notify/.test(body) || /act=a_activity/.test(body) || /type=typing/.test(body)
                 || /act=a_mark_read/.test(body) || /act=a_send/.test(body)) && vka_config.offline == true) {
                if (/act=a_send/.test(body)){
                    alert('Вы не можете писать сообщения с частичным оффлайном! Чтобы отключить его - снимите галочку в настройках VKAntlers в разделе "Патчи" с пункта "Частичный оффлайн"');
                };
                XMLHttpRequest.abort();
            }
            send.call(this, body);
        };
    })(XMLHttpRequest.prototype.send);

    // End of VKAntlers script! There is nothing next!
    // --------------------------------------------------------------------
};

// Добавление вышестоящего скрипта на страницу
var code = main.toString().match(/^.+?\{([\s\S]+)\}$/)[1];
var script = document.createElement('script');
script.type = 'text/javascript';
script.appendChild(document.createTextNode(code));
(document.body || document.head || document.documentElement).appendChild(script);
// ========================================================================
