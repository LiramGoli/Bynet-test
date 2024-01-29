CREATE TABLE [dbo].[EmployeeRoles] (
    [Code]      INT           NOT NULL,
    [Name]      VARCHAR (100) NOT NULL,
    [IsDeleted] BIT           DEFAULT ((0)) NOT NULL,
    [Created]   DATETIME      DEFAULT (getutcdate()) NOT NULL,
    PRIMARY KEY CLUSTERED ([Code] ASC),
    UNIQUE NONCLUSTERED ([Code] ASC)
);

