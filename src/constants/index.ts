export const USER_ROLE = {
  admin: "admin",
  super_admin: "super_admin",
  user: "user",
};

export const roleButtons = [
  {
    role: USER_ROLE.user,
    buttonText: "Make user",
    buttonStyle: "btn-primary",
  },
  {
    role: USER_ROLE.admin,
    buttonText: "Make admin",
    buttonStyle: "btn-accent",
  },
  {
    role: USER_ROLE.super_admin,
    buttonText: "Make super admin",
    buttonStyle: "btn-error",
  },
];
export const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 1500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  arrows: false,
};

export const serviceCategories = [
  {
    label: "Display",
    value: "display",
  },
  {
    label: "Speaker",
    value: "speaker",
  },
  {
    label: "Battery",
    value: "battery",
  },
  {
    label: "Microphone",
    value: "microphone",
  },
  {
    label: "Charger",
    value: "charger",
  },
  {
    label: "Camera",
    value: "camera",
  },
];

export const emailValidationRegex =
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const passwordValidationRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;


export const testimonialCarouselSettings = {
  className: "center",
  centerMode: true,
  infinite: true,
  centerPadding: "60px",
  slidesToShow: 3,
  speed: 1000,
  dots: true,
  autoplay: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};