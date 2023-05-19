
<template>
  <div class="sreach_return" title="搜索返回页">
    <!-- <Search/> -->
    <div class="search-bar">
      <el-row type="flex">
        <el-input placeholder="请输入内容" v-model="input">
        </el-input>
         <!-- <el-button type="primary" icon="el-icon-search" @click="goto()"></el-button> -->
        <router-link :to="{ path: '/search_result',  query:{'keyword':this.input}}">
          <el-button type="primary" icon="el-icon-search"></el-button>
        </router-link>
      </el-row>
    </div>
      
  </div>

</template>

<script>
import axios from 'axios'
  export default {
    data(){
      return{
        input:"",
        // search_videos:[""],
      }
    },
   
  }
</script>
    
<style>
/* .search-bar{
  width:50%;
  /* display:flex;
  justify:center; */
/* }
.search{
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row; 
} */
</style>