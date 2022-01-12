<template>
  <div class="todo">
    <Header />
    <!-- <router-link to="/">Home</router-link> -->
    <!-- <router-link to="/todolist">Todo list</router-link> -->
    <router-view />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
export default {
  components: {
    Header,
  },
  data() {
    return {
      enabled: false,
    };
  },
};
</script>

<style scoped>
.todo {
  width: 100%;
}
.todo a {
  background-color: rgba(0, 0, 0, 0.4);
  font-weight: 600;
  @apply mx-1 p-1 rounded;
}
</style>
