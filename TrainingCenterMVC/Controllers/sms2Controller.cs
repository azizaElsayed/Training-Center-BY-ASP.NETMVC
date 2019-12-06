using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace TrainingCenterMVC.Controllers
{
    public class sms2Controller : Controller
    {
        public string sendSMS()
        {

            String message = HttpUtility.UrlEncode("This is your message");
            using (var wb = new WebClient())
            {
                byte[] response = wb.UploadValues("https://api.txtlocal.com/send/", new NameValueCollection()
                {
                {"apikey" , "yourapiKey"},
                {"numbers" , "447123456789"},
                {"message" , message},
                {"sender" , "Jims Autos"}
                });
    string result = System.Text.Encoding.UTF8.GetString(response);
                return result;
            }
        }
    }
}