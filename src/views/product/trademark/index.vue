<template>
  <el-card>
    <el-button type="primary" :icon="Plus" class="mb-20">添加</el-button>
    <!-- 表格部分开始 -->
    <el-table :data="[{}]" border>
      <el-table-column type="index" label="序号" width="60" align="center" />
      <el-table-column label="品牌名称" width="180" />
      <el-table-column label="品牌LOGO" />
      <el-table-column width="120" label="操作">
        <el-button :icon="Edit" class="options-btn" type="warning"></el-button>
        <el-button :icon="Delete" class="options-btn" type="danger"></el-button>
      </el-table-column>
    </el-table>
    <!-- 表格部分结束 -->
    <!-- 分页器开始 -->
    <!-- 
        layout:布局方式
            prev,next 上一页下一页
            pager:分页序号
            jumper:前往的页数
            sizes:每页大小
            total:数据总条数
     -->
    <el-pagination
      class="mt-20"
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[3, 6, 9, 12]"
      layout="prev,pager,next,jumper,->,sizes ,total "
      :total="100"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- 分页器结束 -->
  </el-card>
</template>

<script lang="ts">
export default {
  name: "JTrademark",
};
</script>

<script lang="ts" setup>
import { Plus, Edit, Delete } from "@element-plus/icons-vue";
import { ref } from "vue";

const currentPage = ref(4); //当前页
const pageSize = ref(100); //每页大小

//每页显示条目个数变化触发的事件回调
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};
//当前页变化触发的事件回调
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};
</script>

<style scoped>
.options-btn {
  width: 30px;
  height: 25px;
}
</style>
