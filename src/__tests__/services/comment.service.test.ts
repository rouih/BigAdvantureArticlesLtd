import 'reflect-metadata';
import { CommentService } from '../../services/comment.service';
import { CreateCommentDto, CreateCommentResponseDto, FindCommentsByArticleDto, FindCommentByIdDto, FindCommentResponseDto } from '../../dtos/comment.dto';
import { IComment } from '../../models/comment.model';
import { MockCommentRepository } from '../../mocks/comment.mock.repository';
import { MockCommentMapper } from '../../mocks/mapper.service.mock';
import mongoose from "mongoose";

describe("CommentService", () => {
    let commentService: CommentService;
    let mockCommentRepository: MockCommentRepository;
    let mockCommentMapper: MockCommentMapper;
    let authorMockId: mongoose.Types.ObjectId;
    let articleMockId: mongoose.Types.ObjectId;

    beforeEach(() => {
        mockCommentRepository = new MockCommentRepository();
        mockCommentMapper = new MockCommentMapper();
        commentService = new CommentService(mockCommentRepository, mockCommentMapper);
        authorMockId = new mongoose.Types.ObjectId();
        articleMockId = new mongoose.Types.ObjectId();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should create a comment", async () => {
        // Arrange
        const createCommentDto = new CreateCommentDto({ content: "Test Comment", author: authorMockId.toString(), article: articleMockId.toString() });
        const mockComment: IComment = { content: "Test Comment", author: authorMockId, article: articleMockId } as IComment;
        const expectedResponseDto = new CreateCommentResponseDto({ id: "1", content: "Test Comment" });

        mockCommentRepository.create.mockResolvedValueOnce(mockComment);
        mockCommentMapper.toCreateCommentResponseDto.mockReturnValueOnce(expectedResponseDto);

        // Act
        const result = await commentService.create(createCommentDto, "user123");

        // Assert
        expect(mockCommentRepository.create).toHaveBeenCalledWith(createCommentDto, "user123");
        expect(mockCommentMapper.toCreateCommentResponseDto).toHaveBeenCalledWith(mockComment);
        expect(result).toEqual(expectedResponseDto);
    });

    it("should find comments by article ID", async () => {
        // Arrange
        const findCommentsByArticleDto = new FindCommentsByArticleDto({ articleId: articleMockId.toString() });
        const mockComments: IComment[] = [
            { _id: "1", content: "Comment 1", author: authorMockId, article: articleMockId } as IComment,
            { _id: "2", content: "Comment 2", author: authorMockId, article: articleMockId } as IComment
        ];
        const expectedResponseDto = [
            new FindCommentResponseDto({ content: "Comment 1" }),
            new FindCommentResponseDto({ content: "Comment 2" })
        ];

        mockCommentRepository.findCommentsByArticle.mockResolvedValueOnce(mockComments);
        mockCommentMapper.toFindCommentResponseDto.mockReturnValueOnce(expectedResponseDto[0]);
        mockCommentMapper.toFindCommentResponseDto.mockReturnValueOnce(expectedResponseDto[1]);

        // Act
        const result = await commentService.findCommentsByArticle(findCommentsByArticleDto);

        // Assert
        expect(mockCommentRepository.findCommentsByArticle).toHaveBeenCalledWith(findCommentsByArticleDto);
        expect(mockCommentMapper.toFindCommentResponseDto).toHaveBeenCalledTimes(2);
        expect(result).toEqual(expectedResponseDto);
    });

    it("should find a comment by ID", async () => {
        // Arrange
        const findCommentByIdDto = new FindCommentByIdDto({ commentId: "1" });
        const mockComment: IComment = { _id: "1", content: "Test Comment", author: authorMockId, article: articleMockId } as IComment;
        const expectedResponseDto = new FindCommentResponseDto({ content: "Test Comment" });

        mockCommentRepository.findCommentById.mockResolvedValueOnce(mockComment);
        mockCommentMapper.toFindCommentResponseDto.mockReturnValueOnce(expectedResponseDto);

        // Act
        const result = await commentService.findCommentById(findCommentByIdDto);

        // Assert
        expect(mockCommentRepository.findCommentById).toHaveBeenCalledWith(findCommentByIdDto);
        expect(mockCommentMapper.toFindCommentResponseDto).toHaveBeenCalledWith(mockComment);
        expect(result).toEqual(expectedResponseDto);
    });
});