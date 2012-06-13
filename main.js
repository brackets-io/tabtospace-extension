/*
 * Copyright (c) 2012 Adobe Systems Incorporated. All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 */

/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

/** extension to replace tabs with spaces and vice versa */
define(function (require, exports, module) {
    'use strict';

    var CommandManager  = brackets.getModule("command/CommandManager"),
        EditorManager   = brackets.getModule("editor/EditorManager"),
        DocumentManager = brackets.getModule("document/DocumentManager"),
        Menus           = brackets.getModule("command/Menus");


    var TAB2S_COMMAND   = "tabtospace.tabtospace";
    var S2TAB_COMMAND   = "tabtospace.spacetotab";
    var TAB2S_MENU_NAME = "Convert tabs to spaces";
    var S2TAB_MENU_NAME = "Convert spaces to tabs";


    function replaceInDocument(re, newText) {
        
        var txt = DocumentManager.getCurrentDocument().getText();

        var txt2 = txt.replace(re, newText);
        
        DocumentManager.getCurrentDocument().setText(txt2);
        
    }
    
    
    function tabToSpace() {
        var re = /\t/g;
        replaceInDocument(re, "    ");
    }


    function spaceToTab() {
        // TODO use the actual tab width (space count) used by the editor
        var re = / {4}/g;
        replaceInDocument(re, "\t");
    }


    CommandManager.register(TAB2S_MENU_NAME, TAB2S_COMMAND, tabToSpace);
    CommandManager.register(S2TAB_MENU_NAME, S2TAB_COMMAND, spaceToTab);

    var menu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
    menu.addMenuDivider();
    menu.addMenuItem("menu-file-tabtospace", TAB2S_COMMAND);
    menu.addMenuItem("menu-file-spacetotab", S2TAB_COMMAND);

});