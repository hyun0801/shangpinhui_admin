<template>
  <div>
    <Categoty></Categoty>
    <el-card class="mt-20">
      <el-button type="primary" :icon="Plus">添加属性</el-button>
      <el-table :data="tableData" stripe style="width: 100%" class="mt-20">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="warning" :icon="Edit" class="options-btn"></el-button>
            <el-button type="danger" :icon="Delete" class="options-btn"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
export default {
  name: "JAttr",
};
</script>

<script lang="ts" setup>
import Categoty from "@/components/Category/index.vue";
import { Delete, Edit, Plus } from "@element-plus/icons-vue";
const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];
</script>

<style scoped>
.options-btn {
  width: 30px;
  height: 25px;
}
</style>
