let currentUrl = window.location.hostname;
if (currentUrl === 'edit-seltrans.burno.tech') {
    window.onload = function () {
        var script = document.createElement('script');
        script.onload = function () {
            $.getScript("/public/js/handlebars.js");
            $.getScript("/public/js/medium-insert/js/jquery-sortable-min.js");
            $.getScript("/public/js/medium-insert/js/jquery.ui.widget.js");
            $.getScript("/public/js/medium-insert/js/jquery.iframe-transport.js");
            $.getScript("/public/js/medium-insert/js/jquery.fileupload.js");
            $.getScript("https://api.glvrd.ru/v1/glvrd.js");

            $.getScript("/public/js/medium/medium.js", function () {
                $.getScript("/public/js/medium-insert/js/medium-editor-insert-plugin.js");
                $.getScript("/public/js/medium/medium-button.js");
                setTimeout(function () {
                    $.getScript("/public/js/medium.js");
                }, 2000)
            });

            var head = $('head');
            head.append('<link rel="stylesheet" href="/public/js/medium/medium.css" type="text/css" media="screen" charset="utf-8">');
            head.append('<link rel="stylesheet" href="/public/js/medium/medium-theme.css" type="text/css" media="screen" charset="utf-8">');
            head.append('<link rel="stylesheet" href="/public/js/medium-insert/css/medium-editor-insert-plugin-frontend.min.css" type="text/css" media="screen" charset="utf-8">');
            head.append('<link rel="stylesheet" href="/public/js/medium-insert/css/medium-editor-insert-plugin.min.css" type="text/css" media="screen" charset="utf-8">');
            head.append('<link href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">');
        };
        script.src = '/public/js/jquery.js';
        document.head.appendChild(script);
    };


    function loadCss(href) {
        var css = document.createElement("link");
        css.setAttribute("rel", "stylesheet");
        css.setAttribute("type", "text/css");
        css.setAttribute("href", href);
    }
}