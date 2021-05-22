Assembler and Disassembler {#assembler_and_disassembler}
==========================

The Mops\' PowerPC assembler and disassembler were originally written by
Xan Gregg for Power [MacForth](http://www.macforth.com/). They\'ve been
adapted for use in the Mops environment as modules. The source files are
\"\<code\>pasmMod.txt\</code\>\" and \"\<code\>disasm\</code\>\". The
syntax is traditional Forth postfix-style.

Assembler colon definitions {#assembler_colon_definitions}
---------------------------

You write a code definition thus:

`<nowiki>`\
`:ppc_code  someName`\
`       </nowiki><var>&lt;ppc instructions&gt;</var><nowiki>`\
`;ppc_code`\
`</nowiki>`

This will create a normal header for \<code\>someName\</code\> in the
dictionary, then align the CDP to a 4-byte boundary (as required for
PowerPC code), and compile the code. Note that if you tick
\<code\>someName\</code\>, the resulting xt on the stack will be the
address of the first instruction, **minus 2**. The extra 2 bytes are
used internally (by Mops) as flags. Remember to add 2 if you need the
actual address of the first instruction. If, however, you use
\<code\>EXECUTE\</code\>, you pass the xt in the normal way.

We don\'t provide a full rundown of the assembly syntax here; however
the comments in the source files are fairly extensive. So if you\'re the
type of person who might want to write assembly language, you\'ll
probably be able to figure out what to do! &\#148;especially as the file
\"\<code\>test pasm\</code\>\" in the \'Module Source\' folder has a
definition containing all the PowerPC instructions supported by the
assembler. Remember that it\'s a Forth-style postfix assembler. We also
give a short example at the end of this section, and there are a number
of code definitions in the source files in \'PPC source\', especially
the file \"\<code\>setup\</code\>\".

We don\'t provide any way of writing a method with the assembler. This
should never be necessary for performance, and if you really need access
to machine-level features, you can write a
\<code\>\<nowiki\>:ppc\_code\</nowiki\>\</code\> word and call it from
your method.

Accessing the dictionary {#accessing_the_dictionary}
------------------------

If you need to get the address of an item in the code or data area of
the dictionary, you can do it with this syntax:

`r0     ' <var>someWord</var>   <var>dicaddr,</var>`

This generates an \<code\>addi\</code\> instruction, using the
appropriate base register and offset to place the address of the
location you want into a register. We used \<code\>r0\</code\> in this
example, but you could have used any free register. For a location in
the data area, remember that ticking the name of the item won\'t get you
there&\#148;you have to do something like this:

`r0     ' <var>myValue</var> &gt;body  <var>dicaddr,</var>`

You can execute any code you like between naming the register and
putting \<code\>dicaddr,\</code\>. You are in execution mode, and can
execute any Mops words, so long as you leave just one item on the stack.
One proviso is that at the moment, the target address must be within 32k
bytes distance from where the base register points, as otherwise the
address can\'t be generated with a single \<code\>addi\</code\>
instruction. If the assembler gives you an out-of-range error on a line
with \<code\>dicaddr,\</code\> this is probably the reason.

Executing colon definitions from code {#executing_colon_definitions_from_code}
-------------------------------------

In a word, don\'t. Mops colon definitions will expect various numbers of
their parameters in registers when they\'re called, and the algorithm
for working this out is quite complex (and might even change!). So you
should really only use code definitions for words that don\'t call any
other words.

Executing other code definitions from code {#executing_other_code_definitions_from_code}
------------------------------------------

There\'s no problem with doing this, since you have full control of the
registers. Remembering that the first instruction of a code definition
starts two bytes after where the xt points, you call another code
definition this way:

`' <var>someWord</var> 2+       bl,`

The Assembler automatically converts the absolute address of the first
instruction of \<code\>someWord\</code\>, which we generate with
\'\<code\>someWord 2+\</code\>\', to the offset that is required by the
\<code\>bl\</code\> instruction.

Assembler source {#assembler_source}
----------------

The assembler-related source files are all in the \'Module source\'
folder. They are:

  ------------------- ---------------------------------------------------------------
  pasmMod.txt         the assembler
  disasm              the disassembler (loaded by \"\<code\>pasmMod.txt\</code\>\")
  test pasm           a big test definition with all the PPC instructions
  vectors pasm test   another big test definition with all the AltiVec instructions
  ------------------- ---------------------------------------------------------------

On entry to a code definition, the top-of-stack item is in register
\<code\>r4\</code\>, the second item is in \<code\>r3\</code\>, and the
next stack item is in memory, pointed to by the data stack pointer,
\<code\>r18\</code\>. You can do whatever you like with the stack
(within reason), but on exit from your definition you must observe this
same convention.

Within the definition, you can use registers
\<code\>r5\</code\>-\<code\>12\</code\> freely for whatever you like
without having to save or restore them. You can also use
\<code\>r23\</code\>-\<code\>31\</code\>, but as Mops uses these for
locals, they might contain values in use by the calling code. So you
will need to save and restore any of these that you use.

The same applies to the floating point stack. On entry to a code
definition, the top-of-stack item is in register \<code\>fr2\</code\>,
the second item is in \<code\>fr1\</code\>, and the next stack item is
in memory, pointed to by the FP stack pointer, \<code\>r19\</code\>. You
can use \<code\>fr0\</code\> and
\<code\>fr3\</code\>-\<code\>13\</code\> without saving or restoring
them. \<code\>fr14\</code\>-\<code\>31\</code\> are used for FP locals,
so you can use them if you save and restore them.

PowerPC register usage {#powerpc_register_usage}
----------------------

Here\'s a summary of the register usage in the PowerMops runtime
environment:

  ----------------------- -------------------------------------------------------------- ---------
                          \<code\>r0\</code\>                                            scratch
  \<code\>r1\</code\>     system stack pointer (leave it alone, normally)                
  \<code\>r2\</code\>     RTOC (Table Of Contents pointer \-- leave alone)               
  \<code\>r3\</code\>     initially, second stack cell                                   
  \<code\>r4\</code\>     initially, top stack cell                                      
  \<code\>r5\</code\>     scratch                                                        
  \<code\>r6\</code\>     scratch                                                        
  \<code\>r7\</code\>     scratch                                                        
  \<code\>r8\</code\>     scratch                                                        
  \<code\>r9\</code\>     scratch                                                        
  \<code\>r10\</code\>    scratch                                                        
  \<code\>r11\</code\>    scratch, also used in system calls                             
  \<code\>r12\</code\>    ditto                                                          
  \<code\>r13\</code\>    base address of main dic code area                             
  \<code\>r14\</code\>    base address of main dic data area                             
  \<code\>r15\</code\>    base address of current module\'s code area                    
  \<code\>r16\</code\>    base address of current module\'s data area                    
  \<code\>r17\</code\>    return stack pointer (points to top cell)                      
  \<code\>r18\</code\>    data stack pointer (points to top memory cell)                 
  \<code\>r19\</code\>    floating point stack pointer (points to top memory cell)       
  \<code\>r20\</code\>    base address of current object                                 
  \<code\>r21\</code\>    loop counter I                                                 
  \<code\>r22\</code\>    limit value for \<code\>DO\</code\>\...\<code\>LOOP\</code\>   
  \<code\>r23\</code\>    can use if you save and restore                                
  \<code\>r24\</code\>    ditto                                                          
  \<code\>r25\</code\>    ditto                                                          
  \<code\>r26\</code\>    ditto                                                          
  \<code\>r27\</code\>    ditto                                                          
  \<code\>r28\</code\>    ditto                                                          
  \<code\>r29\</code\>    ditto                                                          
  \<code\>r30\</code\>    ditto                                                          
  \<code\>r31\</code\>    ditto                                                          
  &nbsp;                                                                                 
  \<code\>fr0\</code\>    scratch                                                        
  \<code\>fr1\</code\>    initially, second stack cell                                   
  \<code\>fr2\</code\>    initially, top stack cell                                      
  \<code\>fr3\</code\>    scratch                                                        
  \<code\>fr4\</code\>    scratch                                                        
  \<code\>fr5\</code\>    scratch                                                        
  \<code\>fr6\</code\>    scratch                                                        
  \<code\>fr7\</code\>    scratch                                                        
  \<code\>fr8\</code\>    scratch                                                        
  \<code\>fr9\</code\>    scratch                                                        
  \<code\>fr10\</code\>   scratch                                                        
  \<code\>fr11\</code\>   scratch                                                        
  \<code\>fr12\</code\>   scratch                                                        
  \<code\>fr13\</code\>   scratch                                                        
  \<code\>fr14\</code\>   can use if you save and restore                                
  \<code\>fr15\</code\>   ditto                                                          
  \<code\>fr16\</code\>   ditto                                                          
  \<code\>fr17\</code\>   ditto                                                          
  \<code\>fr18\</code\>   ditto                                                          
  \<code\>fr19\</code\>   ditto                                                          
  \<code\>fr20\</code\>   ditto                                                          
  \<code\>fr21\</code\>   ditto                                                          
  \<code\>fr22\</code\>   ditto                                                          
  \<code\>fr23\</code\>   ditto                                                          
  \<code\>fr24\</code\>   ditto                                                          
  \<code\>fr25\</code\>   ditto                                                          
  \<code\>fr26\</code\>   ditto                                                          
  \<code\>fr27\</code\>   ditto                                                          
  \<code\>fr28\</code\>   ditto                                                          
  \<code\>fr29\</code\>   ditto                                                          
  \<code\>fr30\</code\>   ditto                                                          
  \<code\>fr31\</code\>   ditto                                                          
  ----------------------- -------------------------------------------------------------- ---------

Example
-------

Finally, here\'s a short example, from the file
\"\<code\>pnuc1\</code\>\" (in \'PPC source\'). This is the definition
of \<code\>PICK\</code\>.

`<nowiki>`\
`:ppc_code PICK`\
`       r4      0               cmpi,       \is it 0 pick?`\
`  eq if,`\
`       r4      r3 r3           or,         \yes - copy TOS`\
`  else,`\
`       r5      r4 2 0 29       rlwinm,     \no- mult index by 4 by left shift`\
`       r5      r5 -4           addi,       \and subtract 4 to get SP offset`\
`       r4      r18 r5          lwzx,       \grab the cell`\
`  then,`\
`                               blr,        \and return.`\
`;ppc_code`\
`</nowiki>`

Note that \<code\>PICK\</code\> doesn\'t push or pop from the data
stack, but simply replaces the top cell (in \<code\>r4\</code\>) with
the stack cell that it fetches. Also, since it doesn\'t call any other
routine, there\'s no need to save and restore the return address which
is in the link register on entry. If we had needed to save and restore
the link register, we would have put the instructions

`       r0                      mflr,      \save lr on return stack`\
`       r0      -4  rRP         stwu,`

at the beginning, and

`       r0                      mtlr,      \restore lr`

at the end before the \<code\>blr,\</code\>.

Note also that we need to special-case the \'\<code\>0 pick\</code\>\'
case, since the desired cell isn\'t in the memory part of the stack, but
is already in \<code\>r3\</code\>.

For an example of a much longer code definition, have a look at
\<code\>(EX)\</code\> in the file \"\<code\>setup\</code\>\" (in \'PPC
source\').

\<blockquote\>

Warning: If you are already familiar with the old 68k Mops Assembler,
note that you *must* write instructions at the end of your code routine
so that it will return. The PowerPC Assembler doesn\'t do this for you,
since it can\'t always know where your return address is. (It might not
necessarily be in the link register at that point&\#148;you might have
put it in the count register or have saved it on the return stack or
somewhere else.)

`</blockquote>`

Disassembler
------------

The disassembler will disassemble PowerPC code from a range of addresses
you specify, dumping its output to the Mops window.

You call the disassembler with one of the following words:

  ------------------------------- ---------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------
  \<code\>disasm\_word\</code\>   \<code\>someWord\</code\>                                        Disassembles the word \<code\>someWord\</code\>.
  \<code\>disasm\_xt\</code\>     \<code\>( xt \-- )\</code\>                                      Disassembles the word with the given xt.
  \<code\>disasm\_rng\</code\>    \<code\>( from to \-- )\</code\>                                 Disassembles within the given address range.
  \<code\>disasm\_cnt\</code\>    class=\"STACK\" nowrap \| \<code\>( from \#inst \-- )\</code\>   Starts at &lsquo;from&rsquo;, disassembles the given number of instructions.
  \<code\>disasm\</code\>         \<code\>( from \-- )\</code\>                                    Starts at &lsquo;from&rsquo;, keeps going till you hit a key or until a \<code\>blr\</code\> instruction is seen (which normally comes at the end of a definition).
  ------------------------------- ---------------------------------------------------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------

------------------------------------------------------------------------

  ------------------------------------------- ----------------------------------- --------
  [Reference 14](Reference_14 "wikilink")     [Reference](Reference "wikilink")   &nbsp;
  [Documentation](Documentation "wikilink")                                       
  ------------------------------------------- ----------------------------------- --------

[Category:Manual](Category:Manual "wikilink")
[Category:Reference](Category:Reference "wikilink")
