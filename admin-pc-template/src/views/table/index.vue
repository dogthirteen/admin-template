<template>
  <div class="app-container">
    <el-form :model="searchForm" ref="searchForm" class="search-from">
      <el-form-item label="活动名称" prop="name">
        <el-input
          v-model="searchForm.name"
          placeholder="请输入活动名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="活动区域" prop="region">
        <el-select v-model="searchForm.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-form-item prop="date1">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="searchForm.date1"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('searchForm')"
          >搜索</el-button
        >
        <el-button @click="resetForm('searchForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="Status"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{
            scope.row.status
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="Display_time"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time | parseTime("{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="操作"
        width="200"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button type="danger" size="small" @click="handleDel(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" class="margin-top20" justify="end">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageInfo.limit"
        :current-page="pageInfo.page"
        :total="pageInfo.total"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-row>

    <!-- 编辑弹框 -->
    <el-dialog
      title="编辑"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="edit-ruleForm"
      >
        <el-form-item label="名称:" prop="title">
          <el-col :span="18">
            <el-input
              v-model="ruleForm.title"
              placeholder="请输入名称"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="作者:" prop="author">
          <el-col :span="18">
            <el-input
              v-model="ruleForm.author"
              placeholder="请输入作者"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="页码:" prop="pageviews">
          <el-col :span="18">
            <el-input
              v-model="ruleForm.pageviews"
              placeholder="请输入页码"
            ></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="日期" required>
          <el-form-item prop="display_time">
            <el-col :span="18">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="ruleForm.display_time"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
          </el-form-item>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" class="margin-top20" @click="handleEnterEdit('ruleForm')"
            >保存</el-button
          >
          <el-button @click="handleCancelEdit('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { ruleForm } from "./mixins/ruleForm";
export default {
  mixins: [ruleForm],
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      list: [],
      searchForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      pageInfo: {
        page: 1,
        limit: 20,
        total: 100
      },
      listLoading: true
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    // 编辑操作
    handleEdit(item) {
      console.log(item);
      this.ruleForm = item;
      this.centerDialogVisible = true;
    },
    // 删除操作
    handleDel(item) {
      console.log(item);
      this.$confirm(`此操作将永久删除${item.title}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 搜索
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.pageInfo.page = 1;
          this.fetchData();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.pageInfo.page = 1;
      this.fetchData();
    },
    // 获取数据
    fetchData() {
      this.listLoading = true;
      let arr = [];
      for (let i = 1; i < 11; i++) {
        arr.push({
          author: "name",
          display_time: new Date(`1978-${i > 9 ? i : "0" + i}-18`),
          id: "810000199611158571",
          pageviews: 3850,
          status: i % 3 === 0 ? "draft" : i % 2 === 0 ? "published" : "deleted",
          title: `测试${
            i < 10 ? `${this.pageInfo.page - 1}${i}` : `${this.pageInfo.page}0`
          }`
        });
      }
      setTimeout(() => {
        this.list = arr;
        this.listLoading = false;
      }, 500);
    },
    // 切换页码
    handleCurrentChange(e) {
      this.pageInfo.page = e;
      this.fetchData();
    }
  }
};
</script>

<style lang="scss">
// 使用需要再外层定义一个唯一类目
.search-from {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  .el-form-item {
    display: flex;
    margin-right: 30px;
    &:nth-last-of-type(1) {
      margin-left: 0;
    }
  }
}
.edit-ruleForm{
  margin: 0 auto;
}
</style>

<style lang="scss" scoped>
//  scoped 使用 可避免污染全局样式
.margin-top20 {
  margin-top: 20px;
}
</style>
