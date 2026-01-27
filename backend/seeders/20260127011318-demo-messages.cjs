'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Messages', [
      {
        content: 'Pierwsza przykładowa testowa wiadomość',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: 'Szybkie pociągi dla PKP Intercity. Newag i Siemens podpisały porozumienie',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: 'Choć w ostatnich dniach temperatury wzrosły, to na przełomie następnego tygodnia Polskę czeka ochłodzenie. Pogoda gwałtownie się zmieni, a temperatura spadnie nawet do -26 stopni.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Messages', null, {})
  }
};
