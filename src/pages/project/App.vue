<template>
  <div v-if="token">
      <div><span>nickname:</span>{{nickname}}</div>
      <div><span>sex:</span>{{sex}}</div>
      <div><span>token:</span>{{token}}</div>
  </div>
  <div v-else>
      <div>您还没有登录!</div>
      <button @click="login()">立即登录</button>
  </div>
</template>
<script>

import { mapActions,mapGetters } from "vuex";

export default {
  name: "App",
  methods:{
      ...mapActions("user",["login"])
  },
  computed:{
       ...mapGetters("user",["nickname","sex","state","token"])
  }
};

</script>

<style>

</style>
