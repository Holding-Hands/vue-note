<template>
  <el-table
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%"
    height="400"
    size="small"
    :show-header="true"
    :highlight-current-row="true"
    :show-summary="true"
    :lazy="true"
    :tooltip="true"
    :tooltip-effect="'dark'"
    :header-row-style="{
        background: '#2d2d2d',
        border: 'none',
        color: '#3b85ff',
        height: '45px'
      }"
  >
<!--    :cell-class-name="tableRowClassName"-->
<!--    :cell-style="cell"-->
    <!--    <el-table-column label="发布应急预案" prop="name"></el-table-column>-->
    <el-table-column
      label="发布应急预案"
      :cell-style="'text-align:center;'"
    >
      <template slot-scope="scope">
        <el-radio v-model="radio" label="1">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </el-radio>
      </template>
    </el-table-column>

    <el-table-column
      align="right">
      <template slot="header">
        <el-input
          class="search"
          size="mini"
          v-model="search"
          suffix-icon="el-icon-search"
          placeholder="请输入应急预案"
        />
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        radio: '',
        tableData: [
          {name: '李虎'},
          {name: '王小二'},
          {name: '王小三'},
          {name: '王小三'},
          {name: '王小三'},
          {name: '王小三'},
          {name: '王小三'},
          {name: '王小三'},
          {name: '王小三'},
          {name: '王小虎'}],
        search: ''
      }
    },
    methods: {
      aaa(row, column, rowIndex, columnIndex) {
        console.log(1111)
        console.log(row, column, rowIndex, columnIndex)
      },
      headerStyle({row, column, rowIndex, columnIndex}) {
        return 'tableStyle'
      },
      cell({row, column, rowIndex, columnIndex}) {
        //第八列添加 red 类
        if (columnIndex % 2 !== 1) {
          return {
            background: 'red',
            opacity: .5
        }
        }
      },
      tableRowClassName({ row, rowIndex }) {
        if (rowIndex % 2 !== 1) {
          return 'success-row';
        }
        return 'warning-row';
      },
    }
  }
</script>

<style>
  .has-gutter {
    font-size: 16px;
    background: #3a8ee6;
  }

  .headerStyle,
  .tableStyle {
    background: cyan !important;
    color: #67C23A;
  }
  .red{
    background: red;
    opacity: .5;
  }
  .success-row {
    background: #2d2d2d;
  }

  .warning-row {
    background: cyan;
  }
</style>
