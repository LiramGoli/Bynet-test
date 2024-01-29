CREATE PROCEDURE [dbo].[UpdateEmployee]
	@Name VARCHAR(255),
    @Role Int,
    @Manager VARCHAR(100),
	@IdNumber VARCHAR(9)
AS
	UPDATE Employees
	SET Name=@Name, Role=@Role,Manager=@Manager
	WHERE IdNumber=@IdNumber

RETURN 0