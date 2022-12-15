<template>
  <div class="app-container">

    <el-table v-loading="loading" :data="finishedList" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="船名" align="center" prop="shipName" :show-overflow-tooltip="true"/>
      <el-table-column label="总长" align="center" prop="length" :show-overflow-tooltip="true"/>
      <el-table-column label="船舶类型" align="center" prop="shipType" :show-overflow-tooltip="true"/>

      <el-table-column label="计费员" align="center" prop="caculator.userName" width="180"/>
      <el-table-column label="复核员" align="center" prop="reviewer.userName" width="180"/>

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-tickets"
            @click="showAccount(scope.row)"
          >查看账单</el-button>
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


    <el-dialog class="customWidth" v-on="$listeners"  :visible.sync="open"  width="80%">

    <h2>账单详情</h2>
    <table border="1" width="1000">
      <tr>
        <td width="100%" colspan="10">
          <span style="text-align: left">填单日期：{{tugFee.applicateTime}}</span>
          <span style="text-align: center">作业日:{{tugFee.workTime}}</span>
          <span style="text-align: right">编号：</span>
          <span style="text-align: right">NO：</span>
        </td>
      </tr>
      <tr>
        <td width="100%" colspan="10">
          <span>申请单位：船代公司</span>
          <span style="text-align: right">付费单位：船代公司</span>
        </td>
      </tr>

      <tr>
        <td width="10%" colspan="2" style="text-align: center">船名</td>
        <td width="10%" colspan="2">{{tugFee.shipName}}</td>
        <td width="10%" colspan="1" style="text-align: center">船舶类型</td>
        <td width="10%" colspan="1">{{tugFee.shipType}}</td>
        <td width="10%" colspan="1" style="text-align: center">船舶总长</td>
        <td width="10%" colspan="1">{{tugFee.length}}</td>
        <td width="10%" colspan="1" style="text-align: center">吃水</td>
        <td width="10%" colspan="1">{{tugFee.depth}}</td>
      </tr>


      <tr>
        <td colspan="2" style="text-align: center">作业时间</td>
        <td colspan="2" style="text-align: center">作业内容</td>
        <td colspan="2" style="text-align: center">作业地点</td>
        <td colspan="2" style="text-align: center">作业拖轮数</td>
        <td colspan="2" style="text-align: center">不含税金额</td>
      </tr>
      <tr>
        <td colspan="2">{{tugFee.workTime}}</td>
        <td colspan="2">{{tugFee.workType}}</td>
        <td colspan="2">{{tugFee.workPlace}}</td>
        <td colspan="2">{{tugFee.tugNum}}</td>
        <td colspan="2">{{tugFee.amount}}</td>
      </tr>

      <tr>
        <td colspan="1">价税合计</td>
        <td colspan="6" style="text-align: left">大写:{{ToString(tugFee.amount)}}</td>
        <td colspan="3" style="text-align: left">小写:{{tugFee.amount}}</td>
      </tr>
    </table>
</el-dialog>

  </div>
</template>

<script>
  import { myfinishedList, getDeployment, delDeployment, addDeployment, updateDeployment, exportDeployment } from "@/api/flowable/finished";

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
        },
        tugFee:{}
      };
    },
    created() {
      this.getList();
    },
    methods: {

      ToString(n) {

        if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)){
          return "数据非法";  //判断数据是否大于0
        }

        var unit = "千百拾亿千百拾万千百拾元角分", str = "";
        n += "00";
        var indexpoint = n.indexOf('.');  // 如果是小数，截取小数点前面的位数

        if (indexpoint >= 0){

          n = n.substring(0, indexpoint) + n.substr(indexpoint+1, 2);   // 若为小数，截取需要使用的unit单位
        }

        unit = unit.substr(unit.length - n.length);  // 若为整数，截取需要使用的unit单位
        for (var i=0; i < n.length; i++){
          str += "零壹贰叁肆伍陆柒捌玖".charAt(n.charAt(i)) + unit.charAt(i);  //遍历转化为大写的数字
        }

        return str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整"); // 替换掉数字里面的零字符，得到结果

      },


      /** 查询流程定义列表 */
      getList() {
        this.loading = true;
        // finishedList(this.queryParams).then(response => {
        //   this.finishedList = response.data.records;
        //   this.total = response.data.total;
        //   this.loading = false;
        // });
        myfinishedList(this.queryParams).then(response => {
            this.finishedList = response.data.records;
            this.total = response.data.total;
            this.loading = false;
        })
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




      showAccount(row){
        // this.$router.push({
        //   name:'account',
        //   path:'/tuolun/chuandai/account',//页面路劲 和上面名字任意一个都可以
        //   query: {flight: JSON.stringify(row)} // 参数传值
        // })

        this.open=true
        this.tugFee=row

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

<style scoped>
  /*.customWidth{*/
  /*  width: 100%!important;*/
  /*  height: 100%;*/
  /*}*/


   h2{
     margin:0 auto;
     text-align: center;
     width: 1000px;
   }
  table{
    border-collapse:collapse;
    text-align: center;
    margin: 0 auto;
  }
  table span{
    display: inline-block;
    width: 180px;


  }
  table tr td {
    height: 50px;
  }
  #time span{
    width: 30px;
  }
  .s1 span{
    width: 70px;
  }

</style>
