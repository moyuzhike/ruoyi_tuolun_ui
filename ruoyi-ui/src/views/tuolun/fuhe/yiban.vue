<template>
  <div class="app-container">
<!--    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">-->
<!--      <el-form-item label="名称" prop="name">-->
<!--        <el-input-->
<!--          v-model="queryParams.name"-->
<!--          placeholder="请输入名称"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="开始时间" prop="deployTime">-->
<!--        <el-date-picker clearable size="small"-->
<!--                        v-model="queryParams.deployTime"-->
<!--                        type="date"-->
<!--                        value-format="yyyy-MM-dd"-->
<!--                        placeholder="选择时间">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->
<!--      <el-form-item>-->
<!--        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>-->
<!--        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>-->
<!--      </el-form-item>-->
<!--    </el-form>-->

<!--    <el-row :gutter="10" class="mb8">-->
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="danger"-->
<!--          plain-->
<!--          icon="el-icon-delete"-->
<!--          size="mini"-->
<!--          :disabled="multiple"-->
<!--          @click="handleDelete"-->
<!--          v-hasPermi="['system:deployment:remove']"-->
<!--        >删除</el-button>-->
<!--      </el-col>-->
<!--      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>-->
<!--    </el-row>-->

    <el-table v-loading="loading" :data="finishedList" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="船名" align="center" prop="tugFeeVo.shipName" :show-overflow-tooltip="true"/>
      <el-table-column label="总长(单位:米)" align="center" prop="tugFeeVo.length" />
      <el-table-column label="船舶类型" align="center" prop="tugFeeVo.shipType" />
      <el-table-column label="任务节点" align="center" prop="taskName" width="180"/>
      <el-table-column label="工作内容" align="center" prop="tugFeeVo.workType" :show-overflow-tooltip="true"/>
      <el-table-column label="拖轮数" align="center" prop="tugFeeVo.tugNum" :show-overflow-tooltip="true"/>
      <el-table-column label="工作地点" align="center" prop="tugFeeVo.workPlace" :show-overflow-tooltip="true"/>
      <el-table-column label="工作时间" align="center" prop="tugFeeVo.workTime" width="180"/>
      <el-table-column label="审批时间" align="center" prop="tugFeeVo.reviewTime" width="180"/>


      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-tickets"
            @click="handleFlowRecord(scope.row)"
          >流转记录</el-button>

        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
  import { finishedList, getDeployment, delDeployment, addDeployment, updateDeployment, exportDeployment } from "@/api/flowable/finished";

  export default {
    name: "Deploy",
    components: {
    },
    data() {
      return {
        // 遮罩层
        loading: true,
        // 选中数组
        ids: [],
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 显示搜索条件
        showSearch: true,
        // 总条数
        total: 0,
        // 已办任务列表数据
        finishedList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        src: "",
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          name: null,
          category: null,
          key: null,
          tenantId: null,
          deployTime: null,
          derivedFrom: null,
          derivedFromRoot: null,
          parentDeploymentId: null,
          engineVersion: null
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {
        }
      };
    },
    created() {
      this.getList();
    },
    methods: {
      /** 查询流程定义列表 */
      getList() {
        this.loading = true;
        finishedList(this.queryParams).then(response => {
          this.finishedList = response.data.records;
          this.total = response.data.total;
          this.loading = false;
        });
      },
      // 取消按钮
      cancel() {
        this.open = false;
        this.reset();
      },
      // 表单重置
      reset() {
        this.form = {
          id: null,
          name: null,
          category: null,
          key: null,
          tenantId: null,
          deployTime: null,
          derivedFrom: null,
          derivedFromRoot: null,
          parentDeploymentId: null,
          engineVersion: null
        };
        this.resetForm("form");
      },
      setIcon(val){
        if (val){
          return "el-icon-check";
        }else {
          return "el-icon-time";
        }

      },
      setColor(val){
        if (val){
          return "#2bc418";
        }else {
          return "#b3bdbb";
        }

      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1;
        this.getList();
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.resetForm("queryForm");
        this.handleQuery();
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
        this.ids = selection.map(item => item.id)
        this.single = selection.length!==1
        this.multiple = !selection.length
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset();
        this.open = true;
        this.title = "添加流程定义";
      },
      /** 流程流转记录 */
      handleFlowRecord(row){
        this.$router.push({ path: '/flowable/task/record/index',
          query: {
            procInsId: row.procInsId,
            deployId: row.deployId,
            taskId: row.taskId,
            finished: false
          }})
      },

      /** 修改按钮操作 */
      handleUpdate(row) {
        this.reset();
        const id = row.id || this.ids
        getDeployment(id).then(response => {
          this.form = response.data;
          this.open = true;
          this.title = "修改流程定义";
        });
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              updateDeployment(this.form).then(response => {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              });
            } else {
              addDeployment(this.form).then(response => {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              });
            }
          }
        });
      },
      /** 删除按钮操作 */
      handleDelete(row) {
        const ids = row.id || this.ids;
        this.$confirm('是否确认删除流程定义编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delDeployment(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
      },

    }
  };
</script>

