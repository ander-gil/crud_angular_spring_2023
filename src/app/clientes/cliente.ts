export class Cliente {
    id?: number;
    nombre?: string;
    apellido?: string;
    email?: string;
    createAt?: Date;
  }



/* export interface General {
    content:          Cliente[];
    pageable:         Pageable;
    totalPages:       number;
    totalElements:    number;
    last:             boolean;
    size:             number;
    number:           number;
    sort:             Sort;
    numberOfElements: number;
    first:            boolean;
    empty:            boolean;
}

export interface Cliente {
    id:       number;
    nombre:   string;
    apellido: string;
    email:    string;
    createAt: Date;
}

export interface Pageable {
    sort:       Sort;
    offset:     number;
    pageNumber: number;
    pageSize:   number;
    paged:      boolean;
    unpaged:    boolean;
}

export interface Sort {
    empty:    boolean;
    sorted:   boolean;
    unsorted: boolean;
}
 */