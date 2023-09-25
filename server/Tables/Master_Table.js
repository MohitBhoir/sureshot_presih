class Master_Table{
    constructor(UserId,TypeId, EmailId, MobileNo, Password, Name){
        this.UserId = UserId;
        this.TypeId = TypeId;
        this.EmailId = EmailId;
        this.MobileNo = MobileNo;
        this.Password = Password;
        this.Name = Name;
    }
}

module.exports = Master_Table;