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
    cours: Cours[]
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


// export interface Root {
//     code: number
//     message: string
//     data: Daum[]
//   }
  
  export interface Cours{
    id: number
    semestre: string
    module: string
    professeur: string
    etat: string
    classes: Class[]
  }
  
  export interface Class {
    id: number
    classe: string
    effectif: number
    nombre_heures: number
  }