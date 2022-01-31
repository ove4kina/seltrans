var editorHtml = new MediumEditor('.editable-html', {
    targetBlank: true,
    spellcheck: false,
    toolbar: {
        // paste: {
        //     forcePlainText: false,
        //     cleanPastedHTML: false,
        //     cleanReplacements: [],
        //     cleanAttrs: ['class', 'style', 'dir'],
        //     cleanTags: ['meta','h1']
        // },
        buttonLabels: 'fontawesome',
        buttons: [
            'highlighter',
            'underline',
            'anchor',
            'h2',
            'h3',
            'orderedlist',
            'unorderedlist',
            'quote',
            'warning',
            'strikethrough',
            'subscript',
            'superscript',
            'removeFormat'
        ]
    },
    extensions: {
        'warning': new MediumButton({
            label: 'WARNING',
            start: '<div class="warning">',
            end: '</div>'
        }),
        'imageDragging': {}
        // 'highlighter': new HighlighterButton()
    }
});

var editorText = new MediumEditor('.editable-text', {
    targetBlank: true,
    spellcheck: false,
    toolbar: false
});


var editorFull = new MediumEditor('.editable-full', {
    spellcheck: false,
    toolbar: {
        buttons: ['b', 'h2', 'h3']
    },
    extensions: {
        'imageDragging': {}
    }
});

$('.editable-full').mediumInsert({
    editor: editorFull,
    addons: {
        images: {
            // deleteScript: 'delete.php',
            // deleteMethod: 'POST',
            preview: true, // (boolean) Show an image before it is uploaded (only in browsers that support this feature)
            captions: true, // (boolean) Enable captions
            captionPlaceholder: 'Подпись к фотографии', // (string) Caption placeholder
            fileUploadOptions: { // (object) File upload configuration. See https://github.com/blueimp/jQuery-File-Upload/wiki/Options
                url: 'http://api.burno.tech/api/addArticleAvatar', // (string) A relative path to an upload script
                acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i // (regexp) Regexp of accepted file types,
            },
            actions: { // (object) Actions for an optional second toolbar
                remove: { // (object) Remove action configuration
                    label: '<span class="fa fa-times"></span>', // (string) Label for an action
                    clicked: function ($el) { // (function) Callback function called when an action is selected
                        var $event = $.Event('keydown');

                        $event.which = 8;
                        $(document).trigger($event);

                        $('.medium-editor-insert-plugin').click();
                    }
                }
            },
            sorting: function () {
                var that = this;

                $('.medium-insert-images').sortable({
                    group: 'medium-insert-images',
                    containerSelector: '.medium-insert-images',
                    itemSelector: 'figure',
                    placeholder: '<figure class="placeholder">',
                    handle: 'img',
                    nested: false,
                    vertical: false,
                    afterMove: function () {
                        $('.medium-editor-insert-plugin').click();
                        that.core.triggerInput();
                    }
                });
            },
            uploadCompleted: function ($el, data) {
                $('.medium-editor-insert-plugin').click();
            },
        },
    }
});