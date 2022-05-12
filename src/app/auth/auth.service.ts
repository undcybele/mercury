import {Injectable, NgZone} from '@angular/core';
import {IUser} from '../models/IUser';
import * as auth from 'firebase/auth';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import {Router} from '@angular/router';
import {NbToastrService} from "@nebular/theme";
import {showToast} from "../utils/toast";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  currentUser!: IUser
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private toastService: NbToastrService,
) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
        this.afs.collection<IUser>('users').valueChanges().subscribe(data => {
          data = data.filter(({uid}) => uid === user.uid!);
          this.currentUser = data[0];
          console.log(this.currentUser)
        });
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
        showToast(this.toastService, "Signed in successfully", "Success!", 'success')
      })
      .catch((error) => {
        showToast(this.toastService, `${error}`, "Error!", 'warning')
      });
  }

  // Sign up with email/password
  SignUp(email: string, password: string, username: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(username)
        const user: IUser = {email: email, displayName: username, uid: result.user!.uid}
        this.SetUserData(user).then(() => showToast(this.toastService, "Go to your dashboard", "Welcome back!", 'success')
        );
      })
      .catch((error) => {
        showToast(this.toastService, `${error}`, "Oops!", 'danger')
      });
  }

  // Reset Forgot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        showToast(this.toastService, `An email has been sent to your address`, "Check your mail!", 'success')
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
          this.router.navigate(['auth']));
      })
      .catch(() => {
        showToast(this.toastService, `The email you introduced is not attributed to any user`, "Oops!", 'danger')
      });
  }

  // Returns an IUser object when a user is logged in
  get getLoggedUser(): IUser {
    return JSON.parse(localStorage.getItem('user')!);
  }

  // Returns true when user is logged in and email is verified
  get isLoggedIn(): boolean {
    return this.getLoggedUser !== null
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
      }
    });
  }

  // Auth logic to run auth providers
  private AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.SetUserData(result.user).then();
        showToast(this.toastService, "Go to your dashboard", "Welcome back!", 'success')
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
          this.router.navigate(['dashboard']));
      })
      .catch(() => {
        showToast(this.toastService, `Your username or password might be wrong`, "Oops!", 'danger')
      });
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    return userRef.set(user, {
      merge: true,
    });
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
}
