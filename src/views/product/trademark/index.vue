<template>
  <el-card>
    <el-button type="primary" :icon="Plus" class="mb-20" @click="dialogFormVisible = true">添加品牌</el-button>
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
    <!-- 模态框部分开始 -->
    <el-dialog v-model="dialogFormVisible" title="添加品牌">
      <el-form label-width="100px" ref="trademarkFormRef" :model="form" :rules="rules">
        <el-form-item label="品牌名称" prop="tmName">
          <el-input class="trademark-input" v-model="form.tmName" />
        </el-form-item>
        <el-form-item label="品牌LOGO" prop="logoUrl">
          <!-- 
                模态框属性介绍
                    action:提交的目标服务器地址
                    show-file-list:是否显示已上传文件列表	
                    on-success:图片上传成功后触发的回调函数
                    before-upload:上传图片前触发的回调函数(做表单校验)
             -->
          <el-upload
            class="avatar-uploader"
            :action="`${UPLOAD_URL_PREFIX}/admin/product/fileUpload`"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.logoUrl" :src="form.logoUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            <template #tip>
              <div class="el-upload__tip">只能上传jpg/png文件，且不超过50kb</div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="addTrademark">确认</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 模态框部分结束 -->
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
      :total="total"
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
import { onMounted, ref, reactive } from "vue";
import { ElMessage, type UploadProps, type FormInstance } from "element-plus";
//品牌管理相关的接口函数
import { reqGetTrademarkList, reqAddTrademarkList } from "@/api/product/trdemark";
import type { trademarkList } from "@/api/product/modules/trademarkModel";
/*****************************************分页器相关*************************************** */
const currentPage = ref(1); //当前页
const pageSize = ref(3); //每页记录数
const total = ref(0); //数据总条数
//品牌分页列表数据
const trdemarkList = ref<trademarkList>([]);
//优化多次请求,封装发送请求的函数
const getTrademarkList = async () => {
  const res = await reqGetTrademarkList(currentPage.value, pageSize.value);
  trdemarkList.value = res.records;
  total.value = res.total;
  ElMessage.success("获取品牌分页列表成功");
};
onMounted(async () => {
  //发送请求获取数据
  getTrademarkList();
});
//每页显示条目个数(pageSize)变化触发的事件回调(默认接收到变化后数据页码)
const handleSizeChange = async (val: number) => {
  //发送请求获取数据
  pageSize.value = val;
  getTrademarkList();
};
//当前页变化触发的事件回调(默认接收到变化后数据页码)
const handleCurrentChange = async (val: number) => {
  //发送请求获取数据
  currentPage.value = val;
  getTrademarkList();
};
/*****************************************分页器相关*************************************** */
/*****************************************模态框相关*************************************** */
const dialogFormVisible = ref(false); //是否显示 Dialog
// const imageUrl = ref(""); //图片地址
//定义可上传图片的类型
const imagesTypeList = ["image/jpeg", "image/jpg", "image/png"];
//图片提交的地址
const UPLOAD_URL_PREFIX = import.meta.env.VITE_API_URL;
//获取表单组件实例对象
const trademarkFormRef = ref<FormInstance>();
//表单校验规则
const rules = reactive({
  tmName: [
    { required: true, message: "请输入品牌名称", trigger: "blur" },
    { min: 2, max: 20, message: "品牌名称应为两个字以上", trigger: "blur" },
  ],
  logoUrl: [{ required: true, message: "请上传品牌logo", trigger: "blur" }],
});
//表单数据
const form = reactive({
  tmName: "", //品牌名称
  logoUrl: "", //图片地址
});
//图片上传成功后触发的回调函数
const handleAvatarSuccess: UploadProps["onSuccess"] = (response) => {
  form.logoUrl = response.data;
  //   console.log(imageUrl.value);
  ElMessage.success("上传成功");
  //图片上传成功清空表单校验
  trademarkFormRef.value?.clearValidate(["logoUrl"]);
};
//上传文件之前的钩子，参数为上传的文件， 若返回false或者返回 Promise 且被 reject，则停止上传。
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  //   console.log(rawFile.type); //image/jpeg
  if (!imagesTypeList.includes(rawFile.type)) {
    ElMessage.error("只能上传jpg/png文件");
    return false;
  } else if (rawFile.size / 1024 > 50) {
    ElMessage.error("您上传的图片大小已经超过50kb!请重新上传");
    return false;
  }
  return true;
};
//添加品牌的事件回调
const addTrademark = () => {
  //对整个表单的内容进行验证。
  trademarkFormRef.value?.validate(async (valid) => {
    // valid为true，代表表单校验通过
    if (valid) {
      //   console.log("表单校验通过");
      const { logoUrl, tmName } = form;
      //表单校验通过后,发送请求添加品牌
      await reqAddTrademarkList(logoUrl, tmName);
      // 清空表单数据
      trademarkFormRef.value?.resetFields();
      ElMessage.success("添加成功");
      //添加成功后,关闭模态框
      dialogFormVisible.value = false;
    }
  });
};
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
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.trademark-input {
  width: 70%;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
