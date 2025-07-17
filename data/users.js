const services = require("./services");
// 0 -> client
// 1 -> service provider

var users = [
  {
    id: 1,
    username: "ismaelnascimento",
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
    id: 2,
    username: "josesilva",
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
    id: 3,
    username: "zezinho123",
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
    id: 4,
    username: "joaoalmeida",
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
    id: 5,
    username: "hugoribeiro",
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
    id: 6,
    username: "userclient1",
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
    id: 7,
    username: "userclient2",
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
  return users.find((user) => user.username === username);
};

const user = null;

module.exports = {
  user,
  getUserByUsername,
  users,
};
