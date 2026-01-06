import type { DefaultTheme } from 'vitepress'

// 扩展 VitePress 的 DefaultTheme.Config 接口
// 这样 IDE 可以为自定义配置提供智能提示和类型检查
declare module 'vitepress' {
  export namespace DefaultTheme {
    export interface Config {
      /**
       * 个人信息配置
       * 用于在博客侧边栏显示作者信息
       */
      userBio?: {
        /** 姓名 */
        name: string
        /** 简称/头像文字 */
        title: string
        /** 个人描述 */
        description: string
        /** 头像图片路径 (可选，如果不提供则显示 title 文字) */
        avatar?: string
        /** GitHub 链接 */
        github: string
        /** 技术栈列表 */
        techStack: string[]
      }
    }
  }
}

export {}
