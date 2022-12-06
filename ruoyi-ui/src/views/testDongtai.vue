<template>
  <div>
    <el-col :span="24">
      <el-form>
        <el-form-item label="与承租户同户籍成员:" >
          <el-table :data="zichandetail.members" :border=true style="width: 99.99%;">
            <el-table-column type="index" label="序号" width="100"></el-table-column>
            <el-table-column prop="name" label="姓名" width="150">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name" autocomplete="off" size="small"
                          placeholder="请输入姓名"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="与承租人关系" width="150">
              <template slot-scope="scope">
                <el-input v-model="scope.row.relationship" autocomplete="off" size="small" placeholder="请输入与承租人关系"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="联系电话" width="150">
              <template slot-scope="scope">
                <el-input v-model="scope.row.mobile" autocomplete="off" size="small"
                          placeholder="请输入联系电话"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="出生年月" width="150">
              <template slot-scope="scope">
                <el-date-picker v-model="scope.row.birthday" type="month" placeholder="请输入出生年月" value-format="yyyy-MM" size="small" class="allwidth">
                </el-date-picker>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="工作单位">
              <template slot-scope="scope">
                <el-input v-model="scope.row.gongzuodanwei" autocomplete="off" size="small" placeholder="请输入工作单位"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" plain @click="delmembers(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <i class="el-icon-circle-plus-outline" @click="addmembers"></i>
        </el-form-item>
      </el-form>
    </el-col>

  </div>
</template>

<script>
  export default {
    name: "testDongtai",
    data() {
      return {
        zichandetail: {
          members: [
            {
              id: 1,
              name: '',
              relationship: '',
              mobile: '',
              birthday: '',
              gongzuodanwei: '',
            }
          ]
        },


      }
    },
    methods:{

      addmembers() {
        console.log('与承租户同户籍成员');
        var member = this.zichandetail.members;
        console.log(member);
        var length = member.length;
        this.zichandetail.members.push(
          {
            id: parseInt(length),
            name: '',
            relationship: '',
            mobile: '',
            birthday: '',
            gongzuodanwei: '',
          })
      },
      delmembers(index, row) {
        var that = this;
        this.$confirm('确认删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //点击确定的操作(调用接口)
          var hasmembers = that.zichandetail.members;
          for (var i = 0; i < hasmembers.length; i++) {
            if (row.id == hasmembers[i].id) {
              that.zichandetail.members.splice(i, 1);
              // this.$message({ message: '删除成功', duration: 2000, type: 'success' });
            }
          }
        }).catch(() => {
          //点取消的提示
          return;
        });
      },


    }
  }
</script>

<style scoped>

</style>

