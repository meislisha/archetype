<template>
  <div v-if="token">
      <div><span>nickname:</span>{{nickname}}</div>
      <div><span>sex:</span>{{sex}}</div>
      <div><span>tokek:</span>{{token}}</div>
  </div>
  <div v-else>
      <div>您还没有登录!</div>
      <div @click="login()">立即登录</div>
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
