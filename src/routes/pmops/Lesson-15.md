Global Constants and Values {#global_constants_and_values}
===========================

Assigning recognizable names to numbers is a convenient shortcut, as
you've seen with [named input
parameters](Lesson_10#Named_Input_Parameters) and [local
variables](Lesson_10#Local_Variables). But as you saw, both
of those kinds of names are local, they apply only to a very limited
section of the program, inside a definition. But Mops also has a
provision called `VALUE` for assigning
readily-identifiable names to numbers such that they can be used
throughout a program.

Your program can contain many different values because you define each
value by giving it a unique name and a number that it is to hold. You
define a value like this:

`25 value Jane`

In other words, the value named `JANE` is holding the
number 25. To recall a value's number, all you do is type the value
name, and a copy of the number is placed on the parameter stack. Type:

`Jane`

and the number 25 is placed on the stack.

\<blockquote\>

Note: If you already have some familiarity with other (much older)
Forths, a `VALUE` is what is sometimes called a
self-fetching variable.

`</blockquote>`

A value is essentially a global version of a local variable (it
accessible to *all* definitions in a program), and responds to similar
operations. To store a different number in a value, you use the gazinta
(the store arrow), like this:

`37 -&gt; Jane`

which writes a 37 over the original number (25). Or you can increment or
decrement the number stored in a value name with the
`++&gt;` or `\--&gt;` operations, like
this:

`17 ++&gt; Jane`\
`4 --&gt; Jane`

which adds 17 to number already stored in `JANE` (37),
then subtracts 4. Of course you can also do a subtraction by
incrementing the value by a negative number:

`-10 ++&gt; Jane`

If you want to define your values at the beginning of a program without
placing specific numbers in them, you can simply place zeros in them
all:

`0 value Joe`\
`0 value Nancy`

and then store (`-&gt;`) numbers to them when necessary.

\<blockquote\>

Note: The initial numbers you specify for your `VALUE`s
are set up when your program is loaded by Mops. If you restart your
application without reloading it, your `VALUE`s will
still contain whatever you last put in them, not their initial numbers.

`</blockquote>`

So much for theory. Now it's time to pull together all the discussions
and examples from the preceding lessons and dive into some real Mops
applications.

------------------------------------------------------------------------

  ------------------------------------------- --------------------------------- -----------------------------------
  [Lesson 14](Lesson_14)           [Tutorial](Tutorial)   [Lesson 16](Lesson_16)
  [Documentation](Documentation)                                     
  ------------------------------------------- --------------------------------- -----------------------------------

[Category:Manual](Category:Manual)
[Category:Tutorial](Category:Tutorial)
