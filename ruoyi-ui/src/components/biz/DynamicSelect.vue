<template>
  <el-select v-model="input" :placeholder=placeholder :filterable=filterable :style="style">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>


<script>
import {getDicts} from "@/api/system/dict/data";
import request from "@/utils/request";

export default {
  name: "DynamicSelect",
  data(){
    return {
      options:[],
      input:''
    }
  },
  props:{
    filterable:false,
    placeholder:'',
    width:100,
    style:{},
    value: {
      default:''
    },
    conf:{
      type: Object,
    },
  },
  methods:{
    getOptions() {
      console.log("conf:", this.conf)
      this.options = []
      switch (this.conf.__config__.dataType) {
        case 'static':
          this.options = this.conf.__slot__.options
          break
        case 'dynamic':
          request({
            url: this.conf.__config__.url,
            method:  this.conf.__config__.method,
          }).then(res => {
            let options = []
            eval(this.conf.__config__.code)
            this.options = options
          })
          break
        case 'dict':
          getDicts(this.conf.__config__.dictKey).then(res => {
            console.log("res:", res)
            res.data.forEach(item => {
              this.options.push({label:item.dictLabel, value:item.dictCode})
            })
          })
          break
      }
    }
  },
  watch: {
    input(val) {
      this.$emit('input', val)
    },
    value(val) {
      console.log('value',val)
      this.input = val
    }
  },
  mounted() {
    console.log('mounted',this.value)
    this.getOptions()
    this.input = this.value
  }
}
</script>

<style scoped>

</style>
