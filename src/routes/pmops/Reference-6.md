Strings in Mops {#strings_in_mops}
===============

String Types {#string_types}
------------

There are three main ways of representing strings in Mops: as Str255
strings, as addr-len format strings, or as objects of class
\<code\>String\</code\> or \<code\>String+\</code\>.

When \<code\>WORD\</code\> parses a string, it places at HERE (the next
available memory location above the dictionary : 68k) or
\<code\>CDP\</code\> (the next available memory location above the code
area of dictionary, which is different from \<code\>HERE\</code\> :
PowerPC) a byte representing the length of the string, followed by the
text of the string. This is the same representation as that used by the
Toolbox for the Str255 data type (see [Inside
Macintosh](http://developer.apple.com/techpubs/mac/IAC/IAC-2.html)).
When passing strings as parameters on the stack and manipulating them,
however, it is usually most convenient to use two cells to represent the
string as \<code\>( addr len \-- )\</code\>. The word
\<code\>COUNT\</code\> accepts an address of a Str255-format string and
returns its ( addr len ) representation. Conversely, the word
\<code\>STR255\</code\> converts addr len to Str255 format, returning
the address of the length byte to facilitate Toolbox calls.

Mops preserves a special 256-byte buffer expressly for conversion of
addr len to Str255 format, and this buffer\'s address is left on the
stack by the word \<code\>BUF255\</code\>. You can use this area
occasionally as a temporary workspace for other operations, provided you
don\'t interfere with routine string processing. Note that the word
\<code\>STR255\</code\> uses \<code\>BUF255\</code\>, and so can only
work with one string at a time. For Toolbox calls that require multiple
strings, you will have to use the word \<code\>&gt;STR255\</code\>,
which accepts an arbitrary address for setup of the string.

String Literals and Constants {#string_literals_and_constants}
-----------------------------

A Mops string literal is a quote followed by one space and the text of
the string, immediately followed by another quote:

`" Harold" \ leaves ( -- addr len ) of string`

Thus, \<code\>\" Harold\" TYPE\</code\> would print the word
\<code\>Harold\</code\> on the screen. You should use the string literal
whenever you have a single occurrence of a string.

String constants (\<code\>SCON\</code\>), on the other hand, are useful
when you need to use a string several times in your code. You assign a
name to the string, and then use the string name for operations with
that string, as follows:

`scon   harry   "Harold"        \ assign name harry to string `\
`harry type                     \ prints "Harold" on the screen`

**Note that in this case you don\'t put a space between the \" and the
first character of the string.** In the first example,
\<code\>\"\</code\> was a word, and so had to have a space after it. In
the second example, \<code\>\"\</code\> isn\'t a word, but just a
character being read by the word \<code\>SCON\</code\>. In fact you can
use any character as a delimiter, which is useful if you need to include
a \<code\>\"\</code\> within the string itself. The first nonblank
character after the name of the scon is the delimiter, and the string
consists of all the characters up till the next occurrence of the
delimiter. Thus you can have:

`scon 3quotes /"""/`

Using the name of the scon in your program leaves \<code\>( addr len
)\</code\> on the stack, and compiles into a single xt of the dictionary
entry for the constant name. Both string literals and constants are
fixed strings that once defined, cannot be changed.

For heavily text-oriented applications, a more suitable approach would
be to define the text strings as Resources (see section on Using
Resources in Mops).

Other String Techniques {#other_string_techniques}
-----------------------

For string variables, use an object of classes \<code\>String\</code\>
or \<code\>String+\</code\>, discussed in Part III of this manual. These
classes have many methods for doing the sorts of things that you might
want to do with strings, such as building them dynamically, finding
substrings, searching strings, and inserting and deleting characters
from within strings.

In the Tutorial we described the word &amp; which compiles a single
literal ASCII character. This can be used either inside or outside a
definition. There are also the ANSI standard words \<code\>CHAR\</code\>
and \<code\>\[CHAR\]\</code\> which perform this function. Outside a
definition, the phrase:

`char A`

places the ASCII code for \'A\' (65) on the stack. Inside a definition,
the phrase

`[char] A`

compiles a literal for \'A\', and places the value on the stack at
runtime. And as we\'ve seen, you can use

`&amp; A`

either inside or outside a definition, which is probably more convenient
(although not ANSI).

There are several primitives for getting a string from the input stream
(either keyboard or disk) into the dictionary. \<code\>WORD\</code\>
gets the next word, without embedded blanks, and moves it to
\<code\>HERE\</code\>, then returns that address.
\<code\>\@WORD\</code\> is a useful word that takes the place of the
frequent phrase \<code\>BL WORD\</code\>. For strings,
\<code\>WORD\"\</code\> reads a quote-delimited string from the input
stream, moves it to \<code\>HERE\</code\> or \<code\>CDP\</code\>, and
returns that address. \<code\>MWORD\</code\> (\'Mops word\') executes
\<code\>BL WORD\</code\>, and maps the word to upper case. It is used by
Mops itself when interpreting or compiling.

------------------------------------------------------------------------

  ------------------------------------------- ----------------------------------- ---------------------------------------
  [Reference 5](Reference_5 "wikilink")       [Reference](Reference "wikilink")   [Reference 7](Reference_7 "wikilink")
  [Documentation](Documentation "wikilink")                                       
  ------------------------------------------- ----------------------------------- ---------------------------------------

[Category:Manual](Category:Manual "wikilink")
[Category:Reference](Category:Reference "wikilink")
