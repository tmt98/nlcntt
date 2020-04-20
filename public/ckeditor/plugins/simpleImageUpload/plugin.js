CKEDITOR.plugins.add( 'simpleImageUpload', {
    init: function( editor ) {
        var fileDialog = $('<input type="file">');
        
        fileDialog.on('change', function (e) {
            var uploadUrl = editor.config.uploadUrl;
			var file = fileDialog[0].files[0];
			var imageData = new FormData();
			imageData.append('file', file);

			$.ajax({
				url: uploadUrl,
				type: 'POST',
				contentType: false,
				processData: false,
				data: imageData,
			}).done(function(done) {
				var ele = editor.document.createElement('img');
				ele.setAttribute('src', done);
				editor.insertElement(ele);
			});

        })
        editor.ui.addButton( 'Image', {
            label: 'Insert Image',
            command: 'openDialog',
            toolbar: 'insert'
        });
        editor.addCommand('openDialog', {
            exec: function(editor) {
                fileDialog.click();
            }
        })
    }
});