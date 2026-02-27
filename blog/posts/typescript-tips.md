---
title: TypeScript 实用技巧总结
date: 2026-02-20
tags: [TypeScript, 前端, JavaScript]
category: 前端
sticky: 1
description: 总结一些日常开发中非常实用的 TypeScript 技巧，提升代码质量和开发效率。
cover: https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop
---

# TypeScript 实用技巧总结

TypeScript 不仅提供类型安全，还有很多实用的高级特性可以让代码更优雅。

<!-- more -->

## 1. 类型收窄 (Type Narrowing)

```typescript
function processValue(value: string | number) {
  if (typeof value === 'string') {
    // TypeScript 知道这里 value 是 string
    return value.toUpperCase()
  }
  // TypeScript 知道这里 value 是 number
  return value.toFixed(2)
}
```

## 2. 条件类型

```typescript
type IsString<T> = T extends string ? true : false

type A = IsString<string>  // true
type B = IsString<number>  // false
```

## 3. 模板字面量类型

```typescript
type EventName<T extends string> = `on${Capitalize<T>}`

type ClickEvent = EventName<'click'>    // 'onClick'
type FocusEvent = EventName<'focus'>    // 'onFocus'
```

## 4. satisfies 关键字

TypeScript 4.9 引入的 `satisfies` 非常实用：

```typescript
type Color = 'red' | 'green' | 'blue'
type ColorMap = Record<Color, string | number[]>

const colors = {
  red: '#ff0000',
  green: [0, 255, 0],
  blue: '#0000ff',
} satisfies ColorMap

// colors.red 的类型是 string，而不是 string | number[]
colors.red.toUpperCase() // ✅ 类型安全
```

## 5. 工具类型组合

```typescript
// 使某些字段可选
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

interface User {
  id: string
  name: string
  email: string
  avatar: string
}

// avatar 变为可选
type CreateUserInput = PartialBy<User, 'id' | 'avatar'>
```

## 总结

善用 TypeScript 的高级特性，可以写出更安全、更易维护的代码。建议在项目中逐步引入这些技巧。
