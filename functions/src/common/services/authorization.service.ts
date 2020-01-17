import {Role} from "./constants.service";
import DocumentSnapshot = FirebaseFirestore.DocumentSnapshot;
import DocumentReference = FirebaseFirestore.DocumentReference;

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
