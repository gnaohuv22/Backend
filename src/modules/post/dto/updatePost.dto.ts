export class UpdatePostDto implements Readonly<UpdatePostDto> {

    id: number;

    title?: string;

    content?: string;

    createdAt?: string;

    image?: string;

    adminId?: number;

    category?: string;
}