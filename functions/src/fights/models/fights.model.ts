import DocumentReference = FirebaseFirestore.DocumentReference;
import DocumentSnapshot = FirebaseFirestore.DocumentSnapshot;
import QueryDocumentSnapshot = FirebaseFirestore.QueryDocumentSnapshot;
import QuerySnapshot = FirebaseFirestore.QuerySnapshot;
import {db} from '../../common/firebase.service';

export const addFight = async (data: any) => {
    const fightRef: DocumentReference = await db.collection('fights').add(data);
    const fightSnapshot: DocumentSnapshot = await fightRef.get();

    return {
        ...fightSnapshot.data(),
        id: fightSnapshot.id
    };
};

export const getFights = async () => {

    const fightsQuerySnapshot: QuerySnapshot = await db.collection('fights').get();
    return fightsQuerySnapshot.docs.map((doc: QueryDocumentSnapshot) => ({
        ...doc.data(),
        id: doc.id
    }));
};

export const getFight = async (fightId: string) => {

    const fightSnapshot: DocumentSnapshot = await db.collection('fights').doc(fightId).get();

    return fightSnapshot.exists ? {
        ...fightSnapshot.data(),
        id: fightSnapshot.id
    } : null;
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

        return null;
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

        return null;
    }
};
