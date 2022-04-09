import { ApiProperty } from "@nestjs/swagger";


export class createPostDto {

    @ApiProperty({ type: Number })
    id?: number;

    @ApiProperty({ type: String })
    title?: string;

    @ApiProperty({ type: String })
    content?: string;

    @ApiProperty({ type: String })
    createdAt?: string;

    @ApiProperty({ type: String })
    image?: Array<string>;

    @ApiProperty({ type: String })
    category?: string;

    @ApiProperty({ type: Boolean })
    onTheSlide?: boolean;
}