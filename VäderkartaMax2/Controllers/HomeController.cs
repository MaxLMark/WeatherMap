﻿using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace VäderkartaMax2.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Info(string submitCountry, string selectedCity)
        {
            //CultureInfo.CurrentCulture = CultureInfo.GetCultureInfo("fi");
            ViewBag.Capital = selectedCity;
            ViewBag.Country = submitCountry;
            return View();
        }
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}