export interface ICreateProduct {

        title:string,
        description: string,
        price:number,
        isAvailable:boolean,
        variant: 'MEC' | 'POQR' | undefined | string,
        imagesSrc:File | undefined,
        country: string,
        flag: string
}

export interface IAllProducts {
    data:{
        country: string,
        flag: string | undefined,
        description: string,
        imagesSrc: string,
        isAvailable: boolean,
        price: number,
        title: string,
        variant:"POQR"|"MEC" | undefined,
        __v: number,
        _id:string
    }[]
}

export type IEditProduct = {
    id:string,
    title:string,
    description: string,
    price:number,
    isAvailable: string
}

export interface IDetails  {
         title: string,
        img: string,
        _id:string,
        description: string,
        price: string,
        isAvailable:boolean,
        flag: string,
        country: string
}

export interface IProduct {
    products: IAllProducts,
    loading: boolean,
    error: string
}
