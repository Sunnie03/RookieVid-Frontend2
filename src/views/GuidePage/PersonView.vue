<template>
  <div class="person-container">
      <!-- 根标签 -->
      <div class="title-container" >
          <img src="../../../image/defaultUser.jpg" class="photo">
          <div class="text-title">昵称：</div>
          <div id="username" class="text-title">username</div>
          
      </div>
      <el-menu :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#c4d43a"
      text-color="#fff"
      active-text-color="#ffd04b" >
        <el-row type="flex" justify="center">
          <el-menu-item index="1">主页</el-menu-item>
          <el-menu-item index="2">投稿</el-menu-item>
          <el-menu-item index="3">收藏夹</el-menu-item>
          <el-menu-item index="4">关注列表</el-menu-item>
          <el-menu-item index="5">粉丝 </el-menu-item>
          <el-menu-item index="6">通知</el-menu-item>
          <el-menu-item index="7">修改资料</el-menu-item>
        </el-row> 
      </el-menu>

      <ul style="margin-top:50px ">
        <li class="item"><div class="text">用户ID:{{ uid }}</div> </li>
        
        <li class="item"><div class="text">邮箱:{{ email}}</div> </li>

        <li class="item"><div class="text">个性签名:{{ signature }}</div> </li>
      </ul>
        
  </div>
       
</template>

<script>
import router from '@/router'
// import { callbackify } from 'util'

export default {
data () {
  var validatePass = (rule, value, callback) => {
    //  rule: password的详细信息，value：password的值，callback:如果都不满足，则正常提交
    if (value === '') {
      callback(new Error('请输入密码')) // input为空
    } else {
      callback()
    }
  }
  var validateName = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入用户名'))
    } else {
      callback()
    }
  }
  return {
    form: {
      userid: '',
      password: ''
    },
  //   rules: {
  //     username: [{ required: true, validator: validateName, trigger: 'blur' },
  //       { min: 2, max: 20, message: '用户名长度在 2 到 20 个字符', trigger: 'blur' }/* 长度要求 */],
  //     password: [{ required: true, validator: validatePass, trigger: 'blur' },
  //       { min: 2, max: 10, message: '长度在 8 到 14 个字符', trigger: 'blur' }/* 长度要求、正则要求 */],
  //     checkPass: [{ required: true, validator: validatePass2, trigger: 'blur' }],
  //     email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }]
  //   }
  }
},
// 这里是表单提交功能、重置功能
methods: {
  submitForm (formName) {
    this.$refs[formName].validate((valid) => {
      if (valid) {
        alert('提交成功')
      } else {
        console.log('提交失败')
        return false
      }
    })
  },
  resetForm (formName) {
    this.$refs[formName].resetFields()
  }
}
}
</script>

<style scoped>
.person-container {
  border: 1px;
  background-color: antiquewhite;
  background-size: 100% 100% ;
  background-repeat: no-repeat;
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.photo {
  border-style: double;
  width: 100px;
  height: 100px;
  border-radius: 50% ;
  vertical-align: middle;
}
.text-title {
  display:inline;
  font-size: 50px;
  background-repeat: repeat;
  margin-left: 80px;
}
.title-container {
  display:flex; 
  background-color:rgb(177, 223, 140);/*antiquewhite; 这个是浅浅的漂亮的肉色*/
  justify-content: center;
  align-items: center;
  border:darkgrey 1px;
  height: 150px;
  opacity: 0.9;
}
.item {
margin-top: 80px;
display: inline;
text-align:justify;
font-size: 25px;
margin-left: 200px;
}
.text {
margin-left: 300px;
}
</style>