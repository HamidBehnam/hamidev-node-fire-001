import * as admin from "firebase-admin";
import UserRecord = admin.auth.UserRecord;
import {auth} from "../../common/services/firebase.service";
import ListUsersResult = admin.auth.ListUsersResult;

export const createUser = async (data: any) => {
    const user: UserRecord = await auth.createUser(data);

    return {
        ...user,
        additionalInfo: 'this is the additional info'
    };
};

export const listUsers = async () => {
    const users: ListUsersResult = await auth.listUsers();

    return {
        ...users,
        count: users.users.length,
        additionalInfo: 'this is additional info'
    };
};
