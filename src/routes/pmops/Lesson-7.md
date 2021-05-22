Modifying a Program {#modifying_a_program}
===================

We\'re going to add another class. This one, however, will be a subclass
of \<code\>Rect\</code\> because our goal is to produce an object that
draws a rounded rectangle. A rounded rectangle requires the same
parameters as a rectangle with the addition of one more: the size of the
ovals whose curvature rounds the corners of our rectangle. The oval\'s
dimensions are determined by the number of pixels high and wide:

![](CascadeVariables.png "CascadeVariables.png")

The Carbon framework call, \<code\>FrameRoundRect\</code\> (also part of
QuickDraw), expects these dimensions as two integers (2-byte values).
Note that, while we pass the *address* of the \<code\>Rect\</code\> data
(as for \<code\>FrameRect\</code\>), we pass the *actual* values for
width and height (please see \[../Reference/Chapter7.html Chapter 7\] of
the Reference for more discussion of supplying parameters to Carbon
framework routines). We can conveniently store the oval\'s dimensions in
a class \<code\>Point\</code\> instance variable, or ivar.

Since a rounded rectangle has so much in common with an ordinary
rectangle (i.e., objects created by class \<code\>Rect\</code\>), the
logical approach would be a subclass of class \<code\>Rect\</code\>
called, say, class \"\<code\>RndRect\</code\>\". It needs only the one
additional ivar which we will name \"\<code\>Ovalsize\</code\>\". By
virtue of its inheritance from class \<code\>Rect\</code\> then, an
object of class \<code\>RndRect\</code\> will have a total of three
ivars: \<code\>TopLeft\</code\>, \<code\>BotRight\</code\>, and
\<code\>Ovalsize\</code\>. \<code\>TopLeft\</code\> and
\<code\>BotRight\</code\> refer to the corners the
\<code\>RndRect\</code\> would have if it wasn\'t rounded&\#148; that
is, the intersection points of the lines on which the sides lie. These
points, of course, will lie outside the rounded corners that will be
actually drawn on the display.

Next, the class needs a method to store the oval values its object
instances receive. The \<code\>Ovalsize\</code\> value for this class is
stored by means of a \<code\>PUT:\</code\> method (look familiar?),
which in addition to initializing our oval values, will initialize the
rectangle coordinate points \<code\>TopLeft\</code\> and
\<code\>BotRight\</code\> that our class inherited from
\<code\>Rect\</code\>.

Finally, the subclass \<code\>RndRect\</code\> needs a
\<code\>DRAW:\</code\> method to act on the values stored in an object
created from its own class. In this particular \<code\>DRAW:\</code\>
method, \<code\>\^BASE\</code\> retrieves the \"base\" *address* of the
current object, i.e. the address of the beginning of the object in
memory. In this case, it is the address of the rectangle coordinates
(which if you recall from a previous lesson, are stored as a record in
\<code\>Rect\</code\>). The Carbon framework uses this address to locate
the values it uses as parameters. Next, the \<code\>Ovalsize\</code\>
values are put on the stack in a form the Carbon framework expects
(using the \<code\>GET:\</code\> method of class
\<code\>Point\</code\>), and then the proper Carbon framework routine
(\<code\>FrameRoundRect\</code\>) is called to do the actual drawing on
the screen.

The subclass definition looks like this:

`<nowiki>`\
`:class  RNDRECT  super{ rect }`\
`       point     Ovalsize`

`:m PUT:                put: Ovalsize  put: super  ;m  ( l t r b w h -- )`

`:m DRAW:       ^base  get: Ovalsize  FrameRoundRect  ;m`

`:m DISP:       put: self  draw: self  ;m`

`;class`\
`</nowiki>`

That \<code\>DISP:\</code\> method definition we use in our class is not
redundant with the definition used in the superclass.
\<code\>SELF\</code\> always returns the address of the *current*
object. When \<code\>SELF\</code\> was used in our class\' superclass,
it returned the address for \<code\>Rect\</code\>. In our class, it
returns the address of \<code\>RndRect\</code\>.

\<blockquote\>

Warning: If we did not redefine \<code\>DISP:\</code\> as we did,
invoking a \<code\>DISP:\</code\> message on any instance of
\<code\>RndRect\</code\> would have used \<code\>Rect\</code\>\'s
definition for \<code\>DISP:\</code\>, which in turn would have called
\<code\>Rect\</code\>\'s \<code\>PUT:\</code\> and
\<code\>DRAW:\</code\> methods (and not the new methods we defined in
the subclass \<code\>RndRect\</code\>).

`</blockquote>`

Once the class is defined, it is now ready for the creation of an
object:

`RndRect Cynthia`

To draw this object in window \<code\>ww\</code\>, as we did in the
previous lesson, you can do this:

`Window ww`\
`test: ww`

`set: ww`\
`20 20 100 60 20 30 disp: Cynthia`

The values 20 and 30 are the width and height of the oval in the rounded
corners. The \<code\>DISP:\</code\> method uses the
\<code\>PUT:\</code\> methods defined in our class and its superclass to
take all six values off of the stack and store them in the ivars defined
in our class and the ones inherited from its superclass. Here is a
diagram of how the addition of this subclass works within the structure
of the overall program:

![](CascadeClass.png "CascadeClass.png")

Next, you\'ll be introduced to the powerful building blocks of Mops: the
[predefined classes](Classes "wikilink").

------------------------------------------------------------------------

  ------------------------------------------- --------------------------------- ---------------------------------
  [Lesson 6](Lesson_6 "wikilink")             [Tutorial](Tutorial "wikilink")   [Lesson 8](Lesson_8 "wikilink")
  [Documentation](Documentation "wikilink")                                     
  ------------------------------------------- --------------------------------- ---------------------------------

[Category:Manual](Category:Manual "wikilink")
[Category:Tutorial](Category:Tutorial "wikilink")
