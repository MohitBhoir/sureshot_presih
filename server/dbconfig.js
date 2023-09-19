const config = 
{
    user: 'sa',
    password:'root',    
    server:'LAPTOP-9IHDAQAC',    
    database:'PreSIH_good',
    options:
    {
        trustedconnection : true,
        enableArithAbort : true,
        instancename : 'MSSQLSERVER',
        trustServerCertificate: true,
    },    
}
module.exports = config;