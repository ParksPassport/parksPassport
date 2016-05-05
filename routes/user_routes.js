'use strict';

let parser = require('body-parser');
let User = require(__dirname + '/../models/user_model');
let jwtAuth = require(__dirname + '/../lib/jwt_auth');
let handleDBError = require(__dirname + '/../lib/handle_db_error');

module.exports = (router) => {
  router.use(parser.json());

  router.route('/users')
    .get(jwtAuth, (req, res) => {
      if (req.user.admin) {
        User.find({}, (err, users) => {
          if (err) return handleDBError(err, res);
          res.json({users});
        });
      } else {
        return res.json({msg: 'Access denied'});
      }
    });

  router.route('/users/:user')
    .get(jwtAuth, (req, res) => {
      if (req.params.user == req.user._id || req.user.admin) {
        User.findOne({_id: req.params.user}, (err) => {
          if (err) return handleDBError(err, res);
        })
        .populate('list.item', 'properties')
        .exec((err, user) => {
          if (err) return handleDBError(err, res);
          res.json(user);
        });
      } else {
        return res.json({msg: 'Access denied'});
      }
    })

    .put(jwtAuth, (req, res) => {
      if (req.params.user == req.user._id || req.user.admin) {
        User.findByIdAndUpdate(req.params.user, req.body, (err) => {
          if (err) return handleDBError(err, res);
          res.json({msg: 'success'});
        });
      } else {
        return res.json({msg: 'Access denied'});
      }
    })


    .delete(jwtAuth, (req, res) => {
      if (req.user.admin) {
        User.findById(req.params.user, (err, user) => {
          user.remove((err) => {
            if (err) return handleDBError(err, res);
            res.json({msg: 'User removed'});
          });
        });
      } else {
        return res.json({msg: 'Access denied'});
      }
    });

  router.route('/users/:user/list')
    .get(jwtAuth, (req, res) => {
      if (req.params.user == req.user._id || req.user.admin) {
        User.findOne({_id: req.params.user}, (err) => {
          if (err) return handleDBError(err, res);
        })
        .populate('list.item', 'properties')
        .exec((err, user) => {
          if (err) return handleDBError(err, res);
          console.log(user.list)
          res.json(user.list);
        });
      } else {
        return res.json({msg: 'Access denied'});
      }
    });
    router.route('/addpark/:park')
      .put(jwtAuth, (req, res) => {
        var updatedUser = req.user;
        updatedUser.list.push({
          item: req.params.park,
          completed: false
        });

        User.findByIdAndUpdate(updatedUser._id, updatedUser, (err) => {
          if (err) return handleDBError(err, res);
          res.json({msg: 'success'});
        });
      })
};
