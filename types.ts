/* The code is defining an interface named `Billboard`. An interface in TypeScript is a way to define
the structure of an object. */
export interface Billboard {
    id: string;
    name: string;
    imageUrl: string;
};

/* The code is defining an interface named `category`. This interface has three properties: `id`,
`name`, and `billboard`. The `id` and `name` properties are of type `string`, while the `billboard`
property is of type `Billboard`. The `Billboard` type is another interface that is defined earlier
in the code. */
export interface category {
    id: string;
    name: string;
    billboard: Billboard;
};