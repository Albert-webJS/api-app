import { Router } from "express";

export const userRouter: Router = Router()

userRouter.post('/login', (request, response) => {
    response.send('login');
})

userRouter.post('register', (request, response) => {
    response.send('register');
})