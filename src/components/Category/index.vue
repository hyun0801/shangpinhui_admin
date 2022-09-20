<template>
  <el-card>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select placeholder="一级分类" v-model="category1Id">
          <el-option v-for="c1 in categoryList1" :key="c1.id" :label="c1.name" :value="c1.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select placeholder="二级分类" v-model="category2Id">
          <el-option v-for="c2 in categoryList2" :key="c2.id" :label="c2.name" :value="c2.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select placeholder="三级分类" v-model="category3Id">
          <el-option v-for="c3 in categoryList3" :key="c3.id" :label="c3.name" :value="c3.id" />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
export default {
  name: "JCategory",
};
</script>

<script lang="ts" setup>
import { reqGetCategoryList1, reqGetCategoryList2, reqGetCategoryList3 } from "@/api/product/category";
import type { CategoryList } from "@/api/product/modules/categoryModel";
import { ref, onMounted, watch } from "vue";
//一级分类的Id
const category1Id = ref();
//二级分类的Id
const category2Id = ref();
//三级分类的Id
const category3Id = ref();
//定义一级分类导航数据
const categoryList1 = ref<CategoryList>([]);
//定义二级分类导航数据
const categoryList2 = ref<CategoryList>([]);
//定义三级分类导航数据
const categoryList3 = ref<CategoryList>([]);
//组件挂载完毕的时候获取一级分类导航
onMounted(async () => {
  categoryList1.value = await reqGetCategoryList1();
});
//当一级分类导航的数据发生变化时请求二级分类导航的数据
watch(category1Id, async (newVal: number) => {
  categoryList2.value = await reqGetCategoryList2(newVal);
  //当一级导航的id变化时清空二三级导航的数据
  category1Id.value = newVal; //重新设置一级分类的id
  category2Id.value = undefined;
  category3Id.value = undefined;
  categoryList3.value = [];
});
//当二级分类导航的数据发生变化时请求三级分类导航的数据
watch(category2Id, async (newVal: number) => {
  if (!newVal) return;
  categoryList3.value = await reqGetCategoryList3(newVal);
  //当二级导航id变化时,清空三级导航的数据
  category2Id.value = newVal; //重新设置二级分类的id
  category3Id.value = undefined;
});
</script>

<style scoped></style>
