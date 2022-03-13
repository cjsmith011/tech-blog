const { Creator } = require('../models');

const creatordata = [
  {
    id: 1,
    creator_name: "Carlie Smith",
    password: "road1234",
  },
  {
    id: 2,
    creator_name: "George Jones",
    password: "trip1234",
  },
  {
    id: 3,
    creator_name: "Haley Comet",
    password: "today1234",
  },
];

const seedCreators = () => Creator.bulkCreate(creatordata);

module.exports = seedCreators;
