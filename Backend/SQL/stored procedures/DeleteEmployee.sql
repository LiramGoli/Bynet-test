CREATE PROCEDURE [dbo].[DeleteEmployee]
	@IdNumber VARCHAR(9)
AS
	UPDATE Employees
	SET IsDeleted = 1
	Where IdNumber=@IdNumber
RETURN 0