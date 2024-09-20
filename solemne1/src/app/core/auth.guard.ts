import { inject } from "@angular/core"
import { CanActivateFn, Router } from "@angular/router"
import { AuthStateService } from "./data-access/auth-state.service"
import { map } from "rxjs"

export const privateGuard = (): CanActivateFn => {
    return() =>{

        const router = inject(Router)
        const authState = inject(AuthStateService)

        return authState.authState$.pipe(
            map(state =>{
                if(!state) {
                    router.navigateByUrl('/auth/log-in')
                    return false
                }
                return true
            })
        )
    }
}

export const publicGuard = (): CanActivateFn => {
    return() =>{

        const router = inject(Router)
        const authState = inject(AuthStateService)

        return authState.authState$.pipe(
            map(state =>{
                if(state) {
                    router.navigateByUrl('/tramites')
                    return false
                }
                return true
            })
        )
    }
}

export const agendaGuard = (): CanActivateFn =>{
    return() => {

        return true
    }
}