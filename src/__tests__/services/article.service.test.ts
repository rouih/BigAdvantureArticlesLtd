import 'reflect-metadata';
import { ArticleService } from '../../services/article.service';
import { CreateArticleDto, CreateArticleResponseDto } from '../../dtos/article.dto';
import { IArticle } from '../../models/article.model';
import { MockArticleRepository } from '../../mocks/article.mock.repository';
import { MockArticalMapper } from '../../mocks/mapper.service.mock';

describe("ArticleService - createArticle", () => {
    let articleService: ArticleService;
    let mockArticleRepository: MockArticleRepository
    let mockArticleMapper: MockArticalMapper;

    beforeEach(() => {
        mockArticleRepository = new MockArticleRepository();
        mockArticleMapper = new MockArticalMapper();
        articleService = new ArticleService(mockArticleMapper, mockArticleRepository);
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
});
