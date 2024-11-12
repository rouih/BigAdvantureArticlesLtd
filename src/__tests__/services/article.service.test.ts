import 'reflect-metadata';
import { ArticleService } from '../../services/article.service';
import { CreateArticleDto, CreateArticleResponseDto, FindArticleWithMostWordOccurrencesDto, FindArticleWithMostWordOccurrencesResponseDto, SearchArticleDto, SearchArticleResponseDto } from '../../dtos/article.dto';
import { IArticle } from '../../models/article.model';
import { MockArticleRepository } from '../../mocks/article.mock.repository';
import { MockArticalMapper } from '../../mocks/mapper.service.mock';
import mongoose from "mongoose";
describe("ArticleService - createArticle", () => {
    const sampleBody = "hello Ipsum hello is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make atype specimen book.It has survived not only five centuries"
    let articleService: ArticleService;
    let mockArticleRepository: MockArticleRepository
    let mockArticleMapper: MockArticalMapper;
    let authorMockId: mongoose.Types.ObjectId;
    let articleMockId: mongoose.Types.ObjectId;

    beforeEach(() => {
        mockArticleRepository = new MockArticleRepository();
        mockArticleMapper = new MockArticalMapper();
        articleService = new ArticleService(mockArticleMapper, mockArticleRepository);
        authorMockId = new mongoose.Types.ObjectId();
        articleMockId = new mongoose.Types.ObjectId();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should create an article and return a CreateArticleResponseDto", async () => {
        // Arrange
        const createArticleDto = new CreateArticleDto({ title: "Test Article", body: "Test Content" });
        const userId = "user123";
        const mockArticle: IArticle = { _id: "1", title: "Test Article", body: "Test Content", author: userId } as unknown as IArticle;
        const expectedResponse = new CreateArticleResponseDto({ title: "Test Article" });

        mockArticleRepository.create.mockResolvedValueOnce(mockArticle);
        mockArticleMapper.toCreateArticleResponseDto.mockReturnValueOnce(expectedResponse);

        // Act
        const result = await articleService.createArticle(createArticleDto, userId);

        // Assert
        expect(mockArticleRepository.create).toHaveBeenCalledWith(createArticleDto, userId);
        expect(mockArticleMapper.toCreateArticleResponseDto).toHaveBeenCalledWith(mockArticle);
        expect(result).toEqual(expectedResponse);
    });

    it("should find article with most word occurrences", async () => {
        // Arrange
        const findArticleWithMostWordOccurrencesDto = new FindArticleWithMostWordOccurrencesDto({ word: "testWord" });
        const mockArticle: IArticle = { _id: "1", title: "Test Article", body: "Test Content", author: authorMockId, wordOccurrences: { testWord: 1 } } as unknown as IArticle;
        const expectedResponse = new FindArticleWithMostWordOccurrencesResponseDto({ id: "1" });

        mockArticleMapper.toFindArticleWithMostWordOccurrencesResponseDto.mockReturnValueOnce(expectedResponse);
        mockArticleRepository.findArticleWithMostWordOccurrences.mockResolvedValueOnce(mockArticleMapper.toFindArticleWithMostWordOccurrencesResponseDto(mockArticle));

        // Act
        const result = await articleService.findArticleWithMostWordOccurrences(findArticleWithMostWordOccurrencesDto);

        // Assert
        expect(mockArticleRepository.findArticleWithMostWordOccurrences).toHaveBeenCalledWith(findArticleWithMostWordOccurrencesDto);
        expect(mockArticleMapper.toFindArticleWithMostWordOccurrencesResponseDto).toHaveBeenCalledWith(mockArticle);
        expect(result).toEqual(expectedResponse);
    });
    it("should search articles and return offests", async () => {
        // Arrange
        const searchArticleDto = new SearchArticleDto({ words: ["red"] });
        const mockArticles: IArticle[] = [
            { _id: "1", title: "Test Article", body: sampleBody, author: authorMockId } as unknown as IArticle,
            { _id: "2", title: "Test Article", body: "Flowers are red and blue", author: authorMockId } as unknown as IArticle,
        ]
        const expectedResponse = new SearchArticleResponseDto({
            hello: [{ articleId: "1", offsets: [0, 12] }],
            simply: [{ articleId: "1", offsets: [21] }]
            // "print" is not included in the response since it's not in the article
        });


        mockArticleRepository.search.mockResolvedValueOnce(expectedResponse);
        // Act
        const result = await articleService.search(searchArticleDto);

        // Assert
        expect(mockArticleRepository.search).toHaveBeenCalledWith(searchArticleDto);
        expect(result).toEqual(expectedResponse);
    });

});
