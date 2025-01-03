export type Movie  = {
    id: number, 
    title : string,
    poster_path : string,
    vote_average : number,
    overview : string ,
    release_date : string,
    adult : boolean,
    runtime : number,
    vote_count : number 
    backdrop_path : string
    genres: { id: number; name: string }[]
    crew: { id: number; cast: object[], crew: object[] }[]
  }

  export type Credits = {
      id: number,  
      crew: {
        id: number
        department: string
        name: string
      } []
      cast: {
        id: number
        department: string
        name: string
      } []
      poster_path: string
  }

export type PageInfo = {
    totalPage: number,
    currentPage: number
  }

export type Genre = {
    id: number,
    name: string
  }