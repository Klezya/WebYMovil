import { inject } from "@angular/core"
import { CanActivateFn, Router } from "@angular/router"
import { AuthStateService } from "./data-access/auth-state.service"
import { map } from "rxjs"


//Guards para las rutas privadas(acceso con sesion iniciada) y publicas(acceso sin sesion iniciada)

//privateGuard Comprueba que exista un estado autenticado, sino deniega el acceso a la ruta y redirige al log-in
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

//publicGuard Comprueba si existe un estado autenticado, si existe redirige a la ruta 'tramites' y bloquea el acceso a 'log-in' amenos que se cierre sesion
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