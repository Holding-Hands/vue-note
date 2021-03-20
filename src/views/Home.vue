<template>
  <div id="emergency-plan">
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      :height="'300px'"
      :show-header="false"
    >
      <el-table-column
        label="发布应急预案"
        class="title">
        <template slot-scope="scope">
          <el-radio v-model="radio" label="1">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </el-radio>
        </template>
      </el-table-column>
      <el-table-column
      >
        <!--        <template slot="header"-->
        <!--        :align="'center'">-->
        <!--          <el-input-->
        <!--            class="search"-->
        <!--            size="medium"-->
        <!--            v-model="search"-->
        <!--            suffix-icon="el-icon-search"-->
        <!--          />-->
        <!--        </template>-->
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'EmergencyPlan',
    data() {
      return {
        search: '',
        radio: '',
        tableData: [
          { name: '李虎' },
          { name: '王小二' },
          { name: '王小三' },
          { name: '王小虎' },
          { name: '王小虎' },
          { name: '王小虎' },
          { name: '王小虎' },
          { name: '王小虎' },
          { name: '王小虎' },
          { name: '王小虎' },
          { name: '王小虎' },
          { name: '王小虎' },
          { name: '王小虎' },
          { name: '王小虎' },
          { name: '王小虎' },
          { name: '王小虎' },
          { name: '王小虎' },
          { name: '王小虎' },
          { name: '王小虎' },
          { name: '王小虎' },
          { name: '王小虎' },
          { name: '王小虎' }]
      };
    }
  };
</script>

<style scoped lang="less">
  #emergency-plan {
    /*@import '../../../styles/common.scss';*/
    width: 300px;
    height: 500px;
    background: #f5f5f5;
    position: fixed;
    right: 312px;
    top: 174px;
    border-radius: 10px;
  }
  .title {
    width: 100%;
    line-height: 50px;
    position: relative;
    z-index: 10;
    padding-left: 13px;
    color: #3b85ff;
    font-size: 16px;

    &::after {
      position: absolute;
      top: 16px;
      left: 0;
    }
  }
</style>
