Loops
=====

Computer programs frequently need certain operations to be repeated a
specific number of times.

For example, finding the sum of ten numbers in the stack would normally
take a stream of over nine statements. To a programmer\'s way of
thinking, this makes the program several steps longer than necessary. It
would be better to find a shortcut way of repeating the add operation as
many times as is needed to do the job, without increasing program size
with a long series of identical statements. That\'s where a loop
construct comes in.

A loop sets up a kind of merry-go-round in your program, with a
beginning and an end. At the end of the loop is an instruction that
tells the program to \"loop back\" to the beginning of the loop. All the
statements between the beginning and the end are repeated each time
program execution goes through the loop.

Mops has two major categories of loops: definite and indefinite. As
their names imply, each category has a different way of figuring out
when to stop going around the loop. A definite loop performs only as
many loops as the program specifies; an indefinite loop, on the other
hand, will loop (forever) until a certain condition is met.

Let\'s look at each kind of loop more closely.

Definite Loops {#definite_loops}
--------------

Consider the 10-number addition problem discussed above. Since you know
ahead of time that there will be exactly ten numbers on the stack before
any addition takes place, you could use a definite loop to perform nine
addition operations on the stack.

A definite loop in Mops consists of a
\<code\>DO\</code\>\...\<code\>LOOP\</code\> statement, which expects to
find two numbers on the stack before the \<code\>DO\</code\> executes.
The two numbers represent the count of the repetitions that the
\<code\>DO\</code\>\...\<code\>LOOP\</code\> statement is to make; the
second value (on the top of the stack) is incremented before the loop
begins.

  ---------------------------------------------- -------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  \<code\>DO\</code\>\...\<code\>LOOP\</code\>   \<code\>( n1 n2 \-- )\</code\>   Increments &lsquo;\<code\>n2\</code\>&rsquo; each time after performing operations between \<code\>DO\</code\> and \<code\>LOOP\</code\>\<nowiki\>; exits loop when\</nowiki\> &lsquo;\<code\>n2\</code\>&rsquo; equals &lsquo;\<code\>n1\</code\>&rsquo;.
  ---------------------------------------------- -------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Because loops work only in compiled statements, you will need to put
them inside colon definitions to see how they operate. Let\'s define a
new word that adds up 10 numbers from the stack by repeatedly performing
nine addition operations:

`<nowiki>`\
`: ADDTEN  ( n1 ... n10 -- sum )`\
`       9 0 DO  +  LOOP  . cr ;`\
`</nowiki>`

During execution, this \<code\>DO\</code\>\...\<code\>LOOP\</code\>
counts up from zero to nine each time through the loop. After the ninth
time around, the loop stops; the top of the stack (the sum) is displayed
and a carriage return is executed.

You may be wondering where Mops keeps track of the loop counter if the
parameter stack is used to hold all the numbers that get added. The
answer to that involves a powerful feature called indexing, which will
play an increasingly important role the more you learn about Mops.

When you entered the 9 and the prior to the
\<code\>DO\</code\>\...\<code\>LOOP\</code\> construction in the example
above, what you couldn\'t see was that the two numbers were
automatically moved to another part of memory. The first number you
typed (9) is called the limit, because that number represents the limit
of how many times the loop is to be executed.

The second number (0) is called the index. This number increments by one
each time through the loop. So, the first time through the
\<code\>DO\</code\>\...\<code\>LOOP\</code\> construction in the above
example, the index number bumps up to a one; the next time to a two, and
so on. Each time the index is incremented (in \<code\>LOOP\</code\>), a
check is done to see if the index and limit numbers are equal. If so,
then the \<code\>DO\</code\>\...\<code\>LOOP\</code\> construction
\"knows\" that it\'s time to move on and will not \"loop back\" (to
\<code\>DO\</code\>) for another iteration.

What\'s interesting about this kind of indexing is that you can use the
index number as a counter while executing a loop. By setting the limit
and index numbers to integers you need to operate with inside a loop,
you can copy the index number to the parameter stack each time around
the loop and use that number for a calculation, a graphics plot point, a
multiplication factor, or whatever.

The Mops word that copies the index to the parameter stack is
\"\<code\>I\</code\>\":

  \<code\>I\</code\>   \<code\>( \-- n )\</code\>   Copies the current index value to the parameter stack.
  -------------------- ---------------------------- --------------------------------------------------------

Remember that this word only copies the index; it does not disturb the
index in any way. Here are a couple of examples to demonstrate.

Define a word, \<code\>FIVECOUNT\</code\>, that displays a series of
numbers from 101 to 105\<nowiki\>: \</nowiki\>

`<nowiki>`\
`: FIVECOUNT  106 101 DO  i .  LOOP  cr ;`\
`</nowiki>`

Notice that the limit is set to 106. Remember that the index is
incremented when execution reaches \<code\>LOOP\</code\>. The first time
through, the index was 101, and the \<code\>I\</code\> word copied the
index to the parameter stack; the \<code\>.\</code\> command then
displayed it on the screen. On the fifth execution, 105 was the index.
When execution reached \<code\>LOOP\</code\>, the index was incremented
to 106, at which point it the index is now equal to the index so
execution broke out of the loop.

You can similarly use the index number to perform operations on a number
passed on the parameter stack prior to execution. Consider the following
definition:

`<nowiki>`\
`: TIMESTABLES  { n -- }`\
`       13 1 DO  n i *  .  LOOP  cr ;`\
`</nowiki>`

If you then type \'\<code\>5 timestables\</code\>\', the program goes
through twelve loops of multiplying 5 times the incrementing index
number, one through twelve.

You have the flexibility in Mops to place all kinds of statements within
a \<code\>DO\</code\>\...\<code\>LOOP\</code\> construction, including
all those conditional decision constructs we covered earlier.

There will be times when you\'ll want to use a
\<code\>DO\</code\>\...\<code\>LOOP\</code\> for the sake of
compactness, but the increment you might wish to use is something other
than the one automatically performed by \<code\>LOOP\</code\> (which can
only increment by 1). For those occasions, you have the optional loop
ending, \<code\>+LOOP\</code\>. Whatever number you place in front of
the \<code\>+LOOP\</code\> ending will be the increment that the
\<code\>DO\</code\>\...\<code\>LOOP\</code\> uses to adjust the index.
You can even use a negative number if you wish the loop to decrement.

  ------------------------ ------------------------------------------------------ ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  \<code\>+LOOP\</code\>   class=\"STACK\" nowrap \| \<code\>( n \-- )\</code\>   Alternative word for \<code\>LOOP\</code\>. Increments the loop index by &lsquo;\<code\>n\</code\>&rsquo; and returns execution to the nearest \<code\>DO\</code\> if the index and the limit are equal.
  ------------------------ ------------------------------------------------------ ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Here\'s how you would use \<code\>+LOOP\</code\> to manage a countdown:

`<nowiki>`\
`: COUNTDOWN`\
`       1 10 DO  i . cr  -1 +LOOP`\
`       ." Ignition...Liftoff!" cr ;`\
`</nowiki>`

Notice that in this case, since the program loop is counting backwards,
the limit is 1 and the index is 10. Each time through the loop, the
index is decremented by -1. Also notice that the limit value 1 gets
typed by the program. When the index is counted down and becomes equal
to the limit, the loop continues and doesn\'t stop until the index is
counted down to the limit minus 1, unlike the situation when the index
is being incremented (where the loop stops when the index equals the
limit). The best way to think about this is as if there is a \"fence\"
in between the limit and one minus the limit. Whenever the index crosses
the fence, in either direction, the loop stops. This will be true even
if you write a program in which the increment value changes sign during
the running of the loop, i.e., goes from negative to positive.

Nested Loops {#nested_loops}
------------

It is also sometimes desirable to have more than one
\<code\>DO\</code\>\...\<code\>LOOP\</code\> going on simultaneously. As
with \<code\>IF\</code\>\...\<code\>THEN\</code\> constructions,
\<code\>DO\</code\>\...\<code\>LOOP\</code\> operations can be nested
inside one another. All you have to remember is to supply one
\<code\>LOOP\</code\> (or \<code\>+LOOP\</code\>) for each
\<code\>DO\</code\> within the colon definition.

`<nowiki>`\
`: NESTEDLOOP`\
`       1 10 DO`\
`               ." Loop: " i . cr`\
`                       4 0 DO`\
`                               ." Nested Loop: " i . cr`\
`                       LOOP`\
`       -1 +LOOP cr ;`\
`</nowiki>`

Type \<code\>NESTEDLOOP\</code\> and watch how the inner loop iterates
until completion for *each* iteration of the outer loop.

If you are in a nested loop and need access to the outer index, Mops has
a predefined word that allows you to copy that number to the parameter
stack, just like \<code\>I\</code\> copies the current loop index number
to the stack. That word is \<code\>J\</code\>.

  \<code\>J\</code\>   class=\"STACK\" nowrap \| \<code\>( \-- n )\</code\>   Copies to the parameter stack the index of the next outer loop from within a nested \<code\>DO\</code\>\...\<code\>LOOP\</code\> construct.
  -------------------- ------------------------------------------------------ ---------------------------------------------------------------------------------------------------------------------------------------------

In other words, \<code\>J\</code\> looks up the index of the loop just
outside the current \<code\>DO\</code\>\...\<code\>LOOP\</code\>
construction and copies that number to the parameter stack.

`<nowiki>`\
`: NESTEDLOOP2`\
`       1 10 DO`\
`               ." Loop " i . cr`\
`                       4 0 DO`\
`                               ." Loop " i .`\
`                               ." within Loop " j .`\
`                               cr`\
`                       LOOP`\
`       -1 +LOOP cr ;`\
`</nowiki>`

\<blockquote\>

Note: If you factor out an inner loop into another definition, you
can\'t use \<code\>J\</code\> &mdash; you won\'t get the right value.
\<code\>J\</code\> only works with nested loops within the current
definition.

`</blockquote>`

Abort Loop {#abort_loop}
----------

You may have a situation in which you need to bail out of a
\<code\>DO\</code\>\...\<code\>LOOP\</code\> before its normal
completion&\#148;perhaps because of some special case situation. The
word \<code\>LEAVE\</code\> is available for this purpose.

  ------------------------ -------------------------- -------------------------------------
  \<code\>LEAVE\</code\>   \<code\>( \-- )\</code\>   Exits the current loop immediately.
  ------------------------ -------------------------- -------------------------------------

Here\'s our countdown example again, appropriately modified:

`<nowiki>`\
`: COUNTDOWN2`\
`       1 10 DO`\
`               i . cr`\
`               i 7 = IF  ." Aborted!!" cr LEAVE  THEN`\
`       -1 +LOOP ;`\
`</nowiki>`

We had to remove the Ignition\...Liftoff! message, otherwise it would
have appeared after the countdown was aborted (which really isn\'t what
we wanted). We\'ll show a better way of handling this shortly.

Indefinite Loops {#indefinite_loops}
----------------

An indefinite loop is another kind of loop you\'ll use often in a Mops
program. As its name implies, an indefinite loop keeps going in circles
until a certain condition exists. It can go around one time, or many
thousands of times while waiting for that condition to occur. (And would
continue indefinitely if allowed to.) In Mops, that condition is the
presence of a flag on top of the stack.

  ------------------------ ------------------------------------------------------ -------------------------------------------------------------------------------------------------------------------------------------------------------------
  \<code\>BEGIN\</code\>   \<code\>( \-- )\</code\>                               Marks the beginning of an indefinite loop.
  \<code\>UNTIL\</code\>   class=\"STACK\" nowrap \| \<code\>( n \-- )\</code\>   Breaks out of an indefinite loop if &lsquo;\<code\>n\</code\>&rsquo; is non-zero (TRUE); otherwise returns execution to the nearest \<code\>BEGIN\</code\>.
  ------------------------ ------------------------------------------------------ -------------------------------------------------------------------------------------------------------------------------------------------------------------

Indefinite loops with \<code\>BEGIN\</code\>\...\<code\>UNTIL\</code\>
can be used like this:

`BEGIN  <var>xxx</var>  UNTIL`

Operation(s) \<var\>xxx\</var\> will be performed repeatedly (with no
end in sight) until a TRUE flag exists on the stack for
\<code\>UNTIL\</code\>.

A useful variation of this construct uses the word
\<code\>NUNTIL\</code\>\<nowiki\>:\</nowiki\>

  ------------------------- ------------------------------------------------------ -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  \<code\>NUNTIL\</code\>   class=\"STACK\" nowrap \| \<code\>( n \-- )\</code\>   Alternative word for \<code\>UNTIL\</code\>. Breaks out of an indefinite loop if &lsquo;\<code\>n\</code\>&rsquo; is zero (FALSE); otherwise returns execution to the nearest \<code\>BEGIN\</code\>.
  ------------------------- ------------------------------------------------------ -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

It used in the place of \<code\>UNTIL\</code\> in the previous example:

`BEGIN  <var>xxx</var>  NUNTIL`

As before, operation(s) \<var\>xxx\</var\> will be performed repeatedly,
but this time the loop won\'t stop until a FALSE flag exists on the
stack.

Here\'s an example of how you might use a
\<code\>BEGIN\</code\>\...\<code\>UNTIL\</code\> construction. In this
case, the indefinite loop will be waiting for you to enter a lower-case
letter \'a\' on the keyboard. The \<code\>KEY\</code\> operation pauses
the program until you press a key, and then it pushes onto the stack a
standard, equivalent code number (called an ASCII code&mdash;explained
later) for the character keyed in. If the number on the stack is 97
decimal (the ASCII code number for the lower-case \'a\'), then a 1 (TRUE
flag) is placed on the stack, and the loop ends. Otherwise, a FALSE flag
is placed on the stack, and execution returns to the beginning of the
loop.

`<nowiki>`\
`: BEGINTEST`\
`       BEGIN  key 97 =  UNTIL`\
`       ." Loop broken." cr ;`\
`</nowiki>`

Now, type \<code\>BEGINTEST\</code\>, and tap all kinds of letters on
the keyboard. Until you type a lower-case letter \'a\' the program keeps
going around in circles.

It turns out that \<code\>BEGIN\</code\> also marks the beginning of
another kind of infinite loop. These are the new words:

  ------------------------- ------------------------------------------------------ ---------------------------------------------------------------------------------------------------
  \<code\>REPEAT\</code\>   \<code\>( \-- )\</code\>                               Returns execution unconditionally to the nearest \<code\>BEGIN\</code\>.
  \<code\>WHILE\</code\>    class=\"STACK\" nowrap \| \<code\>( n \-- )\</code\>   Execution continues within a loop as long as &lsquo;\<code\>n\</code\>&rsquo; is non-zero (TRUE).
  ------------------------- ------------------------------------------------------ ---------------------------------------------------------------------------------------------------

With all three words taken together, it is called a
\<code\>BEGIN\</code\>\...\<code\>WHILE\</code\>\...\<code\>REPEAT\</code\>
loop, and naturally enough, it is used like this:

`BEGIN <var>xxx</var>  WHILE  <var>yyy</var>  REPEAT`

This statement will executes \<var\>xxx\</var\> each time through the
loop, and executes \<var\>yyy\</var\> only if a non-zero number (TRUE)
is on top of the stack when execution reaches the
\<code\>WHILE\</code\>. If the flag at \<code\>WHILE\</code\> is zero,
the loop is broken and \<var\>yyy\</var\> is not executed again.

There\'s also a variation on \<code\>WHILE\</code\> called
\<code\>NWHILE\</code\>, which only breaks execution if the flag on the
stack is zero (FALSE):

  ------------------------- ------------------------------------------------------ -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  \<code\>NWHILE\</code\>   class=\"STACK\" nowrap \| \<code\>( n \-- )\</code\>   Alternative word for \<code\>WHILE\</code\>. Execution continues within a \<code\>BEGIN\</code\>\...\<code\>REPEAT\</code\> loop as long as &lsquo;\<code\>n\</code\>&rsquo; is zero (FALSE).
  ------------------------- ------------------------------------------------------ -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Here is a variation on our \<code\>BEGINTEST\</code\> example to show
the new construct at work:

`<nowiki>`\
`: BEGINTEST2`\
`       ." Type a lower-case letter 'a', please." cr`\
`       BEGIN`\
`               key 97 =`\
`       NWHILE`\
`               ." Wrong key!" cr`\
`       REPEAT`\
`       ." Thank you. Loop broken." cr ;`\
`</nowiki>`

This example begins by printing a message prompting the user to type the
letter \'a\'. Unlike our first \<code\>BEGINTEST\</code\>, this version
provides feedback to the user when they push the wrong key. If they push
the right key, execution will not continue past \<code\>NWHILE\</code\>
and print the error message, because the \<code\>=\</code\> will leave a
TRUE on the stack (indicating that the ASCII code number of the key
pushed by the user was equal to 97), and execution will break out of the
loop entirely and proceed to print the final message at the end of the
definition.

EXIT
----

While not necessarily a loop construct, this is a good place to mention
another very useful operation, \<code\>EXIT\</code\>.

  ----------------------- -------------------------- -------------------------------------------------------
  \<code\>EXIT\</code\>   \<code\>( \-- )\</code\>   Terminates execution of the current word (or method).
  ----------------------- -------------------------- -------------------------------------------------------

Unlike \<code\>LEAVE\</code\>, \<code\>EXIT\</code\> exits the
*definition* entirely. Here\'s a modified version of the our first
\<code\>BEGINTEST\</code\> example that uses
\<code\>EXIT\</code\>\<nowiki\>:\</nowiki\>

`<nowiki>`\
`: BEGINTEST`\
`       BEGIN`\
`               key 97 = IF EXIT THEN`\
`               key 98 =`\
`       UNTIL ;`\
`</nowiki>`

This definion will keep running until you type either an \'a\' (ASCII
code number 97) or a \'b\' (ASCII code number 98). You can also write:

`<nowiki>`\
`: BEGINTEST`\
`       BEGIN`\
`               key 97 = IF EXIT THEN`\
`               key 98 = IF EXIT THEN`\
`       AGAIN ;`\
`</nowiki>`

Yes, we sneaked in yet another indefinite loop that uses
\<code\>BEGIN\</code\>.

  ------------------------ -------------------------- --------------------------------------------------------------------------
  \<code\>AGAIN\</code\>   \<code\>( \-- )\</code\>   Returns execution unconditionally to the nearest \<code\>BEGIN\</code\>.
  ------------------------ -------------------------- --------------------------------------------------------------------------

Of course, if you write a
\<code\>BEGIN\</code\>\...\<code\>AGAIN\</code\> loop, the loop must
have some other way of terminating, such as \<code\>EXIT\</code\>.

If you write \<code\>EXIT\</code\> within a
\<code\>DO\</code\>\...\<code\>LOOP\</code\>, you have to remember one
more thing&mdash;Mops (as with any kind of Forth) keeps some extra
information around to perform the
\<code\>DO\</code\>\...\<code\>LOOP\</code\>, and you have to remove
this information if you are going to end a
\<code\>DO\</code\>\...\<code\>LOOP\</code\> in some unusual way (that
is, not via \<code\>LOOP\</code\>, \<code\>+LOOP\</code\> or
\<code\>LEAVE\</code\>). The word to use is \<code\>UNLOOP\</code\>.

  ------------------------- ---------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------
  \<code\>UNLOOP\</code\>   class=\"STACK\" nowrap \| \<code\>( \-- )\</code\>   This word will safely remove all loop information from the return stack when exiting from a \<code\>DO\</code\>\...\<code\>LOOP\</code\>.
  ------------------------- ---------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------

We\'ll illustrate this with the countdown example again:

`<nowiki>`\
`: COUNTDOWN3`\
`       1 10 DO`\
`               i . cr`\
`               i 7 = IF  ." Aborted!!" cr UNLOOP EXIT  THEN`\
`       -1 +LOOP`\
`       ." Ignition...Liftoff!" cr ;`\
`</nowiki>`

You\'ll notice that we\'ve been able to reinstate the
Ignition\...Liftoff! message, but by aborting the loop via
\<code\>UNLOOP\</code\> and \<code\>EXIT\</code\> we bypass them
entirely.

\<blockquote\>

Warning: When you\'re designing loops, it is sometimes possible for an
infinite loop to slip in accidentally. Try to avoid them! Double-check
the stack operations of your indefinite loops to make sure that there is
always at least one condition that will allow you or your program to
terminate the loop. Otherwise, your program will appear to \"lock up\"
and may be unresponsive to your keyboard input. If this happens, you\'ll
have to force quit the Mops application.

`</blockquote>`

------------------------------------------------------------------------

  ------------------------------------------- --------------------------------- -----------------------------------
  [Lesson 12](Lesson_12 "wikilink")           [Tutorial](Tutorial "wikilink")   [Lesson 14](Lesson_14 "wikilink")
  [Documentation](Documentation "wikilink")                                     
  ------------------------------------------- --------------------------------- -----------------------------------

[Category:Manual](Category:Manual "wikilink")
[Category:Tutorial](Category:Tutorial "wikilink")
