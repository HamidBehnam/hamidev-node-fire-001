import DocumentReference = FirebaseFirestore.DocumentReference;
import DocumentSnapshot = FirebaseFirestore.DocumentSnapshot;
import QueryDocumentSnapshot = FirebaseFirestore.QueryDocumentSnapshot;
import QuerySnapshot = FirebaseFirestore.QuerySnapshot;
import {db} from '../../common/services/firebase.service';

export const addFight = async (data: any) => {
    const fightRef: DocumentReference = await db.collection('fights').add(data);
    const fightSnapshot: DocumentSnapshot = await fightRef.get();

    return {
        ...fightSnapshot.data(),
        id: fightSnapshot.id
    };

    // if (data.locations) {
    //     // TODO: the problem is that you can't add an array like this, you need to add an object.
    //     const fightLocationsRef: DocumentReference = await fightRef.collection('locations').add(data.locations);
    //     const fightLocationsSnapshot: DocumentSnapshot = await fightLocationsRef.get();
    //
    //     addedFightData = {
    //         ...addedFightData,
    //         locations: fightLocationsSnapshot.data()
    //     };
    // }
};

export const getFights = async () => {

    //TODO: Remove this comment block later

    // const innerFightRef: DocumentReference = await db.collection('fights').doc().collection('hjhjhjhjh').add({
    //     name: 'something else',
    //     code: 'SDF345'
    // });
    //
    // const innerFightSnapshot: DocumentSnapshot = await innerFightRef.get();
    //
    // console.log(innerFightSnapshot.data());

    const fightsQuerySnapshot: QuerySnapshot = await db.collection('fights').get();
    return fightsQuerySnapshot.docs.map((doc: QueryDocumentSnapshot) => ({
        ...doc.data(),
        id: doc.id
    }));
};

export const getFight = async (fightId: string) => {

    const fightSnapshot: DocumentSnapshot = await db.collection('fights').doc(fightId).get();

    if (fightSnapshot.exists) {

        return {
            ...fightSnapshot.data(),
            id: fightSnapshot.id
        };
    } else {

        throw {
            code: 'fights/fight-does-not-exist',
            message: 'The requested fight does not exist.'
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
            code: 'fights/fight-does-not-exist',
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
            code: 'fights/fight-does-not-exist',
            message: 'The requested fight does not exist.'
        };
    }
};

export const addLocation = async (fightId: string, locationData: any) => {

    const fightRef: DocumentReference = await db.collection('fights').doc(fightId);
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
            code: 'fights/fight-does-not-exist',
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
            code: 'fights/locations/location-does-not-exist',
            message: 'The requested location does not exist.'
        };
    }
};
