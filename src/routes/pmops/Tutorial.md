Table of Contents
-----------------

* [Introduction](Tutorial) [Before we
begin](#Before_we_begin) &bull; [Backup](#Backup)
&bull; [Using an editor](#Using_an_editor) &bull; [Mops - an
object oriented
language](#Mops_-_an_object_oriented_language)
* [Lesson 1](Lesson_1) [Starting Up](Lesson_1)
&bull; [The Mops Window](Lesson_1#The_Mops_Window) &bull;
[The ENTER Key](Lesson_1#The_ENTER_Key)
* [Lesson 2](Lesson_2) [The Stack](Lesson_2) &bull;
[Stack Arithmetic](Lesson_2#Stack_Arithmetic)
* [Lesson 3](Lesson_3) [Stack Notation](Lesson_3)
&bull; [Arithmetic Operators](Lesson_3#Arithmetic_Operators)
&bull; [Mastering Postfix
Notation](Lesson_3#Mastering_Postfix_Notation)
* [Lesson 4](Lesson_4) [Mops and OOP](Lesson_4)
&bull; [Methods and
Inheritance](Lesson_4#Methods_and_Inheritance) &bull;
[Objects and Messages](Lesson_4#Objects_and_Messages)
* [Lesson 5](Lesson_5) [Mapping Class-Object
Relationships](Lesson_5) &bull; [Defining a
Class](Lesson_5#Defining_a_Class)
* [Lesson 6](Lesson_6) [Objects and Their
Messages](Lesson_6) &bull;
[Summary](Lesson_6#Summary)
* [Lesson 7](Lesson_7) [Modifying a
Program](Lesson_7)
* [Lesson 8](Lesson_8) [Introducing
QuickEdit](Lesson_8)
* [Lesson 9](Lesson_9) [Predefined
Classes](Lesson_9) &bull; [Data Structure
Classes](Lesson_9#Data_Structure_Classes) &bull; [Other
Predefined Classes](Lesson_9#Other_Predefined_Classes)
* [Lesson 10](Lesson_10) [Defining New
Words](Lesson_10) &bull; [The Return
Stack](Lesson_10#The_Return_Stack) &bull; [Named Input
Parameters](Lesson_10#Named_Input_Parameters) &bull; [Local
Variables](Lesson_10#Local_Variables)
* [Lesson 11](Lesson_11) [Specialized
Operations](Lesson_11) &bull; [Displaying
Text](Lesson_11#Displaying_Text) &bull; [Explicit Stack
Manipulations](Lesson_11#Explicit_Stack_Manipulations)
* [Lesson 12](Lesson_12) [Conditionals](Lesson_12)
&bull; [Two Alternatives](Lesson_12#Two_Alternatives) &bull;
[Truths, Falsehoods, and
Comparisons](Lesson_12#Truths,_Falsehoods,_and_Comparisons)
&bull; [Nested Decisions](Lesson_12#Nested_Decisions) &bull;
[Logical Operators](Lesson_12#Logical_Operators) &bull; [The
CASE Decision](Lesson_12#The_CASE_Decision)
* [Lesson 13](Lesson_13) [Loops](Lesson_13) &bull;
[Definite Loops](Lesson_13#Definite_Loops) &bull; [Nested
Loops](Lesson_13#Nested_Loops) &bull; [Abort
Loop](Lesson_13#Abort_Loop) &bull; [Indefinite
Loops](Lesson_13#Indefinite_Loops) &bull;
[EXIT](Lesson_13#EXIT)
* [Lesson 14](Lesson_14) [Fixed-Point
Arithmetic](Lesson_14) &bull; [Decimal, Hex, and Binary
Arithmetic](Lesson_14#Decimal,_Hex,_and_Binary_Arithmetic)
&bull; [Signed and Unsigned
Numbers](Lesson_14#Signed_and_Unsigned_Numbers) &bull;
[ASCII](Lesson_14#ASCII)
* [Lesson 15](Lesson_15) [Global Values](Lesson_15)
* [Lesson 16](Lesson_16) [Sine Table
Demo](Lesson_16) &bull; [Building a Sine
Table](Lesson_16#Building_a_Sine_Table) &bull; [How the Sine
Table Works](Lesson_16#How_the_Sine_Table_Works) &bull; [What
Happens On the Stack](Lesson_16#What_Happens_On_the_Stack)
* [Lesson 17](Lesson_17) [Building a Turtle Graphics
Program](Lesson_17) &bull; [Experimenting With
Turtle](Lesson_17#Experimenting_With_Turtle)
* [Lesson 18](Lesson_18) [Create a Mini-Logo
Language](Lesson_18) &bull; [Designing the
language](Lesson_18#Designing_the_language) &bull;
[Implementing a Logo-like
language](Lesson_18#Implementing_a_Logo-like_language)
* [Lesson 19](Lesson_19) [Inside the
GrDemo](Lesson_19) &bull; [Views](Lesson_19#Views)
&bull; [Positioning Views](Lesson_19#Positioning_Views)
&bull; [Drawing Views-the DRAW:
method](Lesson_19#Drawing_Views-the_DRAW:_method)
* [Lesson 20](Lesson_20) [Windows](Lesson_20) &bull;
[The GrDemo Window](Lesson_20#The_GrDemo_Window) &bull;
[dWind](Lesson_20#dWind) &bull;
[Controls](Lesson_20#Controls) &bull; [GrDemo
Controls](Lesson_20#GrDemo_Controls) &bull; [Scroll Bar
Actions](Lesson_20#Scroll_Bar_Actions)
* [Lesson 21](Lesson_21) [Menus](Lesson_21) &bull;
[Running the Program](Lesson_21#Running_the_Program) &bull;
[In Summary](Lesson_21#In_Summary)
* [Lesson 22](Lesson_22) [Installing an
Application](Lesson_22) &bull; [Where To Go From
Here](Lesson_22#Where_To_Go_From_Here)

Before we begin
---------------

You can compile a floating-point enabled version of either Mops.dic or
PowerMops simply by loading the appropriate source file and saving the
result, normally as a different program. In this manual we refer to such
floating versions as MopsFP.dic and PowerMopsFP. The source files are,
reasonably enough, named `'floating point'`
for Mops-68K and `'zfloating point'` for
PowerMops, both located in the System source subfolder of the Mops
source folder.

In case you can't *intuit* your way after a little exploration of the
Mops window, instructions for compiling source and saving the results
are given a little farther on.

*Caution:* In all the following keyboard examples, Mops commands
are always terminated by `enter>`,
and `enter>` is not the same as
`<return>`. Many Mac applications
treat these two keys as equivalent, but Mops doesn't. Once you've used
Mops for a while you'll come to appreciate the usefulness of this
feature.

Backup
------

We can't emphasize enough the importance of backup. Assuming you are
using a hard disk, you should keep it regularly backed up. With
programming, especially, system crashes are commonplace! But these
shouldn't worry you, if your disk is regularly backed up.

It would also be good to keep an extra backup of the original Mops
distribution, whether it was on disk or downloaded from the internet.
Then, if you somehow destroy anything in the Mops system, you can easily
get back to a working system, without having to download everything
again.

Using an editor
---------------

Mops does not have a built-in editor, but works in close cooperation
with QuickEdit, which was developed by Doug Hoffman especially for Mops,
and is included here in the **QuickEdit &#131;** folder. If both Mops
and QE are running, they communicate via Apple Events to perform a
number of useful functions. From Mops, you can ask QE to open a
particular source file, and this will also happen automatically when an
error occurs. From QE, you can send text to be interpreted by Mops, or
request that Mops locate a source file which QE then opens. QE also
incorporates an online Mops glossary. So we do recommend you give QE a
try.

To use the online glossary in QE, just highlight a word, and choose
Glossary under the Mops menu, or hit command-Y. Also, in the Glossary
window, if you start typing the name of the word you want to look up,
you'll be taken there. You'll find further instructions for using QE
in the Readme file in the **QuickEdit &#131;** folder.

In addition, QE is a proper standalone source-text editor for Mops
programs.

Mops - an object oriented language
----------------------------------

In Mops, much programming is done by sending **messages** to
**objects**. A Mops object can be a simulation of any real-world object
you're familiar with: a rectangle, a Macintosh window, an artist's
canvas, a bank account. When a Mops program runs, a relatively small
list of instructions route program execution through the framework of
objects, and the objects come to life: a rectangle draws itself on the
screen; a window appears; a mouse-controlled brush paints on an
artist's canvas; a bank account monitors income and payments.

Mops, itself, includes many predefined types of object. With this
preexisting framework, you can create complex objects as simply as
typing two words. Let's do that right now, so you can get a taste of
what Mops has in store for you. This is just a demonstration, not a
lesson. So type (or copy & paste) along with us and observe what
happens without trying to remember each step.

(Although there is a Mops-68K, comprised of the Mops and Mops.dic files,
as well as the PPC-native PowerMops, it doesn't matter which
application you use. Procedurally they are virtually identical. The
principal difference is that to invoke Mops-68K you doubleclick on the
Mops.dic file. Everything we say here applies as well to both.)

Open the **Mops &#131;** folder. Locate the Mops.dic icon and doubleclick
it. In a moment, the Mops window appears. We'll explain the window's
contents in detail in Lesson 1, but for now, create a rectangle object
called `box` in memory by typing:

`rect box`

(Remember to hit `<enter>` at the end.)

We need to tell box where on the screen it should appear, and how big it
should be. The rectangle framework inside Mops wants these instructions
in the form of screen coordinates for two opposite corners, the top left
and bottom right. We'll choose 20, 10 for the top left, and 100, 50 for
the bottom right. Put these figures into box's memory by typing the
following line, making sure you observe the spacing between elements and
the colon:

` 20 10 100 50 put: box`

This line is called a **message**, which we just sent to box. Now we
want to send messages to box so that it will draw itself on the screen.
First, however, it will need a window to draw itself in. To set up a
window object named `ww` in memory, type:

`window ww`

Macintosh windows need a lot of information before they can be placed on
the screen, including the rectangular limits of the window, the title of
the window, the type of window, whether it is to be visible, and whether
it has a close box. Even then, the Macintosh Toolbox requires much more
information, which Mops automatically supplies. Some of the Mops
classes, including Window, have test or example methods that display an
instance of that class, with typical values. To see the window you just
created, type the following message:

`test: ww`

You will be able to resize and drag **ww** around the screen as for any
Mac window. But if you type keys while **ww** is in front, nothing will
happen this is simply because we haven't told **ww** what to do with
keys. So move **ww** out of the way, and click on the Mops window so you
can type further commands. Resize the Mops window if necessary so that
**ww** is still visible.

Now type:

`set: ww draw: box`

The message 'set: ww' tells the system that drawing is now to take
place in **ww** (but without bringing it to the front). Box
should now appear in ww, and your screen should look something like
this (of course you might have put **ww** in a different place):

![](BoxBkgd.png "BoxBkgd.png")

(We have shrunk the window's width to expose the background
box.)

When you are finished experimenting, select Quit from the File menu, or
type

`bye`

in the Mops window to quit Mops

Now let's move on with the Tutorial, and I hope you find you enjoy
Mops.

* [Lesson 1](Lesson_1)
* [Documentation](Documentation)                                     
