Sine Table Demo {#sine_table_demo}
===============

One of the best ways to learn the fine points of Mops programming is to
study existing programs and then work slowly to customize them by
modifying methods, defining new subclasses, creating new Mops words and
objects, and sending messages to the various objects in memory.

In the next few lessons, You\'ll be studying two programs whose source
files are in the folder \'Demo folder\' as plain document files. The
first one is called Sin (the source file \"\<code\>Sin\</code\>\"), the
second is called Turtle (the source file \"\<code\>Turtle\</code\>\").
Although we provide a listing for you in the next pages, you might also
want to print out a copy of the source code to follow along as the
discussion works its way into the lesson. Sin is an excellent example of
how Mops array-type data structures work. Turtle reinforces the
class-object relationship.

In the source code discussions in these lessons, the code will be shown
with line numbers off to the left margin. These have been inserted here
only to make it easier to refer to precise lines of code when explaining
various operations. There are, of course, no line numbers in Mops code
(although if you are using QuickEdit, you will have a general idea where
you are in the file).

Building a Sine Table {#building_a_sine_table}
---------------------

Before we proceed, it\'s important that you understand what these
programs were designed to do, just as you should clearly define the goal
and operation of every Mops program you write.

Sin will actually be a general purpose building block for a great many
programs, including some you may write later. Its purpose is to create a
reference table of sine values plus a fast and simple way for later
program parts to retrieve sine and cosine values.

If you\'re a little rusty on trigonometry, a sine value of an angle is a
convenient way to work with angular measurement. Mathematically, the
sine of an angle is the ratio of the length of the opposite side to the
length of the hypotenuse of an imaginary right triangle having that
angle in it. For example, if we have an angle labeled &theta; (theta):

![](Angle.png "Angle.png")

The sine of &theta; equals the length of A (the opposite side of theta)
divided by C (the hypotenuse).

If you were to calculate all possible values for sin &theta;, from 0 to
360 degrees and plot the results, you\'ll find that the values trend up
and down throughout the circle, including two quadrants with negative
values.

![](Sine.png "Sine.png")

Notice, however, that two angular measurements can, for example, have
sine values of 0.5. In the first quadrant, it\'s at 30 degrees. In the
second quadrant, it\'s at 150 degrees, -30 degrees from the \"zero\"
value (180 degrees). In other words, the sin values in the first and
second quadrants, dividing them at the 90 degree mark, are mirror images
of each other.

The same is true for quadrants three and four. And the relationship
between one half (0-180 degrees) to the other (180-360 degrees) is that
the second half mirrors the first, but as negative values. Therefore, if
you have a table of sine values for -90 degrees, it is a relatively
simple matter to calculate the corresponding values in each of the
remaining quadrants. The Sin program takes care of both the table and
calculations.

Some graphics programs will likely need to fetch sine or cosine values
to draw sophisticated shapes on the screen. Sin (and its classes
\<code\>TrigTable\</code\> and \<code\>Angle\</code\>) will probably
come in handy for you in the future.

Sin will often be summoned from the second program, Turtle. The intent
of Turtle is two-fold. First of all, it will create class definitions of
a pen (\<code\>PEN\</code\>) and a polygon (\<code\>POLY\</code\>) that
you\'ll use to experiment developing a Logo-like environment. Turtle
will also use the pen and polygons it creates (along with definitions
from Sin) to draw some sophisticated graphics on the screen. As it turns
out, these graphics will be incorporated into yet a third demonstration
program which will be the subject of the last lessons in this Tutorial.

This building block approach is a common tactic in designing a Mops
program. Carefully, generically-designed building blocks, such as Sin
and parts of Turtle, can be used in a wide variety of programs, making
it easier and faster to assemble programs from your library of proven
blocks.

How the Sine Table Works {#how_the_sine_table_works}
------------------------

Let\'s start with the Sin source code, which is numbered from lines 1 to
76:

`1      \ These classes obtain the sine and cos of an angle by table lookup.`\
`2      \ Modified from the original Neon version by Mike Hore.`\
`3`\
`4      \ The main class is ANGLE, which has SIN: and COS: methods that look`\
`5      \ up a table defined with the TRIGTABLE class.`\
`6`\
`7`\
`8      need    struct1`\
`9`\
`10`\
`11     :class TRIGTABLE super{ wArray }`\
`12`\
`13             4       wArray AXISVALS         \ 90 degree values`\
`14`\
`15     :m SIN: { degree \ quadrant -- sin }`\
`16     \ Looks up a sin * 10000 of an angle`\
`17`\
`18             degree 360 mod                  \ Put angle in range -359 to +359`\
`19             dup 0&lt; IF 360 + THEN         \ Now 0 to +359`\
`20             90 /mod         \ Convert angle to range 0-89 and get quadrant`\
`21             -&gt; quadrant   -&gt; degree`\
`22             degree                          \ Test for an axis`\
`23             NIF     quadrant at: axisVals   \ If an axis, get value`\
`24             ELSE    quadrant 1 and          \ True for "mirror" quadrants 1 and 3`\
`25                     IF      90 degree -     \ Create mirror image`\
`26                     ELSE    degree`\
`27                     THEN`\
`28                     at: self                        \ Get sin for this degree`\
`29                     quadrant 2 and          \ True for "negative" quadrants 2 and 3`\
`30                     IF negate THEN`\
`31             THEN ;m`\
`32`\
`33     :m COS: \ ( degree -- cos )`\
`34             90 +   sin: self ;m             \ Cos is sin shifted by 90 degrees`\
`35`\
`36     :m CLASSINIT:`\
`37             0        0 to: axisvals`\
`38             10000    1 to: axisvals`\
`39             0        2 to: axisvals`\
`40             -10000 3 to: axisvals ;m`\
`41`\
`42     ;class`\
`43`\
`44     90 TrigTable SINES      \ system-wide table of sines`\
`45`\
`46     : 's            \ ( val degree -- )    Fills a Sin table entry`\
`47             to: sines ;`\
`48`\
`49     00000 00 's   00175 01 's   00349 02 's   00524 03 's   00698 04 's`\
`50     00872 05 's   01045 06 's   01219 07 's   01392 08 's   01571 09 's`\
`51     01736 10 's   01908 11 's   02079 12 's   02250 13 's   02419 14 's`\
`52     02588 15 's   02756 16 's   02924 17 's   03090 18 's   03256 19 's`\
`53     03420 20 's   03584 21 's   03746 22 's   03907 23 's   04067 24 's`\
`54     04226 25 's   04384 26 's   04540 27 's   04695 28 's   04848 29 's`\
`55     05000 30 's   05150 31 's   05299 32 's   05446 33 's   05592 34 's`\
`56     05736 35 's   05878 36 's   06018 37 's   06157 38 's   06293 39 's`\
`57     06428 40 's   06561 41 's   06691 42 's   06820 43 's   06947 44 's`\
`58     07071 45 's   07193 46 's   07314 47 's   07431 48 's   07547 49 's`\
`59     07660 50 's   07771 51 's   07880 52 's   07986 53 's   08090 54 's`\
`60     08192 55 's   08290 56 's   08387 57 's   08480 58 's   08572 59 's`\
`61     08660 60 's   08746 61 's   08829 62 's   08910 63 's   08988 64 's`\
`62     09063 65 's   09135 66 's   09205 67 's   09272 68 's   09336 69 's`\
`63     09397 70 's   09455 71 's   09511 72 's   09563 73 's   09613 74 's`\
`64     09659 75 's   09703 76 's   09744 77 's   09781 78 's   09816 79 's`\
`65     09848 80 's   09877 81 's   09903 82 's   09925 83 's   09945 84 's`\
`66     09962 85 's   09976 86 's   09986 87 's   09994 88 's   09998 89 's`\
`67`\
`68     : SIN    sin: sines   ;`\
`69     : COS    cos: sines   ;`\
`70`\
`71     :class   ANGLE super{ int }`\
`72`\
`73     :m SIN: get: self   sin ;m`\
`74     :m COS: get: self   cos ;m`\
`75`\
`76     ;class`

### Lines 1 to 5 {#lines_1_to_5}

These lines are comments that serves as a plain English heading for the
source code, describing what this module does, who wrote it, and what
its main features are. This particular module creates a table of sine
values that Turtle will use to draw complex curves and graphics. We use
the \"backslash\" (\\) type of comment here, in which a word consisting
of just a backslash causes Mops to ignore the rest of that line.

### Line 8 {#line_8}

This line causes Mops to load (compile) the file
\"\<code\>Struct1\</code\>\" (in the folder \'Extras\'), if it is not
already loaded. This file contains the definitions for the class
\<code\>wArray\</code\>, which we will need here. The use of the syntax
\'\<code\>need \<var\>myfilename\</var\>\</code\>\' means that you
don\'t have to worry about whether the file \<var\>myfilename\</var\> is
already loaded or not. In fact, it may sometimes be loaded, sometimes
not, at different stages of your program development. Using the
\<code\>NEED\</code\> syntax means that you are explicitly stating the
requirements of this source file; Mops will then take care of the
details.

### Line 11 {#line_11}

Here marks the beginning of a class definition for the class
\<code\>TrigTable\</code\>. This class establishes the rules and
procedures that will be followed for looking up sines in a sine table
(the table is created in lines 44-66). Since the sine table will be a
list of sine values in fixed-point arithmetic (in a range of 0 to
10,000), two bytes of data could be used for each entry (10000 decimal
is 2710 hexadecimal, with each two-digit hexadecimal number taking up
one byte of memory). Class \<code\>TrigTable\</code\> is defined as a
subclass of class \<code\>wArray\</code\>.

If you look at the source code listing for the superclass
\<code\>wArray\</code\> (in the file \"\<code\>Struct1\</code\>\"),
You\'ll notice that \<code\>wArray\</code\> is defined as an *indexed
class*\<nowiki\>:\</nowiki\>

`<nowiki>`\
`:class WARRAY  super{ indexed-obj }  2 indexed`\
`</nowiki>`

When a class in indexed, it means that every object created of that
class must explicitly state how big an area of memory is to be reserved
for its private data (or, how many data slots should be reserved). The
number 2 in the class \<code\>wArray\</code\> definition indicates that
each slot is to be two bytes wide. When it comes time to create an
object from an indexed class, the line of code must begin with the
number of data slots that object will need (each slot has a unique index
number associated with it). In line 44 of our Sin program, the object
\<code\>Sines\</code\> created of class \<code\>TrigTable\</code\> is
reserving 90 slots; each slot is two bytes wide because
\<code\>TrigTable\</code\> *inherits* \<code\>wArray\</code\>\'s two
byte wide indexed class behavior. Indexing should become more clear as
we describe the rest of this class definition and see some practical
examples.

### Line 13 {#line_13}

This line establishes the instance variable (ivar) for an object of
class \<code\>TrigTable\</code\>. Every object created from class
\<code\>TrigTable\</code\> will have space reserved for the array
created here, as well as the indexed data noted above. The array is
preceded by the number of elements that it will contain in every
instance of class \<code\>TrigTable\</code\> (4 in this case).

This array, \<code\>AxisVals\</code\>, is a 4 element array of 2 byte
cells. The range of values to be stored in this array is from -10,000 to
+10,000 (the integer values the program will use to signify sine
values). The values in these four cells will be the sine values (times
10000) of the 90 degree multiples (0, 90, 180, and 270 degrees), and
will play a role in the calculation of the sine value later in this
class definition.

Here is a summary of the four quadrants, their signs, and sine values:

+----------------------------------+----------------------------------+
| ![                               |   Quadrant   Sign                |
| ](Quadrants.png "Quadrants.png") |  Degree Range   Sine Value Range |
|                                  |   ---------- ------ -            |
|                                  | ------------- ------------------ |
|                                  |   0                              |
|                                  | \+     0 to 90        0 to 10000 |
|                                  |   1                              |
|                                  | \+     90 to 180      10000 to 0 |
|                                  |   2          \                   |
|                                  | -     180 to 270     0 to -10000 |
|                                  |   3          \                   |
|                                  | -     270 to 360     -10000 to 0 |
+----------------------------------+----------------------------------+

In subsequent reference to our four quadrants, we\'ll refer to them as
they are listed here (counting up from integer , not the natural number
one).

### Line 15 {#line_15}

This begins the definition of the method \<code\>SIN:\</code\>. The
notation \'\<code\>{ degree \\ quadrant \-- sin }\</code\>\' indicates
that there is one named input parameter for this method, called
\<code\>DEGREE\</code\>, and one local variable,
\<code\>QUADRANT\</code\>. References to such values are made by their
*name*, not by their stack location, thus eliminating much stack
manipulation in the course of calculating sine values in the next
several lines of code. Within the definition, \<code\>QUADRANT\</code\>
will be used to store the value of the quadrant (0, 1, 2, 3) for which
the sine is being calculated.

This curly braces notation also serves the purpose of documenting the
stack effects of the execution of the method. This tells you that if you
use this \<code\>SIN:\</code\> method as a selector in a message, and if
you pass a degree figure as a parameter, (e.g., \'\<code\>90 SIN:
\<var\>myobject\</var\>\</code\>\'), then the corresponding sine value
would be left on the stack when the method\'s computations are
completed.

### Line 16 {#line_16}

The comment tells you what is happening in this method: the program
looks up the sine value of an angle (in degrees). In the calculations
the actual sine values will be (implicitly) multiplied by a factor of
10000. All sine values in the sine table, therefore, will be integers.

### Lines 18 to 34 {#lines_18_to_34}

Next comes the actual calculation and retrieval of the sine values.
Because the math in this calculation is so tightly interwoven with
\<code\>IF\</code\>&brvbar;\<code\>THEN\</code\> decision constructions,
we will trace what happens to the stack at each step, as well as explain
why various operations are performed.

As an overview, we can say that the math calculations first convert the
degree value to be in the range -359. Allowance is made for degree
values entered as negative numbers, or degrees of magnitude 360 or
greater. Once the degree is \"normalized\", it is converted to the
equivalent degree in the range -89 and the quadrant is saved for doing
mirror image calculations and determining the sign. For degrees on an
axis (, 90, 180, or 270) the sine is gotten from the ivar
\<code\>AxisVals\</code\>. Otherwise a lookup is performed on the
\<code\>TrigTable\</code\> array.

To best understand the operation of the decision processes in this
section, we will follow what happens to the values on the stack when we
try degree values less than 90 degrees, exactly 180 degrees, and a value
in the third quadrant (somewhere between 270 and 360). But to do this
properly, we should go on to explain how the arrays are filled with the
values that the method \<code\>SIN:\</code\> will be retrieving, and
what those values mean.

### Line 36 to 40 {#line_36_to_40}

The method \<code\>CLASSINIT:\</code\> is a special method that executes
whenever an object of the current class is created. The operations in
this particular \<code\>CLASSINIT:\</code\> are four messages, all of
them \<code\>TO:\</code\> operations. The \<code\>TO:\</code\> selector
of these messages is defined by a \<code\>TO:\</code\> method in the
receiver\'s class. Since the receiver is the ivar
\<code\>AxisVals\</code\>, the class in question is
\<code\>wArray\</code\>.

For arrays, the methods \<code\>AT:\</code\> and \<code\>TO:\</code\>
are the equivalents of \<code\>GET:\</code\> and \<code\>PUT:\</code\>
for ordinary scalar objects. They expect an index on the stack at the
start, to indicate which array element is to be accessed.

Since class \<code\>TrigTable\</code\> has now been defined (all the
code from line 10 through line 42), we can now create an actual table in
memory as an object of that class. The statement in line 44 does just
that, establishing an indexed array object, called
\<code\>Sines\</code\>, capable of storing 90 values in addition to the
ivar \<code\>AxisVals\</code\>. At this point, no values have been
entered into the 90 cells of the \<code\>Sines\</code\> array, but the
space is there, ready for values to be plugged in. The array bears the
characteristics of arrays defined in \<code\>TrigTable\</code\>\'s
superclass, \<code\>wArray\</code\>.

### Line 46 to 66 {#line_46_to_66}

While the columns of numbers in lines 49 through 66 may look
intimidating, they are really nothing more than the values of what
becomes a computer version of a lookup table, like the kind at the end
of a trigonometry text book. Lines 46 and 47 define a Mops word,
\<code\>\'s\</code\> (the apostrophe is pronounced \"tick\") that
performs a similar kind of \<code\>TO:\</code\> storage operation as
demonstrated in \<code\>CLASSINIT:\</code\>, but this time the storage
is to an instance of \<code\>TrigTable\</code\> called
\<code\>Sines\</code\>. When \<code\>Sines\</code\> receives a message
with a \<code\>TO:\</code\> selector, \<code\>Sines\</code\> first looks
in its own class (\<code\>TrigTable\</code\>) for a matching definition.
Since there is none here, \<code\>Sines\</code\> then looks to its
superclass \<code\>wArray\</code\>, where it finds a
\<code\>TO:\</code\> method.

The stack notation for this definition uses round parentheses rather
than braces, since it is a straight comment, not a definition for named
input parameters or local variables. This definition makes no use of
named parameters or locals. To make it quite clear, we have put a
\<code\>\\\</code\> first (don\'t forget the space!), which makes the
remainder of the line a comment anyway.

The table was designed so that the values of the degrees to be looked up
would range from to 89. That way, these very degree values can also be
used as index numbers to the respective sine values in the table.
Therefore, when it comes time (in the \<code\>SIN:\</code\> method, for
instance) to lookup a sine value in the table, the degree value coming
in as a parameter from a message will be used as the index value
associated with the desired sine value. We\'ll see how that works in a
moment, but that\'s why the stack notation in line 46 indicates that the
parameters to be passed with each \<code\>\'s\</code\> operation are the
sine value and the angle in degrees, when in actuality, the
\<code\>TO:\</code\> selector sees the degree figure literally as only
an index number to a value within the array (our table).

The sine values, then, are added to the table by the long series of
\<code\>\'s\</code\> operations, each preceded by the sine value (times
10000) and the double-purpose index/degree value.

What Happens On the Stack {#what_happens_on_the_stack}
-------------------------

Now we can go back to method \<code\>SIN:\</code\> in lines 15 to 31 to
see what happens when we send three different degree values and the
\<code\>SIN:\</code\> selector to the \<code\>Sines\</code\> object. The
three values will be 35, 180, and 293 degrees. In the listings below,
the numbers next to each operation indicate the actual numbers on the
stack at that instant of execution. When more than one number is on the
stack, the topmost number in the listing is the number on the top of the
stack.

  Statement                         35&deg;                   180&deg;                  293&deg;
  --------------------------------- ------------------------- ------------------------- -------------------------
  \<code\>degree\</code\>           35                        180                       293
  \<code\>360\</code\>              360                       360                       360
                                    35                        180                       293
  \<code\>mod\</code\>              35                        180                       293
  \<code\>dup\</code\>              35                        180                       293
                                    35                        180                       293
  \<code\>0&lt;\</code\>            0                         0                         0
                                    35                        180                       293
  \<code\>IF\</code\>               35                        180                       293
  \<code\>360\</code\>              \<nowiki\>: \</nowiki\>   \<nowiki\>: \</nowiki\>   \<nowiki\>: \</nowiki\>
  \<code\>+\</code\>                \<nowiki\>: \</nowiki\>   \<nowiki\>: \</nowiki\>   \<nowiki\>: \</nowiki\>
  \<code\>90\</code\>               90                        90                        90
                                    35                        180                       293
  \<code\>/mod\</code\>             0                         2                         3
                                    35                        0                         23
  \<code\>-&gt; quadrant\</code\>   35                        0                         23
  \<code\>-&gt; degree\</code\>     \-\--                     \-\--                     \-\--
  \<code\>degree\</code\>           35                        0                         23
  \<code\>NIF\</code\>              \-\--                     \-\--                     \-\--
                                    \<nowiki\>: \</nowiki\>                             \<nowiki\>: \</nowiki\>
  \<code\>quadrant\</code\>         \<nowiki\>: \</nowiki\>   2                         \<nowiki\>: \</nowiki\>
                                    \<nowiki\>: \</nowiki\>                             \<nowiki\>: \</nowiki\>
  \<code\>at: axisVals\</code\>     \<nowiki\>: \</nowiki\>   0                         \<nowiki\>: \</nowiki\>
  \<code\>ELSE\</code\>             \-\--                     \<nowiki\>: \</nowiki\>   \-\--
  \<code\>quadrant\</code\>         0                         \<nowiki\>: \</nowiki\>   3
  \<code\>1\</code\>                1                         \<nowiki\>: \</nowiki\>   1
                                    0                         \<nowiki\>: \</nowiki\>   3
  \<code\>and\</code\>              0                         \<nowiki\>: \</nowiki\>   1
  \<code\>IF\</code\>               \-\--                     \<nowiki\>: \</nowiki\>   \-\--
                                    \<nowiki\>: \</nowiki\>   \<nowiki\>: \</nowiki\>   
  \<code\>90\</code\>               \<nowiki\>: \</nowiki\>   \<nowiki\>: \</nowiki\>   90
                                    \<nowiki\>: \</nowiki\>   \<nowiki\>: \</nowiki\>   
  \<code\>degree\</code\>           \<nowiki\>: \</nowiki\>   \<nowiki\>: \</nowiki\>   23
                                    \<nowiki\>: \</nowiki\>   \<nowiki\>: \</nowiki\>   90
                                    \<nowiki\>: \</nowiki\>   \<nowiki\>: \</nowiki\>   
  \<code\>-\</code\>                \<nowiki\>: \</nowiki\>   \<nowiki\>: \</nowiki\>   67
                                    \<nowiki\>: \</nowiki\>   \<nowiki\>: \</nowiki\>   \<nowiki\>: \</nowiki\>
  \<code\>ELSE\</code\>             \-\--                     \<nowiki\>: \</nowiki\>   \<nowiki\>: \</nowiki\>
                                                              \<nowiki\>: \</nowiki\>   \<nowiki\>: \</nowiki\>
  \<code\>degree\</code\>           35                        \<nowiki\>: \</nowiki\>   \<nowiki\>: \</nowiki\>
                                                              \<nowiki\>: \</nowiki\>   \<nowiki\>: \</nowiki\>
  \<code\>THEN\</code\>             35                        \<nowiki\>: \</nowiki\>   67
                                                              \<nowiki\>: \</nowiki\>   
  \<code\>at: self\</code\>         5736                      \<nowiki\>: \</nowiki\>   9205
                                                              \<nowiki\>: \</nowiki\>   
  \<code\>quadrant\</code\>         0                         \<nowiki\>: \</nowiki\>   3
                                    5736                      \<nowiki\>: \</nowiki\>   9205
                                                              \<nowiki\>: \</nowiki\>   
  \<code\>at: signs\</code\>        0                         \<nowiki\>: \</nowiki\>   1
                                    5736                      \<nowiki\>: \</nowiki\>   9205
                                                              \<nowiki\>: \</nowiki\>   
  \<code\>IF\</code\>               5736                      \<nowiki\>: \</nowiki\>   9205
                                    \<nowiki\>: \</nowiki\>   \<nowiki\>: \</nowiki\>   
  \<code\>negate\</code\>           \<nowiki\>: \</nowiki\>   \<nowiki\>: \</nowiki\>   -9205
                                    \<nowiki\>: \</nowiki\>   \<nowiki\>: \</nowiki\>   
  \<code\>THEN\</code\>             5736                      \<nowiki\>: \</nowiki\>   -9205
                                                              \<nowiki\>: \</nowiki\>   
  \<code\>THEN\</code\>             5736                      0                         -9205

Now for a description of what happens to each degree value.

The \<code\>MOD\</code\> operation in line 18 provides the stack with
the remainder of dividing the degree entry by 360. If the entry was 360
or more, this will normalize the degree value to be between and 359. If
the entry was negative, the \<code\>MOD\</code\> operation returns a
negative value between -359 and , and further normalization is required.
Line 19 tests the result to see if it was negative, and if it was
negative, adds 360 to convert it to the equivalent positive angle
(correctly in the range to 359).

The \<code\>/MOD\</code\> operation on line 20 takes the normalized
degree value off the stack and returns a quotient and remainder. A
quotient of zero indicates it is in the upper-right quadrant, a one
places the degree in the second quadrant in the upper-left, and so on.
The remainder becomes the degree value that will be checked against the
sine table, since the table contains values for only a 90 degree chunk
of the full 360 degree range. On line 21 these values are taken from the
stack and put into local storage.

For the next operation on line 22 and 23, we recall the value from
\<code\>DEGREE\</code\> (but this does not remove it from
\<code\>DEGREE\</code\>, it only copies it onto the stack) and test to
see if it is equal to zero.

If the value is zero, that means that the degree value is a multiple of
90 degrees, and therefore lies on a boundary between two quadrants. To
save time and calculation, the sine values for those four boundaries
have been stored in the \<code\>AxisVals\</code\> array. Since the
degree value is zero, the operation after the \<code\>NIF\</code\>
statement on line 23 is performed. The quadrant value saved earlier is
placed on the stack and used as an index for the \<code\>AT:\</code\>
selector. The \<code\>AT:\</code\> method in \<code\>AxisVals\</code\>\'
class, \<code\>wArray\</code\>, is the opposite of the
\<code\>TO:\</code\> storage operator, which was used to place values in
the arrays. The \<code\>AT:\</code\> operation instead *fetches* a value
from an array object (in this case named \<code\>AxisVals\</code\>)
according to the index number that is on the top of the stack. In our
180 degree example, a value of 2 was saved in quadrant and the put on
the stack. The value in the \<code\>AxisVals\</code\> cell corresponding
to the index 2 is then placed on the stack (it has only been copied from
the array, not removed). At this point, the final sine value is in the
stack, so there is no further operation needed. Following the rules of
nested
\<code\>IF\</code\>&brvbar;\<code\>ELSE\</code\>&brvbar;\<code\>THEN\</code\>
statements, execution continues to the outermost \<code\>THEN\</code\>
statement, which is at the end of the method.

But when the degree value is not zero, much more happens. The quadrant
value is \<code\>AND\</code\>ed with 1 on line 24 and tested to see if
is 1 or 3. If so, then the \<code\>DEGREE\</code\> value is recalled and
has 90 degrees subtracted from it on line 25 (sine values increase to 90
degrees, then decrease to 180 in a reverse, mirror image). Otherwise,
just the \<code\>DEGREE\</code\> value is placed on the stack again on
line 26.

In line 28, the \<code\>AT:\</code\> selector takes the index value
currently on the stack (it also happens to be the degree to be checked
in the sine table) and fetches the value from the \<code\>Sines\</code\>
array. The \<code\>SELF\</code\> notation tells Mops to perform the
\<code\>AT:\</code\> fetch itself, in this case, the
\<code\>Sines\</code\> object.

That \<code\>AT:\</code\> fetch operation places the sine value from the
table on the stack. One last job remains&\#148;to determine if the sine
value is positive or negative. The quadrant number is
\<code\>AND\</code\>ed with 2 on line 29. If the quadrant is 2 or 3,
which are the quadrants for which the sine is negative, the result of
this \<code\>AND\</code\> will be non-zero. In this case the sine value,
which is all that remains on the stack, is made negative (with the
\<code\>NEGATE\</code\> operation of line 30), otherwise, it stands
positive, and the method ends.

The \<code\>COS:\</code\> method in lines 33 and 34 uses the power of
the \<code\>SIN:\</code\> method, but simply modifies it to take into
account the mathematical relationship between a sine and cosine of an
angle. A cosine can be calculated from a sine by phase-shifting 90
degrees.

At this point in the program (up to line 66), the kind of message you
would send to calculate the sine of a given value in degrees would be:

`125 sin: Sines`

To simplify this even more, two Mops definitions are added (lines
68-69). Each word sends a message like the one above. Thereafter, the
only code you need in a program to obtain the sine of an angle is:

`125 sin`

### Lines 71 to 76 {#lines_71_to_76}

Class \<code\>Angle\</code\> provides an example of how the
\<code\>SIN\</code\> and \<code\>COS\</code\> definitions in lines 68
and 69 can be used in other class definitions, even though those words
are defined by messages to objects of a different class. This class, an
integer class, has two methods, \<code\>SIN:\</code\> and
\<code\>COS:\</code\>. They may appear to have the same method names as
methods in class \<code\>TrigTable\</code\>, but there will be no
interference between the two. That\'s because if you create an object of
class \<code\>Angle\</code\>, that object looks up methods only in its
own class hierarchy. It doesn\'t even know class
\<code\>TrigTable\</code\> exists. When a method in class
\<code\>Angle\</code\> uses the new Mops word \<code\>SIN\</code\>, it
lets the word reach into memory to do what it has to, even if it means
working in other classes&\#148;all without disturbing the integrity of
class \<code\>Angle\</code\> and inheriting all the baggage of
\<code\>TrigTable\</code\>.

The \'\<code\>get: self\</code\>\' message (lines 73 and 74) retrieves
the value of the integer stored in an object created from class
\<code\>Angle\</code\>. To store a value in that object, you would need
to look through class \<code\>Angle\</code\>\'s hierarchy until you
found a \<code\>PUT:\</code\> method in the \<code\>Int\</code\>
superclass that stores the value. For example, if you create an object
like this:

`angle Narrow`

you are setting aside a cell in \<code\>Narrow\</code\>\'s memory for an
integer, because class \<code\>Angle\</code\> is a subclass of the
\<code\>Int\</code\> class. You would then need to send the message:

`30 put: Narrow`

to store the value, 30, in the object \<code\>Narrow\</code\>. After
that, you can send the message:

`sin: Narrow`

which sets the \<code\>SIN:\</code\> method in class
\<code\>Angle\</code\> to work. The value, 30, is retrieved by the
\'\<code\>get: self\</code\>\' operation, and then the sine value is
calculated by the Mops word, \<code\>SIN\</code\>.

With Mops loaded up and running, try this out yourself. Use Mops\'
\<code\>Load\</code\> menu item (in the File menu) to load the file
\"\<code\>Sin\</code\>\" (in \'Demo folder\') into the dictionary, and
then create an object of class \<code\>Angle\</code\>. Then,
\<code\>PUT:\</code\> a value in the object, then send messages to that
object to calculate the sine and cosine of the value.

------------------------------------------------------------------------

  ------------------------------------------- --------------------------------- -----------------------------------
  [Lesson 15](Lesson_15 "wikilink")           [Tutorial](Tutorial "wikilink")   [Lesson 17](Lesson_17 "wikilink")
  [Documentation](Documentation "wikilink")                                     
  ------------------------------------------- --------------------------------- -----------------------------------

[Category:Manual](Category:Manual "wikilink")
[Category:Tutorial](Category:Tutorial "wikilink")
