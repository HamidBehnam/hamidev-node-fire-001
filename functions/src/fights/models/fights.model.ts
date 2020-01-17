import DocumentReference = FirebaseFirestore.DocumentReference;
import DocumentSnapshot = FirebaseFirestore.DocumentSnapshot;
import QueryDocumentSnapshot = FirebaseFirestore.QueryDocumentSnapshot;
import QuerySnapshot = FirebaseFirestore.QuerySnapshot;
import {db} from '../../common/services/firebase.service';
import {Role} from "../../common/services/constants.service";
import {documentLevelAuthorization} from "../../common/services/authorization.service";

export const addFight = async (data: any) => {

    const fightRef: DocumentReference = await db.collection('fights').add(data);
    const fightSnapshot: DocumentSnapshot = await fightRef.get();

    return {
        ...fightSnapshot.data(),
        id: fightSnapshot.id
    };
};

export const getFights = async (userId: string) => {

    const fightsQuerySnapshot: QuerySnapshot = await db.collection('fights').where('createdBy', '==', userId).get();
    return fightsQuerySnapshot.docs.map((doc: QueryDocumentSnapshot) => ({
        ...doc.data(),
        id: doc.id
    }));
};

export const getFight = async (userId: string, fightId: string) => {

    const fightSnapshot: DocumentSnapshot = await db.collection('fights').doc(fightId).get();

    if (fightSnapshot.exists) {

        //TODO: documentLevelAuthorization is not used for all the paths and resources, it's only used here as a sample.
        // the same approach can be used for other paths and resources like getLocations, ...
        const role: Role = await documentLevelAuthorization(userId, 'permissions', fightSnapshot);

        const fightData = fightSnapshot.data();

        if (role > Role.Guest) {

            return {
                ...fightData,
                id: fightSnapshot.id
            };
        } else {

            throw {
                status: 401,
                message: `Not Authorized!`
            };
        }
    } else {

        throw {
            status: 404,
            message: 'Not Found!'
        };
    }
};

export const patchFight = async (fightId: string, fightData: any) => {

    const fightRef: DocumentReference = db.collection('fights').doc(fightId);
    await fightRef.update(fightData);
    // update vs set? set creates a new document if the provided id does not exist also
    // it completely replaces the document if we don't use { merge: true } as the option.
    // update returns an error if the provided id doesn't exist and it doesn't replace the entire document.
    const updatedFightSnapshot: DocumentSnapshot = await fightRef.get();

    return {
        ...updatedFightSnapshot.data(),
        id: updatedFightSnapshot.id
    };
};

export const putFight = async (fightId: string, fightData: any) => {

    const fightRef: DocumentReference = db.collection('fights').doc(fightId);
    const fightSnapshot: DocumentSnapshot = await fightRef.get();

    if (fightSnapshot.exists) {

        await fightRef.set(fightData);
        const updatedFightSnapshot: DocumentSnapshot = await fightRef.get();

        return {
            ...updatedFightSnapshot.data(),
            id: updatedFightSnapshot.id
        };
    } else {

        throw {
            status: 404,
            message: 'The requested fight does not exist.'
        };
    }
};

export const deleteFight = async (fightId: string) => {

    const fightRef: DocumentReference = db.collection('fights').doc(fightId);
    const fightSnapshot: DocumentSnapshot = await fightRef.get();

    if (fightSnapshot.exists) {

        await fightRef.delete();
        return {
            id: fightId
        };
    } else {

        throw {
            status: 404,
            message: 'The requested fight does not exist.'
        };
    }
};

export const addPermission = async (userId: string, fightId: string, permissionData: any) => {

    const fightRef: DocumentReference = db.collection('fights').doc(fightId);
    const fightSnapshot: DocumentSnapshot = await fightRef.get();

    if (fightSnapshot.exists) {

        const fightData = fightSnapshot.data();

        //TODO: currently only the creator of the document can set the permission for the document, but later I can use
        // documentLevelAuthorization to find out what the user's Role is and let the permission be set by Creator "or" the Owners.
        if (fightData && fightData.createdBy === userId) {

            const permissionRef: DocumentReference = fightRef.collection('permissions').doc(permissionData.uid);
            await permissionRef.set(permissionData.permission);
            const permissionSnapshot: DocumentSnapshot = await permissionRef.get();

            return {
                ...permissionSnapshot.data(),
                id: permissionSnapshot.id
            };
        } else {

            throw {
                status: 401,
                message: 'Not authorized!'
            };
        }
    } else {

        throw {
            status: 404,
            message: 'Not Found!'
        };
    }
};

export const addLocation = async (fightId: string, locationData: any) => {

    const fightRef: DocumentReference = db.collection('fights').doc(fightId);
    const fightSnapshot: DocumentSnapshot = await fightRef.get();

    if (fightSnapshot.exists) {
        const locationRef: DocumentReference = await fightRef.collection('locations').add(locationData);
        const locationSnapshot: DocumentSnapshot = await locationRef.get();

        return {
            ...locationSnapshot.data(),
            id: locationSnapshot.id
        };
    } else {

        throw {
            status: 404,
            message: 'The requested fight does not exist.'
        };
    }
};

export const getLocations = async (fightId: string) => {

    const locationQuerySnapshot: QuerySnapshot = await db.collection('fights').doc(fightId).collection('locations').get();
    return locationQuerySnapshot.docs.map((locationDocumentSnapshot: QueryDocumentSnapshot) => ({
        ...locationDocumentSnapshot.data(),
        id: locationDocumentSnapshot.id
    }));
};

export const getLocation = async (fightId: string, locationId: string) => {

    const locationSnapshot: DocumentSnapshot = await db.collection('fights').doc(fightId).collection('locations').doc(locationId).get();

    if (locationSnapshot.exists) {

        return {
            ...locationSnapshot.data(),
            id: locationSnapshot.id
        };
    } else {

        throw {
            status: 404,
            message: 'The requested location does not exist.'
        };
    }
};

export const patchLocation = async (fightId: string, locationId: string, locationData: any) => {

    const locationRef: DocumentReference = db.collection('fights').doc(fightId).collection('locations').doc(locationId);
    await locationRef.update(locationData);

    const locationSnapshot: DocumentSnapshot = await locationRef.get();

    return {
        ...locationSnapshot.data(),
        id: locationSnapshot.id
    };
};

export const deleteLocation = async (fightId: string, locationId: string) => {

    const locationRef: DocumentReference = db.collection('fights').doc(fightId).collection('locations').doc(locationId);
    const locationSnapshot: DocumentSnapshot = await locationRef.get();

    if (locationSnapshot.exists) {

        await locationRef.delete();
        return {
            id: locationId
        };
    } else {

        throw {
            status: 404,
            message: 'The requested location does not exist.'
        };
    }
};
