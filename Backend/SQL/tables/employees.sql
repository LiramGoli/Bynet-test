CREATE TABLE [dbo].[Employees] (
    [Id]        INT           IDENTITY (1, 1) NOT NULL,
    [Name]      VARCHAR (100) NOT NULL,
    [IdNumber]  VARCHAR (100) NOT NULL,
    [Role]      INT           NOT NULL,
    [Manager]   INT           NULL,
    [IsDeleted] BIT           DEFAULT ((0)) NOT NULL,
    [Created]   DATETIME      DEFAULT (getutcdate()) NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    UNIQUE NONCLUSTERED ([IdNumber] ASC),
    FOREIGN KEY ([Role]) REFERENCES [dbo].[EmployeeRoles] ([Code])
);

