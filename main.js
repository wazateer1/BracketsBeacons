define(function (require, exports, module) {
	"use strict";

	var CommandManager = brackets.getModule("command/CommandManager"),
		EditorManager = brackets.getModule("editor/EditorManager"),
		Menus = brackets.getModule("command/Menus");

	function handlePlaceBeacon() {
		var editor = EditorManager.getFocusedEditor();
		if (editor) {
			var insertionPos = editor.getCursorPos(),
				beacon = "Sorry, language not supported";
			switch (editor.getModeForSelection()) {
			case "javascript":
				editor.document.replaceRange("console.log('executed line " + insertionPos.line + "');", insertionPos);
				break;
			case "clike":
				editor.document.replaceRange("echo('executed line " + insertionPos.line + "');", insertionPos);
				break;
			case "html":
				editor.document.replaceRange("<script>echo('executed line " + insertionPos.line + "');</script>", insertionPos);
				break;
			default:
				alert("Sorry, language type: " + editor.getModeForSelection() + " not supported.");
				break;
			}
		}
	}

	var BEACON_COMMAND_ID = "wazateer1.placeBeacon";
	CommandManager.register("Drop a beacon", BEACON_COMMAND_ID, handlePlaceBeacon);
	
	var menu = Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU);
	menu.addMenuItem(BEACON_COMMAND_ID, "Ctrl-Shift-1");
});
