CREATE PROCEDURE [dbo].[CreateEmployee]
    @Name VARCHAR(255),
    @IdNumber VARCHAR(50),
    @Role Int,
    @Manager VARCHAR(100)
AS
    INSERT INTO Employees (Name, IdNumber, Role, Manager)
    VALUES (@Name, @IdNumber, @Role, @Manager)
return 0