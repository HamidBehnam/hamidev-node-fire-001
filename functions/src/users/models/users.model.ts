import * as firebaseAdmin from "firebase-admin";
import * as firebaseClient from "firebase";
import UserRecord = firebaseAdmin.auth.UserRecord;
import ListUsersResult = firebaseAdmin.auth.ListUsersResult;
import DecodedIdToken = firebaseAdmin.auth.DecodedIdToken;
import UserCredential = firebaseClient.auth.UserCredential;
import {adminAuth, clientAuth} from "../../common/services/firebase.service";

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

export const signIn = (data: any) => {

    return clientAuth.signInWithEmailAndPassword(data.email, data.password).then((user: UserCredential) => {
        if (user && user.user) {
            return user.user.getIdToken(true);
        } else {

            throw {
                status: 404,
                message: 'User is not defined.'
            };
        }
    });
};

export const signOut = (uid: string) => {

    return adminAuth.revokeRefreshTokens(uid);
};

export const access = (currentUser: DecodedIdToken, claimData: any) => {

    if (currentUser.uid !== claimData.uid) {

        return adminAuth.setCustomUserClaims(claimData.uid, claimData.access);
    } else {

        throw {
            status: 403,
            message: `Potential reason: - trying to change your own access.`
        };
    }
};

