import { createStore } from "vuex";
import defaultBoard from "../default-board";
import { updateStatePlugin } from "../utils";

const board = JSON.parse(localStorage.getItem("board")) || defaultBoard;

export default createStore({
  state: {
    board,
  },
  getters: {
    getTask(state) {
      return (id) => {
        for (const task of state.board.users[0].tasks) {
          if (task.id === +id) {
            //index === index
            return task;
          }
        }
      };
    },
  },
  plugins: [updateStatePlugin],
  mutations: {
    CREATE_TASK(state, { tasks, id, title }) {
      tasks.push({
        id,
        title,
        description: "",
        createDate: new Date(),
        done: false,
      });
    },

    UPDATE_TASK(state, { task, key, value }) {
      task[key] = value;
    },

    DELETE_TASK(state, { tasks, index }) {
      tasks.splice(index, 1);
    },

    TOGGLE_STATUS(state, { task }) {
      task.done = !task.done;
    },
  },
  actions: {},
  modules: {},
});
