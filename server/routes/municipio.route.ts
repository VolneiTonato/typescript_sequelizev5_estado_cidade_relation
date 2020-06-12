import {Router} from 'express'
import {municipioController} from '../controllers/MunicipioController'


const router = Router()

router.route('/import').get(municipioController.import)
router.route('/show').get(municipioController.show)


export const RouterMunicipio = {
    route: '/municipios',
    router
}