USE [master]
GO
/****** Object:  Database [RequestSystemDB]    Script Date: 11/26/2024 1:06:16 AM ******/
CREATE DATABASE [RequestSystemDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'RequestSystemDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\RequestSystemDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'RequestSystemDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\RequestSystemDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [RequestSystemDB] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [RequestSystemDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [RequestSystemDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [RequestSystemDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [RequestSystemDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [RequestSystemDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [RequestSystemDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [RequestSystemDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [RequestSystemDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [RequestSystemDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [RequestSystemDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [RequestSystemDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [RequestSystemDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [RequestSystemDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [RequestSystemDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [RequestSystemDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [RequestSystemDB] SET  DISABLE_BROKER 
GO
ALTER DATABASE [RequestSystemDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [RequestSystemDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [RequestSystemDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [RequestSystemDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [RequestSystemDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [RequestSystemDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [RequestSystemDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [RequestSystemDB] SET RECOVERY FULL 
GO
ALTER DATABASE [RequestSystemDB] SET  MULTI_USER 
GO
ALTER DATABASE [RequestSystemDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [RequestSystemDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [RequestSystemDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [RequestSystemDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [RequestSystemDB] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [RequestSystemDB] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'RequestSystemDB', N'ON'
GO
ALTER DATABASE [RequestSystemDB] SET QUERY_STORE = ON
GO
ALTER DATABASE [RequestSystemDB] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [RequestSystemDB]
GO
/****** Object:  Table [dbo].[FileUploads]    Script Date: 11/26/2024 1:06:17 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FileUploads](
	[upload_id] [int] IDENTITY(1,1) NOT NULL,
	[request_id] [int] NULL,
	[file_name] [nvarchar](255) NULL,
	[file_path] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[upload_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Requests]    Script Date: 11/26/2024 1:06:17 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Requests](
	[request_id] [int] IDENTITY(1,1) NOT NULL,
	[subject] [nvarchar](255) NULL,
	[details] [nvarchar](255) NULL,
	[firstName] [nvarchar](50) NULL,
	[lastName] [nvarchar](50) NULL,
	[studentID] [nvarchar](10) NULL,
	[year] [varchar](4) NULL,
	[major] [nvarchar](100) NULL,
	[studentTel] [nvarchar](15) NULL,
	[parentTel] [nvarchar](15) NULL,
	[advisor] [nvarchar](100) NULL,
	[address] [nvarchar](255) NULL,
	[district] [nvarchar](50) NULL,
	[city] [nvarchar](50) NULL,
	[province] [nvarchar](50) NULL,
	[reason] [nvarchar](max) NULL,
	[status] [varchar](50) NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
	[semester] [nvarchar](10) NULL,
	[academicYear] [nvarchar](10) NULL,
	[courseCode] [nvarchar](10) NULL,
	[courseName] [nvarchar](255) NULL,
	[section] [nvarchar](10) NULL,
	[debtConfirmation] [nvarchar](3) NULL,
	[debtAmount] [decimal](10, 2) NULL,
	[title] [nvarchar](10) NULL,
	[signature] [nvarchar](255) NULL,
	[applicationDate] [date] NULL,
	[disapproval_reason] [nvarchar](max) NULL,
	[username] [nvarchar](50) NULL,
	[isread] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[request_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[users]    Script Date: 11/26/2024 1:06:17 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[username] [varchar](50) NOT NULL,
	[type] [varchar](20) NOT NULL,
	[displayname_en] [varchar](50) NULL,
	[email] [varchar](100) NULL,
	[created_at] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Requests] ADD  DEFAULT ('pending') FOR [status]
GO
ALTER TABLE [dbo].[Requests] ADD  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[Requests] ADD  DEFAULT ((0)) FOR [isread]
GO
ALTER TABLE [dbo].[users] ADD  DEFAULT (getdate()) FOR [created_at]
GO
ALTER TABLE [dbo].[FileUploads]  WITH CHECK ADD FOREIGN KEY([request_id])
REFERENCES [dbo].[Requests] ([request_id])
GO
USE [master]
GO
ALTER DATABASE [RequestSystemDB] SET  READ_WRITE 
GO
