export default {
  name: "users",
  users: [
    {
      uid: 1,
      name: "Han",
      avatar: "ga",
      email: "han1234@gamil.com",
      password: "123456789",
      tasks: [
        {
          id: 1,
          title: "hang ngay",
          description: "di cho",
          createDate: new Date("2022-1-1"),
          done: false,
        },
        {
          id: 2,
          title: "moi toi",
          description: "an uong",
          createDate: new Date("2022-1-2"),
          done: false,
        },
      ],
    },
  ],
};
