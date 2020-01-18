import {Role} from "./constants.service";
import * as firebaseAdmin from 'firebase-admin';
import DocumentSnapshot = firebaseAdmin.firestore.DocumentSnapshot;
import DocumentReference = firebaseAdmin.firestore.DocumentReference;

export const documentLevelAuthorization = async (userId: string, permissionCollection: string, documentSnapshot: DocumentSnapshot): Promise<Role> => {

    const documentData = documentSnapshot.data();

    if (documentData && documentData.createdBy === userId) {

        return Role.Creator;
    } else {

        const documentRef: DocumentReference = documentSnapshot.ref;
        const permissionDocument: DocumentReference = documentRef.collection(permissionCollection).doc(userId);
        const permissionSnapshot: DocumentSnapshot = await permissionDocument.get();

        if (permissionSnapshot.exists) {

            const permissionData = permissionSnapshot.data();

            if (permissionData) {

                return permissionData.role;
            } else {

                return Role.Guest;
            }
        } else {

            return Role.Guest;
        }
    }
};
