import 'reflect-metadata';
import { UserService } from '../../services/user.service';
import { MockUserRepository } from '../../mocks/user.mock.repository';
import { MockUserMapper } from '../../mocks/mapper.service.mock';
import { CreateUserDto, CreateUserResponseDto, FindUserDto, FindUserResponseDto } from '../../dtos/user.dto';
import { IUser } from '../../models/user.model';


describe("UserService", () => {
    let userService: UserService;
    let mockUserRepository: MockUserRepository;
    let mockUserMapper: MockUserMapper;

    beforeEach(() => {
        mockUserRepository = new MockUserRepository();
        mockUserMapper = new MockUserMapper();
        userService = new UserService(mockUserRepository, mockUserMapper);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should create a user", async () => {
        // Arrange
        const createUserDto = new CreateUserDto({ username: "testUser", fullName: "Test User", password: "password" });
        const mockUser: IUser = { _id: "1", userName: "testUser", fullName: "Test User" } as IUser;
        const expectedResponseDto = new CreateUserResponseDto({ userName: "testUser" });

        // Ensure the mock returns the expected `mockUser` when `create` is called
        mockUserRepository.create.mockResolvedValueOnce(mockUser);
        mockUserMapper.toCreateUserResponseDto.mockReturnValueOnce(expectedResponseDto);

        // Act
        const result = await userService.createUser(createUserDto);

        // Assert
        expect(mockUserRepository.create).toHaveBeenCalledWith(createUserDto);
        expect(mockUserMapper.toCreateUserResponseDto).toHaveBeenCalledWith(mockUser);
        expect(result).toEqual(expectedResponseDto);
    });

    it("should find a user by ID", async () => {
        // Arrange
        const findUserDto = new FindUserDto({ userId: "1" });
        const mockUser: IUser = { _id: "1", userName: "testUser", fullName: "Test User" } as IUser;
        const expectedResponseDto = new FindUserResponseDto({ fullName: "Test User", userName: "testUser" });

        mockUserRepository.findByUserId.mockResolvedValueOnce(mockUser);
        mockUserMapper.toFindUserResponseDto.mockReturnValueOnce(expectedResponseDto);

        // Act
        const result = await userService.getUserById(findUserDto);

        // Assert
        expect(mockUserRepository.findByUserId).toHaveBeenCalledWith(findUserDto);
        expect(mockUserMapper.toFindUserResponseDto).toHaveBeenCalledWith(mockUser);
        expect(result).toEqual(expectedResponseDto);
    });

    it("should get all users", async () => {
        // Arrange
        const mockUsers: IUser[] = [
            { _id: "1", userName: "user1", fullName: "User One" } as IUser,
            { _id: "2", userName: "user2", fullName: "User Two" } as IUser
        ];
        const expectedResponseDto = [
            new FindUserResponseDto({ fullName: "User One", userName: "user1" }),
            new FindUserResponseDto({ fullName: "User Two", userName: "user2" })
        ];
        mockUserRepository.findAll.mockResolvedValueOnce(mockUsers);
        mockUserMapper.toFindUserResponseDto.mockReturnValueOnce(expectedResponseDto[0]);
        mockUserMapper.toFindUserResponseDto.mockReturnValueOnce(expectedResponseDto[1]);

        // Act
        const result = await userService.getAllUsers();

        // Assert
        expect(mockUserRepository.findAll).toHaveBeenCalled();
        expect(mockUserMapper.toFindUserResponseDto).toHaveBeenCalledTimes(2);
        expect(result).toEqual(expectedResponseDto);
    });
});
