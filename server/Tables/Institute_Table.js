class Institute_Table{
    constructor(Inst_Id, UserId, Address, Inst_TypeId, Inst_State, Inst_City){
        this.Inst_Id = Inst_Id;
        this.UserId = UserId;
        this.Address = Address;
        this.Inst_TypeId = Inst_TypeId;
        this.Inst_State = Inst_State;
        this.Inst_City = Inst_City;
    }
}

module.exports = Institute_Table;