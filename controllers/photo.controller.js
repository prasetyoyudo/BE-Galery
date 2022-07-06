const { Op } = require("sequelize");
const { Photo } = require("../models/index");

module.exports = {
  getAlbums: async (req, res) => {
    const querySort = req.query.sort || "ASC";
    const queryOffset = parseInt(req.query.skip) || 0;
    const queryLimit = parseInt(req.query.limit) || 20;

    await Photo.findAll({
      group: ["albumId"],
      order: [["albumId", querySort]],
      limit: queryLimit,
      offset: queryOffset,
      subQuery: false,
    })
      .then((result) => {
        return res.status(200).send({
          success: true,
          message: "Album fetched",
          albums: result,
        });
      })
      .catch((err) => {
        return res.status(500).send({
          success: false,
          message: err,
        });
      });
  },

  getPhotos: async (req, res) => {
    const querySort = req.query.sort || "ASC";
    const queryTitle = req.query.title || "";
    const queryOffset = parseInt(req.query.skip) || 0;
    const queryLimit = parseInt(req.query.limit) || 20;
    const albumId = req.params.id;

    await Photo.findAndCountAll({
      where: {
        [Op.and]: {
          title: {
            [Op.like]: `${queryTitle}%`,
          },
          albumId: albumId,
        },
      },
      order: [["title", querySort]],
      limit: queryLimit,
      offset: queryOffset,
      subQuery: false,
    })
      .then((result) => {
        return res.status(200).send({
          success: true,
          message: "Photo fetched",
          count: result.count,
          photos: result.rows,
        });
      })
      .catch((err) => {
        return res.status(500).send({
          success: false,
          message: err,
        });
      });
  },

  addPhoto: async (req, res) => {
    const data = req.body;

    await Photo.create(data)
      .then((result) => {
        return res.status(200).send({
          success: true,
          message: `${result.title} saved`,
        });
      })
      .catch((err) => {
        return res.status(500).send({
          success: false,
          error: err,
        });
      });
  },

  updatePhotoName: async (req, res) => {
    const photoId = req.params.id;
    const newTitle = req.body.title;

    if (!newTitle) {
      return res.status(500).send({
        success: false,
        message: "Title is required!",
      });
    } else {
      await Photo.update(
        {
          title: newTitle,
        },
        {
          where: {
            id: photoId,
          },
        }
      )
        .then(() => {
          return res.status(200).send({
            success: true,
            message: "Title updated",
          });
        })
        .catch((err) => {
          return res.status(500).send({
            success: false,
            error: err,
          });
        });
    }
  },

  updatePhotoAlbum: async (req, res) => {
    const photoId = req.params.id;
    const newAlbum = req.body.album;

    if (!newAlbum) {
      return res.status(500).send({
        success: false,
        message: "Album is required!",
      });
    } else {
      Photo.update(
        {
          albumId: newAlbum,
        },
        {
          where: {
            id: photoId,
          },
        }
      )
        .then(() => {
          return res.status(200).send({
            success: true,
            message: "Album updated",
          });
        })
        .catch((err) => {
          return res.status(500).send({
            success: false,
            error: err,
          });
        });
    }
  },

  deletePhotoAlbum: async (req, res) => {
    const album = req.params.id;

    await Photo.destroy({
      where: {
        albumId: album,
      },
    })
      .then(() => {
        return res.status(200).send({
          success: true,
          message: "Album deleted",
        });
      })
      .catch((err) => {
        return res.status(500).send({
          success: false,
          error: err,
        });
      });
  },

  deletePhoto: async (req, res) => {
    const photoId = req.params.id;

    await Photo.destroy({
      where: {
        id: photoId,
      },
    })
      .then(() => {
        return res.status(200).send({
          success: true,
          message: "Photo deleted",
        });
      })
      .catch((err) => {
        return res.status(500).send({
          success: false,
          error: err,
        });
      });
  },
};
