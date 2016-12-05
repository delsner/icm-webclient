import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { Angular2FlexModule } from 'angular2-flex';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { ClientModule } from './client/client.module';
import { LoginModule } from './login/login.module';
import { SettingsModule } from './settings/settings.module';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
// Self-written classes
// import { EmailComponent,SettingsComponent, NoContentComponent, LoginComponent } from './pages'; // all pages
// import { EmailModalComponent, TaskListComponent } from './pages'; // all containers
// import { ListComponent,ListItemComponent, DetailedViewComponent, EmailFormComponent } from './pages'; // all email components
// import { AccountComponent, OverviewComponent, TasksComponent, HelpComponent, GmailComponent, ExchangeComponent, SocioCortexComponent, TrelloComponent } from './pages'; // all settings components
import { NavBarComponent, SpinnerComponent, NavBarListItemComponent} from './shared'; // all shared components
import { AuthService, HttpService } from './shared';
import { EmailService, TaskService } from './client/shared';
import { AuthGuard } from './app.authGuard';
import { User } from './shared';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    // pages
    // EmailComponent,
    // SettingsComponent,
    // LoginComponent,
    // NoContentComponent,
    // //containers
    // TaskListComponent,
    // EmailModalComponent,
    // //email components
    // ListComponent,
    // ListItemComponent,
    // DetailedViewComponent,
    // EmailFormComponent,
    //settings components
    // AccountComponent,
    // TasksComponent,
    // HelpComponent,
    // OverviewComponent,
    // GmailComponent,
    // ExchangeComponent,
    // TrelloComponent,
    // SocioCortexComponent,
    // shared-components
    NavBarComponent,
    NavBarListItemComponent,
    SpinnerComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    Ng2BootstrapModule,
    Angular2FlexModule.forRoot(),
    // custom modules
    LoginModule,
    ClientModule,
    SettingsModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    // external
    CookieService,
    // services
    AuthGuard,
    AuthService,
    HttpService,
    EmailService,
    TaskService
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) { }

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
