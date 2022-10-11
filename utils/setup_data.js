const User = require("../models/User");
const CryptoJS = require("crypto-js");

const setUpData = async () => {
  const USER_1 = {
    username: "user1",
    email: "user1@example.com",
    password: CryptoJS.AES.encrypt("user1", process.env.PASS_SEC),
  };
  const ADMIN_USER_1 = {
    username: "admin1",
    email: "admin1@example.com",
    roles: ["ROLE_ADMIN", "ROLE_USER"],
    password: CryptoJS.AES.encrypt("admin1", process.env.PASS_SEC),
  };
  const ADMIN_USER_2 = {
    username: "admin2",
    email: "admin2@example.com",
    roles: ["ROLE_ADMIN", "ROLE_USER"],
    password: CryptoJS.AES.encrypt("admin2", process.env.PASS_SEC),
  };

  const user1 = new User(USER_1);
  const user = await User.findOne({username: user1.username});
  if (!user) {
    await user1.save();
  }
  const adminUser1 = new User(ADMIN_USER_1);
  const userAdmin1 = await User.findOne({username: adminUser1.username});
  if (!userAdmin1) {
    await adminUser1.save();
  }
  const adminUser2 = new User(ADMIN_USER_2);
  const userAdmin2 = await User.findOne({username: adminUser2.username});
  if (!userAdmin2) {
    await adminUser2.save();
  }
};

module.exports = setUpData;
