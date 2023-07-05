using AppConfiguration;
using AppConfiguration.Constants;
using Domain.Contracts.Models;
using Microsoft.EntityFrameworkCore;

namespace AppDbContext
{
    public class AppDbContext: DbContext, IAppDbContext
    {
        DbSet<Status> Status { get; set; }
        DbSet<Invoice> Invoice { get; set; }

        private IAppConfiguration appConfiguration;

        #region constructor

        public AppDbContext(DbContextOptions<AppDbContext> options, IAppConfiguration appConfiguration)
            : base(options)
        {
            this.appConfiguration = appConfiguration;

            Database.EnsureCreated();
        }

        #endregion

        #region protected

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (optionsBuilder.IsConfigured)
            {
                return;
            }

            var connectionString = appConfiguration.Get(ConnectionStrings.Default);

            optionsBuilder.UseSqlServer(connectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Status>().HasIndex(t => t.Id).IsUnique();
            modelBuilder.Entity<Status>().Property(t => t.Name).IsRequired();

            modelBuilder.Entity<Invoice>().HasIndex(t => t.Id).IsUnique();
            modelBuilder.Entity<Invoice>().Property(t => t.Date).IsRequired();
            modelBuilder.Entity<Invoice>().Property(t => t.Status).IsRequired();

            Seed(modelBuilder);
        }

        protected void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Status>().HasData(
                new Status
                {
                    Id = 1,
                    Name = "New"
                },
                new Status
                {
                    Id = 2,
                    Name = "On Review"
                },
                new Status
                {
                    Id = 3,
                    Name = "Accepted"
                },
                new Status
                {
                    Id = 4,
                    Name = "Closed"
                },
                new Status
                {
                    Id = 5,
                    Name = "Rejected"
                }
            );

            modelBuilder.Entity<Invoice>().HasData(
                new Invoice
                {
                    Id = 1,
                    Date = new DateTimeOffset(2023, 1, 29, 10, 5, 40, new TimeSpan(0, 0, 0)),
                    Amount = 3224.23M,
                    StatusId = 5
                },
                new Invoice
                {
                    Id = 2,
                    Date = new DateTimeOffset(2023, 2, 12, 16, 45, 11, new TimeSpan(0, 0, 0)),
                    Amount = 3454.70M,
                    StatusId = 4
                },
                new Invoice
                {
                    Id = 3,
                    Date = new DateTimeOffset(2023, 3, 3, 11, 59, 59, new TimeSpan(0, 0, 0)),
                    Amount = 2975.53M,
                    StatusId = 3
                },
                new Invoice
                {
                    Id = 4,
                    Date = new DateTimeOffset(2023, 4, 9, 21, 11, 44, new TimeSpan(0, 0, 0)),
                    Amount = 3152.11M,
                    StatusId = 2
                },
                new Invoice
                {
                    Id = 5,
                    Date = new DateTimeOffset(2023, 5, 17, 5, 55, 55, new TimeSpan(0, 0, 0)),
                    Amount = 3621.94M,
                    StatusId = 1
                }
            );
        }

        #endregion
    }
}
