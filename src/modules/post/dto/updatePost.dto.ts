import { ApiProperty } from "@nestjs/swagger";

export class UpdatePostDto implements Readonly<UpdatePostDto> {

    id: number;

    @ApiProperty({ type: String })
    title?: string;

    @ApiProperty({ type: String })
    content?: string;

    createdAt?: string;

    @ApiProperty({ type: String })
    image?: string;

    adminId?: number;

    @ApiProperty({ type: String })
    category?: string;
}