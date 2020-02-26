<template>
  <div class="home">
    <header>
      <div class="login" v-if="user==null" @click="loginButton">
        <span class="username">请登录</span>
      </div>
      <div class="h-div" v-else>
        <div class="avatar">
          <img src alt />
        </div>
        <span class="username">{{user.uname}}</span>
        <div class="right-line">
          <div class="on-line"></div>
        </div>
      </div>
    </header>
    <section>
      <ul class="msg-ul">
        <li class="msg-li" v-for="(item, index) in his" :key="index">
          <div :class="item.user==user.uname?'msg-right':'msg-left'">
            <div class="msg-avatar"></div>
            <div>
              <span class="msg-span">{{item.message}}</span>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <footer>
      <van-field
        v-model="message"
        rows="1"
        autosize
        type="textarea"
        placeholder="请输入留言"
      />
      <van-button type="primary" size="mini" @click="clickbutton">发送</van-button>
    </footer>
  </div>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 0.88rem;
  background: #c1c1c1;
}
.login {
  padding: 0 0.2rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login span {
  font-size: 0.5rem;
}
.h-div {
  padding: 0 0.2rem;
  height: 100%;
  background-color: aliceblue;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.avatar {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background-color: aqua;
}
.username {
  font-size: 0.38rem;
}
.right-line {
  width: 0.8rem;
  height: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.on-line {
  width: 0.2rem;
  height: 0.2rem;
  border-radius: 50%;
  background-color: blue;
}
section {
  padding: 0.88rem 0.22rem;
}
.msg-ul {
  display: flex;
  flex-direction: column;
  padding: 0.4rem 0;
}
.msg-li {
  width: 100%;
  padding: 0.4rem 0;
}
.msg-left {
  width: 70%;
  float: left;
}
.msg-right {
  width: 70%;
  float: right;
}
.msg-avatar {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background-color: #f09191;
  margin: 0 0.1rem;
}

.msg-span {
  word-break: normal;
  width: auto;
  display: block;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: hidden;
  padding: 0.2rem;
  background-color: #f2f2f2;
}
.msg-left div:first-child {
  float: left;
}
.msg-right div:first-child {
  float: right;
}
footer {
  width: 100%;
  padding: 0 0.24rem;
  background-color: white;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 99;
}
</style>

<script>
// @ is an alias to /src

export default {
  name: "home",
  data() {
    return {
      message: ''
    }
  },
  sockets: {
    connect() {
     
    },
    users(data){
      console.log(data);
    },
    res(val) {
      this.$store.dispatch("getMess", val);
    }
  },
  methods: {
    loginButton() {
      this.$router.push({ name: "login" });
    },
    getuser() {
      let token = sessionStorage.getItem("token") || "";
      if (!token) {
        return;
      }
      this.$store.dispatch("getUser");
    },
    clickbutton() {
      let token = sessionStorage.getItem("token") || "";
      if (!token) {
        this.$router.push({ name: "login" });
        return;
      }
      let data = {user: this.user.uname, message: this.message};
      this.message = '';
      this.$socket.emit("chat", data);
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    his() {
      return this.$store.state.historical;
    }
  },
  mounted() {
    this.getuser();
  }
};
</script>
