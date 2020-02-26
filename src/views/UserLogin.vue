<template>
  <div id="bodyer">
    <div class="logins">
      <van-cell-group>
        <van-field v-model="username" required clearable label="用户名" placeholder="请输入用户名" />
        <van-field v-model="upassword" type="password" label="密码" placeholder="请输入密码" required />
        <div class="btn">
          <van-button round type="info" @click="userLogin">立即登录</van-button>
        </div>
        <div class="pass">
          <span>忘记密码</span>
          <span @click="register()">立即注册</span>
        </div>
      </van-cell-group>
    </div>
  </div>
</template>

<style scoped>
#bodyer {
  /* width: 5rem; */
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fcfcfc;
}
.logins {
  width: 6.5rem;
}
.btn {
  padding: 0.5rem 0;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #fcfcfc;
}
.pass {
  display: flex;
  justify-content: space-between;
  font-size: 0.32rem;
  color: #98d4f7;
  padding: 0 1rem;
  background-color: #fcfcfc;
}
</style>

<script>
import { login } from "@/api/user";

export default {
  name: "login",
  data() {
    return {
      username: "",
      upassword: "",
    };
  },
  methods: {
    register() {
      this.$router.push({ name: "logon" });
    },
    userLogin() {
      let data = { uname: this.username, upassword: this.upassword };
      login(data).then(res => {
        let { code, msg, token } = res.data;
        if (code == 200) {
          sessionStorage.setItem("token", 'Bearer '+token);
          this.$toast(msg);
          this.$router.push({ name: "home" });
        }
      });
    },
  }
};
</script>