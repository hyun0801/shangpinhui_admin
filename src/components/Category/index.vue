<template>
  <el-card>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select placeholder="一级分类">
          <el-option label="1" value="1" />
          <el-option label="2" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select placeholder="二级分类">
          <el-option label="1" value="1" />
          <el-option label="2" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select placeholder="三级分类">
          <el-option label="1" value="1" />
          <el-option label="2" value="2" />
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

<script lang="ts" setup></script>

<style scoped></style>
