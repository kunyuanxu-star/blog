import{_ as s,c as n,o as p,ai as l}from"./chunks/framework.CzX2Xjny.js";const b=JSON.parse('{"title":"RISC-V 架构初探：指令集与寄存器","description":"","frontmatter":{"title":"RISC-V 架构初探：指令集与寄存器","date":"2024-03-30T00:00:00.000Z","category":"Arch","tags":["RISC-V","Assembly","Hardware"],"readTime":"12 min","excerpt":"RISC-V 正在改变芯片设计的格局。作为一种开源指令集架构，它简洁而强大。本文将带你了解 RISC-V 的基本寄存器约定和常用指令...","image":"https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=1000"},"headers":[],"relativePath":"posts/risc-v-intro.md","filePath":"posts/risc-v-intro.md","lastUpdated":1767677687000}'),e={name:"posts/risc-v-intro.md"};function t(i,a,r,d,c,o){return p(),n("div",null,[...a[0]||(a[0]=[l(`<h1 id="risc-v-架构初探-指令集与寄存器" tabindex="-1">RISC-V 架构初探：指令集与寄存器 <a class="header-anchor" href="#risc-v-架构初探-指令集与寄存器" aria-label="Permalink to &quot;RISC-V 架构初探：指令集与寄存器&quot;">​</a></h1><p>RISC-V 正在改变芯片设计的格局。作为一种开源指令集架构，它简洁而强大。</p><h2 id="什么是-risc-v" tabindex="-1">什么是 RISC-V？ <a class="header-anchor" href="#什么是-risc-v" aria-label="Permalink to &quot;什么是 RISC-V？&quot;">​</a></h2><p>RISC-V（读作&quot;risk-five&quot;）是一个基于精简指令集（RISC）原则的开源指令集架构（ISA）。</p><h3 id="为什么选择-risc-v" tabindex="-1">为什么选择 RISC-V？ <a class="header-anchor" href="#为什么选择-risc-v" aria-label="Permalink to &quot;为什么选择 RISC-V？&quot;">​</a></h3><ul><li>🔓 <strong>开源免费</strong> - 无需支付授权费用</li><li>📚 <strong>简洁设计</strong> - 易于学习和实现</li><li>🔧 <strong>模块化</strong> - 支持可选扩展</li><li>🚀 <strong>现代化</strong> - 从零开始设计，避免了历史包袱</li></ul><h2 id="寄存器约定" tabindex="-1">寄存器约定 <a class="header-anchor" href="#寄存器约定" aria-label="Permalink to &quot;寄存器约定&quot;">​</a></h2><h3 id="通用寄存器" tabindex="-1">通用寄存器 <a class="header-anchor" href="#通用寄存器" aria-label="Permalink to &quot;通用寄存器&quot;">​</a></h3><p>RISC-V 有 32 个通用寄存器（RV32/RV64）：</p><table tabindex="0"><thead><tr><th>寄存器</th><th>ABI 名称</th><th>描述</th><th>Caller/Callee</th></tr></thead><tbody><tr><td>x0</td><td>zero</td><td>硬连线零</td><td>-</td></tr><tr><td>x1</td><td>ra</td><td>返回地址</td><td>Caller</td></tr><tr><td>x2</td><td>sp</td><td>栈指针</td><td>Callee</td></tr><tr><td>x3</td><td>gp</td><td>全局指针</td><td>-</td></tr><tr><td>x4</td><td>tp</td><td>线程指针</td><td>-</td></tr><tr><td>x5-x7</td><td>t0-t2</td><td>临时寄存器</td><td>Caller</td></tr><tr><td>x8</td><td>s0/fp</td><td>保存寄存器/帧指针</td><td>Callee</td></tr><tr><td>x9</td><td>s1</td><td>保存寄存器</td><td>Callee</td></tr><tr><td>x10-x11</td><td>a0-a1</td><td>函数参数/返回值</td><td>Caller</td></tr><tr><td>x12-x17</td><td>a2-a7</td><td>函数参数</td><td>Caller</td></tr><tr><td>x18-x27</td><td>s2-s11</td><td>保存寄存器</td><td>Callee</td></tr><tr><td>x28-x31</td><td>t3-t6</td><td>临时寄存器</td><td>Caller</td></tr></tbody></table><h3 id="关键寄存器说明" tabindex="-1">关键寄存器说明 <a class="header-anchor" href="#关键寄存器说明" aria-label="Permalink to &quot;关键寄存器说明&quot;">​</a></h3><p><strong>零寄存器（x0/zero）</strong></p><div class="language-assembly vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>addi x5, x0, 10     # x5 = 0 + 10 = 10</span></span>
<span class="line"><span>add x6, x0, x0      # x6 = 0（清零操作）</span></span></code></pre></div><p><strong>返回地址（x1/ra）</strong></p><div class="language-assembly vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>jal ra, function    # 调用函数，返回地址保存到 ra</span></span>
<span class="line"><span>jalr x0, ra, 0      # 返回（等价于 ret）</span></span></code></pre></div><p><strong>栈指针（x2/sp）</strong></p><div class="language-assembly vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>addi sp, sp, -16    # 分配栈空间</span></span>
<span class="line"><span>sw ra, 12(sp)       # 保存返回地址</span></span></code></pre></div><h2 id="基本指令" tabindex="-1">基本指令 <a class="header-anchor" href="#基本指令" aria-label="Permalink to &quot;基本指令&quot;">​</a></h2><h3 id="算术指令" tabindex="-1">算术指令 <a class="header-anchor" href="#算术指令" aria-label="Permalink to &quot;算术指令&quot;">​</a></h3><div class="language-assembly vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 立即数加法</span></span>
<span class="line"><span>addi x5, x6, 100    # x5 = x6 + 100</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 寄存器加法</span></span>
<span class="line"><span>add x5, x6, x7      # x5 = x6 + x7</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 减法</span></span>
<span class="line"><span>sub x5, x6, x7      # x5 = x6 - x7</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 乘法（需要 M 扩展）</span></span>
<span class="line"><span>mul x5, x6, x7      # x5 = x6 * x7</span></span></code></pre></div><h3 id="逻辑指令" tabindex="-1">逻辑指令 <a class="header-anchor" href="#逻辑指令" aria-label="Permalink to &quot;逻辑指令&quot;">​</a></h3><div class="language-assembly vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 与操作</span></span>
<span class="line"><span>and x5, x6, x7      # x5 = x6 &amp; x7</span></span>
<span class="line"><span>andi x5, x6, 0xFF   # x5 = x6 &amp; 0xFF</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 或操作</span></span>
<span class="line"><span>or x5, x6, x7       # x5 = x6 | x7</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 异或</span></span>
<span class="line"><span>xor x5, x6, x7      # x5 = x6 ^ x7</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 移位</span></span>
<span class="line"><span>slli x5, x6, 3      # x5 = x6 &lt;&lt; 3（逻辑左移）</span></span>
<span class="line"><span>srli x5, x6, 2      # x5 = x6 &gt;&gt; 2（逻辑右移）</span></span></code></pre></div><h3 id="内存访问" tabindex="-1">内存访问 <a class="header-anchor" href="#内存访问" aria-label="Permalink to &quot;内存访问&quot;">​</a></h3><div class="language-assembly vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 加载字（load word）</span></span>
<span class="line"><span>lw x5, 0(x6)        # x5 = Memory[x6 + 0]</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 存储字（store word）</span></span>
<span class="line"><span>sw x5, 4(x6)        # Memory[x6 + 4] = x5</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 加载字节</span></span>
<span class="line"><span>lb x5, 0(x6)        # 加载字节（符号扩展）</span></span>
<span class="line"><span>lbu x5, 0(x6)       # 加载字节（零扩展）</span></span></code></pre></div><h3 id="控制流" tabindex="-1">控制流 <a class="header-anchor" href="#控制流" aria-label="Permalink to &quot;控制流&quot;">​</a></h3><div class="language-assembly vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 无条件跳转</span></span>
<span class="line"><span>j label             # 跳转到 label</span></span>
<span class="line"><span>jal ra, function    # 跳转并链接（函数调用）</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 条件分支</span></span>
<span class="line"><span>beq x5, x6, label   # 如果 x5 == x6 则跳转</span></span>
<span class="line"><span>bne x5, x6, label   # 如果 x5 != x6 则跳转</span></span>
<span class="line"><span>blt x5, x6, label   # 如果 x5 &lt; x6 则跳转（有符号）</span></span>
<span class="line"><span>bge x5, x6, label   # 如果 x5 &gt;= x6 则跳转（有符号）</span></span></code></pre></div><h2 id="实战示例" tabindex="-1">实战示例 <a class="header-anchor" href="#实战示例" aria-label="Permalink to &quot;实战示例&quot;">​</a></h2><h3 id="求和函数" tabindex="-1">求和函数 <a class="header-anchor" href="#求和函数" aria-label="Permalink to &quot;求和函数&quot;">​</a></h3><div class="language-assembly vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># int sum(int a, int b) { return a + b; }</span></span>
<span class="line"><span>sum:</span></span>
<span class="line"><span>    add a0, a0, a1  # a0 = a0 + a1</span></span>
<span class="line"><span>    ret             # 返回</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 调用</span></span>
<span class="line"><span>li a0, 5            # a0 = 5</span></span>
<span class="line"><span>li a1, 3            # a1 = 3</span></span>
<span class="line"><span>jal ra, sum         # 调用 sum，结果在 a0 中</span></span></code></pre></div><h3 id="数组求和" tabindex="-1">数组求和 <a class="header-anchor" href="#数组求和" aria-label="Permalink to &quot;数组求和&quot;">​</a></h3><div class="language-assembly vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># int array_sum(int *arr, int len)</span></span>
<span class="line"><span>array_sum:</span></span>
<span class="line"><span>    li t0, 0            # sum = 0</span></span>
<span class="line"><span>    li t1, 0            # i = 0</span></span>
<span class="line"><span>loop:</span></span>
<span class="line"><span>    bge t1, a1, done    # if i &gt;= len, goto done</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    lw t2, 0(a0)        # t2 = arr[i]</span></span>
<span class="line"><span>    add t0, t0, t2      # sum += t2</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    addi a0, a0, 4      # arr++</span></span>
<span class="line"><span>    addi t1, t1, 1      # i++</span></span>
<span class="line"><span>    j loop</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>done:</span></span>
<span class="line"><span>    mv a0, t0           # return sum</span></span>
<span class="line"><span>    ret</span></span></code></pre></div><h3 id="斐波那契数列" tabindex="-1">斐波那契数列 <a class="header-anchor" href="#斐波那契数列" aria-label="Permalink to &quot;斐波那契数列&quot;">​</a></h3><div class="language-assembly vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">assembly</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># int fib(int n)</span></span>
<span class="line"><span>fib:</span></span>
<span class="line"><span>    # 保存寄存器</span></span>
<span class="line"><span>    addi sp, sp, -16</span></span>
<span class="line"><span>    sw ra, 12(sp)</span></span>
<span class="line"><span>    sw s0, 8(sp)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # base case: n &lt; 2</span></span>
<span class="line"><span>    li t0, 2</span></span>
<span class="line"><span>    blt a0, t0, base_case</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # 递归: fib(n-1)</span></span>
<span class="line"><span>    addi s0, a0, 0      # 保存 n</span></span>
<span class="line"><span>    addi a0, a0, -1</span></span>
<span class="line"><span>    jal ra, fib</span></span>
<span class="line"><span>    addi s1, a0, 0      # 保存 fib(n-1)</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # 递归: fib(n-2)</span></span>
<span class="line"><span>    addi a0, s0, -2</span></span>
<span class="line"><span>    jal ra, fib</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    # 返回 fib(n-1) + fib(n-2)</span></span>
<span class="line"><span>    add a0, a0, s1</span></span>
<span class="line"><span>    j restore</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>base_case:</span></span>
<span class="line"><span>    # return n</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>restore:</span></span>
<span class="line"><span>    lw ra, 12(sp)</span></span>
<span class="line"><span>    lw s0, 8(sp)</span></span>
<span class="line"><span>    addi sp, sp, 16</span></span>
<span class="line"><span>    ret</span></span></code></pre></div><h2 id="risc-v-扩展" tabindex="-1">RISC-V 扩展 <a class="header-anchor" href="#risc-v-扩展" aria-label="Permalink to &quot;RISC-V 扩展&quot;">​</a></h2><h3 id="标准扩展" tabindex="-1">标准扩展 <a class="header-anchor" href="#标准扩展" aria-label="Permalink to &quot;标准扩展&quot;">​</a></h3><ul><li><strong>I</strong> - 基础整数指令集（必需）</li><li><strong>M</strong> - 整数乘除法</li><li><strong>A</strong> - 原子操作</li><li><strong>F</strong> - 单精度浮点</li><li><strong>D</strong> - 双精度浮点</li><li><strong>C</strong> - 压缩指令（16位）</li></ul><h3 id="组合命名" tabindex="-1">组合命名 <a class="header-anchor" href="#组合命名" aria-label="Permalink to &quot;组合命名&quot;">​</a></h3><ul><li><strong>RV32I</strong> - 32位基础整数</li><li><strong>RV64G</strong> - 64位通用（I + M + A + F + D）</li><li><strong>RV32IMC</strong> - 32位整数 + 乘除 + 压缩</li></ul><h2 id="学习资源" tabindex="-1">学习资源 <a class="header-anchor" href="#学习资源" aria-label="Permalink to &quot;学习资源&quot;">​</a></h2><ul><li>📖 <a href="https://riscv.org/technical/specifications/" target="_blank" rel="noreferrer">RISC-V 规范</a></li><li>🔧 <a href="https://github.com/riscv/riscv-isa-sim" target="_blank" rel="noreferrer">RISC-V 模拟器</a></li><li>🎓 <a href="https://riscv.org/education/" target="_blank" rel="noreferrer">RISC-V 在线课程</a></li><li>💻 <a href="https://github.com/riscv-collab/riscv-gnu-toolchain" target="_blank" rel="noreferrer">RISC-V 工具链</a></li></ul><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>RISC-V 的优势：</p><ul><li>✅ 开源自由，无专利束缚</li><li>✅ 设计简洁，易于学习</li><li>✅ 模块化扩展，灵活强大</li><li>✅ 社区活跃，生态繁荣</li></ul><p>RISC-V 是未来处理器架构的重要方向！🚀</p>`,44)])])}const x=s(e,[["render",t]]);export{b as __pageData,x as default};
