export type TMenus = {
  path: string;
  title: string;
  childs?: {
    path: string;
    title: string;
  }[];
}[];

export const menus: TMenus = [
  {
    path: "/", // the url
    title: "Trang chủ"
  },
  {
    path: "/gioi-thieu", // the url
    title: "Giới thiệu"
  },
  {
    path: "/nganh-dao-tao", // the url
    title: "Ngành đào tạo",
    childs: [
      { title: "Công tác xã hội", path: "/nganh-cong-tac-xa-hoi" },
      { title: "Luật kinh tế ", path: "/nganh-luat-kinh-te" },
      { title: "Ngôn ngữ Anh ", path: "/nganh-ngon-ngu-anh" }
    ]
  },
  {
    path: "/tin-tuc",
    title: "Tin tức",
    childs: [
      { title: "Lịch khai giảng", path: "/tin-tuc/lich-khai-giang" },
      { title: "Tin tức cập nhật", path: "/tin-tuc" }
    ]
  },
  { path: "/lien-he", title: "Liên hệ" },
  { path: "/dang-ky", title: "Đăng ký" }
];
