import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const history = useNavigate();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isJobApp, setIsJobApp] = useState(false);
  const [isJobCategory, setIsJobCategory] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [isJob, setIsJob] = useState(false);
  const [isBlog, setIsBlog] = useState(false);
  const [isContact, setIsContact] = useState(false);
  const [isSetting, setIsSetting] = useState(false);

  const [isCategories, setIsCategories] = useState(false);
  const [isTax, setIsTax] = useState(false);
  const [isUnits, setIsUnits] = useState(false);
  const [isPages, setIsPages] = useState(false);
  const [isBaseUi, setIsBaseUi] = useState(false);
  const [isAdvanceUi, setIsAdvanceUi] = useState(false);
  const [isForms, setIsForms] = useState(false);
  const [isTables, setIsTables] = useState(false);
  const [isCharts, setIsCharts] = useState(false);
  const [isIcons, setIsIcons] = useState(false);
  const [isMaps, setIsMaps] = useState(false);
  const [isMultiLevel, setIsMultiLevel] = useState(false);

  // Pages
  const [isLanding, setIsLanding] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Dashboard") {
      setIsDashboard(false);
    }
    if (iscurrentState !== "Categories") {
      setIsCategories(false);
    } 
    if (iscurrentState !== "JobApp") {
      setIsJobApp(false);
    }
    if (iscurrentState !== "JobCategory") {
      setIsJobCategory(false);
    }
    if (iscurrentState !== "Employee") {
      setIsEmployee(false);
    }
    if (iscurrentState !== "Job") {
      setIsJob(false);
    }
    if (iscurrentState !== "Blog") {
      setIsBlog(false);
    }
    if (iscurrentState !== "Contact") {
      setIsContact(false);
    } 
    if (iscurrentState !== "Setting") {
      setIsSetting(false);
    }
    if (iscurrentState !== "units") {
      setIsUnits(false);
    }
    if (iscurrentState !== "Tax") {
      setIsTax(false);
    }
    if (iscurrentState !== "Pages") {
      setIsPages(false);
    }
    if (iscurrentState !== "BaseUi") {
      setIsBaseUi(false);
    }
    if (iscurrentState !== "AdvanceUi") {
      setIsAdvanceUi(false);
    }
    if (iscurrentState !== "Forms") {
      setIsForms(false);
    }
    if (iscurrentState !== "Tables") {
      setIsTables(false);
    }
    if (iscurrentState !== "Charts") {
      setIsCharts(false);
    }
    if (iscurrentState !== "Icons") {
      setIsIcons(false);
    }
    if (iscurrentState !== "Maps") {
      setIsMaps(false);
    }
    if (iscurrentState !== "MuliLevel") {
      setIsMultiLevel(false);
    }
    if (iscurrentState === "Widgets") {
      history("/widgets");
      document.body.classList.add("twocolumn-panel");
    }
    if (iscurrentState !== "Landing") {
      setIsLanding(false);
    }
  }, [
    history,
    iscurrentState,
    isDashboard,
    isCategories,
    isJob,
    isJobCategory,
    isTax,
    isPages,
    isBaseUi,
    isAdvanceUi,
    isForms,
    isTables,
    isCharts,
    isIcons,
    isMaps,
    isMultiLevel,
  ]);

  const menuItems = [
    {
      label: "Menu",
      isHeader: true,
    },
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "mdi mdi-speedometer",
      link: "/dashboard",
      stateVariables: isDashboard,
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState("Dashboard");
        updateIconSidebar(e);
      },
    },
    {
      id: "jobApp",
      label: "Job Application",
      icon: "mdi mdi-speedometer",
      link: "/jobApp-list",
      stateVariables: isJobApp,
      click: function (e) {
        e.preventDefault();
        setIsJobApp(!isJobApp);
        setIscurrentState("JobApp");
        updateIconSidebar(e);
      },
    },
     {
      id: "jobCategory",
      label: "Job Category",
      icon: "mdi mdi-speedometer",
      link: "/jobCat-list",
      stateVariables: isJobCategory,
      click: function (e) {
        e.preventDefault();
        setIsJobCategory(!isJobCategory);
        setIscurrentState("JobCat");
        updateIconSidebar(e);
      },
    },
    {
      id: "employee",
      label: "Employee",
      icon: "mdi mdi-speedometer",
      link: "/employee-list",
      stateVariables: isEmployee,
      click: function (e) {
        e.preventDefault();
        setIsEmployee(!isEmployee);
        setIscurrentState("Employee");
        updateIconSidebar(e);
      },
    },
    {
      id: "job",
      label: "Job",
      icon: "mdi mdi-speedometer",
      link: "/job-list",
      stateVariables: isJob,
      click: function (e) {
        e.preventDefault();
        setIsJob(!isJob);
        setIscurrentState("Job");
        updateIconSidebar(e);
      },
    },
    {
      id: "blog",
      label: "Blog",
      icon: "mdi mdi-speedometer",
      link: "/blog-list",
      stateVariables: isBlog,
      click: function (e) {
        e.preventDefault();
        setIsBlog(!isBlog);
        setIscurrentState("Blog");
        updateIconSidebar(e);
      },
    },
    {
      id: "contact",
      label: "Contact",
      icon: "mdi mdi-speedometer",
      link: "/contact-list",
      stateVariables: isContact,
      click: function (e) {
        e.preventDefault();
        setIsContact(!isContact);
        setIscurrentState("Contact");
        updateIconSidebar(e);
      },
    },

   
    {
      id: "setting",
      label: "Setting",
      icon: "mdi mdi-speedometer",
      link: "/#",
      stateVariables: isSetting,
      click: function (e) {
        e.preventDefault();
        setIsSetting(!isSetting);
        setIscurrentState("Setting");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "state_list",
          label: "State List",
          link: "/state-list",
          parentId: "Setting",
        },
        {
          id: "district_list",
          label: "Destrict List",
          link: "/district-list",
          parentId: "Setting",
        },
        {
          id: "taluka_list",
          label: "Taluka List",
          link: "/taluka-list",
          parentId: "Setting",
        },
        {
          id: "village_list",
          label: "Village List",
          link: "/village-list",
          parentId: "Setting",
        },
      ],
      

    },

    
    
  ];

  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
