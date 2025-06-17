namespace backend.DTO
{
    public class ExternalApiRequest
    {
        public string API_Action { get; set; }
        public string Device_Id { get; set; } = "D001";
        public string Sync_Time { get; set; } = "";
        public string Company_Code { get; set; }
        public ApiBody API_Body { get; set; }
    }

    public class ApiBody
    {
        public string Username { get; set; }
        public string Pw { get; set; }
    }
}
