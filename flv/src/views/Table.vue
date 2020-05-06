<template>
  <el-table
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%"
    :height="'200px'">
    <!--    <el-table-column label="发布应急预案" prop="name"></el-table-column>-->
    <el-table-column
      label="发布应急预案"
      :cell-style="'text-align:center;'"
      :header-cell-style="aaa">
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
          {name: '王小虎'}],
        search: ''
      }
    },
    methods: {
      aaa({row, column, rowIndex, columnIndex}) {
        console.log(1111)
      },
    }
  }
</script>

<style>
  .has-gutter {
    font-size: 16px;
    background: #3a8ee6;
  }
</style>
