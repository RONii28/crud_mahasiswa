const db = require("../../databases");
const multer = require("multer");
const createMahasiswa = require("../validation/mahasiswa")
const { Api404Error, Api422Error, Api400Error} = require("../middlewares/errors/ApiErrors");
const upload = require("../helpers/multer")("mahasiswa").single("avatar")
const bcrypt = require("bcrypt")
module.exports = class mahasiswaController {
  static async create(req, res, next) {
    try {
  
      const { nim, name, password, no_hp, address, prodi } = req.body;

            // insert data to db
            await db("mahasiswa")
                .insert({
                    nim,
                    name,
                    password: bcrypt.hashSync(password, 10),
                    no_hp,
                    address,
                    prodi
                });

      return res.status(201).json({
        success: true,
        message: "data mahasiswa successfully created",
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req, res, next) {
    try {
        // get data query params for pagination, query params ? params /:id
        const { page = 1, limit = 25, search = "" } = req.query;

        const mahasiswa = await db("mahasiswa")
            .select("nim", "name", "no_hp", "address", "prodi", "created_at", "updated_at")
            .limit(+limit)
            .offset(+limit * +page - +limit)
            .where("id", "like", `%${search}%`);

        return res.json({
            success: true,
            message: "data successfully retrieved",
            mahasiswa
        });
    } catch (error) {
        next(error);
    }
  }

  static async getDetail(req, res, next) {
    try {
      // gwt data from params
      const {id} = req.params;

      // querying data to db
      const mahasiswa = await db("mahasiswa")
          .select("id", "nim", "name", "no_hp", "address", "prodi", "created_at", "updated_at")
          .where({id})
          .first();

      // check available
      if (!mahasiswa) {
        return res.status(404).json({
          success: false,
          message: "data mahasiswa not found"
        });
      }

      return res.json({
        success: true,
        message: "data successfully retrieved",
        mahasiswa
      })
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      // check validation from req body
      const {error, value} = createMahasiswa.validate(req.body);
      if (error) {
        throw new Api422Error("validation error");
      }

      // get data from params
      const {id} = req.params;

      // checking available mahasiswa
      const mahasiswa = await db("mahasiswa").where({id}).first();
      if (!mahasiswa) {
        throw new Api404Error("mahasiswa not found");
      }

      await db.transaction(async function(trx) {
        // update data mahasiswa
        await db("mahasiswa")
          .where({id})
          .transacting(trx)
          .update(value)
          .catch(trx.rollback);

        trx.commit;
      });

      return res.json({
        success: true,
        message: "mahasiswa successfully updated",
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      // get data from params
      const {id} = req.params;

      // checking available mahasiswa
      const mahasiswa = await db("mahasiswa").where({id}).first();
      if (!mahasiswa) {
        throw new Api404Error("mahasiswa not found");
      }

      await db("mahasiswa").where({id}).delete();

      return res.json({
        success: true,
        message: "mahasiswa successfully deleted",
      })
    } catch (error) {
      next (error);
    }
  }

  static async avatar(req, res, next) {
    upload(req, res, async function(error) {
      try {
        // checking error upload
        if (error instanceof multer.MulterError) {
          throw new Api400Error(error.message);
        } else if (error) {
          throw new Api400Error(error.message);
        }

        // insert data mahasiswa image
        const pathImage = req.file.path.split("\\");
        const url = pathImage.splice(pathImage.lenght - 2).join("/");
        await db("mahasiswa")
          .where({ id: req.params.id })
          .update({
            avatar: url
          })
          .catch (error => {
            throw new Api400Error(error.message);
          });

          return res.status(201).json({
            success: true,
            message: "mahasiswa image successfully added"
          })
      } catch (error) {
        next(error);
      }
    })
  }
}