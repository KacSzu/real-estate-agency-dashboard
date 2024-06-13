export const NAV_LINKS = [
  { label: "Homepage", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "Dashboard", href: "/admin" },
];

export const HOMEPAGE_WHY_US_STATS = [
  { label: "Years of experience", number: 12 },
  { label: "Trusted partners", number: 1000 },
  { label: "Sold properties", number: 692 },
];

export const HOMEPAGE_SERVICES_DATA = [
  {
    title: "Villa",
    href: "/properties?type=Villa&page=1",
    svg: "/type-svg/villa1s.svg",
    alt: "Real Estate Villa Properties",
  },
  {
    title: "Home",
    href: "/properties?type=Home&page=1",
    svg: "/type-svg/home1s.svg",
    alt: "Real Estate Home Properties",
  },
  {
    title: "Flat",
    href: "/properties?type=Flat&page=1",
    svg: "/type-svg/flat3s.svg",
    alt: "Real Estate Flat Properties",
  },
];
export const HOMEPAGE_PROPERTIES_DISPLAY_STATS_DATA = [
  {
    value: "150+",
    description: "Positive client testimonials from around the world.",
  },
  {
    value: "300+",
    description: "Properties successfully sold in the last year.",
  },
  { value: "50+", description: "Experienced agents ready to assist you." },
];

export const BREADCRUMBS_PROPERTIES = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Properties", link: "/dashboard/properties" },
];

export const BREADCRUMBS_PROPERTIES_NEW = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Properties", link: "/dashboard/properties" },
  { title: "New property", link: "/dashboard/properties/new" },
];

export const BREADCRUMBS_USERS = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Users", link: "/dashboard/users" },
];
export const BREADCRUMBS_USERS_NEW = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Users", link: "/dashboard/users" },
  { title: "New user", link: "/dashboard/users/new" },
];

export const FETCH_PER_PAGE_LIMIT = 10;
