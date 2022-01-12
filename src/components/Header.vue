<template>
  <div class="header__wrap flex flex-row justify-between py-1">
    <div class="header__contain ml-2">
      <div class="header__icon">
        <router-link to="/">
          <font-awesome-icon icon="home" />
        </router-link>
      </div>
      <div class="header__icon">
        <router-link to="/todolist">TodoList</router-link>
      </div>
      <div class="flex flex-row items-center ml-1">
        <input type="text" class="rounded header__search" /><font-awesome-icon
          class="header__search-icon"
          icon="search"
        />
      </div>
    </div>
    <div class="header__contain">
      <font-awesome-icon class="mr-1" icon="th-list" />Thing Todo
    </div>
    <div class="header__contain mr-2">
      <div class="header__icon"><font-awesome-icon icon="info-circle" /></div>
      <div class="header__icon"><font-awesome-icon icon="bell" /></div>
      <div class="header__icon"><font-awesome-icon icon="user-circle" /></div>
    </div>
  </div>
</template>

<style scoped>
.header__wrap {
  background-color: rgba(0, 0, 0, 0.3);
}

.header__contain {
  @apply flex flex-row items-center;
}

.header__icon {
  background-color: rgba(245, 245, 245, 0.3);
  @apply w-full h-auto block mx-1 rounded px-2 py-1;
}

.header__search {
  min-width: 200px;
  background-color: rgba(245, 245, 245, 0.3);
  @apply w-full h-auto block rounded px-1 py-1;
}

.header__search-icon {
  /* background-color: rgba(245, 245, 245, 0.3); */
  transform: translateX(-20px);
}
</style>
