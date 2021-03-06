﻿# Pros And Cons of Vue.js

由于曾经没有使用过其他JavaScript的框架，所以在这里就不进行对比，仅表达一下对**Vue.js**的看法。

---

## Pros

### 1. 响应（Reactive）

**响应**是Vue带给我最印象深刻的特性。在不使用框架进行JavaScript开发时，我常常使用按钮来进行响应，但很多时候会过于复杂，并且其中的一些细节难以体现。但响应式的框架使代码变得非常方便且活泼，例如[demo.html][1]。其中下方的数字会实时的对上方数字的改变进行响应，从某种程度上来说提升了使用体验。

### 2. 渐进式 (Progressive)

**渐进式**意味着我可以在一个曾经开发过的项目中直接使用Vue，例如暑期实现的Word Ladder（这个计划还在进行）。但初步的测试让我感受到，Vue的实时渲染功能可以极大地提升Word Ladder的表现力。（例如直接生成一颗搜索树？）

### 3. 可维护性和可调试性（Maintainable & Testable)

Vue的动态渲染无疑提升了代码的可维护性和可调试性。但不仅如此，Chrome上的Vue插件可以直接更加清楚地、动态地展示各对象和各数组的数据，这让对关键单元的测试更方便实施。

---

## Cons

可能是我见识太少，相对于直接的JavaScript开发来说，Vue无疑在各个层面都提升了开发和测试体验。**No Cons.**

  [1]: http://www.diving-fish.com/vue/demo.html
