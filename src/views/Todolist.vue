<template>
  <div class="list mx-3 rounded">
    <div class="flex flex-col items-start my-2 mx-10">
      <div class="my-2">
        <label for="">
          <input
            class="rounded text-black"
            type="text"
            placeholder="+New task"
            @keyup.enter="createTask($event, board.users[0].tasks)"
          />
        </label>
        <!-- <button @click="createTask($event, board.users[0].tasks)" class="ml-2">
          Add
        </button> -->
      </div>
      <div
        v-for="(task, index) of board.users[0].tasks"
        :key="task.id"
        :class="[!task.done ? 'list__item' : 'list__item list__item--checked']"
      >
        <div class="ml-2 pr-2 task__text" @click="goToTask(task)">
          <p class="w-full font-bold">
            {{ task.title }}
          </p>
          <p class="text-sm">
            {{ task.createDate }}
          </p>
          <p v-if="task.description" class="text-sm mt-1 w-full task__des">
            {{ task.description }}
          </p>
        </div>
        <div class="flex flex-col btn rounded justify-between items-center">
          <div class="mt-2 px-2 pb-1">
            <font-awesome-icon
              :class="[task.done ? 'btn--check' : 'btn--uncheck']"
              :title="task.done ? 'check' : 'uncheck'"
              icon="check"
              @click="toggleStatus(task)"
            />
          </div>
          <button
            class="btn--cancel mb-2 px-3 border-t"
            title="delete"
            @click="deleteTask(board.users[0].tasks, index)"
          >
            x
          </button>
        </div>
      </div>
    </div>
    <div
      @click.self="close"
      v-if="isTaskOpen"
      class="modal absolute top-0 bot-0 w-full h-full"
    >
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getId } from "../utils.js";
export default {
  computed: {
    ...mapState(["board"]),
    isTaskOpen() {
      return this.$route.name === "Task";
    },
  },
  methods: {
    goToTask(task) {
      this.$router.push({ name: "Task", params: { id: task.id } });
    },
    close() {
      this.$router.push({ name: "Todolist" });
    },
    createTask(e, tasks) {
      if (e.target.value.trim()) {
        this.$store.commit("CREATE_TASK", {
          tasks,
          id: getId(tasks),
          title: e.target.value.trim(),
        });
        e.target.value = "";
      }
      return;
    },
    deleteTask(tasks, index) {
      this.$store.commit("DELETE_TASK", {
        tasks,
        index,
      });
      // this.$router.push({ name: "Todolist" });
    },

    toggleStatus(task) {
      this.$store.commit("TOGGLE_STATUS", { task });
    },
  },
};
</script>

<style>
.modal {
  background-color: rgba(0, 0, 0, 0.4);
}
.list {
  background-color: rgba(245, 245, 245, 0.2);
}

.list__item {
  @apply rounded my-1 flex flex-row;
  background-color: rgb(199 210 254);
  color: #000;
  max-width: 500px;
}

.list__item.list__item--checked {
  background-color: rgb(109, 231, 109);
}

.btn {
  @apply bg-white;
  cursor: pointer;
}

.btn--cancel {
  font-weight: 600;
  font-size: 20px;
  line-height: 1.4;
}

.btn--check {
  color: green;
}
.btn--uncheck {
  color: red;
}

.task__text {
  display: -webkit-box;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.task__des {
  border-top: 2px solid rgb(94, 185, 238);
  background-color: rgb(130 210 254);
}
</style>
