import Layout from "@/layout";

export const customRouter = [
  {
    path: "/form",
    component: Layout,
    children: [
      {
        path: "index",
        name: "Form",
        component: () => import("@/views/form/index"),
        meta: { title: "表单", icon: "form", roles: ['1'] }
      }
    ]
  },
];
