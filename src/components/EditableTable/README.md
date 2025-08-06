# EditableTable 可编辑表格组件

一个基于 Element UI 的可编辑表格组件，支持单元格编辑、数据校验、光标控制等功能。

## 功能特性

- ✅ 点击单元格直接编辑
- ✅ 支持键盘操作（Enter保存，Esc取消）
- ✅ 实时数据校验
- ✅ 多种校验规则支持
- ✅ 错误信息显示
- ✅ 添加/删除行
- ✅ 操作列支持
- ✅ 响应式设计

## 基本用法

```vue
<template>
  <EditableTable
    :data="tableData"
    :columns="columns"
    :rules="validationRules"
    @cell-change="handleCellChange"
  />
</template>

<script>
import EditableTable from '@/components/EditableTable/EditableTable.vue'

export default {
  components: {
    EditableTable
  },
  data() {
    return {
      tableData: [
        { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com' }
      ],
      columns: [
        { prop: 'id', label: 'ID', width: 80, editable: false },
        { prop: 'name', label: '姓名', width: 120 },
        { prop: 'age', label: '年龄', width: 80 },
        { prop: 'email', label: '邮箱', minWidth: 200 }
      ],
      validationRules: {
        name: { required: '姓名不能为空' },
        age: { 
          required: '年龄不能为空',
          validator: (value) => {
            const age = parseInt(value)
            if (age < 18 || age > 65) {
              return '年龄必须在18-65岁之间'
            }
            return true
          }
        },
        email: {
          required: '邮箱不能为空',
          pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
          message: '邮箱格式不正确'
        }
      }
    }
  },
  methods: {
    handleCellChange({ row, prop, value, rowIndex }) {
      console.log('单元格变化:', { row, prop, value, rowIndex })
    }
  }
}
</script>
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| data | 表格数据 | Array | [] |
| columns | 列配置 | Array | [] |
| showActions | 是否显示操作列 | Boolean | true |
| showAddButton | 是否显示添加按钮 | Boolean | true |
| rules | 校验规则 | Object | {} |

## 列配置 (columns)

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| prop | 字段名 | String | - |
| label | 列标题 | String | - |
| width | 列宽度 | Number/String | - |
| minWidth | 最小宽度 | Number/String | - |
| editable | 是否可编辑 | Boolean | true |
| defaultValue | 新增行的默认值 | Any | '' |

## 校验规则 (rules)

支持以下校验类型：

### 必填校验
```javascript
{
  required: true // 或自定义错误信息
  required: '该字段不能为空'
}
```

### 长度校验
```javascript
{
  minLength: 2, // 最小长度
  maxLength: 10 // 最大长度
}
```

### 正则校验
```javascript
{
  pattern: '^1[3-9]\\d{9}$', // 正则表达式
  message: '手机号格式不正确' // 错误信息
}
```

### 自定义校验
```javascript
{
  validator: (value, row) => {
    // 自定义校验逻辑
    if (value < 0) {
      return '值不能为负数'
    }
    return true // 校验通过
  }
}
```

## Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| cell-change | 单元格数据变化时触发 | { row, prop, value, rowIndex } |
| row-add | 添加行时触发 | newRow |
| row-edit | 编辑行时触发 | { index, row } |
| row-delete | 删除行时触发 | { index, row } |

## Methods

通过 ref 调用组件方法：

| 方法名 | 说明 | 参数 |
|--------|------|------|
| getTableData | 获取当前表格数据 | - |
| validateAll | 校验所有数据 | - |
| clearErrors | 清除所有错误信息 | - |

## 使用示例

```javascript
// 获取表格数据
const data = this.$refs.editableTable.getTableData()

// 校验所有数据
const isValid = this.$refs.editableTable.validateAll()

// 清除错误信息
this.$refs.editableTable.clearErrors()
```

## 键盘操作

- **Enter**: 保存当前编辑内容
- **Esc**: 取消编辑，恢复原始值
- **点击单元格**: 进入编辑模式

## 样式定制

组件提供了以下 CSS 类名供样式定制：

- `.editable-table`: 表格容器
- `.editable-cell`: 可编辑单元格
- `.cell-input`: 输入框
- `.cell-text`: 文本显示
- `.error`: 错误状态
- `.table-actions`: 操作按钮区域
- `.error-messages`: 错误信息区域

## 注意事项

1. 确保项目中已安装 Element UI
2. 校验规则中的正则表达式需要使用双反斜杠转义
3. 自定义校验函数必须返回 `true` 或错误信息字符串
4. 组件会自动处理数据的深拷贝，避免直接修改 props 