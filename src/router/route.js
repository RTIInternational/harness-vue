export default function createHarnessRoute(store, pageObject) {
  return {
    path: "/" + pageObject.key,
    name: pageObject.key,
    component: pageObject.pageComponent,
    props: pageObject.pageProps ? pageObject.pageProps : false,
    beforeEnter: pageObject.retrieveData
      ? (to, from, next) => {
          if (from.name) {
            store.clearData();
          }
          if (to.name) {
            store.loadData();
          }
          next();
        }
      : null,
  };
}
