<template>
  <div class="app-container">


    <el-table v-loading="loading" :data="todoList" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"/>

      <el-table-column label="船名" align="center" prop="tugFeeVo.shipName" :show-overflow-tooltip="true"/>
      <el-table-column label="总长" align="center" prop="tugFeeVo.length" :show-overflow-tooltip="true"/>
      <el-table-column label="船舶类型" align="center" prop="tugFeeVo.shipType" :show-overflow-tooltip="true"/>
      <el-table-column label="任务节点" align="center" prop="taskName"/>
      <el-table-column label="计费员" align="center" prop="tugFeeVo.caculator.userName"/>
      <el-table-column label="复核员" align="center" prop="tugFeeVo.reviewer.userName"/>
      <el-table-column label="计算费用" align="center" prop="tugFeeVo.caculateAmount"/>
      <el-table-column label="实际费用" align="center" prop="tugFeeVo.amount"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit-outline"
            @click="handleProcess(scope.row)"
          >处理
          </el-button>
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
  import {
    todoList,
    complete,
    returnList,
    returnTask,
    rejectTask,
    getDeployment,
    delDeployment,
    exportDeployment
  } from "@/api/flowable/todo"

  export default {
    name: "daiban",
    components: {},
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
        // 流程待办任务表格数据
        todoList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          name: null,
          category: null,
          ship_name:null
        },
        // 表单参数
        form: {},
        // 表单校验
        rules: {}
      };
    },
    created() {
      this.getList();
    },
    methods: {
      /** 查询流程定义列表 */
      getList() {
        this.loading = true;
        todoList(this.queryParams).then(response => {
          this.todoList = response.data.records;
          this.total = response.data.total;
          this.loading = false;
        });
      },
      // 跳转到处理页面
      handleProcess(row){
        this.$router.push({ path: '/flowable/task/record/index',
          query: {
            procInsId: row.procInsId,
            executionId: row.executionId,
            deployId: row.deployId,
            taskId: row.taskId,
            finished: true,
            taskName:row.taskName
          }})
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
        this.single = selection.length !== 1
        this.multiple = !selection.length
      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset();
        this.open = true;
        this.title = "添加流程定义";
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
      /** 删除按钮操作 */
      handleDelete(row) {
        const ids = row.id || this.ids;
        this.$confirm('是否确认删除流程定义编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          return delDeployment(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
      },
      /** 导出按钮操作 */
      handleExport() {
        const queryParams = this.queryParams;
        this.$confirm('是否确认导出所有流程定义数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          return exportDeployment(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
      }
    }
  };
</script>

