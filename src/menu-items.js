export default {
  items: [
    {
      id: "Inicio",
      title: "Inicio",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "Inicio",
          title: "Monitoreos",
          type: "item",
          url: "/inicio",
          icon: "fas fa-vial",
        },
        {
          id: "Precipitacion",
          title: "Precipitación",
          type: "item",
          url: "/precipitacion",
          icon: "fas fa-tint",
        },
      ],
    },
    {
      id: "reportes-historicos",
      title: "Reportes Históricos",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "rio-rancheria",
          title: "Rio Ranchería",
          type: "collapse",
          icon: "fas fa-water",
          children: [
            {
              id: "fisicos",
              title: "Parametros Físicos",
              type: "item",
              url: "/rio-ran/fisicos",
            },
            {
              id: "Metales-pesados",
              title: "Metales Pesados",
              type: "item",
              url: "/rio-ran/metales",
            },
          ],
        },
        {
          id: "arroyos",
          title: "Arroyos",
          type: "collapse",
          icon: "fas fa-water",
          children: [
            {
              id: "button",
              title: "Button",
              type: "item",
              url: "/basic/button",
            },
            {
              id: "button1",
              title: "Button1",
              type: "item",
              url: "/basic/button",
            },
          ],
        },
      ],
    }, {
      id: "reportes-aguasubterranea",
      title: "Agua subterranea",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "piezometro",
          title: "piezometros",
          type: "collapse",
          icon: "fas fa-water",
          children: [
            {
              id: "fisicos",
              title: "Nivel dinamico",
              type: "item",
              url: "/rio-ran/fisicos",
            },
            {
              id: "Metales-pesados",
              title: "Nivel Estatico",
              type: "item",
              url: "/rio-ran/metales",
            },
          ],
        },
      ],
    },
    /*
    {
      id: "navigation",
      title: "Navigation",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "dashboard",
          title: "Dashboard",
          type: "item",
          url: "/dashboard/default",
          icon: "feather icon-home",
        },
      ],
    },
    {
      id: "ui-element",
      title: "UI ELEMENT",
      type: "group",
      icon: "icon-ui",
      children: [
        {
          id: "basic",
          title: "Component",
          type: "collapse",
          icon: "feather icon-box",
          children: [
            {
              id: "button",
              title: "Button",
              type: "item",
              url: "/basic/button",
            },
            {
              id: "badges",
              title: "Badges",
              type: "item",
              url: "/basic/badges",
            },
            {
              id: "breadcrumb-pagination",
              title: "Breadcrumb & Pagination",
              type: "item",
              url: "/basic/breadcrumb-paging",
            },
            {
              id: "collapse",
              title: "Collapse",
              type: "item",
              url: "/basic/collapse",
            },
            {
              id: "tabs-pills",
              title: "Tabs & Pills",
              type: "item",
              url: "/basic/tabs-pills",
            },
            {
              id: "typography",
              title: "Typography",
              type: "item",
              url: "/basic/typography",
            },
          ],
        },
      ],
    },
    {
      id: "ui-forms",
      title: "Forms & Tables",
      type: "group",
      icon: "icon-group",
      children: [
        {
          id: "form-basic",
          title: "Form Elements",
          type: "item",
          url: "/forms/form-basic",
          icon: "feather icon-file-text",
        },
        {
          id: "bootstrap",
          title: "Table",
          type: "item",
          icon: "feather icon-server",
          url: "/tables/bootstrap",
        },
      ],
    },
    {
      id: "chart-maps",
      title: "Chart & Maps",
      type: "group",
      icon: "icon-charts",
      children: [
        {
          id: "charts",
          title: "Charts",
          type: "item",
          icon: "feather icon-pie-chart",
          url: "/charts/nvd3",
        },
        {
          id: "maps",
          title: "Map",
          type: "item",
          icon: "feather icon-map",
          url: "/maps/google-map",
        },
      ],
    },
    {
      id: "pages",
      title: "Pages",
      type: "group",
      icon: "icon-pages",
      children: [
        {
          id: "auth",
          title: "Authentication",
          type: "collapse",
          icon: "feather icon-lock",
          badge: {
            title: "New",
            type: "label-danger",
          },
          children: [
            {
              id: "signup-1",
              title: "Sign up",
              type: "item",
              url: "/auth/signup-1",
              target: true,
              breadcrumbs: false,
            },
            {
              id: "signin-1",
              title: "Sign in",
              type: "item",
              url: "/auth/signin-1",
              target: true,
              breadcrumbs: false,
            },
          ],
        },

        {
          id: "sample-page",
          title: "Sample Page",
          type: "item",
          url: "/sample-page",
          classes: "nav-item",
          icon: "feather icon-sidebar",
        },
        {
          id: "docs",
          title: "Documentation",
          type: "item",
          url: "/docs",
          classes: "nav-item",
          icon: "feather icon-help-circle",
        },
        {
          id: "menu-level",
          title: "Menu Levels",
          type: "collapse",
          icon: "feather icon-menu",
          children: [
            {
              id: "menu-level-1.1",
              title: "Menu Level 1.1",
              type: "item",
              url: "#!",
            },
            {
              id: "menu-level-1.2",
              title: "Menu Level 2.2",
              type: "collapse",
              children: [
                {
                  id: "menu-level-2.1",
                  title: "Menu Level 2.1",
                  type: "item",
                  url: "#",
                },
                {
                  id: "menu-level-2.2",
                  title: "Menu Level 2.2",
                  type: "collapse",
                  children: [
                    {
                      id: "menu-level-3.1",
                      title: "Menu Level 3.1",
                      type: "item",
                      url: "#",
                    },
                    {
                      id: "menu-level-3.2",
                      title: "Menu Level 3.2",
                      type: "item",
                      url: "#",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "disabled-menu",
          title: "Disabled Menu",
          type: "item",
          url: "#",
          classes: "nav-item disabled",
          icon: "feather icon-power",
        }
      ],
    }, */
  ],
};
