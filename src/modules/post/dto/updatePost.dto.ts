import { ApiProperty } from "@nestjs/swagger";

export class UpdatePostDto implements Readonly<UpdatePostDto> {

    @ApiProperty({ type: Number })
    id: number;

    @ApiProperty({ type: String })
    title?: string;

    @ApiProperty({ type: String })
    content?: string;

    @ApiProperty({ type: String })
    image?: Array<string>;

    @ApiProperty({ type: Number})
    onTheSlide?: number;
}