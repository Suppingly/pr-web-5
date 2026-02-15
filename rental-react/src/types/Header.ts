export interface Header{
    id:number;
    title:string;
    desc:string;
    category:string;
    image:string;
    author:string;
    createdAt:string;
}
export interface UpdateHeader{
    header: Header;
    authors: Authors[];
    onSave: () => void;
    onClose: () => void;
}
export interface DeleteHeader{
    id: Number;
    onSave: () => void;
    onClose: () => void;
}
export interface Authors{
    id: number;
    name: string;
}