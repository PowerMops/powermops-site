---
title: Object Creation and Message Syntax
layout: ../../../layouts/Main.astro
setup: |
  import PrevNext from '../../../components/PrevNext.astro';
---

'Instantiation', or the instantiation of a class, is used in this
manual to mean the creation of an object instance without regard to how
that creation is achieved. For instantiation to occur the instance must
be associated with a class, must be sized if the class is indexed, and
must be named unless created at runtime as dynamic and nameless. Objects
range in complexity from simple BYTEs and INTs through the
"toolbox objects" such as windows and views that participate
in Mac Toolbox operations. Mops provides several language elements
designed to cope with this range of complexity in an economical way.

Message syntax is very uniform unless you need to explicity control the
binding of a message, that is, the association of a message with a
specific method definition. In the simple case no uncertainty about the
receiver's class exists and the binding occurs at compile time (early
binding), but in other cases it must be achieved at runtime (late
binding). The choice between the two, and the attendant tradeoffs, is
dictated by overall program design as discussed in the following
chapter, "More About Objects". Complete syntax fo

<PrevNext />
