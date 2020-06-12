import axios, {AxiosInstance} from 'axios'


const configAxios = axios.create({baseURL:'https://servicodados.ibge.gov.br/api/v1/localidades'})

export abstract class AbstractService{

    readonly axios : AxiosInstance = configAxios

}