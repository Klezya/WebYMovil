import { Component, inject } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { AuthStateService } from "../data-access/auth-service.service";
import { RouterLink } from "@angular/router";

@Component({
    standalone: true,
    imports: [RouterModule],
    selector: 'app-layout',
    templateUrl: './layout.component.html'
})

export default class LayoutComponent {

    private _router = inject(Router)
    private _authState = inject(AuthStateService)

    async logOut(){
        await this._authState.logOut()
        this._router.navigateByUrl('auth/log-in')
    }
}