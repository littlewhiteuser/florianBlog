---
title: Vue 3 组合式 API 最佳实践
date: 2026-02-15
tags: [Vue, JavaScript, 前端]
category: 前端
sticky: 2
description: 深入探讨 Vue 3 Composition API 的使用模式和最佳实践，让你的 Vue 代码更优雅。
cover: https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop
---

# Vue 3 组合式 API 最佳实践

Vue 3 的组合式 API 为我们提供了更灵活、更强大的代码组织方式。

<!-- more -->

## 为什么使用组合式 API？

- **更好的逻辑复用**: 通过 composables 实现逻辑抽取
- **更灵活的代码组织**: 按功能组织而非选项组织
- **更好的类型推导**: 天然对 TypeScript 友好

## 常用 Composables 模式

### useToggle

```vue
<script setup lang="ts">
import { ref } from 'vue'

function useToggle(initialValue = false) {
  const value = ref(initialValue)
  const toggle = () => { value.value = !value.value }
  const setTrue = () => { value.value = true }
  const setFalse = () => { value.value = false }
  
  return { value, toggle, setTrue, setFalse }
}

const { value: isVisible, toggle } = useToggle()
</script>
```

### useFetch

```typescript
import { ref, watchEffect } from 'vue'

export function useFetch<T>(url: string) {
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)
  const loading = ref(true)

  watchEffect(async () => {
    loading.value = true
    try {
      const res = await fetch(url)
      data.value = await res.json()
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  })

  return { data, error, loading }
}
```

### useLocalStorage

```typescript
import { ref, watch } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const stored = localStorage.getItem(key)
  const data = ref<T>(stored ? JSON.parse(stored) : defaultValue)

  watch(data, (val) => {
    localStorage.setItem(key, JSON.stringify(val))
  }, { deep: true })

  return data
}
```

## 组件设计原则

1. **单一职责**: 每个组件只做一件事
2. **Props 向下传递**: 数据流向清晰
3. **Events 向上传递**: 子组件通过事件通知父组件
4. **Provide/Inject 跨层传递**: 适合主题、语言等全局配置

## 总结

组合式 API 不仅是语法变化，更是思维方式的转变。善用 composables 可以让代码更加模块化和可复用。
