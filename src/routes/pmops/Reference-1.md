Mops and QuickEdit {#mops_and_quickedit}
==================

The Mops Menu Bar {#the_mops_menu_bar}
-----------------

Mops has a simple set of menus, yet the features built into them make
writing code, compiling, and debugging rather easy. When you start
Mops.dic or PowerMops, a specially designed Mops \'front end\' brings in
the basic Mops menus &mdash; Apple, File, Edit, Utilities, and Mops.

To help you understand the functions of each menu selection, we\'ll
describe the action of each menu item. We\'ll also explain the built-in
utilities, which can make you more productive in program creation and
debugging. Also see Part II, Chapter 2 for more details on the operation
of an Editor.

+----------------------------------------------+
| ### The Apple Menu {#the_apple_menu}         |
+----------------------------------------------+
| About Mops&\#133;                            |
+----------------------------------------------+
|                                              |
+----------------------------------------------+
| Quit PowerMops                               |
+----------------------------------------------+
| ### The File Menu {#the_file_menu}           |
+----------------------------------------------+
| Load&\#133;                                  |
+----------------------------------------------+
| Save Dictionary                              |
+----------------------------------------------+
| Save Dictionary As&\#133;                    |
+----------------------------------------------+
| Quit                                         |
+----------------------------------------------+
| ### The Edit Menu {#the_edit_menu}           |
+----------------------------------------------+
| Cut, Copy, Paste, Clear and Select All       |
+----------------------------------------------+
| ### The List Menu {#the_list_menu}           |
+----------------------------------------------+
| Words                                        |
+----------------------------------------------+
| Objects&\#133;                               |
+----------------------------------------------+
| Classes&\#133;                               |
+----------------------------------------------+
| ### The Show Menu {#the_show_menu}           |
+----------------------------------------------+
| HFS Paths                                    |
+----------------------------------------------+
| Free Space                                   |
+----------------------------------------------+
| &nbsp;                                       |
+----------------------------------------------+
| &nbsp;                                       |
+----------------------------------------------+
| Show Module Status                           |
+----------------------------------------------+
| &nbsp;                                       |
+----------------------------------------------+
| ### The Utilities Menu {#the_utilities_menu} |
+----------------------------------------------+
| Echo During Load                             |
+----------------------------------------------+
| Clear Stack                                  |
+----------------------------------------------+
| Clear Window                                 |
+----------------------------------------------+
| Install                                      |
+----------------------------------------------+
| Purge Modules                                |
+----------------------------------------------+

Communication with QuickEdit {#communication_with_quickedit}
----------------------------

Mops and QuickEdit send [Apple
Events](http://developer.apple.com/documentation/mac/IAC/IAC-94.html) to
each other, with a number of benefits. Of course, to use these features,
both Mops and QE must be running. If this isn\'t so, or if you\'re
running an earlier system which doesn\'t support Apple events, these
commands will be ignored.

1.  If an error occurs during loading a file, Mops sends QE an Apple
    event asking it to open the source file at the error line.
2.  The Mops command \'edit someFile\' will ask QE to open the given
    file.
3.  The Mops command \'openSource someWord\' will ask QE to open the
    source file containing the definition of someWord. If there\'s a log
    file, QE will put the cursor to the start of the definition. If
    there isn\'t, QE will search to the first occurrence of \'someWord\'
    in the file (which will probably be at the start of the definition
    anyway, or maybe in a comment just before).

In QE, there is now a \'Mops\' menu with a number of commands:

1.  Load
2.  Save and load (command- K)
3.  Clear Stack (command- 0). Also now available in Mops as command-0.
4.  Open Source (command- =). You highlight a word, \'someWord\' say,
    then choose this command, and QE asks Mops to execute \'OpenSource
    someWord\' as described above.
5.  Clear Window (command- &ndash;). Clears the Mops window. Also
    available in Mops as command-2.
6.  Glossary (command- Y). Opens QE\'s glossary of Mops words and
    classes. The word under or to the left of the cursor (if any) is
    searched for automatically.
7.  Edit file (command- E). You highlight a word, then choose this
    command. If Mops is running, it will open the file with that name
    (if it exists).

------------------------------------------------------------------------

  ------------------------------------------- ----------------------------------- ---------------------------------------
  &nbsp;                                      [Reference](Reference "wikilink")   [Reference 2](Reference_2 "wikilink")
  [Documentation](Documentation "wikilink")                                       
  ------------------------------------------- ----------------------------------- ---------------------------------------

[Category:Manual](Category:Manual "wikilink")
[Category:Reference](Category:Reference "wikilink")
