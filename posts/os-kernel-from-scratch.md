---
title: 从零开始编写一个简单的 OS Kernel
date: 2024-04-28
category: OS
tags: [Kernel, C, Assembly, Low-level]
readTime: 15 min
excerpt: 操作系统的引导过程发生了什么？如何从实模式切换到保护模式？让我们动手写一个 Hello World 级别的内核，探索计算机启动的奥秘...
image: https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&q=80&w=1000
---

# 从零开始编写一个简单的 OS Kernel

让我们动手写一个 Hello World 级别的内核，探索计算机启动的奥秘。

## 引导过程

计算机启动时，BIOS 会加载引导扇区（Boot Sector）到内存地址 `0x7c00`。

### 编写引导代码

```assembly
[org 0x7c00]
[bits 16]

start:
    mov si, hello
    call print_string
    jmp $

print_string:
    lodsb
    or al, al
    jz .done
    mov ah, 0x0e
    int 0x10
    jmp print_string
.done:
    ret

hello: db 'Hello, OS World!', 0

times 510-($-$$) db 0
dw 0xaa55
```

### 关键概念

- `[org 0x7c00]`: 告诉汇编器代码将被加载到内存地址 0x7c00
- `[bits 16]`: 指定生成 16 位实模式代码
- `0xaa55`: 引导扇区签名，BIOS 通过它识别引导设备

## 从实模式到保护模式

实模式下只能访问 1MB 内存，我们需要切换到保护模式。

### 全局描述符表（GDT）

```assembly
gdt_start:
    dq 0x0                  ; null descriptor

gdt_code:
    dw 0xffff               ; limit
    dw 0x0                  ; base (low)
    db 0x0                  ; base (middle)
    db 10011010b            ; access
    db 11001111b            ; granularity
    db 0x0                  ; base (high)

gdt_data:
    dw 0xffff
    dw 0x0
    db 0x0
    db 10010010b
    db 11001111b
    db 0x0

gdt_end:

gdt_descriptor:
    dw gdt_end - gdt_start - 1
    dd gdt_start
```

### 切换到保护模式

```assembly
cli                         ; 关闭中断
lgdt [gdt_descriptor]       ; 加载 GDT
mov eax, cr0
or eax, 0x1                 ; 设置保护模式位
mov cr0, eax
jmp CODE_SEG:init_pm        ; 远跳转到 32 位代码

[bits 32]
init_pm:
    mov ax, DATA_SEG
    mov ds, ax
    mov ss, ax
    mov es, ax
    mov fs, ax
    mov gs, ax
    
    mov ebp, 0x90000
    mov esp, ebp
    
    call kernel_main
```

## 编写简单的内核

```c
// kernel.c
void kernel_main() {
    char *video_memory = (char *)0xb8000;
    const char *message = "Hello from Kernel!";
    
    for (int i = 0; message[i] != '\0'; i++) {
        video_memory[i * 2] = message[i];
        video_memory[i * 2 + 1] = 0x0f; // 白字黑底
    }
    
    while (1);  // 挂起
}
```

## 构建与运行

### Makefile

```makefile
boot.bin: boot.asm
	nasm -f bin boot.asm -o boot.bin

kernel.o: kernel.c
	gcc -m32 -c kernel.c -o kernel.o -ffreestanding

kernel.bin: kernel.o
	ld -m elf_i386 -Ttext 0x1000 kernel.o -o kernel.bin --oformat binary

os.bin: boot.bin kernel.bin
	cat boot.bin kernel.bin > os.bin

run: os.bin
	qemu-system-x86_64 -drive format=raw,file=os.bin

clean:
	rm -f *.bin *.o
```

### 运行

```bash
make
make run
```

## 下一步

现在你有了一个最简单的操作系统内核！接下来可以：

- 🔧 实现中断处理（IDT）
- 💾 添加内存管理
- ⌨️ 实现键盘驱动
- 📟 实现简单的 Shell

## 参考资源

- [OSDev Wiki](https://wiki.osdev.org/)
- [Writing a Simple Operating System from Scratch](https://www.cs.bham.ac.uk/~exr/lectures/opsys/10_11/lectures/os-dev.pdf)
- [The little book about OS development](https://littleosbook.github.io/)

---

这就是操作系统开发的第一步！🚀
