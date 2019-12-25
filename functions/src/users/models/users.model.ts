import * as firebaseAdmin from "firebase-admin";
import UserRecord = firebaseAdmin.auth.UserRecord;
import ListUsersResult = firebaseAdmin.auth.ListUsersResult;
import {adminAuth} from "../../common/services/firebase.service";

export const createUser = async (data: any) => {
    const user: UserRecord = await adminAuth.createUser(data);

    return {
        ...user,
        additionalInfo: 'this is the additional info'
    };
};

export const listUsers = async () => {
    const users: ListUsersResult = await adminAuth.listUsers();

    return {
        ...users,
        count: users.users.length,
        additionalInfo: 'this is additional info'
    };
};
