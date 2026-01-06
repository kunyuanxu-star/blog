---
title: RISC-V 架构初探：指令集与寄存器
date: 2024-03-30
category: Arch
tags: [RISC-V, Assembly, Hardware]
readTime: 12 min
excerpt: RISC-V 正在改变芯片设计的格局。作为一种开源指令集架构，它简洁而强大。本文将带你了解 RISC-V 的基本寄存器约定和常用指令...
image: https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=1000
---

# RISC-V 架构初探：指令集与寄存器

RISC-V 正在改变芯片设计的格局。作为一种开源指令集架构，它简洁而强大。

## 什么是 RISC-V？

RISC-V（读作"risk-five"）是一个基于精简指令集（RISC）原则的开源指令集架构（ISA）。

### 为什么选择 RISC-V？

- 🔓 **开源免费** - 无需支付授权费用
- 📚 **简洁设计** - 易于学习和实现
- 🔧 **模块化** - 支持可选扩展
- 🚀 **现代化** - 从零开始设计，避免了历史包袱

## 寄存器约定

### 通用寄存器

RISC-V 有 32 个通用寄存器（RV32/RV64）：

| 寄存器 | ABI 名称 | 描述 | Caller/Callee |
|--------|----------|------|---------------|
| x0 | zero | 硬连线零 | - |
| x1 | ra | 返回地址 | Caller |
| x2 | sp | 栈指针 | Callee |
| x3 | gp | 全局指针 | - |
| x4 | tp | 线程指针 | - |
| x5-x7 | t0-t2 | 临时寄存器 | Caller |
| x8 | s0/fp | 保存寄存器/帧指针 | Callee |
| x9 | s1 | 保存寄存器 | Callee |
| x10-x11 | a0-a1 | 函数参数/返回值 | Caller |
| x12-x17 | a2-a7 | 函数参数 | Caller |
| x18-x27 | s2-s11 | 保存寄存器 | Callee |
| x28-x31 | t3-t6 | 临时寄存器 | Caller |

### 关键寄存器说明

**零寄存器（x0/zero）**
```asm
addi x5, x0, 10     # x5 = 0 + 10 = 10
add x6, x0, x0      # x6 = 0（清零操作）
```

**返回地址（x1/ra）**
```asm
jal ra, function    # 调用函数，返回地址保存到 ra
jalr x0, ra, 0      # 返回（等价于 ret）
```

**栈指针（x2/sp）**
```asm
addi sp, sp, -16    # 分配栈空间
sw ra, 12(sp)       # 保存返回地址
```

## 基本指令

### 算术指令

```asm
# 立即数加法
addi x5, x6, 100    # x5 = x6 + 100

# 寄存器加法
add x5, x6, x7      # x5 = x6 + x7

# 减法
sub x5, x6, x7      # x5 = x6 - x7

# 乘法（需要 M 扩展）
mul x5, x6, x7      # x5 = x6 * x7
```

### 逻辑指令

```asm
# 与操作
and x5, x6, x7      # x5 = x6 & x7
andi x5, x6, 0xFF   # x5 = x6 & 0xFF

# 或操作
or x5, x6, x7       # x5 = x6 | x7

# 异或
xor x5, x6, x7      # x5 = x6 ^ x7

# 移位
slli x5, x6, 3      # x5 = x6 << 3（逻辑左移）
srli x5, x6, 2      # x5 = x6 >> 2（逻辑右移）
```

### 内存访问

```asm
# 加载字（load word）
lw x5, 0(x6)        # x5 = Memory[x6 + 0]

# 存储字（store word）
sw x5, 4(x6)        # Memory[x6 + 4] = x5

# 加载字节
lb x5, 0(x6)        # 加载字节（符号扩展）
lbu x5, 0(x6)       # 加载字节（零扩展）
```

### 控制流

```asm
# 无条件跳转
j label             # 跳转到 label
jal ra, function    # 跳转并链接（函数调用）

# 条件分支
beq x5, x6, label   # 如果 x5 == x6 则跳转
bne x5, x6, label   # 如果 x5 != x6 则跳转
blt x5, x6, label   # 如果 x5 < x6 则跳转（有符号）
bge x5, x6, label   # 如果 x5 >= x6 则跳转（有符号）
```

## 实战示例

### 求和函数

```asm
# int sum(int a, int b) { return a + b; }
sum:
    add a0, a0, a1  # a0 = a0 + a1
    ret             # 返回

# 调用
li a0, 5            # a0 = 5
li a1, 3            # a1 = 3
jal ra, sum         # 调用 sum，结果在 a0 中
```

### 数组求和

```asm
# int array_sum(int *arr, int len)
array_sum:
    li t0, 0            # sum = 0
    li t1, 0            # i = 0
loop:
    bge t1, a1, done    # if i >= len, goto done
    
    lw t2, 0(a0)        # t2 = arr[i]
    add t0, t0, t2      # sum += t2
    
    addi a0, a0, 4      # arr++
    addi t1, t1, 1      # i++
    j loop
    
done:
    mv a0, t0           # return sum
    ret
```

### 斐波那契数列

```asm
# int fib(int n)
fib:
    # 保存寄存器
    addi sp, sp, -16
    sw ra, 12(sp)
    sw s0, 8(sp)
    
    # base case: n < 2
    li t0, 2
    blt a0, t0, base_case
    
    # 递归: fib(n-1)
    addi s0, a0, 0      # 保存 n
    addi a0, a0, -1
    jal ra, fib
    addi s1, a0, 0      # 保存 fib(n-1)
    
    # 递归: fib(n-2)
    addi a0, s0, -2
    jal ra, fib
    
    # 返回 fib(n-1) + fib(n-2)
    add a0, a0, s1
    j restore
    
base_case:
    # return n
    
restore:
    lw ra, 12(sp)
    lw s0, 8(sp)
    addi sp, sp, 16
    ret
```

## RISC-V 扩展

### 标准扩展

- **I** - 基础整数指令集（必需）
- **M** - 整数乘除法
- **A** - 原子操作
- **F** - 单精度浮点
- **D** - 双精度浮点
- **C** - 压缩指令（16位）

### 组合命名

- **RV32I** - 32位基础整数
- **RV64G** - 64位通用（I + M + A + F + D）
- **RV32IMC** - 32位整数 + 乘除 + 压缩

## 学习资源

- 📖 [RISC-V 规范](https://riscv.org/technical/specifications/)
- 🔧 [RISC-V 模拟器](https://github.com/riscv/riscv-isa-sim)
- 🎓 [RISC-V 在线课程](https://riscv.org/education/)
- 💻 [RISC-V 工具链](https://github.com/riscv-collab/riscv-gnu-toolchain)

## 总结

RISC-V 的优势：

- ✅ 开源自由，无专利束缚
- ✅ 设计简洁，易于学习
- ✅ 模块化扩展，灵活强大
- ✅ 社区活跃，生态繁荣

RISC-V 是未来处理器架构的重要方向！🚀
