import * as firebaseAdmin from "firebase-admin";
import * as firebaseClient from "firebase";
import UserRecord = firebaseAdmin.auth.UserRecord;
import ListUsersResult = firebaseAdmin.auth.ListUsersResult;
import UserCredential = firebaseClient.auth.UserCredential;
import {adminAuth, clientAuth} from "../../common/services/firebase.service";
import * as admin from "firebase-admin";
import DecodedIdToken = admin.auth.DecodedIdToken;

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

export const signin = (data: any) => {

    return clientAuth.signInWithEmailAndPassword(data.email, data.password).then((user: UserCredential) => {
        if (user && user.user) {
            return user.user.getIdToken(true);
        } else {

            throw {
                code: 'auth/user-not-defined',
                message: 'User is not defined.'
            };
        }
    });
};

export const signout = (uid: string) => {

    return adminAuth.revokeRefreshTokens(uid);
};

export const access = (currentUser: DecodedIdToken, claimData: any) => {

    if (currentUser.admin && currentUser.uid !== claimData.uid) {

        return adminAuth.setCustomUserClaims(claimData.uid, claimData.access);
    } else {

        throw {
            code: 'access/cannot-change-access',
            message: `Potential reasons: - not being admin - trying to change your own access.`
        };
    }
};

