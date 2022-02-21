export const ruleForm = {
  data() {
    return {
      centerDialogVisible: false,
      ruleForm: {
        author: "",
        display_time: "",
        pageviews: "",
        status: "",
        title: ""
      },
      rules: {
        title: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        author: [{ required: true, message: "请输入作者", trigger: "blur" }],
        pageviews: [{ required: true, message: "请输入页码", trigger: "blur" }],

        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        display_time: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    // 确认编辑
    handleEnterEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.pageInfo.page = 1;
          this.fetchData();
          this.$message.success("保存成功");
          this.centerDialogVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 取消
    handleCancelEdit(formName) {
      this.$refs[formName].resetFields();
      this.centerDialogVisible = false;
    }
  }
};
