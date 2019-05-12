import vue from 'vue';
import vuex from 'vuex';

import user from './user';

vue.use(vuex);

const store = new vuex.Store({
  modules: {
    user
  },
  //严格模式 任何mutations外处理state都会抛出错误
  strict: true
});

export default store;