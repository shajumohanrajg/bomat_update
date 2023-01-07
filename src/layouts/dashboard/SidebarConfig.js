// component
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: "dashboard",
    path: "/dashboard/homepage",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "vendors",
    path: "/dashboard/vendors",
    icon: getIcon("eva:people-fill"),
  },
  {
    title: "branches",
    path: "/dashboard/branches",
    icon: getIcon("eva:people-fill"),
  },
  {
    title: "purchase order",
    path: "/dashboard/po",
    icon: getIcon("eva:shopping-bag-fill"),
  },
  {
    title: "release order",
    path: "/dashboard/release_orders",
    icon: getIcon("eva:file-text-fill"),
  },
  {
    title: 'edition',
    path: '/dashboard/edition',
    icon: getIcon('eva:lock-fill')
  },
  {
    title: 'Bill Of Material',
    path: '/dashboard/bomat_table',
    icon: getIcon('eva:person-add-fill')
  },
  //   {
  //     title: 'register',
  //     path: '/register',
  //     icon: getIcon('eva:person-add-fill')
  //   },
  //   {
  //     title: 'Not found',
  //     path: '/404',
  //     icon: getIcon('eva:alert-triangle-fill')
  //   }
];

export default sidebarConfig;
