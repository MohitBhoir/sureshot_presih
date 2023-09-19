const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const Db = require("../../dboperations")
const config = require('../../dbconfig');
const asyncHandler=require("express-async-handler")
require('dotenv').config();


const login = asyncHandler(async (req, res) => {
  let userinfo = {... req.body};
  Db.getLoginInfo(userinfo).then(result =>{
    if(result[0].length == 0){
      return res.json({
        success: 0,
        data: "Invalid email or password"});
    } else {
      const results = compareSync(userinfo.Password, result[0][0].Password);
      if (results) {
        result[0][0].password = undefined;
        const jsontoken = sign({ results: result[0][0] }, process.env.JWT_SECRET_KEY, {
          expiresIn: "10h"
        });
        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken,
          user: result[0][0]
        });
      } 
  else{
    return res.json({
      success: 0,
      data: "Invalid username or password"
    })
}}})})

module.exports = {
  createUser: async (req, res) => {
    let Userstable = {... req.body};
    const salt = genSaltSync(10);
    Userstable.Password = hashSync(Userstable.Password, salt);
    Db.addUser(Userstable).then(result=>
      {
          res.status(201).json(result);
      })
  },
  login: login
};