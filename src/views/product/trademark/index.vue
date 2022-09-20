<template>
  <el-card>
    <el-button type="primary" :icon="Plus" class="mb-20">添加</el-button>
    <!-- 表格部分开始 -->
    <el-table :data="trdemarkList" border>
      <el-table-column type="index" label="序号" width="80" align="center" />
      <el-table-column label="品牌名称" prop="tmName" />
      <el-table-column label="品牌LOGO">
        <!-- 
           要渲染其他结构，需要使用默认插槽,作用域插槽，可以得到渲染的每条数据（第一行渲染就是数组第一条数据)
         -->
        <template #default="{ row }">
          <img :src="row.logoUrl" class="logoImg" :alt="row.tmName" />
        </template>
      </el-table-column>
      <el-table-column width="180" label="操作">
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
import { onMounted, ref } from "vue";
//品牌管理相关的接口函数
import { reqGetTrademarkList } from "@/api/product/trdemark";
import type { trademarkList } from "@/api/product/modules/trademarkModel";
/*****************************************分页器相关*************************************** */
const currentPage = ref(1); //当前页
const pageSize = ref(3); //每页记录数
//品牌分页列表数据
const trdemarkList = ref<trademarkList>([]);
onMounted(async () => {
  //发送请求获取数据
  const res = await reqGetTrademarkList(currentPage.value, pageSize.value);
  trdemarkList.value = res.records;
});
//每页显示条目个数变化触发的事件回调
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};
//当前页变化触发的事件回调
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};
/*****************************************分页器相关*************************************** */
</script>

<style scoped>
.options-btn {
  width: 30px;
  height: 25px;
}
.logoImg {
  width: 100px;
  height: 70px;
}
</style>
