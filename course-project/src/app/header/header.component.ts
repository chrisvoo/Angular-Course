import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {AuthServiceService} from "../auth/auth-service.service";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppStore} from "../store/store.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private userSub: Subscription
  public isAuthenticated = false

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthServiceService,
    private store: Store<AppStore>
  ) {
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }

  ngOnInit(): void {
    this.userSub = this.store.select('auth').subscribe(authState => {
      this.isAuthenticated = !!authState.user
    })
  }

  onSaveData() {
    this.dataStorageService.storeRecipes()
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe()
  }

  onLogout() {
    this.authService.logout()
  }
}
