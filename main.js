define(function (require, exports, module) {
	"use strict";

	var CommandManager = brackets.getModule("command/CommandManager"),
		EditorManager = brackets.getModule("editor/EditorManager"),
		Menus = brackets.getModule("command/Menus");


	// Function to run when the menu item is clicked
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


	// First, register a command - a UI-less object associating an id to a handler
	var MY_COMMAND_ID = "wazateer1.placeBeacon"; // package-style naming to avoid collisions
	CommandManager.register("Drop a beacon", MY_COMMAND_ID, handlePlaceBeacon);

	// Then create a menu item bound to the command
	// The label of the menu item is the name we gave the command (see above)
	var menu = Menus.getContextMenu(Menus.ContextMenuIds.EDITOR_MENU);
	menu.addMenuItem(MY_COMMAND_ID, "Ctrl-Shift-1");
});