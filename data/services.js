var categories = require("./categories");

var services = [
  {
    id: 1,
    name: "Senhor lima",
    category: categories[1],
    location: {
      street: "Rua 1",
      neighborhood: "Bairro 1",
      city: "Ceará",
      state: "Pacajus",
    },
    contact:
      "https://stanti.com.br/sr_lima_barbearia?fbclid=PAZXh0bgNhZW0CMTEAAacoL8R1FLYWfw9B1mZV0HkZuLpL2L-vCA9xf20NA_JZ7hvqgxQ3F6NTOCIEeA_aem_PsU-xzu3t8VLqEvvAgpIbg",
    stars: 4.5,
    favorite: true,
  },
  {
    id: 2,
    name: "Reparo car",
    category: categories[4],
    location: {
      street: "Rua 1",
      neighborhood: "Bairro 1",
      city: "Ceará",
      state: "Pacajus",
    },
    contact:
      "https://stanti.com.br/sr_lima_barbearia?fbclid=PAZXh0bgNhZW0CMTEAAacoL8R1FLYWfw9B1mZV0HkZuLpL2L-vCA9xf20NA_JZ7hvqgxQ3F6NTOCIEeA_aem_PsU-xzu3t8VLqEvvAgpIbg",
    stars: 4.2,
    favorite: false,
  },
  {
    id: 3,
    name: "Pedreiro do Zé",
    category: categories[2],
    location: {
      street: "Rua 2",
      neighborhood: "Bairro 1",
      city: "Ceará",
      state: "Pacajus",
    },
    contact:
      "https://stanti.com.br/sr_lima_barbearia?fbclid=PAZXh0bgNhZW0CMTEAAacoL8R1FLYWfw9B1mZV0HkZuLpL2L-vCA9xf20NA_JZ7hvqgxQ3F6NTOCIEeA_aem_PsU-xzu3t8VLqEvvAgpIbg",
    stars: 4,
    favorite: false,
  },
  {
    id: 4,
    name: "Faxina do João",
    category: categories[3],
    location: {
      street: "Rua 2",
      neighborhood: "Bairro 2",
      city: "Ceará",
      state: "Pacajus",
    },
    contact:
      "https://stanti.com.br/sr_lima_barbearia?fbclid=PAZXh0bgNhZW0CMTEAAacoL8R1FLYWfw9B1mZV0HkZuLpL2L-vCA9xf20NA_JZ7hvqgxQ3F6NTOCIEeA_aem_PsU-xzu3t8VLqEvvAgpIbg",
    stars: 3.5,
    favorite: false,
  },
  {
    id: 5,
    name: "Reparo flash",
    category: categories[4],
    location: {
      street: "Rua 3",
      neighborhood: "Bairro 2",
      city: "Ceará",
      state: "Pacajus",
    },
    contact:
      "https://stanti.com.br/sr_lima_barbearia?fbclid=PAZXh0bgNhZW0CMTEAAacoL8R1FLYWfw9B1mZV0HkZuLpL2L-vCA9xf20NA_JZ7hvqgxQ3F6NTOCIEeA_aem_PsU-xzu3t8VLqEvvAgpIbg",
    stars: 5,
    favorite: true,
  },
];

module.exports = services;
