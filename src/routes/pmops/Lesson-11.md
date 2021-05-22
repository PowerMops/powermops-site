Specialized Stack and Arithmetic Operations {#specialized_stack_and_arithmetic_operations}
===========================================

This is a good time to learn several other basic Mops operations.
They\'re rather simple, so we may as well get them out of the way now.
We won\'t be saying too much about them here, but you might want to
experiment with them for a bit to get a feeling for how they work.

One group of operations compares the values of the two topmost items in
the parameter stack. The result of the comparison is placed on the
stack. Here they are:

  ---------------------- -------------------------------------- ---------------------------------------------------------------------------
  \<code\>MIN\</code\>   \<code\>( n1 n2 \-- n-min )\</code\>   Leaves the smaller of &lsquo;n1&rsquo; and &lsquo;n2&rsquo; on the stack.
  \<code\>MAX\</code\>   \<code\>( n1 n2 \-- n-max )\</code\>   Leaves the larger of &lsquo;n1&rsquo; and &lsquo;n2&rsquo; on the stack.
  ---------------------- -------------------------------------- ---------------------------------------------------------------------------

The next group manipulates the signs of integers, whether positive or
negative. One returns the absolute (positive) value of the topmost
number in the stack. The other changes the sign of the topmost number in
the stack: if the original is positive, the operation changes it to
negative, and vice versa. Here are these two operations:

  ------------------------- ---------------------------------- ------------------------------------------------------------
  \<code\>ABS\</code\>      \<code\>( n \-- \|n\| )\</code\>   Leaves the absolute value of &lsquo;n&rsquo; on the stack.
  \<code\>NEGATE\</code\>   \<code\>( n \-- n )\</code\>       Changes the sign of the topmost number on the stack.
  ------------------------- ---------------------------------- ------------------------------------------------------------

Next is a list of simple arithmetic shortcuts. Their meanings should be
self-evident.

  ---------------------- -------------------------------- -------------------------------------------
  \<code\>1+\</code\>    \<code\>( n \-- n+1 )\</code\>   Adds 1 to the number on the stack.
  \<code\>1-\</code\>    \<code\>( n \-- n-1 )\</code\>   Subtracts 1 from the number on the stack.
  \<code\>2+\</code\>    \<code\>( n \-- n+2 )\</code\>   Adds 2 to the number on the stack.
  \<code\>2-\</code\>    \<code\>( n \-- n-2 )\</code\>   Subtracts 2 from the number on the stack.
  \<code\>2\*\</code\>   \<code\>( n \-- 2n )\</code\>    Multiplies the number on the stack by 2.
  \<code\>2/\</code\>    \<code\>( n \-- n/2 )\</code\>   Divides the number on the stack by 2.
  \<code\>3+\</code\>    \<code\>( n \-- n+3 )\</code\>   Adds 3 to the number on the stack.
  \<code\>3-\</code\>    \<code\>( n \-- n-3 )\</code\>   Subtracts 3 from the number on the stack.
  \<code\>4+\</code\>    \<code\>( n \-- n+4 )\</code\>   Adds 4 to the number on the stack.
  \<code\>4-\</code\>    \<code\>( n \-- n-4 )\</code\>   Subtracts 4 from the number on the stack.
  \<code\>4\*\</code\>   \<code\>( n \-- 4n )\</code\>    Multiplies the number on the stack by 4.
  \<code\>4/\</code\>    \<code\>( n \-- n/4 )\</code\>   Divides the number on the stack by 4.
  ---------------------- -------------------------------- -------------------------------------------

The application of these shortcuts will become more apparent the more
you program in Mops. The addition and subtraction shortcuts, for
example, come in handy when you need to increment or decrement a counter
of some kind.

Displaying Text {#displaying_text}
---------------

So far in this tutorial, we\'ve used the \<code\>.\</code\> (dot)
command to display a number on the screen. But, many times in a program,
you will probably also want to display text on the screen. It may be to
display a heading of some kind, or to make your program more
user-friendly by describing what a purely numeric answer is supposed to
represent. In the latter case, you are usually combining the display of
an unchanging text message with a numeric answer which can change from
execution to execution. For the text itself, we can use the Mops word
\<code\>.\"\</code\> (pronouced \"dot-quote\"), followed by the desired
text message, and followed by a final quotation mark (\")

In Mops, like many computer languages, quotation marks fall into a broad
category of symbols which are known as delimiters, because they
*delimit* or set the limits for something&\#148;in this case, a text
message. The text within this set of delimiters is called a text string,
or just string. With normal Mops words, spaces, tabs, or carriage
returns are the delimiters. However for message strings we usually want
to be able to include spaces as part of the string, so we use \" as a
delimiter instead. However, since \<code\>.\"\</code\> is a Mops word,
it must itself be delimited by a space. This space is *not* included as
part of the string, but the first character after the space is the first
character of the string (even if it is a space). Here is an example:

`<nowiki>`\
`: HI  ." Hello, this is Mops operating on the Mac."  cr ;`\
`</nowiki>`

Now, when you type \<code\>HI\</code\> at the Mops prompt, the message
between the quotes appears on the screen. Again, observe that the space
immediately after the \<code\>.\"\</code\> is not part of the message,
but just serves to delimit \<code\>.\"\</code\> as a word that Mops can
recognize. If the space wasn\'t there, Mops would try to interpret
\"\<code\>.\"hello,\</code\>\" as a word, which certainly isn\'t what we
want.

One of the nice things about Mops is that you can use previously defined
words inside the definitions of new words. Therefore, you could take the
\<code\>HI\</code\> word we just defined and incorporate it inside yet
another Mops definition. For example,

`<nowiki>`\
`: GREETING  hi ." How are you?" cr ;`\
`</nowiki>`

produces not only the message of \<code\>HI\</code\>, but an additional
text string whenever you type \<code\>GREETING\</code\> at a Mops
prompt.

Now combine your knowledge of arithmetic operations and text strings to
\"humanize\" the arithmetic word, \<code\>ADD\</code\>, from our
previous lesson. Here\'s the new definition:

`<nowiki>`\
`: ADD  ( n1 n2 --  )  + ." The sum is: " . cr ;`\
`</nowiki>`

Or, if \<code\>ADD\</code\> is still defined from our last lesson (and
you want to be tricky), we can also do:

`<nowiki>`\
`: ADD  ( n1 n2 --  )  ." The sum is: " add ;`\
`</nowiki>`

To use the new word, issue the command at the Mops prompt like this:

`<code>10 20 add</code>`\
`The sum is: 30 `

Explicit Stack Manipulations {#explicit_stack_manipulations}
----------------------------

While named input parameters and local variables will disguise many
stack manipulations for you, there may be occasions when the order of
items in the stack requires an explicit move of some values for a
particular operation. Conversely, the stack may have a number on it that
you simply don\'t need anymore, and want to dispose of. In these cases,
you can choose from a series of stack manipulation operations.

Here are three stack manipulation operators that you should keep in
mind:

  ----------------------- -------------------------------------- -----------------------------------------------------------------------------------------------
  \<code\>SWAP\</code\>   \<code\>( n1 n2 \-- n2 n1 )\</code\>   Switches the order of the topmost two items in the parameters stack.
  \<code\>DUP\</code\>    \<code\>( n \-- n n )\</code\>         Duplicates the topmost stack item and places the new copy on top.
  \<code\>DROP\</code\>   \<code\>( n \-- )\</code\>             Removes the topmost stack item. If another item is next in line, it becomes the topmost item.
  ----------------------- -------------------------------------- -----------------------------------------------------------------------------------------------

\<code\>SWAP\</code\> is used, for example, in a more complex
definition, when two values are on the stack but their order is wrong
for a subtraction or division. In fact, it could have been used in a
less elegant definition for the problem cited in [ Lesson
3](Lesson_3#Mastering_Postfix_Notation "wikilink")\<nowiki\>:\</nowiki\>

`<nowiki>`\
` 5 * 12 * 50`\
`-------------`\
`     40`\
`</nowiki>`

By putting the divisor at the bottom of the stack (the first one in),
you can perform all the multiplications and then switch the order of the
two remaining numbers on the stack so they divide properly. The revised
operation would be:

`40 5 12 50 * * swap /`

The word definition that calculates this would be:

`<nowiki>`\
`: FORMULA3  ( denom num1 num2 num3 -- solution )`\
`            * * swap / ;`\
`</nowiki>`

\<code\>DUP\</code\> is sometimes useful for particular arithmetic
applications. An example of how DUP works is to use it to calculate the
square of a number. Instead of pushing two identical values on the
stack, you need to push only one, duplicate it, and then multiply the
two values on the stack like this:

`4 dup *`

Calculating the cube of a number could, likewise, be performed like
this:

`4 dup dup * *`

Therefore, you could set up a Mops word, \<code\>CUBED\</code\>, to
perform the cube calculation:

`<nowiki>`\
`: CUBED  ( n -- )  dup dup * * . cr ;`\
`</nowiki>`

Then you could type \'\<code\>3 cubed\</code\>\' from the Mops prompt,
and the answer would appear on the screen like this:

`<code>`\
`3 cubed</code>`\
`27`

Experiment with the other stack manipulation operators described above.
Place a few numbers in the parameter stack, issue the commands, and see
what happens in the stack display of the Mops window. If you need to,
you can combine two or more stack manipulation operators in the same
Mops word definition as your arithmetic needs arise.

But overall, named input parameters and local variables are the
preferred way of handling values on the stack in a complex definition,
and programs that use them tend be easier to trace and debug than
programs that use explicit stack manipulations (sometimes referred to as
stack gymnastics). And because named parameters and local variables are
more intuitive, there is less chance of making a mistake in the first
place.

------------------------------------------------------------------------

  ------------------------------------------- --------------------------------- -----------------------------------
  [Lesson 10](Lesson_10 "wikilink")           [Tutorial](Tutorial "wikilink")   [Lesson 12](Lesson_12 "wikilink")
  [Documentation](Documentation "wikilink")                                     
  ------------------------------------------- --------------------------------- -----------------------------------

[Category:Manual](Category:Manual "wikilink")
[Category:Tutorial](Category:Tutorial "wikilink")
