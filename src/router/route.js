export default function createHarnessRoute(store, pageDefinition) {
  return {
    path: "/" + pageDefinition.key,
    name: pageDefinition.key,
    component: pageDefinition.pageComponent,
    props: pageDefinition.pageProps ? pageDefinition.pageProps : false,
    beforeEnter: pageDefinition.loadData
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
