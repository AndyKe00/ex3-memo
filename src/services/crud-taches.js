import firebase from 'firebase/app';
/* Ex3 - Point E)i) */
import { collUtil, collTaches } from './config';
import { instanceFirestore } from './firebase-initialisation';

/**
 * Créer une nouvelle tâche pour l'utilisateur connecté
 * @param {string} uid identifiant d'utilisateur Firebase 
 * @param {Object} tache document à ajouter aux tâches de l'utilisateur
 * @returns {Promise<null>} Promesse sans paramètre
 */
export async function creer(uid, tache) {
  // On ajoute la propriété 'date' à l'objet représentant la tâche en prenant la 
  // date du serveur Firestore.
  tache.date = firebase.firestore.FieldValue.serverTimestamp();
  /* Ex3 - Point E)ii) */
  return instanceFirestore.collection(collUtil).doc(uid).collection(collTaches).add(tache);
}

/**
 * Obtenir toutes les tâches d'un utilisateur
 * @param {string} uid identifiant d'utilisateur Firebase 
 * @returns {Promise<any[]>} Promesse avec le tableau des tâches
 */
export async function lireTout(uid) {
  /* Ex3 - Point E)iii) */
  
  const taches = [];
  return instanceFirestore.collection(collUtil).doc(uid).collection(collTaches)
                .get().then(
                  reponse => reponse.forEach(
                    doc => {
                      taches.push({id: doc.id, ...doc.data()})
                    }
                  )
                ).then(
                  () => taches
                );
 
}