export interface Root<T> {
    code: number
    message: string
    data: Login
}

export interface Login {
    user: User
    token: string
}

export interface User {
    id: number
    nom: string
    email: string
    prenom: string
    role: string
}