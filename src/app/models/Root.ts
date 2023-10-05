export interface Root<T> {
    code: number
    message: string
    data: T
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




export interface Dta {
    semestres: Semestre[]
    modules: Module[]
    professeurs: Profs[]
    classes: Classes[]
}

export interface Semestre {
    id: number
    libelle: string
}

export interface Module {
    id: number
    libelle: string
}

export interface Profs {
    id: number
    libelle: string
}

export interface Classes {
    id: number
    libelle: string
}