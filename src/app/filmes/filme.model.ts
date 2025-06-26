export type FilmeStatus = 'pendente' | 'assistido' | 'em andamento';

export class Filme {
    constructor(
        public id: string, //string para facilitar o link único
        public titulo: string,
        public descricao: string = '',
        public status: FilmeStatus = 'pendente',
        public imagem?: string // URL da imagem (opcional) 
    ){}
}

