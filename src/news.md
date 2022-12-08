---
title: News
eleventyNavigation:
  key: News
  order: 20
layout: layouts/default.njk
---

- 2022-12-08: MAX 6.0 [Download page](https://sourceforge.net/projects/powermops/files/MAX/) which reflect
early rethinking based on the ARM Morello architecture
  - GPRs containing binary data have a full 128 bits available
  - *capability* has become the standard term for what was previously called *codeword*
  - Multitasking and garbage collection are on hold since they need updating for the new tagging scheme
- 2022-11-04: aMops Code Generator 3.3 [Download page](https://sourceforge.net/projects/powermops/files/aMops-CG/)
  - minor bug fix
  - initial support for [Morello](https://www.arm.com/architecture/cpu/morello)
- 2022-09-23: MAX 5.2
  - re-implementation of multitasking
  - addition of garbage collection
- 2022-09-04: MAX 5.1
  - class/object code re-implemented, simplifying things
  - bug fixes
- 2022-07-23: MAX 5.0
  - major new version, incorporating some of the new ideas from aMops
  - rejigged opcodes
- 2022-04-02: aMops Code Generator 3.2 [Download page](https://sourceforge.net/projects/powermops/files/aMops-CG/)
- 2022-02-21: aMops Code Generator 3.1
- 2022-02-05: iMops 2.23 [Download page](https://sourceforge.net/projects/powermops/files/iMops/)
  - Fixed crash on launch on Monterey (macOS 12)
  - Other bug fixes
  - iMops is now a third party application without any developer signature.  To avoid possible GateKeeper troubles, see file *Read Before Launching iMops or iBucket* in the distribution.
- 2022-01-12: aMops Code Generator 3.0
- 2021-11-17: aMops Code Generator 2.6
  - Can compile a definition under emulation, up to the point where it needs to make a new dictionary entry for the new definition.
- 2021-10-08: aMops Code Generator 2.5
  - It can now completely load itself.
  - This target-compiled version of the code generator can begin to run under the emulator, up to the point where the big object_array "theNodes" is created in the heap.
  - There are new features to help in following an emulation trace.
- 2021-08-25: aMops Code Generator 2.3
- 2021-08-04: aMops Code Generator 2.2
- 2021-06-22: aMops Code Generator 2.1
- 2021-05-26: aMops Code Generator 2.0
- 2021-05-25: new **Mops** website, built in Markdown
- 2021-03-02: aMops Code Generator 1.5
- 2021-01-26: aMops Code Generator 1.4
- 2021-01-11: aMops Code Generator 1.3
- 2020-12-12: aMops Code Generator 1.2
- 2020-11-22: aMops Code Generator 1.1
- 2020-10-30: aMops Code Generator 1.0
- 2020-09-11: aMops Code Generator beta 1
- 2020-08-14: aMops Code Generator alpha-3
- 2020-08-07: aMops Code Generator alpha-2
- 2020-07-31: aMops Code Generator alpha-1
- 2018-12-29: iMops 2.22 distribution was revised. (Previous distribution seemed broken)
- 2017-07-10: iMops 2.21 released -- Interruption into "Echo during Load" by Space key was made possible. Some bugs were fixed
- 2016-11-12: iMops 2.2 released -- A maintenance release but now iMops is a developer-signed application.
- 2016-05-05: iMops 2.11 released -- A maintenance release. Few bugs were fixed. Details are in a file "What's new".
- 2015-08-01: iMops 2.1 released -- some bugs have been fixed and new STRING+ class source file included.
- 2015-01-18: iMops 2.01 released -- a bug was fixed and object cascading feature was added.
- 2014-09-07: PowerMops wiki restored after SourceForge hosted app shutdown.
- 2014-07-27: iMops 2.0 released -- many bugs fixed and French language resource is included (thanks to Gérard Castagné).
- 2009-10-24 : PowerMops 6.2 has been released -- a few bugs fixed, and a new mechanism for creating arrays and lists of objects.
- 2009-01-01 : Updated from a unique MediaWiki instance to the SourceForge hosted app.
- 2007-07-07 : [PowerMops 6.1](http://sourceforge.net/project/showfiles.php?group_id=152075&package_id=168230&release_id=521463) has been released! Dozens of bug fixes.
- 2006-06-23 : PowerMops 6.0 has been released. Check out the latest release notes in the [Open Me First](/pmops/openmefirst) document or go directly to the [Download page](https://sourceforge.net/projects/powermops/files/) to fetch your complete copy.
