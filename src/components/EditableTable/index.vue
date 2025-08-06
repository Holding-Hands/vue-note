<template>
  <div class="editable-table-demo">
    <h2>可编辑表格组件示例</h2>

    <div class="demo-section">
      <h3>基础用法</h3>
      <EditableTable
        ref="editableTable"
        :data="tableData"
        :columns="columns"
        :rules="validationRules"
        @cell-change="handleCellChange"
        @row-add="handleRowAdd"
        @row-delete="handleRowDelete"
      />
    </div>

    <div class="demo-actions">
      <el-button type="primary" @click="validateTable">校验表格</el-button>
      <el-button @click="getTableData">获取数据</el-button>
      <el-button @click="clearErrors">清除错误</el-button>
      <el-button @click="resetData">重置数据</el-button>
    </div>

    <div class="demo-info">
      <h3>使用说明</h3>
      <ul>
        <li>点击单元格即可进入编辑模式</li>
        <li>按 Enter 键或失去焦点保存</li>
        <li>按 Esc 键取消编辑</li>
        <li>支持多种校验规则：必填、长度、正则、自定义校验</li>
        <li>错误信息会实时显示在表格下方</li>
      </ul>
    </div>
  </div>
</template>

<script>
import EditableTable from "./EditableTable.vue";

export default {
  name: "EditableTableDemo",
  components: {
    EditableTable,
  },
  data() {
    return {
      // 表格数据
      tableData: [
        {
          id: 1,
          name: "张三",
          age: 25,
          email: "zhangsan@example.com",
          phone: "13800138000",
          department: "技术部",
        },
        {
          id: 2,
          name: "李四",
          age: 30,
          email: "lisi@example.com",
          phone: "13800138001",
          department: "产品部",
        },
        {
          id: 3,
          name: "王五",
          age: 28,
          email: "wangwu@example.com",
          phone: "13800138002",
          department: "设计部",
        },
      ],

      // 列配置
      columns: [
        {
          prop: "id",
          label: "ID",
          minWidth: 60,
          editable: false, // 不可编辑
        },
        {
          prop: "name",
          label: "姓名",
          minWidth: 100,
          defaultValue: "",
        },
        {
          prop: "age",
          label: "年龄",
          minWidth: 60,
          defaultValue: "",
        },
        {
          prop: "email",
          label: "邮箱",
          minWidth: 180,
          defaultValue: "",
        },
        {
          prop: "phone",
          label: "手机号",
          minWidth: 120,
          defaultValue: "",
        },
        {
          prop: "department",
          label: "部门",
          minWidth: 100,
          defaultValue: "",
        },
      ],

      // 校验规则
      validationRules: {
        name: {
          required: "姓名不能为空",
          minLength: 2,
          maxLength: 10,
        },
        age: {
          required: "年龄不能为空",
          validator: (value, row) => {
            const age = parseInt(value);
            if (isNaN(age)) {
              return "年龄必须是数字";
            }
            if (age < 18 || age > 65) {
              return "年龄必须在18-65岁之间";
            }
            return true;
          },
        },
        email: {
          required: "邮箱不能为空",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
          message: "邮箱格式不正确",
        },
        phone: {
          required: "手机号不能为空",
          pattern: "^1[3-9]\\d{9}$",
          message: "手机号格式不正确",
        },
        department: {
          required: "部门不能为空",
        },
      },
    };
  },
  methods: {
    // 单元格变化事件
    handleCellChange({ row, prop, value, rowIndex }) {
      console.log("单元格变化:", { row, prop, value, rowIndex });
      this.$message.success(`${prop} 已更新为: ${value}`);
    },

    // 添加行事件
    handleRowAdd(newRow) {
      console.log("添加新行:", newRow);
      this.$message.success("添加新行成功");
    },

    // 删除行事件
    handleRowDelete({ index, row }) {
      console.log("删除行:", { index, row });
      this.$message.success("删除行成功");
    },

    // 校验表格
    validateTable() {
      const isValid = this.$refs.editableTable.validateAll();
      if (isValid) {
        this.$message.success("表格数据校验通过");
      } else {
        this.$message.error("表格数据有错误，请检查");
      }
    },

    // 获取表格数据
    getTableData() {
      const data = this.$refs.editableTable.getTableData();
      console.log("当前表格数据:", data);
      this.$message.success("数据已输出到控制台");
    },

    // 清除错误
    clearErrors() {
      this.$refs.editableTable.clearErrors();
      this.$message.success("错误信息已清除");
    },

    // 重置数据
    resetData() {
      this.tableData = [
        {
          id: 1,
          name: "张三",
          age: 25,
          email: "zhangsan@example.com",
          phone: "13800138000",
          department: "技术部",
        },
        {
          id: 2,
          name: "李四",
          age: 30,
          email: "lisi@example.com",
          phone: "13800138001",
          department: "产品部",
        },
        {
          id: 3,
          name: "王五",
          age: 28,
          email: "wangwu@example.com",
          phone: "13800138002",
          department: "设计部",
        },
      ];
      this.$message.success("数据已重置");
    },
  },
};
</script>

<style scoped>
.editable-table-demo {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.demo-section {
  margin-bottom: 30px;
}

.demo-actions {
  margin: 20px 0;
  text-align: center;
}

.demo-actions .el-button {
  margin: 0 10px;
}

.demo-info {
  background: #f5f7fa;
  padding: 20px;
  border-radius: 4px;
  margin-top: 20px;
}

.demo-info h3 {
  margin-top: 0;
  color: #303133;
}

.demo-info ul {
  margin: 10px 0;
  padding-left: 20px;
}

.demo-info li {
  margin: 5px 0;
  color: #606266;
}

h2 {
  color: #303133;
  text-align: center;
  margin-bottom: 30px;
}

h3 {
  color: #409eff;
  margin-bottom: 15px;
}
</style>
