---
title: Mops Classes General Reference
eleventyNavigation:
  key: Classes
  parent: Powermops
  order: 240
layout: layouts/default.njk
---

## Contents

1.  [Basic data structures](classes_1)
    -   [About this chapter](classes_1#About_this_chapter)
    -   [Using Class Object and
        Bytes](classes_1#Using_Class_Object_and_Bytes)
    -   [Using the scalar
        classes](classes_1#Using_the_scalar_classes)
    -   [Using the array
        classes](classes_1#Using_the_array_classes)
    -   [Using Collections](classes_1#Using_Collections)
    -   [Persistent objects](classes_1#Persistent_objects)
    -   [Classes](classes_1#Classes)
        -   [Object](classes_1#Object)
        -   [Longword](classes_1#Longword)
        -   [Var](classes_1#Var)
        -   [Int, Uint](classes_1#Int,_Uint)
        -   [Byte, Ubyte](classes_1#Byte,_Ubyte)
        -   [Bool](classes_1#Bool)
        -   [Handle](classes_1#Handle)
        -   [ObjHandle](classes_1#ObjHandle)
        -   [Ptr](classes_1#Ptr)
        -   [DicAddr](classes_1#DicAddr)
        -   [X-Addr](classes_1#X-Addr)
        -   [Indexed-Obj](classes_1#Indexed-Obj)
        -   [Array Basic array classes - bArray, wArray,
            Array](classes_1#Basic_array_classes_-_bArray,_wArray,_Array)
        -   [X-Array](classes_1#X-Array)
        -   [Obj\_Array](classes_1#Obj_Array)
        -   [Large\_Obj\_Array](classes_1#Large_Obj_Array)
        -   [(col), Ordered-Col, wordCol,
            byteCol](classes_1#(col),_Ordered-Col,_wordCol,_byteCol)
        -   [X-Col](classes_1#X-Col)
        -   [Sequence](classes_1#Sequence)
        -   [HandleList](classes_1#HandleList)
        -   [PtrList](classes_1#PtrList)
        -   [Dic-Mark](classes_1#Dic-Mark)
        -   [Resource](classes_1#Resource)
2.  [Strings](classes_2)
    -   [About this chapter](classes_2#About_this_chapter)
    -   [Using strings](classes_2#Using_strings)
    -   [Communicating with other
        objects](classes_2#Communicating_with_other_objects)
    -   [Translate tables](classes_2#Translate_tables)
    -   [Classes](classes_2#Classes)
        -   [TrTbl](classes_2#TrTbl)
        -   [String](classes_2#String)
        -   [String+](classes_2#String&#43;)
3.  [Files](classes_3)
    -   [About this chapter](classes_3#About_this_chapter)
    -   [Using files ](classes_3#Using_files)
    -   [Standard File
        Package](classes_3#Standard_File_Package)
    -   [Hierarchical File
        System](classes_3#Hierarchical_File_System)
    -   [Classes](classes_3#Classes)
        -   [File](classes_3#File)
        -   [Container](classes_3#Container)
        -   [FileList](classes_3#FileList)
4.  [Events](classes_4)
    -   [About this chapter](classes_4#About_this_chapter)
    -   [Using events](classes_4#Using_events)
    -   [Listening to events](classes_4#Listening_to_events)
    -   [Specific event
        handling](classes_4#Specific_event_handling)
    -   [Classes](classes_4#Classes)
        -   [Event](classes_4#Event)
        -   [Mouse](classes_4#Mouse)
5.  [Windows](classes_5)
    -   [About this chapter](classes_5#About_this_chapter)
    -   [Using windows](classes_5#Using_windows)
    -   [Creating windows](classes_5#Creating_windows)
    -   [Classes](classes_5#Classes)
        -   [Window](classes_5#Window)
        -   [Window+](classes_5#Window&#43;)
6.  [Views and Controls](classes_6)
    -   [About this chapter](classes_6#About_this_chapter)
    -   [Using Views ](classes_6#Using_Views)
    -   [Clicks on views](classes_6#Clicks_on_views)
    -   [Using Controls](classes_6#Using_Controls)
    -   [Creating control
        objects](classes_6#Creating_control_objects)
    -   [Design issues](classes_6#Design_issues)
    -   [Dialogs](classes_6#Dialogs)
    -   [Classes](classes_6#Classes)
        -   [View](classes_6#View)
        -   [Control](classes_6#Control)
        -   [TitledCtl](classes_6#TitledCtl)
        -   [Button, RadioButton, CheckBox](classes_6#Button)
        -   [Vscroll, Hscroll](classes_6#Vscroll)
        -   [Scroller](classes_6#Scroller)
        -   [TEScroller](classes_6#TEScroller)
        -   [styled\_TEScroller](classes_6#styled)
        -   [TEView](classes_6#TEView)
7.  [Menus](classes_7)
    -   [About this chapter](classes_7#About_this_chapter)
    -   [Using Menus](classes_7#Using_Menus)
    -   [Classes](classes_7#Classes)
        -   [Menu](classes_7#Menu)
        -   [AppleMenu](classes_7#AppleMenu)
        -   [EditMenu](classes_7#EditMenu)
        -   [PopupMenu](classes_7#PopupMenu)
        -   [Mbar](classes_7#Mbar)
8.  [Graphics](classes_8)
    -   [Using the Graphics Classes](classes_8#Using)
    -   [Classes](classes_8#Classes)
        -   [Point](classes_8#Point)
        -   [Rect](classes_8#Rect)
        -   [GrafPort](classes_8#GrafPort)
9.  [Dialogs](classes_9)
    -   [Using the Graphics Classes](classes_9#Using)
    -   [Classes](classes_9#Classes)
        -   [Dialog](classes_9#Dialog)
        -   [Dialog+](classes_9#DialogP)
        -   [Alert](classes_9#Alert)
10. [68k Floating Point](classes_10)
    -   [Using Floating Point](classes_10#Using)
    -   [Classes](classes_10#Classes)
        -   [Float](classes_10#Float)
        -   [fArray](classes_10#fArray)
11. [Floating Point](classes_11)
    -   [Using Floating Point](classes_11#Using)
    -   [Forth Scientific Library](classes_11#Scientific)
    -   [Classes](classes_11#Classes)
        -   [Float](classes_11#Float)
        -   [fArray, sfArray](classes_11#fArray)
        -   [fMatrix](classes_11#fMatrix)
12. [AltiVec Support](classes_12)
    -   [Classes](classes_12#Classes)
        -   [Vector classes](classes_12#Vector)



