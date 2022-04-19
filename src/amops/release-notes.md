---
title: Release Notes
layout: layouts/default.njk
eleventyNavigation:
  key: Release Notes
  parent: aMops
  order: 250
author: mike
---

**3.2 Release**

This is the next version (3.2) of the Arm code generator.  Unlike the previous release, which had many new features, this one has only one - late binding.
This is actually a very straightforward addition.  See the code LATE_BIND in Selectors, and also LB_DISPATCH near the end of Classes.  When the syntax

`method: []`

or

`method: **`

is encountered, LATE_BIND is called at compile time, which compiles the hash value for method: as a literal, then compiles a call to LB_DISPATCH.  At run time, this simply calls SEARCH_IN_CLASS to find the method with the given hash, then dispatches to the glue for that method (thus looking after any arbitrary stack effects).  An error occurs (exception 2) if the method isn’t found.  This of course is a run time error.

For my simple test code in the file late_bind, it takes about 150 instructions to execute `put: **` where the matching method is in a superclass, not the given class of the target object.  Obviously the execution time will depend critically on the time for a method search, and this may have to pass through several superclasses.  This would be the case for any OO language supporting late binding.  Once we have a late binding cache, this performance will be considerably improved.  The next version may implement this, however it isn’t a high priority just now.

___

As in the last few versions, the target-compiled version of the code generator can begin to run under the emulator.  The word “test” is executed (the last word loaded).  This calls setup_CG, which creates the big object_array “theNodes” in the heap, then initializes it by calling `__init_nodes`, exactly as in the non-target version.

Next a little test definition is passed to Arm-interpret.  This is simply

`: test 1 2 3 ;`

This is now processed and the correct code is compiled, into a new bytestring INSTRUCTIONS (redefining the old one - see ArmBase).  At the end of the source line, the word REFILL (in PrimitivesB) is executed to get another line, but at this point the test run ends with a success message.  Of course in the “proper” version running on real hardward, REFILL will be properly implemented.

As with the previous versions, the target compilation is done with the load file `arm1.ld`.  See below for the details.


___

As before, the regression tests run over 60 tests and exercise all the features, prior to target compiling the code generator itself.
The emulator is integrated with the disassembler (see the files dem1, dem2 and dem3).  It’s not a full emulator of course, which would be a huge job, but just aims to emulate the instructions the code generator generates.  This should give us a lot of confidence that the compiled code is correct, since the disassembler/emulator is completely independent of the code generator.

***How to run it***

You have already downloaded the project.  There will be one folder, aMops.
Put this folder into iMops/source.
Then in iMops:

```bash
“ aMops” add-project		\ Adds the project to the project paths.  Case doesn’t matter.
// arm.ld				\ loads the Arm compiler.
// armtest0				\ or whichever test you’re running, currently up to armtest46.
```

	You can set the value stop_after_pass1? true, and compilation will stop after pass1.
After loading, you can do:

|     |     |
|-----|-----|
|`n`		|\ prints the nodes. |
|`d`    |\ disassembles everything, so you can see what the code looks like.
|`m`	  |	\ “eMulate”.  Does a disassembly, then runs the Arm emulator, starting from the last definition compiled.  You get an output of one line per operation, which has the hex of the instruction, then the disassembly of that instruction, then the condition flags and the result register if there is a change.<br>  Any results left on the Arm data stack are transferred to the iMops stack at the end.  (Warning - don’t use m for the Ackermann test.  It executes almost 100,000 instructions.  Use m-.)
|`m-`	 |	\ Similar to m but with much less output.  This word is used in the regression tests.|

To run the full regression tests, instead of `// arm.ld`, do:

`// regression`	

This loads the compiler and then runs 50 or so regression tests.  These should run to completion and print a congratulatory message.

***Target-compiling the code generator***

To do this, use:

`// arm1.ld`

Most of the loaded files are the same as those already loaded under iMops, however we have a few named prolog1, defns1 etc.  These are slightly modified versions of prolog, dic etc, to remove a few lines which won’t target compile since they call iMops words, but which aren’t needed anyway.  In some of the files we use conditional compilation - however these duplicate files are those where the conditional compilation became unwieldy so it was simpler to just duplicate the file and make the necessary changes.

You can begin to run the target-compiled code generator, by using the “m” command as given above.  This begins to run the final definition loaded, “test”, which is in the file CG-setup.  This definition calls “setup_CG” (sorry, the names are a bit confusing), which creates a block in the heap for TIB, PAD, WORD_BUF and INPUT_BUF.  Then it calls __INIT_NODES which is in the target compilation is in the same file.  This calls __new on the big object_array “theNodes”.  This word calls ALLOCATE_REF which does the main work of creating an object on the heap.  It first calls (MAKE_OBJECT) to applly the alignment algorithm to all the ivars and array elements, and work out the total object size.  Then it allocates the memory on the heap with a malloc call.  Then it calls SETUP_OBJECT to put in all the object headers and indexed headers in the new object_array.
 SETUP_OBJECT is a big recursive definition.  Currently a MARKER97 is used to turn tracking off, otherwise it would be too long.  

Then after setup_CG, our little test definition `: test 1 2 3 ;` is placed in input_buf, and we call `Arm_interpret` to compile it.  The line is successfully compiled and the correct compiled code is placed into a new bytestring INSTRUCTIONS (redefining the old one - see ArmBase).  At the end of the source line, the word `REFILL` (in PrimitivesB) is executed to get another line, but at this point the test run ends with a success message.  Of course in the “proper” version running on real hardware, `REFILL` will be properly implemented.

**3.1 Release**

This is the next version (3.1) of the Arm code generator.  With this version, the code generator is essentially complete.  From here on, once we have real hardware to run on, it will be more a matter of fixing bugs.  (Bugs?  What bugs??)

This version can load itself, then under emulation compile a little test definition successfully.

Quite a number of bugs were uncovered and fixed.

* I had very cleverly omitted to code for the case of a CYCLE within a `FOR...LOOP`.  Some very strange code resulted, but this was easy to fix.
* There was a bug in the alignment algorithm which affected the NodeID_stack class.
* The class: method in class Object was wrongly grabbing a parameter off the stack, and this affected all the words calling this method.
* When code calls a word with the `__unknown_regs?` flag set (e.g. FORWARD definitions), a flag `__calls_unknown_regs?` is set to that we know that THIS word may cause any registerto be used.  This flag obviously needs to be propagated to any words which call this word, but this wasn't being done.
* There was a subtle bug affecting `CASE[` and `SELECT[` constructs.  Live ranges coming into the construct should be propagated into each stub (so that the registers assigned to those live ranges aren't clobbered by code in the stub).  This was done, but the ranges weren't always marked required, and this could have caused the registers to be clobbered.  My fix for this (in Liveness) is a bit clumsy, but it seems to work.  (My comment there uses the words "appalling hack" ?)
* When compiling a definition which calls another, I had been neglecting to add the list of registers changed in the called definition, to the list for this definition.  This of course meant that 
this list wasn't complete, and the problem was worse for complex definition calling many others.  So the register allocation could wrongly assign a register which was going to be changed when a call is made, and the regression tests hadn't picked this up because at present they don't include deeply nested calls.  This is now fixed, and I have also taken the opportunity to change the "registers changed" list back to a bitmap which is more efficient.  It had been a bitmap many years ago but had become a list with MAX 1 which had two sets of 256 registers.
* I wasn't handling the shifted immediate option in add and subtract properly (where an immediate value can be optionally shifted left 12 bits, allowing values such as `$ 1230000` to be encoded as immediates).  I was detecting this possibility but not implementing it completely, so the shift wasn't happening, and the resulting immediate value was wrong.
* Fixing that bug unmasked another one, since some code in handling common subexpressions was wrongly being skipped.  The unmasked bug was a faulty implementation of the `CLASS_AS>` syntax.  This is now hopefully fixed.
* In the file Operands, I found that the definition `GET_ON_ENTRY` was not correct.  The general idea was that if we found, while processing a definition in pass1, that we needed an operand or operands deeper than what we were keeping track of, we could add it to the list of entry nodes for the definition and pretend it had been there all the time.  This was fine for the initial basic block in a definition, including very simple definitions with one BB.  However in subsequent BBs, it was a very bad idea.  In these BBs, the new operands may not always be needed, or may be needed multiple times if the BB is in a loop.  It would certainly be wrong to only grab them once.  This problem was probably in PowerMops but just hadn't shown up, for some reason.  This definition is now correct, hopefully, and is a lot simpler.  If the new operands are needed in the first BB in the definition, we do what we were doing before, and add new input nodes.  If it's in a subsequent BB, or if the defn is unknown_regs, we pull the new operands from the memory part of the stack, at the point where they are needed.  The new name of this definition is `EXTRA_OPERANDS`.

I have also added a new optimization, which is related to the last bug fix above.  The way inlining works, means that it needs to be blocked if `EXTRA_OPERANDS` is called, that is when a definition takes anonymous operands from the stack (NOT named parms).  `EXTRA_OPERANDS` needs to know if it's in the first BB of a definition or not, so in general this code can't be dropped anywhere into the middle of another definition.  This could perhaps be coded around, but would be very difficult to get right.

However, we can in fact handle some of the most frequent occurrences of this situation, in a different way which I call "Plan B inlining".  Take for example in class `Byte`, where we have

```bash
:m TO:    ^base  c!  ;m
```

the value being stored is an anonymous stack operand, so this method wouldn't be inlined in the normal way.  However it is valid, at Codegen time, to simply copy the compiled code for the definition into the call location, omitting the final `RET` (return).  The registers are all correct.  At runtime the result is identical to calling the out-of-line code, but without the call and return.

This "Plan B" is done whenever the definition is a leaf, is short (currently less than 10 instructions) and doesn't contain an `EXIT`.  It's done regardless of the inline_on or inline_off directives.  It's not as elegant as the regular inlining, but picks up a number of common cases which can't be done the regular way, as in the example above.  It's simple and appears to work well.

As in the last couple of versions, the target-compiled version of the code generator can begin to run under the emulator.  The word `test` is executed (the last word loaded).  This calls `setup_CG`, which creates the big object_array `theNodes` in the heap, then initializes it by calling `__init_nodes`, exactly as in the non-target version.

Next a little test definition is passed to Arm-interpret.  This is simply

```bash
: test 1 2 3 ;
```

This is now processed and the correct code is compiled, into a new bytestring `INSTRUCTIONS` (redefining the old one - see ArmBase).  At the end of the source line, the word `REFILL` (in PrimitivesB) is executed to get another line, but at this point the test run ends with a success message.  Of course in the "proper" version running on real hardward, `REFILL` will be properly implemented.

As with the previous versions, the target compilation is done with the load file arm1.ld.  See below for the details.

---

As before, the regression tests run over 60 tests and exercise all the features, prior to target compiling the code generator itself.

The emulator is integrated with the disassembler (see the files dem1, dem2 and dem3).  It's not a full emulator of course, which would be a huge job, but just aims to emulate the instructions the code generator generates.  This should give us a lot of confidence that the compiled code is correct, since the disassembler/emulator is completely independent of the code generator.

***How to run it***

You have already downloaded the project.  There will be one folder, aMops.

Put this folder into iMops/source.

Then in iMops:

|     |     |
| --- | --- |
|"&nbsp;aMops"&nbsp;add&#x2011;project | \ Adds the project to the project paths.  Case doesn't matter.
| // arm.ld           | \ loads the Arm compiler.
| // armtest0         | \ or whichever test you're running, currently up to armtest46.

You can set the value `stop_after_pass1?` true, and compilation will stop after pass1.

After loading, you can do:

|     |     |
| --- | --- |
| n   | \ prints the nodes.
| d   |\ disassembles everything, so you can see what the code looks like.
| m   |\ "eMulate".  Does a disassembly, then runs the Arm emulator, starting from the last definition compiled.  You get an output of one line per operation, which has the hex of the instruction, then the disassembly of that instruction, then the condition flags and the result register if there is a change.<br> Any results left on the Arm data stack are transferred to the iMops stack at the end.  (Warnin - don't use m for the Ackermann test.  It executes almost 100,000 instructions.  Use m-.)
| m-   |\ Similar to m but with much less output.  This word is used in the regression tests.

To run the full regression tests, instead of // arm.ld, do:

```bash
// regression\tab\tab 
```

This loads the compiler and then runs 50 or so regression tests.  These should run to completion and print a congratulatory message.

***Target-compiling the code generator***

To do this, use:

```bash
// arm1.ld
```

Most of the loaded files are the same as those already loaded under iMops, however we have a few named prolog1, defns1 etc.  These are slightly modified versions of prolog, dic etc, to remove a few lines which won't target compile since they call iMops words, but which aren't needed anyway.  In some of the files we use conditional compilation - however these duplicate files are those where the conditional compilation became unwieldy so it was simpler to just duplicate the file and make the necessary changes.

You can begin to run the target-compiled code generator, by using the `m` command as given above.  This begins to run the final definition loaded, "test", which is in the file CG-setup.  This definition calls "setup_CG" (sorry, the names are a bit confusing), which creates a block in the heap for TIB, PAD, WORD_BUF and INPUT_BUF.  Then it calls __INIT_NODES which is in the target compilation is in the same file.  This calls __new on the big object_array "theNodes".  This word calls ALLOCATE_REF which does the main work of creating an object on the heap.  It first calls (MAKE_OBJECT) to applly the alignment algorithm to all the ivars and array elements, and work out the total object size.  Then it allocates the memory on the heap with a malloc call.  Then it calls SETUP_OBJECT to put in all the object headers and indexed headers in the new object_array.

 SETUP_OBJECT is a big recursive definition.  Currently a MARKER97 is used to turn tracking off, otherwise it would be too long.  

Then after setup_CG, our little test definition ` : test 1 2 3 ; ` is placed in input_buf, and we call Arm_interpret to compile it.  The line is successfully compiled and the correct compiled code is placed into a new bytestring INSTRUCTIONS (redefining the old one - see ArmBase).  At the end of the source line, the word REFILL (in PrimitivesB) is executed to get another line, but at this point the test run ends with a success message.  Of course in the "proper" version running on real hardward, REFILL will be properly implemented.

**3.0 release:**

This is the next version (3.0) of the Arm code generator. It continues on from the 2.6 release, and has a number of important improvements.

* The global area was previously a bytestring, and could therefore move in memory. This mustn't happen at run time, since compiled code can add new global items and keep absolute addresses into the global area. So now at CROSS time, when we start target compilation, we allocate a big pointer-based block and never add to it. See the declaration of GLOBAL_SPACE near the start of Prolog.

* As I mentioned in the last release, DICTIONARY is declared as a bytestring early on, and redefined after CROSS when we're target compiling. At CROSS time, we move the ivar space over from the old version to the new version so we can continue adding to it seamlessly. This seems to work OK.

* As we did last time, thetarget-compiled version of the code generator can begin to run under the emulator. The word "test" is executed (the last word loaded). This calls setup_CG, which creates the big object_array "theNodes" in the heap, then initializes it by calling __init_nodes, exactly as in the non-target version.

Next a little test definition is passed to Arm-interpret. This is simply

`: test 1 2 3 ;`

This is now processed up to the semicolon, and the new nodes are correctly created in the theNodes object_array. You can print these out at the end with "printnodes".

* OBJECT_ARRAY no longer has a classinit: method, since it's not necessary. These objects require a set_cursor: call, and that's a convenient place to do any other initialization. This is just a bit neater.

* In doing all this, a few low-level bugs showed up and needed fixing. In one nasty case a set: call on a BOOL was actually clearing it, because just in that particular context the register allocation thought the -1 operand was no longer in use and deleted it.

There also appeared to be a bug in the INSERT: method of Bytestring, which could corrupt memory. INSERT: was called by ADD:, which is called by the common methods +Z: +L: +W: etc which are used in many places in the code generator. I have rewritten ADD: in a simpler way to call realloc and then move the new bytes into the end of the extended string. This appears to fix the problem. I'll fix INSERT: in the next version. The code generator doesn't now use it.

As with the previous version, the target compilation is done with the load file arm1.ld. See below for the details.

---

As before, the regression tests run over 60 tests and exercise all the features, prior to target compiling the code generator itself.

The emulator is integrated with the disassembler (see the files dem1, dem2 and dem3). It's not a full emulator of course, which would be a huge job, but just aims to emulate the instructions the code generator generates. This should give us a lot of confidence that the compiled code is correct, since the disassembler/emulator is completely independent of the code generator.

**How to run it**

You have already downloaded the project. There will be one folder, aMops.

Put this folder into iMops/source.

Then in iMops:

```
" aMops" add-project   Adds the project to the project paths. Case doesn't matter.

// arm.ld     loads the Arm compiler.

// armtest0     or whichever test you're running, currently up to armtest46.
```
You can set the value stop_after_pass1? true, and compilation will stop after pass1.

After loading, you can do:

`n`    prints the nodes.

`d`    disassembles everything, so you can see what the code looks like.

`m`    "eMulate". Does a disassembly, then runs the Arm emulator, starting from the last definition compiled. You get an output of one line per operation, which has the hex of the instruction, then the disassembly of that instruction, then the condition flags and the result register if there is a change.

Any results left on the Arm data stack are transferred to the iMops stack at the end. (Warning - don't use `m` for the Ackermann test. It executes almost 100,000 instructions. Use `m-`.)

`m-`    Similar to m but with much less output. This word is used in the regression tests.

To run the full regression tests, instead of `// arm.ld`, do:

`// regression  `

This loads the compiler and then runs 50 or so regression tests. These should run to completion and print a congratulatory message.

**Target-compiling the code generator**

To do this, use:

`// arm1.ld`

Most of the loaded files are the same as those already loaded under iMops, however we have a few named prolog1, defns1 etc. These are slightly modified versions of prolog, dic etc, to remove a few lines which won't target compile since they call iMops words, but which aren't needed anyway. In some of the files we use conditional compilation - however these duplicate files are those where the conditional compilation became unwieldy so it was simpler to just duplicate the file and make the necessary changes.

You can begin to run the target-compiled code generator, by using the `m` command as given above. This begins to run the final definition loaded, `test`, which is in the file CG-setup. This definition calls "setup_CG" (sorry, the names are a bit confusing), which creates a block in the heap for `TIB`, `PAD`, `WORD_BUF`, and `INPUT_BUF`. Then it calls `__INIT_NODES` which is in the target compilation is in the same file. This calls `__new` on the big object_array `theNodes`. This word calls `ALLOCATE_REF` which does the main work of creating an object on the heap. It first calls `(MAKE_OBJECT)` to apply the alignment algorithm to all the ivars and array elements, and work out the total object size. Then it allocates the memory on the heap with a malloc call. Then it calls `SETUP_OBJECT` to put in all the object headers and indexed headers in the new object_array.

 `SETUP_OBJECT` is a big recursive definition. Currently a `MARKER97` is used to turn tracking off, otherwise it would be too long. 

Then after `setup_CG`, our little test definition ` : test 1 2 3 ; ` is placed in input_buf, and we call Arm_interpret to compile it. This successfully runs up to the semicolon, where in a word it calls it runs into a zero address error, which is caught by the emulator. However by then all the nodes for the definition are created in theNodes. You can print out the nodes with the command "printnodes".

I will need to continue tracking through the execution of (;) and related words, and then on into the subsequent passes.

***2.6 release:***

This is the next version (2.6) of the Arm code generator. It continues on from the 2.5 release:

* It can now completely load itself.

* This target-compiled version of the code generator can begin to run under the emulator. The word `test` is executed (the last word loaded). This calls setup_CG, which creates the big object_array "theNodes" in the heap, then initializes it by calling __init_nodes, exactly as in the non-target version.

Next a little test definition is passed to Arm-interpret. This is simply

`: test 1 2 3 ;`

This gets as far as the `: test`, where it needs to create a new dictionary entry for the definition, then emulation ends with a MARKER99. See more details below.

This is real progress, and is probably quite near the end of the road for my work on the code generator. I'm really pleased to have got this far. I won't have time to do much further work until the new year, but I think with what we have there's a good foundation for aMops once we have the new hardware.

***2.5 release:***

This is the next version (2.5) of the Arm code generator. It represents another significant step forward from the previous version:

* It can now completely load itself.

* This target-compiled version of the code generator can begin to run under the emulator, up to the point where the big object_array "theNodes" is created in the heap.

* To assist debugging the running code generator, there is a new "marker" mechanism. You can put "MARKER1" up to "MARKER6" anywhere in your program, and when running under the emulator and generating a trace, these markers display prominently and are easy to see. This is very helpful in spotting locations in a big output trace (such as I get when starting to run the target-compiled code generator!) These markers generate pseudo-instructions similar to the EXTERN mechanism, but are otherwise ignored by the compilation process, so they don't interfere with register allocation etc. The special marker "MARKER99" causes the emulation to stop when it's encountered.

* The mechanism we introduced in version 2.4 to handle a bigger global space wasn't working reliably. Also since the code generator itself uses a bit over $ 4000 bytes of global space, I decided a simpler idea was to use a second global pointer, set $ 4000 bytes higher than the first. That way compiled programs start with a reasonable amount of global space they can address without further machinations.

* Of course, a few new bugs showed up and have been fixed. I had MAX and MIN back to front (!). Also there were two bugs involving alignment, in which I was allocating too much space before an indexed area, but not enough before the indexed header. These two bugs had managed to cancel each other out so I hadn't found them before, but of course as soon as I fixed the first one, the second showed up. Also you may know that in Arm instructions, "r31" may either be the system stack pointer (our RP) or rZero which reads as zero and consumes anything stored there. Which is which depends on the instruction and the specific operand. Now for loads and stores, if "Rt" (the operand being loaded or stored) is r31, it means rZero, but for the other operands it means RP. This is useful for setting a memory location to zero. I was compiling correct code, but had it wrong in the emulator.

***2.4 release:***

This is the next version (2.4) of the Arm code generator. It represents a significant step forward.

* We can now handle an arbitrary number of registers required in a definition. Hopefully the highest priority registers are "real" registers, but any extra are assigned slots in a frame that is created on the return stack at the beginning of the definition. This frame conforms to the format defined in the Apple and Arm runtime documentation, with register X29 set to point to the frame. When a "virtual register" operand is encountered, a load will be inserted to load the virtual register from the frame into a scratch register, which will then be used in the instruction. For a virtual register result, a scratch result register will be used and a store then inserted to store the result into its frame slot. The document "Code generator.rtf" has the full details.

* With a load of a large program, it turned out that we could take enough global space that the 12-bit displacement in a load or store instruction couldn't reach the operand. When this occurs, we now generate a new address higher in the global area, and this is then available for the whole of a definition.

* A few minor bugs showed up, and a couple of situations which I thought were errors but really weren't.

With these changes, we can now target compile the code generator up to the file "pass1" (see the load file arm1.ld). This is about halfway through the load file, though hopefully we have already hit the main problems and fixed them. During the load, there is a print of the occasions when a virtual register must be used, and you can see that it's quite infrequent.

***2.3 release:***

This is an interim release, since I have now encountered situations where registers can run out in complicated definitions, which I had hoped wouldn't happen, but which has. A fix is in the pipeline, but isn't fully implemented yet.

The fix is for these definitions, to define a frame in memory, and assign "virtual registers" to slots in this frame. Hopefully this will only need to be done for less frequently accessed registers. When a virtual register operand is encountered, a load will be inserted to load the virtual register from the frame into a scratch register, which will then be used in the instruction. For a virtual register result, a scratch result register will be used and a store then inserted to store the result into its frame slot.

So far we can target compile the code generator up to the file "operands" (see the load file arm1.ld). There is only one definition in the load which requires virtual registers, and that is PROPAGATE_RANGE in the file Propagation. This is necessarily a big complex definition. The compiled code isn't correct, since I haven't written the frame code yet. Instead, a number of lines are printed saying rScratch is used instead of a virtual register.

The load so far has a number of big definitions, but we only need virtual registers for this particular one. It therefore appears that virtual registers will not be needed very frequently. I'll do some more work to ensure the most frequently accessed registers in a definition are not assigned to virtual registers.

As usual, a few bugs have been fixed with this version, including one which was giving a false indication of registers running out.

***2.2 release:***

There are no major new features, but with this version we begin target compiling the code generator. This won't do anything useful yet since it's just a partial load, but it's progress. See the details below on how do do the load. Here are the changes made with this version:

* I had to fix a number of bugs. There are some big complicated definitions which throw up situations we hadn't hit before. I've fixed a couple of bugs in reg_alloc, and found I hadn't even coded up FP constants properly. Also SELECT[ constructs with some ... ], ... items weren't fully coded up. `ASSERT{` also hadn't been implemented before, but is now.

* The loading order has to be different to the initial arm.ld order. It's very tricky to get it right. Immediate words which are needed during the target compilation are loaded by arm.ld, but mustn't be redefined in the target compilation before they're called. I catch all these but had to make trial changes to the load order till it worked.

* arm.ld loads the disassembler/emulator very early. But it doesn't need to be in the target compilation at all.

* I had a hash collision with a local name, so I decided to make the local name hash the same as the main dictionary - a 64-bit hash. This changed the data layout for locals_list, and of course this all needed debugging. This took a while, but it's working now.

* CASE[ and SELECT[ use short routines at runtime to do the dispatch. These routines need to be inlined. I found that if they're not, big definitions with lots of these constructs can run out of free registers. We now ensure these routines are always inlined.

* The target compilation is done with a load file arm1.ld. See below for details.

***2.1 release:***

This is a fairly minor revision, to prepare the way for target compiling the code generaor. There are these changes:

1. EXTERN has its initial implementation. The proper implementation will need real Arm hardware to run on - however this preliminary implementation allows an external call to be declared like this:<br>
`EXTERN <name> { parm1 ... parmN -- result1 ... resultN }`<br>
And when a call to <name> is compiled, parameters will be placed in registers X0 and upwards according to the Arm specs. Results will be taken from X0 upwards, although I think "real" external calls will have only one result according to the C convention. The call will compile to an illegal instruction with zero in the top 16 bits and a unique code in the low 16 bits. The emulator can dispatch on this code and call an iMops word for testing. This will everntually allow the code generator itself to be target compiled and have access to words like MWord for reading input.

2. [IF] [ELSE] and [THEN] are now implemented.

3. Constants are properly implemented - it turns out this wasn't done before. See the Runtime document for the details. The value of a constant is stored in the dictionary, not the global data area, and an access to a constant is handled by the compiler exactly as for a literal, which allows various optimizations.

4. A small optimization is added in which a load of a long literal which would require more than two MOVx instructions to load, is instead stored in the constant data area where it can be loaded with a single LDR instruction. This area is in the instruction space and so is read-only.

***2.0 release:***

This is the next version (2.0) of the Arm code generator. We have a new major version number because the changes are quite significant. We now have object_arrays, and the whole object alignment algorithm has been revamped.

Indexing is further speeded up. Indexed elements are now power-of-2 aligned, so the index can be shifted instead of needing to be multiplied by the element size.

All the details are in the aMops runtime.rtf document, which has substantially revised.

---

**Future plans**

As I mentioned above, I need to continue tracking through the emulated execution of (;) and related words, and then on into the subsequent passes and code generation for my little test program.

Beyond this, there may not be a lot more I can do with the code generator until we have real hardware to run on.

In Arm FP is integrated with SIMD instructions (single-instruction, multiple data - i.e. vectors), and there is a huge, very rich set of SIMD instructions. These can be added in stages, but probably with lower priority. The first priority will be to get a native system running once we have access to real hardware.

--- Mike Hore, Darwin, Northern Territory, Australia. January 2022.
