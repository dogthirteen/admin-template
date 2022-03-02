import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login"]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);

  const hasToken = getToken();
  console.log('to.path', to.path, router);
  if (hasToken) {
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      const hasRoles =
        store.getters.roleList && store.getters.roleList.length > 0;
      if (hasRoles) {
        next();
      } else {
        try {
          const { roleList } = await store.dispatch("user/getUinfo");

          const accessRoutes = await store.dispatch(
            "permission/generateRoutes",
            roleList
          );
          console.log('accessRoutes', accessRoutes, router.addRoutes);

          router.addRoutes(accessRoutes);


          next({ ...to, replace: true });
        } catch (error) {
          await store.dispatch("user/resetToken");
          console.log(2, error);
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
