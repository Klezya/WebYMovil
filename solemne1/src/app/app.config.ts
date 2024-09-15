import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'solemne1-devwym',
        appId: '1:555161442742:web:76b068f4d3806837fb8917',
        databaseURL: 'https://solemne1-devwym-default-rtdb.firebaseio.com',
        storageBucket: 'solemne1-devwym.appspot.com',
        apiKey: 'AIzaSyAK8iyN_cYs9G9y_Xw9z7Lk0ogO5BNRtL0',
        authDomain: 'solemne1-devwym.firebaseapp.com',
        messagingSenderId: '555161442742',
        measurementId: 'G-QX95RCF5T0',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
  ],
};
