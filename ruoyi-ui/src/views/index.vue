<template>
<!--  <div class="app-container home">-->
<!--    <el-row :gutter="20">-->
<!--      <el-col :xs="24" :sm="24" :md="12" :lg="14">-->
<!--        <el-card class="update-log">-->
<!--          <div slot="header" class="clearfix">-->
<!--            <span>联系信息</span>-->
<!--          </div>-->
<!--          <div class="body">-->
<!--            <p>-->
<!--              <i class="el-icon-user-solid"></i> QQ群：-->
<!--              <a href="https://jq.qq.com/?_wv=1027&k=2zE87c2G" target="_blank"-->
<!--              > 782924350</a-->
<!--              >-->
<!--            </p>-->
<!--            <p>-->
<!--              <i class="el-icon-chat-dot-round"></i> 微信：<a-->
<!--            >Almost-2y</a-->
<!--            >-->
<!--            </p>-->
<!--            <p style="color: #f54a4a;font-size:16px">-->
<!--              <i class="el-icon-bell"></i> 说明：<a-->
<!--            >承接各种小型项目，有需求可联系我。微信：Almost-2y / QQ: 846249920</a-->
<!--            >-->
<!--            </p>-->
<!--          </div>-->
<!--        </el-card>-->
<!--      </el-col>-->

<!--      <el-col :xs="24" :sm="24" :md="12" :lg="10">-->
<!--        <el-card class="update-log">-->
<!--          <div slot="header" class="clearfix">-->
<!--            <span>捐赠支持</span>-->
<!--          </div>-->
<!--          <div class="body">-->
<!--            <img-->
<!--              src="https://oscimg.oschina.net/oscnet/up-88f17f916de7a895cf2a84d2ce769e9b2ca.JPEG"-->
<!--              alt="donate"-->
<!--              width="100%"-->
<!--            />-->
<!--            <span style="display: inline-block; height: 30px; line-height: 30px"-->
<!--            >可以请作者喝杯咖啡以示鼓励！</span-->
<!--            >-->
<!--          </div>-->
<!--        </el-card>-->
<!--      </el-col>-->
<!--    </el-row>-->
<!--    <el-divider />-->
<!--    <el-row :gutter="20">-->
<!--      <el-col :xs="24" :sm="24" :md="12" :lg="14" style="padding-left: 20px">-->
<!--        <el-card class="update-log">-->
<!--          <div class="block">-->
<!--            <h2 class="demonstration">人活着就是为了樱岛麻衣 (≧▽≦) </h2>-->
<!--            <el-image style="width: 100%" :fit="contain" src="https://oscimg.oschina.net/oscnet/up-eb83b8d00104b97842d19dbadeec90fbb54.JPEG"/>-->
<!--          </div>-->
<!--        </el-card>-->
<!--      </el-col>-->

<!--      <el-col :xs="24" :sm="24" :md="12" :lg="8">-->
<!--        <el-card class="update-log">-->
<!--          <div slot="header" class="clearfix">-->
<!--            <span>更新日志</span>-->
<!--          </div>-->
<!--          <el-collapse accordion>-->
<!--            <el-collapse-item title="v1.0.0 - 2021-04-07">-->
<!--              <ol>-->
<!--                <li>单流程完善</li>-->
<!--              </ol>-->
<!--            </el-collapse-item>-->
<!--          </el-collapse>-->
<!--        </el-card>-->
<!--      </el-col>-->

<!--    </el-row>-->
<!--  </div>-->
  <h2>欢迎来到拖轮计费系统</h2>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      // 版本号
      version: "3.4.0",
    };
  },
  methods: {
    goTarget(href) {
      window.open(href, "_blank");
    },
  },
};
</script>

<style scoped lang="scss">
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }
  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}
</style>

