const config = 
{
    user: 'sa',
    password:'root',    
    server:'AKASH',    
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