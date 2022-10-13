const allRoles = {
  ROLE_USER: ['login', 'register', 'logout'],
  ROLE_ADMIN: ['getUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
