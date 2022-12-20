/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("mahasiswa", t => {
    t.increments("id");
    t.integer("nim").notNullable();
    t.string("name").notNullable();
    t.string("password").notNullable();
    t.string("no_hp").notNullable();
    t.text("address").notNullable();
    t.string("prodi").notNullable();
    t.string("avatar");
    t.timestamps(true, true);
  })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("mahasiswa");
};
