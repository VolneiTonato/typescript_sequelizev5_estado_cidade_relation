import {Router} from 'express'
import {estadoController} from '../controllers/EstadoController'


const router = Router()

router.route('/import').get(estadoController.import)
router.route('/show').get(estadoController.show)


export const RouterEstado = {
    route: '/estados',
    router
}