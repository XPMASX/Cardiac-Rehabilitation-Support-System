import UserList from '../_mockApis/userList';

const get = (offset = 0, size = 50) => UserList;

const add = (userDto) => userDto;

const UserController = {
    get,
    add
};

export default UserController;
