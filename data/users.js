const services = require("./services");
// 0 -> client
// 1 -> service provider

var users = [
  {
    userName: "ismaelnascimento",
    roleId: 1,
    location: {
      street: "Rua 1",
      neighborhood: "Bairro 1",
      city: "Ceará",
      state: "Pacajus",
    },
    service: services[0],
  },
  {
    userName: "josesilva",
    roleId: 1,
    location: {
      street: "Rua 1",
      neighborhood: "Bairro 1",
      city: "Ceará",
      state: "Pacajus",
    },
    service: services[1],
  },
  {
    userName: "zezinho123",
    roleId: 1,
    location: {
      street: "Rua 2",
      neighborhood: "Bairro 1",
      city: "Ceará",
      state: "Pacajus",
    },
    service: services[2],
  },
  {
    userName: "joaoalmeida",
    roleId: 1,
    location: {
      street: "Rua 2",
      neighborhood: "Bairro 2",
      city: "Ceará",
      state: "Pacajus",
    },
    service: services[3],
  },
  {
    userName: "hugoribeiro",
    roleId: 1,
    location: {
      street: "Rua 3",
      neighborhood: "Bairro 2",
      city: "Ceará",
      state: "Pacajus",
    },
    service: services[4],
  },
  {
    userName: "userclient1",
    roleId: 0,
    location: {
      street: "Rua 1",
      neighborhood: "Bairro 1",
      city: "Ceará",
      state: "Pacajus",
    },
    service: null,
  },
  {
    userName: "userclient2",
    roleId: 0,
    location: {
      street: "Rua 2",
      neighborhood: "Bairro 6",
      city: "Ceará",
      state: "Pacajus",
    },
    service: null,
  },
];

const getUserByUsername = (username) => {
  return users.find((user) => user.userName === username);
};

const user = null;

module.exports = {
  user,
  getUserByUsername,
  users,
};
