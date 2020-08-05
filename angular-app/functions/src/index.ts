import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const createProfile = functions.auth.user().onCreate(user => {
  console.log("creating new account . . .");
  admin.firestore().collection('users').doc(user.uid).set({
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoUrl: user.photoURL,
    bio: "",
    tags: [],
    following: [],
    snippets: [],
  }, { merge: true })
    .then(() => console.log("New user profile created"))
    .catch(() => console.log("Error encountered when creating new profile"));
});

export const wrfitePing = functions.firestore.document('projects/{projectId}')
  .onWrite((change, context) => {
    console.log("some document changed");
});
