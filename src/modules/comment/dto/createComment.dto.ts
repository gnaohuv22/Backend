import { ApiProperty } from "@nestjs/swagger";


export class createCommentDto {

    @ApiProperty({ type: Number })
    id?: number;

    @ApiProperty({ type: String })
    content?: string;

    @ApiProperty({ type: String })
    name?: string;

    @ApiProperty({ type: String })
    createdAt?: string;

    @ApiProperty({ type: String })
    postId?: number;

    @ApiProperty({ type: Number })
    replyCommentId?: number;
}