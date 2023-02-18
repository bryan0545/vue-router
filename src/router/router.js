import { createRouter, createWebHashHistory } from "vue-router";
import isAuthenticateGuard from "./auth-guard";

const routes = [
  {
    path: "/",
    redirect: "/pokemon",
  },
  {
    path: "/pokemon",
    name: "pokemon",
    component: () => import(/* webpackChunkName: "PokemonPage" */ "@/modules/pokemon/layouts/PokemonLayout"),
    children: [
      {
        path: "home",
        name: "pokemon-home",
        component: () => import(/* webpackChunkName: "ListPage" */ "@/modules/pokemon/pages/ListPage"),
      },
      {
        path: "about",
        name: "pokemon-about",
        component: () => import(/* webpackChunkName: "AboutPage" */ "@/modules/pokemon/pages/AboutPage"),
      },
      {
        path: "/pokemonid/:id",
        name: "pokemon-id",
        component: () => import(/* webpackChunkName: "PokemonPage" */ "@/modules/pokemon/pages/PokemonPage"),
        props: (route) => {
          const id = Number(route.params.id);
          return isNaN(id) ? { id: 1 } : { id };
        },
      },
      {
        path: "",
        redirect: { name: "pokemon-home" },
      },
    ],
  },

  /// DBZ Layout

  {
    path: "/dbz",
    name: "dbz",
    beforeEnter: [isAuthenticateGuard],
    component: () => import(/* webpackChunkName: "DbzLayout" */ "@/modules/dbz/layouts/DragonBallLayout"),
    children: [
      {
        path: "characters",
        name: "dbz-characters",
        component: () => import(/* webpackChunkName: "DbzCharacters" */ "@/modules/dbz/pages/Characters"),
      },
      {
        path: "about",
        name: "dbz-about",
        component: () => import(/* webpackChunkName: "DbzAbout" */ "@/modules/dbz/pages/About"),
      },
      {
        path: "",
        redirect: { name: "dbz-characters" },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    // component: NoPageFound
    redirect: "/pokemon/home",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// //Guard global - sincrono
// router.beforeEach((to, from, next) => {
//   const ramdom = Math.random() * 100;
//   if (ramdom > 50) {
//     console.log("acceso permitido");
//     next();
//   } else {
//     console.log(ramdom, "acceso denegado");
//     next({ name: "pokemon-home" });
//   }
// });

// const canAccess = () => {
//   return new Promise((resolve) => {
//     const ramdom = Math.random() * 100;
//     if (ramdom > 50) {
//       console.log("acceso permitido - canAccess");
//       resolve(true);
//     } else {
//       console.log(ramdom, "acceso denegado - canAccess");
//       resolve(false);
//     }
//   });
// };

// router.beforeEach(async (to, from, next) => {
//   const can = await canAccess();
//   if (can) {
//     next();
//   } else {
//     next({ name: "pokemon-home" });
//   }
// });

export default router;
