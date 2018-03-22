export interface UsuarioDTO {
    id: string;
    nome: string;
    email: string;
    imageUrl?: string;
    perfis: any;
    solicitacoes: any;
}