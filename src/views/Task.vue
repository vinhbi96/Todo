<template>
  <div class="modal__view bg-white rounded mx-64">
    <div class="flex flex-col flex-grow px-2 mt-40">
      <div
        class="modal__title flex flex-col justify-between border-b-2 items-start"
      >
        <span class="text-sm mt-1">{{ task.createDate }}</span>
        <input
          class="font-bold w-full ml-1"
          :value="task.title"
          @change="updateTask($event, 'title')"
          @keyup.enter="updateTask($event, 'title')"
        />
      </div>
      <textarea
        class="modal__des mt-1 relative border-none px-1 text-sm mb-1"
        name="des"
        :value="task.description"
        @change="updateTask($event, 'description')"
        @keyup.enter="updateTask($event, 'description')"
        placeholder="Type here..."
      ></textarea>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getTask"]),
    task() {
      return this.getTask(this.$route.params.id);
    },
  },

  methods: {
    updateTask(e, key) {
      this.$store.commit("UPDATE_TASK", {
        task: this.task,
        key,
        value: e.target.value,
      });
    },
  },
};
</script>

<style>
.modal__view {
  min-height: 200px;
  min-width: 400px;
}

.modal__des,
.modal__title {
  color: black;
}

.modal__des {
  min-height: 200px;
}
</style>
