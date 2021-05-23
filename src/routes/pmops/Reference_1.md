# Mops and QuickEdit

## The Mops Menu Bar

Mops has a simple set of menus, yet the features built into them make
writing code, compiling, and debugging rather easy. When you start
Mops.dic or PowerMops, a specially designed Mops 'front end' brings in
the basic Mops menus --- Apple, File, Edit, Utilities, and Mops.

To help you understand the functions of each menu selection, we'll
describe the action of each menu item. We'll also explain the built-in
utilities, which can make you more productive in program creation and
debugging. Also see Part II, Chapter 2 for more details on the operation
of an Editor.

### The Apple Menu

- **About Mops...** Displays the Mops version number and the date that version was released.
- **Quit PowerMops** OS X only. This is the equivalent of the Mops command, 'bye'. All files are immediately closed, and you are returned to the desktop.

### The File Menu

- **Load...** Allows you to load text source files on top of the Mops dictionary currently in memory (the same as issuing the ˜// filename' command from the Mops prompt). The standard file dialog box appears, from which you can select the file to load. As the source file loads, it is compiled by Mops. If your program requires the loading of several text files, the files must be loaded in the proper order (so that dependent words and classes are loaded after the words or classes they depend on). The word NEED, which we described in the Tutorial, makes it easy to ensure everything is loaded in the right order.
- **Save Dictionary** Copies to a disk a compiled image of a program you have in memory. It saves the image to a file with the same filename as is shown at the top of the Mops window. For this reason, Save should be used with care. If you have added code to Mops dictionary and wish to save the image as a separate application, then use "the Save As…" selection, below; otherwise, your Mops.dic or PowerMops file will contain your additions.
- **Save Dictionary As...** Lets you copy to a disk a compiled image of a program you have in memory (you are prompted for a new filename, and you may save to a different disk, if you like). For example, when Mops.dic or PowerMops was originally built, its compiled image was saved with this command. To start a program saved in this manner, double-click the appropriate Mops document icon from the desktop, just as you start Mops. It is recommended that you save programs in this manner only after their source code has been sufficiently debugged. Until then, you'll want to take advantage of the interactivity of the Mops interpreter while debugging source files by maintaining the code as source files and Loading them to test how well the program runs.  
In Mach-O PowerMops, the executable file must be renamed to be "PowerMopsM" before making it run. Control+click on PowerMops icon, select "Show Package Contents" from popup menu, then dig into the folder structure there to the "MacOS" folder. You will find your newly saved PowerMops executable among files.
- **Quit** This is the equivalent of the Mops command, 'bye'. All files are immediately closed, and you are returned to the desktop.


### The Edit Menu

- **Cut, Copy, Paste, Clear and Select All** These perform all the customary editing functions in the Mops window.

### The List Menu

- **Words**
- **Objects...**
- **Classes...**
### The Show Menu

- **HFS Paths**
- **Free Space**
- **Show Module Status**
### The Utilities Menu

- **Echo During Load**
- **Clear Stack**
- **Clear Window**
- **Install**
- **Purge Modules**

## Communication with QuickEdit

Mops and QuickEdit send [Apple
Events](http://developer.apple.com/documentation/mac/IAC/IAC-94.html) to
each other, with a number of benefits. Of course, to use these features,
both Mops and QE must be running. If this isn't so, or if you're
running an earlier system which doesn't support Apple events, these
commands will be ignored.

1.  If an error occurs during loading a file, Mops sends QE an Apple
    event asking it to open the source file at the error line.
2.  The Mops command 'edit someFile' will ask QE to open the given
    file.
3.  The Mops command 'openSource someWord' will ask QE to open the
    source file containing the definition of someWord. If there's a log
    file, QE will put the cursor to the start of the definition. If
    there isn't, QE will search to the first occurrence of 'someWord'
    in the file (which will probably be at the start of the definition
    anyway, or maybe in a comment just before).

In QE, there is now a **Mops** menu with a number of commands:

1. Load
2. Save and load (command- K)
3. Clear Stack (command- 0). Also now available in Mops as command-0.
4. Open Source (command- =). You highlight a word, 'someWord' say,
    then choose this command, and QE asks Mops to execute 'OpenSource
    someWord' as described above.
5. Clear Window (command- --). Clears the Mops window. Also
    available in Mops as command-2.
6. Glossary (command- Y). Opens QE's glossary of Mops words and
    classes. The word under or to the left of the cursor (if any) is
    searched for automatically.
7. Edit file (command- E). You highlight a word, then choose this
    command. If Mops is running, it will open the file with that name
    (if it exists).



