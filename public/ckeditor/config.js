CKEDITOR.editorConfig = function( config ) {
	config.toolbarGroups = [
		{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
		{ name: 'styles', groups: [ 'styles' ] },
		{ name: 'forms', groups: [ 'forms' ] },
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
		{ name: 'links', groups: [ 'links' ] },
		{ name: 'insert', groups: [ 'insert' ] },
		{ name: 'colors', groups: [ 'colors' ] },
		{ name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'tools', groups: [ 'tools' ] },
		{ name: 'others', groups: [ 'others' ] },
		{ name: 'about', groups: [ 'about' ] }
	];

	config.removeButtons = 'Source,Save,Preview,NewPage,Print,Templates,Cut,Paste,Copy,PasteText,PasteFromWord,Replace,Find,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,HiddenField,ImageButton,CopyFormatting,RemoveFormat,Subscript,Superscript,NumberedList,CreateDiv,Language,Link,Unlink,Anchor,Flash,Table,HorizontalRule,Iframe,PageBreak,SpecialChar,Styles,Format,BGColor,Maximize,ShowBlocks,About,TextColor';
	// config.extraPlugins = 'easyimage';
	// config.extraPlugins = 'imageUploader';.
	// config.uploadUrl = '/post/upload';
};