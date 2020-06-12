import { Request, Response } from 'express';
import { ExceptionError } from '../exceptios/customException'


export function errorHandler(err: ExceptionError, req: Request, res: Response, next: any): Response {
    const status = err.status || 500
    const message = err.message || 'Erro interno no servidor'
    return res.status(status).send({ message: message })
}