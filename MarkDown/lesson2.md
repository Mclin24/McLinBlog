## 浏览器渲染原理

## 浏览器是如何渲染页面的？

    当浏览器的网络线程收到HTML文档后，会产生一个渲染任务，并将其传递给渲染主线程的消息队列。
    在事件循环的机制下，渲染主线程取出消息队列的渲染任务，开始渲染流程。
    整个渲染流程分为多个阶段，分别是，HTML解析、样式计算、布局、分层、绘制、分块、光栅化、画。
    每个阶段都有明确的输出，上一个阶段的输出会成为下一个的输入，这样整个渲染流程就形成了一套组织严密的流水线。

    １、解析HTML
        解析过程时遇到CSS解析CSS，遇到JS执行JS代码。为了提高解析效率，浏览器会开启预解析线程，
        率先下载HTML中外部CSS文件和外部JS文件。

        如果主线程解析到link位置，此时外部的CSS文件还没下载解析好，主线程不会等待，继续解析后续的HTML。
        这是因为下载和解析CSS的工作时在预解析线程中进行的。这就是CSS不会阻塞HTML解析的根本原因

        如果主线程解析到script位置，会停止解析HTML，转而等待JS文件下载好，并将全局代码解析执行完成后，
        才能继续解析HTML。这是因为JS代码的执行过程可能会修改当前的DOM树。所以DOM树的生成必须暂停。
        这就是JS阻塞HTML解析的根本原因

        第一步完成后，会得到DOM树和CSSOM树，浏览器的默认样式、内部样式、外部样式、行内样式均会包含在CSSOM树中
    2、样式计算
        主线会遍历得到的DOM树，依次为树中的每个节点计算出最终的样式，称之为Computed Style。在这一过程中，
        很多预设值会变成绝对值，比如red会变成rgb(255,0,0)，相对单位会变成绝对单位，比如em会变成px
        这一步完成会得到带有样式的DOM树
    3、布局
        布局完成后会得到布局树，布局阶段会依次遍历DOM树的每一个节点，计算每个节点的几何信息。例如节点的宽高、相对包含块的位置。
        大部分时候，DOM树和布局树并非一一对应。
        比如display：none的节点没有几何信息，因此不会生成布局树；又比如使用了伪类元素选择器，虽然DOM树中不存在这些伪类元素节点，
        但它们拥有几何信息，所以会生成在布局树中，还有匿名行盒、匿名块盒等等都会导致DOM树和布局树无法一一对应
    4、分层
        主线程会使用一套复杂的策略对整个布局树中进行分层。
        分层的好处在于，将来某一个层改变后，仅会对该层进行后续处理，从而提升效率
        滚动条、堆叠上下文、transform、opacity等样式都会或多或少的影响分层结果。也可以通过will-change属性更大程度的影响分层结果。
    5、绘制
        主线程会为每个分层单独产生绘制指令集，用于描述这一层的内容该如何画出来。完成绘制后，主线程会将每个图层的绘制信息，提交给合成线程，
        剩余工作将有合成线程完成。
        1、合成线程首先对每个图层进行分块，将其划分为更多的小区域。它会从线程池中拿取多个线程完成分块工作。
        分块完成后，进入光栅化阶段。
        合成线程会将块信息交给GPU进程，以极高的速度完成光栅化。
        GPU进程会开启多个线程完成光栅化，并且优先处理靠近视口区域的块，光栅化的结果，就是一块一块的位图。
    6、画
        合成线程拿到每个层，每个块的位图后，生成一个个指引【quad】信息。指引会标识出每个位图应该画到屏幕的哪个位置，以及会考虑到旋转、缩放等变形。
        变形发生在合成线程，与渲染线程无关，这就是transform效率高的本质原因。
        合成线程会把quad提交给GPU进程，由GPU进程产生系统调用，提交给GPU硬件，完成最后的屏幕成像。

## HTML 解析过程中遇到 JS 代码，怎么办

    渲染主线程遇到JS代码时必须停止一切行为，等待下载执行后才能继续
    预解析线程可以分担一点下载JS的任务

## 包含块？？

## 什么是 reflow

    reflow的本质是重新计算layout树。
    当进行会影响到布局的操作后，会重新计算布局树，从而引发layout。
    为了避免连续多次操作导致布局树反复计算，浏览器会合并这些操作，当JS代码全部完成后再进行统一计算。
    所以，改动属性造成的reflow是异步完成的。
    也同样因为如此，当JS获取布局属性时，就可能造成无法获取到最新的布局信息。
    浏览器在反复权衡下，最终决定获取属性立即reflow。

## 什么是 repaint

    repaint的本质就是重新根据分层信息计算了绘制指令。当改动了可见样式后，就需要重新计算，会引发repaint。
    由于元素的布局信息也属于可见样式，所以reflow一定会引起repaint。

## 为什么 transform 的效率高

    因为transform既不会影响布局也不会影响绘制指令，它影响的只是渲染流程的最后一个draw阶段。
    由于draw阶段是在合成线程中，所以transform的变化几乎不会影响渲染主线程。
    反之，渲染主线程无论如何忙碌，也不会影响transform的变化。

渲染主线程：parse（解析 HTML）->style（样式计算）->layout（布局）->layer（分层）->paint（绘制）->(任务交给合成线程)

合成线程： tiling（分块）->raster（光栅化）->draw（画）
