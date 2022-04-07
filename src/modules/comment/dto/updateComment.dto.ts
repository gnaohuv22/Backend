import { ApiProperty } from "@nestjs/swagger";

export class UpdateCommentDto implements Readonly<UpdateCommentDto> {
    @ApiProperty({ type: Number })
    id: number;

    @ApiProperty({ type: String})
    content?: string;

    @ApiProperty({ type: String})
    name?: string;

    createdAt?: string;

    postId?: number;

    replyCommentId?: number;
}