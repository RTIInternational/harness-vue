export default function createHarnessRoute(store, pageDefinition) {
  return {
    path: `/${pageDefinition?.routePath || pageDefinition.key}`,
    name: pageDefinition?.routeName || pageDefinition.key,
    component: pageDefinition.pageComponent,
    props: pageDefinition?.pageProps,
    beforeEnter: (to, from, next) => {
      if (pageDefinition?.routeBeforeEnter) {
        pageDefinition.routeBeforeEnter(to, from, next, store);
      } else {
        if (from.name) {
          store.clearData();
        }
        if (to.name) {
          store.loadData();
        }
        next();
      }
    },
  };
}
