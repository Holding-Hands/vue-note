<template>
  <div class="editable-table">
    <div class="table-container">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        @cell-click="handleCellClick"
      >
        <el-table-column
          v-for="column in columns"
          :key="column.prop"
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
          :min-width="column.minWidth"
        >
          <template slot-scope="scope">
            <!-- 可编辑单元格 -->
            <div
              v-if="column.editable !== false"
              class="editable-cell"
              @click="handleCellEdit(scope.row, scope.column, scope.$index)"
            >
              <input
                v-if="
                  isEditing(scope.row, scope.column) &&
                  isNumberField(column.prop)
                "
                v-model="scope.row[column.prop]"
                :class="{ error: hasError(scope.row, column.prop) }"
                class="cell-input"
                type="number"
                @blur="handleBlur(scope.row, scope.column, scope.$index)"
                @keyup.enter="handleBlur(scope.row, scope.column, scope.$index)"
                @keyup.esc="handleCancel(scope.row, scope.column, scope.$index)"
                ref="cellInput"
              />
              <textarea
                v-else-if="isEditing(scope.row, scope.column)"
                v-model="scope.row[column.prop]"
                :class="{ error: hasError(scope.row, column.prop) }"
                class="cell-textarea"
                @blur="handleBlur(scope.row, scope.column, scope.$index)"
                @keyup.enter="handleBlur(scope.row, scope.column, scope.$index)"
                @keyup.esc="handleCancel(scope.row, scope.column, scope.$index)"
                @input="handleTextareaInput"
                ref="cellInput"
                rows="1"
              />
              <span
                v-else
                :class="{ error: hasError(scope.row, column.prop) }"
                class="cell-text"
              >
                {{ scope.row[column.prop] || "" }}
              </span>
            </div>
            <!-- 不可编辑单元格 -->
            <span class="non-editable-cell">{{
              scope.row[column.prop] || ""
            }}</span>
          </template>
        </el-table-column>

        <!-- 操作列 -->
        <el-table-column v-if="showActions" label="操作" width="120">
          <template slot-scope="scope">
            <div class="action-buttons">
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)"
              >
                编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >
                删除
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 添加行按钮 -->
    <div class="table-actions" v-if="showAddButton">
      <el-button type="primary" @click="handleAddRow"> 添加行 </el-button>
    </div>

    <!-- 错误提示 -->
    <div v-if="errors.length > 0" class="error-messages">
      <div class="error-header">
        <i class="el-icon-warning"></i>
        <span>发现 {{ errors.length }} 个错误：</span>
      </div>
      <el-alert
        v-for="error in errors"
        :key="`${error.id}-${error.timestamp}`"
        :title="`第${error.rowIndex + 1}行 ${error.prop}：${error.message}`"
        type="error"
        show-icon
        :closable="false"
        class="error-alert"
      />
    </div>

    <!-- 编辑弹框 -->
    <el-dialog
      title="编辑行数据"
      :visible.sync="editDialogVisible"
      width="600px"
      :before-close="handleCloseEditDialog"
    >
      <el-form
        ref="editForm"
        :model="editFormData"
        :rules="editFormRules"
        label-width="100px"
      >
        <el-form-item
          v-for="column in editColumns"
          :key="column.prop"
          :label="column.label"
          :prop="column.prop"
        >
          <el-input
            v-if="isNumberField(column.prop)"
            v-model="editFormData[column.prop]"
            :placeholder="`请输入${column.label}`"
            :disabled="column.editable === false"
            type="number"
          />
          <el-input
            v-else-if="column.type !== 'textarea'"
            v-model="editFormData[column.prop]"
            :placeholder="`请输入${column.label}`"
            :disabled="column.editable === false"
            :autosize="{ minRows: 2, maxRows: 8 }"
            type="textarea"
          />
          <el-input
            v-else
            v-model="editFormData[column.prop]"
            type="textarea"
            :rows="3"
            :placeholder="`请输入${column.label}`"
            :disabled="column.editable === false"
            :autosize="{ minRows: 3, maxRows: 10 }"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCloseEditDialog">取消</el-button>
        <el-button type="primary" @click="handleSaveEdit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "EditableTable",
  props: {
    // 表格数据
    data: {
      type: Array,
      default: () => [],
    },
    // 列配置
    columns: {
      type: Array,
      default: () => [],
    },
    // 是否显示操作列
    showActions: {
      type: Boolean,
      default: true,
    },
    // 是否显示添加按钮
    showAddButton: {
      type: Boolean,
      default: true,
    },
    // 校验规则
    rules: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      tableData: [],
      editingCell: null, // 当前编辑的单元格 {rowIndex, prop}
      errors: [], // 错误信息
      originalValue: null, // 原始值，用于取消编辑
      nextId: 1, // 下一个ID值
      editDialogVisible: false, // 编辑弹框显示状态
      editFormData: {}, // 编辑表单数据
      editFormRules: {}, // 编辑表单校验规则
      editColumns: [], // 编辑弹框中的列配置
      editingRowIndex: -1, // 当前编辑的行索引
    };
  },
  watch: {
    data: {
      handler(newVal) {
        this.tableData = JSON.parse(JSON.stringify(newVal));
        // 计算下一个ID值
        this.calculateNextId();
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    // 处理单元格点击
    handleCellClick(row, column, cell, event) {
      // 如果点击的是操作列，不处理
      if (column.type === "selection" || column.label === "操作") {
        return;
      }
    },

    // 处理单元格编辑
    handleCellEdit(row, column, rowIndex) {
      const prop = column.property;
      if (!prop || column.editable === false) return;

      this.editingCell = { rowIndex, prop };
      this.originalValue = row[prop];

      // 聚焦输入框
      this.$nextTick(() => {
        const input = this.$refs.cellInput;
        if (input && input[0]) {
          input[0].focus();
          input[0].select();
          // 自动调整高度
          this.autoResizeTextarea(input[0]);
        }
      });
    },

    // 自动调整textarea高度
    autoResizeTextarea(textarea) {
      if (!textarea) return;

      // 重置高度
      textarea.style.height = "auto";

      // 计算新高度
      const scrollHeight = textarea.scrollHeight;
      const minHeight = 40; // 最小高度
      const maxHeight = 200; // 最大高度

      const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
      textarea.style.height = newHeight + "px";
    },

    // 处理textarea输入事件
    handleTextareaInput(event) {
      this.autoResizeTextarea(event.target);
    },

    // 判断是否为数字字段
    isNumberField(prop) {
      const rule = this.rules[prop];
      if (!rule) return false;

      // 检查是否有数字相关的校验规则
      if (rule.validator && typeof rule.validator === "function") {
        // 通过校验器名称或注释来判断
        const validatorStr = rule.validator.toString().toLowerCase();
        if (
          validatorStr.includes("parseint") ||
          validatorStr.includes("isnan") ||
          validatorStr.includes("数字") ||
          validatorStr.includes("number")
        ) {
          return true;
        }
      }

      // 检查是否有数字相关的pattern
      if (rule.pattern && /^\d+$/.test(rule.pattern)) {
        return true;
      }

      return false;
    },

    // 处理失去焦点
    handleBlur(row, column, rowIndex) {
      const prop = column.property;
      if (!prop) return;

      // 清除当前编辑状态
      this.editingCell = null;

      // 校验数据
      this.validateCell(row, prop);

      // 触发数据变化事件
      this.$emit("cell-change", {
        row,
        prop,
        value: row[prop],
        rowIndex,
      });
    },

    // 处理取消编辑
    handleCancel(row, column, rowIndex) {
      const prop = column.property;
      if (!prop) return;

      // 恢复原始值
      row[prop] = this.originalValue;
      this.editingCell = null;
      this.originalValue = null;
    },

    // 校验单元格
    validateCell(row, prop) {
      const rules = this.rules[prop];
      if (!rules) return true;

      const value = row[prop];
      let isValid = true;
      let errorMessage = "";

      // 必填校验
      if (rules.required && !value && value !== 0) {
        isValid = false;
        errorMessage =
          rules.required === true ? `${prop}不能为空` : rules.required;
      }

      // 长度校验
      if (
        isValid &&
        rules.minLength &&
        value &&
        value.length < rules.minLength
      ) {
        isValid = false;
        errorMessage =
          rules.minLength === true
            ? `${prop}长度不能少于${rules.minLength}位`
            : rules.minLength;
      }

      if (
        isValid &&
        rules.maxLength &&
        value &&
        value.length > rules.maxLength
      ) {
        isValid = false;
        errorMessage =
          rules.maxLength === true
            ? `${prop}长度不能超过${rules.maxLength}位`
            : rules.maxLength;
      }

      // 正则校验
      if (isValid && rules.pattern && value) {
        const regex = new RegExp(rules.pattern);
        if (!regex.test(value)) {
          isValid = false;
          errorMessage = rules.message || `${prop}格式不正确`;
        }
      }

      // 自定义校验函数
      if (isValid && rules.validator && typeof rules.validator === "function") {
        const result = rules.validator(value, row);
        if (result !== true) {
          isValid = false;
          errorMessage = result || `${prop}校验失败`;
        }
      }

      // 更新错误状态
      this.updateError(row, prop, isValid, errorMessage);

      return isValid;
    },

    // 更新错误信息
    updateError(row, prop, isValid, message) {
      // 移除旧的错误
      this.errors = this.errors.filter(
        (error) =>
          !(
            error.rowIndex === this.tableData.indexOf(row) &&
            error.prop === prop
          )
      );

      // 添加新的错误
      if (!isValid) {
        this.errors.push({
          id: `${this.tableData.indexOf(row)}-${prop}`,
          rowIndex: this.tableData.indexOf(row),
          prop,
          message,
          timestamp: Date.now(), // 添加时间戳确保唯一性
        });
      }
    },

    // 检查是否有错误
    hasError(row, prop) {
      return this.errors.some(
        (error) =>
          error.rowIndex === this.tableData.indexOf(row) && error.prop === prop
      );
    },

    // 检查是否正在编辑
    isEditing(row, column) {
      const rowIndex = this.tableData.indexOf(row);
      const prop = column.property;
      return (
        this.editingCell &&
        this.editingCell.rowIndex === rowIndex &&
        this.editingCell.prop === prop
      );
    },

    // 添加行
    handleAddRow() {
      const newRow = {};
      this.columns.forEach((column) => {
        if (column.prop) {
          if (column.prop === "id") {
            newRow[column.prop] = this.nextId;
          } else {
            newRow[column.prop] = column.defaultValue || "";
          }
        }
      });
      this.tableData.push(newRow);
      this.nextId++; // 递增ID
      this.$emit("row-add", newRow);
    },

    // 编辑行
    handleEdit(index, row) {
      this.editingRowIndex = index;
      this.editFormData = JSON.parse(JSON.stringify(row));
      this.editColumns = this.columns; // 显示所有列，包括不可编辑的
      this.editFormRules = this.generateEditFormRules();
      this.editDialogVisible = true;
    },

    // 生成编辑表单校验规则
    generateEditFormRules() {
      const rules = {};
      this.editColumns.forEach((column) => {
        const prop = column.prop;
        const rule = this.rules[prop];
        if (rule) {
          rules[prop] = [];

          // 必填校验
          if (rule.required) {
            rules[prop].push({
              required: true,
              message: `${column.label}不能为空`,
              trigger: "blur",
            });
          }

          // 长度校验
          if (rule.minLength) {
            rules[prop].push({
              min: rule.minLength,
              message: `${column.label}长度不能少于${rule.minLength}位`,
              trigger: "blur",
            });
          }

          if (rule.maxLength) {
            rules[prop].push({
              max: rule.maxLength,
              message: `${column.label}长度不能超过${rule.maxLength}位`,
              trigger: "blur",
            });
          }

          // 正则校验
          if (rule.pattern) {
            try {
              rules[prop].push({
                pattern: new RegExp(rule.pattern),
                message: rule.message || `${column.label}格式不正确`,
                trigger: "blur",
              });
            } catch (error) {
              console.warn(`正则表达式错误: ${rule.pattern}`, error);
            }
          }
        }
      });
      return rules;
    },

    // 关闭编辑弹框
    handleCloseEditDialog() {
      this.editDialogVisible = false;
      this.editFormData = {};
      this.editColumns = [];
      this.editFormRules = {};
      this.editingRowIndex = -1;
    },

    // 保存编辑
    handleSaveEdit() {
      console.log("保存编辑被调用");
      console.log("editFormData:", this.editFormData);
      console.log("editingRowIndex:", this.editingRowIndex);

      // 直接更新数据，跳过复杂的表单验证
      if (this.editingRowIndex >= 0 && this.editFormData) {
        // 更新表格数据
        Object.assign(this.tableData[this.editingRowIndex], this.editFormData);

        // 触发编辑事件
        this.$emit("row-edit", {
          index: this.editingRowIndex,
          row: this.tableData[this.editingRowIndex],
        });

        this.$message.success("编辑成功");
        this.handleCloseEditDialog();
      } else {
        this.$message.error("编辑数据无效");
      }
    },

    // 删除行
    handleDelete(index, row) {
      this.$confirm("确认删除这一行吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.tableData.splice(index, 1);
          // 重新排序ID
          this.reorderIds();
          // 重新计算下一个ID值
          this.calculateNextId();
          this.$emit("row-delete", { index, row });
          this.$message.success("删除成功");
        })
        .catch(() => {
          // 取消删除
        });
    },

    // 获取表格数据
    getTableData() {
      return this.tableData;
    },

    // 校验所有数据
    validateAll() {
      let isValid = true;
      this.tableData.forEach((row, rowIndex) => {
        this.columns.forEach((column) => {
          if (column.prop && column.editable !== false) {
            if (!this.validateCell(row, column.prop)) {
              isValid = false;
            }
          }
        });
      });
      return isValid;
    },

    // 清除所有错误
    clearErrors() {
      this.errors = [];
    },

    // 重新排序ID
    reorderIds() {
      this.tableData.forEach((row, index) => {
        row.id = index + 1;
      });
    },

    // 计算下一个ID值
    calculateNextId() {
      if (this.tableData.length === 0) {
        this.nextId = 1;
        return;
      }

      const maxId = Math.max(
        ...this.tableData.map((row) => {
          const id = row.id;
          return typeof id === "number" ? id : 0;
        })
      );

      this.nextId = maxId + 1;
    },
  },
};
</script>

<style scoped>
.editable-table {
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100px);
  min-height: 500px;
  max-height: calc(100vh - 100px);
}

.table-container {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 0;
  max-height: calc(100vh - 200px);
}

.editable-table ::v-deep .el-table {
  border-collapse: collapse;
}

.editable-table ::v-deep .el-table__body {
  border-collapse: collapse;
}

.editable-table ::v-deep .el-table__body td {
  padding: 0 !important;
  border: 1px solid #ebeef5;
  position: relative;
  height: 40px;
  vertical-align: middle;
  overflow: hidden;
}

.editable-table ::v-deep .el-table__body td .cell {
  padding: 0 !important;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.editable-table ::v-deep .el-table th {
  padding: 8px 12px !important;
}

.editable-table ::v-deep .el-table td {
  padding: 0 !important;
  position: relative;
  height: 40px;
  vertical-align: middle;
}

.editable-table ::v-deep .el-table .cell {
  padding: 0 !important;
  height: 100%;
  position: relative;
}

.editable-table ::v-deep .el-table {
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;
  table-layout: fixed;
  width: 100%;
}

.editable-table ::v-deep .el-table__body-wrapper {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 0;
}

.editable-table ::v-deep .el-table__header-wrapper {
  overflow-x: hidden;
}

.editable-table ::v-deep .el-table__fixed-header-wrapper {
  overflow-x: hidden;
}

.editable-table ::v-deep .el-table__fixed-body-wrapper {
  overflow-x: hidden;
}

.editable-table ::v-deep .el-table__fixed-right {
  overflow-x: hidden;
}

.editable-table ::v-deep .el-table__fixed-right-patch {
  overflow-x: hidden;
}

.editable-cell {
  position: relative;
  min-height: 40px;
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.cell-input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: inherit;
  font-family: inherit;
  padding: 8px 12px;
  margin: 0;
  box-sizing: border-box;
  position: absolute;
  inset: 0;
  min-height: 40px;
  z-index: 100;
  display: block;
  transition: all 0.2s ease;
  border-radius: 0;
}

/* 数字输入框特殊样式 */
.cell-input[type="number"] {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: inherit;
  font-family: inherit;
  padding: 8px 12px;
  margin: 0;
  box-sizing: border-box;
  position: absolute;
  inset: 0;
  min-height: 40px;
  z-index: 100;
  display: block;
  -moz-appearance: textfield; /* Firefox */
}

/* 隐藏数字输入框的上下箭头 */
.cell-input[type="number"]::-webkit-outer-spin-button,
.cell-input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.cell-input:focus {
  background: #f0f9ff !important;
  border: 1px solid #409eff !important;
  border-radius: 0 !important;
  z-index: 10;
  outline: none !important;
  box-shadow: none !important;
  padding: 8px 12px !important;
}

/* 数字输入框焦点样式 */
.cell-input[type="number"]:focus {
  background: #f0f9ff !important;
  border: 1px solid #409eff !important;
  border-radius: 0 !important;
  z-index: 10;
  outline: none !important;
  box-shadow: none !important;
  padding: 8px 12px !important;
  -moz-appearance: textfield !important; /* Firefox */
}

.cell-input.error {
  border: 1px solid #f56c6c;
  background: #fef0f0;
}

.cell-textarea {
  width: 100%;
  min-height: 40px;
  border: none;
  outline: none;
  background: transparent;
  font-size: inherit;
  font-family: inherit;
  padding: 8px 12px;
  margin: 0;
  box-sizing: border-box;
  resize: none;
  overflow: hidden;
  line-height: 1.5;
  z-index: 100;
  display: block;
  transition: all 0.2s ease;
  border-radius: 0;
}

.cell-textarea:focus {
  background: #f0f9ff !important;
  border: 1px solid #409eff !important;
  border-radius: 0 !important;
  z-index: 10;
  outline: none !important;
  box-shadow: none !important;
  padding: 8px 12px !important;
}

.cell-textarea.error {
  border: 1px solid #f56c6c;
  background: #fef0f0;
}

.cell-text {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 40px;
  line-height: 1.5;
  padding: 8px 12px;
  box-sizing: border-box;
}

.cell-text.error {
  color: #f56c6c;
  background: #fef0f0;
  padding: 2px 4px;
  border-radius: 2px;
}

.non-editable-cell {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 40px;
  line-height: 1.5;
  padding: 8px 12px;
  box-sizing: border-box;
  justify-content: center;
}

.table-actions {
  margin-top: 16px;
  text-align: center;
  flex-shrink: 0;
  background: #fff;
  padding: 16px 0;
  border-top: 1px solid #ebeef5;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  min-width: 120px;
}

.error-messages {
  margin-top: 16px;
  border: 1px solid #f56c6c;
  border-radius: 4px;
  background: #fef0f0;
  padding: 12px;
  flex-shrink: 0;
  background: #fff;
  border-top: 1px solid #ebeef5;
  position: fixed;
  bottom: 80px;
  left: 20px;
  right: 20px;
  z-index: 999;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
}

.error-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  color: #f56c6c;
  font-weight: bold;
}

.error-header i {
  margin-right: 8px;
  font-size: 16px;
}

.error-alert {
  margin-bottom: 8px;
  border: none;
  background: transparent;
}

.error-alert:last-child {
  margin-bottom: 0;
}

.action-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 100%;
  height: 100%;
  min-height: 40px;
  padding: 4px;
  box-sizing: border-box;
}

.action-buttons .el-button {
  flex: 1;
  margin: 0;
  min-width: 50px;
}

/* 编辑弹框圆角样式 */
.editable-table ::v-deep .el-dialog {
  border-radius: 12px;
  overflow: hidden;
}

.editable-table ::v-deep .el-dialog__header {
  border-radius: 12px 12px 0 0;
  background: #f8f9fa;
  padding: 20px 24px;
  border-bottom: 1px solid #e9ecef;
}

.editable-table ::v-deep .el-dialog__title {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
}

.editable-table ::v-deep .el-dialog__body {
  padding: 24px;
  border-radius: 0;
}

.editable-table ::v-deep .el-dialog__footer {
  border-radius: 0 0 12px 12px;
  background: #f8f9fa;
  padding: 16px 24px;
  border-top: 1px solid #e9ecef;
  text-align: right;
}

.editable-table ::v-deep .el-dialog__footer .el-button {
  border-radius: 6px;
  padding: 8px 20px;
  font-weight: 500;
}

.editable-table ::v-deep .el-dialog__footer .el-button--primary {
  background: #409eff;
  border-color: #409eff;
}

.editable-table ::v-deep .el-dialog__footer .el-button--primary:hover {
  background: #66b1ff;
  border-color: #66b1ff;
}
</style>
