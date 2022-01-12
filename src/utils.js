export function updateStatePlugin(store) {
  store.subscribe((mutation, state) => {
    localStorage.setItem("board", JSON.stringify(state.board));
  });
}

export function getId(tasks) {
  let index = 0;
  for (const task of tasks) {
    if (index === task.id) {
      index = index + 1;
    }
  }
  return index;
}
