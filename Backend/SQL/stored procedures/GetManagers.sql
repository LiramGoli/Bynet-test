CREATE PROCEDURE [dbo].[GetManagers]
	AS
	SELECT EMP.Id,EMP.Name, EMP.IdNumber, EMPR.Name AS Role, Managers.Name as Manager
    FROM Employees AS EMP
    INNER JOIN EmployeeRoles AS EMPR ON EMPR.CODE = EMP.Role
    LEFT JOIN Employees AS Managers ON EMP.manager = Managers.Id
    WHERE EMP.IsDeleted = 0 AND EMP.Role=322 OR EMP.Role=664;
RETURN 0