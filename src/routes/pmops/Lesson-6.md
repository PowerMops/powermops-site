Objects and Their Messages {#objects_and_their_messages}
==========================

Now we come to creating an object of class \<code\>Rect\</code\> and
sending messages to that object so it can select the methods to execute.
To create an object of class \<code\>Rect\</code\>, the syntax is simply
the name of the class followed by the name you want to assign to the
object. For an object named \"\<code\>Box1\</code\>\" of class
\<code\>Rect\</code\>, the statement would be:

`Rect Box1`

That\'s all there is to it! By creating this object, you have added a
new Mops word, \"\<code\>Box1\</code\>\" to the dictionary in memory.
Recalling our definition of \<code\>Rect\</code\> from the previous
lesson, you can visualize the object in memory to look like:

![](CreateObject.png "CreateObject.png")

Zeros are placed in the instance variable cells when the object is
created, and they are holding space for numbers whenever the object
receives a message to put data there.

When you type a Mops message in a program, it has three parts to it: the
parameters, selector, and receiver.

Parameters are the numbers to be passed to the operation. They are
placed on the parameter stack just like parameters in
\[Chapter1.html\#Enter Lesson 1\]. Not all messages have parameters, of
course. Some operations don\'t require any numbers be passed to them.

The second part, the selector, is actually the name of the method
containing the operation you want the object to perform. In other words,
the object \"selects\" which method of its class is to be put to work;
the object matches the message\'s selector with the method in the
object\'s class (or up the superclass hierarchy if there is no match in
the immediate class).

The last part of a message, the receiver, must be the name of an object.
It is the \"thing\" on which you want to perform the operation specified
by the selector. In the accountant metaphor used in the preceding
lessons, the receiver is the name of the accountant who is to prepare
the returns.

Since \<code\>Box1\</code\> is an object of our rectangle class, you can
send a message to it that selects one of the methods defined in class
\<code\>Rect\</code\>. If you send the message

`300 20 400 100 put: Box1`

you put the coordinates 300,20 and 400,100 into the data cells reserved
for \<code\>TopLeft\</code\> and \<code\>BotRight\</code\> in the
\<code\>Box1\</code\> object. After all, that\'s what the
\<code\>PUT:\</code\> method in \<code\>Box1\</code\>\'s class does: it
places two sets of two parameters into an object\'s data cells.

If, at some future time, you create a new object of class
\<code\>Rect\</code\>, called \"\<code\>Box5\</code\>\",
\<code\>Box5\</code\>\'s data cells would be empty at first. A separate
\<code\>PUT:\</code\> message would have to be sent to
\<code\>Box5\</code\> to place \<code\>Box5\</code\>\'s coordinates in
that object\'s data cells. This is how objects maintain *private data*.

Now, to draw the objects on the screen with \<code\>Box1\</code\>, you
need to send another message, one that calls upon the
\<code\>DRAW:\</code\> method of class \<code\>Rect\</code\>. The
message would be:

`draw: Box1`

If you were defining class \<code\>Rect\</code\> from scratch, you could
also define a new method that combines the functions of two methods into
one. Then, a single message would take care of both the
\<code\>PUT:\</code\> and \<code\>DRAW:\</code\> methods. For this to
happen, you need a way for the new method to look up the methods in the
same class. That\'s where a message receiver called
\<code\>SELF\</code\> comes in handy. With the new method
(\<code\>DISP:\</code\>) the class looks like this:

`<nowiki>`\
`:class  RECT  super{ object }`\
`record`\
`{      point     TopLeft`\
`       point     BotRight`\
`}`

`:m PUT:                put: BotRight   put: TopLeft  ;m  ( l t r b -- )`

`:m DRAW:       ^base  FrameRect  ;m`

`:m DISP:       put: self  draw: self  ;m`

`;class`\
`</nowiki>`

The \<code\>DISP:\</code\> method contains the messages, \'\<code\>put:
self\</code\>\' and \'\<code\>draw: self\</code\>\'. The \'\<code\>put:
self\</code\>\' message is saying, Do to the current object everything
that the \<code\>PUT:\</code\> method in this class does. The same goes
for \'\<code\>draw: self\</code\>\'. If you had intended one of these
messages to look up a method in \<code\>Rect\</code\>\'s superclass, the
receiver would have been \<code\>SUPER\</code\> (as in \'\<code\>put:
super\</code\>\').

Something important happens when you have the \'\<code\>put:
self\</code\> message inside the \<code\>DISP:\</code\> method. The
\<code\>DISP:\</code\> method now expects to find four integers passed
along with any message bearing its selector, just like the actual
\<code\>PUT:\</code\> method that executes the storage command requires
four integers. Therefore, to both locate and draw \<code\>Box1\</code\>
on the screen, you would send the message:

`12 10 100 50 disp: Box1`

If you want to try this, you\'ll have to have a window to display
\<code\>Box1\</code\> in, as you did in the \[../Overview/Chapter1.html
Introduction\]. So first copy the \<code\>Rect\</code\> definition
(above) to the Mops window (either by typing it in or by copying and
pasting it). Then *select* the whole of the definition (by dragging with
the mouse). Then hit the ENTER key. This will cause all the selected
text to be executed. In this case, since the code is a class definition,
the result of executing the code will simply be to define the class
\<code\>Rect\</code\>. Nothing will seem to happen, but the definition
for \<code\>Rect\</code\> will have been entered into Mops\' dictionary
and will be ready to do your bidding.

Now type and execute this:

`Window ww`\
`test: ww`

Click back on the Mops window and move things around so you can see both
the Mops window and \<code\>ww\</code\>, then type and execute

`Rect Box1`

`set: ww`\
`12 10 100 50 disp: Box1`

and your \<code\>Rect\</code\> instance (\<code\>Box1\</code\>) should
appear in the window \<code\>ww\</code\>.

\[\#Summary Summary\] {#summary_summary}
---------------------

Before taking one more step, let\'s summarize. Creating a Mops program
entails the following steps: defining classes; creating objects that are
instances of those classes; and then sending messages to those objects.
Building a hierarchy of classes starts with the broadest class and works
toward the more specific classes, with subclasses inheriting the
characteristics of their superclasses.

The following diagram will help you visualize the structure of the
program example detailed in this chapter. It graphically portrays the
relationships between the classes and objects discussed above.

![](ObjectStructure.png "ObjectStructure.png")

Given this framework, when you issue the message \'\<code\>12 10 100 50
disp: Box1\</code\>\', the parameters fill \<code\>Box1\</code\>\'s data
cells held in reserve when \<code\>Box1\</code\> was created.

The characteristics of the data had already been determined by the ivars
\<code\>TopLeft\</code\> and \<code\>BotRight\</code\>\<nowiki\>; the
characteristics of each those ivars had been likewise determined by the
ivars \</nowiki\>\<code\>X\</code\> and \<code\>Y\</code\>, which, in
turn, had been defined by the methods of their defining class, class
\<code\>Int\</code\>.

Therefore, you probably recognize that the relationships in Mops classes
and objects are on multiple levels. On the one hand, you have the
relationships between superclasses and subclasses. On the other hand,
you have the relationships between ivars and their defining classes.
Both relationships cascade through the hierarchy of a Mops program
independently of each other. That will become even clearer as we make
one further extension to the example above.

------------------------------------------------------------------------

  ------------------------------------------- --------------------------------- ---------------------------------
  [Lesson 5](Lesson_5 "wikilink")             [Tutorial](Tutorial "wikilink")   [Lesson 7](Lesson_7 "wikilink")
  [Documentation](Documentation "wikilink")                                     
  ------------------------------------------- --------------------------------- ---------------------------------

[Category:Manual](Category:Manual "wikilink")
[Category:Tutorial](Category:Tutorial "wikilink")
