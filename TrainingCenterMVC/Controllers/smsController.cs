using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Twilio.TwiML;
using Twilio.AspNet.Mvc;
using System.Configuration;
using Twilio;
using Twilio.Types;
using Twilio.Rest.Api.V2010.Account;
using System.Security.Authentication;
using Twilio.Clients;
using System.IO;
using System.Net;
using System.Text;
using System.IO.Ports;
using TrainingCenterMVC.Models;

namespace TrainingCenterMVC.Controllers
{
    public class smsController : Controller
    {
        SerialPort sp = new SerialPort();

        public ActionResult sendmsg()
        {
            return View();
        }
        [HttpPost]
        public  ActionResult sendmsg(Message model)
        {
            try
            {
                send(model.Phone,model.MSG);
                ViewBag.result = "Message Sended .....";
                return View();
               
            }
            catch(Exception ex)
            {
                throw;
            }
        }
     
        public void send(string mobNo,string msg)
        {
            string telNo = Char.ConvertFromUtf32(34) + mobNo + Char.ConvertFromUtf32(34);
            sp.PortName = "COM4";
            sp.Open();
            sp.Write("AT+CMGF=1" + Char.ConvertFromUtf32(13));
            sp.Write("AT+CMGS=" + telNo + Char.ConvertFromUtf32(13));
            sp.Write(msg + Char.ConvertFromUtf32(26) + Char.ConvertFromUtf32(13));
            sp.Close();


           
        }


        // GET: sms
        //public ActionResult sendsms()
        //{
        //    const string accountSid = "AC4fa588146a0574f81d40c1f1a2cc2eaa";
        //    const string authToken = "a7912f727c7d268901c8ae71e724bc5e";

        //    TwilioClient.Init(accountSid, authToken);
           
        //    var message = MessageResource.Create(
        //         from: new Twilio.Types.PhoneNumber("+19313250453"),
        //        to: new Twilio.Types.PhoneNumber("+1142426036"),


        //        body: "Join Earth's mightiest heroes. Like Kevin Bacon."
        //           );

        //    return Content(message.Sid);
        //}




    }
}