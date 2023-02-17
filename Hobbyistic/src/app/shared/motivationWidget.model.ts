export interface MotivationWidget {
    _id?:         string;
    user?:        User;
    hobby?:       Hobby;
    title?:       string;
    description?: string;
    sharable?:    boolean;
    postDate?:    Date;
    image?:       string;
    __v?:         number;
}

export interface Hobby {
    id?:   string;
    name?: string;
}

export interface User {
    _id?:  string;
    name?: string;
    __v?:  number;
}