Classes and Objects {#classes_and_objects}
===================

Building a Mops program is largely a process of defining classes of
objects &mdash; classes which are the \'framework\' and objects which
are the \"movers and doers\". In this chapter, we provide you with
details of the inner workings of classes and their components, with
special emphasis on instance variables and methods. We\'ll also discuss
several Mops words that may be particularly useful in building your own
class definitions. You won\'t need to know everything in this chapter to
be successful at building classes, but you should at least survey the
information. It may come in handy later, as your programming skills
grow.

Planning Your Subclasses {#planning_your_subclasses}
------------------------

Mops comes with many predefined classes &mdash; building blocks, which
have been designed to be as general as possible. Your application will
probably require more specific behavior than the predefined classes are
capable of, in which case you will want to define one or more of your
own subclasses of existing classes. Your program\'s unique operations
and flavor will be the result of the behaviors you define in your
sub-classes.

The Class Hierarchy {#the_class_hierarchy}
-------------------

Determining the relationship between a new class and existing ones is an
important step in designing a Mops program. The relationship should be
guided by the way in which the new class is to rely on instance
variables and methods of classes already defined.

A subclass can add new instance variables to those of its superclass,
but it can never redefine the original ones. Therefore, a new class
should be defined as a subclass of another *only* if the instance
variables of the superclass are needed for objects of the new subclass.
If you find that an object of a subclass is not using many of the
superclass\' ivars, then the subclass should probably be a subclass of a
different class.

Methods, on the other hand, can be redefined in subclasses without
hesitation. It is practical to carry through the methods of the
superclass that apply to the subclass, and then redefine or add new ones
where needed to give the subclass its unique properties. Of course, the
more methods a subclass inherits, the more compact the code will be.

Multiple inheritance can be a powerful technique if used judiciously. If
overdone it can cause unnecessary complexity, but used wisely it can
simplify things considerably. Let\'s say a class
\<code\>MyClass\</code\> has three superclasses, \<code\>sup1\</code\>,
\<code\>sup2\</code\> and \<code\>sup3\</code\>. In an object of
\<code\>MyClass\</code\>, the ivars corresponding to
\<code\>sup1\</code\> will come first, then those of
\<code\>sup2\</code\>, then those of \<code\>sup3\</code\>. In typical
Forth laid back manner, we don\'t check for any clashes in method names
in the superclasses. When we look up a method name in
\<code\>MyClass\</code\>, we look at the methods declared in
\<code\>MyClass\</code\> itself first, then in \<code\>sup1\</code\>,
then in \<code\>sup2\</code\>, then in \<code\>sup3\</code\>. If, say,
that particular method name had been declared in both
\<code\>sup2\</code\> and \<code\>sup3\</code\>, the one in
\<code\>sup2\</code\> will be used, and the one in \<code\>sup3\</code\>
will never be accessible within \<code\>MyClass\</code\>. In typical
Mops fashion, we provide an out for this problem: as we saw in [Lesson
19](Lesson_19#Positioning_Views "wikilink") of the Tutorial, when
referring to a method of a superclass, we use the syntax
\<code\>aMethod: super\</code\>. We can be more specific and use
\<code\>aMethod: super&gt; aSuperClass\</code\>, where
\<code\>aSuperClass\</code\> is the one containing the method we want;
this overrides the normal left-to-right search.

If more than one of \<code\>MyClass\</code\> and any of the superclasses
is indexed, we do a check that the specified indexed widths are the
same. We give an error if this condition isn\'t met.

Of course this isn\'t the only possible approach we could have taken to
multiple inheritance. For example we could have had the ivar regions
overlay rather than concatenate. We could do this as an option later, if
anyone wants it.

For a good example of the use of multiple inheritance to simplify code,
look at the class \<code\>Ordered-Col\</code\> in file Struct, and its
associated classes.

Choosing Between ivars and Objects {#choosing_between_ivars_and_objects}
----------------------------------

In addition to designing the class inheritance of your application, you
will have to decide what should be an instance variable and what should
be a public object. Because an instance variable is invisible to objects
other than its owning object, any communication between an ivar and
other objects must be passed explicitly through the ivar\'s owning
object. If you find yourself creating numerous &\#152;passthrough\'
methods that are only there to provide access to a single instance
variable, you should reconsider your design. It probably indicates that
the instance variable should more appropriately be a a public ivar (see
below) or a global (and therefore public) object.

A good example of this kind of realization occurred when we wrote the
grDemo source file. In an earlier version, the three scroll bars were
designed as instance variables of the window. We found, however, that we
were sending many messages to the scroll bars by way of the window
object. By changing our strategy and making the scroll bars public
objects, the program now has more direct communication to the scroll
bars with the added bonus of shortening the source for grDemo by
approximately 30 percent. Ideally, then, your objects should do most of
their communication internally (i.e., sending messages to self, super,
or ivars). Keep to a minimum the number of messages that are to be sent
between objects. This minimizes inter-object coupling, makes objects
more independent, and makes your application more maintainable.

When to Use ivars {#when_to_use_ivars}
-----------------

But there are times when it makes sense to define instance variables, as
we originally tried in grDemo. For example, whenever you find that one
object communicates frequently with only one other object, it is likely
that one of those objects should be an instance variable of the other.
The same holds true when you find it necessary to create objects in
pairs (or other multiples)&\#148;instead of creating two similar
objects, consider creating a third object that consists of two instance
variables. If the window in grDemo had been intended as a
general-purpose class instead of a one-time application, it would have
made sense to keep the scroll bars as ivars, because it would be easier
to add the entire window to later applications.

Much of the work that goes into writing a Mops program should be devoted
to designing object boundaries. A well-planned application will be much
more understandable at the source code level. By clearly defining class
functions, a better sense of structure will prevail. This, after all, is
what object-oriented programming is all about, and you will probably
need to work with objects for awhile before you really fine-tune your
ability to create an optimal design. The best design is one in which
inter-object communication is minimal and well-defined, reflecting
clearly the structure of the problem being solved.

Defining a Class {#defining_a_class}
----------------

Now, let\'s take a closer look at the mechanics of building a new class.
A class definition has the following skeletal structure:

`<nowiki>`\
`:class  ClassName  super{ super1 ... superN } [ n indexed ] [ large ]`\
`       [ instance variable names ] `\
`       [ method definitions ] `\
`;class`\
`</nowiki>`

In the above example, the brackets indicate optional sections of a class
definition. If you build a class with one superclass that omits all of
the optional sections, it will behave in exactly the same manner as its
superclass, because you will not have added any ivars or methods to make
the new class any different. **ClassName** is the name that you assign
to the new class. **super1** etc. are the names of existing classes that
are to be the basic models for the new class. The word **indexed**, when
preceded by a number, defines the width in bytes of each indexed
instance variable cell for the new class. An indexed width of 0
indicates that the class is not indexed; if this number is nonzero, the
class will require that a number, indicating the number of elements, be
on the stack when the class is instantiated (i.e., when you create an
object of that class). Thus, the line of Mops code, 3 Array A1, builds
an **indexed object**, called A1, of class Array that has 3 indexed
elements.

If you include the word LARGE in your class definition, you are saying
that this is an indexed class, and its objects may have more than 32k
indexed elements. Indexing operations on LARGE classes will use 32-bit
arithmetic, which will slow accesses very slightly (on 68000-based
machines only &mdash; Plus, Classic, SE). No bounds checking is done,
since the CHK machine instruction, which we use for bounds checking,
uses only 16-bit index values. For these reasons, don\'t use LARGE
unless you really have to.

Note that you can declare as LARGE a subclass of an indexed class which
isn\'t LARGE. But this isn\'t really a good idea. Any methods inherited
from the superclass won\'t know that the class is LARGE, so if they try
to access the indexed area they won\'t do it properly. For example, they
will execute a CHK instruction, checking the low 16 bits of the index
against the low 16 bits of the limit! This for sure won\'t be what you
want. So in this kind of situation, you had better know what you\'re
doing, and only inherit methods which don\'t access the indexed area.

Ivars
-----

Next in a class definition come the instance variable declarations,
which are simply statements of the form:

`[ # of elements ] ClassName ivarName`

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ClassName here is the class that defines the characteristics of the ivar. Each ivar declaration statement creates an entry in the private **instance variable dictionary** of the class currently being defined. The entry for each ivar contains fields for the header, data, and a pointer to the class specified by the ivar\'s ClassName. An instance variable definition is really just a **template** for the private data of the object. When an object is created, the object\'s data area is assembled (i.e., memory space is reserved) according to the specifications in the template.   ![](IVars.png "fig:IVars.png")\<br /\> Figure 2-1&mdash;Instance Variables and Objects   Notice that the \'object\' in the diagram has some \'Mops info\' at the start &mdash; as we mentioned in [Lesson 5](Lesson_5#Defining_a_Class "wikilink") of the Tutorial, Mops objects have 8 bytes of extra information at the start. Part of this extra information is a pointer to the class of the object, as we show in the diagram. (We\'ll give the full details of this extra information in the technical section later).\<br /\> Then comes the first ivar, so this is the start of the actual data area of the object.
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ---------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Instance variables are also objects. The main difference (other than the
private/public distinction) is that they can be declared as part of a
\'record\', and in this case their \'Mops information\' is omitted, as
we discussed in Lesson 5.

In a practical example, a Toolbox Rectangle is stored as 4 consecutive
2-byte integers (the x and y coordinates for the
\<code\>TopLeft\</code\> and \<code\>BottomRight\</code\> corners). To
pass these parameters to the Mac Toolbox, it is most convenient to map
this structure with 4 Int ivars (each 2 bytes wide), using the
\<code\>68k\_record {\...}\</code\> syntax, knowing that the 2 bytes of
data for each Int will be adjacent to one another.

### For Advanced Mops Programmers {#for_advanced_mops_programmers}

Indexed ivars also have, in addition to the Mops info, a 6-byte indexed
header. The data in the indexed header consists of the number of indexed
elements and the length (in bytes) of each element. This data is used
for **range checking**.

### Ivars as Toolbox Data Structures {#ivars_as_toolbox_data_structures}

As you may have noticed in the sample applications in the tutorial,
instance variables are very often used as representations of the data
structures that the Macintosh Toolbox expects to see when Toolbox calls
are made. In essence, the list of ivars creates a mapping between the
data fields in an object and a structure that the Toolbox recognizes.
The Toolbox structure might only be a subset of the entire body of data
in the object, as it is in the case of class Window.

In defining a new class that calls a Toolbox routine, you will often
need to map the layout of the class\'s data structure to mirror a
Toolbox data structure (Toolbox data structures are listed at the end of
each section of [Inside
Macintosh](http://developer.apple.com/documentation/index.html)). To map
the data such that the Toolbox will be able to use it properly, define
all of the Boolean fields as Byte ivars, Integer or Char fields as Int
ivars, and all Long (32-bit) Handle or Pointer fields as Var ivars, and
remember to use \<code\>68k\_record {\...}\</code\> around the whole
group of ivars.

If there is a section of the data record that you will not need named
access to (e.g. data that never changes in the course of a program, but
must be in the object\'s data structure for the Toolbox call), you can
save ivar dictionary space by using the \<code\>BYTES\</code\>
pseudo-class to allocate a string of bytes with a single name. For
instance, the following ivar declaration:

`var    v1 `\
`20     bytes   junk`\
`var    v2`

builds a data area that has two 4-byte \<code\>Var\</code\>s,
\<code\>v1\</code\> and \<code\>v2\</code\>, with 20 bytes of data,
called \<code\>junk\</code\>, between them. The Toolbox will use this
area, but the object will never need to access it directly. This is more
space efficient than assigning individual names to a lot of little
fields &mdash; names that will never be used because the data placed
there never is used by Mops. \<code\>BYTES\</code\> actually builds an
ivar entry of class \<code\>Object\</code\> and then reserves a data
length equal to the number that you declare. This means that, if
necessary, you can get its address with the addr: method. But don\'t
send it a \<code\>length:\</code\> message, since this will always
return zero (the length of an \<code\>Object\</code\>). Note also that
\<code\>BYTES\</code\> is **not** an indexed data type like
\<code\>bArray\</code\> &mdash; it creates one named field, not an array
of bytes.

### How ivars are Linked {#how_ivars_are_linked}

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------
  This table shows the format of an instance variable dictionary entry. It bears some similarity to a standard Mops dictionary entry, except that the ivar name is converted to a hashed value (a compacted form automatically derived from a complex math algorithm). All of the ivar entries for a given class form a linked list back to the root of the ivar chain (see the left column of [Figure 2-1](#fig2-1 "wikilink")). This root is the pseudo-ivar, \<code\>SUPER\</code\> (\<code\>SELF\</code\> and \<code\>SUPER\</code\> exist as instance variables in class \<code\>META\</code\> &mdash; the superclass of the all-encompassing class OBJECT). The **message compiler** detects references to these two special ivars, and begins the method search in a place appropriate for each. Therefore, when a new class is being defined, the \^class field of \<code\>SUPER\</code\> is patched (directed) to the new class\' superclass, and that of SELF to the new class itself. In this way, the search for a given method automatically begins in the proper place for \<code\>SELF\</code\> and \<code\>SUPER\</code\> references.   Figure 2-2&mdash;Instance Variable Fields\<br /\> ![](IVarFields.png "fig:IVarFields.png")
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------------------------------------

### Potential ivar Errors {#potential_ivar_errors}

There is an **extremely** small possibility that you could get an ivar
redefinition error when loading a new class, even if the names of the
two ivars in question are different. Because the names of the ivars are
hashed, two different names could conceivably generate the same hash
value. This situation should be extremely rare, since we use a 4-byte
hash value. But if it arises, try a different name for one of the ivars.

Methods
-------

After all of the instance variables are declared, you must write the
methods for the new class. A method definition takes the form (here
brackets denote optional sections):

`<nowiki>`\
`:m SELECTOR: [ { named args \ local vars -- results } ] `\
`       [ method code ]  ;m`\
`</nowiki>`

A valid selector name (any alphanumerics ending in a colon) must follow
the \<code\>:m\</code\> (separated by at least one space). The selector
becomes the name of the new method in the dictionary. A class\' method
has access to all public objects, to all instance variables of its own
class and all of its superclasses up the chain, and to
\<code\>SELF\</code\> and \<code\>SUPER\</code\>. A method can use any
previous methods already defined in the current class, and can recurse
by simply using the name of the method being defined with
\<code\>SELF\</code\> as the receiver. Be sure to use
\<code\>SUPER\</code\> rather than \<code\>SELF\</code\> as the message
receiver in a redefined method if you want to call the original method
in the superclass.

### Special Mops Words for Primitive Methods {#special_mops_words_for_primitive_methods}

You will find that the methods that you write for classes at the ends of
long superclass chains consist primarily of messages to ivars or
\<code\>Self\</code\>, instead of a lot of Mops words or primitive
operations. You can see an example of this in the predefined class,
\<code\>Ordered-Col\</code\> (see Basic Data Structures in Part III),
which has several superclasses.

But you may find it necessary from time to time &mdash; especially after
you\'ve gained some experience defining simpler classes &mdash; to
define a new class that uses primitive methods involving direct access
to the class\' data area. An example of this kind of object is class
\<code\>Var\</code\> in the Struct source file, which manipulates its
data directly. Several Mops words described below will come in handy for
writing primitive methods like this.

### \^BASE and \^ELEM {#base_and_elem}

You can use \<code\>\^BASE\</code\> (pointer to the base address of the
current object) from within any method to place the **base address** of
the current object onto the stack. Note that \<code\>\^BASE\</code\>
leaves the same address as the phrase \<code\>Addr: self\</code\>, or
that left by using the name of the object in another word or method.
This address points to the data field of the object, which also happens
to be the beginning of its named ivar data area.

Primitive methods generally have to get the base address of the data
area, and then perform some kind of fetch or store operation at that
address. The get: method for class LongWord, for instance, could have
been defined in this manner:

`<nowiki>`\
`:m GET: ^base @ ;m`\
`</nowiki>`

which fetches the longword (32 bits wide) at the object\'s data area.
For a \<code\>LongWord\</code\> this is the entire data area, defined as
a single ivar: 4 Bytes Data. The actual definition of
\<code\>get:\</code\> in class \<code\>LongWord\</code\> is somewhat
different, since it compiles inline code for speed.

Because a primitive method will often be the code that gets executed
after a long chain of nested messages, it pays to make it as efficient
as possible. Mops has very fast code operations for its most often used
primitive methods.

Indexed classes, for example, have an extensive set of primitives for
their most often-used operations. \<code\>LIMIT\</code\> returns the
maximum number of cells allocated to an indexed object. After the phrase
&ldquo; \<code\>3 array a1\</code\> &rdquo; (creating an indexed object,
\<code\>a1\</code\>, of class array, with 3 data cells), executing
\<code\>LIMIT\</code\> within one of \<code\>A1\</code\>\'s methods
would produce 3 on the stack. \<code\>\^ELEM\</code\> (pronounced
&ldquo;pointer-to-element&rdquo;) expects an index on the stack to begin
with, and leaves on the stack the address of the corresponding indexed
element; it will invoke an error routine if the class is not indexed.
(Incidentally, \<code\>\^ELEM\</code\> performs **range checking** to
make sure the index on the stack is within the range of the index.)
Another fast primitive, \<code\>IDXBASE\</code\>, leaves a pointer to
the 0th (i.e., the first element) element of an indexed object or ivar
(equivalent to &ldquo; \<code\>0 \^ELEM\</code\> &rdquo; ).

Other optimized primitives you should be aware of are those that access
1, 2, and 4-byte arrays. Instead of using \<code\>\^ELEM\</code\>, it is
faster to use \<code\>\^ELEM1\</code\> for 1-byte elements,
\<code\>\^ELEM2\</code\> for 2-byte elements, or
\<code\>\^ELEM4\</code\> for 4-byte elements.

Finally, the message &ldquo; \<code\>width: self\</code\> &rdquo; will
leave the width of an object\'s indexed elements on the stack.

------------------------------------------------------------------------

  ------------------------------------------- ----------------------------------- ---------------------------------------
  [Reference 1](Reference_1 "wikilink")       [Reference](Reference "wikilink")   [Reference 3](Reference_3 "wikilink")
  [Documentation](Documentation "wikilink")                                       
  ------------------------------------------- ----------------------------------- ---------------------------------------

[Category:Manual](Category:Manual "wikilink")
[Category:Reference](Category:Reference "wikilink")
