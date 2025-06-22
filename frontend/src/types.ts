export type User={
    _id:string,
    email:string,
    name:string,
    collegeId:string,
    branch:string,
}

export type Item={
    _id:string,
    name:string;
    price:number,
    availabile:boolean,
}

export type Store={
    _id:string,
    user:string,
    storeName:string,
    description:string,
    cuisines:string[],
    items:Item[],
    imageUrl:string,
    lastUpdated:string,
}