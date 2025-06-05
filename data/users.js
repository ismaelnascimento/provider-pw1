var users = [
  {
    userName: "ismaelnascimento",
    roleId: 0,
    // 0 -> client
    // 1 -> service provider
    location: {
      street: "Rua 1",
      neighborhood: "Bairro 1",
      city: "Ceará",
      state: "Pacajus",
    },
    service: null,
  },
];

const user = users[0];

module.exports = {
  user,
  users,
};
