#Build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /source
COPY . .
RUN dotnet restore "./api.csproj" --disable-parallel
RUN dotnet publish "./api.csproj" -c release -o /app --no-restore

#Serve
FROM mcr.microsoft.com/dotnet/sdk:9.0
WORKDIR /app
COPY --from=build /app ./

ENV ASPNETCORE_URLS=http://0.0.0.0:5267
EXPOSE 5267

ENTRYPOINT ["dotnet","api.dll"]